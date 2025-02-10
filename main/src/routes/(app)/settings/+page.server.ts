/** @type {import('./$types').PageServerLoad} */
export async function load(e) {

    console.log(e.locals.pageName)

    return {
        pageName: e.locals.pageName,
    };
    
}