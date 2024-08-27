<script>
	import AmountInput from './amount-input.svelte';
	import ProgressBar from './progress.svelte';
	import BuysellButton from './buysell-button.svelte';
	import Checkbox from './checkbox.svelte';
	import { tradeBalance, tradeConfig } from '../store';
	import { currentSelectedPair } from '$lib/store/marketdata';
	export let autoBorrow = false;
	export let isBuying = true;
	export let asset;
	export let onboardingData;
	let progress = 0;
	let totalAmount = ($tradeConfig?.amount || 0) * ($tradeConfig?.quotePrice || 0);
	let baseAmount = $tradeConfig?.amount || 0;
	let quoteAmount = $tradeConfig?.quotePrice || 0;

	tradeBalance.subscribe(tb => {
		if (!quoteAmount) quoteAmount = tb.base.usd / tb.quote.usd;
	})

	$: showAdvanceSetting = false;
	$: postOnly = false;
</script>

<div data-v-39752d79="" class="order-form _8a4bb888">
	<!----><!----><!---->
	<AmountInput
		value={quoteAmount}
		decimal={4}
		assetLabel={asset.quote}
		min={0}
		isInsufficient={(amount) => false}
		onAmountChanged={(amount) => {
			tradeConfig.update((prev) => ({ ...prev, price: amount }));
		}}
		placeholder="Price"
	/>
	<AmountInput
		value={baseAmount}
		assetLabel={asset.base}
		min={0.00000001}
		isInsufficient={(amount) => false}
		onAmountChanged={(amount) => {
			tradeConfig.update((prev) => ({ ...prev, amount }));
			totalAmount = amount * quoteAmount
		}}
		placeholder="Amount"
	/>
	<ProgressBar onProgressUpdate={(prog) => {
		totalAmount = $tradeBalance.quote.balance * (prog/100);
		baseAmount = totalAmount / quoteAmount
			tradeConfig.update(prev => ({...prev, amount: baseAmount}))
	}} {onboardingData} {progress} autoBorrow={false} />
	<AmountInput
		value={totalAmount}
		assetLabel={asset.quote}
		decimal={4}
		min={0.00000001}
		isInsufficient={(amount) => $tradeBalance.quote.balance < amount}
		onAmountChanged={(total) => {
			baseAmount = total / quoteAmount
			tradeConfig.update(prev => ({...prev, amount: baseAmount}))
		}}
		placeholder="Total"
	/>

	<!---->
	<div data-key="" class="form-item" data-v-39752d79="">
		<!---->
		<div class="form-item-content">
			<!-- <div class="dd39985f">
				<div class="_07442100" on:click={() => (showAdvanceSetting = !showAdvanceSetting)}>
					<span class="ae48005d">
						Advanced
						<svg
							style="transform: rotate({showAdvanceSetting ? 180 : 0}deg);"
							class="svgicon d4379d29"
							width="9px"
							height="9px"
							x="0"
							y="0"
							viewBox="0 0 32 32"
							><g
								><path
									d="M29.604 10.528 17.531 23.356a2.102 2.102 0 0 1-3.062 0L2.396 10.528c-.907-.964-.224-2.546 1.1-2.546h25.008c1.324 0 2.007 1.582 1.1 2.546z"
								></path></g
							></svg
						>
					</span>
				</div>
				<Checkbox
					onCheckedChanged={(checked) => (postOnly = checked)}
					checked={postOnly}
					label="Post-Only"
					style={showAdvanceSetting ? '' : 'display: none;'}
				/>
			</div> -->
			<!---->
		</div>
	</div>
	<BuysellButton assetLabel={asset.base} {isBuying}/>
</div>
