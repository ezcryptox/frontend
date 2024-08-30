<script>
	import {
		cryptoQuotes,
		currentSelectedPair,
		depthChartList,
		marketTrades,
		orderBook,
	} from '$lib/store/marketdata';
	import { browser } from '$app/environment';
	import { socketData } from '$lib/store/socket';

	socketData.subscribe((data) => {
		if (!data) return;

		const { io, request } = data;

		currentSelectedPair.subscribe((pair) => {
				if (pair) {
					request('join-ticker', { symbol: pair.symbol });
					request('sub-trade', { symbol: pair.symbol });
					request('sub-depth', { symbol: pair.symbol, speed: '1000ms' });
					if (browser) {
						localStorage.setItem('x-last-symbol', pair.symbol);
					}
				}
		});

		io.on('qts', (data) => {
			cryptoQuotes.set(data);
		});
		
		io.on('obs', (data) => {
			orderBook.set(data);
			const symbol = $currentSelectedPair?.symbol;
			const orderbook = data.orderbook;
			if (symbol && orderbook) {
				depthChartList.set({
					// @ts-ignore
					bids: Object.entries(orderbook['bids']).slice(0, 13).map(([price, amount]) => ([parseFloat(price), parseFloat(amount)])),
					// @ts-ignore
					asks: Object.entries(orderbook['asks']).slice(0,13).map(([price, amount]) => ([parseFloat(price), parseFloat(amount)])),
					symbol,
					length: orderbook['bids'].length + orderbook['asks'].length
				})
			}
		});

		io.on('ts', (data) => {
			marketTrades.set(data);
		});
	});
</script>

<slot></slot>
