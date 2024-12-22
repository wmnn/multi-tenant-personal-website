import { getCVManager } from '$lib/server/singleton.js';

/** @type {import('./$types').PageServerLoad} */
export async function load(e) {
	return await getCVManager().getCVData()
}