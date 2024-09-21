<script>
	import Tradingview from "$lib/futures/tradingview.svelte";
    import "../../../../styles/futures/chart.css"
    import {onMount} from 'svelte';
    import {futuresCurrentPair} from "$lib/store/future.store"
	import Layout from "$lib/futures/controllers/layout.svelte";
	import CoinsDropdown from "$lib/futures/coinsDropdown.svelte";
    export let data;
    onMount(() => {
        futuresCurrentPair.set(data.pair)
    })
</script>

<div class="ed1e27a3 f7624ee7">
    <Tradingview />
    <Layout />
</div>