
import { ServerURl } from '$lib/backendUrl'
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
	'10': '5m',
	'30': '30m',
	'60': '1h',
	'120': '2h',
	'180': '2h',
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
