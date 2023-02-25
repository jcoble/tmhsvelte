<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import { errorResponse, errorResponseExcept } from "@servicestack/client";
	import classNames from "classnames";

	export let name = "";
	export let className = "";
	export let responseStatus = null;
	export let checked = false;
	export let required = false;
	export let value = "";

	let errorField = name && errorResponse.call({ responseStatus }, name);
	let cls = classNames("form-check", { "is-invalid": errorField, "form-control": errorField });
	let clsInput = classNames("form-check-input", { "is-invalid": errorField }, className || "");

	const dispatch = createEventDispatcher();
	const handleChange = (e: any) => {
		dispatch("change", e.target.checked);
	};
</script>

<div class="form-control">
	<label class="cursor-pointer label space-evenly " for={name}>
		<span class="label-text"><slot /></span>
		<input {required} type="checkbox" class="checkbox {cls}" id={name} bind:checked />
	</label>

	<!-- <label class="form-check-label" for={name}><slot /></label> -->
</div>
{#if errorField}
	<div class="invalid-feedback">{errorField}</div>
{/if}

<style>
	.checkbox-box:clicked {
		background: #03e9f4;
		color: #fff;
		border-radius: 8px;
		box-shadow: 0 0 5px #03e9f4, 0 0 25px #03e9f4, 0 0 50px #03e9f4, 0 0 100px #03e9f4;
	}
</style>
