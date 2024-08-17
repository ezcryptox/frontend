<script>
	import AmountInput from './amount-input.svelte';
	import ProgressBar from './progress.svelte';
	import BuysellButton from './buysell-button.svelte';
	import Checkbox from './checkbox.svelte';
	export let asset;
	export let autoBorrow = false;
	export let isBuying = true;
	$: limitOrderSelected = false;
	$: trailingAmount = 0;
	$: trailingPercentage = 0;
	$: selectedTrailingDeltaIndex = 1;
	$: selectedTrailingDeltaPercentageIndex = -1;
	const deltaOptions = ['Percentage(%)', `Constant(${asset.quote})`];

	$: priceDelta = 0;
	$: pricePercentage = 0;
	$: selectedPriceDeltaIndex = 1;
	$: selectedPriceDeltaPercentageIndex = -1;
	$: amount = 0;
	let progress = 0;
	$: activationPrice = 0;
	$: activationPriceSelected = false;
</script>

<div data-v-39752d79="" class="order-form _8a4bb888">
	<div class="form-item-content">
		<div class="_9bbde898">
			<AmountInput
				style={'margin-top: 0px'}
				dropdownOption={{
					items: deltaOptions,
					selectedIndex: selectedTrailingDeltaIndex,
					callback: (index) => {
						selectedTrailingDeltaIndex = index;
						trailingPercentage = 0;
						selectedTrailingDeltaPercentageIndex = -1;
					}
				}}
				value={selectedTrailingDeltaIndex === 0 ? trailingPercentage : trailingAmount}
				assetLabel={selectedTrailingDeltaIndex === 0 ? '%' : asset.quote}
				min={0}
				isInsufficient={(amount) => false}
				onAmountChanged={(amount) => {
					if (selectedTrailingDeltaIndex === 0) trailingPercentage = amount;
					else trailingAmount = amount;
				}}
				placeholder="Trailing Delta"
			/>
			{#if selectedTrailingDeltaIndex === 0}
				<div class="_9570b203">
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<!-- svelte-ignore a11y-no-static-element-interactions -->
					{#each [5, 10] as percentage, index}
						<div
							class="e985443d {selectedTrailingDeltaPercentageIndex === index ? 'c0e8f3a4' : ''}"
							on:click={() => {
								selectedTrailingDeltaPercentageIndex = index;
								trailingPercentage = percentage;
							}}
						>
							<span>{percentage}%</span>
						</div>
					{/each}
				</div>
			{/if}
		</div>
	</div>

	<Checkbox
		label={'Limit Order'}
		onCheckedChanged={(checked) => (limitOrderSelected = checked)}
		checked={limitOrderSelected}
		tooltip={`If you tick the checkbox, a limit order will be placed after the Trailing Stop order is triggered.
For the limit order you should set a price delta (i.e. a percentage or a constant). Price of the limit order = Trigger price * (1 ± Price delta).
If you do not tick the checkbox, a market order will be placed after the Trailing Stop order is triggered.`}
	/>
	{#if limitOrderSelected}
		<div class="_9bbde898" style={'margin-top: 10px'}>
			<AmountInput
				style={'margin-top: 0px'}
				dropdownOption={{
					items: deltaOptions,
					selectedIndex: selectedPriceDeltaIndex,
					callback: (index) => {
						selectedPriceDeltaIndex = index;
						trailingPercentage = 0;
						selectedPriceDeltaPercentageIndex=-1;
					}
				}}
				min={0}
				value={selectedPriceDeltaIndex === 0 ? pricePercentage : priceDelta}
				assetLabel={selectedPriceDeltaIndex === 0 ? '%' : asset.quote}
				isInsufficient={(amount) => false}
				onAmountChanged={(amount) => {
					if (selectedPriceDeltaIndex === 0) pricePercentage = amount;
					else priceDelta = amount;
				}}
				placeholder="Price Delta"
			/>
			{#if selectedPriceDeltaIndex === 0}
				<div class="_9570b203">
					
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<!-- svelte-ignore a11y-no-static-element-interactions -->
					{#each [5, 10] as percentage, index}
					<div
						class="e985443d {selectedPriceDeltaPercentageIndex === index ? 'c0e8f3a4' : ''}"
						on:click={() => {
							selectedPriceDeltaPercentageIndex = index;
							pricePercentage = percentage;
						}}
					>
						<span>{percentage}%</span>
					</div>
				{/each}
					 
				</div>
			{/if}
		</div>
	{/if}

	<AmountInput
		value={amount}
		assetLabel={asset.base}
		min={0}
		isInsufficient={(amount) => false}
		onAmountChanged={(value) => {
			amount = value;
		}}
		placeholder="Amount"
	/>

	<ProgressBar {progress} {autoBorrow} />

	<Checkbox
		label={'Activation Price'}
		onCheckedChanged={(checked) => (activationPriceSelected = checked)}
		checked={activationPriceSelected}
		tooltip={`The activation price is the condition required to activate a Trailing Stop order.

When you set an activation price, the Trailing Stop order will only be activated when the last price reaches or exceeds the activation price. The actual trigger price for the order starts to be calculated after the order is activated.

If you don't set an activation price, the Trailing Stop order will be activated immediately after being placed.`}
	/>
	{#if activationPriceSelected}
		<AmountInput
			value={activationPrice}
			assetLabel={asset.quote}
			min={0}
			isInsufficient={(amount) => false}
			onAmountChanged={(amount) => {
				activationPrice = amount;
			}}
			placeholder="Activation Price"
		/>
	{/if}
	<BuysellButton assetLabel={asset.base} {isBuying} on:click={() => {}} />
</div>
