<script>
	import { currentSelectedPair, orderBook } from "$lib/store/marketdata";
    import {splitSymbolName} from '$lib/datafeeds/helpers'

    let bestBid = 0;
    let bestAsk = 0;
    orderBook.subscribe((ob) => {
		if (!ob) return;
		// @ts-ignore
		const { base, quote } = splitSymbolName(ob.symbol.toUpperCase());
		if ($currentSelectedPair?.symbol === `${base}_${quote}`) {
			// @ts-ignore
			bestAsk = ob.bookmarks?.ba ? parseFloat(ob.bookmarks?.ba) : 0
            // @ts-ignore
            bestBid = ob.bookmarks?.bb ? parseFloat(ob.bookmarks?.bb) : 0
		}
	});
</script>
<div class="bd304729 _9bd73e27">
    <div class="_52218c31">
        <span class="_86c486b8">{bestAsk ? parseFloat(bestAsk.toFixed(2)).toLocaleString() : '--'}</span><span class="_8054e9cd"
            ><span>Mark:</span><span>{bestBid ? parseFloat(bestBid.toFixed(2)).toLocaleString() : '--'}</span></span
        >
    </div>
    <a href="/trade/orderbook/{$currentSelectedPair?.symbol}" class="_3a629d1d"> More </a>
</div>