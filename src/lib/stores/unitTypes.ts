import { get, writable, type Writable } from "svelte/store";
import { error } from "@sveltejs/kit";
import app, { AppState, AppStateType } from "./apiStore";
import type { JsonServiceClient, ResponseStatus } from "@servicestack/client";
import {
	UnitTypes,
	QueryUnitTypes,
	UpdateUnitTypes,
	CreateUnitTypes,
	DeleteUnitTypes
} from "dtotypes";

// UnitTypeStore ____________________________
export class UnitTypeContract extends AppStateType {
	isLoading: boolean = app.isLoading;
	client: JsonServiceClient = app.client;
	error: ResponseStatus | undefined = undefined;
	unitTypes: UnitTypes[] | undefined = [];
}

// concrete implementation of the store
export const emptyUnitTypesStore: UnitTypeContract = {
	isLoading: app.isLoading,
	client: app.client,
	error: undefined,
	unitTypes: []
};

export class UnitTypeStore extends AppState {
	store: Writable<UnitTypeContract>;

	constructor(emptyUnitTypesStore: UnitTypeContract) {
		super();
		this.store = writable<UnitTypeContract>(emptyUnitTypesStore);
		// this.store.update((authS: AuthStoreContract) => ({ ...authS, client: app.store.client }));
	}

	get isLoading() {
		const { isLoading } = get(this.store);
		return isLoading;
	}

	set isLoading(isLoading: boolean) {
		this.store.update((treatments: UnitTypeContract) => ({ ...treatments, isLoading }));
	}

	get client() {
		const { client } = get(this.store);
		return client;
	}

	set client(client: JsonServiceClient) {
		this.store.update((treatments: UnitTypeContract) => ({ ...treatments, client }));
	}

	get error() {
		const { error } = get(this.store);
		return error;
	}

	set error(error: ResponseStatus | undefined) {
		this.store.update((unitTypes: UnitTypeContract) => ({ ...unitTypes, error }));
	}

	get unitTypes() {
		const { unitTypes } = get(this.store);
		return unitTypes;
	}

	set unitTypes(unitTypes: UnitTypes[] | undefined) {
		this.store.update((unitTypesS: UnitTypeContract) => ({ ...unitTypesS, unitTypes }));
	}

	getUnitTypes = async () => {
		this.isLoading = true;
		try {
			const unitTypes = await this.client.send(
				new QueryUnitTypes({
					orderByDesc: "createdDate"
				})
			);
			this.unitTypes = unitTypes.results;
			this.error = undefined;
			return unitTypes;
		} catch (err: any) {
			this.error = err.responseStatus;
			return null;
		} finally {
			this.isLoading = false;
		}
	};

	updateUnitType = async (unitTypes: UnitTypes) => {
		this.isLoading = true;
		try {
			const res = await this.client.post(new UpdateUnitTypes(unitTypes));
			this.error = undefined;
			return res;
		} catch (err: any) {
			this.error = err.responseStatus;
			return null;
		} finally {
			this.isLoading = false;
		}
	};

	createUnitType = async (unitTypes: UnitTypes) => {
		this.isLoading = true;
		try {
			const res = await this.client.post(new CreateUnitTypes(unitTypes));
			this.error = undefined;
			return res;
		} catch (err: any) {
			this.error = err.responseStatus;
			return null;
		} finally {
			this.isLoading = false;
		}
	};

	deleteUnitType = async (unitTypes: UnitTypes) => {
		this.isLoading = true;
		try {
			const res = await this.client.delete(new DeleteUnitTypes(unitTypes));
			this.error = undefined;
			return res;
		} catch (err: any) {
			this.error = err.responseStatus;
			return null;
		} finally {
			this.isLoading = false;
		}
	};
}

const unitTypes = new UnitTypeStore(emptyUnitTypesStore);
export default unitTypes;
