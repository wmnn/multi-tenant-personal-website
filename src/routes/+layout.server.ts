import { getDB, getKeyValueStore } from "$lib/server/singleton";

/** @type {import('./$types').PageServerLoad} */
export async function load({ cookies }) {

	return {
		headerPosts: await getDB().getCategories(),
		isUserLoggedIn: cookies.get('access-token') ? true : false,
		about: await getKeyValueStore().get('about'),
	};
}