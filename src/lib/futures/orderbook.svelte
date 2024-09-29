<script>
	import Orderbook from "./ordertab/orderbook.svelte";
    $: orderHeader = 0

    const handleHeaderSwitch = ((evn)=>{
        orderHeader = evn
    })

</script>

<div class="e814c547 flex-column">
    <ul class="a031e8a5">
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
        <li on:click={()=> handleHeaderSwitch(0)} class="{!orderHeader ? "f9994809" : ""}">Orderbook</li>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
        <li on:click={()=> handleHeaderSwitch(1)} class="{orderHeader ? "f9994809" : ""}">Market Trades</li>
    </ul>
    <Orderbook />
</div>