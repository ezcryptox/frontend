<script>
  import TradeSpot from '$lib/trade-components/trade-spot.svelte'
  import {onMount} from 'svelte';
  import {currentSelectedPair} from "$lib/store/marketdata"
  export let data;
  onMount(() => {
    currentSelectedPair.set(data.pair)
  })
</script>
<TradeSpot/>