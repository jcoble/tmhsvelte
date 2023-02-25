<script lang="ts">
	import { goto } from "$app/navigation";
	import ButtonGlow from "$lib/components/ButtonGlow.svelte";
	import CheckBox from "$lib/components/CheckBox.svelte";
	import ErrorSummary from "$lib/components/ErrorSummary.svelte";
	import OAuthButton from "$lib/components/OAuthButton.svelte";
	import TextInput from "$lib/components/TextInput.svelte";
	import { Provider } from "$lib/components/types/component-types";
	import app from "$lib/stores/apiStore";
	import auth from "$lib/stores/authStore";
	import classNames from "classnames";
	import { Register, ResponseStatus } from "dtotypes";
	import type { PageData } from "./$types";
	export let data: PageData;
	export let responseStatus: ResponseStatus | null | undefined = null;
	export let displayName = "";
	export let email = "";
	export let password = "";
	export let confirmPassword = "";
	export let autoLogin = true;
	export let isLoading: boolean = false;

	$: appStore = app.store;

	$: cls = classNames({ error: responseStatus, isLoading });
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

	export let rememberMe = true;
	let count = 0;

	const newUser = () => {
		displayName = "Jesse Coble";
		email = "jc@gmail.com";
		password = confirmPassword = "111111Jc";
		autoLogin = true;
	};

	// TODO - validation not working
	const submit = async () => {
		try {
			app.isLoading = true;
			responseStatus = null;

			const response = await auth.register(
				new Register({
					displayName,
					email: email,
					password,
					confirmPassword,
					autoLogin
				})
			);

			if (response) {
				auth.signIn(response);
				await goto("/protected/reminders");
			}
		} catch (e: any) {
			// console.log(e);
			responseStatus = e.responseStatus || e;
		} finally {
			app.isLoading = false;
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
			// await sleep(111000);
			const resp = await auth.signInWithOAuth(provider);
		} catch (e: any) {
			// console.log(e);
			setAllLoading(false);
			responseStatus = e.responseStatus || e;
		} finally {
			setAllLoading(false);
			app.isLoading = false;
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
	<title>Register Form</title>
	<meta name="robots" content="noindex, nofollow" />
</svelte:head>

<div>
	<form rel="form" class="max-w-[400px] mx-auto p-4 {cls}">
		<div class="z-10 py-10">
			<h3 class="mb-4 text-2xl  text-center">Sign up for your Account</h3>
			<div class="mb-3">
				<ErrorSummary
					except="displayName,
                    email,
                    password,
                    confirmPassword"
					{responseStatus}
					className="bg-transparent text-error-content text-error"
					required={true}
				/>
			</div>
			<TextInput
				labelCaption="Email"
				placeholder="Email"
				className=""
				type="email"
				name="Email"
				bind:value={email}
				{responseStatus}
				required={true}
			/>
			<TextInput
				labelCaption="Full Name"
				placeholder="Full Name"
				className="input-primary"
				type="text"
				name="DisplayName"
				bind:value={displayName}
				{responseStatus}
				required={true}
			/>
			<TextInput
				labelCaption="Password"
				placeholder="Password"
				className="input-primary"
				type="password"
				name="Password"
				bind:value={password}
				{responseStatus}
				required={true}
			/>
			<TextInput
				labelCaption="Confirm Password"
				placeholder="Confirm Password"
				className="input-primary"
				type="password"
				name="ConfirmPassword"
				bind:value={confirmPassword}
				{responseStatus}
				required={true}
			/>
			<div class="flex justify-between px-4 pb-4">
				<CheckBox className="checkbox-accent pl-10" name="rememberMe" bind:checked={autoLogin}
					>Remember Me</CheckBox
				>
				<div class="block mt-4 ">
					<ButtonGlow
						text="Sign Up"
						type="submit"
						on:click={submit}
						isLoading={isCredentialLoading}
						disabled={$appStore.isLoading}
					/>
				</div>
			</div>

			<OAuthButton
				disabled={$appStore.isLoading || isGoogleLoading}
				isLoading={isGoogleLoading}
				provider={Provider.google}
				className="text-black bg-white rounded-md mb-4"
				on:handleClick={(e) => handleOAuthClick(e)}
			/>

			<OAuthButton
				disabled={$appStore.isLoading || isDiscordLoading}
				provider={Provider.discord}
				isLoading={isDiscordLoading}
				className="rounded-md mb-4"
				on:handleClick={(e) => handleOAuthClick(e)}
			/>
			<p class="w-full mt-4 text-sm text-center text-gray-800">
				Already have an account? <a href="/login" class=" first-letter:underline text-white"
					>Sign in here</a
				>
			</p>

			<button
				type="button"
				class="btn btn-outline-info btn-sm"
				on:click|preventDefault={(e) => newUser()}
			>
				Test
			</button>
			<!-- <a href="https://localhost:5001/auth/google?continue=https://localhost:5001/ui/">Google</a> -->
		</div>
	</form>
</div>
