import { redirect } from '@sveltejs/kit';
import axios from 'axios'
import { ServerURl } from '$lib/backendUrl'
import { browser } from '$app/environment';
import { tradePairs } from '$lib/store/marketdata';
import { get } from 'svelte/store';

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
    const {pairs } = (await axios.get(`${ServerURl()}/api/market/currdata`)).data;
    if(pairs){
        tradePairs.set(pairs);
    }
    else{
        tradePairs.set([]);
    }
}