<script>
	import AmountInput from './amount-input.svelte';
	import ProgressBar from './progress.svelte';
	import BuysellButton from './buysell-button.svelte';
	import Checkbox from './checkbox.svelte';
	import { tradeBalance, tradeConfig } from '../store';
	import { cryptoQuotes, currentSelectedPair } from '$lib/store/marketdata';
	export let isBuying = true;
	export let asset;
	export let onboardingData;
	let progress = 0;
	let totalAmount = ($tradeConfig?.amount || 0) * ($tradeConfig?.quotePrice || 0);
	let borrowing =
		$tradeConfig.autoBorrow && totalAmount > $tradeBalance.quote.balance
			? Math.min(totalAmount - $tradeBalance.quote.balance, $tradeBalance.quote.borrowable)
			: 0;
	let baseAmount = $tradeConfig?.amount || 0;
	let quoteAmount = $tradeConfig?.quotePrice || 0;
	let lastQuotePair;

	tradeBalance.subscribe((tb) => {
		if (!quoteAmount) {
			quoteAmount = tb.base.usd / tb.quote.usd;
			tradeConfig.update((prev) => ({ ...prev, price: quoteAmount }));
		}
	});
	currentSelectedPair.subscribe((sp) => {
		if (!sp) return;
		if (!lastQuotePair || sp.symbol !== lastQuotePair || !quoteAmount) {
			const q = $cryptoQuotes?.[sp.symbol];
			if (q?.price) {
				quoteAmount = q.price;
				tradeConfig.update((prev) => ({ ...prev, price: quoteAmount }));
			}
			lastQuotePair = sp.symbol;
		}
	});

	$: showAdvanceSetting = false;
	$: postOnly = false;
</script>

<div data-v-39752d79="" class="order-form _8a4bb888">
	<!----><!----><!---->
	<AmountInput
		value={quoteAmount}
		decimal={$currentSelectedPair?.tradeLimit?.priceScale || 4}
		assetLabel={asset.quote}
		min={1}
		isInsufficient={(amount) => false}
		onAmountChanged={(amount) => {
			tradeConfig.update((prev) => ({ ...prev, price: amount }));
		}}
		placeholder="Price"
	/>
	<AmountInput
		value={baseAmount}
		{isBuying}
		assetLabel={asset.base}
		decimal={$currentSelectedPair?.tradeLimit?.quantityScale || 4}
		min={parseFloat($currentSelectedPair?.tradeLimit?.minQuantity || '0.00001')}
		isInsufficient={(amount) => (isBuying ? false : $tradeBalance.base.balance < amount)}
		onAmountChanged={(amount) => {
			tradeConfig.update((prev) => ({ ...prev, amount }));
			totalAmount = amount * quoteAmount;
		}}
		placeholder="Amount"
	/>
	<ProgressBar
		{isBuying}
		onProgressUpdate={(prog) => {
			totalAmount =
				($tradeBalance.quote.balance +
					($tradeConfig.autoBorrow ? $tradeBalance.quote.borrowable : 0)) *
				(prog / 100);
			baseAmount = totalAmount / quoteAmount;
			tradeConfig.update((prev) => ({ ...prev, amount: baseAmount }));
			borrowing =
				$tradeConfig.autoBorrow && totalAmount > $tradeBalance.quote.balance
					? Math.min(totalAmount - $tradeBalance.quote.balance, $tradeBalance.quote.borrowable)
					: 0;
		}}
		{onboardingData}
		{progress}
		autoBorrow={$tradeConfig.autoBorrow}
	/>

	<div class="c1783486" data-v-39752d79="">
		{#if $tradeConfig.autoBorrow && $tradeConfig.side.toLowerCase() === 'buy'}
			<dl>
				<dt>
					<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
					<span
					style="z-index: 99999"
						class="el-tooltip tips-text _6dd30582 focusing tooltip tooltip-overlay"
						data-tip="Max Available refers to the maximum amount of the chosen currency you can trade with borrowing, which equals your available amount plus the borrowable amount. It equals your available amount when the currency does not support borrowing or the borrowable amount is reduced to zero."
						tabindex="0">Max Available</span
					>
				</dt>
				<dd class="_75ff0e99">
					{($tradeBalance.quote.balance + $tradeBalance.quote.borrowable).toFixed(2)}
					{$currentSelectedPair?.quoteCurrencyName || '--'}
				</dd>
			</dl>
			<dl>
				<dt>
					<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
					<span
					style="z-index: 99999"
						class="el-tooltip tips-text _6dd30582 tooltip tooltip-overlay"
						data-tip="You will need to borrow funds when your order amount exceeds the available amount."
						aria-describedby="el-tooltip-7357"
						tabindex="0">Borrow</span
					>
				</dt>
				<dd class="c4065325">
					{borrowing.toFixed(2)}
					{$currentSelectedPair?.quoteCurrencyName || '--'}
				</dd>
			</dl>
			<dl style="display: {!!borrowing ? 'block' : 'none'};">
				<dt>
					<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
					<span
						class="el-tooltip tips-text _6dd30582"
						aria-describedby="el-tooltip-3387"
						tabindex="0">Borrow</span
					>
				</dt>
				<dd class="c4065325">
					{borrowing.toFixed(2)}
					{$currentSelectedPair?.quoteCurrencyName || '--'}
				</dd>
			</dl>
		{/if}
	</div>

	<AmountInput
		value={totalAmount}
		{isBuying}
		assetLabel={asset.quote}
		decimal={$currentSelectedPair?.tradeLimit?.amountScale || 4}
		min={$currentSelectedPair?.tradeLimit?.amountScale || 0.00001}
		isInsufficient={(amount) =>
			isBuying
				? $tradeBalance.quote.balance +
						($tradeConfig.autoBorrow ? $tradeBalance.quote.borrowable : 0) <
					amount
				: false}
		onAmountChanged={(total) => {
			baseAmount = total / quoteAmount;
			tradeConfig.update((prev) => ({ ...prev, amount: baseAmount }));

			borrowing =
				$tradeConfig.autoBorrow && total > $tradeBalance.quote.balance
					? Math.min(total - $tradeBalance.quote.balance, $tradeBalance.quote.borrowable)
					: 0;
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
	<BuysellButton assetLabel={asset.base} {isBuying} />
</div>
