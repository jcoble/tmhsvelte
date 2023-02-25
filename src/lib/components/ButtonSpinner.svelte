<script lang="ts">
	import app from "$lib/stores/apiStore";
	import type { ButtonType } from "$lib/components/types/component-types";
	import { createEventDispatcher } from "svelte";
	import classNames from "classnames";
	import type { ConicGradient, ConicStop } from "@skeletonlabs/skeleton";
	import { RingLoader } from "svelte-loading-spinners";

	export let className = "";
	export let loading = false;
	export let type: ButtonType = "button";
	export let height = 14;
	export let buttonWidth = "200px";
	export let buttonHeight = "30px";
	export let text = "Submit";
	export let color = "black";
	export let unit = "px";
	export let duration = "1s";
	export let pause = false;
	export let disabled = false;

	height = 40;
	$: appStore = app.store;
	const dispatch = createEventDispatcher();
	const handleClick = (e: any) => {
		$appStore.isLoading = !$appStore.isLoading;
		dispatch("click", e.target.click);
	};
	const conicStops: ConicStop[] = [
		{ color: "transparent", start: 0, end: 25 },
		{ color: "#03e9f4", start: 75, end: 100 }
	];
</script>

<button {disabled} on:click={handleClick} {type} class="button-box btn">
	<div
		style="width: {buttonWidth}; height: {buttonHeight}"
		class="self-center flex justify-center items-center"
	>
		{#if loading}
			<RingLoader size={height} {color} unit="px" {duration} {pause} />
		{:else}
			<div class="text-black">{text}</div>
		{/if}
	</div>
</button>

<style>
	.btn {
		display: flex;
		justify-content: center;
		align-items: center;
		border: none;
		border-radius: 4px;
		background-color: #03e9f4;
		color: #ffffff;
		font-size: 16px;
		font-weight: 600;
		letter-spacing: 0.5px;
		line-height: 24px;
		text-align: center;
		text-transform: uppercase;
		cursor: pointer;
		transition: all 0.2s ease-in-out;
	}

	.button-box a:hover {
		background: #03e9f4;
		color: #fff;
		border-radius: 2px;
		box-shadow: 0 0 5px #03e9f4, 0 0 25px #03e9f4, 0 0 50px #03e9f4, 0 0 100px #03e9f4;
	}

	.button-box a span {
		position: absolute;
		display: block;
	}

	.button-box a span:nth-child(1) {
		top: 0;
		left: -100%;
		width: 100%;
		height: 2px;
		background: linear-gradient(90deg, transparent, #03e9f4);
		animation: btn-anim1 1s linear infinite;
	}

	.btn:hover {
		background-color: #03e9f4;
	}

	.btn:active {
		background-color: #03e9f4;
	}

	.btn:focus {
		outline: none;
	}

	.btn:disabled {
		background-color: #03e9f4;
		color: #ffffff;
		cursor: not-allowed;
	}

	.btn:disabled:hover {
		background-color: #03e9f4;
		color: #ffffff;
	}

	.btn:disabled:active {
		background-color: #03e9f4;
		color: #ffffff;
	}

	.btn:disabled:focus {
		outline: none;
	}

	.btn--primary {
		background-color: #03e9f4;
	}

	.btn--primary:hover {
		background-color: #03e9f4;
	}

	.btn--primary:active {
		background-color: #03e9f4;
	}

	.btn--primary:focus {
		outline: none;
	}

	.btn--primary:disabled {
		background-color: #03e9f4;
		color: #ffffff;
		cursor: not-allowed;
	}

	.btn--primary:disabled:hover {
		background-color: #03e9f4;
		color: #ffffff;
	}

	.btn--primary:disabled:active {
		background-color: #03e9f4;
		color: #ffffff;
	}

	.btn--primary:disabled:focus {
		outline: none;
	}

	.btn--secondary {
		background-color: #03e9f4;
	}

	.btn--secondary:hover {
		background-color: #03e9f4;
	}

	.btn--secondary:active {
		background-color: #03e9f4;
	}

	.spinner-button {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
		width: 100;
		border: none;
		border-radius: 4px;
		background-color: #03e9f4;
		color: #ffffff;
		font-size: 16px;
		font-weight: 600;
		letter-spacing: 0.5px;
		line-height: 24px;
		text-align: center;
		text-transform: uppercase;
		cursor: pointer;
		transition: all 0.2s ease-in-out;
	}

	.button--loading::after {
		content: "";
		position: absolute;
		width: 13px;
		height: 13px;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		margin: auto;
		border: 4px solid transparent;
		border-top-color: #ffffff;
		border-radius: 50%;
		animation: button-loading-spinner 1s ease infinite;
	}
</style>
