import { getAuthManager, getDB } from "$lib/server/singleton";
import { json } from "@sveltejs/kit";

/** @type {import('./$types').RequestHandler} */
export async function PATCH(e) {
    if (!await getAuthManager().isAccessTokenValid(e)) {
        return json({
            status: 401
        })
    }

    const body = await e.request.json()
    const isSuccess = await getDB().editProject(e.locals.pageName!, body.title, body.editedProject)

    if (isSuccess) {
        return json({
            status: 200
        })
    }

    return json({
        status: 404
    })
}

/** @type {import('./$types').RequestHandler} */
export async function POST(e) {
    if (!await getAuthManager().isAccessTokenValid(e)) {
        return json({
            status: 401
        })
    }
    const newProject = await e.request.json()

    const isSuccess = await getDB().addProject(e.locals.pageName!, newProject);
    
    if (isSuccess) {
        return json({
            status: 200
        })
    }
    return json({
        status: 404
    })
}

/** @type {import('./$types').RequestHandler} */
export async function DELETE(e) {
    if (!await getAuthManager().isAccessTokenValid(e)) {
        return json({
            status: 401
        })
    }

    const body = await e.request.json()
    const isSuccess = await getDB().deleteProject(e.locals.pageName!, body.title);

    if (isSuccess) {
        return json({
            status: 200
        })
    }

    return json({
        status: 404
    })
}

