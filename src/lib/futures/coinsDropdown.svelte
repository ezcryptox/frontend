<script>
    import { abbreviateNumber } from "$lib/utils"
	import { onMount,onDestroy } from "svelte";
    import { browser } from '$app/environment';
    import {futuresCurrentPair, showdropdown} from "$lib/store/future.store"
    import { tradePairs, cryptoQuotes } from '$lib/store/marketdata';
    let CoinsDropdown = ["btc", "eth", "doge", "sol", "bch", "xrp", "trx", "avax", "ltc", "ftm", "bnb", "apt"]
    $: tab = 1
    let favourite = []
    $: pairs = []
    onMount(async()=>{
        pairs = [...$tradePairs]
        cryptoQuotes.subscribe((q) => {
			if (!q) return;
			pairs = pairs.map((p) => ({
				...p,
				price: p.price || 0,
				...(q[p.symbol]
					? {
							changePercent: parseFloat(q[p.symbol].changePercent) || 0,
							volumeFrom: parseFloat(q[p.symbol].volumeFrom) || 0,
							volumeTo: parseFloat(q[p.symbol].volumeTo) || 0,
							high: parseFloat(q[p.symbol].high) || 0,
							low: parseFloat(q[p.symbol].low) || 0,
							price: parseFloat(q[p.symbol].price || p.price) || 0
						}
					: {})
			}));
		});
    })

    const handleSwitch = ((event)=>{
        tab = event
        if(!tab){
            pairs = [...favourite]
        }else{
            pairs = [...$tradePairs]
        }
    })


    const handleSearchFilter = ((event)=>{
      pairs =   $tradePairs.filter(item =>
            item.baseCurrencyName.toLowerCase().includes(event.toLowerCase())
        );
    })
        
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="d4d24d97 e62681cd flex-column" style="height: 626px;" >
    <div class="flex-1 h-0">
        <div class="e469e0d1 flex-column" id="js-driver-symbollist">
            <div class="f245461b">
                <div class="el-input el-input--prefix el-input--suffix f078118b">
                    <!-- input --><!-- prepend slot --><!--v-if-->
                     <div class="el-input__wrapper">
                        <!-- prefix slot -->
                         <span class="el-input__prefix">
                            <span class="el-input__prefix-inner">
                                <svg class="svgicon c992da24" aria-hidden="true">
                                    <use xlink:href="#search"></use>
                                </svg>
                                <!--v-if-->
                            </span>
                        </span>
                        <input class="el-input__inner" type="text" on:keyup={(e)=> handleSearchFilter(e.target.value)} autocomplete="off" tabindex="0" placeholder=" Search" id="el-id-92-37">
                        <!-- suffix slot -->
                         <span class="el-input__suffix">
                            <span class="el-input__suffix-inner">
                                <!--v-if--><!--v-if--><!--v-if--><!--v-if--><!--v-if-->
                            </span>
                        </span>
                    </div>
                    <!-- append slot --><!--v-if-->
                    </div>
            </div>
            <div class="da41d6a5">
                <ul>
                    <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
                    <li on:click={()=> handleSwitch(0)} class="{tab ? "" : 'd175e86f'}">Favorites</li>
                     <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
                    <li on:click={()=> handleSwitch(1)} class="{!tab ? "" : 'd175e86f'}">USDⓈ-M</li>
                </ul>
            </div>


            <div class="f76cc8c1 f49cac92">
                <div class="fe0d3a9b"><div>
                    <div class="ec986052">
                        <span>Contracts</span>
                        <div class="a4f3ec75">
                            <svg
                                class={'svgicon d0c44d60 da4b6408'}
                                data-v-102823d5=""
                                width="14"
                                height="12"
                                viewBox="-2 -1 8 12"
                                ><path data-v-102823d5=""
                                    d="M3.3894 0.389565C3.58718 0.1786 3.92206 0.1786 4.11984 0.389566L6.71892 3.16192C7.01866 3.48165 6.79196 4.00493 6.3537 4.00493H1.15554C0.717279 4.00493 0.490576 3.48164 0.79032 3.16192L3.3894 0.389565Z"
                                    id="arrow-up"
                                    fill="#878787"
                                ></path><path
                                    data-v-102823d5=""
                                    d="M3.3894 9.62215C3.58718 9.83312 3.92206 9.83312 4.11984 9.62215L6.71892 6.8498C7.01866 6.53007 6.79196 6.00679 6.3537 6.00679H1.15554C0.717279 6.00679 0.490576 6.53007 0.79032 6.8498L3.3894 9.62215Z"
                                    id="arrow-down"
                                    fill="#878787"
                                ></path></svg>
                            <!-- <svg class="svgicon d0c44d60 da4b6408" aria-hidden="true">
                                <use xlink:href="#arrow-down"></use>
                            </svg>
                            <svg class="svgicon be867ea3 da4b6408" aria-hidden="true">
                                <use xlink:href="#arrow-down"></use>
                            </svg> -->
                        </div>
                    </div>
                </div>
                <span class="ada2373d">/</span>
                <div>
                    <div class="ec986052 c7783387">
                        <span>Turnover</span>
                        <div class="a4f3ec75">
                            <svg
                            class={'svgicon d0c44d60 da4b6408'}
                            data-v-102823d5=""
                            width="14"
                            height="12"
                            viewBox="-2 -1 8 12"
                            ><path data-v-102823d5=""
                                d="M3.3894 0.389565C3.58718 0.1786 3.92206 0.1786 4.11984 0.389566L6.71892 3.16192C7.01866 3.48165 6.79196 4.00493 6.3537 4.00493H1.15554C0.717279 4.00493 0.490576 3.48164 0.79032 3.16192L3.3894 0.389565Z"
                                id="arrow-up"
                                fill="#878787"
                            ></path><path
                                data-v-102823d5=""
                                d="M3.3894 9.62215C3.58718 9.83312 3.92206 9.83312 4.11984 9.62215L6.71892 6.8498C7.01866 6.53007 6.79196 6.00679 6.3537 6.00679H1.15554C0.717279 6.00679 0.490576 6.53007 0.79032 6.8498L3.3894 9.62215Z"
                                id="arrow-down"
                                fill="#878787"
                            ></path></svg>
                        </div>
                    </div>
                </div>
            </div>
            <div class="bbe85e09">
                <div class="ec986052">
                    <span>Last Price (USDT) </span>
                    <div class="a4f3ec75">
                        <svg
                        class={'svgicon d0c44d60 da4b6408'}
                        data-v-102823d5=""
                        width="14"
                        height="12"
                        viewBox="-2 -1 8 12"
                        ><path data-v-102823d5=""
                            d="M3.3894 0.389565C3.58718 0.1786 3.92206 0.1786 4.11984 0.389566L6.71892 3.16192C7.01866 3.48165 6.79196 4.00493 6.3537 4.00493H1.15554C0.717279 4.00493 0.490576 3.48164 0.79032 3.16192L3.3894 0.389565Z"
                            id="arrow-up"
                            fill="#878787"
                        ></path><path
                            data-v-102823d5=""
                            d="M3.3894 9.62215C3.58718 9.83312 3.92206 9.83312 4.11984 9.62215L6.71892 6.8498C7.01866 6.53007 6.79196 6.00679 6.3537 6.00679H1.15554C0.717279 6.00679 0.490576 6.53007 0.79032 6.8498L3.3894 9.62215Z"
                            id="arrow-down"
                            fill="#878787"
                        ></path></svg>
                    </div>
                </div>
            </div>
            <div class="ac223712">
                <div class="ec986052">
                    <span>24h Change</span>
                    <div class="a4f3ec75">
                        <svg
                        class={'svgicon d0c44d60 da4b6408'}
                        data-v-102823d5=""
                        width="14"
                        height="12"
                        viewBox="-2 -1 8 12"
                        ><path data-v-102823d5=""
                            d="M3.3894 0.389565C3.58718 0.1786 3.92206 0.1786 4.11984 0.389566L6.71892 3.16192C7.01866 3.48165 6.79196 4.00493 6.3537 4.00493H1.15554C0.717279 4.00493 0.490576 3.48164 0.79032 3.16192L3.3894 0.389565Z"
                            id="arrow-up"
                            fill="#878787"
                        ></path><path
                            data-v-102823d5=""
                            d="M3.3894 9.62215C3.58718 9.83312 3.92206 9.83312 4.11984 9.62215L6.71892 6.8498C7.01866 6.53007 6.79196 6.00679 6.3537 6.00679H1.15554C0.717279 6.00679 0.490576 6.53007 0.79032 6.8498L3.3894 9.62215Z"
                            id="arrow-down"
                            fill="#878787"
                        ></path></svg>
                    </div>
                </div>
            </div>
            </div>

            <div class="a197946c">
                {#if !pairs.length}
                    <div class="polo-empty"><div class="noData"><div>No data</div><!----></div></div>
                {/if}
                {#if pairs.length}
                <div class="vue-recycle-scroller ready direction-vertical c2b9f505" >
                    {#each pairs as pair}
                        {#if CoinsDropdown.includes(pair.baseCurrencyName.toLocaleLowerCase()) && pair.quoteCurrencyName === "USDT"}
                        <div class="vue-recycle-scroller__item-view " >
                            <div class="f49cac92 {$futuresCurrentPair.baseCurrencyName === pair.baseCurrencyName ? "d175e86f" : ""}">
                                <div class="fe0d3a9b">
                                    <span class="f3953390">
                                        <!-- <svg class="svgicon" aria-hidden="true">
                                            <use xlink:href="#favorite"></use>
                                        </svg> -->
                                        <svg aria-hidden="true" class="svgicon" style="width: 16px; height: 16px; min-width: 16px;"><use xlink:href="#star"></use></svg>
                                    </span>
                                    <span class="b04ade25 eef13958" style="width: 24px; height: 24px; background-image: url(&quot;{pair.baseIcon}&quot;);"></span>
                                    <div class="a7efe086">
                                        <div class="ec7ed94c">{(pair.symbol).replace("_", "")} <span>Perpetual</span></div>
                                        <div class="e00aa2d6">Vol ${abbreviateNumber(pair.volumeTo)}</div>
                                    </div>
                                </div>
                                <div class="bbe85e09">{pair.price}</div>
                                <div class="ac223712 {parseFloat(pair.changePercent) > 0 ? "dd7be9ef" : "d9397ffc"}  ">{parseFloat(pair.changePercent) > 0 ? "+" : ""}{(parseFloat(pair.changePercent)).toFixed(2)}%</div>
                            </div>
                        </div>
                        {/if}
                    
                    {/each}
                    <div data-v-b329ee4c="" class="resize-observer" tabindex="-1">
                        <object aria-hidden="true" tabindex="-1" type="text/html" data="about:blank"></object>
                    </div>

                </div>
                {/if}
            </div>
        </div>
    </div>
</div>
