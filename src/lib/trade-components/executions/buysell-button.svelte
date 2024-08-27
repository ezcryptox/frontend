<script>
	import { ServerURl } from '$lib/backendUrl';
	import { isLogin } from '$lib/store/profile';
	import { handleAuthToken } from '$lib/store/routes';
	import axios from 'axios';
	import { tradeBalance, tradeConfig } from '../store';
	import { toast } from 'svelte-sonner';
	export let isBuying = true;
	export let assetLabel;

	const handlePlaceOrder = async () => {
		if ($tradeConfig.placingOrder) return;
		tradeConfig.update((prev) => ({ ...prev, placingOrder: true }));
		const config = $tradeConfig;
		try {
			const balances = await axios
				.post(
					`${ServerURl()}/api/spot/trade`,
					{
						side: config.side,
						amount: config.amount,
						price: config.price || config.quotePrice,
						pair: config.pair,
						type: config.orderType
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
		} catch (error) {
			toast.error('Error Placing order!');
		} finally {
			tradeConfig.update((prev) => ({ ...prev, placingOrder: false }));
		}
	};
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
			<a target="_blank" href="/fee"><span class="_4df44c85"> Fee: 0.2%/0.2% </span></a>
		</div>
	{:else}
		<div class="e8cd35f1"><a href="/login">Log In</a> or <a href="/signup">Sign Up</a></div>
	{/if}
</div>
