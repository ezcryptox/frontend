import {
	makeApiRequest,
} from './helpers.js';
import {
	subscribeOnStream,
	unsubscribeFromStream,
} from './streaming.js';

import {browser} from '$app/environment'
import {RESOLUTION_MAP} from './helpers';

const lastBarsCache = new Map();

// DatafeedConfiguration implementation
const configurationData = {
	supported_resolutions: ['1', '5', '15', '10', '30', '60', '120', '240', '360', '720', '1D', '3D', '1W', '1M'],
	supports_group_request: false,
	has_intraday: true,
	supports_marks: false,
	supports_search: true,
	supports_timescale_marks: false,
	symbols_types: [{
		name: 'bitcoin',
		value: 'bitcoin',
	},],
	// The `exchanges` arguments are used for the `searchSymbols` method if a user selects the exchange
	exchanges: [{
		value: 'Binance',
		name: 'Binance',
		desc: 'Binance',
	},
	],
};

// Obtains all symbols for all exchanges supported by CryptoCompare API
async function getAllSymbols() {
	if (!browser) return [];
	const dataString = localStorage.getItem('x-currency-list') || '[]';
	const data = JSON.parse(dataString)
	return data.map(s => ({
		symbol: s.symbol,
		full_name: s.displayName,
		description: s.symbol,
		type: 'bitcoin',
		priceScale: s.tradeLimit.priceScale,
		quantityScale: s.tradeLimit.quantityScale
	}));
}

export default {
	onReady: (callback) => {
		// console.log('[onReady]: Method call');
		setTimeout(() => callback(configurationData));
	},

	resolveSymbol: async (
		symbolName,
		onSymbolResolvedCallback,
		onResolveErrorCallback,
		extension
	) => {
		// console.log('[resolveSymbol]: Method call', symbolName);
		const symbols = await getAllSymbols();
		const symbolItem = symbols.find(({
			full_name,
		}) => full_name === symbolName);
		if (!symbolItem) {
			onResolveErrorCallback('cannot resolve symbol');
			return;
		}
		
		const symbolInfo = {
			ticker: symbolItem.full_name,
			name: symbolItem.symbol,
			description: symbolItem.description,
			type: symbolItem.type,
			session: '24x7',
			timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
			minmov: 1,
			pricescale: Number("1e".concat(symbolItem.priceScale)),
			has_intraday: true,
			has_daily: true,
			has_weekly_and_monthly: true,
			supported_resolutions: configurationData.supported_resolutions,
			volume_precision: Number(symbolItem.quantityScale),
			data_status: 'streaming',
		};

		onSymbolResolvedCallback(symbolInfo);
	},

	getBars: async (symbolInfo, resolution, periodParams, onHistoryCallback, onErrorCallback) => {
		const { from, to, firstDataRequest, countback } = periodParams;
		// console.log('[getBars]: Method call', symbolInfo, resolution, from, to);
		const urlParameters = {
			symbol: symbolInfo.name.replace('_', ''),
			interval: RESOLUTION_MAP[resolution],
			startTime: from * 1000,
			endTime: to * 1000,
			limit: countback || 500,
		};
		const query = Object.keys(urlParameters)
			.map(name => `${name}=${encodeURIComponent(urlParameters[name])}`)
			.join('&');
		try {
			const data = await makeApiRequest(`api/market/klines?${query}`);
			if (data.length === 0) {
				// "noData" should be set if there is no data in the requested period
				onHistoryCallback([], {
					noData: true,
				});
				return;
			}
			let bars = [];
			data.forEach(([time,open,high,low,close,volume]) => {
				if ((time/1000) >= from && (time/1000) < to) {
					bars = [...bars, {
						time,
						low: parseFloat(low),
						high: parseFloat(high),
						open: parseFloat(open),
						close: parseFloat(close),
						volume: parseFloat(volume)
					}];
				}
			});
			if (firstDataRequest) {
				lastBarsCache.set(symbolInfo.full_name, {
					...bars[bars.length - 1],
				});
			}
			onHistoryCallback(bars, {
				noData: false,
			});
		} catch (error) {
			console.log('[getBars]: Get error', error);
			onErrorCallback(error);
		}
	},

	subscribeBars: (
		symbolInfo,
		resolution,
		onRealtimeCallback,
		subscriberUID,
		onResetCacheNeededCallback,
	) => {
		// console.log('[subscribeBars]: Method call with subscriberUID:', subscriberUID);
		subscribeOnStream(
			symbolInfo,
			resolution,
			onRealtimeCallback,
			subscriberUID,
			onResetCacheNeededCallback,
			lastBarsCache.get(symbolInfo.full_name),
		);
	},

	unsubscribeBars: (subscriberUID) => {
		// console.log('[unsubscribeBars]: Method call with subscriberUID:', subscriberUID);
		unsubscribeFromStream(subscriberUID);
	},
};
