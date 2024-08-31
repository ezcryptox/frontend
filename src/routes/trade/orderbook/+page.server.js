import { redirect } from '@sveltejs/kit';
export function load() {
  redirect(302,'/trade/orderbook/ETH_USDT')
}