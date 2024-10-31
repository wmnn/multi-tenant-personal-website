import { getDB } from "$lib/server/singleton";

/** @type {import('./$types').PageServerLoad} */
export async function load({ cookies }) {

	const headerPosts = await getDB().getCategories();

	return {
		headerPosts,
		isUserLoggedIn: cookies.get('access-token') ? true : false
	};
}