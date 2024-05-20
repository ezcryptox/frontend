<script>
import { screen } from "$lib/store/screen"
    import MobileMenu from "./mobile-menu.svelte";
import BuyCrypto from "./navbar-components/buy-crypto.svelte";
import Derivative from "./navbar-components/derivative.svelte";
import Explore from "./navbar-components/explore.svelte";
import Notification from "./navbar-components/notification.svelte";
import Trade from "./navbar-components/trade.svelte";

$: is_menu = false

</script>

<div id="uniframe-header" data-v-app>
    <header class="cdd74806 uniframe-root uniframe-header">
        <div class="d576b507">
            <div>
                <div class="c0f4158f">
                    <a href="/">
                        <img src="https://res.cloudinary.com/dxwhz3r81/image/upload/v1715942424/ezcryptox.ioo-01_y2dny9.png" alt="">
                    </a>
                </div>
            </div>

            <div style="margin-right: auto;">
                {#if $screen > 950}
                <ul class="a3107c1e">
                    <li>
                    <div class="b8777ccf">
                        <div class="bfe44f5e">
                            <span>Buy Crypto</span>
                            <svg fill="currentColor" style="width: 16px; height: 16px;">
                                <use xlink:href="#uniframe-icon-arrow-down"></use>
                            </svg>
                        </div>
                        <BuyCrypto />
                    </div>
                </li>
                <li>
                    <a class="bfe44f5e" target="_self" href="/markets">
                        <!----><!---->
                        <span>Markets</span>
                    </a>
                </li>
                <li>
                    <div class="b8777ccf">
                        <div class="bfe44f5e">
                            <span>Trade</span>
                            <svg fill="currentColor" style="width: 16px; height: 16px;">
                                <use xlink:href="#uniframe-icon-arrow-down"></use>
                            </svg>
                        </div>
                     <Trade />
                    </div>
                </li>
                <li>
                    <div class="b8777ccf">
                        <div class="bfe44f5e">
                            <span>Derivatives</span>
                            <svg fill="currentColor" style="width: 16px; height: 16px;">
                                <use xlink:href="#uniframe-icon-arrow-down"></use>
                            </svg>
                        </div>
                        <Derivative />
                    </div>
                </li>
                <li>
                    <a class="bfe44f5e" target="_self" href="/earn">
                        <!----><!---->
                        <span>Earn</span>
                    </a>
                </li>
                <li>
                    <div class="b8777ccf">
                        <div class="bfe44f5e">
                            <span>Explore</span>
                            <svg fill="currentColor" style="width: 16px; height: 16px;">
                                <use xlink:href="#uniframe-icon-arrow-down"></use>
                            </svg>
                        </div>
                     <Explore />
                    </div>
                </li>
                </ul>
                {/if}
            </div>
           
         
         
            <div>
                {#if $screen > 500}
                <div class="b6d9e754">
                    <a href="/signup" class="b4f29bce ce727619 f53365fb b4f29bce" data-size="small">
                        <span>Sign Up</span>
                    </a>
                    <a href="/login" class="d2c677df ce727619 fc91b736 d2c677df" data-size="small">
                        <span>Log In</span>
                    </a>
                </div>
                {/if}
                <!---->
            </div>
        

            {#if $screen > 1130}
            <div>
                <div class="c9759bc4">
                    <svg fill="currentColor" style="width: 20px; height: 20px;">
                        <use xlink:href="#uniframe-icon-sun"></use>
                    </svg>
                </div>
                <div class="dd8dbce9" >
                    <svg fill="currentColor" style="width: 20px; height: 20px;">
                        <use xlink:href="#uniframe-icon-notification"></use>
                    </svg>
                  <Notification />
                </div>
                <a href="https://support.poloniex.com" target="_blank" rel="noopener noreferrer" class="a9d0f06a">
                    <svg fill="currentColor" style="width: 20px; height: 20px;">
                        <use xlink:href="#uniframe-icon-support"></use>
                    </svg>
                </a>
                <button class="eb58c575">
                    <span>EN/USD</span>
                    <svg fill="currentColor" style="width: 16px; height: 16px;">
                        <use xlink:href="#uniframe-icon-arrow-down"></use>
                    </svg>
                </button>
            </div>
            {:else}
            <div>
                <button on:click={()=> is_menu =! is_menu} class="d5236253 {is_menu ? "b53872b6" : ""}">
                    <i></i><i></i><i></i>
                </button>
                {#if is_menu}
                    <MobileMenu />
                {/if}
            </div>
            {/if}
        </div>
    </header>
</div>

<style>

</style>
