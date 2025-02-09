import { getAuthManager } from "$lib/server/singleton.js";

/** @type {import('./$types').Actions} */
export const actions = {
	default: async (event) => {
        return getAuthManager().handleLogin(event);
	}
};