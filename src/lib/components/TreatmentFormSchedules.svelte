<script lang="ts">
	import { NavItem, toDate } from "@servicestack/client";
	import { ListBox, ListBoxItem, SlideToggle, Step, Stepper } from "@skeletonlabs/skeleton";
	import type { PageData } from "../../routes/protected/treatment/create-update/$types";
	import MaterialSymbolsSearchRounded from "~icons/material-symbols/search-rounded";
	import { treatmentFormStore } from "$lib/stores/treatments";
	import { Schedules, TreatmentType } from "dtotypes";
	import { toNumber } from "$lib/utility/utils";
	import { subscribe } from "svelte/internal";
	import BeerItem from "$lib/components/BeerItem.svelte";
	import Select from "svelte-select";
	import SelectMadu from "select-madu";
	import app from "$lib/stores/apiStore";
	import auth from "$lib/stores/authStore";

	// export let data: PageData;
	let lockedState: boolean = true;
	let valueSingle: string = "Medication";
	// function onCompleteHandler(e: Event): void {}
	// $: apiStore = app.store;
	// $: authStore = auth.store;
	// $: treatmentFormStore.subscribe((value: any) => {
	// 	// first step is completed when a treatment type is selected
	// 	if (value.currentStep === 0) {
	// 		if (value.treatmentType !== undefined && $treatmentFormStore.stepsCompleted[0] === false) {
	// 			$treatmentFormStore.stepsCompleted[0] = true;
	// 			return;
	// 		}
	// 	}

	// 	// second step is completed when a treatment is selected
	// 	if (value.currentStep === 1) {
	// 		if (
	// 			value.treatmentMeasurementsId !== undefined &&
	// 			$treatmentFormStore.stepsCompleted[1] === false
	// 		) {
	// 			$treatmentFormStore.stepsCompleted[1] = true;
	// 			return;
	// 		}
	// 	}

	// 	// third step is completed when the daily frequency is set
	// 	if (value.currentStep === 2) {
	// 		if (value.dailyFrequency !== undefined && $treatmentFormStore.stepsCompleted[2] === false) {
	// 			$treatmentFormStore.stepsCompleted[2] = true;
	// 			return;
	// 		}
	// 	}

	// 	// fourth step is completed when the schedules are set
	// 	if (value.currentStep === 3 && $treatmentFormStore.stepsCompleted[3] === false) {
	// 		if (value.schedules?.length ?? 0 > 0) {
	// 			$treatmentFormStore.stepsCompleted[3] = true;
	// 			return;
	// 		}
	// 	}
	// });

	// function onNextHandler(e: CustomEvent<any>): void {
	// 	$treatmentFormStore.currentStep = toNumber(e.detail.state.current);
	// 	// create the blank schedules
	// 	if ($treatmentFormStore.currentStep === 3) {
	// 		if ($treatmentFormStore.schedules?.length ?? 0 > 0) {
	// 			return;
	// 		}
	// 		for (let index = 0; index < ($treatmentFormStore.dailyFrequency ?? 0); index++) {
	// 			const schedule = new Schedules({
	// 				treatmentId: $treatmentFormStore.id,
	// 				scheduleTime: new Date().toISOString(),
	// 				startDate: new Date().toISOString(),
	// 				endDate: new Date().toISOString(),
	// 				appUserId: $treatmentFormStore.appUserId,
	// 				scheduleDateTime: new Date()
	// 			});
	// 			$treatmentFormStore.schedules?.push(schedule);
	// 		}
	// 	}
	// }

	// async function loadOptions(query: string = "HYDROCORTISONE") {
	// 	if (query.length < 3) {
	// 		return;
	// 	}
	// 	const response = await fetch(
	// 		`https://api.fda.gov/drug/ndc.json?search=generic_name:${query}&limit=20`
	// 	);
	// 	const data = await response.json();
	// 	console.log(data, "data");

	// 	return data;
	// }

	// function onBackHandler(e: CustomEvent<any>): void {
	// 	throw new Error("Function not implemented.");
	// }

	// const asyncFn = async (searchValue: string) => {
	// 	return new Promise(async (resolve, reject) => {
	// 		if (searchValue.length < 3) {
	// 			return resolve(null);
	// 		}
	// 		let data: any = [];
	// 		let unique: any = [];
	// 		try {
	// 			const response = await fetch(
	// 				`https://api.fda.gov/drug/ndc.json?search=generic_name:${searchValue}&limit=20`
	// 			);
	// 			data = await response.json();
	// 			console.log(data.results[0].generic_name, "data.results[0].generic_name");

	// 			console.log(data, "data");
	// 			// data2 = data.results;
	// 			// let result = [
	// 			//   "Ooty, India",
	// 			//   "Santiago, Chile",
	// 			//   "Christchurch, New Zealand",
	// 			//   "New York, USA"
	// 			// ];

	// 			if (searchValue && searchValue.trim() && data.results) {
	// 				unique = [...new Set(data.results.map((item: any) => item.generic_name))];
	// 			}

	// 			console.log(unique, "unique");

	// 			if (!unique.length) {
	// 				unique = [{ item: "No results found" }];
	// 			}
	// 		} catch (error) {
	// 			console.log(error, "error");
	// 		}

	// 		resolve(unique);
	// 	});
	// };

	$: schedules = $treatmentFormStore.schedules;
</script>

<div>
	<div><p>Dose</p></div>
	<div class="grid grid-cols-[auto_auto_auto]">
		<input
			type="number"
			class="input"
			placeholder="Please enter the dose of treatment"
			bind:value={$treatmentFormStore.unitsPlanned}
		/>
		<select class="select">
			<option value="0">Select Unit Type</option>
			{#each $treatmentFormStore.unitTypes ?? [] as unitType}
				<option value={unitType.id}>{unitType.name}</option>
			{/each}
		</select>

		<div class="ml-12">
			<h3>
				{$treatmentFormStore.unitsPlanned ?? "0"}
				{$treatmentFormStore.unitTypeName === "" || $treatmentFormStore.unitTypeName === undefined
					? " (units) "
					: " (" + $treatmentFormStore.unitTypeName + ") "}
			</h3>
		</div>
	</div>
	<div><h5>Time</h5></div>
	{#each schedules ?? [] as { scheduleTime, endDate, startDate }, i (i)}
		<div class="flex flex-col">
			<div>
				<h5>
					Reminder Time {i + 1}
				</h5>
			</div>
			<input
				type="time"
				class="input"
				placeholder="Please enter the date of treatment"
				bind:value={scheduleTime}
			/>
		</div>
	{/each}
</div>
