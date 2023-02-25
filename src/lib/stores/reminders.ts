import { derived, get, readable, writable, type Writable } from "svelte/store";
import { goto } from "$app/navigation";
import { updated } from "$app/stores";
import { error } from "@sveltejs/kit";
import app, { AppState, AppStateType } from "./apiStore";
import type { JsonServiceClient, ResponseStatus } from "@servicestack/client";
import {
	TreatmentScheduledEvents,
	AuthenticateResponse,
	QueryTreatmentScheduledEvents
} from "dtotypes";

// ReminderStore ____________________________
export class ReminderStoreContract extends AppStateType {
	isLoading: boolean = app.isLoading;
	client: JsonServiceClient = app.client;
	user: AuthenticateResponse | null = null;
	error: ResponseStatus | undefined = undefined;
	reminders: TreatmentScheduledEvents[] | undefined = [];
}

// concrete implementation of the store
export const emptyReminderStore: ReminderStoreContract = {
	user: null,
	isLoading: app.isLoading,
	client: app.client,
	error: undefined,
	reminders: []
};

export class ReminderStore extends AppState {
	store: Writable<ReminderStoreContract>;

	constructor(emptyReminderStore: ReminderStoreContract) {
		super();
		this.store = writable<ReminderStoreContract>(emptyReminderStore);
		// this.store.update((authS: AuthStoreContract) => ({ ...authS, client: app.store.client }));
	}

	get isLoading() {
		const { isLoading } = get(this.store);
		return isLoading;
	}

	set isLoading(isLoading: boolean) {
		this.store.update((reminderS: ReminderStoreContract) => ({ ...reminderS, isLoading }));
	}

	get client() {
		const { client } = get(this.store);
		return client;
	}

	set client(client: JsonServiceClient) {
		this.store.update((reminderS: ReminderStoreContract) => ({ ...reminderS, client }));
	}

	get error() {
		const { error } = get(this.store);
		return error;
	}

	set error(error: ResponseStatus | undefined) {
		this.store.update((reminderS: ReminderStoreContract) => ({ ...reminderS, error }));
	}

	get reminders() {
		const { reminders } = get(this.store);
		return reminders;
	}

	set reminders(reminders: TreatmentScheduledEvents[] | undefined) {
		this.store.update((reminderS: ReminderStoreContract) => ({ ...reminderS, reminders }));
	}

	get user() {
		const { user } = get(this.store);
		return user;
	}

	set user(user: AuthenticateResponse | null) {
		this.store.update((reminderS: ReminderStoreContract) => ({ ...reminderS, user }));
	}

	getTreatmentScheduledEvents = async () => {
		this.isLoading = true;
		try {
			const reminders = await this.client.send(
				new QueryTreatmentScheduledEvents({ take: 30, orderByDesc: "datetime_event_planned" })
			);
			this.reminders = reminders.results;
			this.error = undefined;
			return reminders;
		} catch (err: any) {
			this.error = err.responseStatus;
			return null;
		} finally {
			this.isLoading = false;
		}
	};
}

const reminders = new ReminderStore(emptyReminderStore);
export default reminders;
