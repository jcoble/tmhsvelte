<script lang="ts">
	import classNames from "classnames";
	import CheckBox from "$lib/components/CheckBox.svelte";
	import ErrorSummary from "$lib/components/ErrorSummary.svelte";
	import TextInput from "$lib/components/TextInput.svelte";
	import auth from "$lib/stores/authStore";
	import type { ResponseStatus } from "@servicestack/client";
	import { Authenticate } from "dtotypes";
	import { onMount } from "svelte";
	import OAuthButton from "$lib/components/OAuthButton.svelte";
	import { RingLoader } from "svelte-loading-spinners";
	import { goto } from "$app/navigation";
	import { Provider } from "$lib/components/types/component-types";
	import app, { client } from "$lib/stores/apiStore";
	import ButtonGlow from "$lib/components/ButtonGlow.svelte";
	import { sleep } from "$lib/utility/utils";

	export let responseStatus: ResponseStatus | null | undefined = null;
	export let rememberMe = true;
	export let userName = "";
	export let password = "";
	export let isLoading: boolean = false;
	export let cls = classNames({ error: responseStatus, isLoading });
	$: cls = classNames({ error: responseStatus });

	$: isCredentialLoading = false;
	$: isGoogleLoading = false;
	$: isFacebookLoading = false;
	$: isAppleLoading = false;
	$: isAmazonLoading = false;
	$: isTwitterLoading = false;
	$: isLinkedInLoading = false;
	$: isWindowsLiveLoading = false;
	$: isDiscordLoading = false;
	$: isOpenIdLoading = false;
	$: isLoading =
		isCredentialLoading ||
		isGoogleLoading ||
		isFacebookLoading ||
		isAppleLoading ||
		isAmazonLoading ||
		isTwitterLoading ||
		isLinkedInLoading ||
		isWindowsLiveLoading ||
		isDiscordLoading ||
		isOpenIdLoading;

	$: appStore = app.store;

	const switchUser = () => {
		userName = "jc@gmail.com";
		password = "111111Jc";
	};

	const submit = async () => {
		try {
			app.isLoading = true;
			responseStatus = null;
			isCredentialLoading = true;
			const response = await client.post(
				new Authenticate({
					provider: "credentials",
					userName,
					password,
					rememberMe
				})
			);

			auth.signIn(response);
			await goto("/protected/reminders");
		} catch (e: any) {
			// console.log(e);
			isCredentialLoading = false;
			responseStatus = e.responseStatus || e;
		} finally {
			app.isLoading = isCredentialLoading = false;
		}
	};

	async function handleOAuthClick(event: CustomEvent<any>) {
		event.preventDefault();
		const providerNumber = event?.detail?.provider;
		const provider = Provider[providerNumber];

		switch (providerNumber) {
			case Provider.discord:
				isDiscordLoading = true;
				break;
			case Provider.google:
				isGoogleLoading = true;
				break;
			case Provider.facebook:
				isFacebookLoading = true;
				break;
			case Provider.apple:
				isAppleLoading = true;
				break;
			case Provider.twitter:
				isTwitterLoading = true;
				break;
			case Provider.linkedin:
				isLinkedInLoading = true;
				break;
			case Provider.windowslive:
				isWindowsLiveLoading = true;
				break;
			case Provider.openid:
				isOpenIdLoading = true;
				break;
			default:
				break;
		}

		try {
			app.isLoading = true;
			responseStatus = null;

			const resp = await auth.signInWithOAuth(provider);
		} catch (e: any) {
			// console.log(e);
			setAllLoading(false);
			responseStatus = e.responseStatus || e;
		} finally {
			app.isLoading = false;
			setAllLoading(false);
		}
	}

	function handleKeyDown(e: { keyCode: number }) {
		if (e.keyCode === 13) {
			submit();
		}
		return null;
	}

	function setAllLoading(arg0: boolean) {
		isDiscordLoading = arg0;
		isGoogleLoading = arg0;
		isFacebookLoading = arg0;
		isAppleLoading = arg0;
		isTwitterLoading = arg0;
		isLinkedInLoading = arg0;
		isWindowsLiveLoading = arg0;
		isOpenIdLoading = arg0;
		isCredentialLoading = arg0;
	}
</script>

<svelte:window on:keydown={handleKeyDown} />

<svelte:head>
	<title>Login Form</title>
	<meta name="robots" content="noindex, nofollow" />
	<!-- <script src="https://accounts.google.com/gsi/client" async defer></script> -->
</svelte:head>
<div class="max-w-[400px] mx-auto p-4 {cls}">
	<form action="login" method="POST" rel="form" class="z-10 py-10">
		<div class="z-10 py-10">
			<h3 class="mb-6 text-2xl font-medium text-center">Sign in to your Account</h3>
			<div class="mb-3">
				<ErrorSummary
					except="UserName,Password"
					{responseStatus}
					className=" bg-transparent text-error-content text-error"
				/>
			</div>
			<TextInput
				labelCaption="Email"
				placeholder="Email"
				className="mb-5 input-bordered input-accent"
				type="email"
				name="UserName"
				bind:value={userName}
				{responseStatus}
				required={true}
			/>
			<TextInput
				labelCaption="Password"
				placeholder="password"
				className="mb-5 input-bordered input-accent"
				type="password"
				name="password"
				bind:value={password}
				{responseStatus}
				required={true}
			/>

			<div class="flex justify-between px-4 mb-4">
				<CheckBox className="checkbox-accent pl-10" name="rememberMe" bind:checked={rememberMe}
					>Remember Me</CheckBox
				>
				<div class="block mt-4 ">
					<ButtonGlow
						on:click={submit}
						disabled={$appStore.isLoading || isCredentialLoading}
						text="Sign In"
						type="submit"
						isLoading={isCredentialLoading}
					/>
				</div>
			</div>

			<OAuthButton
				disabled={$appStore.isLoading || isGoogleLoading}
				isLoading={isGoogleLoading}
				provider={Provider.google}
				className="text-black bg-white rounded-md mb-4"
				on:handleClick={handleOAuthClick}
			/>

			<OAuthButton
				disabled={$appStore.isLoading || isDiscordLoading}
				provider={Provider.discord}
				isLoading={isDiscordLoading}
				className="rounded-md mb-4"
				on:handleClick={handleOAuthClick}
			/>
			<p class="w-full mt-4 text-sm text-center text-gray-800">
				Don't have an account? <a href="/register" class=" first-letter:underline text-white"
					>Sign up here</a
				>
			</p>
		</div>
	</form>

	<button class="btn btn-outline-info btn-sm" on:click|preventDefault={(e) => switchUser()}>
		Test
	</button>
</div>
