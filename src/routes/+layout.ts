import { json, redirect } from "@sveltejs/kit";
import type { LayoutLoad } from "./$types";
import auth from "$lib/stores/authStore";
import app from "$lib/stores/apiStore";
import { Authenticate, AuthenticateResponse } from "dtotypes";
import { goto } from "$app/navigation";

export let ssr = false;
export const load = (async () => {
	// const authResp = await auth.checkAuth(url, true);
	// // const publicPages = ['login', 'register', 'forgot-password', 'reset-password'];
	// console.log("layout load", route, parent, params, setHeaders, data, url);

	// if (authResp?.sessionId) {
	// 	await goto("/protected/profile");
	// }

	return {
		auth: {}
	};
}) satisfies LayoutLoad;
