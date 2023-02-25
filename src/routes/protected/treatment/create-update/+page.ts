import type { PageLoad } from "./$types";

export const load = (async ({ parent }) => {
	const data = await parent();
	return data;
	// return {};
}) satisfies PageLoad;
