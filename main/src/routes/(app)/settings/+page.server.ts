/** @type {import('./$types').PageServerLoad} */
export async function load(e) {

    return {
        pageName: e.locals.pageName,
    };
    
}