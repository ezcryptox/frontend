import { error } from '@sveltejs/kit';
import axios from 'axios'
import { ServerURl } from '$lib/backendUrl'
import { browser } from '$app/environment';
import { tradePairs } from '$lib/store/marketdata';

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
  const pairs = await getPairs();
  tradePairs.set(pairs);
  if (params.slug && pairs.map(p => p.symbol.toLowerCase()).includes(params.slug.toLowerCase())) {
    const pair = pairs.find(p => p.symbol.toLowerCase() === params.slug.toLowerCase())
   
    return {
      slug: params.slug,
      pair,
      pairs,
    };
  } else error(404, 'Page Not found')
}

async function getPairs() {
  if (browser) {
    const pairsString = localStorage.getItem('x-currency-list');
    if (pairsString) {
      return JSON.parse(pairsString);
    }
  }
  const { zones, pairs } = (await axios.get(`${ServerURl()}/api/market/currdata`)).data;
  if (browser) {
    localStorage.setItem('x-currency-list', JSON.stringify(pairs));
    localStorage.setItem('x-symbol-zones', JSON.stringify(zones))
  }
  return pairs;
}