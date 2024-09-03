import { redirect } from '@sveltejs/kit';
import axios from 'axios'
import { get } from 'svelte/store';
import { ServerURl } from '$lib/backendUrl'
import { browser } from '$app/environment';
import {tradePairs} from '$lib/store/marketdata'


/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
  const pairs = await getPairs();
  if (params.slug && pairs.map(p => p.symbol.toLowerCase()).includes(params.slug.toLowerCase())) {
    const pair = pairs.find(p => p.symbol.toLowerCase() === params.slug.toLowerCase())
    return {
      slug: params.slug,
      pair,
    };
  } else redirect(302, '/trade/orderbook/ETH_USDT')
}

async function getPairs() {
  const _pairs = get(tradePairs);
  if (_pairs.length) return _pairs;
  const { zones, pairs } = (await axios.get(`${ServerURl()}/api/market/currdata`)).data;
  tradePairs.set(pairs);

  if (browser) {
    localStorage.setItem('x-currency-list', JSON.stringify(pairs));
    localStorage.setItem('x-symbol-zones', JSON.stringify(zones))
  }
  return pairs;
}