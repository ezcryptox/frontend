<script>
	import {
		currentSelectedPair,
		tradePairs,
		cryptoQuotes,
		exchangeChartType
	} from '$lib/store/marketdata';
	import { onMount } from 'svelte';
	import '../../styles/trade/chart.css';
	import { _ } from 'svelte-i18n';
	import DepthChart from './depthchart.svelte';
	import TradingView from './tradingview.svelte';

	let openTabs = [];

	const onCloseTab = (asset) => {
		let tabs = openTabs.filter((_asset) => _asset.symbol !== asset.symbol);
		localStorage.setItem('x-tabs', JSON.stringify(tabs));
		openTabs = tabs;
		if (tabs.length > 0) {
			const asset = tabs[tabs.length - 1];
			handleAssetSelected(asset)();
			history.pushState(null, '', `/trade/${asset.symbol}/?type=spot`); // Update the URL without reloading the page
		}
	};

	const handleAssetSelected = (asset) => (ev) => {
		if (ev) ev.preventDefault();
		if (asset.symbol === $currentSelectedPair?.symbol) return;
		const pair = $tradePairs.find((p) => p.symbol === asset.symbol);
		if (pair) {
			history.pushState(null, '', `/trade/${pair.symbol}/?type=spot`); // Update the URL without reloading the page
			currentSelectedPair.set(pair);
		}
	};


	onMount(() => {
		const tabsString = localStorage.getItem('x-tabs');
		let tabs = [];
		if (!tabsString) {
			const asset = $currentSelectedPair;
			if (asset) {
				tabs.push({
					symbol: asset.symbol,
					price: asset.price || 0,
					baseCurrencyName: asset.baseCurrencyName,
					quoteCurrencyName: asset.quoteCurrencyName
				});
			}
			localStorage.setItem('x-tabs', JSON.stringify(tabs));
		} else tabs = JSON.parse(tabsString);
		openTabs = tabs;

		let prevSelected = $currentSelectedPair?.symbol;
		currentSelectedPair.subscribe(async (asset) => {
			if (asset && asset.symbol !== prevSelected) {
				if (!openTabs.find((tab) => tab.symbol === asset.symbol)) {
					const _tabs = [...openTabs];
					if (_tabs.length >= 5) {
						_tabs.shift();
					}
					_tabs.push({
						symbol: asset.symbol,
						price: asset.price || 0,
						baseCurrencyName: asset.baseCurrencyName,
						quoteCurrencyName: asset.quoteCurrencyName
					});
					openTabs = _tabs;
					localStorage.setItem('x-tabs', JSON.stringify(_tabs));
				}
			}


			prevSelected = asset?.symbol;
		});

		cryptoQuotes.subscribe((q) => {
			const _pair = $currentSelectedPair;
			if (q && _pair && q[_pair.symbol]) {
				let _tabs = [...openTabs];
				_tabs = _tabs.map((t) => ({
					...t,
					...(t.symbol === _pair.symbol || !t.price
						? {
								price: parseFloat(q[t.symbol].price)
							}
						: {})
				}));
				localStorage.setItem('x-tabs', JSON.stringify(_tabs));
				openTabs = _tabs;
			}
		});
	});
</script>

<div class="_731f9e0c">
	<section class="_65d2dc70">
		<div id="assetItems" class="_4b0c0787">
			{#each openTabs as tb}
				<div
					id={tb.symbol}
					class="afed7137 {tb.symbol === $currentSelectedPair?.symbol ? '_54ffc89b' : ''}"
				>
					<a
						href="/trade/${tb.symbol}/?type=spot"
						aria-current="page"
						on:click={handleAssetSelected(tb)}
						class="router-link-exact-active router-link-active"
					>
						<span class="_2365dc81">{tb.symbol.replace('_', '/')}</span>
						<span class="_48a39702">{parseFloat(tb.price.toFixed(2)).toLocaleString()}</span>
					</a>
					<!-- svelte-ignore a11y-no-static-element-interactions -->
					{#if openTabs.length > 1}
						<!-- svelte-ignore a11y-click-events-have-key-events -->
						<i
							on:click={() => onCloseTab(tb)}
							class="e05cba42 {tb.symbol === $currentSelectedPair?.symbol ? '_54ffc89b' : ''}"
						>
							<svg width="10" height="10" x="0" y="0" viewBox="0 0 24 24" class="svgicon"
								><g
									><path
										d="M5 17.586a1 1 0 1 0 1.415 1.415L12 13.414 17.586 19A1 1 0 0 0 19 17.586L13.414 12 19 6.414A1 1 0 0 0 17.585 5L12 10.586 6.414 5A1 1 0 0 0 5 6.414L10.586 12z"
									></path></g
								></svg
							>
						</i>
					{/if}
				</div>
			{/each}
		</div>
		{#if $exchangeChartType === 'kline'}
			<TradingView/>
		{:else}
			<DepthChart />
		{/if}
		<!---->
	</section>
</div>
