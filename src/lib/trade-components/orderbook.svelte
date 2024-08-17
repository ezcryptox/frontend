<script>
	import { currentSelectedPair, marketTrades } from '$lib/store/marketdata';
	import { slideFade } from '$lib/transitions';
	import BidAsk from './orderbook/bid-ask.svelte';
	import Price from './orderbook/price.svelte';
	$: selectedBidAskTab = 2;
	$: selectedTab = 0;

	const onBidAskTabSelected = (index) => {
		selectedBidAskTab = index;
	};
	const onTabSelected = (index) => {
		selectedTab = index;
	};

	let filterList = [0.01, 0.1, 1, 10, 100];
	$: selectedFilterIndex = 0;
	$: showFilterDropdownMenu = false;
	let showFilterDropdownMenuId;
	const onFilterSelected = (index) => {
		selectedFilterIndex = index;
		showFilterDropdownMenu = false;
	};

	$: trades = Array(38).fill({
		price: '--',
		amount: '--',
		time: '--',
		ask: false
	});

	marketTrades.subscribe((data) => {
		if (!data?.trades) return;
		trades = data.trades.map((t) => ({
			price: parseFloat(t.price).toFixed(2),
			amount: parseFloat( t.qty).toFixed(6),
			time: new Date(t.time * 1000).toLocaleTimeString([], {
				hour: '2-digit',
				minute: '2-digit',
				second: '2-digit'
			}),
			ask: t.isBuyerMaker
		})).slice(0, 50);
	});
</script>

<div class="_21f7c03c">
	<div class="b24f0f42">
		<section class="_6b23a6d3">
			<nav class="cdc6768f" value="orders">
				<span class={selectedTab === 0 ? 'bf786d3a' : ''} on:click={() => onTabSelected(0)}>
					Order Book
				</span>
				<span class={selectedTab === 1 ? 'bf786d3a' : ''} on:click={() => onTabSelected(1)}>
					Market Trades
				</span>
			</nav>
			<section class="fa124b69" style="">
				<!---->
				{#if selectedTab === 0}
					<div class="_57a26a53">
						<div>
							<span
								on:click={() => onBidAskTabSelected(0)}
								class="_986e6957 {selectedBidAskTab === 0 ? '_4f405bfc' : ''}"
								><svg
									width="18"
									height="14"
									viewBox="0 0 18 14"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
									><path d="M18 0H0V2H18V0Z" fill="#1A8F5C"></path><path
										d="M18 4H0V6H18V4Z"
										fill="#1A8F5C"
									></path><path d="M18 8H0V10H18V8Z" fill="#1A8F5C"></path><path
										d="M18 12H0V14H18V12Z"
										fill="#1A8F5C"
									></path></svg
								></span
							>
							<span
								on:click={() => onBidAskTabSelected(1)}
								class="_986e6957 {selectedBidAskTab === 1 ? '_4f405bfc' : ''}"
								><svg
									width="18"
									height="14"
									viewBox="0 0 18 14"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
									><path d="M18 0H0V2H18V0Z" fill="#C44749"></path><path
										d="M18 4H0V6H18V4Z"
										fill="#C44749"
									></path><path d="M18 8H0V10H18V8Z" fill="#C44749"></path><path
										d="M18 12H0V14H18V12Z"
										fill="#C44749"
									></path></svg
								></span
							>
							<span
								on:click={() => onBidAskTabSelected(2)}
								class="_986e6957 {selectedBidAskTab === 2 ? '_4f405bfc' : ''}"
								><svg
									width="18"
									height="14"
									viewBox="0 0 18 14"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
									><path d="M18 0H0V2H18V0Z" fill="#C44749"></path><path
										d="M18 4H0V6H18V4Z"
										fill="#C44749"
									></path><path d="M18 8H0V10H18V8Z" fill="#1A8F5C"></path><path
										d="M18 12H0V14H18V12Z"
										fill="#1A8F5C"
									></path></svg
								></span
							>
						</div>

						<!-- svelte-ignore a11y-mouse-events-have-key-events -->
						<div class="el-dropdown">
							<!-- svelte-ignore a11y-incorrect-aria-attribute-type -->
							<span
								class="df654141 el-dropdown-selfdefine"
								aria-haspopup="list"
								aria-controls="dropdown-menu-2841"
								role="button"
								tabindex="0"
								on:mouseover={(e) => {
									showFilterDropdownMenu = true;
								}}
								on:mouseleave={() => {
									showFilterDropdownMenuId = setTimeout(() => {
										showFilterDropdownMenu = false;
										clearTimeout(showFilterDropdownMenuId);
									}, 300);
								}}
							>
								{filterList[selectedFilterIndex]}
								<svg class="svgicon" width="9px" height="9px" x="0" y="0" viewBox="0 0 32 32"
									><g
										><path
											d="M29.604 10.528 17.531 23.356a2.102 2.102 0 0 1-3.062 0L2.396 10.528c-.907-.964-.224-2.546 1.1-2.546h25.008c1.324 0 2.007 1.582 1.1 2.546z"
										></path></g
									></svg
								>
							</span>
							{#if showFilterDropdownMenu}
								<ul
									transition:slideFade={{ duration: 200 }}
									on:mouseover={() => {
										showFilterDropdownMenu = true;
										clearTimeout(showFilterDropdownMenuId);
									}}
									on:mouseleave={() => {
										showFilterDropdownMenuId = setTimeout(() => {
											showFilterDropdownMenu = false;
											clearTimeout(showFilterDropdownMenuId);
										}, 300);
									}}
									class="el-dropdown-menu el-popper _904f000d"
									id="dropdown-menu-2841"
									style="min-width: 100px;"
								>
									{#each filterList as value, index}
										<li
											class="_65045930 {selectedFilterIndex === index ? '_5161a055' : ''}"
											on:click={() => onFilterSelected(index)}
										>
											{value}
											{#if selectedFilterIndex === index}
												<svg
													class="svgicon"
													width="10px"
													height="10px"
													viewBox="0 0 511.985 511.985"
													><g
														><path
															d="M500.088 83.681c-15.841-15.862-41.564-15.852-57.426 0L184.205 342.148 69.332 227.276c-15.862-15.862-41.574-15.862-57.436 0-15.862 15.862-15.862 41.574 0 57.436l143.585 143.585c7.926 7.926 18.319 11.899 28.713 11.899 10.394 0 20.797-3.963 28.723-11.899l287.171-287.181c15.862-15.851 15.862-41.574 0-57.435z"
														></path></g
													></svg
												>
											{/if}
										</li>
									{/each}
								</ul>
							{/if}
						</div>
					</div>
				{/if}

				<div class="_1658a9d7 c14e70ac" style="font-size: x-small;">
					<span title="Price({$currentSelectedPair?.baseCurrencyName || '--'})">Price({$currentSelectedPair?.baseCurrencyName || '--'})</span>
					<span title="Amount({$currentSelectedPair?.quoteCurrencyName || '--'})">Amount({$currentSelectedPair?.quoteCurrencyName || '--'})</span>
					<span title={selectedTab === 0 ? `Total(${$currentSelectedPair?.baseCurrencyName || '--'})` : 'Time'}
						>{selectedTab === 0 ? `Total(${$currentSelectedPair?.quoteCurrencyName || '--'})` : 'Time'}</span
					>
				</div>

				{#if selectedTab === 0}
					<div
						class="_31e5c959 {selectedBidAskTab === 0
							? '_6c53778b'
							: selectedBidAskTab === 1
								? '_2c21b475'
								: '_89980363'}"
					>
						{#if selectedBidAskTab === 0}
							<Price />
							<BidAsk limit={26} ask={true} />
						{:else if selectedBidAskTab === 1}
							<BidAsk limit={26} ask={false} />
							<Price />
						{:else}
							<BidAsk limit={13} ask={false} />
							<Price />
							<BidAsk limit={13} ask={true} />
						{/if}
					</div>
				{:else}
					<div class="_43bb2516">
						{#each trades as { price, amount, time, ask }}
							<div class="_1658a9d7 a74c4be5">
								<span title={price} class={ask ? '_09dacbde' : 'cf12729c'}>{price}</span>
								<span title={amount}>{amount}</span>
								<span>{time}</span>
							</div>
						{/each}
					</div>
				{/if}
			</section>
			<!---->
		</section>
	</div>
</div>
