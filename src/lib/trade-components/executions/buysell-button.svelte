<script>
	import { isLogin } from '$lib/store/profile';
	export let isBuying = true;
	export let assetLabel;
</script>

<div class="_89425504" data-v-39752d79="">
	{#if $isLogin}
		<button
			type="button"
			on:click
			class="polo-btn polo-btn-button {isBuying
				? 'polo-btn-positive'
				: 'polo-btn-negative'} polo-btn-small"
			style="width: 100%;"
			><!---->
			<div class="btn-sp">{isBuying ? 'Buy' : 'Sell'} {assetLabel}</div></button
		>

		<div class="fa51f9ae">
			<a target="_blank" href="/fee"><span class="_4df44c85"> Fee: 0.2%/0.2% </span></a>
		</div>
	{:else}
		<div class="e8cd35f1"><a href="/login">Log In</a> or <a href="/signup">Sign Up</a></div>
	{/if}
</div>
