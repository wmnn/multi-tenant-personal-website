import { getDB } from '$lib/server/singleton.js';

/** @type {import('./$types').PageServerLoad} */
export async function load(e) {
	return {
		posts: await getDB().getPosts(''),
		categories:  await getDB().getCategories(),
		about: await getDB().getContent('about')
	};
}