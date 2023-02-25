import type { NavRailPaths } from "../types/component-types";

export const paths: { [route: string]: number } = {
	"/protected/reminders": 1,
	"/protected/progress": 2,
	"/protected/providers": 3,
	"/protected/treatment": 4,
	"/protected/treatment/create-update": 4
};

export const navRailPaths: NavRailPaths[] = [
	{ path: "/protected/reminders", index: 1, shouldNavigate: true },
	{ path: "/protected/progress", index: 2, shouldNavigate: true },
	{ path: "/protected/providers", index: 3, shouldNavigate: true },
	{ path: "/protected/treatment", index: 4, shouldNavigate: true },
	{ path: "/protected/treatment/create-update", index: 4, shouldNavigate: false }
];
