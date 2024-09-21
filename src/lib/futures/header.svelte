<script>
    import {futuresCurrentPair, futuresTradePairs, showdropdown} from "$lib/store/future.store";
    import { abbreviateNumber } from "$lib/utils"
	import CoinsDropdown from "./coinsDropdown.svelte";
    import { browser } from '$app/environment';
    import { onMount,onDestroy } from "svelte";
     $: _24hrChange = 0

     const handleMarkPrice = ((price)=>{
        if(!price){
            return "---"
        }
       return (parseFloat(price).toFixed(2)).replace(/\d(?=(\d{3})+\.)/g, '$&,');
     })

     $:{
        if($futuresTradePairs[0]?.c){
            _24hrChange = ((($futuresTradePairs[0]?.c - $futuresTradePairs[0]?.o) / $futuresTradePairs[0]?.o) * 100)
        }
     }

     // Function to close dropdown when clicking outside
    function handleClickOutside(event) {
        if (!event.target.closest('.d4d24d9799ss')) {
            showdropdown.set(false)
        }
    }

    onMount(() => {
        if (browser) {
            document.addEventListener('click', handleClickOutside);
        }
    });
    onDestroy(() => {
        document.removeEventListener('click', handleClickOutside);
    });


</script>

<div class="d4d24d9799ss">
    {#if $showdropdown}
        <CoinsDropdown />
    {/if}

    <div class="afa972df e62681cd">
        <div class="cf58e521 fc86ec4c">
            <div class="f916a389">
                <div class="a93e0a6c">
                    <!-- svelte-ignore a11y-no-static-element-interactions -->
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <div on:click={()=> showdropdown.set($showdropdown ? false : true)} id="js-driver-ticker-currency" class="a9faaf47">
                        <img class="b04ade25 f7a7927b" src="{$futuresCurrentPair.baseIcon}" alt="">
                        <h2 class="e289794c">{$futuresCurrentPair.baseCurrencyName + $futuresCurrentPair.quoteCurrencyName}</h2>
                        <div class="ca04e6b8">Perpetual</div>
                        <svg class="svgicon b4677f3e" width="12px" height="12px" x="0" y="0" viewBox="0 0 32 32" style="transform: rotate(0deg);"><g>
                            <path d="M29.604 10.528 17.531 23.356a2.102 2.102 0 0 1-3.062 0L2.396 10.528c-.907-.964-.224-2.546 1.1-2.546h25.008c1.324 0 2.007 1.582 1.1 2.546z"></path>
                        </g></svg>
                    </div>
    
                </div>
                <div class="ac8232da">
                    <div class="e9327b9c">{handleMarkPrice($futuresTradePairs[1]?.mPx)}</div>
                    <dl class="jjs23kk" >
                        <dt>
                        <span class="c977d13e el-tooltip__trigger el-tooltip__trigger">Mark Price</span></dt>
                        <dd>{handleMarkPrice($futuresTradePairs[1]?.mPx)}</dd>
                    </dl>
                    <dl class="jjs23kk"><dt><span class="c977d13e el-tooltip__trigger el-tooltip__trigger">Index Price</span></dt>
                        <dd>{handleMarkPrice($futuresTradePairs[2]?.iPx)}</dd>
                    </dl>
                    <dl class="b20ab108"><dt>
                        <div class="el-tooltip__trigger">
                            <span class="c364c28e c977d13e">Funding</span>
                            <!-- <span class="ad57f5c6 c977d13e">Predicted Funding Rate</span> -->
                            <span>/</span>
                            <span class="c977d13e">Countdown</span>
                        </div>
                    </dt>
                    <dd>
                        <span class="c364c28e">{$futuresTradePairs[3] ? $futuresTradePairs[3].fR : "---" }%</span>
                        <!-- <span class="ad57f5c6">0.0100%</span> -->
                        <span>/</span><span>05:14:32</span>
                    </dd>
                </dl>
                <dl class=" {_24hrChange > 0 ? "cd5394d6" : "cd5394d6 a8f9ff2f"} e6f20e96 ">
                    <dt>24h Change</dt>
                    <dd>{_24hrChange > 0 ? "+" : ""}{(_24hrChange).toFixed(2)}%</dd>
                </dl>
                <dl class="e6f20e96"><dt>24h High</dt><dd>{$futuresTradePairs[0] ? $futuresTradePairs[0]?.h : "---"}</dd></dl>
                <dl class="e6f20e96"><dt>24h Low</dt><dd>{$futuresTradePairs[0] ? $futuresTradePairs[0]?.l : "---"}</dd></dl>
                <dl class="e6f20e96"><dt>24H Volume(Cont)</dt><dd>{$futuresTradePairs[0] ? abbreviateNumber($futuresTradePairs[0]?.amt) : "---"}</dd></dl>
                <dl class="e6f20e96"><dt>24H Turnover(USDT)</dt><dd>{$futuresTradePairs[0] ? abbreviateNumber($futuresTradePairs[0]?.amt) : "---"}</dd></dl>
                <dl class="e6f20e96"><dt>Open Interest(Cont)</dt><dd>{handleMarkPrice($futuresTradePairs[0]?.qty)}</dd></dl>
            </div>
        </div>
        <!-- <div class="ad2fe32b">
            <a href="/futures/contract/detail" class="f65f73b3">
                <svg class="svgicon" aria-hidden="true" style="width: 13px; height: 13px;">
                    <use xlink:href="#record"></use>
                </svg>
                <span>Contract Information</span>
            </a>
        </div> -->
        </div>
    </div>
</div>


