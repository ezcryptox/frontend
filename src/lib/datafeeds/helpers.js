
import { ServerURl } from '$lib/backendUrl'

// Your CryptoCompare API key
export const apiKey = "9cfe10e21a2c3c472360e431db4d096e73e6fdea1f37a1dd029c87170fd5639a";

// Makes requests to CryptoCompare API
// export async function makeApiRequest(path) {
//     try {
//         const url = new URL(`https://min-api.cryptocompare.com/${path}`);
//         url.searchParams.append('api_key',apiKey)
//         const response = await fetch(url.toString());
// 		console.log(response)
//         return response.json();
//     } catch (error) {
//         throw new Error(`CryptoCompare request error: ${error.status}`);
//     }
// }

export async function makeApiRequest(path) {
	try {
		const url = new URL(`${ServerURl()}/${path}`);
		const response = await fetch(url.toString());
		return response.json();
	} catch (error) {
		throw new Error(`API request error: ${error.status}`);
	}
}

export const RESOLUTION_MAP = {
	'1': '1m',
	'5': '5m',
	'15': '15m',
	'10': '15m',
	'30': '30m',
	'60': '1h',
	'240': '4h',
	'360': '6h',
	'720': '12h',
	'1D': '1d',
	'3D': '3d',
	'1W': '1w',
	'1M': '1M'
}
// Generates a symbol ID from a pair of the coins
export function generateSymbol(exchange, fromSymbol, toSymbol) {
	const short = `${fromSymbol}/${toSymbol}`;
	return {
		short,
		full: `${exchange}:${short}`,
	};
}
export function splitSymbolName(symbol) {
	const supportedQuotes = [
		'USDT', 'USDC',
		'BTC', 'TRX',
		'BNB', 'USDD',
		'ETH', 'BFIC'
	];

	const quote = supportedQuotes.find(q => symbol.toLowerCase().endsWith(q.toLowerCase())) || '';
	const base = symbol.substring(0, symbol.lastIndexOf(quote))
	return { base, quote }
}
export function parseFullSymbol(fullSymbol) {
	const match = fullSymbol.match(/^(\w+):(\w+)\/(\w+)$/);
	if (!match) {
		return null;
	}

	return {
		exchange: match[1],
		base: match[2],
		quote: match[3],
	};
}
