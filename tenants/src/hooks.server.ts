import { json, type Handle, type RequestEvent } from "@sveltejs/kit"


/** @type {import('@sveltejs/kit').Handle} */
export const handle: Handle = async ({event, resolve}) => {

	const subdomain = getSubdomain(event);
	event.locals.pageName = subdomain!;
	const resolved = await resolve(event);
	return resolved;
}

export function getSubdomain(event: RequestEvent): string | null {
    const host = event.url.host; 
    const parts = host.split('.');

    // If it's an IP address, return null
    if (/^[0-9.]+$/.test(host)) {
        return null;
    }

    // Special case: Check if it's a subdomain of "localhost"
    if (host.endsWith('.localhost') && parts.length >= 2) {
        return parts.slice(0, -1).join('.'); // Remove only "localhost"
    }

    // Standard domain handling
    if (parts.length <= 2) {
        return null;
    }

    return parts.slice(0, -2).join('.'); // Get everything before "example.com"
}
