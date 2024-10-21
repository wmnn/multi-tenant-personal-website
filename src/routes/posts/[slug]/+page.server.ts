import { getDB } from '$lib/server/singleton.js';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
	return {
		post: await getDB().getPost(params.slug as any),
		slug: params.slug
	};
}