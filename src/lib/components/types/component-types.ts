export type ButtonType = "button" | "submit" | "reset" | undefined;

export enum Provider {
	"google" = 0,
	"facebook" = 1,
	"twitter" = 2,
	"github" = 3,
	"linkedin" = 4,
	"yahoo" = 5,
	"windowslive" = 6,
	"openid" = 7,
	"discord" = 8,
	Credentials,
	Google,
	Apple,
	Amazon,
	apple
}

export type DrawerType = {
	value: Number;
	shouldGoto: boolean;
};

export type NavRailPaths = {
	path: string;
	index: number;
	shouldNavigate: boolean;
};
