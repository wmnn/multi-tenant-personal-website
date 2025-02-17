import { getDB, getUserStore } from '$lib/server/singleton.js'

/** @type {import('./$types').PageServerLoad} */
export async function load(e) {

    const projects = await getDB().getProjects(e.locals.pageName!);

    return {
        projects: projects ?? []
    }

}