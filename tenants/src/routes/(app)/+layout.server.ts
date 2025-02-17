import { getKeyValueStore } from '$lib/server/singleton.js';

/** @type {import('./$types').PageServerLoad} */
export async function load(e) {

	let socials: any = '';
	try {
		socials = JSON.parse(await getKeyValueStore().get(e.locals.pageName, 'socials') ?? '')
	} catch(_) {

	}
	
	return {
		isUserLoggedIn: false,
		title: '',
		socials
	};
}