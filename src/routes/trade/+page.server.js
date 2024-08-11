import { redirect } from '@sveltejs/kit';
export function load() {
  //redirect to /trade/ETH_USDT
  redirect(302,'/trade/ETH_USDT')
}