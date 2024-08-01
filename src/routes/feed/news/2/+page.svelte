 
<script>
	import { _ } from 'svelte-i18n';
	import { articleList } from "$lib/news-components/article";
	import { onMount } from "svelte";

    let articles = [];
    let loading = false;
    function loadingArticles() {
        loading = true;
        articleList(0, "article").then((res) => {
            articles = res.flatMap(res => res.articles);
        }).finally(() => loading = false)
    }
    onMount(() => {
        loadingArticles();
    })
</script>
<div class="AVcW4">
    <!----><!---->

    {#each articles as article}
        <a
        class="EROv1"
        href="/feed/article/in-depth/{article.id}"
        target="_blank"
        ><div class="_7BB-I">
            <div class="-xL9T">
                {article.title}
            </div>
            <div class="TzbKO">
                <div class="KXmXk">{article.source}</div>
                <div class="isKlp">{article.date.toLocaleTimeString('en-US', { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })}</div>
            </div>
        </div>
        <div
            class="x-p5P _9Ur7o"
            style="--45db92c4: 100%; --0d8faabd: 100%; --d45f4f3c: 32px;"
        >
            <img
                src="{article.imageUrl}"
                alt="{article.title}"
                class="v-lazy-image v-lazy-image-loaded"
            />
        </div></a
    >
    {/each}
      {#if loading}
        <div class="Y-sDb GuKQe">
        <svg
            class="_7uvvw NBF2s"
            fill="currentColor"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            ><path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M9.99991 1.87012C5.50981 1.87012 1.86987 5.51006 1.86987 10.0002H4.11517C4.11517 6.75134 6.74885 4.11766 9.99767 4.11766C9.99841 4.11766 9.99916 4.11766 9.99991 4.11766V1.87012ZM9.99991 15.8827C13.2477 15.8815 15.8802 13.2482 15.8802 10.0002C15.8802 10.0002 15.8802 10.0002 15.8802 10.0002H18.1299C18.1299 14.4902 14.49 18.1302 9.99991 18.1302V15.8827Z"
            ></path></svg
        >
        <div class="ZW-t5">{$_('loading')}</div>
    </div>
    {/if}
</div>
