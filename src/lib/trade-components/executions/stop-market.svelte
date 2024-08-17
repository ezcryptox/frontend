<script>
	import AmountInput from './amount-input.svelte';
	import ProgressBar from './progress.svelte';
	import BuysellButton from './buysell-button.svelte';
	export let asset;
	export let autoBorrow = false;
	export let isBuying = true;
	$: stop = 0;
	$: price = 0;
	$: amount = 0;
	let progress = 0;
</script>

<div data-v-39752d79="" class="order-form _8a4bb888">
	<!----><!----><!---->
	<AmountInput
		value={stop}
		assetLabel={asset.quote}
		min={-0}
		isInsufficient={(amount) => false}
		onAmountChanged={(amount) => {
			stop = amount;
		}}
		placeholder="Stop"
	/>
	<AmountInput
		value={price}
		disableInput
		assetLabel={asset.quote}
		min={-0}
		isInsufficient={(amount) => false}
		onAmountChanged={(amount) => {
			price = amount;
		}}
		placeholder="Price"
	/>
	<AmountInput
		value={amount}
		assetLabel={asset.base}
		min={-0}
		isInsufficient={(amount) => false}
		onAmountChanged={(value) => {
			amount = value;
		}}
		placeholder="Amount"
	/>
	<ProgressBar {progress} {autoBorrow} />

	<BuysellButton assetLabel={asset.base} {isBuying} on:click={() => {}} />
</div>
