import { getAuthManager } from "$lib/server/singleton"
import type { Handle } from "@sveltejs/kit"


/** @type {import('@sveltejs/kit').Handle} */
export const handle: Handle = async ({event, resolve}) => {

	console.log('Got a request');
	
	// Saving the user id inside locals in order to access it easily
	const userId = await getAuthManager().getUserId(event);
	if (userId !== -1) {
		event.locals.userId = userId;
	}
	
	return await resolve(event) 
}