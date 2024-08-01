<script>
	import { _ } from 'svelte-i18n';
    import { page } from "$app/stores";
    import "../../../../styles/blog/search.css";
    const query = $page.params.query;
    import { blogList, searchBlog } from "../../blog";
	import { onMount } from "svelte";
	import { searchQuery } from "../../store";

    let blogs = [];
    let loading = false;
    function loadingArticles(q = query) {
        loading = true;
        searchBlog(q).then((res) => {
            // @ts-ignore
            blogs = res.blogs;
        }).finally(() => loading = false)
    }
    onMount(() => {
        loadingArticles();
    })
    searchQuery.subscribe(q => {
        loadingArticles(q)
    })
</script>
<div class="DSAsd IsyAl">
    <p class="sW0tO">{$_('search-results-for')}<span>{$searchQuery}</span></p>
    
     {#each blogs as blog}
        <a href="/blog/{blog.id}" class="fCCy-"
        ><div class="_6Z4ph">
            <div style="display: block; overflow: hidden; position: relative;">
                <img
                    src="{blog.coverImage}"
                    role="presentation"
                    style="display: block; width: 100%;"
                />
            </div>
        </div>
       
        <div class="iUgvV">
            <p class="ks3PO">{blog.title}</p>
            <p class="XBvrm">
            {blog.excerpt}
            </p>
            <p class="w1glc">
                <span>{new Date(blog.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span><span
                    ><svg fill="currentColor" style="width: 10px; height: 10px;"
                        ><use xlink:href="#web-core-icon-clock"></use></svg
                    > {blog.minutesToRead} min</span
                >
            </p>
        </div></a
    >
    {/each}
</div>
