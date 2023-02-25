import { json, redirect } from "@sveltejs/kit";
import type { LayoutLoad } from "./$types";
import auth from "$lib/stores/authStore";
import app from "$lib/stores/apiStore";
import { Authenticate, AuthenticateResponse } from "dtotypes";
import { goto } from "$app/navigation";

export let ssr = false;
export const load = (async ({ route, parent, params, setHeaders, data, url }) => {
	const authResp = await auth.checkAuth(url, true);

	// if (url.pathname.startsWith("/protected") && !authResp?.sessionId) {
	// 	auth.signOut(redirect);
	// 	// if (redirect) await goto("/login");
	// } else if (
	// 	(url.pathname.startsWith("/login") || // if logged in, redirect to protected page and navigating to the login, register pages
	// 		url.pathname.startsWith("/register")) &&
	// 	authResp?.sessionId != null
	// ) {
	// 	this.user = authResp;
	// 	if (redirect) await goto("/protected/profile");
	// } else {
	// 	this.user = authResp;
	// }

	if (!authResp?.sessionId) {
		await goto("/login");
	}

	return {
		auth: {}
	};
}) satisfies LayoutLoad;
