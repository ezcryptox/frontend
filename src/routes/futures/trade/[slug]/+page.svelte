<script>
	import Tradingview from "$lib/futures/tradingview.svelte";
    import "../../../../styles/futures/chart.css"
    import {onMount} from 'svelte';
    import {currentSelectedPair} from "$lib/store/marketdata"
    export let data;
    onMount(() => {
        currentSelectedPair.set(data.pair)
    })
</script>

<div class="ed1e27a3 f7624ee7">
    
    <div class="d4d24d97 e62681cd flex-column" style="height: 626px;">
        <div class="e14f4b26 flex-1 flex-column w-0">
            <div class="cae6acea flex-space-between"></div>
        </div>
    </div>
    <Tradingview />
</div>