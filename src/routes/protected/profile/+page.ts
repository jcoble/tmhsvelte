import type { PageLoad } from './$types';
export let ssr = false;
export const load = (async () => {
	return {};
}) satisfies PageLoad;
