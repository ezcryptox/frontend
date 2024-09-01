<script>
	import {
		cryptoQuotes,
		currentSelectedPair,
		depthChartList,
		marketTrades,
		orderBook,
		tradePairs
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
			if (!data || !Object.keys(data).length) return;
			tradePairs.update((pairs) => {
				if (!pairs) return pairs;
				return pairs.map((p) => ({
					...p,
					price: p.price || 0,
					...(data[p.symbol]
						? {
								changePercent: parseFloat(data[p.symbol].changePercent) || 0,
								volumeFrom: parseFloat(data[p.symbol].volumeFrom) || 0,
								volumeTo: parseFloat(data[p.symbol].volumeTo) || 0,
								high: parseFloat(data[p.symbol].high) || 0,
								low: parseFloat(data[p.symbol].low) || 0,
								price: parseFloat(data[p.symbol].price || p.price) || 0
							}
						: {})
				}));
			});
		});

		io.on('obs', (data) => {
			orderBook.set(data);
			const symbol = $currentSelectedPair?.symbol;
			const orderbook = data.orderbook;
			if (symbol && orderbook) {
				depthChartList.set({
					// @ts-ignore
					bids: Object.entries(orderbook['bids'])
						.slice(0, 13)
						.map(([price, amount]) => [parseFloat(price), parseFloat(amount)]),
					// @ts-ignore
					asks: Object.entries(orderbook['asks'])
						.slice(0, 13)
						.map(([price, amount]) => [parseFloat(price), parseFloat(amount)]),
					symbol,
					length: orderbook['bids'].length + orderbook['asks'].length
				});
			}
		});

		io.on('ts', (data) => {
			marketTrades.set(data);
		});
	});
</script>

<slot></slot>
