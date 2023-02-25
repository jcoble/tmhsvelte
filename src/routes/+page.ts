import type { PageLoad } from "./$types";
import { json, redirect } from "@sveltejs/kit";
import auth from "$lib/stores/authStore";
import app from "$lib/stores/apiStore";
import { Authenticate, AuthenticateResponse } from "dtotypes";
import { goto } from "$app/navigation";

export let ssr = false;
export const load = (async ({ route, parent, params, setHeaders, data, url }) => {
	// console.log("inside landing page page.ts");
	// const authResp = await auth.checkAuth(url, true);
	// const publicPages = ['login', 'register', 'forgot-password', 'reset-password'];
	// console.log("landing page load", route, parent, params, setHeaders, data, url);

	// if (authResp?.sessionId) {
	// 	await goto("/protected/reminders");
	// }

	return {
		auth: {}
	};
}) satisfies PageLoad;
