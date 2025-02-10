/** @type {import('./$types').PageServerLoad} */
export async function load({ cookies, url}) {

	return {
		isUserLoggedIn: cookies.get('access-token') ? true : false,
	};
	
}