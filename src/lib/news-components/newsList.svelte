
<script>
	import { onMount } from "svelte";
    import {articleList} from "$lib/news-components/article"
	import Empty from "$lib/components/empty";
    export let category;
    let articleGroup = [];
    let loading = false;
    function loadingArticles() {
        loading = true;
        articleList(category).then((res) => {
            articleGroup = res
        }).finally(() => loading = false)
    }
    onMount(() => {
        loadingArticles();
    })
</script>
<div class="AVcW4">
    <!---->
    {#each articleGroup as group}
        <div class="dW8lD">
        <div class="u1A0u">{group.date}</div>
         <div>
            {#each group.articles as article}
                <div class="GgOiQ">
                <div class="jPxxA">
                    <div class="JKwYC">{article.date.toLocaleTimeString()}</div>
                    <div class="rYvwl"></div>
                </div>
                <a
                    class="o6g3h"
                    href="/feed/article/flash/{article.id}"
                    target="_blank"
                    ><div class="_3mTRq">
                        {article.title}
                    </div>
                    <div class="LDFfP WbqBn">
                        {article.content}
                    </div>
                    <!----><!----></a
                >
                <div class="giRSg"></div>
                <!---->
            </div>
            {/each}
         </div>
    </div>
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
        <div class="ZW-t5">Loading</div>
    </div>
    {/if}
    {#if !loading && !articleGroup?.length}
         <Empty/>
    {/if}
</div>
 
