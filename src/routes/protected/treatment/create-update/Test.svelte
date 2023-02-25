<script lang="ts">
	import { NavItem, toDate } from "@servicestack/client";
	import { ListBox, ListBoxItem, SlideToggle, Step, Stepper } from "@skeletonlabs/skeleton";
	import type { PageData } from "./$types";
	import MaterialSymbolsSearchRounded from "~icons/material-symbols/search-rounded";
	import { treatmentFormStore } from "$lib/stores/treatments";
	import { Schedules, TreatmentType } from "dtotypes";
	import { toNumber } from "$lib/utility/utils";
	import { subscribe } from "svelte/internal";
	import BeerItem from "$lib/components/BeerItem.svelte";
	export let data: PageData;
	let lockedState: boolean = true;
	let valueSingle: string = "Medication";
	import Select from "svelte-select";
	import SelectMadu from "select-madu";
	import app from "$lib/stores/apiStore";
	import auth from "$lib/stores/authStore";

	function onCompleteHandler(e: Event): void {}
	$: apiStore = app.store;
	$: authStore = auth.store;
	$: treatmentFormStore.subscribe((value: any) => {
		// first step is completed when a treatment type is selected
		if (value.currentStep === 0) {
			if (value.treatmentType !== undefined && $treatmentFormStore.stepsCompleted[0] === false) {
				$treatmentFormStore.stepsCompleted[0] = true;
				return;
			}
		}

		// second step is completed when a treatment is selected
		if (value.currentStep === 1) {
			if (
				value.treatmentMeasurementsId !== undefined &&
				$treatmentFormStore.stepsCompleted[1] === false
			) {
				$treatmentFormStore.stepsCompleted[1] = true;
				return;
			}
		}

		// third step is completed when the daily frequency is set
		if (value.currentStep === 2) {
			if (value.dailyFrequency !== undefined && $treatmentFormStore.stepsCompleted[2] === false) {
				$treatmentFormStore.stepsCompleted[2] = true;
				return;
			}
		}

		// fourth step is completed when the schedules are set
		if (value.currentStep === 3 && $treatmentFormStore.stepsCompleted[3] === false) {
			if (value.schedules?.length ?? 0 > 0) {
				$treatmentFormStore.stepsCompleted[3] = true;
				return;
			}
		}
	});

	function onNextHandler(e: CustomEvent<any>): void {
		$treatmentFormStore.currentStep = toNumber(e.detail.state.current);
		// create the blank schedules
		if ($treatmentFormStore.currentStep === 3) {
			if ($treatmentFormStore.schedules?.length ?? 0 > 0) {
				return;
			}
			for (let index = 0; index < ($treatmentFormStore.dailyFrequency ?? 0); index++) {
				const schedule = new Schedules({
					treatmentId: $treatmentFormStore.id,
					scheduleTime: new Date().toISOString(),
					startDate: new Date().toISOString(),
					endDate: new Date().toISOString(),
					appUserId: $treatmentFormStore.appUserId,
					scheduleDateTime: new Date()
				});
				$treatmentFormStore.schedules?.push(schedule);
			}
		}
	}

	async function loadOptions(query: string = "HYDROCORTISONE") {
		if (query.length < 3) {
			return;
		}
		const response = await fetch(
			`https://api.fda.gov/drug/ndc.json?search=generic_name:${query}&limit=20`
		);
		const data = await response.json();
		console.log(data, "data");

		return data;
	}

	function onBackHandler(e: CustomEvent<any>): void {
		throw new Error("Function not implemented.");
	}

	const asyncFn = async (searchValue: string) => {
		return new Promise(async (resolve, reject) => {
			if (searchValue.length < 3) {
				return resolve(null);
			}
			let data: any = [];
			let unique: any = [];
			try {
				const response = await fetch(
					`https://api.fda.gov/drug/ndc.json?search=generic_name:${searchValue}&limit=20`
				);
				data = await response.json();
				console.log(data.results[0].generic_name, "data.results[0].generic_name");

				console.log(data, "data");
				// data2 = data.results;
				// let result = [
				//   "Ooty, India",
				//   "Santiago, Chile",
				//   "Christchurch, New Zealand",
				//   "New York, USA"
				// ];

				if (searchValue && searchValue.trim() && data.results) {
					unique = [
						...new Set(
							data.results.map(
								(item: any) => item.generic_name.toUpperCase() + item.dosage_form.toUpperCase()
							)
						)
					];
				}

				console.log(unique, "unique");

				if (!unique.length) {
					unique = [{ item: "No results found" }];
				}
			} catch (error) {
				console.log(error, "error");
			}

			resolve(unique);
		});
	};

	$: schedules = $treatmentFormStore.schedules;

<label for="treatment_measurement_autocomplete" class="flex justify-center">
						<span>Search</span>
						$: authStore = auth.authStore;
						<div class="input-group-shim"><i class="fa-solid fa-search" /></div>
						<input type="search" placeholder="Search..." />
						<button class="variant-filled-secondary">Search</button>
						console.warn(autocomplete: item)
							<div class="autocomplete">
								<input
									id="med-input"
									type="text"
									placeholder="Search Medicines"
								
									bind:value={inputValue}
									on:input={filterCountries}
								/>
							</div>

							<input type="submit" />

							{#if filteredMeds.length > 0}
								<ul id="autocomplete-items-list">
									{#each filteredMeds as country, i}
										<MedicineItem
											itemLabel={medicine}
											highlighted={i === hiLiteIndex}
											on:click={() => setInputVal(medicine)}
										/>
									{/each}
								</ul>
							{/if}
						</form> -->
					</label>

