// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types

// import { JsonServiceClient } from '@servicestack/client';
import type { Session, Treatments, TreatmentScheduledEvents, QueryResponse } from "dtotypes";
// import type { AuthenticateResponse } from 'dtotypes';
// import type { JsonServiceClient } from '@servicestack/client';

declare global {
	declare namespace App {
		interface Locals {
			// ssclient: UserAuthStore;
			// session: Session | null;
		}

		interface PageData {
			treatments?: QueryResponse<Treatments> | null;
			reminders?: QueryResponse<TreatmentScheduledEvents> | null;
		}
		// interface Error {}
		// interface Platform {}

		// export type UserAuthStore = {
		// 	user: AuthenticateResponse | null;
		// 	signIn: (response: AuthenticateResponse) => void;
		// 	signOut: () => void;
		// 	isAdmin: () => boolean;
		// 	hasRole: (role: string) => boolean;
		// 	hasPermission: (permission: string) => boolean;
		// 	signedIn: () => boolean;
		// 	checkAuth: () => Promise<AuthenticateResponse | null>;
		// 	subscribe: (run: (value: AuthenticateResponse | null) => void) => () => void;
		// 	update: (fn: (value: AuthenticateResponse | null) => AuthenticateResponse | null) => void;
		// 	set: (value: AuthenticateResponse | null) => void;
		// 	client: JsonServiceClient;
		// };
	}
}
