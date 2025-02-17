import { KEYS } from '$lib/client/KEYVALUESTORE_KEYS.js';
import { getAuthManager, getKeyValueStore } from '$lib/server/singleton.js';
import type { Socials } from '$lib/server/types';

/** @type {import('./$types').PageServerLoad} */
export async function load(e) {

    const socials: string | undefined = await getKeyValueStore().get(e.locals.pageName!, KEYS.socials);

    if (!socials) {
        return {
            pageName: e.locals.pageName,
        };
    }

    return {
        socials: JSON.parse(socials) as Socials, 
        pageName: e.locals.pageName,
    };
    
}