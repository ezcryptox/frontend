import { writable } from "svelte/store"
let _tradeConfig = {
  side: 'buy',
  price: 0,
  quotePrice: 0,
  amount: 0,
  orderType: 'limit',
  pair: 'ETH/USDT',
  placingOrder: false,
}
export let tradeConfig = writable(_tradeConfig)

let _tradeBalance = {
  base: {
    symbol: 'ETH',
    balance: 0,
    usd: 0,
  },
  quote: {
    symbol: 'USDT',
    balance: 0,
    usd: 0,
  }
}
export let tradeBalance = writable(_tradeBalance)

export const hideOtherPairs = writable(false)

export const hideCanceledOrders = writable(false)

export const dataRefreshKey = writable(1)