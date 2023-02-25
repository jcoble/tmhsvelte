import adapter from "@sveltejs/adapter-auto";
// import preprocess from "svelte-preprocess";
import { vitePreprocess } from "@sveltejs/kit/vite";
/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		alias: {
			// this will match a file
			dtotypes: "src/lib/types/dtos.ts",
			components: "./src/components"
		},
		adapter: adapter()
	},
	preprocess: [
		vitePreprocess({
			postcss: true
		})
	],
	vitePlugin: {
		experimental: {
			inspector: {
				holdMode: true
			}
		}
	}

	// kit: {
	// 	alias: {
	// 		// this will match a file
	// 		dtotypes: "../TMHAPI.ServiceModel/Types/dtos.ts",
	// 		components: "./src/components"
	// 	},
	// 	adapter: adapter()
	// },
	// // preprocess: vitePreprocess(),

	// preprocess: [
	// 	preprocess({
	// 		postcss: true
	// 	})
	// ]
};

export default config;
