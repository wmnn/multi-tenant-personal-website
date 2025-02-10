import { KEYS } from "$lib/client/KEYS.js";
import { getKeyValueStore } from "$lib/server/singleton.js";
import { json, type RequestEvent } from "@sveltejs/kit";

/** @type {import('./$types').RequestHandler} */
export async function GET(event) {

    console.log(event.params)
    const key = event.params as any;
    
    return json(await getKeyValueStore().get(event.locals.pageName as string, key));
  
};

/** @type {import('./$types').RequestHandler} */
export async function PUT(event) {

    const body = await event.request.json()
    const key = event.params.slug;

    if (!Object.keys(KEYS).includes(key)) {
        return json({
            status: 400
        })
    }

    const isSuccessfull = await getKeyValueStore().set(event.locals.pageName as string, key, JSON.stringify(body.value))

    if (isSuccessfull) {
        return json({
            status: 200
        })
    }

    return json({
        status: 500 
    })

}