<script lang="ts">
	import {
		AppShell,
		AppBar,
		Avatar,
		LightSwitch,
		storePopup,
		type PopupSettings,
		popup,
		setInitialClassState,
		modeOsPrefers,
		modeUserPrefers,
		modeCurrent
	} from "@skeletonlabs/skeleton";
	import "@skeletonlabs/skeleton/themes/theme-skeleton.css";
	// import "$lib/css/themes/purple.css";
	import "@skeletonlabs/skeleton/styles/all.css";
	import "../app.postcss";

	import auth from "$lib/stores/authStore";
	import type { LayoutData } from "./$types";
	import { Drawer, drawerStore } from "@skeletonlabs/skeleton";
	import Navigation from "$lib/components/navigation/Navigation.svelte";
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from "@floating-ui/dom";

	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
	export let data: LayoutData;
	$: authStore = auth.store;

	$: classesSidebar = $authStore.user == null ? "w-0" : "w-0 lg:w-20";

	let profileSettings: PopupSettings = {
		// Set the event as: click | hover | hover-click
		event: "click",
		// Provide a matching 'data-popup' value.
		target: "profilePopup"
	};

	function drawerOpen(): void {
		drawerStore.open({
			width: "w-22",
			bgDrawer: "bg-surface-500/5"
		});
	}

	function drawerClose(): void {
		drawerStore.close();
	}
</script>

<!-- <svelte:head
	>{@html `<script>${setInitialClassState.toString()} setInitialClassState();</script>`}</svelte:head
> -->
<Drawer width="w-20">
	<hr />
	<Navigation /></Drawer
>

<AppShell slotSidebarLeft="bg-surface-500/5 {classesSidebar}">
	<svelte:fragment slot="header">
		<AppBar background="bg-surface-200-700-token">
			<!-- <svelte:fragment slot="lead">
				<h1 class="">
					<span class="gradient-heading">Track </span><span class="gradient-heading">
						My
					</span><span class="gradient-heading-r">Health</span>
				</h1>
			</svelte:fragment>  -->

			<svelte:fragment slot="lead">
				<div class="flex items-center">
					{#if $authStore.user != null}
						<button class="lg:hidden btn btn-sm mr-4" on:click={drawerOpen}>
							<span>
								<svg viewBox="0 0 100 80" class="fill-token w-4 h-4">
									<rect width="100" height="20" />
									<rect y="30" width="100" height="20" />
									<rect y="60" width="100" height="20" />
								</svg>
							</span>
						</button>
					{/if}
					<h2 class="">
						<span class="gradient-heading">Track </span><span class="gradient-heading-r">
							My
						</span><span class="gradient-heading-l">Health</span>
					</h2>
				</div>
			</svelte:fragment>

			<!-- <button
				class="btn-filled-secondary h16"
				on:click={() => ($appStore.isLoading = !$appStore.isLoading)}
			>
				{$appStore.isLoading ? "Load Test" : "Testing"}
			</button> -->

			<svelte:fragment slot="trail">
				<LightSwitch height="h-6" />
				{#if $authStore.user != null}
					<span>
						<button use:popup={profileSettings}>
							<Avatar src={$authStore?.user?.profileUrl} />
						</button>
						<nav class="list-nav card p-4 w-64 shadow-xl" data-popup="profilePopup">
							<ul>
								<li><a href="/protected/profile">Profile</a></li>
								<li><a href="/protected/account">Account</a></li>
								<li><a on:click={async () => await auth.signOut(true)}>Sign Out</a></li>
							</ul>
						</nav>
					</span>
					<button type="button" on:click={async () => await auth.signOut(true)}>Sign Out</button>
				{:else if location.pathname !== "/login"}
					<a href="/login" class="btn-primary btn variant-outline-primary btn-base"> Login </a>
				{:else}
					<a href="/register" class="btn-primary btn variant-outline-primary btn-base">
						Register
					</a>
				{/if}
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>

	<svelte:fragment slot="sidebarLeft">
		<Navigation />
	</svelte:fragment>
	<slot />
</AppShell>
