<script>
	import { _ } from 'svelte-i18n';
	import { slideFade } from '$lib/transitions';
</script>
<div class="a773e3aa" transition:slideFade={{ duration: 200 }}>
	<ul>
		<li>
			<a class="d3f3d2f7" target="_self" href="/cards/buy">
				<div class="d667695c">
					<!---->
					<svg fill="currentColor">
						<use xlink:href="#uniframe-icon-buy-crypto"></use>
					</svg>
				</div>
				<div class="d4ef16dd">
					<span>{$_('g-buy-crypto')}</span>
					<!----><!---->
				</div>
				<div class="ddfb18d1">{$_('moonpay')}</div>
			</a>
		</li>
		<li>
			<a class="d3f3d2f7" target="_self" href="/p2p/markets?tab=buy&cur=btc&local=usd">
				<div class="d667695c">
					<!---->
					<svg fill="currentColor">
						<use xlink:href="#uniframe-icon-c2c"></use>
					</svg>
				</div>
				<div class="d4ef16dd">
					<span>{$_('c2c-crypto')}</span>
					<!----><!---->
				</div>
				<div class="ddfb18d1">{$_('match-best-price')}</div>
			</a>
		</li>
	</ul>
</div>
<style>
</style>