import { writable } from "svelte/store";

type Quote = {[k:string]: {[k:string]: any}}
const _quotes: Quote | null = null
export const cryptoQuotes = writable <Quote|null>(_quotes)

const _orderBook: {[k:string]: unknown} | null = null;
export const orderBook = writable(_orderBook)

const _depthChartList: { bids: [][], asks: [][], symbol: string, length: number } = {bids: [], asks: [], symbol: 'ETH_USDT', length: 0};
export const depthChartList = writable(_depthChartList)

const _marketTrades: { [k: string]: unknown } | null = null;
export const marketTrades = writable(_marketTrades)


type CryptoPair = {
  baseCurrencyName: string;
  quoteCurrencyName: string;
  baseCurrencyDisplayName: string;
  symbol: string;
  displayName: string;
  state: string;
  visibleStartTime: string;
  tradableStartTime: string;
  sort: number;
  symbolZones: string;
  symbolTags: string;
  blockchain: {
    displayName: string,
    symbol: string
  }
  tradeLimit: {
    symbol: string;
    priceScale: number;
    quantityScale: number;
    amountScale: number;
    minQuantity: string;
    minAmount: number;
    highestBid: number;
    lowestAsk: number;
    scales: string[];
  };
  crossMargin: {
    supportCrossMargin: boolean;
    maxLeverage: number;
  };
  grid: {
    supportGrid: boolean;
    gridMinPrice: number;
    gridMaxPrice: number;
    gridSlp: string;
  };
  symbolId: number;
  baseIcon: string;
  quoteIcon: string;

  changePercent: number;
  volumeFrom: number;
  volumeTo: number;
  high: number;
  low: number;
  price: number
};
const _currentSelectedPair: CryptoPair | null = null;
export const currentSelectedPair = writable<CryptoPair|null>(_currentSelectedPair);

const _tradePairs: CryptoPair[] = [];
export const tradePairs = writable <CryptoPair[]>(_tradePairs);

const _exchangeChartType: 'kline' | 'depth' = 'kline';
export const exchangeChartType = writable<'kline' | 'depth'>(_exchangeChartType);