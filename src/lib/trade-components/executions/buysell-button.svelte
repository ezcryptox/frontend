<script>
	import { ServerURl } from '$lib/backendUrl';
	import { isLogin } from '$lib/store/profile';
	import { handleAuthToken } from '$lib/store/routes';
	import axios from 'axios';
	import { dataRefreshKey, tradeBalance, tradeConfig } from '../store';
	import { toast } from 'svelte-sonner';
	import { currentSelectedPair } from '$lib/store/marketdata';
	import { handleUserProfile } from '$lib';
	export let isBuying = true;
	export let assetLabel;

	const handlePlaceOrder = async () => {
		if ($tradeConfig.placingOrder) return;
		const currentBalance = $tradeBalance;
		const config = $tradeConfig;
		if (!config.price && config.orderType === 'limit') {
			toast.error('Enter ' + $currentSelectedPair?.quoteCurrencyName + ' price!');
			return;
		}
		if (!config.amount) {
			toast.error('Enter ' + $currentSelectedPair?.baseCurrencyName + ' amount!');
			return;
		}
		if (config.side.toLowerCase() === 'buy') {
			if (currentBalance.quote.balance + (config.autoBorrow ? currentBalance.quote.borrowable : 0) < config.amount * config.price) {
				toast.error('Insufficient Balance!');
				return;
			}
		} else {
			if (currentBalance.base.balance < config.amount) {
				toast.error('Insufficient Balance!');
				return;
			}
		}

		tradeConfig.update((prev) => ({ ...prev, placingOrder: true }));
		try {
			const balances = await axios
				.post(
					`${ServerURl()}/api/trading/trade`,
					{
						side: config.side,
						amount: config.amount,
						price: config.price || config.quotePrice,
						pair: config.pair,
						type: config.orderType,
						autoBorrow: config.side.toLowerCase() === 'buy' ? config.autoBorrow : false
					},
					{
						headers: {
							'Content-type': 'application/json',
							Authorization: `Bearer ${$handleAuthToken}`
						}
					}
				)
				.then((d) => d.data);
			tradeBalance.update((prev) => ({
				...prev,
				...{
					base: {
						...prev.base,
						balance: balances.base
					},
					quote: {
						...prev.quote,
						balance: balances.quote
					}
				}
			}));
			toast.success(config.side.toUpperCase() + ' Order placed successfully!');
			dataRefreshKey.update((p) => p + 1);
			// @ts-ignore
		} catch (error) {
			// @ts-ignore
			const message = error.response?.data?.message || 'Error Placing order!';
			// @ts-ignore
			toast.error(message);
		} finally {
			tradeConfig.update((prev) => ({ ...prev, placingOrder: false }));
		}
	};

	let vipLevels = {};
	let tradingFee = '0.2%/0.2%';
	isLogin.subscribe(async (loggedIn) => {
		if (loggedIn) {
			const response = await handleUserProfile($handleAuthToken);
			if (response?.profile) {
				vipLevels = (await axios.get(`${ServerURl()}/api/trading/spot-fees`)).data;
				const level = parseInt(response?.profile.level?.toString() || '0');
				tradingFee = `${(vipLevels[`VIP${level}`].spotMakerFee * 100).toFixed(2)}%/${(vipLevels[`VIP${level}`].spotTakerFee * 100).toFixed(2)}%`;
			}
		} else tradingFee = '0.2%/0.2%';
	});
</script>

<div class="_89425504" data-v-39752d79="">
	{#if $isLogin}
		<button
			type="button"
			disabled={$tradeConfig.placingOrder}
			on:click={handlePlaceOrder}
			class="polo-btn polo-btn-button {isBuying
				? 'polo-btn-positive'
				: 'polo-btn-negative'} polo-btn-small"
			style="width: 100%;"
			><!---->
			<div class="btn-sp">{isBuying ? 'Buy' : 'Sell'} {assetLabel}</div></button
		>

		<div class="fa51f9ae">
			<a href="/fee"><span class="_4df44c85"> Fee: {tradingFee} </span></a>
		</div>
	{:else}
		<div class="e8cd35f1"><a href="/login">Log In</a> or <a href="/signup">Sign Up</a></div>
	{/if}
</div>
