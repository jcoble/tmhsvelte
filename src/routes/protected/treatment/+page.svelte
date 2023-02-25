<script lang="ts">
	import type { Treatments } from "dtotypes";
	import type { PageData } from "./$types";
	import MaterialSymbolsAdd from "~icons/material-symbols/add";
	import { goto } from "$app/navigation";
	import { stop_propagation } from "svelte/internal";
	import TreatmentCard from "$lib/components/TreatmentCard.svelte";

	export let data: PageData;
	$: items = data.treatments?.results ?? [];
</script>

<div class="flex flex-wrap justify-center">
	{#each items as item, i (item.id)}
		<TreatmentCard {item} />
	{/each}
</div>

<button
	class="btn-icon variant-filled-primary w-14 h-14 bg-primary-400-500-token absolute bottom-0 right-0 mr-4 mb-4"
	on:click|stopPropagation|capture={(e) => goto("/protected/treatment/create-update")}
	><MaterialSymbolsAdd class="w-6 h-10" /></button
>

<style>
</style>
