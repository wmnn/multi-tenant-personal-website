import { KEYS } from "$lib/client/KEYVALUESTORE_KEYS.js";
import { getAuthManager, getDB, getKeyValueStore, getUserStore } from "$lib/server/singleton.js";
import { json, type RequestEvent } from "@sveltejs/kit";
import { randomUUID } from "crypto";

/** @type {import('./$types').RequestHandler} */
/**
 * Batch update 
 * @param event 
 * @returns 
 */
export async function PUT(event) {

    const data = await event.request.json()

    if (Object.keys(data).includes('email') && Object.keys(data).includes('password')) {
        const uid = randomUUID();
        const isUserCreated = getUserStore().createUser(data.email, uid, data.password);
        if (!isUserCreated) {
            return json({
                status: 404
            })
        }
        const projects = data.projects
        for (const project of projects) {
            await getDB().addProject(uid, project);
        }
        delete data['projects']
        delete data['email']
        delete data['password']
        batchInsert(uid, data)
        return json({
            status: 200,
            href: `https://${uid}.${_getDomain(event)}`
        })
    }

    if (!await getAuthManager().isAccessTokenValid(event)) {
        return json({
            status: 401
        })
    }
    const pageName = event.locals.pageName!
    await batchInsert(pageName, data);
    return json({
        status: 200
    }) 
}

async function batchInsert(pageName: string, object: any) {
    for (const [key, value] of Object.entries(object)) {
        if (!Object.keys(KEYS).includes(key)) {
            continue;
        }
        
        if (typeof value === 'object' && value !== null) {
            await getKeyValueStore().set(pageName, key, JSON.stringify(value));    
        } else {
            await getKeyValueStore().set(pageName, key, value as string);
        }
    }
}

export function _getDomain(event: RequestEvent): string {
    const host = event.url.host; // e.g., "sub.example.com"
    const parts = host.split('.'); 

    // If it's an IPv4 or localhost, return as-is
    if (parts.length <= 2 || /^[0-9.]+$/.test(host) || host === 'localhost') {
        return host;
    }

    return parts.slice(-2).join('.'); // Get only "example.com"
}


