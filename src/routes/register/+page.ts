import type { PageLoad } from "./$types";
import { json, redirect } from "@sveltejs/kit";
import auth from "$lib/stores/authStore";
import app from "$lib/stores/apiStore";
import { Authenticate, AuthenticateResponse } from "dtotypes";
import { goto } from "$app/navigation";

export let ssr = false;
export const load = (async ({ route, parent, params, setHeaders, data, url }) => {
	const authResp = await auth.checkAuth(url, true);

	if (authResp?.sessionId) {
		await goto("/protected/reminders");
	}

	return {
		auth: authResp
	};
}) satisfies PageLoad;
