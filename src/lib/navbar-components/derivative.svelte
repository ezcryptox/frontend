<script>
	import { _ } from 'svelte-i18n';
	import { slideFade } from "$lib/transitions";
</script>
<div class="a773e3aa" transition:slideFade={{ duration: 200 }}>
    <ul>
        <li>
            <a class="d3f3d2f7" target="_self" href="/futures/trade">
                <div class="d667695c"><svg fill="currentColor">
                    <use xlink:href="#uniframe-icon-futures-trade"></use>
                </svg>
                </div>
                <div class="d4ef16dd">
                    <span>{$_('g-futures-trade')}</span>
                </div>
                <div class="ddfb18d1">{$_('futures-trade-subtitle')}</div>
            </a>
        </li>
        <li>
            <a class="d3f3d2f7" target="_self" href="/strategy/futures-grid">
                <div class="d667695c">
                    <svg fill="currentColor">
                        <use xlink:href="#uniframe-icon-futures-grid"></use>
                    </svg>
                </div>
                <div class="d4ef16dd">
                    <span>{$_('g-grid-trade')}</span>
                </div>
                <div class="ddfb18d1">{$_('grid-trade-subtitle')}</div>
            </a>
        </li>
        <li>
            <a class="d3f3d2f7" target="_self" href="/strategy/copytrading">
                <div class="d667695c">
                    <svg fill="currentColor">
                        <use xlink:href="#uniframe-icon-copy-trading"></use>
                    </svg>
                </div>
                <div class="d4ef16dd">
                    <span>{$_('g-copy-trading')}</span>
                </div>
                <div class="ddfb18d1">{$_('copy-trading-subtitle')}</div>
            </a>
        </li>
    </ul>
</div>
<style>
   
</style>