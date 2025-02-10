import { getDB, getKeyValueStore } from '$lib/server/singleton.js';

/** @type {import('./$types').PageServerLoad} */
export async function load(e) {
	return {
		about: await getKeyValueStore().get(e.locals.pageName!, 'about')
	};
}