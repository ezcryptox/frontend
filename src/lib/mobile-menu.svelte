<script>
import { screen } from "$lib/store/screen"
import { createEventDispatcher } from "svelte";
  import { toggleMode } from "mode-watcher";
const dispatch = createEventDispatcher()

$: showBuyCrypto = false
$: showTrades = false
$: showDerivative = false
$: showExploire = false

</script>

<div class="ccf482a6">
    {#if $screen < 500}
    <div style="padding: 0px 12px 12px;">
        <div class="b6d9e754 f132e3fe">
            <a href="/signup" class="b4f29bce ce727619 f53365fb b4f29bce" on:click={()=> dispatch("close")} data-size="small">
                <span>Sign Up</span>
            </a>
            <a href="/login" on:click={()=> dispatch("close")} class="d2c677df ce727619 fc91b736 d2c677df" data-size="small">
                <span>Log In</span>
            </a>
        </div>
    </div>
    {/if}

    <div>
        {#if $screen < 950}
            <ul class="acab24db">
                <li>
                    <div class="b8777ccf">
                        <button on:click={()=> showBuyCrypto =! showBuyCrypto} class="bfe44f5e">
                            <!---->
                            <svg fill="currentColor">
                                <use xlink:href="#uniframe-icon-buy-crypto"></use>
                            </svg>
                            <span>Buy Crypto</span>
                            <svg fill="currentColor" class="b9c912c9" style="width: 16px; height: 16px;">
                                <use xlink:href="#uniframe-icon-arrow-down"></use>
                            </svg>
                        </button>
                        {#if showBuyCrypto}
                        <div class="a773e3aa">
                            <ul>
                                <li>
                                    <a on:click={()=> dispatch("close")} class="d3f3d2f7" target="_self" href="/cards/buy">
                                        <!---->
                                        <div class="d4ef16dd">
                                            <span>Buy Crypto</span>
                                            <!----><!---->
                                        </div>
                                        <!---->
                                    </a>
                                </li>
                                <li>
                                    <a on:click={()=> dispatch("close")} class="d3f3d2f7" target="_self" href="/p2p/markets?tab=buy&cur=usdt&local=usd">
                                        <!---->
                                        <div class="d4ef16dd">
                                            <span>P2P</span>
                                            <!----><!---->
                                        </div>
                                        <!---->
                                    </a>
                                </li>
                            </ul>
                        </div>
                        {/if}
                    </div>
                </li>
                <li>
                    <a on:click={()=> dispatch("close")} class="bfe44f5e" target="_self" href="/markets">
                        <!---->
                        <svg fill="currentColor">
                            <use xlink:href="#uniframe-icon-market"></use>
                        </svg>
                        <span>Markets</span>
                    </a>
                </li>
                <li>
                    <div class="b8777ccf">
                        <button on:click={()=> showTrades =! showTrades} class="bfe44f5e">
                            <!---->
                            <svg fill="currentColor">
                                <use xlink:href="#uniframe-icon-trade"></use>
                            </svg>
                            <span>Trade</span>
                            <svg fill="currentColor" class="b9c912c9" style="width: 16px; height: 16px;">
                                <use xlink:href="#uniframe-icon-arrow-down"></use>
                            </svg>
                        </button>
                        {#if showTrades}
                        <div class="a773e3aa">
                            <ul>
                                <li>
                                    <a class="d3f3d2f7" target="_self" href="?/trade?type=spot">
                                        <!---->
                                        <div class="d4ef16dd">
                                            <span>Spot</span>
                                            <!----><!---->
                                        </div>
                                        <!---->
                                    </a>
                                </li>
                                <li>
                                    <a class="d3f3d2f7" target="_self" href="?/trade?type=margin">
                                        <!---->
                                        <div class="d4ef16dd">
                                            <span>Margin</span>
                                            <!----><!---->
                                        </div><!---->
                                    </a>
                                </li>
                                <li>
                                    <a class="d3f3d2f7" target="_self" href="?/strategy/spot-grid/BTC_USDT">
                                        <!---->
                                        <div class="d4ef16dd">
                                            <span>Strategy Trading</span>
                                            <!----><!---->
                                        </div>
                                        <!---->
                                    </a>
                                </li>
                            </ul>
                        </div>
                        {/if}
                    </div>
                </li>
                <li>
                    <div class="b8777ccf">
                        <button on:click={()=> showDerivative =! showDerivative} class="bfe44f5e">
                            <!---->
                            <svg fill="currentColor">
                                <use xlink:href="#uniframe-icon-futures"></use>
                            </svg>
                            <span>Derivatives</span>
                            <svg fill="currentColor" class="b9c912c9" style="width: 16px; height: 16px;">
                                <use xlink:href="#uniframe-icon-arrow-down"></use>
                            </svg>
                        </button>
                        {#if showDerivative}
                        <div class="a773e3aa">
                            <ul>
                                <li>
                                    <a class="d3f3d2f7" target="_self" href="/futures/trade">
                                        <!---->
                                        <div class="d4ef16dd">
                                            <span>Futures Trading</span>
                                            <!----><!---->
                                        </div>
                                        <!---->
                                    </a>
                                </li>
                                <li>
                                    <a class="d3f3d2f7" target="_self" href="/strategy/futures-grid">
                                        <!---->
                                        <div class="d4ef16dd">
                                            <span>Grid Trading</span>
                                            <!----><!---->
                                        </div>
                                        <!---->
                                    </a>
                                </li>
                                <li>
                                    <a class="d3f3d2f7" target="_self" href="/strategy/copytrading">
                                        <!---->
                                        <div class="d4ef16dd">
                                            <span>Copy Trading</span>
                                            <!----><!---->
                                        </div>
                                        <!---->
                                    </a>
                                </li>
                            </ul>
                        </div>
                        {/if}
                      
                    </div>
                </li>
                <!---->
                <li>
                    <div class="b8777ccf">
                        <button on:click={()=> showExploire =! showExploire} class="bfe44f5e">
                            <!---->
                            <svg fill="currentColor">
                                <use xlink:href="#uniframe-icon-search"></use>
                            </svg>
                            <span>Explore</span>
                            <svg fill="currentColor" class="b9c912c9" style="width: 16px; height: 16px;">
                                <use xlink:href="#uniframe-icon-arrow-down"></use>
                            </svg>
                        </button>
                        {#if showExploire}
                        <div class="a773e3aa">
                            <ul>
                                <li>
                                    <a class="d3f3d2f7" target="_self" href="/topic/airdrop-token?utm_source=navbar">
                                        <!---->
                                        <div class="d4ef16dd">
                                            <span>Epic Airdrop</span>
                                            <!----><!---->
                                        </div>
                                        <!---->
                                    </a>
                                </li>
                                <li>
                                    <a class="d3f3d2f7" target="_self" href="/referral">
                                        <!---->
                                        <div class="d4ef16dd">
                                            <span>Referral</span>
                                            <!----><!---->
                                        </div>
                                        <!---->
                                    </a>
                                </li>
                                <li>
                                    <a class="d3f3d2f7" target="_self" href="/reward-center">
                                        <!---->
                                        <div class="d4ef16dd">
                                            <span>Reward Center</span>
                                            <i class="c69ddc99"></i>
                                            <!---->
                                        </div>
                                        <!---->
                                    </a>
                                </li>
                                <li>
                                    <a class="d3f3d2f7" target="_self" href="/leaderboard">
                                        <!---->
                                        <div class="d4ef16dd">
                                            <span>Campaigns</span>
                                            <!----><!---->
                                        </div>
                                        <!---->
                                    </a>
                                </li>
                                <li>
                                    <a class="d3f3d2f7" target="_self" href="/launchbase">
                                        <!---->
                                        <div class="d4ef16dd">
                                            <span>LaunchBase</span>
                                            <!----><!---->
                                        </div>
                                        <!---->
                                    </a>
                                </li>
                                <li>
                                    <a class="d3f3d2f7" target="_self" href="/feed">
                                        <!---->
                                        <div class="d4ef16dd">
                                            <span>News</span>
                                            <!----><!---->
                                        </div>
                                        <!---->
                                    </a>
                                </li>
                                <li>
                                    <a class="d3f3d2f7" target="_self" href="/blog">
                                        <!---->
                                        <div class="d4ef16dd">
                                            <span>Ezcryptox Blog</span>
                                            <!----><!---->
                                        </div>
                                        <!---->
                                    </a>
                                </li>
                            </ul>
                        </div>
                        {/if}
                    </div>
                </li>
                <!---->
            </ul>
        {/if}
    </div>
    <ul class="df32d985">
        <li  class="b1398ab6">
            <svg fill="currentColor" style="width: 24px; height: 24px;">
                <use xlink:href="#uniframe-icon-language"></use>
            </svg>
            <span>EN/USD</span>
        </li>
        <li class="b1398ab6 relative" on:click={() => {dispatch("close");toggleMode()}}>
            <svg fill="currentColor" style="width: 20px; height: 20px;" class="absolute scale-100 transition-all dark:scale-0">
              <use
                xlink:href="#uniframe-icon-sun"
              ></use>
            </svg>
            <svg fill="currentColor" style="width: 20px; height: 20px;" class="absolute scale-0 transition-all dark:scale-100">
              <use
                xlink:href="#uniframe-icon-moon"
              ></use>
            </svg>
            <span style="padding-left: 40px">Light Mode</span>
        </li>
        <li>
            <a on:click={()=> dispatch("close")}  rel="noopener noreferrer" href="?support.poloniex.com" class="b1398ab6">
                <svg fill="currentColor" style="width: 24px; height: 24px;">
                    <use xlink:href="#uniframe-icon-support"></use>
                </svg>
                <span>Support</span>
            </a>
        </li>
    </ul>
</div>

<style>

</style>
