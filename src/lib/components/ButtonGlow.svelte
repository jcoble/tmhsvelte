<script lang="ts">
	import type { ButtonType } from "$lib/components/types/component-types";
	import auth from "$lib/stores/authStore";
	import app from "$lib/stores/apiStore";
	import { sleep } from "$lib/utility/utils";
	import type { ConicStop } from "@skeletonlabs/skeleton";
	import classNames from "classnames";
	import { createEventDispatcher } from "svelte";
	export let isLoading = false;
	export let type: ButtonType = "button";
	export let text = "Submit";
	export let className = "";
	export let disabled = false;

	let loading: boolean = false;
	$: authStore = auth.store;
	$: appStore = app.store;

	const dispatch = createEventDispatcher();
	const handleClick = (e: any) => {
		dispatch("click", e.target.click);
	};

	const conicStops: ConicStop[] = [
		{ color: "transparent", start: 0, end: 25 },
		{ color: "#03e9f4", start: 75, end: 100 }
	];

	async function onClickHandler(
		event: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement }
	) {
		// await sleep(2000);
		// event.preventDefault();
		// event.stopPropagation();
		if (disabled) return;
		handleClick(event);
	}
</script>

<button disabled={$appStore.isLoading} on:click={handleClick} class="button-box {{ classNames }}">
	<a href="#" class="button-box">
		{#if $appStore.isLoading}
			<span />
			<span />
			<span />
			<span />
			<div>{text}</div>
		{:else}
			<div>{text}</div>
		{/if}
	</a>
</button>

<style>
	.button-box a {
		position: relative;
		display: inline-block;
		padding: 15px 20px;
		color: #03e9f4;
		font-size: 16px;
		text-decoration: none;
		text-transform: uppercase;
		overflow: hidden;
		transition: 0.5s;
		margin-top: 1px;
		letter-spacing: 4px;
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

	@keyframes btn-anim1 {
		0% {
			left: -100%;
		}
		50%,
		100% {
			left: 100%;
		}
	}

	.login-box a span:nth-child(2) {
		top: -100%;
		right: 0;
		width: 2px;
		height: 100%;
		background: linear-gradient(180deg, transparent, #03e9f4);
		animation: 1s linear infinite;
		animation-delay: 0.25s;
	}

	@keyframes btn-anim2 {
		0% {
			top: -100%;
		}
		50%,
		100% {
			top: 100%;
		}
	}

	.button-box a span:nth-child(3) {
		bottom: 0;
		right: -100%;
		width: 100%;
		height: 2px;
		background: linear-gradient(270deg, transparent, #03e9f4);
		animation: btn-anim3 1s linear infinite;
		/*animation-delay: .5s*/
	}

	@keyframes btn-anim3 {
		0% {
			right: -100%;
		}
		50%,
		100% {
			right: 100%;
		}
	}

	.button-box a span:nth-child(4) {
		bottom: -100%;
		left: 0;
		width: 2px;
		height: 100%;
		background: linear-gradient(360deg, transparent, #03e9f4);
		animation: btn-anim4 1s linear infinite;
		animation-delay: 0.75s;
	}

	@keyframes btn-anim4 {
		0% {
			bottom: -100%;
		}
		50%,
		100% {
			bottom: 100%;
		}
	}
</style>
