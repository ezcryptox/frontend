<script>
	import '../../styles/trade/trade.css';
	import '../../styles/trade/assetmenu.css';
	import '../../styles/trade/tradechunk.css';
	import '../../styles/trade/tradechunk2.css';
	import '../../styles/trade/orders.css';
	import '../../styles/trade/modal.css';
	import '../../styles/trade/tooltip.css';
	import '../../styles/trade/onboarding.css';
	import Header from '$lib/trade-components/header.svelte';
	import Footer from '$lib/trade-components/footer.svelte';
	import BuySell from '$lib/trade-components/buysell.svelte';
	import Chart from '$lib/trade-components/chart.svelte';
	import Orderbook from '$lib/trade-components/orderbook.svelte';
	import Orders from '$lib/trade-components/orders.svelte';
	import Assets from '$lib/trade-components/assets.svelte';
	import BorrowDialog from '$lib/trade-components/modals/borrow.svelte';
	import OrderConfrimationDialog from '$lib/trade-components/modals/order-confirmation.svelte';
	import RedeemDialog from '$lib/trade-components/modals/auto-redeem.svelte';
	import { onMount, setContext } from 'svelte';
	import MarginIntroModal from '$lib/trade-components/modals/margin.svelte';
	import MarginRatioModal from '$lib/trade-components/modals/margin-ratio.svelte';
	import Onboarding from './onboarding.svelte';
	import { browser } from '$app/environment';
	import { tradeBalance } from './store';
	import { currentSelectedPair } from '$lib/store/marketdata';
	import { handleAuthToken } from '$lib/store/routes';
	import axios from 'axios';
	import { ServerURl } from '$lib/backendUrl';
	$: selectedAsset = null;
	$: showBorrowModal = false;
	$: showOrderModal = false;
	$: showRedeemModal = false;
	$: showMarginModal = false;
	$: showMarginRatioModal = false;
	$: showOnBoarding = false;
	$: marginTradingEnabled = false;
	$: onboardingData = {
		title: '',
		message: '',
		coordinate: [],
		step: 1,
		show: false
	};
	setContext('onAssetSelected', (asset) => {
		selectedAsset = asset;
	});
	setContext('toggleBorrowModal', () => {
		showBorrowModal = !showBorrowModal;
	});
	setContext('toggleOrderModal', () => {
		showOrderModal = !showOrderModal;
	});
	setContext('toggleRedeemModal', () => {
		showRedeemModal = !showRedeemModal;
	});
	setContext('toggleMarginModal', () => {
		showMarginModal = !showMarginModal;
	});
	setContext('onEnableMarginTrading', () => {
		marginTradingEnabled = true;
	});
	setContext('toggleMarginRatio', () => {
		showMarginRatioModal = !showMarginRatioModal;
	});

	const toggleOnBoarding = () => {
		showOnBoarding = !showOnBoarding;
		onboardingData = showOnBoarding
			? { ...onboardingData, show: true }
			: {
					title: '',
					message: '',
					coordinate: [],
					step: 1,
					show: false
				};
	};
	setContext('toggleOnBoarding', (finished) => {
		if (finished) localStorage.setItem('x-onboarding-state', 1);
		toggleOnBoarding();
	});

	setContext('updateOnboardingData', (data) => {
		onboardingData = data;
	});

	
	async function getAssetBalance(asset) {
		const {balances} = await axios.get(
				`${ServerURl()}/api/assets/trade-balance?base=${asset.base}&quote=${asset.quote}`,
				{
					headers: {
						'Content-type': 'application/json',
						Authorization: `Bearer ${$handleAuthToken}`
					}
				}
			).then(d => d.data)

		tradeBalance.set({
				base: {
					symbol: asset.base,
					balance: balances[asset.base.toUpperCase()].balance,
					usd: balances[asset.base.toUpperCase()].usd
				},
				quote: {
					symbol: asset.quote,
					balance: balances[asset.quote.toUpperCase()].balance,
					usd: balances[asset.quote.toUpperCase()].usd
				}
			})
	}

	currentSelectedPair.subscribe(pair => {
		if (!pair) return
		getAssetBalance({
			base: pair.baseCurrencyName,
			quote: pair.quoteCurrencyName
		}).catch(err => console.log('Error getting balance => ', err))
	})

	onMount(() => {
		if (browser) {
			if (!localStorage.getItem('x-onboarding-state')) {
				toggleOnBoarding();
			}
		}
	});
</script>

<div class="app-trade">
	<main class="_99ca71d3">
		<section class="e94bdc41">
			<Header {onboardingData} />
			<section class="_497e9d61">
				<section class="ee935bfd"><!----></section>
				<section class="_03fafbdf">
					<section class="_8a825ebf">
						<Chart />
						<Orderbook />
					</section>
					<Orders {onboardingData} />
				</section>
				<secion class="_13e551a7">
					<BuySell {marginTradingEnabled} {onboardingData} />
					<Assets {marginTradingEnabled} {onboardingData} />
				</secion>
			</section>
		</section>

		<Footer />
	</main>
</div>

{#if showBorrowModal}
	<BorrowDialog />
{/if}

{#if showOrderModal}
	<OrderConfrimationDialog />
{/if}

{#if showRedeemModal}
	<RedeemDialog />
{/if}
{#if showMarginModal}
	<MarginIntroModal />
{/if}

{#if showMarginRatioModal}
	<MarginRatioModal />
{/if}

{#if showOnBoarding}
	<Onboarding {onboardingData} />
{/if}
