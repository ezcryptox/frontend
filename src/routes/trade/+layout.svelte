<script>
	import {
		cryptoQuotes,
		currentSelectedPair,
		marketTrades,
		orderBook,
	} from '$lib/store/marketdata';
	import { browser } from '$app/environment';
	import { socketData } from '$lib/store/socket';

	socketData.subscribe((data) => {
		if (!data) return;

		const { io, request } = data;

		io.on('connect', () => {
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
		});

		io.on('qts', (data) => {
			cryptoQuotes.set(data);
		});
		
		io.on('obs', (data) => {
			orderBook.set(data);
		});

		io.on('ts', (data) => {
			marketTrades.set(data);
		});
	});
</script>

<slot></slot>
