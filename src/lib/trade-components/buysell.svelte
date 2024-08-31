<script>
	import { slideFade } from '$lib/transitions';
	import { findPos } from './utils';
	import { getContext } from 'svelte';
	import { isLogin } from '$lib/store/profile';
	import LimitOrder from './executions/limit-order.svelte';
	import MarketOrder from './executions/market-order.svelte';
	import { cryptoQuotes, currentSelectedPair } from '$lib/store/marketdata';
	import { tradeBalance, tradeConfig } from './store';
		 

	export let onboardingData;
	export let marginTradingEnabled;
	$: asset =  {
		base:'--',
		quote:'--'
	};
	$: autoBurrow = false;

	$: showDropDownMenu = false;
	const DISMISS_DURATION = 300;
	let showDropDownMenuId;
	let drapDownMenuCoordinate = 0;

	$: orderType =  'limit';
	$: tradeSide = 'buy'

	const onOrderTypeSelected = (type) => {
		orderType = type;
		tradeConfig.update(prev => ({...prev, orderType: type}))
	};

	const onSideChange = (side) => {
		tradeSide = side;
		tradeConfig.update(prev => ({...prev, side}))
	}
	

	const toggleOrderModal = getContext('toggleOrderModal');
	const toggleRedeemModal = getContext('toggleRedeemModal');
	const toggleMarginModal = getContext('toggleMarginModal');

	$: onboarding_1 = false;
	$: onboarding_2 = false;
	let _onboardingFocusRef = null;
	let _onboardingFocusRef2 = null;
	const updateData = getContext('updateOnboardingData');


	currentSelectedPair.subscribe(pair => {
		if (!pair) return
		asset = {
			base: pair.baseCurrencyName,
			quote: pair.quoteCurrencyName
		}
		tradeConfig.update(prev => ({
			...prev,
			amount: 0,
			orderType,
			pair: `${asset.base}/${asset.quote}`,
			side: tradeSide
		}))
	})
	tradeBalance.subscribe(balances => {
		if (!balances || balances.base.symbol !== $currentSelectedPair?.baseCurrencyName || balances.quote.symbol !== $currentSelectedPair.quoteCurrencyName) return;
		tradeConfig.update(prev => ({...prev, quotePrice: balances.base.usd / balances.quote.usd}))
	});
	cryptoQuotes.subscribe((q) => {
		const pair = $currentSelectedPair;
		if (!q || !pair) return;
		if (q[pair.symbol] && orderType !== 'limit') {
			tradeConfig.update(prev => ({...prev, quotePrice: q[pair.symbol].price}));
		}
	});
	$: {
		if (onboardingData && (_onboardingFocusRef || _onboardingFocusRef2)) {
			if (onboardingData.show){
				onOrderTypeSelected(0);
				autoBurrow = true;
			}
			else autoBurrow = false;

			if (onboardingData.show && onboardingData.step === 3 && onboardingData.id !== 'place_order') {
				const coordinate = findPos(_onboardingFocusRef);
				updateData({
					...onboardingData,
					id: 'place_order',
					title: 'Place an order',
					message: 'Try placing an order in the market. Buy or sell at the best price.',
					top: coordinate[0] + (coordinate[3] - coordinate[0]) / 2,
					left: coordinate[1] - onboardingData.width - 30,
					placeLeft: true
				});
			}

			if (onboardingData.show && onboardingData.step === 4 && onboardingData.id !== 'auto_borrow') {
				const coordinate = findPos(_onboardingFocusRef2);
				updateData({
					...onboardingData,
					id: 'auto_borrow',
					title: 'Auto borrow',
					message:
						'Turn on Auto Borrow to use margin trading. Magnify your returns with borrowed funds.',
					top: coordinate[0] - 70,
					left: coordinate[1] - onboardingData.width - 30,
					placeLeft: true
				});
			}
			onboarding_1 = onboardingData.show && onboardingData.step === 3;
			onboarding_2 = onboardingData.show && onboardingData.step === 4;
		}
	}
</script>

<div class="d568c879">
	<section class="_23f4b355 {$tradeConfig.placingOrder ? 'pointer-events-none opacity-45' : ''}">
		<nav class="_3f2fed70">
			<button on:click={() => onSideChange('buy')} class={tradeSide === 'buy' ? 'ad797042' : ''}> Buy </button>
			<button on:click={() => onSideChange('sell')} class={tradeSide === 'sell' ? 'ad797042' : ''}> Sell </button>
		</nav>
		<div
			user-guide="4"
			class="a668decd {onboarding_2 ? 'c806c316' : ''}"
			style={onboarding_2 ? 'pointer-events: none; z-index: 1000002; position: relative;' : ''}
		>
			<div user-guide-4="" class="_9654432c">
				<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
				<!-- svelte-ignore a11y-mouse-events-have-key-events -->
				<!-- svelte-ignore a11y-no-static-element-interactions -->
				<div class="_19abeeda">
					<span
						disabled={true}
						bind:this={_onboardingFocusRef2}
						class="polo-switch polo-switch-middle {autoBurrow ? 'is-checked' : ''}"
					>
						<span class="polo-switch-box">
							<input
								disabled={true}
								type="checkbox"
								on:change={(e) => {
									if (e.target.checked && !marginTradingEnabled) {
										toggleMarginModal();
										e.target.checked = false;
									}
								}}
								bind:checked={autoBurrow}
							/>
						</span>
						<!---->
					</span>

					<span
						class="el-tooltip tips-text _13a24dcf _5ee158b0 tooltip"
						data-tip={isLogin
							? "When Auto Borrow is enabled, you can borrow up to the borrow limit (determined by the spot account's margin) for this transaction. However, please be cautious as borrowing funds will incur interest and thus add to the risk of forced liquidation."
							: 'Margin trading is not available'}
						aria-describedby="el-tooltip-5500"
						tabindex="0">Auto Borrow</span
					>
				</div>

				<!-- svelte-ignore a11y-no-static-element-interactions -->
				<!-- svelte-ignore a11y-mouse-events-have-key-events -->
				<!-- svelte-ignore a11y-incorrect-aria-attribute-type -->
				<div
					class="el-dropdown"
					on:mouseover={(e) => {
						drapDownMenuCoordinate = findPos(e.target)[0] + 15;
						showDropDownMenu = true;
					}}
					on:mouseleave={() => {
						showDropDownMenuId = setTimeout(() => {
							showDropDownMenu = false;
							clearTimeout(showDropDownMenuId);
						}, DISMISS_DURATION);
					}}
				>
					<div
						user-guide="7"
						class="_54b36967 el-dropdown-selfdefine"
						aria-haspopup="list"
						aria-controls="dropdown-menu-9010"
						role="button"
						tabindex="0"
					>
						<em class="_4ccc8f9f"></em>
					</div>
				</div>

				<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
				<!-- svelte-ignore a11y-mouse-events-have-key-events -->
				<!-- svelte-ignore a11y-no-static-element-interactions -->
				<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				{#if showDropDownMenu}
					<ul
						transition:slideFade={{ duration: 200 }}
						on:mouseover={() => {
							showDropDownMenu = true;
							clearTimeout(showDropDownMenuId);
						}}
						on:mouseleave={() => {
							showDropDownMenuId = setTimeout(() => {
								showDropDownMenu = false;
								clearTimeout(showDropDownMenuId);
							}, DISMISS_DURATION);
						}}
						class="el-dropdown-menu el-popper c56b42d9"
						id="dropdown-menu-7214"
						style="transform-origin: center top right; z-index: 1020081; {showDropDownMenu
							? `position: absolute; top: ${drapDownMenuCoordinate}px; left: auto;`
							: 'display: none;'}"
					>
						<!-- svelte-ignore a11y-click-events-have-key-events -->
						<li
							class="c63a1f03"
							on:click={() => {
								showDropDownMenu = false;
								toggleOrderModal();
							}}
						>
							Preferences
						</li>
						<!-- svelte-ignore a11y-click-events-have-key-events
						<li class="c63a1f03" on:click={() => window.open('/margin/insurance-fund', '_blank')}>
							Insurance Fund
						</li>
						<!-- svelte-ignore a11y-click-events-have-key-events 
						<li class="c63a1f03" on:click={() => window.open('/fee/margin', '_blank')}>
							Interest Rate &amp; Borrow Limit
						</li> -->
						<li
							class="c63a1f03"
							on:click={() =>
								window.open(
									'https://support.poloniex.com/hc/en-us/articles/10050994344855',
									'_blank'
								)}
						>
							Margin Parameters
						</li>
						<li
							class="c63a1f03"
							on:click={() =>
								window.open(
									'https://support.poloniex.com/hc/en-us/articles/10051031253783',
									'_blank'
								)}
						>
							FAQ
						</li>
						<li
							class="c63a1f03"
							on:click={() => {
								showDropDownMenu = false;
								toggleRedeemModal();
							}}
						>
							Auto-redeem from Earn
						</li>
					</ul>
				{/if}
			</div>
			<div
				user-guide="3"
				class="a668decd {onboarding_1 ? 'c806c316' : ''}"
				style={onboarding_1 ? 'pointer-events: none; z-index: 1000002; position: relative;' : ''}
			>
				<div class="_0fbcf1c2" bind:this={_onboardingFocusRef}>
					<div class="_724c340a">
						<!-- svelte-ignore a11y-click-events-have-key-events -->
						<!-- svelte-ignore a11y-no-static-element-interactions -->
						<span
							style="font-size: small;"
							class="e0093a3f {orderType === 'limit' ? '_8c3dc366' : ''}"
							on:click={() => onOrderTypeSelected("limit")}
						>
							Limit
						</span>
						<!-- svelte-ignore a11y-click-events-have-key-events -->
						<!-- svelte-ignore a11y-no-static-element-interactions -->
						<span
							style="font-size: small;"
							class="e0093a3f {orderType === 'market' ? '_8c3dc366' : ''}"
							on:click={() => onOrderTypeSelected("market")}
						>
							Market
						</span>
					</div>
				</div>

				{#if orderType === 'limit'}
					<LimitOrder
						{onboardingData}
						autoBorrow={false}
						isBuying={tradeSide === 'buy'}
						{asset}
					/>
				{:else }
					<MarketOrder autoBorrow={false} isBuying={tradeSide === 'buy'} {asset}/>
				{/if}
			</div>
		</div>

		<!---->
	</section>
</div>
