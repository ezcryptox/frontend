import { error } from '@sveltejs/kit';
import axios from 'axios'
import { ServerURl } from '$lib/backendUrl'

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
  const { pairs } = (await axios.get(`${ServerURl()}/api/market/pairs`)).data; //http://localhost:8000
  if (params.slug && pairs.map(p => p.symbol.toLowerCase()).includes(params.slug.toLowerCase())) {
    const pair = pairs.find(p => p.symbol.toLowerCase() === params.slug.toLowerCase())
    return {
      slug: params.slug,
      pair,
      pairs,
    };
  } else error(404, 'Page Not found')
}