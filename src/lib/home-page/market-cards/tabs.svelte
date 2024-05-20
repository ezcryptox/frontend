<script>
import { onMount } from "svelte";
import { screen } from "$lib/store/screen"
import { handleExchanegerate } from "../hook"
import Trending from "./trending.svelte";
$: tab = 1
let respons = ""
$: loading = false

onMount(async()=>{
    loading = false
    let {is_loading, response} = await handleExchanegerate()
    loading = is_loading
    if(response){
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
<div class="ed9d297c">
    {#if tab  === 1}
        <Trending response={respons}/>
    {/if}
</div>



<style>
   
</style>