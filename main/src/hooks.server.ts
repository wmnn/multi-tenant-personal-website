import { getAuthManager } from "$lib/server/singleton"
import { json, type Handle, type RequestEvent } from "@sveltejs/kit"
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '$env/static/private'

/** @type {import('@sveltejs/kit').Handle} */
export const handle: Handle = async ({event, resolve}) => {
	
	const pageName = event.cookies.get('pageName');
	if (pageName) {
		jwt.verify(pageName, JWT_SECRET, function(err, decoded: any) {
			if (!err) {
				event.locals.pageName = decoded.pageName;	
			}
		})
	}

	if (isProtectedRoute(event)) {
		if (!await getAuthManager().isAccessTokenValid(event)) {
			return json({
				status: 401
			})
		}
	}
	
	const resolved = await resolve(event);
	return resolved;
}

function isProtectedRoute(e: RequestEvent): boolean {
	if (e.url.pathname.startsWith('/api/posts')) {
		return true
	}
	return false;
}