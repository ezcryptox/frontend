<script>
	import { _ } from 'svelte-i18n';
	import Footer from '$lib/footer.svelte';
	import { page } from '$app/stores';
    import { browser } from '$app/environment';
	import '../../styles/blog/blog.css';
		import pkg from 'lodash';
	import { searchQuery } from './store';
	import { goto } from '$app/navigation';
	const { debounce } = pkg;
	if (browser) {
				document.documentElement.setAttribute('data-entry', 'blog');
	}

	async function handleInputChange(ev) {
		const value = ev.target.value?.trim()
		searchQuery.set(value)
		if (value) goto(`/blog/search/${encodeURIComponent(value)}`)
	}
	const debouncedHandleInputChange = debounce(handleInputChange, 300); // 300ms debounce
</script>
<div id="root" data-v-app="">
	<div class="">
		<main class="oLTck">
			<div class="PlcZk">
				{#if $page.url.pathname === '/blog'}
					<span class="H49R4">{$_('footer-blog')}</span>
				{:else}
					<span class="Rd6zT"
						><a href="/blog" class="router-link-active"
							><svg fill="currentColor" style="width: 10px; height: 16px;"
								><use xlink:href="#web-core-icon-back"></use></svg
							>{$_('home')}</a
						></span
					>
				{/if}
				<span class="VmPBX"
					><div class="el-input el-input--large el-input--prefix">
						<!-- input --><!-- prepend slot --><!--v-if-->
						<div class="el-input__wrapper" tabindex="-1">
							<!-- prefix slot --><span class="el-input__prefix"
								><span class="el-input__prefix-inner"
									><svg fill="currentColor" style="width: 18px; height: 18px;"
										><use xlink:href="#web-core-icon-search"></use></svg
									><!--v-if--></span
								></span
							><input
							on:input={debouncedHandleInputChange}
								class="el-input__inner"
								type="text"
								autocomplete="off"
								tabindex="0"
								placeholder="Search"
								id="el-id-4008-0"
							/><!-- suffix slot --><!--v-if-->
						</div>
						<!-- append slot --><!--v-if-->
					</div></span
				>
			</div>
			<slot></slot>
		</main>
	</div>
	<!---->
</div>
<Footer />
