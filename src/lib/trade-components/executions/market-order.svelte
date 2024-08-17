<script>
	import AmountInput from './amount-input.svelte';
	import ProgressBar from './progress.svelte';
	import BuysellButton from './buysell-button.svelte';
	export let asset;
	export let autoBorrow = false;
	export let isBuying = true;
	$: price = 0;
	$: amount = 0;
	let progress = 0;
</script>

<div data-v-39752d79="" class="order-form _8a4bb888">
	<!----><!----><!---->
	<AmountInput
		value={price}
		assetLabel={''}
		min={0}
        disableInput
		isInsufficient={(amount) => false}
		onAmountChanged={(amount) => {
			price = amount;
		}}
		placeholder="Most optimal price"
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

	<BuysellButton assetLabel={asset.base} isBuying={isBuying} on:click={() => {}} />
</div>
