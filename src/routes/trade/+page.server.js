import { redirect } from '@sveltejs/kit';
export function load() {
  redirect(302,'/trade/ETH_USDT?type=spot')
}