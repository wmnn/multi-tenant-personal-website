import { getAuthManager } from "$lib/server/singleton"
import { json, type Handle, type RequestEvent } from "@sveltejs/kit"


/** @type {import('@sveltejs/kit').Handle} */
export const handle: Handle = async ({event, resolve}) => {

	console.log('Got a request');
	
	// Saving the user id inside locals in order to access it easily
	const userId = await getAuthManager().getUserId(event);
	if (userId !== -1) {
		event.locals.userId = userId;
	}

	if (isProtectedRoute(event)) {
		console.log('Before checking access token')
		if (!await getAuthManager().isAccessTokenValid(event)) {

			console.log('Returning json response with status code 401')
			return json({
				status: 401
			})
		}
	}
	
	const resolved = await resolve(event);
	console.log('Resolved request\n')
	return resolved;
}

function isProtectedRoute(e: RequestEvent): boolean {
	if (e.url.pathname.startsWith('/api/posts')) {
		return true
	}
	return false;
}