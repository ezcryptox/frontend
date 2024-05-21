<script>
import { onMount } from "svelte";
import { screen } from "$lib/store/screen"
import { handleExchanegerate } from "../hook"
import Loader from '$lib/loader.svelte';
import Trending from "./trending.svelte";
$: tab = 1
let respons = []
$: loading = false

onMount(async () => {
    loading = true
    let {  is_loading, response } = await handleExchanegerate()
    loading = is_loading
    if (response) {
        respons = response
    }
})


</script>

<div class="_6cad0982">
    <button class="_3568d55e {tab === 1 ? "c48b7a0c" : ""}" on:click={()=> tab = 1}> Trending </button>
    <button class="_3568d55e {tab === 2 ? "c48b7a0c" : ""}" on:click={()=> tab = 2}> 24H Gainers </button>
    <button class="_3568d55e {tab === 3 ? "c48b7a0c" : ""}" on:click={()=> tab = 3}> Top Futures </button>
    <button class="_3568d55e {tab === 4 ? "c48b7a0c" : ""}" on:click={()=> tab = 4}> 24H Losers </button>
    {#if $screen > 1022}
    <a href="/markets" class="_769a4f15">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 2L8 5.5L4 9" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"></path>
        </svg>
    </a>
    {/if}
</div>
{#if $screen > 700}
<div class="ed9d297c">1
    {#if tab  === 1}
        <Trending response={respons}/>
    {/if}
</div>
{:else}
    <div class="_4fd0cd7d">
        <div class="b780ffd8">
            <div class="_2858318f">Market</div>
            <div class="_2858318f"> Price/Change(24) </div>
        </div>
        {#if loading}
            <Loader />
        {:else}
        {#if tab  === 1}
        {#each respons.slice(0, 8) as resp}
        <!-- {#if resp.symbol === "btc" ||( resp.symbol === "eth") || (resp.symbol === "trx") || (resp.symbol === "doge" ) || (resp.symbol === "xrp") } -->
        <a href="/trade/{resp.symbol}_USDT" class="c675bf15">
            <div class="_2858318f">
                <i class="_787e34f8" style="background-image: url(&quot;{resp.image}&quot;);">
                </i>
                <div class="_951bea5f ttu">{resp.symbol}<span>/{resp.symbol === "usdt" ? "USDC" : "USDT"}</span>
                    <div> {resp.id} </div>
                </div>
            </div>
            <div>
                <div class="ee28dea8">${resp.current_price}</div>
                <div class="_7a491e6a  {resp.price_change_percentage_24h > 0 ? "_45d3d61f" : "_50c7203a"}">{resp.price_change_percentage_24h > 0 ? "+" : ""}{(parseFloat(resp.price_change_percentage_24h)).toFixed(2)}%</div>
            </div>
        </a>
        <!-- {/if} -->
        {/each}
        {/if}

        {#if tab  === 2}
        {#each respons.slice(0, 8) as resp}
        <!-- {#if resp.symbol === "btc" ||( resp.symbol === "eth") || (resp.symbol === "trx") || (resp.symbol === "doge" ) || (resp.symbol === "xrp") } -->
        <a href="/trade/{resp.symbol}_USDT" class="c675bf15">
            <div class="_2858318f">
                <i class="_787e34f8" style="background-image: url(&quot;{resp.image}&quot;);">
                </i>
                <div class="_951bea5f ttu">{resp.symbol}<span>/{resp.symbol === "usdt" ? "USDC" : "USDT"}</span>
                    <div> {resp.id} </div>
                </div>
            </div>
            <div>
                <div class="ee28dea8">${resp.current_price}</div>
                <div class="_7a491e6a  {resp.price_change_percentage_24h > 0 ? "_45d3d61f" : "_50c7203a"}">{resp.price_change_percentage_24h > 0 ? "+" : ""}{(parseFloat(resp.price_change_percentage_24h)).toFixed(2)}%</div>
            </div>
        </a>
        <!-- {/if} -->
        {/each}
        {/if}
        <div class="_769a4f15">
            <a href="/markets">
                View markets
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 2L8 5.5L4 9" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"></path>
                </svg>
            </a>
        </div>
        {/if}

    </div>
{/if}

<style>

</style>
