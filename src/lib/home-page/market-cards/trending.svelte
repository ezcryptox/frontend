<script>
import { screen } from "$lib/store/screen"
export let response;
$: console.log(response)

</script>

<div>
    {#each response as resp}
        {#if resp.symbol === "btc" ||( resp.symbol === "eth" && $screen > 470) || (resp.symbol === "trx" && $screen > 600) || (resp.symbol === "usdc" && $screen > 900) || (resp.symbol === "doge" && $screen > 1200) || (resp.symbol === "xrp" && $screen > 1400) }
        <a href="/trade/{resp.symbol}_USDT}" class="_4de9c7d5">
            <div class="_951bea5f ttu">
                <i class="_787e34f8 " style="background-image: url(&quot;{resp.image}&quot;);">
                </i> {resp.symbol}/USDT
            </div>
            <div class="ee28dea8">${resp.current_price}</div>
            <div class="_7a491e6a _45d3d61f"> {resp.price_change_percentage_24h > 0 ? "+" : ""}{resp.price_change_percentage_24h}% </div>
            <div id="homeMarket_topAmounts_BTC_USDT" class="_9ec9b057">
                <div class="tv-lightweight-charts" style="overflow: hidden; width: 88px; height: 62px; user-select: none; -webkit-tap-highlight-color: transparent;">
                    <table cellspacing="0" style="height: 62px; width: 88px;"><tr>
                        <td style="padding: 0px;"></td>
                        <td style="padding: 0px; position: relative; width: 88px; height: 62px;">
                            <div style="width: 100%; height: 100%; position: relative; overflow: hidden;">
                                <canvas width="118" height="83" style="width: 88px; height: 62px; position: absolute; z-index: 1; left: 0px; top: 0px;"></canvas>
                                <canvas width="118" height="83" style="width: 88px; height: 62px; position: absolute; z-index: 2; left: 0px; top: 0px;"></canvas>
                            </div>
                        </td>
                        <td style="padding: 0px;"></td>
                    </tr>
                    <tr style="display: none;">
                        <td style="padding: 0px;"></td>
                        <td style="height: 25px; padding: 0px;">
                            <div style="width: 100%; height: 100%; position: relative; overflow: hidden;">
                                <canvas width="21" height="21" style="width: 16px; height: 16px; position: absolute; z-index: 1; left: 0px; top: 0px;"></canvas>
                                <canvas width="21" height="21" style="width: 16px; height: 16px; position: absolute; z-index: 2; left: 0px; top: 0px;"></canvas>
                            </div>
                        </td>
                        <td style="padding: 0px;"></td>
                    </tr>
                    </table>
                </div>
            </div>
        </a>
        {/if}
    {/each}
</div>

<style>
   
</style>