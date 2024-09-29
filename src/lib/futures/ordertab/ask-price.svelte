<script>
    import { splitSymbolName } from '$lib/datafeeds/helpers';
    import {futuresCurrentPair, futuresTradePairs} from "$lib/store/future.store"
	import { currentSelectedPair, orderBook } from '$lib/store/marketdata';
	import { abbreviateNumber } from '$lib/utils';
    export let ask;
    export let limit = 20;
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
		if ($futuresCurrentPair?.symbol === `${base}_${quote}`) {
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

<div class="e792ba77 cbe10470 {ask ? "ksj343js" : "d850b396 hdlknsls"}">
    <div class="el-scrollbar__wrap el-scrollbar__wrap--hidden-default">
        <div class="el-scrollbar__view" style="">
            {#each orderData as order}
                <div class="fbaac962" 
                style="background-size: {calculateBackgroundSize(order.amount)} 100%;">
                    <div class="add4c847">{order.price}</div>
                    <div class="b946a8ff">{order.amount}</div>
                    <div class="b893d92b">{order.total}</div>
                    <!-- <div class="a36c8eee" style="transform: translateX(0%);"></div> -->
                </div>
            {/each}
        </div>
    </div>
</div>