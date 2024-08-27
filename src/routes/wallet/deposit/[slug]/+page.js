import { redirect } from '@sveltejs/kit';
import axios from 'axios';
import { get } from 'svelte/store'
import { handleAuthToken } from "$lib/store/routes";
import { ServerURl } from '$lib/backendUrl';
import { browser } from '$app/environment';


/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
  const token = get(handleAuthToken);
  if (!browser || !token) return {};
  const result = (
    await axios.get(`${ServerURl()}/api/assets/currencies`, {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
  ).data;

  if (params.slug && result.map(p => p.name.toLowerCase()).includes(params.slug.toLowerCase())) {
    const currency = result.find(p => p.name.toLowerCase() === params.slug.toLowerCase())

    return {
      currency
    };
  } else redirect(302, '/wallet/deposit')
}