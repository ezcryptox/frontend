<script>
	import { slideFade } from '$lib/transitions';
	import { findPos } from './utils';
	import { getContext } from 'svelte';
	import { isLogin } from '$lib/store/profile';
	import LimitOrder from './executions/limit-order.svelte';
	import StopLimit from './executions/stop-limit.svelte';
	import MarketOrder from './executions/market-order.svelte';
	import StopMarket from './executions/stop-market.svelte';
	import TrailingOrder from './executions/trailing-order.svelte';
	import { currentSelectedPair } from '$lib/store/marketdata';
	import { tradeConfig } from './store';
	 

	export let onboardingData;
	export let marginTradingEnabled;
	$: asset =  {
		base:'--',
		quote:'--'
	};
	$: buyAsset = true;
	$: sellAsset = false;
	$: autoBorrow = false;

	$: showDropDownMenu = false;
	$: showStopLimitMenu = false;

	const DISMISS_DURATION = 300;
	let showDropDownMenuId;
	let showStopLimitMenuId;
	let drapDownMenuCoordinate = 0;

	const stopOrders = [
		{
			name: 'Stop-Limit',
			info: 'When the latest market price reaches the trigger price, the order will be placed automatically according to the preset price and amount.'
		},
		{
			name: 'Stop-Market',
			info: 'Market TP/SL orders will be automatically executed at the market price only when a specific price is reached. Therefore, traders must specify a trigger price to activate these orders.'
		},
		{
			name: 'Trailling Stop',
			info: 'A Trailing Stop order is a type of take profit and stop loss order that tracks the market price. It allows you to place a preset limit or market order with a trailing delta (i.e. a percentage level or certain amount of points away from the market price). When the market price reaches the predetermined percentage or constant, your preset order will be placed. Learn More'
		}
	];
	$: selectedStopOrder = 0;
	$: selectedExecutionIndex =
		autoBorrow && selectedExecutionIndex === 2 ? 0 : selectedExecutionIndex || 0;

	const onExecutionTypeSelected = (index) => {
		selectedExecutionIndex = index;
	};

	const onBuyAsset = () => {
		buyAsset = true;
		sellAsset = false;
	};
	const onSellAsset = () => {
		sellAsset = true;
		buyAsset = false;
	};

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
	})
	$: {
		if (onboardingData && (_onboardingFocusRef || _onboardingFocusRef2)) {
			if (onboardingData.show){
				onExecutionTypeSelected(0);
				autoBorrow = true;
			}
			else autoBorrow = false;

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
	<section class="_23f4b355">
		<nav class="_3f2fed70">
			<button on:click={() => onBuyAsset()} class={buyAsset ? 'ad797042' : ''}> Buy </button>
			<button on:click={() => onSellAsset()} class={sellAsset ? 'ad797042' : ''}> Sell </button>
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
						disabled={!isLogin}
						bind:this={_onboardingFocusRef2}
						class="polo-switch polo-switch-middle {autoBorrow ? 'is-checked' : ''}"
					>
						<span class="polo-switch-box">
							<input
								disabled={!$isLogin || !$currentSelectedPair?.crossMargin.supportCrossMargin}
								type="checkbox"
								on:change={(e) => {
									if (e.target.checked && !marginTradingEnabled) {
										toggleMarginModal();
										e.target.checked = false;
									}
									tradeConfig.update(prev => ({...prev, autoBorrow: e.target.checked}))
								}}
								checked={autoBorrow || $tradeConfig.autoBurrow}
							/>
						</span>
						<!---->
					</span>

					<span
						class="el-tooltip tips-text _13a24dcf _5ee158b0 tooltip"
						data-tip={$isLogin
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
						<!-- svelte-ignore a11y-click-events-have-key-events -->
						<li class="c63a1f03" on:click={() => window.open('/margin/insurance-fund', '_blank')}>
							Insurance Fund
						</li>
						<!-- svelte-ignore a11y-click-events-have-key-events -->
						<li class="c63a1f03" on:click={() => window.open('/fee/margin', '_blank')}>
							Interest Rate &amp; Borrow Limit
						</li>
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
							class="e0093a3f {selectedExecutionIndex === 0 ? '_8c3dc366' : ''}"
							on:click={() => onExecutionTypeSelected(0)}
						>
							Limit
						</span>
						<!-- svelte-ignore a11y-click-events-have-key-events -->
						<!-- svelte-ignore a11y-no-static-element-interactions -->
						<span
							style="font-size: small;"
							class="e0093a3f {selectedExecutionIndex === 1 ? '_8c3dc366' : ''}"
							on:click={() => onExecutionTypeSelected(1)}
						>
							Market
						</span>
						{#if !autoBorrow}
							<div class="el-dropdown _11f0f85e">
								<!-- svelte-ignore a11y-incorrect-aria-attribute-type -->
								<!-- svelte-ignore a11y-mouse-events-have-key-events -->
								<span
									style="font-size: small;"
									class="e0093a3f el-dropdown-selfdefine {selectedExecutionIndex === 2
										? '_8c3dc366'
										: ''}"
									aria-haspopup="list"
									aria-controls="dropdown-menu-6554"
									role="button"
									tabindex="0"
									on:mouseover={() => {
										showStopLimitMenu = true;
										clearTimeout(showStopLimitMenuId);
									}}
									on:mouseleave={() => {
										showStopLimitMenuId = setTimeout(() => {
											showStopLimitMenu = false;
											clearTimeout(showStopLimitMenuId);
										}, DISMISS_DURATION);
									}}
								>
									{stopOrders[selectedStopOrder].name}
									<svg
										style="transform: rotate({showStopLimitMenu ? 180 : 0}deg);"
										class="svgicon d4379d29"
										width="12px"
										height="12px"
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
								<!-- svelte-ignore a11y-mouse-events-have-key-events -->
								{#if showStopLimitMenu}
									<ul
										transition:slideFade={{ duration: 200 }}
										class="el-dropdown-menu el-popper b408bec8"
										id="dropdown-menu-6554"
										style="transform-origin: center top; z-index: 1020035; {showStopLimitMenu
											? 'position: absolute; top: auto;'
											: 'display: none;'}"
										on:mouseover={() => {
											showStopLimitMenu = true;
											clearTimeout(showStopLimitMenuId);
										}}
										on:mouseleave={() => {
											showStopLimitMenuId = setTimeout(() => {
												showStopLimitMenu = false;
												clearTimeout(showStopLimitMenuId);
											}, DISMISS_DURATION);
										}}
									>
										{#each stopOrders as order, index}
											<!-- svelte-ignore a11y-click-events-have-key-events -->
											<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
											<li
												on:click={() => {
													selectedStopOrder = index;
													showStopLimitMenu = false;
													onExecutionTypeSelected(2);
												}}
												class="d911f463"
											>
												{order.name}
											</li>
										{/each}
									</ul>
								{/if}
							</div>
						{/if}
					</div>
					<!-- svelte-ignore a11y-no-static-element-interactions -->
					<!-- svelte-ignore a11y-mouse-events-have-key-events -->

					{#if !autoBorrow}
						<span
							class="_9d87404a tooltip tooltip-left"
							data-tip={stopOrders[selectedStopOrder].info}
						>
							<svg
								class="svgicon el-tooltip"
								width="12px"
								height="12px"
								x="0"
								y="0"
								viewBox="0 0 512 512"
								><g
									><path
										d="M256 0C114.509 0 0 114.496 0 256c0 141.489 114.496 256 256 256 141.491 0 256-114.496 256-256C512 114.509 397.504 0 256 0zm0 476.279c-121.462 0-220.279-98.816-220.279-220.279S134.538 35.721 256 35.721c121.463 0 220.279 98.816 220.279 220.279S377.463 476.279 256 476.279z"
									></path><path
										d="M248.425 323.924c-14.153 0-25.61 11.794-25.61 25.946 0 13.817 11.12 25.948 25.61 25.948s25.946-12.131 25.946-25.948c0-14.152-11.794-25.946-25.946-25.946zM252.805 127.469c-45.492 0-66.384 26.959-66.384 45.155 0 13.142 11.12 19.208 20.218 19.208 18.197 0 10.784-25.948 45.155-25.948 16.848 0 30.328 7.414 30.328 22.915 0 18.196-18.871 28.642-29.991 38.077-9.773 8.423-22.577 22.24-22.577 51.22 0 17.522 4.718 22.577 18.533 22.577 16.511 0 19.881-7.413 19.881-13.817 0-17.522.337-27.631 18.871-42.121 9.098-7.076 37.74-29.991 37.74-61.666s-28.642-55.6-71.774-55.6z"
									></path></g
								></svg
							>
						</span>
					{/if}
				</div>

				{#if selectedExecutionIndex === 0}
					<LimitOrder
						{onboardingData}
						isBuying={buyAsset}
						{asset}
					/>
				{:else if selectedExecutionIndex === 1}
					<MarketOrder autoBorrow={autoBorrow} isBuying={buyAsset} {asset} />
				{:else if selectedExecutionIndex === 2}
					{#if selectedStopOrder === 0}
						<StopLimit autoBorrow={autoBorrow} isBuying={buyAsset} {asset} />
					{:else if selectedStopOrder === 1}
						<StopMarket autoBorrow={autoBorrow} isBuying={buyAsset} {asset} />
					{:else if selectedStopOrder === 2}
						<TrailingOrder autoBorrow={autoBorrow} isBuying={buyAsset} {asset} />
					{/if}
				{/if}
			</div>
		</div>

		<!---->
	</section>
</div>
