import { redirect } from '@sveltejs/kit';
import {browser} from '$app/environment'
export function load({url}) {
  let pair = 'ETH_USDT';
  let type = url.searchParams.get('type') || 'spot';
  if (browser) {
    pair = localStorage.getItem('x-last-symbol') || pair;
  }
  redirect(302,`/trade/${pair}?type=${type}`)
}