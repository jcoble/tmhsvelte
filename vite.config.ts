// @ts-nocheck

import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig, type UserConfig } from "vite";
import Icons from "unplugin-icons/vite";
/// <reference types="vite/client" />
/// <reference types="@types/node" />

// TODO: replace with production URL of .NET App

const DEPLOY_API = "https://$DEPLOY_API"; // e.g. 'https://vue-ssg-api.jamstacks.net'
const USE_DEV_PROXY = true; // Change to use CORS-free dev proxy at: http://localhost:3000/api
export const DEV_API = "https://localhost:5001";
const isProd = process.env.NODE_ENV === "production";

export default defineConfig(({ command, mode }) => {
	const buildLocal = command == "build" && mode == "development";
	const API_URL = isProd ? DEPLOY_API : USE_DEV_PROXY || buildLocal ? "" : DEV_API;

	return {
		plugins: [
			sveltekit(),
			Icons({
				compiler: "svelte"
			})
		],
		define: { API_URL: `"${API_URL}"` },
		// server: {
		// 	proxy: {
		// 		'/api': {
		// 			target: 'https://localhost:5001/api/',
		// 			changeOrigin: true,
		// 			secure: false
		// 		}
		// 	}
		// },
		// proxy: {
		// 	'/api': 'https://localhost:5001/api/'
		// }

		// server: {
		// 	proxy: USE_DEV_PROXY
		// 		? {
		// 				'/api': {
		// 					target: "https://localhost:5001",
		// 					changeOrigin: true,
		// 					secure: false
		// 				},
		// 				'/auth': {
		// 					target: 'https://localhost:5001',
		// 					changeOrigin: true,
		// 					secure: false
		// 				}
		// 		  }
		// 		: {}
		// }

		// server: {
		//   proxy: USE_DEV_PROXY
		//     ? {
		//         "/api": {
		//           target: DEV_API,
		//           changeOrigin: true,
		//           secure: false,
		//         },
		//         "/auth": {
		//           target: DEV_API,
		//           changeOrigin: true,
		//           secure: false,
		//         },
		//       }
		//     : {},
		// },

		// proxy: {
		// 	'/api': {
		// 		target: 'https://localhost:5001/api/',
		// 		changeOrigin: true,
		// 		secure: false
		// 		// configure: (proxy, _options) => {
		// 		// 	proxy.on('error', (err, _req, _res) => {
		// 		// 		console.log('proxy error', err);
		// 		// 	});
		// 		// 	proxy.on('proxyReq', (proxyReq, req, _res) => {
		// 		// 		console.log('Sending Request to the Target:', req.method, req.url);
		// 		// 	});
		// 		// 	proxy.on('proxyRes', (proxyRes, req, _res) => {
		// 		// 		console.log('Received Response from the Target:', proxyRes.statusCode, req.url);
		// 		// 	});
		// 		// }
		// 	}
		// }

		server: {
			proxy: USE_DEV_PROXY
				? {
						"/api": {
							target: DEV_API,
							changeOrigin: true,
							secure: false
						},
						"/auth": {
							target: DEV_API,
							changeOrigin: true,
							secure: false
						}
				  }
				: {}
		}
	};
});
