<script lang="ts">
	import type { ButtonType } from "./types/component-types";
	import { onMount } from "svelte";
	import { createEventDispatcher } from "svelte";
	import ButtonSpinner from "./ButtonSpinner.svelte";
	// import { ButtonSpinner } from "./ButtonSpinner.svelte";
	// import { ButtonLoader } from "./ButtonLoader.svelte";

	const dispatch = createEventDispatcher();

	export let text: string;
	export let type: ButtonType;
	export let disabled: boolean;
	export let loading: boolean;
	export let primary: boolean;
	export let secondary: boolean;
	export let onClick: () => void;

	let button: HTMLButtonElement;

	onMount(() => {
		button.addEventListener("click", () => {
			dispatch("click");
		});
	});

	$: classes = [
		"btn",
		primary ? "btn--primary" : "",
		secondary ? "btn--secondary" : "",
		disabled ? "btn--disabled" : "",
		loading ? "btn--loading" : ""
	].join(" ");
</script>

// write out a button with a loading spinner
<button class={classes} {type} {disabled} bind:this={button}>
	{#if loading}
		<ButtonSpinner />
	{:else}
		{text}
	{/if}
</button>

<style>
	.btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: 0.5rem 1rem;
		border: 1px solid transparent;
		border-radius: 0.25rem;
		font-size: 1rem;
		font-weight: 600;
		line-height: 1.5;
		color: #fff;
		background-color: #000;
		transition: all 0.15s ease-in-out;
	}

	.btn--primary {
		background-color: #000;
		border-color: #000;
	}

	.btn--secondary {
		background-color: #fff;
		border-color: #fff;
		color: #000;
	}

	.btn--disabled {
		opacity: 0.5;
		pointer-events: none;
	}

	.btn--loading {
		pointer-events: none;
	}

	.btn:hover {
		background-color: #000;
		border-color: #000;
	}

	.btn--primary:hover {
		background-color: #000;
		border-color: #000;
	}

	.btn--secondary:hover {
		background-color: #fff;
		border-color: #fff;
		color: #000;
	}
</style>
