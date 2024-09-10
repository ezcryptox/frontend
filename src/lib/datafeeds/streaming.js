import { RESOLUTION_MAP, splitSymbolName } from './helpers.js';
import { socketData } from '$lib/store/socket';
import { get } from 'svelte/store'
const channelToSubscription = new Map();
socketData.subscribe(data => {
	if (!data) return;
	const { io } = data;
	io.on('ks', data => {
		const kline = data.data.k; // Access the Kline data
		if (!kline) return;
		// console.log('ON KLINE DATA PRICE=> ', kline.c)
		const { o: open, h: high, l: low, c: close, i: interval } = kline;
		const tradePrice = parseFloat(kline.c); // Closing price
		const { base, quote } = splitSymbolName(kline.s)
		const tradeTime = kline.t; // Kline open time
		const tradeVolume = parseFloat(kline.v);
		const channelString = `${base.toLowerCase()}${quote.toLowerCase()}@kline_${interval}`; // Symbol channel string
		const subscriptionItem = channelToSubscription.get(channelString);
		// console.log('SUB ITEM> ', subscriptionItem, channelString)
		if (subscriptionItem === undefined) {
			// console.log('SUB undefined => ', channelString )
			return;
		}
		const lastDailyBar = subscriptionItem.lastDailyBar;
		const nextDailyBarTime = getNextDailyBarTime(lastDailyBar.time);

		let bar;
		if (tradeTime >= nextDailyBarTime) {
			bar = {
				time: nextDailyBarTime,
				open: parseFloat(open),
				high: parseFloat(high),
				low: parseFloat(low),
				close: parseFloat(close),
				volume: tradeVolume
			};

			// console.log('[socket] Generate new bar', bar);
		} else if (tradeTime >= lastDailyBar.time) {
			bar = {
				...lastDailyBar,
				high: Math.max(lastDailyBar.high, tradePrice),
				low: Math.min(lastDailyBar.low, tradePrice),
				close: tradePrice,
				volume: Math.max(lastDailyBar.volume, tradeVolume)
			};
			// console.log('[socket] Update the latest bar by price', tradePrice);
		} else {
			// Ignore out-of-order data
			// console.log('[socket] Ignore out-of-order data', tradeTime, lastDailyBar.time, nextDailyBarTime);
			return;
		}
		subscriptionItem.lastDailyBar = bar;

		// Send data to every subscriber of that symbol
		subscriptionItem.handlers.forEach((handler) => handler.callback(bar));
	})
})


function getNextDailyBarTime(barTime) {
	const date = new Date(barTime * 1000);
	date.setDate(date.getDate() + 1);
	return date.getTime() / 1000;
}

export function subscribeOnStream(
	symbolInfo,
	resolution,
	onRealtimeCallback,
	subscriberUID,
	onResetCacheNeededCallback,
	lastDailyBar
) {
	const [base, quote] = symbolInfo.name.split('_');
	if (!base) {
		// console.log(
		// 	'[subscribeBars]: No symbol Info:',
		// 	symbolInfo
		// );
	}
	const channelString = `${base.toLowerCase()}${quote.toLowerCase()}@kline_${RESOLUTION_MAP[resolution]}`; // Update for Binance Kline stream
	const handler = {
		id: subscriberUID,
		callback: onRealtimeCallback,
	};
	let subscriptionItem = channelToSubscription.get(channelString);
	if (subscriptionItem) {
		// Already subscribed to the channel, use the existing subscription
		subscriptionItem.handlers.push(handler);
		return;
	}

	const sd = get(socketData);
	if (!sd) {
		console.log(
			'[subscribeBars]: No socket Data',
			channelString
		);
		return;
	}

	subscriptionItem = {
		subscriberUID,
		resolution,
		lastDailyBar,
		handlers: [handler],
	};


	channelToSubscription.set(channelString, subscriptionItem);

	sd.request('sub-klines', {
		symbol: symbolInfo.name,
		interval: RESOLUTION_MAP[resolution]
	});
	// console.log(
	// 	'[subscribeBars]: Subscribe to streaming. Channel:',
	// 	channelString
	// );
}


export function unsubscribeFromStream(subscriberUID) {
	for (const channelString of channelToSubscription.keys()) {
		const subscriptionItem = channelToSubscription.get(channelString);
		const handlerIndex = subscriptionItem.handlers.findIndex(
			(handler) => handler.id === subscriberUID
		);

		if (handlerIndex !== -1) {
			// Remove from handlers
			subscriptionItem.handlers.splice(handlerIndex, 1);

			if (subscriptionItem.handlers.length === 0) {
				get(socketData)?.request('unsub-klines', {
					channel: channelString
				});
				channelToSubscription.delete(channelString);
				break;
			}
		}
	}
}


// import { parseFullSymbol, apiKey } from './helpers.js';
// import {browser} from '$app/environment';
// import { io } from "socket.io-client";
// const socket = io('wss://streamer.cryptocompare.com/v2?api_key=' + apiKey);
// // if (browser) {

// //  socket = new WebSocket(
// //     'wss://streamer.cryptocompare.com/v2?api_key=' + apiKey
// // 	);
// // }
// const channelToSubscription = new Map();

// socket.on('open', () => {
//     console.log('[socket] Connected');
// });

// socket.on('close', (reason) => {
//     console.log('[socket] Disconnected:', reason);
// });

// socket.on('error', (error) => {
//     console.log('[socket] Error:', error);
// });

// socket.on('message', (event) => {
//     const data = JSON.parse(event.data);
//     console.log('[socket] Message:', data);
//     const {
//         TYPE: eventTypeStr,
//         M: exchange,
//         FSYM: fromSymbol,
//         TSYM: toSymbol,
//         TS: tradeTimeStr,
//         P: tradePriceStr,
//     } = data;

//     if (parseInt(eventTypeStr) !== 0) {
//         // Skip all non-trading events
//         return;
//     }
//     const tradePrice = parseFloat(tradePriceStr);
//     const tradeTime = parseInt(tradeTimeStr);
//     const channelString = `0~${exchange}~${fromSymbol}~${toSymbol}`;
//     const subscriptionItem = channelToSubscription.get(channelString);
//     if (subscriptionItem === undefined) {
//         return;
//     }
//     const lastDailyBar = subscriptionItem.lastDailyBar;
//     const nextDailyBarTime = getNextDailyBarTime(lastDailyBar.time);

//     let bar;
//     if (tradeTime >= nextDailyBarTime) {
//         bar = {
//             time: nextDailyBarTime,
//             open: tradePrice,
//             high: tradePrice,
//             low: tradePrice,
//             close: tradePrice,
//         };
//         console.log('[socket] Generate new bar', bar);
//     } else {
//         bar = {
//             ...lastDailyBar,
//             high: Math.max(lastDailyBar.high, tradePrice),
//             low: Math.min(lastDailyBar.low, tradePrice),
//             close: tradePrice,
//         };
//         console.log('[socket] Update the latest bar by price', tradePrice);
//     }
//     subscriptionItem.lastDailyBar = bar;

//     // Send data to every subscriber of that symbol
//     subscriptionItem.handlers.forEach((handler) => handler.callback(bar));
// });


// function getNextDailyBarTime(barTime) {
//     const date = new Date(barTime * 1000);
//     date.setDate(date.getDate() + 1);
//     return date.getTime() / 1000;
// }

// export function subscribeOnStream(
//     symbolInfo,
//     resolution,
//     onRealtimeCallback,
//     subscriberUID,
//     onResetCacheNeededCallback,
//     lastDailyBar
// ) {
//     const parsedSymbol = parseFullSymbol(symbolInfo.full_name);
//     const channelString = `0~${parsedSymbol.exchange}~${parsedSymbol.fromSymbol}~${parsedSymbol.toSymbol}`;
//     const handler = {
//         id: subscriberUID,
//         callback: onRealtimeCallback,
//     };
//     let subscriptionItem = channelToSubscription.get(channelString);
//     if (subscriptionItem) {
//         // Already subscribed to the channel, use the existing subscription
//         subscriptionItem.handlers.push(handler);
//         return;
//     }
//     subscriptionItem = {
//         subscriberUID,
//         resolution,
//         lastDailyBar,
//         handlers: [handler],
//     };
//     channelToSubscription.set(channelString, subscriptionItem);
//     console.log(
//         '[subscribeBars]: Subscribe to streaming. Channel:',
//         channelString
//     );
//     const subRequest = {
//         action: 'SubAdd',
//         subs: [channelString],
//     };
//     socket.send(JSON.stringify(subRequest));
// }

// export function unsubscribeFromStream(subscriberUID) {
//     // Find a subscription with id === subscriberUID
//     for (const channelString of channelToSubscription.keys()) {
//         const subscriptionItem = channelToSubscription.get(channelString);
//         const handlerIndex = subscriptionItem.handlers.findIndex(
//             (handler) => handler.id === subscriberUID
//         );

//         if (handlerIndex !== -1) {
//             // Remove from handlers
//             subscriptionItem.handlers.splice(handlerIndex, 1);

//             if (subscriptionItem.handlers.length === 0) {
//                 // Unsubscribe from the channel if it was the last handler
//                 console.log(
//                     '[unsubscribeBars]: Unsubscribe from streaming. Channel:',
//                     channelString
//                 );
//                 const subRequest = {
//                     action: 'SubRemove',
//                     subs: [channelString],
//                 };
//                 socket.send(JSON.stringify(subRequest));
//                 channelToSubscription.delete(channelString);
//                 break;
//             }
//         }
//     }
// }