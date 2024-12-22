import { getKeyValueStore } from "$lib/server/singleton";
import { KEYS } from '../../lib/client/KEYS'

/** @type {import('./$types').PageServerLoad} */
export async function load(e) {

    return {
        about: await getKeyValueStore().get(KEYS.about) ?? '',
        title: await getKeyValueStore().get(KEYS.title) ?? '',
        education: JSON.parse(await getKeyValueStore().get(KEYS.education) ?? '') ?? [],
        workexperience: JSON.parse(await getKeyValueStore().get(KEYS.workexperience) ?? '') ?? [],
    };
    
}