<script>
	import { createEventDispatcher, onMount } from 'svelte';
	import axios from 'axios';
	import {ServerURl} from '$lib/backendUrl';
	import '../../../styles/trade/blockchain.css';
	import {currentSelectedPair} from '$lib/store/marketdata'


	const onClose = createEventDispatcher();

	let chainInfo = {};

 	async function loadChainDetails(chain) {
		if (!chain) return;
		try{
			chainInfo = (await axios.get(`${ServerURl()}/api/market/chain-details?chain=${chain}`)).data;
		} catch(err) {
			onClose('close')
		}
	}
	onMount(() => {
		loadChainDetails($currentSelectedPair?.blockchain?.symbol)
	})

	const handleClose = () => {
		onClose('close');
	};
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore missing-declaration -->
<!-- svelte-ignore missing-declaration -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div id="modals-container" on:click={handleClose}>
	<div class="vm--container">
		<div data-modal="dynamic_modal_3" aria-expanded="true" class="vm--overlay">
			<div class="vm--top-right-slot"></div>
		</div>
		<!-- svelte-ignore a11y-role-supports-aria-props -->
		<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
		<div
			on:click={(ev) => ev.stopPropagation()}
			aria-expanded="true"
			role="dialog"
			aria-modal="true"
			class="vm--modal"
			style="left: 50%; transform: translateX(-50%); max-width: 580px; width: 100%; height: auto; max-height: 90%; top: 0;"
		>
			<section class="a01ed56b">
				<div class="_87d3cd45">
					<i class="_9b33bef0" style="width: 36px; height: 36px; min-width: 36px; min-height: 36px;"
						><img
							loading="lazy"
							alt="Chain Icon"
							src="{$currentSelectedPair?.baseIcon}"
							class="_6197556c"
						/></i
					>
					<span class="_09189ecd">{$currentSelectedPair?.baseCurrencyName}</span><span class="ecfcd264">{$currentSelectedPair?.baseCurrencyDisplayName}</span><span
						class="f282247a" on:click={handleClose}
						><svg
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
							><path d="M7 7L18 18" stroke="black" stroke-width="2"></path><path
								d="M7 18L18 7"
								stroke="black"
								stroke-width="2"
							></path></svg
						></span
					>
				</div>
				<div class="e928f6a5">
					<div class="be394b11">
						{chainInfo.introduction || ""}
					</div>
					<div class="_93cec427">
						<div class="_3f441f4a">
							<span class="_7af9f7aa"><span>Issue Time</span><span>{chainInfo.publishTime || "--"}</span></span><span
								class="_7af9f7aa"><span>Max Supply</span><span>{chainInfo.publishVolume?.toLocaleString() || "--"}</span></span
							><span class="_7af9f7aa"><span>Total Supply</span><span>{chainInfo.circulateVolume?.toLocaleString() || "--"}</span></span><span
								class="_7af9f7aa"><span>Market Cap Rank</span><span>#{chainInfo.marketCapRank || '--'}</span></span
							><span class="_7af9f7aa"><span>Market Cap</span><span>${chainInfo.totalMarketCapitalization?.toLocaleString() || '--'}</span></span
							><span class="_7af9f7aa" style="display: none;"
								><span>Market Cap Dominance</span><span>--</span></span
							><span class="_7af9f7aa" style="display: none;"
								><span>Volume / Market Cap</span><span></span></span
							>
							{#if chainInfo.whitePaper}
								<span class="_7af9f7aa"
								><span>White Paper</span><span><a target="_blank" href="{chainInfo.whitePaper}">{chainInfo.whitePaper || '--'}</a></span></span
							>
							{/if}
							<span class="_7af9f7aa"
								><span>Official Website</span><span
									><a target="_blank" href="{chainInfo.officialWebsite}">{chainInfo.officialWebsite || '--'}</a></span
								></span
							><span class="_7af9f7aa"
								><span>Block Explorer</span><span
									><a target="_blank" href="{chainInfo.blockQuery}"
										>{chainInfo.blockQuery || '--'}</a
									></span
								></span
							>
						</div>
					</div>
					<div class="_0bf07493">
						{#if chainInfo.twitter}
						<a target="_blank" href="{chainInfo.twitter}"
							><svg
								aria-hidden="true"
								class="svgicon"
								style="width: 24px; height: 24px; min-width: 24px;"
								><use xlink:href="#twitter"></use></svg
							></a
						>
						{/if}
						{#if chainInfo.telegram}
							<a target="_blank" href="{chainInfo.telegram}"
							><svg
								aria-hidden="true"
								class="svgicon"
								style="width: 24px; height: 24px; min-width: 24px;"
								><use xlink:href="#telegram"></use></svg
							></a
						>
						{/if}
						{#if chainInfo.facebook}
							<a target="_blank" href="{chainInfo.facebook}"
							><svg
								aria-hidden="true"
								class="svgicon"
								style="width: 24px; height: 24px; min-width: 24px;"
								><use xlink:href="#facebook"></use></svg
							></a
						>
						{/if}
						{#if chainInfo.github}
							<a target="_blank" href="{chainInfo.github}"
							><svg
								aria-hidden="true"
								class="svgicon"
								style="width: 24px; height: 24px; min-width: 24px;"
								><use xlink:href="#github"></use></svg
							></a
						>
						{/if}
						{#if chainInfo.discord}
							<a target="_blank" href="{chainInfo.discord}"
							><svg
								aria-hidden="true"
								class="svgicon"
								style="width: 24px; height: 24px; min-width: 24px;"
								><use xlink:href="#discord"></use></svg
							></a
						>
						{/if}
						
					</div>
				</div>
			</section>
		</div>
	</div>
</div>
