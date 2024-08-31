<script>
	import { splitSymbolName } from '$lib/datafeeds/helpers';
	import { currentSelectedPair, orderBook } from '$lib/store/marketdata';
	import { abbreviateNumber } from '$lib/utils';

	export let ask = false;
	export let limit = 13;
	let orderData = Array(limit).fill({
		price: '--',
		amount: '--',
		total: '--'
	});

	function calculateBackgroundSize(amount) {
		const maxAmount = Math.max(...orderData.map((o) => parseFloat(o.amount)));
		const percentage = (parseFloat(amount) / maxAmount) * 100;
		return percentage.toFixed(2) + '%';
	}

	orderBook.subscribe((ob) => {
		if (!ob) return;
		// @ts-ignore
		const { base, quote } = splitSymbolName(ob.symbol.toUpperCase());
		if ($currentSelectedPair?.symbol === `${base}_${quote}`) {
			// @ts-ignore
			const obj = ob.orderbook[ask ? 'asks' : 'bids'];
			orderData = Object.entries(obj)
				.map(([price, amount]) => ({
					price: parseFloat(price).toFixed(2),
					amount: parseFloat(amount).toFixed(2),
					total: abbreviateNumber((parseFloat(price) * parseFloat(amount)).toFixed(2))
				}))
				.slice(0, limit);
			if (orderData.length < limit) {
				orderData = [
					...orderData,
					...Array(limit - orderData.length).fill({
						price: '--',
						amount: '--',
						total: '--'
					})
				];
			}
		}
	});
</script>

<div class={ask ? '_68e93d14 _90a06506 _36a947c2' : '_68e93d14 _85e4ce8e _2fde4712'}>
	<div class="_3b186495">
		{#each orderData as order}
			<div
				class="_1658a9d7 _360ce864 _38c4b82a"
				style="background-size: {calculateBackgroundSize(order.amount)} 100%;"
			>
				<span title="">{order.price}</span>
				<span title="">{order.amount}</span>
				<span title="">{order.total}</span>
			</div>
		{/each}
	</div>
</div>

