import { dateFmt, toDate, toDateFmt } from "@servicestack/client";
import { onMount } from "svelte";
const formatter = new Intl.NumberFormat("en-US", {
	style: "currency",
	currency: "USD"
});
export const formatCurrency = (n?: number) => (n ? formatter.format(n) : "");
export const formatDate = (s?: string) => (s ? toDateFmt(s) : "");

export const dateInputFormat = (d: Date) => dateFmt(d).replace(/\//g, "-");

export function sanitizeForUi(dto: any) {
	if (!dto) return {};
	Object.keys(dto).forEach((key) => {
		let value = dto[key];
		if (typeof value == "string") {
			if (value.startsWith("/Date")) dto[key] = dateInputFormat(toDate(value));
		}
	});
	return dto;
}

export function onInterval(fn: () => void) {
	onMount(() => {
		const interval = setInterval(fn, 1000);
		return () => clearInterval(interval);
	});
}

export function sleep(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

// export function toDate(d: Date | string | undefined | null) {
// 	if (!d) return Date.now();
// 	if (typeof d == "string") return new Date(d);
// 	return d;
// }

export function toNumber(n: number | string | undefined | null) {
	if (!n) return 0;
	if (typeof n == "string") return parseFloat(n);
	return n;
}
