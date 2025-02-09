import { getDB, getKeyValueStore } from "$lib/server/singleton";
import { redirect } from "@sveltejs/kit";

/** @type {import('./$types').PageServerLoad} */
export async function load({ cookies, url}) {

	// const title: string | undefined = await getKeyValueStore().get('title');

	// if (!title && url.pathname == '/') {
	// 	return redirect(307, '/onboarding')
	// }		

	return {
		headerPosts: [],
		isUserLoggedIn: false,
		title: '',
	};
}