<script>
	import { _ } from 'svelte-i18n';
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();
    export let tab

</script>
<div class="_9ee5e188">
    <div class="_5e5404d1 _5527c494">
        <span class="_8733ff05 _823ea934">
            <svg aria-hidden="true" class="svgicon" style="width: 8px; height: 12px; min-width: 0px;">
                <use xlink:href="#right"></use>
            </svg>
        </span>
        <div class="e67d2568">
            <div class="_4fe14017">
                <button on:click={()=> dispatch("select", "USDT")} class="d7b97cd2 {tab === "USDT" ? "_4907f2bd" : ""}  ">
                    <span class="e0294d2e">
                        USDT
                    </span>
                </button>
                <button on:click={()=> dispatch("select", "BTC")} class="d7b97cd2 {tab === "BTC" ? "_4907f2bd" : ""}">
                    <span class="e0294d2e"> BTC <!----></span>
                </button>
                <button on:click={()=> dispatch("select", "ETH")} class="d7b97cd2 {tab === "ETH" ? "_4907f2bd" : ""}">
                    <span class="e0294d2e">
                        ETH
                    </span>
                </button>
            </div>
        </div>
        <span class="_8733ff05 accd8ea7">
            <svg aria-hidden="true" class="svgicon" style="width: 8px; height: 12px; min-width: 0px;">
                <use xlink:href="#right"></use>
            </svg>
        </span>
        <div class="c33df4bf" style="left: 208px; display: none;">
            <div class="_1fc1e37e"></div>
        </div>
    </div>
</div>
<style>

</style>