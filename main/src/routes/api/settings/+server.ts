import { KEYS } from "$lib/client/KEYVALUESTORE_KEYS.js";
import { getAuthManager, getKeyValueStore } from "$lib/server/singleton";
import { json, type RequestEvent } from "@sveltejs/kit";
import { type Socials } from '$lib/server/types.js'

/** @type {import('./$types').RequestHandler} */
export async function POST(e) {

    if (!await getAuthManager().isAccessTokenValid(e)) {
        return json({
            status: 401
        })
    }

    const keyValueStore = getKeyValueStore();
    // TODO Update pagename


    // Update socials
    const body = await e.request.json();
    const socials: Socials = {
        GitHub: handleLinks(body.GitHub),
        Facebook: handleLinks(body.Facebook),
        YouTube: handleLinks(body.Youtube),
        LinkedIn: handleLinks(body.LinkedIn),
        Instagram: handleLinks(body.Instagram),
        Email: body.Email
    }
    if (Object.keys(socials).length > 0) {
        keyValueStore.set(e.locals.pageName!, KEYS.socials, JSON.stringify(socials));
    }

    return json({
        status: 200,
        msg: 'Successfully updated settings.'
    })
    
};

/**
 * Handles the correct format
 */
function handleLinks(link: string): string | undefined {
    if (!link) {
        return undefined
    }
    if (link.startsWith('https://www.') || link.startsWith('http://www.') || link.startsWith('http')) {
        return link;
    }
    return `http://${link}`
}