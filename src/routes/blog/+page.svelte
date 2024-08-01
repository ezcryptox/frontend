<script>
	import { _ } from 'svelte-i18n';
	import Empty from '$lib/components/empty';
	import { blogList } from './blog';
	import { onMount } from 'svelte';

	let blogs = [];
	let pinned;
	let loading = false;
	function loadingArticles() {
		loading = true;
		blogList()
			.then((res) => {
				// @ts-ignore
				blogs = res.blogs;
				// @ts-ignore
				pinned = res.pinned;
			})
			.finally(() => (loading = false));
	}
	onMount(() => {
		loadingArticles();
	});
</script>
<div class="IsyAl">
	{#if pinned}
		<a href="/blog/{pinned.id}" class="AfiAJ"
			><div class="e9ZrX">
				<div style="display: block; overflow: hidden; position: relative;">
					<img src={pinned.coverImage} role="presentation" style="display: block; width: 100%;" />
				</div>
			</div>
			<div class="_0iKou">
				<div class="slHi6">
					<p class="Ckbd2">{pinned.title}</p>

					<p class="_8T1X9">
						{pinned.excerpt}
					</p>
					<p class="O9Ins">
						<span
							>{new Date(pinned.date).toLocaleDateString('en-US', {
								year: 'numeric',
								month: 'long',
								day: 'numeric'
							})}</span
						><span
							><svg fill="currentColor" style="width: 10px; height: 10px;"
								><use xlink:href="#web-core-icon-clock"></use></svg
							>
							{pinned.minutesToRead} Minutes</span
						>
					</p>
				</div>
			</div></a
		>
	{/if}
	<div class="el-scrollbar">
		<div class="el-scrollbar__wrap">
			<div class="el-scrollbar__view" style="">
				<div class="Qw7FG">
					<a href="/blog/search/DAW" class=""><span class="APYda">{$_('daw')}</span></a><a
						href="/blog/search/MMT"
						class=""><span class="APYda">{$_('mmt')}</span></a
					><a href="/blog/search/Coreum" class=""><span class="APYda">{$_('coreum')}</span></a><a
						href="/blog/search/Proof-of-Stake"
						class=""><span class="APYda">{$_('proof-of-stake')}</span></a
					><a href="/blog/search/EGB" class=""><span class="APYda">EGB</span></a><a
						href="/blog/search/Bad Idea AI"
						class=""><span class="APYda">{$_('bad-idea-ai')}</span></a
					><a href="/blog/search/Dominance" class=""><span class="APYda">{$_('dominance')}</span></a><a
						href="/blog/search/Ezcryptox Newsletter"
						class=""><span class="APYda">{$_('ezcryptox-newsletter')}</span></a
					><a href="/blog/search/The Morning Cup" class=""
						><span class="APYda">{$_('the-morning-cup')}</span></a
					><a href="/blog/search/Web3" class=""><span class="APYda">{$_('web3')}</span></a><a
						href="/blog/search/Staking"
						class=""><span class="APYda">{$_('staking')}</span></a
					><a href="/blog/search/Ethereum" class=""><span class="APYda">{$_('ethereum')}</span></a><a
						href="/blog/search/Shanghai"
						class=""><span class="APYda">{$_('shanghai')}</span></a
					><a href="/blog/search/Ramses" class=""><span class="APYda">{$_('ramses')}</span></a><a
						href="/blog/search/DEX"
						class=""><span class="APYda">DEX</span></a
					><a href="/blog/search/AMM" class=""><span class="APYda">AMM</span></a><a
						href="/blog/search/Capella"
						class=""><span class="APYda">{$_('capella')}</span></a
					><a href="/blog/search/Balancer" class=""><span class="APYda">{$_('balancer')}</span></a><a
						href="/blog/search/Curve"
						class=""><span class="APYda">{$_('curve')}</span></a
					><a href="/blog/search/Sushiswap" class=""><span class="APYda">{$_('sushiswap')}</span></a><a
						href="/blog/search/Lord of Dragons"
						class=""><span class="APYda">{$_('lord-of-dragons')}</span></a
					><a href="/blog/search/AMA" class=""><span class="APYda">AMA</span></a><a
						href="/blog/search/LOGT"
						class=""><span class="APYda">LOGT</span></a
					><a href="/blog/search/KONPAY" class=""><span class="APYda">KONPAY</span></a><a
						href="/blog/search/Uniswap"
						class=""><span class="APYda">{$_('uniswap')}</span></a
					><a href="/blog/search/Polygon" class=""><span class="APYda">{$_('polygon')}</span></a><a
						href="/blog/search/Layer 2"
						class=""><span class="APYda">{$_('layer-2')}</span></a
					><a href="/blog/search/Core" class=""><span class="APYda">{$_('core')}</span></a><a
						href="/blog/search/DAO"
						class=""><span class="APYda">DAO</span></a
					><a href="/blog/search/Defi" class=""><span class="APYda">Defi</span></a><a
						href="/blog/search/Blockchain"
						class=""><span class="APYda">{$_('blockchain')}</span></a
					><a href="/blog/search/Anniversary" class=""><span class="APYda">{$_('anniversary')}</span></a><a
						href="/blog/search/NFT"
						class=""><span class="APYda">{$_('nft')}</span></a
					><a href="/blog/search/Trading" class=""><span class="APYda">{$_('trading')}</span></a><a
						href="/blog/search/Year in review"
						class=""><span class="APYda">{$_('year-in-review')}</span></a
					><a href="/blog/search/CEX" class=""><span class="APYda">CEX</span></a><a
						href="/blog/search/cross margin"
						class=""><span class="APYda">{$_('cross-margin')}</span></a
					><a href="/blog/search/Crypto 101" class=""><span class="APYda">{$_('crypto-101')}</span></a><a
						href="/blog/search/Ezcryptox"
						class=""><span class="APYda">Ezcryptox</span></a
					><a href="/blog/search/Futures Championships" class=""
						><span class="APYda">{$_('futures-championships')}</span></a
					><a href="/blog/search/Market News" class=""><span class="APYda">{$_('market-news')}</span></a><a
						href="/blog/search/Polopedia"
						class=""><span class="APYda">{$_('polopedia')}</span></a
					><a href="/blog/search/Hot topics" class=""><span class="APYda">{$_('hot-topics')}</span></a><a
						href="/blog/search/The Open Network"
						class=""><span class="APYda">{$_('the-open-network')}</span></a
					><a href="/blog/search/Fan Tokens" class=""><span class="APYda">{$_('fan-tokens')}</span></a><a
						href="/blog/search/World Cup 2022"
						class=""><span class="APYda">{$_('world-cup-2022')}</span></a
					><a href="/blog/search/Futures" class=""><span class="APYda">{$_('g-futures')}</span></a><a
						href="/blog/search/News"
						class=""><span class="APYda">{$_('g-feed')}</span></a
					><a href="/blog/search/Aptos" class=""><span class="APYda">Aptos</span></a><a
						href="/blog/search/Layer 1"
						class=""><span class="APYda">{$_('layer-1')}</span></a
					><a href="/blog/search/GMX" class=""><span class="APYda">{$_('gmx')}</span></a><a
						href="/blog/search/Tether"
						class=""><span class="APYda">{$_('tether')}</span></a
					><a href="/blog/search/USDT" class=""><span class="APYda">USDT</span></a><a
						href="/blog/search/Crypto"
						class=""><span class="APYda">{$_('global-currency2')}</span></a
					><a href="/blog/search/Learning" class=""><span class="APYda">{$_('learning')}</span></a><a
						href="/blog/search/Bear Market"
						class=""><span class="APYda">{$_('bear-market')}</span></a
					><a href="/blog/search/Metaverse" class=""><span class="APYda">{$_('metaverse')}</span></a><a
						href="/blog/search/Layer 0"
						class=""><span class="APYda">{$_('layer-0')}</span></a
					>
				</div>
			</div>
		</div>
		<div class="el-scrollbar__bar is-horizontal" style="display: none;">
			<div class="el-scrollbar__thumb" style="width: 212.642px; transform: translateX(0%);"></div>
		</div>
		<div class="el-scrollbar__bar is-vertical" style="display: none;">
			<div class="el-scrollbar__thumb" style="transform: translateY(0%);"></div>
		</div>
	</div>
	<div class="H2m1z">
		{#each blogs as blog}
			<div>
				<a href="/blog/{blog.id}" class="-Aq2e"
					><div style="display: block; overflow: hidden; position: relative;">
						<img src={blog.coverImage} role="presentation" style="display: block; width: 100%;" />
					</div>
					<div class="yKTHV">
						<div class="_2B4w0">
							<div class="eb0Ve">
								{#each blog.tags as tag}
									<span class="_8skYO">{tag.name}</span>
								{/each}
							</div>
							<h3 class="Mq0jn SK4vZ">
								{blog.title}
							</h3>
							<p class="XRUB6 SK4vZ">
								{blog.excerpt}
							</p>
						</div>
						<div class="h-hYG">
							<span
								>{new Date(blog.date).toLocaleDateString('en-US', {
									year: 'numeric',
									month: 'long',
									day: 'numeric'
								})}</span
							><span
								><svg fill="currentColor" style="width: 10px; height: 10px;"
									><use xlink:href="#web-core-icon-clock"></use></svg
								>
								{blog.minutesToRead} Minutes</span
							>
						</div>
					</div></a
				>
			</div>
		{/each}
		<!-- <div class="MrpWS">
            <button
                data-size="medium"
                type="button"
                class="jRLsY wzmE4"
                ><span>{$_('load-more')}</span></button
            >
        </div> -->
	</div>
	{#if !loading && !blogs?.length}
		<Empty />
	{/if}
</div>
