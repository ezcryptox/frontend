<script>
    import { blogList } from "./blog";
	import { onMount } from "svelte";

    let blogs = [];
    let pinned;
    let loading = false;
    function loadingArticles() {
        loading = true;
        blogList().then((res) => {
            // @ts-ignore
            blogs = res.blogs;
            // @ts-ignore
            pinned = res.pinned;
        }).finally(() => loading = false)
    }
    onMount(() => {
        loadingArticles();
    })
</script>
<div class="IsyAl">
    {#if pinned}
    <a href="/blog/{pinned.id}" class="AfiAJ"
        ><div class="e9ZrX">
            <div
                style="display: block; overflow: hidden; position: relative;"
            >
                <img
                    src="{pinned.coverImage}"
                    role="presentation"
                    style="display: block; width: 100%;"
                />
            </div>
        </div>
        <div class="_0iKou">
            <div class="slHi6">
                <p class="Ckbd2">{pinned.title}</p>

                <p class="_8T1X9">
                    {pinned.excerpt}
                </p>
                <p class="O9Ins">
                    <span>{new Date(pinned.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span><span
                        ><svg
                            fill="currentColor"
                            style="width: 10px; height: 10px;"
                            ><use xlink:href="#web-core-icon-clock"
                            ></use></svg
                        > {pinned.minutesToRead} Minutes</span
                    >
                </p>
            </div>
        </div></a
    >
        
    {/if}
    <div class="el-scrollbar">
        <div
            class="el-scrollbar__wrap"
        >
            <div class="el-scrollbar__view" style="">
                <div class="Qw7FG">
                    <a href="/blog/search/DAW" class=""
                        ><span class="APYda">DAW</span></a
                    ><a href="/blog/search/MMT" class=""
                        ><span class="APYda">MMT</span></a
                    ><a href="/blog/search/Coreum" class=""
                        ><span class="APYda">Coreum</span></a
                    ><a href="/blog/search/Proof-of-Stake" class=""
                        ><span class="APYda">Proof-of-Stake</span
                        ></a
                    ><a href="/blog/search/EGB" class=""
                        ><span class="APYda">EGB</span></a
                    ><a href="/blog/search/Bad Idea AI" class=""
                        ><span class="APYda">Bad Idea AI</span></a
                    ><a href="/blog/search/Dominance" class=""
                        ><span class="APYda">Dominance</span></a
                    ><a
                        href="/blog/search/Ezcryptox Newsletter"
                        class=""
                        ><span class="APYda"
                            >Ezcryptox Newsletter</span
                        ></a
                    ><a href="/blog/search/The Morning Cup" class=""
                        ><span class="APYda">The Morning Cup</span
                        ></a
                    ><a href="/blog/search/Web3" class=""
                        ><span class="APYda">Web3</span></a
                    ><a href="/blog/search/Staking" class=""
                        ><span class="APYda">Staking</span></a
                    ><a href="/blog/search/Ethereum" class=""
                        ><span class="APYda">Ethereum</span></a
                    ><a href="/blog/search/Shanghai" class=""
                        ><span class="APYda">Shanghai</span></a
                    ><a href="/blog/search/Ramses" class=""
                        ><span class="APYda">Ramses</span></a
                    ><a href="/blog/search/DEX" class=""
                        ><span class="APYda">DEX</span></a
                    ><a href="/blog/search/AMM" class=""
                        ><span class="APYda">AMM</span></a
                    ><a href="/blog/search/Capella" class=""
                        ><span class="APYda">Capella</span></a
                    ><a href="/blog/search/Balancer" class=""
                        ><span class="APYda">Balancer</span></a
                    ><a href="/blog/search/Curve" class=""
                        ><span class="APYda">Curve</span></a
                    ><a href="/blog/search/Sushiswap" class=""
                        ><span class="APYda">Sushiswap</span></a
                    ><a href="/blog/search/Lord of Dragons" class=""
                        ><span class="APYda">Lord of Dragons</span
                        ></a
                    ><a href="/blog/search/AMA" class=""
                        ><span class="APYda">AMA</span></a
                    ><a href="/blog/search/LOGT" class=""
                        ><span class="APYda">LOGT</span></a
                    ><a href="/blog/search/KONPAY" class=""
                        ><span class="APYda">KONPAY</span></a
                    ><a href="/blog/search/Uniswap" class=""
                        ><span class="APYda">Uniswap</span></a
                    ><a href="/blog/search/Polygon" class=""
                        ><span class="APYda">Polygon</span></a
                    ><a href="/blog/search/Layer 2" class=""
                        ><span class="APYda">Layer 2</span></a
                    ><a href="/blog/search/Core" class=""
                        ><span class="APYda">Core</span></a
                    ><a href="/blog/search/DAO" class=""
                        ><span class="APYda">DAO</span></a
                    ><a href="/blog/search/Defi" class=""
                        ><span class="APYda">Defi</span></a
                    ><a href="/blog/search/Blockchain" class=""
                        ><span class="APYda">Blockchain</span></a
                    ><a href="/blog/search/Anniversary" class=""
                        ><span class="APYda">Anniversary</span></a
                    ><a href="/blog/search/NFT" class=""
                        ><span class="APYda">NFT</span></a
                    ><a href="/blog/search/Trading" class=""
                        ><span class="APYda">Trading</span></a
                    ><a href="/blog/search/Year in review" class=""
                        ><span class="APYda">Year in review</span
                        ></a
                    ><a href="/blog/search/CEX" class=""
                        ><span class="APYda">CEX</span></a
                    ><a href="/blog/search/cross margin" class=""
                        ><span class="APYda">cross margin</span></a
                    ><a href="/blog/search/Crypto 101" class=""
                        ><span class="APYda">Crypto 101</span></a
                    ><a href="/blog/search/Ezcryptox" class=""
                        ><span class="APYda">Ezcryptox</span></a
                    ><a
                        href="/blog/search/Futures Championships"
                        class=""
                        ><span class="APYda"
                            >Futures Championships</span
                        ></a
                    ><a href="/blog/search/Market News" class=""
                        ><span class="APYda">Market News</span></a
                    ><a href="/blog/search/Polopedia" class=""
                        ><span class="APYda">Polopedia</span></a
                    ><a href="/blog/search/Hot topics" class=""
                        ><span class="APYda">Hot topics</span></a
                    ><a
                        href="/blog/search/The Open Network"
                        class=""
                        ><span class="APYda">The Open Network</span
                        ></a
                    ><a href="/blog/search/Fan Tokens" class=""
                        ><span class="APYda">Fan Tokens</span></a
                    ><a href="/blog/search/World Cup 2022" class=""
                        ><span class="APYda">World Cup 2022</span
                        ></a
                    ><a href="/blog/search/Futures" class=""
                        ><span class="APYda">Futures</span></a
                    ><a href="/blog/search/News" class=""
                        ><span class="APYda">News</span></a
                    ><a href="/blog/search/Aptos" class=""
                        ><span class="APYda">Aptos</span></a
                    ><a href="/blog/search/Layer 1" class=""
                        ><span class="APYda">Layer 1</span></a
                    ><a href="/blog/search/GMX" class=""
                        ><span class="APYda">GMX</span></a
                    ><a href="/blog/search/Tether" class=""
                        ><span class="APYda">Tether</span></a
                    ><a href="/blog/search/USDT" class=""
                        ><span class="APYda">USDT</span></a
                    ><a href="/blog/search/Crypto" class=""
                        ><span class="APYda">Crypto</span></a
                    ><a href="/blog/search/Learning" class=""
                        ><span class="APYda">Learning</span></a
                    ><a href="/blog/search/Bear Market" class=""
                        ><span class="APYda">Bear Market</span></a
                    ><a href="/blog/search/Metaverse" class=""
                        ><span class="APYda">Metaverse</span></a
                    ><a href="/blog/search/Layer 0" class=""
                        ><span class="APYda">Layer 0</span></a
                    >
                </div>
            </div>
        </div>
        <div
            class="el-scrollbar__bar is-horizontal"
            style="display: none;"
        >
            <div
                class="el-scrollbar__thumb"
                style="width: 212.642px; transform: translateX(0%);"
            ></div>
        </div>
        <div
            class="el-scrollbar__bar is-vertical"
            style="display: none;"
        >
            <div
                class="el-scrollbar__thumb"
                style="transform: translateY(0%);"
            ></div>
        </div>
    </div>
    <div class="H2m1z">
        
        {#each blogs as blog}
            <div>
            <a href="/blog/{blog.id}" class="-Aq2e"
                ><div
                    style="display: block; overflow: hidden; position: relative;"
                >
                    <img
                        src="{blog.coverImage}"
                        role="presentation"
                        style="display: block; width: 100%;"
                    />
                </div>
                <div class="yKTHV">
                    <div class="_2B4w0">
                        <div class="eb0Ve">
                            {#each blog.tags as tag }
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
                        <span>{new Date(blog.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span><span
                            ><svg
                                fill="currentColor"
                                style="width: 10px; height: 10px;"
                                ><use
                                    xlink:href="#web-core-icon-clock"
                                ></use></svg
                            > {blog.minutesToRead} Minutes</span
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
                ><span>Load More</span></button
            >
        </div> -->
    </div>
</div>