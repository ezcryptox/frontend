<script>
	import { _ } from 'svelte-i18n';
	import { slideFade } from "$lib/transitions";

  
</script>
<div class="a773e3aa" transition:slideFade={{ duration: 200 }}>
    <ul>
        <li>
            <a class="d3f3d2f7" target="_self" href="/trade?type=spot">
                <div class="d667695c">
                    <!---->
                    <svg fill="currentColor">
                        <use xlink:href="#uniframe-icon-spot-trade"></use>
                    </svg>
                </div>
                <div class="d4ef16dd">
                    <span>{$_('g-spot')}</span>
                    <!----><!---->
                </div>
                <div class="ddfb18d1">{$_('spot-trade-subtitle')}</div>
            </a>
        </li>
        <li>
            <a class="d3f3d2f7" target="_self" href="/trade?type=margin">
                <div class="d667695c">
                    <!---->
                    <svg fill="currentColor">
                        <use xlink:href="#uniframe-icon-margin-trade"></use>
                    </svg>
                </div>
                <div class="d4ef16dd">
                    <span>{$_('g-margin')}</span>
                    <!----><!---->
                </div>
                <div class="ddfb18d1">{$_('margin-subtitle')}</div>
            </a>
        </li>
        <!-- <li>
            <a class="d3f3d2f7" target="_self" href="/strategy/spot-grid/BTC_USDT">
                <div class="d667695c"><svg fill="currentColor">
                    <use xlink:href="#uniframe-icon-strategy-trading"></use>
                </svg>
                </div>
                <div class="d4ef16dd">
                    <span>{$_('g-strategy-trading')}</span></div>
                <div class="ddfb18d1">{$_('strategy-trading-subtitle')}</div>
            </a>
        </li> -->
    </ul>
</div>
<style>
   
</style>