<script>
	import AmountInput from './amount-input.svelte';
	import ProgressBar from './progress.svelte';
	import BuysellButton from './buysell-button.svelte';
	import Checkbox from './checkbox.svelte';
	export let autoBorrow = false;
	export let isBuying = true;
	export let asset;
	export let onboardingData;
	let progress = 0;
	$: totalAmount = 0;
	$: baseAmount = convertToBaseAmount(totalAmount);
	$: quoteAmount = convertToQuoteAmount(totalAmount);

	const convertToBaseAmount = (total) => {
		return total * 0.3;
	};
	const convertToQuoteAmount = (total) => {
		return total * 0.8;
	};

	$: showAdvanceSetting = false;
	$: postOnly = false;
</script>

<div data-v-39752d79="" class="order-form _8a4bb888">
	<!----><!----><!---->
	<AmountInput
		value={quoteAmount}
		assetLabel={asset.quote}
		min={0}
		isInsufficient={(amount) => false}
		onAmountChanged={(amount) => {
			quoteAmount = amount;
		}}
		placeholder="Price"
	/>
	<AmountInput
		value={baseAmount}
		assetLabel={asset.base}
		min={0}
		isInsufficient={(amount) => false}
		onAmountChanged={(amount) => {
			baseAmount = amount;
		}}
		placeholder="Amount"
	/>
	<ProgressBar {onboardingData} {progress} {autoBorrow} />
	<AmountInput
		value={totalAmount}
		assetLabel={asset.quote}
		min={1}
		isInsufficient={(amount) => false}
		onAmountChanged={(total) => {
			totalAmount = total;
		}}
		placeholder="Total"
	/>

	<!---->
	<div data-key="" class="form-item" data-v-39752d79="">
		<!---->
		<div class="form-item-content">
			<div class="dd39985f">
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<!-- svelte-ignore a11y-no-static-element-interactions -->
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
			</div>
			<!---->
		</div>
	</div>
	<BuysellButton assetLabel={asset.base} {isBuying} on:click={() => {}} />
</div>
