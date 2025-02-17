import { getDB, getKeyValueStore } from "$lib/server/singleton";
import { KEYS } from '../../lib/client/KEYS'

/** @type {import('./$types').PageServerLoad} */
export async function load(e) {

    const about = await getKeyValueStore().get(e.locals.pageName, KEYS.about) ?? '';
    const projects = await getDB().getProjects(e.locals.pageName);

    return {
        about: about,
        title: await getKeyValueStore().get(e.locals.pageName, KEYS.title) ?? '',
        education: JSON.parse(await getKeyValueStore().get(e.locals.pageName, KEYS.education) ?? '[]') ?? [],
        workexperience: JSON.parse(await getKeyValueStore().get(e.locals.pageName, KEYS.workexperience) ?? '[]') ?? [],
        projects
    };
    
}