import { JsonServiceClient, type ResponseStatus } from "@servicestack/client";
import { writable, derived, type Writable, get } from "svelte/store";

declare var API_URL: string; //defined in vite.config.ts
export const client = new JsonServiceClient(API_URL).apply((c) => {
	c.basePath = "/api";
	c.headers = new Headers(); //avoid pre-flight CORS requests
	// c.enableAutoRefreshToken = true;
	// c.mode = "cors";
});

// client.responseFilter = (res) => {
// 	if (res.status === 401) {
// 		app.error = res;
// 		app.isLoading = false;
// 		app.client = client;
// 	}
// };

export class AppStateType {
	isLoading: boolean = false;
	error?: ResponseStatus | undefined;
	client: JsonServiceClient = client;
	/**
	 *
	 */
	constructor() {
		// console.log("inside AppStateType constructor");
	}
}

const emptyAppState: AppStateType = {
	isLoading: false,
	error: undefined,
	client: client
};

// 	const store = writable({...emptyAppState});
// 	const { subscribe, set, update } = store;

// 	// const errors = derived(store, ($store) => $store.error);
// 	return {
// 		subscribe,
// 		set,
// 		update,
// 		isLoading: false,
// 		error: null,
// 		client: client
// 	};
// };

export class AppState {
	store: Writable<AppStateType>;

	constructor() {
		// console.log("inside AppState constructor");
		this.store = writable({ ...emptyAppState });
	}

	get isLoading(): boolean {
		return get(this.store).isLoading;
	}
	get error() {
		return get(this.store).error;
	}

	get client() {
		return get(this.store).client;
	}

	set isLoading(isLoading: boolean) {
		this?.store.update((s: any) => ({ ...s, isLoading: isLoading }));
	}

	set error(error: ResponseStatus | undefined) {
		this?.store.update((s: any) => ({ ...s, error: error }));
	}

	// set client(client: JsonServiceClient) {
	// 	this?.store.update((s: any) => ({ ...s, client: client }));
	// }
}

const app = new AppState();
export default app;
