import { derived, get, readable, writable, type Writable } from "svelte/store";
import { goto } from "$app/navigation";
import { updated } from "$app/stores";
import { error } from "@sveltejs/kit";
import { Authenticate, Register, type AuthenticateResponse } from "dtotypes";
import app, { AppState, AppStateType } from "./apiStore";
import type { JsonServiceClient, ResponseStatus } from "@servicestack/client";

// AuthStore ____________________________
export class AuthStoreContract extends AppStateType {
	isLoading: boolean = app.isLoading;
	client: JsonServiceClient = app.client;
	user: AuthenticateResponse | null = null;
	attrs: string[] = [];
	isAuthenticated: boolean = false;
}

// concrete implementation of the store
export const emptyAuthStore: AuthStoreContract = {
	user: null,
	attrs: [],
	isLoading: app.isLoading,
	client: app.client,
	error: undefined,
	isAuthenticated: false
};

export class AuthStore extends AppState {
	store: Writable<AuthStoreContract>;

	constructor(emptyAuthStore: AuthStoreContract) {
		super();
		this.store = writable<AuthStoreContract>(emptyAuthStore);
		// this.store.update((authS: AuthStoreContract) => ({ ...authS, client: app.store.client }));
	}

	// get subscribe() {
	// 	const { subscribe } = this.store;
	// 	return subscribe;
	// }

	get user() {
		const { user } = get(this.store);
		return user;
	}

	set user(user: AuthenticateResponse | null) {
		this.store.update((authS: AuthStoreContract) => ({ ...authS, user }));
	}

	get isAuthenticated(): boolean {
		const { user } = get(this.store);
		const isAuth = user != null;
		this.store.update((authS: AuthStoreContract) => ({ ...authS, isAuthenticated: isAuth }));
		return this.isAuthenticated;
	}

	onAuthenticatedChanged() {
		return derived(this.store, ($store) => $store.user != null);
	}

	signIn = (user: AuthenticateResponse) => {
		// console.log("signIn", user);
		this.user = user;
	};

	hasRole(role: string) {
		const user = get(this.store).user;
		const isAdmin = user != null && user.roles != null && user.roles.includes("Admin");
		return (user != null && user.roles != null && user.roles.includes(role)) || isAdmin;
	}

	hasPermission(permission: string) {
		const user = get(this.store).user;
		const isAdmin = user != null && user.permissions != null && user.permissions.includes("Admin");
		return (
			(user != null && user.permissions != null && user.permissions.includes(permission)) || isAdmin
		);
	}

	async login(username: string, password: string) {
		const auth = new Authenticate();
		auth.provider = "credentials";
		auth.userName = username;
		auth.password = password;
		auth.rememberMe = true;
		const response = await this.client.post(auth);
		this.user = response;
		return response;
	}

	async checkAuth(url: URL, redirect = false) {
		try {
			this.isLoading = true;
			const authResp = await this.client.post(new Authenticate());
			this.signIn(authResp);
			return authResp;
		} catch (e) {
			await this.signOut(false, false);
			// await goto("/login");
		} finally {
			this.isLoading = false;
		}
	}

	get isAdmin() {
		const user = get(this.store).user;
		return user != null && user.roles != null && user.roles.includes("Admin");
	}

	get attrs() {
		const user = get(this.store).user;
		return !this.isLoading && user
			? [
					"auth",
					...(user?.roles || []).map((role: any) => `role:${role}`),
					...(user?.permissions || []).map((perm: any) => `perm:${perm}`)
			  ]
			: [];
	}

	async signOut(redirect: boolean = true, clearSession: boolean = true) {
		try {
			this.user = null;

			if (clearSession) {
				this.isLoading = true;
				await this.client.post(new Authenticate({ provider: "logout" }));
			}
		} catch (error) {
			// console.log("signOut error", error);
		} finally {
			this.isLoading = false;
			if (redirect) {
				await goto("/login");
			}
		}
	}

	async register(register: Register) {
		this.isLoading = true;
		const response = await this.client.post(register);
		this.signIn(response ?? "");
		this.isLoading = false;
		return response;
	}

	async signInWithOAuth(provider: string) {
		// const response = await this.client.get(
		// 	new Authenticate({
		// 		provider: provider,
		// 		rememberMe: true,

		// 		uri: `http://localhost:5173/auth/${provider}?continue=http://localhost:5173/protected/profile`
		// 		// state: "123",
		// 		// nonce: "dce82840-1601-46d6-a79f-1e8c587910aa"
		// 	})
		// );
		var response = (window.location.href = `http://localhost:5173/auth/${provider}`);
		// console.log(response);
		// console.log(window.location.href);

		// var resp = await fetch(
		// 	`https://localhost:5001/auth/${provider}?continue=http://localhost:5173/protected/profile`,
		// 	{
		// 		method: "GET",
		// 		headers: {
		// 			"Content-Type": "application/json"
		// 		}
		// 	}
		// );

		// const response = await this.client.get(
		// 	`http://localhost:5173/auth/${provider}?continue=http://localhost:5173/protected/profile`
		// );
		// this.signIn(response ?? "");
		return response;
	}
}

const auth = new AuthStore(emptyAuthStore);
export default auth;
