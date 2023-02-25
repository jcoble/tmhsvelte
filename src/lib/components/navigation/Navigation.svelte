<script lang="ts">
	import { AppRail, AppRailTile, drawerStore } from "@skeletonlabs/skeleton";
	import IconAccountBox from "~icons/mdi/account-box";
	import CarbonReminder from "~icons/carbon/reminder";
	import MdiProgressClock from "~icons/mdi/progress-clock";
	import MaterialSymbolsHealthAndSafety from "~icons/material-symbols/health-and-safety";
	import MaterialSymbolsGfitHealth from "~icons/material-symbols/gfit-health";
	import { writable, type Readable, type Writable } from "svelte/store";
	import { goto } from "$app/navigation";
	import { page } from "$app/stores";
	import type { Page } from "@sveltejs/kit";
	import { navRailPaths } from "$lib/components/navigation/navrailpaths";
	import type { DrawerType } from "../types/component-types";

	// const storeValue: Writable<DrawerType> = writable({
	// 	value: 0,
	// 	shouldGoto: false
	// });

	async function tileClick(value: number) {
		storeValue.set(value);
		drawerClose();
		if (value)
			switch (value) {
				case 1:
					await goto("/protected/reminders");
					break;
				case 2:
					await goto("/protected/progress");
					break;
				case 3:
					await goto("/protected/providers");
					break;
				case 4:
					await goto("/protected/treatment");
					break;
				case 0:
					console.log("case 0");
					break;
			}
	}

	const storeValue: Writable<number> = writable(0);

	// export let pageStore: Page;
	function drawerClose(): void {
		drawerStore.close();
	}
	$: storeValue.subscribe(async (value) => {
		// console.log("storeValue.subscribe", value);
	});

	// if user is accessing one of these routes, we want to have the corresponding rail tile selected
	$: page.subscribe(async (pageValue) => {
		setStoreValue(pageValue);
	});

	function setStoreValue(pageValue: Page): void {
		for (let index = 0; index < navRailPaths.length; index++) {
			const element = navRailPaths[index];
			if (element.path === pageValue?.url.pathname) {
				storeValue.set(element.index);
				break;
			}
		}
	}
</script>

<AppRail border="bg-primary-100" selected={storeValue}>
	<svelte:fragment slot="lead">
		<AppRailTile on:click={async () => tileClick(1)} label="Reminder" title="Reminder" value={1}
			><CarbonReminder /></AppRailTile
		>
		<AppRailTile on:click={async () => tileClick(2)} label="Progress" title="Progress" value={2}
			><MdiProgressClock /></AppRailTile
		>
		<AppRailTile on:click={async () => tileClick(3)} label="Providers" title="Providers" value={3}
			><MaterialSymbolsHealthAndSafety /></AppRailTile
		>
		<AppRailTile on:click={async () => tileClick(4)} label="Treatment" title="Treatment" value={4}
			><MaterialSymbolsGfitHealth /></AppRailTile
		>
	</svelte:fragment>
</AppRail>
