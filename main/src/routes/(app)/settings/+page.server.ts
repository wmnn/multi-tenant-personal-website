import { KEYS } from '$lib/client/KEYVALUESTORE_KEYS.js';
import { getAuthManager, getKeyValueStore } from '$lib/server/singleton.js';
import type { Socials } from '$lib/server/types';

/** @type {import('./$types').PageServerLoad} */
export async function load(e) {

    const socials: string | undefined = await getKeyValueStore().get(e.locals.pageName!, KEYS.socials);

    const emptySocials = {
        Facebook: '',
        GitHub: '',
        Email: '',
        LinkedIn: '',
    }
    if (!socials) {
        return {
            pageName: e.locals.pageName,
            socials: emptySocials
        };
    }

    const savedSocials = JSON.parse(socials) as Socials;
    return {
        socials: {
            ...emptySocials,
            ...savedSocials
        }, 
        pageName: e.locals.pageName,
    };
    
}