<script>
	import { currentSelectedPair, depthChartList, exchangeChartType } from '$lib/store/marketdata';
	import '../../styles/trade/chart.css';
  import { _ } from 'svelte-i18n';
	import { fullScreen, displayAmount, fix, getSymbolPrecision } from '$lib/depth-chart/utils';
	import { onDestroy, onMount } from 'svelte';
	import DepthChart from '$lib/depth-chart/depthChart';
	import { mode } from 'mode-watcher';

	let isFullscreen = false;

	$: isDark = $mode === 'dark';

	let charts;
	let chartElement;

	$: precision = getSymbolPrecision($currentSelectedPair);

	function dpAmount(amount, fixed = 2) {
    if (isNaN(amount)) return '--';
    fixed = !fixed || fixed < 0 ? 0 : fixed;

    const unitSize = 3;
    const units = ['', 'K', 'M', 'B', 'T'];
    const s = amount.toPrecision(2).split('e');
    const unitIndex = s.length === 1 ? 0 : Math.floor(Math.min(s[1].slice(1), 14) / unitSize);
    let num = unitIndex < 1 ? amount.toFixed(0 + fixed) : (amount / Math.pow(10, unitIndex * unitSize)).toFixed(0 + fixed);
    num = num < 0 ? num : Math.abs(num);
    return num.toFixed(fixed) + units[unitIndex];
  }
	$: if (chartElement) {
    //@ts-ignore
		charts = DepthChart(chartElement, {
			symbol: $currentSelectedPair?.symbol || '',
			defaultLang: {
				price: 'Price',
				sum: 'Sum'
			},
			formatAmount: (amount) => dpAmount(amount, 2),
			formatPrice: (price) => fix(price, precision.price ?? 2, price < 0.1),
			isDark
		});
		renderChart();
	}

	$: if (charts && ($depthChartList.length > 0 || $currentSelectedPair || isDark)) {
		renderChart();
	}

	$: if (isFullscreen) {
		resizeChart();
	}

	function renderChart() {
		let { bids = [], asks = [], symbol } = $depthChartList;
		if ($currentSelectedPair?.symbol !== symbol) {
			bids = [];
			asks = [];
		}
		charts?.renderChart({
			bids,
			asks,
			symbol: $currentSelectedPair?.symbol,
			isDark: isDark
		});
	}

	function resizeChart() {
		charts?.reload();
	}

	// Handle window resize for responsiveness
	onMount(() => {
		window.addEventListener('resize', resizeChart);
		return () => window.removeEventListener('resize', resizeChart);
	});

	function toggleFullscreen() {
		if (isFullscreen) {
			fullScreen.exit();
		} else {
			fullScreen.launch(chartElement);
		}
	}

	function handleFullScreen() {
		toggleFullscreen();
	}

	function setFullscreenState() {
		isFullscreen = fullScreen.isFullScreen();
	}

	// Add event listener on mount
	$: if (chartElement) {
		document.addEventListener(fullScreen.changeEvent, setFullscreenState);
	}

	// Remove event listener on destroy
	onDestroy(() => {
		document.removeEventListener(fullScreen.changeEvent, setFullscreenState);
	});
  
</script>

<section class="a8d74d10">
	<div class="f2ad5021">
		<div class="ea55d85f"></div>
		<div class="d66c85b6">
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<span on:click={() => exchangeChartType.set('kline')} class=""> {$_('tradingview')} </span>
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<span class="_0fc78741"> </span>
			<span class="_63bc7ce4"> {$_('depth')} </span>
			<span class="_0fc78741"></span>
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<span on:click={handleFullScreen} class="a09788c4"
				><svg
					width="16"
					height="16"
					viewBox="0 0 16 16"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					><path
						d="M9.34443 8L12.0575 5.28738L14 7.22995L14 2.00031L8.77058 2.00031L10.7131 3.94288L8 6.65551L9.34443 8Z"
						fill="#b8b8b8"
					></path><path
						d="M6.65557 8L3.9425 10.7126L2.00001 8.77005L2.00001 13.9997H7.22942L5.28693 12.0571L8 9.34449L6.65557 8Z"
						fill="#b8b8b8"
					></path></svg
				></span
			>
		</div>
	</div>
	<section bind:this={chartElement} class="depth-chart" style="position: relative;"></section>
</section>

<style>
	.a8d74d10 {
		flex: 1;
		display: flex;
		flex-direction: column;
	}
	.depth-chart {
    flex: 1;
    display: flex;
    overflow: hidden;
}
</style>
