import { redirect } from '@sveltejs/kit';
import axios from 'axios'
import { ServerURl } from '$lib/backendUrl'
import { browser } from '$app/environment';
import { tradePairs } from '$lib/store/marketdata';
import { get } from 'svelte/store';

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
  const pairs = await getPairs();
  if (params.slug && pairs.map(p => p.symbol.toLowerCase()).includes(params.slug.toLowerCase())) {
    const pair = pairs.find(p => p.symbol.toLowerCase() === params.slug.toLowerCase())
    return {
      slug: params.slug,
      pair,
    };
  } else {
    redirect(302, '/trade')
  }
}

async function getPairs() {
  
  const _pairs = get(tradePairs);
  if (_pairs.length) return _pairs;
  // if (browser) {
  //   const pairsString = localStorage.getItem('x-currency-list');
  //   if (pairsString) {
  //     tradePairs.set(JSON.parse(pairsString));
  //     return JSON.parse(pairsString);
  //   }
  // }
  const { zones, pairs } = (await axios.get(`${ServerURl()}/api/market/currdata`)).data;
  tradePairs.set(pairs);
  if (browser) {
    localStorage.setItem('x-currency-list', JSON.stringify(pairs));
    localStorage.setItem('x-symbol-zones', JSON.stringify(zones))
  }
  return pairs;
}