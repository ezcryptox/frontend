<script>
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { articleDetail, likeArticle } from '$lib/news-components/article';
	import { handleAuthToken } from '$lib/store/routes';

	// Get the article ID from the URL
	const articleId = $page.params.id;

	let article;
	let loading = false;
    let updatingLike = false;
	onMount(() => {
		loading = true;
		articleDetail(articleId)
			.then((detail) => {
				article = detail;
			})
			.finally(() => (loading = false));
	});
    function handleLike() {
        updatingLike = true;
        likeArticle(articleId, $handleAuthToken).finally(() => updatingLike = false)
    }
    function handleReport() {}

</script>

<div id="root" data-v-app="">
	<div class="Il1dc">
		<div class="el-breadcrumb hX2oX" aria-label="Breadcrumb" role="navigation">
			<span class="el-breadcrumb__item"
				><a class="el-breadcrumb__inner is-link" href="/feed/news/1">News</a><i
					class="el-icon el-breadcrumb__separator"
					><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"
						><path
							fill="currentColor"
							d="M340.864 149.312a30.592 30.592 0 0 0 0 42.752L652.736 512 340.864 831.872a30.592 30.592 0 0 0 0 42.752 29.12 29.12 0 0 0 41.728 0L714.24 534.336a32 32 0 0 0 0-44.672L382.592 149.376a29.12 29.12 0 0 0-41.728 0z"
						></path></svg
					></i
				></span
			><span class="el-breadcrumb__item" aria-current="page"
				><span class="el-breadcrumb__inner" role="link">Details</span><i
					class="el-icon el-breadcrumb__separator"
					><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"
						><path
							fill="currentColor"
							d="M340.864 149.312a30.592 30.592 0 0 0 0 42.752L652.736 512 340.864 831.872a30.592 30.592 0 0 0 0 42.752 29.12 29.12 0 0 0 41.728 0L714.24 534.336a32 32 0 0 0 0-44.672L382.592 149.376a29.12 29.12 0 0 0-41.728 0z"
						></path></svg
					></i
				></span
			>
		</div>

		{#if article}
			<div class="KB2qO">{article.title}</div>
			<div class="FUMUQ">
				<div class="AYxYd">{article.source}</div>
				<div class="Kx84b">{new Date(article.createdAt).toLocaleTimeString('en-US', { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })}</div>
			</div>
			<div class="_9Irdw">
				{article.content}
			</div>
			<!---->
			<div class="_8X-mM QCvdY">
				<div on:click={handleLike} class="KEyiL">
					<svg fill="currentColor" class="" style="width: 20px; height: 20px;"
						><use xlink:href="#web-core-icon-like"></use></svg
					><span class="ecv38"><span>{article.praiseNumber || 0}</span></span>
				</div>
				<div on:click={handleReport} class="KEyiL">
					<svg fill="currentColor" class="" style="width: 20px; height: 20px;"
						><use xlink:href="#web-core-icon-outline-warning"></use></svg
					><span class="ecv38">Report</span>
				</div>
			</div>
		{/if}
		<div class="kOJzA pwiIS">
			Disclaimer: The above content does not represent any position of Ezcryptox, and does not serve
			as suggestions for any trading-related decisions.
		</div>
	</div>
	<!---->
</div>
