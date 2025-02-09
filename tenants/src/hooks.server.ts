import { json, type Handle, type RequestEvent } from "@sveltejs/kit"


/** @type {import('@sveltejs/kit').Handle} */
export const handle: Handle = async ({event, resolve}) => {

	console.log('Got a request');
	
	const resolved = await resolve(event);
	console.log('Resolved request\n')
	return resolved;
}