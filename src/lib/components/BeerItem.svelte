<script>
	/**
	 * @type {any}
	 */
	export let item;
</script>

<div class="customItem">
	<div class="customItem_title">
		<div class="customItem_name">{JSON.stringify(item)}</div>
		<!-- <div class="customItem_tagline">asdf</div> -->
		{item.text.generic_name}
	</div>
</div>

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
