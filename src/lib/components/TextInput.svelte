<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import { errorResponse, errorResponseExcept, ResponseStatus } from "@servicestack/client";
	import classNames from "classnames";

	export let responseStatus: ResponseStatus | null | undefined = null;

	export let labelCaption = "";
	export let type = "text";
	export let name = "";
	export let placeholder = "";
	export let value = "";
	export let className = "";
	export let required = false;
	export const model = "";

	$: errorField = errorResponse.call({ responseStatus }, name);
	$: cls = classNames(
		"form-control",
		{ "input-invalid input-error": errorField },
		className || "form-control-lg"
	);

	const dispatch = createEventDispatcher();
	const handleInput = (e: any) => {
		value = e.target.value;
		dispatch("input", value);
	};
</script>

<div>
	<label class="label mb-4">
		<span>{labelCaption}</span>
		<input
			class="{cls} mb-4 input"
			{type}
			{name}
			{value}
			{placeholder}
			{required}
			on:input={handleInput}
		/></label
	>
	{#if errorField}
		<label
			for={name}
			class="invalid-feedback mb-2 s-oNq8FGfeyE4N text-error-500-400-token text-error-content"
			>{errorField}</label
		>
	{/if}
</div>

<!--<div class="">-->
<!--    <div class="user-box">-->
<!--        <input type="text" name="" required="">-->
<!--        <label>Username</label>-->
<!--    </div>-->

<!--</div>-->
<style lang="css">
	.is-invalid {
		outline: red;
		border: red;
		border-style: solid;
		margin-bottom: 0px;
	}
</style>
