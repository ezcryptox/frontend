<script>
	import AmountInput from './amount-input.svelte';
	import ProgressBar from './progress.svelte';
	import BuysellButton from './buysell-button.svelte';
	import { tradeBalance, tradeConfig } from '../store';
	export let asset;
	export let autoBorrow = false;
	export let isBuying = true;
	let progress = 0;
	let totalAmount = ($tradeConfig?.amount || 0) * ($tradeConfig?.quotePrice || 0);
	let baseAmount = $tradeConfig?.amount || 0;
</script>

<div data-v-39752d79="" class="order-form _8a4bb888">
	<!----><!----><!---->
	<AmountInput
		assetLabel={''}
		min={0}
        disableInput
		isInsufficient={(amount) => false}
		onAmountChanged={(amount) => {}}
		placeholder="Most optimal price"
	/>
	<AmountInput
		value={baseAmount}
		assetLabel={asset.base}
		min={-0}
		isInsufficient={(amount) => $tradeBalance.quote.balance < totalAmount}
		onAmountChanged={(amount) => {
			tradeConfig.update((prev) => ({ ...prev, amount }));
			totalAmount = amount * $tradeConfig.quotePrice
		}}
		placeholder="Amount"
	/>
	<ProgressBar onProgressUpdate={(prog) => {
		totalAmount = $tradeBalance.quote.balance * (prog/100);
		const amount = totalAmount / $tradeConfig.quotePrice
			tradeConfig.update(prev => ({...prev, amount}))
	}} {progress} {autoBorrow} />

	<BuysellButton assetLabel={asset.base} isBuying={isBuying} />
</div>
