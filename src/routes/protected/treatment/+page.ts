import type { PageLoad } from "./$types";
import treatments from "$lib/stores/treatments";

export const load = (async () => {
	const resp = await treatments.getTreatments();
	return {
		treatments: resp
	};
}) satisfies PageLoad;
