import { derived, get, readable, writable, type Writable } from "svelte/store";
import { goto } from "$app/navigation";
import { updated } from "$app/stores";
import { error } from "@sveltejs/kit";
import app, { AppState, AppStateType } from "./apiStore";
import type { JsonServiceClient, ResponseStatus } from "@servicestack/client";
import {
	Treatments,
	QueryTreatments,
	AuthenticateResponse,
	QueryTreatmentScheduledEvents,
	UpdateTreatments,
	CreateTreatments,
	DeleteTreatments,
	TreatmentMeasurements,
	GetMedications
} from "dtotypes";
import auth from "./authStore";

// TreatmentStore ____________________________
export class TreatmentsStoreContract extends AppStateType {
	isLoading: boolean = app.isLoading;
	client: JsonServiceClient = app.client;
	user: AuthenticateResponse | null = null;
	error: ResponseStatus | undefined = undefined;
	treatments: Treatments[] | undefined = [];
}

// concrete implementation of the store
export const emptyTreatmentsStore: TreatmentsStoreContract = {
	user: null,
	isLoading: app.isLoading,
	client: app.client,
	error: undefined,
	treatments: []
};

export class TreatmentsStore extends AppState {
	store: Writable<TreatmentsStoreContract>;

	constructor(emptyTreatmentsStore: TreatmentsStoreContract) {
		super();
		this.store = writable<TreatmentsStoreContract>(emptyTreatmentsStore);
		// this.store.update((authS: AuthStoreContract) => ({ ...authS, client: app.store.client }));
	}

	get isLoading() {
		const { isLoading } = get(this.store);
		return isLoading;
	}

	set isLoading(isLoading: boolean) {
		this.store.update((treatments: TreatmentsStoreContract) => ({ ...treatments, isLoading }));
	}

	get client() {
		const { client } = get(this.store);
		return client;
	}

	set client(client: JsonServiceClient) {
		this.store.update((treatments: TreatmentsStoreContract) => ({ ...treatments, client }));
	}

	get error() {
		const { error } = get(this.store);
		return error;
	}

	set error(error: ResponseStatus | undefined) {
		this.store.update((treatments: TreatmentsStoreContract) => ({ ...treatments, error }));
	}

	get treatments() {
		const { treatments } = get(this.store);
		return treatments;
	}

	set treatments(treatments: Treatments[] | undefined) {
		this.store.update((treatmentsS: TreatmentsStoreContract) => ({ ...treatmentsS, treatments }));
	}

	get user() {
		const { user } = get(this.store);
		return user;
	}

	set user(user: AuthenticateResponse | null) {
		this.store.update((treatment: TreatmentsStoreContract) => ({ ...treatment, user }));
	}

	getTreatments = async () => {
		this.isLoading = true;
		try {
			const treatments = await this.client.send(
				new QueryTreatments({
					take: 30,
					orderByDesc: "createdDate"
				})
			);
			this.treatments = treatments.results;
			this.error = undefined;
			return treatments;
		} catch (err: any) {
			this.error = err.responseStatus;
			return null;
		} finally {
			this.isLoading = false;
		}
	};

	updateTreatments = async (treatment: Treatments) => {
		this.isLoading = true;
		try {
			const res = await this.client.post(new UpdateTreatments(treatment));
			this.error = undefined;
			return res;
		} catch (err: any) {
			this.error = err.responseStatus;
			return null;
		} finally {
			this.isLoading = false;
		}
	};

	createTreatment = async (treatment: Treatments) => {
		this.isLoading = true;
		try {
			const res = await this.client.post(new CreateTreatments(treatment));
			this.error = undefined;
			return res;
		} catch (err: any) {
			this.error = err.responseStatus;
			return null;
		} finally {
			this.isLoading = false;
		}
	};

	deleteTreatments = async (treatment: Treatments) => {
		this.isLoading = true;
		try {
			const res = await this.client.delete(new DeleteTreatments(treatment));
			this.error = undefined;
			return res;
		} catch (err: any) {
			this.error = err.responseStatus;
			return null;
		} finally {
			this.isLoading = false;
		}
	};

	getMedications = async (searchTerm: string) => {
		this.isLoading = true;
		try {
			const medicationResponse = await this.client.send(
				new GetMedications({
					searchTerm: searchTerm
				})
			);

			this.error = undefined;
			return medicationResponse.results;
		} catch (err: any) {
			this.error = err.responseStatus;
			return [];
		} finally {
			this.isLoading = false;
		}
	};
}

const treatments = new TreatmentsStore(emptyTreatmentsStore);
export default treatments;

export type TreatmentForm = Treatments & {
	currentStep: number;
	// dictionary of steps and whether they are completed
	stepsCompleted: { [step: number]: boolean };
	isCompleted: boolean;
	isSubmitted: boolean;
	errors: { [key: string]: string };
	stepLength: number;
};

export const emptyTreatmentForm: TreatmentForm = {
	id: "",
	dailyFrequency: 0.0,
	name: "",
	description: "",
	treatmentType: undefined,
	appUserId: Number(auth.user?.userId) ?? 0,
	unitTypeId: undefined,
	unitTypeName: "",
	isMuted: false,
	unitsPlanned: 0.0,
	treatmentMeasurementsId: undefined,
	treatmentMeasurements: undefined,
	schedules: [],
	isActiveButton: false,
	// dictionary of steps and whether they are completed
	stepsCompleted: { 0: false, 1: false, 2: false, 3: false, 4: false },
	isCompleted: false,
	isSubmitted: false,
	errors: { name: "", dailyFrequency: "", unitTypeId: "", unitTypeName: "", description: "" }, // dictionary of steps and whether they are completed  };
	stepLength: 4,
	currentStep: 0
};

export const treatmentFormStore = writable<TreatmentForm>(emptyTreatmentForm);
