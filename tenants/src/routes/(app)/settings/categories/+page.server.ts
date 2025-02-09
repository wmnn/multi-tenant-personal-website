import { getDB } from '$lib/server/singleton.js';

/** @type {import('./$types').PageServerLoad} */
export async function load(e) {
	return {
		categories:  await getDB().getCategories(),
	};
}