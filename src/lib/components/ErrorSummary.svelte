<script lang="ts">
	import { errorResponse, errorResponseExcept } from "@servicestack/client";
	import type { AuthenticateResponse } from "dtotypes";

	export let except = "";
	export let className = "";
	export let responseStatus: AuthenticateResponse | null | undefined = null;
	export let required = false;

	$: errorField = errorResponseExcept.call({ responseStatus }, except);
</script>

{#if errorField}
	<div class="{{ className }} text-error-800 alert alert-danger input-warning mt-2 ">
		{errorField}
	</div>
{/if}
