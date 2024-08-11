import { error,redirect } from '@sveltejs/kit';
import axios from 'axios'
import { ServerURl } from '$lib/backendUrl'

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
  const { pairs } = (await axios.get(`${ServerURl()}/api/market/pairs`)).data;
  if (params.slug && pairs.map(p => p.symbol.toLowerCase()).includes(params.slug.toLowerCase())) {
    const pair = pairs.find(p => p.symbol.toLowerCase() === params.slug.toLowerCase())
    return {
      slug: params.slug,
      pair,
      pairs: pairs.sort((a, b) => b.price - a.price).slice(0, 50),
    };
  } else error(404, 'Page Not found')
}