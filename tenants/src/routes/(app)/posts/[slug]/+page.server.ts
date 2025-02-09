import { getDB } from '$lib/server/singleton.js';
import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {

	const post = await getDB().getPost(params.slug as any);
	if (post == undefined) {
		return error(500);
	}
	return {
		post,
		slug: params.slug
	};
}