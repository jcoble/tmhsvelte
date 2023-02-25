<script lang="ts">
	import TreatmentFormSchedules from "$lib/components/TreatmentFormSchedules.svelte";

	import { NavItem, toDate } from "@servicestack/client";
	import {
		focusTrap,
		ListBox,
		ListBoxItem,
		SlideToggle,
		Step,
		Stepper
	} from "@skeletonlabs/skeleton";
	import type { PageData } from "./$types";
	import MaterialSymbolsSearchRounded from "~icons/material-symbols/search-rounded";
	import treatments, { treatmentFormStore } from "$lib/stores/treatments";
	import { Schedules, TreatmentType } from "dtotypes";
	import { toNumber } from "$lib/utility/utils";
	import { subscribe } from "svelte/internal";
	import BeerItem from "$lib/components/BeerItem.svelte";
	import Select from "svelte-select";
	import SelectMadu from "select-madu";
	import app from "$lib/stores/apiStore";
	import auth from "$lib/stores/authStore";
	import AutoComplete from "simple-svelte-autocomplete";
	import MedicationItem from "$lib/components/treatments/MedicationItem.svelte";
	import type { ConceptGroup, ConceptProperty, Medication, RXNavResponse } from "$lib/types/types";

	export let data: PageData;
	let lockedState: boolean = true;
	let valueSingle: string = "Medication";
	// let justValue: string | undefined = $treatmentFormStore.treatmentMeasurementsId;

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

	function onBackHandler(e: CustomEvent<any>): void {
		// throw new Error("Function not implemented.");
	}

	const searchMedsAsync = async (searchValue: string) => {
		return new Promise(async (resolve, reject) => {
			let items: Medication[] | undefined | null = [];
			if (searchValue.length < 1) {
				return resolve(items);
			}

			items = await treatments.getMedications(searchValue);
			console.log(items, "items");

			resolve(items);
		});
	};

	$: schedules = $treatmentFormStore.schedules;
</script>

<div>
	<section class="card variant-glass p-4 mx-auto w-[90%] mt-10">
		<Stepper
			state={$treatmentFormStore.currentStep}
			on:next={onNextHandler}
			on:back={onBackHandler}
			on:complete={onCompleteHandler}
		>
			<Step locked={!$treatmentFormStore.stepsCompleted[0]}>
				<svelte:fragment slot="header">Choose a type of treatment!</svelte:fragment>
				(todo: load data for measurement types filtered by the treatment type)
				<ListBox
					class="!max-w-[75%] mx-auto mt-10 rounded-bl-container-token"
					active="bg-primary-500-400-token"
				>
					<ListBoxItem
						bind:group={$treatmentFormStore.treatmentType}
						name="Medication"
						value="Medication">Medication</ListBoxItem
					>
					<ListBoxItem
						bind:group={$treatmentFormStore.treatmentType}
						name="Measurement"
						value="Measurement">Measurement</ListBoxItem
					>
					<ListBoxItem
						bind:group={$treatmentFormStore.treatmentType}
						name="Activity"
						value="Activity">Activity</ListBoxItem
					>
					<ListBoxItem
						bind:group={$treatmentFormStore.treatmentType}
						name="Symptom Check"
						value="Symptom Check">Symptom Check</ListBoxItem
					>
				</ListBox>
			</Step>
			<Step locked={!$treatmentFormStore.stepsCompleted[1]}>
				<svelte:fragment slot="header">Choose a treatment!</svelte:fragment>
				<svelte:fragment slot="default">
					<form action="POST">
						<Select
							itemId={"rxCui"}
							hideEmptyState={true}
							loadOptions={searchMedsAsync}
							placeholder="Search for a medication..."
							bind:justValue={$treatmentFormStore.treatmentMeasurementsId}
							bind:value={$treatmentFormStore.medication}
						>
							<div slot="item" let:item let:index>
								<MedicationItem {item} />
							</div>

							<div slot="selection" let:selection>
								<MedicationItem item={selection} />
							</div>
						</Select>
					</form></svelte:fragment
				>
			</Step>
			<Step locked={!$treatmentFormStore.stepsCompleted[2]}>
				<svelte:fragment slot="header">Daily Frequency</svelte:fragment>
				<h4 class="text-center">How many times a day will you be doing this treatment?</h4>
				<ListBox
					class="!max-w-[50%] mx-auto mt-10 rounded-bl-container-token"
					active="bg-secondary-500-400-token text-center"
				>
					<ListBoxItem
						class="text-center"
						bind:group={$treatmentFormStore.dailyFrequency}
						name="1"
						value="1">1 time daily</ListBoxItem
					>
					<ListBoxItem
						class="text-center"
						bind:group={$treatmentFormStore.dailyFrequency}
						name="2"
						value="2">2 times daily</ListBoxItem
					>
					<ListBoxItem
						class="text-center"
						bind:group={$treatmentFormStore.dailyFrequency}
						name="3"
						value="3">3 times daily</ListBoxItem
					>
					<ListBoxItem
						class="text-center"
						bind:group={$treatmentFormStore.dailyFrequency}
						name="4"
						value="4">4 times daily</ListBoxItem
					>
					<ListBoxItem
						class="text-center"
						bind:group={$treatmentFormStore.dailyFrequency}
						name="5"
						value="5">5 times daily</ListBoxItem
					>
					<ListBoxItem
						class="text-center"
						bind:group={$treatmentFormStore.dailyFrequency}
						name="6"
						value="6">6 times daily</ListBoxItem
					>
					<ListBoxItem
						class="text-center"
						bind:group={$treatmentFormStore.dailyFrequency}
						name="7"
						value="7">7 times daily</ListBoxItem
					>
				</ListBox>
			</Step>
			<Step locked={!$treatmentFormStore.stepsCompleted[3]}>
				<svelte:fragment slot="header">A Locked Step.</svelte:fragment>
				<TreatmentFormSchedules />
			</Step>
		</Stepper>
	</section>
</div>
