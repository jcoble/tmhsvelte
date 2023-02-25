<script lang="ts">
	import type { Treatments } from "dtotypes";
	import BiAlarm from "~icons/bi/alarm";
	import BiAlarmFill from "~icons/bi/alarm-fill";
	import { stop_propagation } from "svelte/internal";
	import MaterialSymbolsAddCircle from "~icons/material-symbols/add-circle";
	import MaterialSymbolsAdd from "~icons/material-symbols/add";
	import { goto } from "$app/navigation";
	export let item: Treatments;
	$: alarmClicked = false;

	function handleMouseDownIcon(e: Event) {
		e.stopImmediatePropagation();
	}

	function handleIconColor(item: Treatments): string {
		if (item.isMuted) {
			return "white";
		} else {
			return "#b7ead9";
		}
	}
</script>

<div>
	<button
		style="padding-left: 0; padding-right: 0; padding-bottom: 0; padding-top:0;"
		class:btn={!item.isActiveButton}
		class="flex  mt-6 mx-6 rounded-lg"
	>
		<div class=" ">
			<div class="relative group">
				<div
					class=" absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"
				/>
				<div
					class="bg-surface-400-500-token flex items-top justify-start leading-none py-6 relative ring-1 ring-gray-900/5 rounded-lg w-64"
				>
					<svg class="self-center ml-6 w-8 h-8 text-purple-600" fill="none" viewBox="0 0 24 24">
						<path
							stroke="currentColor"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="1.5"
							d="M6.75 6.75C6.75 5.64543 7.64543 4.75 8.75 4.75H15.25C16.3546 4.75 17.25 5.64543 17.25 6.75V19.25L12 14.75L6.75 19.25V6.75Z"
						/>
					</svg>
					<div>
						<div class="text-secondary-200">{item.name}</div>
						<div class="p-4 text-white">{item.dailyFrequency} time(s) daily</div>
						<div class="absolute right-0 bottom-0 mr-4 mb-4 ">
							<button
								on:mousedown={handleMouseDownIcon}
								on:click|stopPropagation|capture={(e) => (item.isMuted = !item.isMuted)}
								on:mouseenter={() => {
									setTimeout(() => {
										item.isActiveButton = true;
									}, 50);
								}}
								on:mouseleave={() => {
									setTimeout(() => {
										item.isActiveButton = false;
									}, 50);
								}}><BiAlarm color={handleIconColor(item)} /></button
							>
						</div>
					</div>
				</div>
			</div>
		</div>
	</button>
</div>

<style>
	.active {
		box-shadow: "0 35px 60px -15px rgba(0, 0, 0, 0.3)";
		border-width: 2px;
		border-color: "red";
	}

	.isMuted {
		background: green;
	}
</style>
