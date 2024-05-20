<script>
import NewListing from "$lib/market/new-listing.svelte";
import TopGainer from "$lib/market/top-gainer.svelte";
import Trending from "$lib/market/trending.svelte";
import SpotTabs from "$lib/market/market-content/spot/spot-tabs.svelte";
import "../../styles/market.css"
import Spot from "$lib/market/market-content/spot/spot.market.svelte";
import { screen } from "$lib/store/screen"

</script>

<div class="app-markets">
    <main class="_9df3dcbf">
        <div class="_4b9aaf1e _1e5e2a71">
            <div class="c4f3185a">Markets</div>
            <section class="_254714c9">
                {#if $screen > 1150}
                    <NewListing />
                {/if}
                {#if $screen > 750}
                    <TopGainer />
                {/if}
                <Trending />
            </section>
        </div>
        <div id="markets-content" class="_09ad3d84">
            <div class="d7b95752">
                <div class="d6b393ac">
                    <section class="b0c94aab _1e5e2a71">
                        <div class="c7e3414c">
                            <div class="_1891a9f4">
                                <!-- <span class="">
                                    <svg aria-hidden="true" class="svgicon" style="width: 16px; height: 16px; min-width: 16px;">
                                        <use xlink:href="#star"></use>
                                    </svg>
                                    Favorites
                                </span> -->
                                <span class="b2b60cf7">
                                    <!---->
                                    Spot
                                </span>
                                <span class="">
                                    <!---->
                                    Futures
                                </span>
                            </div>
                            {#if $screen > 500}
                            <div class="polo-input left polo-input-small polo-input-default _21d80562">
                                <span class="c8c021df">
                                    <svg aria-hidden="true" class="svgicon" style="width: 16px; height: 16px; min-width: 16px;">
                                        <use xlink:href="#search"></use>
                                    </svg>
                                </span>
                                <input type="text" placeholder="Search Markets">
                                <span class="_77d9a813" style="display: none;">
                                    <svg aria-hidden="true" class="svgicon" style="width: 16px; height: 16px; min-width: 16px;">
                                        <use xlink:href="#clear"></use>
                                    </svg>
                                </span>
                            </div>
                            {/if}
                        </div>
                        <SpotTabs />
                    </section>  
                </div>
                <Spot />
            </div>
        </div>
    </main>
</div>

<style>

</style>
