import { getDB, getUserStore } from '$lib/server/singleton.js'
import { redirect } from '@sveltejs/kit'

/** @type {import('./$types').PageServerLoad} */
export async function load(e) {

    if (e.locals.pageName) {
        return redirect(303, '/settings');
    }
    return {

    }
    
}