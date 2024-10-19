/** @type {import('./$types').PageServerLoad} */
export async function load({ cookies }) {

	return {
		isUserLoggedIn: cookies.get('access-token') ? true : false
	};
}