<script lang="ts">
	export let item: import("$lib/types/types").ConceptProperty;
</script>

<!-- <div class="customItem">
	<div class="customItem_title">
		<div class="customItem_name">{JSON.stringify(item)}</div>
        {item.item.generic_name?.toUpperCase()}
        {item.item.dosage_form?.toUpperCase()}
	</div>
</div> -->

<li
	class="card bg-surface-200-700-token p-2 grid grid-cols-[auto_1fr_auto_auto] gap-4 items-center hover:bg-primary-500 hover:text-on-primary-token focus:bg-primary-500 focus:text-on-primary-token"
>
	{item?.name}
	<!-- {item.item.dosage_form?.toUpperCase()} -->
</li>

<style>
	.customItem {
		display: flex;
		align-items: center;
		cursor: default;

		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}

	img {
		width: 5px;
		padding: 5px 0;
		margin: 0 10px;
	}

	.customItem_title {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.customItem_name {
		display: inline-block;
		font-weight: 700;
		margin-right: 10px;
	}

	.customItem_tagline {
		display: inline-block;
	}
</style>
