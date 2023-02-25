<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import { errorResponse, errorResponseExcept } from "@servicestack/client";
	import classNames from "classnames";

	export let responseStatus: boolean | null | undefined = null;
	export let type = "text";
	export let name = "";
	export let placeholder = "";
	export let value = "";
	export let className = "";
	export const model = "";

	$: errorField = errorResponse.call({ responseStatus }, name);
	$: cls = classNames(
		"form-control ",
		{ "is-invalid": errorField },
		className || "form-control-lg"
	);

	const dispatch = createEventDispatcher();
	const handleInput = (e: any) => {
		value = e.target.value;
		dispatch("input", value);
	};
</script>

<div>
	<input {type} {name} {value} class={cls} {placeholder} on:input={handleInput} />
	{#if errorField}
		<div class="invalid-feedback">{errorField}</div>
	{/if}
</div>
