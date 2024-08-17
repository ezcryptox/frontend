<script>
	import { _ } from 'svelte-i18n';
	import { getContext, onDestroy, onMount } from 'svelte';
	import AssetsMenu from './assets-menu.svelte';
	import { findPos } from './utils';
	import { cryptoQuotes, currentSelectedPair } from '$lib/store/marketdata';
	import { browser } from '$app/environment';
	import { abbreviateNumber } from '$lib/utils';

	let falling = false;
	$: showCryptoDialog = false;
	$: onboarding = true;
	let _onboardingFocusRef = null;

	const toggleBorrowModal = getContext('toggleBorrowModal');
	const startOnBoarding = getContext('toggleOnBoarding');
	const updateData = getContext('updateOnboardingData');
	export let onboardingData;
	let quotes;
	cryptoQuotes.subscribe((q) => {
		if (!q) return;
		quotes = {...($currentSelectedPair || {})};
		if (!Object.keys(quotes).length) return;
		if (quotes && quotes.price > parseFloat(q[quotes.symbol]?.price || 0)) {
			falling = true;
		} else {
			falling = false;
		}
		if (q[quotes.symbol]) {
			quotes = {
				...quotes,
				changePercent: parseFloat(q[quotes.symbol].changePercent) || 0,
				volumeFrom: parseFloat(q[quotes.symbol].volumeFrom) || 0,
				volumeTo: parseFloat(q[quotes.symbol].volumeTo) || 0,
				high: parseFloat(q[quotes.symbol].high) || 0,
				low: parseFloat(q[quotes.symbol].low) || 0,
				price: parseFloat(q[quotes.symbol].price) || 0
			};
		}
	});

	$: {
		if (_onboardingFocusRef) {
			if (
				onboardingData &&
				onboardingData.show &&
				onboardingData.step === 1 &&
				onboardingData.id !== 'pair'
			) {
				const coordinate = findPos(_onboardingFocusRef);
				updateData({
					...onboardingData,
					id: 'pair',
					title: 'Choose a trading pair',
					message: 'Choose a trading pair to view its latest price.',
					target: 40,
					top: coordinate[3] + 10,
					left: coordinate[1]
				});
			}
			onboarding = onboardingData.show && onboardingData.step === 1;
		}
	}
	const _clickHandler = () => {
			showCryptoDialog = false;
	}
	onMount(() => {
		if (browser) {
			document.body.addEventListener('click',_clickHandler)
		}
	})
	onDestroy(() => {
		document.body.removeEventListener('click', _clickHandler)
	})
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	class="_61aea1ce"
	on:click={(ev) => {
		showCryptoDialog = false;
		ev.stopPropagation();
	}}
>
	<section class="_49567930">
		<div
			user-guide="1"
			bind:this={_onboardingFocusRef}
			class="_90e8af53 {onboarding ? 'c806c316' : ''}"
			style={onboarding ? 'pointer-events: none; z-index: 1000002; position: relative;' : ''}
		>
			<div class="ef057bf0">
				<i
					class="_9b33bef0 _3b46d5a7"
					style="width: 18px; height: 18px; min-width: 18px; min-height: 18px;"
					><img
						loading="lazy"
						src={$currentSelectedPair?.baseIcon || ''}
						class="_6197556c"
						style=""
						alt=""
					/></i
				><i
					class="_9b33bef0 f0557c33"
					style="width: 18px; height: 18px; min-width: 18px; min-height: 18px;"
					><img
						loading="lazy"
						src={$currentSelectedPair?.quoteIcon}
						class="_6197556c"
						style=""
						alt=""
					/></i
				>
			</div>

			<div class="cb42a1b7">
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<!-- svelte-ignore a11y-no-static-element-interactions -->
				<div
					class="f7a95949 _5bd83198"
					on:click={(ev) => {
						showCryptoDialog = !showCryptoDialog;
						ev.stopPropagation();
					}}
				>
					<span>{$currentSelectedPair?.displayName || '--'}</span>
					{#if $currentSelectedPair?.crossMargin?.maxLeverage === 3}
						<div class="ab81295b">3X</div>
					{/if}

					<svg
						style="transform: rotate({showCryptoDialog ? 180 : 0}deg);"
						class="svgicon d4379d29"
						width="12px"
						height="12px"
						x="0"
						y="0"
						viewBox="0 0 32 32"
						><g
							><path
								d="M29.604 10.528 17.531 23.356a2.102 2.102 0 0 1-3.062 0L2.396 10.528c-.907-.964-.224-2.546 1.1-2.546h25.008c1.324 0 2.007 1.582 1.1 2.546z"
							></path></g
						></svg
					>
				</div>
				<div class="_88741fd9">
					<svg width="12" height="12" x="0" y="0" viewBox="0 0 512 512"
						><g
							><path
								d="M143.533 416.667H103.35a40.142 40.142 0 0 0-28.39 11.759 40.163 40.163 0 0 0-11.761 28.391v.016V55.167A40.189 40.189 0 0 1 74.96 26.765 40.184 40.184 0 0 1 103.367 15h40.167v401.667z"
								style="stroke-width:30;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;"
								fill="none"
								stroke="#a3a3a3"
								stroke-width="30"
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-miterlimit="10"
								class=""
								opacity="1"
							></path><path
								d="M448.8 497H103.35c-22.172 0-40.15-17.975-40.15-40.151v-.032c0-22.174 17.979-40.15 40.15-40.15h345.449V497z"
								style="stroke-width:30;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;"
								fill="none"
								stroke="#a3a3a3"
								stroke-width="30"
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-miterlimit="10"
								class=""
								opacity="1"
							></path><path
								d="M143.533 15.001H448.8v401.667H143.533zM223.867 175.667h144.6M239.933 256H352.4"
								style="stroke-width:30;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;"
								fill="none"
								stroke="#a3a3a3"
								stroke-width="30"
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-miterlimit="10"
								class=""
								opacity="1"
							></path></g
						></svg
					>

					<span class="cf00bf05">--</span>
				</div>
			</div>
			{#if showCryptoDialog}
				<!-- svelte-ignore a11y-no-static-element-interactions -->
				<div
					id="assetMenu"
					class="_64aeb761"
					style="height: calc(100vh - 155px); display: block"
				>
					<!-- svelte-ignore missing-declaration -->
					<AssetsMenu
						on:onAssetSelected={(e) => {
							showCryptoDialog = false;
						}}
					/>
				</div>
			{/if}
		</div>
		<div class="_07eaee34">
			<div class="_0c7c0f49">
				<dl class="_0166c194">
					<dt class="_395fff9e">
						{quotes?.price
							? parseFloat(quotes?.price?.toFixed(2) || '0').toLocaleString()
							: '--'}
					</dt>
					<dd>
						${quotes?.price
							? parseFloat(quotes?.price?.toFixed(2) || '0').toLocaleString()
							: '--'}
					</dd>
				</dl>
				<dl>
					<dt>{$_('24h-change')}</dt>
					<dd
						class={quotes && quotes?.changePercent < 0
							? '_395fff9e'
							: '_0ce4a56e'}
					>
						<span
							class={quotes && quotes?.changePercent < 0
								? '_395fff9e'
								: '_0ce4a56e'}
							>{quotes?.changePercent
								? quotes?.changePercent?.toFixed(2)
								: '--'}%</span
						>
					</dd>
				</dl>
				<dl>
					<dt>{$_('24h-high')}</dt>
					<dd>
						{quotes?.high
							? parseFloat(quotes?.high?.toFixed(2) || '0').toLocaleString()
							: '--'}
					</dd>
				</dl>
				<dl>
					<dt>{$_('24h-low')}</dt>
					<dd>
						{quotes?.low
							? parseFloat(quotes?.low?.toFixed(2) || '0').toLocaleString()
							: '--'}
					</dd>
				</dl>
				<dl>
					<dt>24h Volume({quotes?.baseCurrencyName || '--'})</dt>
					<dd>
						{quotes?.volumeFrom
							? abbreviateNumber(quotes?.volumeFrom)
							: '--'}
					</dd>
				</dl>
				<dl>
					<dt>24h Volume({quotes?.quoteCurrencyName || '--'})</dt>
					<dd>
						{quotes?.volumeTo
							? abbreviateNumber(quotes?.volumeTo)
							: '--'}
					</dd>
				</dl>
			</div>
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<div class="_3dcbe398">
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<div class="_9b1c1ac5 _127af464 e0093a3f" on:click={() => toggleBorrowModal()}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						version="1.1"
						xmlns:xlink="http://www.w3.org/1999/xlink"
						width="14"
						height="14"
						x="0"
						y="0"
						viewBox="0 0 682.667 682.667"
						style="enable-background:new 0 0 512 512"
						xml:space="preserve"
						class=""
						><g
							><defs
								><clipPath id="a" clipPathUnits="userSpaceOnUse"
									><path d="M0 512h512V0H0Z" fill="#616161" opacity="1" data-original="#000000"
									></path></clipPath
								></defs
							><g clip-path="url(#a)" transform="matrix(1.33333 0 0 -1.33333 0 682.667)"
								><path
									d="M0 0h124.663a60.001 60.001 0 0 1 42.427 17.573l48.224 48.225c23.442 23.441 61.448 23.441 84.888-.001a429552.757 429552.757 0 0 1-90.759-90.725C186.939-47.429 156.489-60 124.666-60H0l-60-60-90 90 72.426 72.426A60 60 0 0 0-35.147 60H120c16.568 0 30-13.432 30-30 0-16.569-13.334-30-29.902-30"
									style="stroke-width:30;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;stroke-dasharray:none;stroke-opacity:1"
									transform="translate(181 135.036)"
									fill="none"
									stroke="#616161"
									stroke-width="30"
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-miterlimit="10"
									stroke-dasharray="none"
									stroke-opacity=""
									data-original="#000000"
									class=""
									opacity="1"
								></path><path
									d="M0 0c0-33.137-26.863-60-60-60s-60 26.863-60 60 26.863 60 60 60S0 33.137 0 0Z"
									style="stroke-width:30;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;stroke-dasharray:none;stroke-opacity:1"
									transform="translate(331 316.036)"
									fill="none"
									stroke="#616161"
									stroke-width="30"
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-miterlimit="10"
									stroke-dasharray="none"
									stroke-opacity=""
									data-original="#000000"
									class=""
									opacity="1"
								></path><path
									d="M0 0c0-33.137-26.863-60-60-60s-60 26.863-60 60 26.863 60 60 60S0 33.137 0 0Z"
									style="stroke-width:30;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;stroke-dasharray:none;stroke-opacity:1"
									transform="translate(481 437.036)"
									fill="none"
									stroke="#616161"
									stroke-width="30"
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-miterlimit="10"
									stroke-dasharray="none"
									stroke-opacity=""
									data-original="#000000"
									class=""
									opacity="1"
								></path><path
									d="M0 0c0-8.284-6.716-15-15-15-8.284 0-15 6.716-15 15 0 8.284 6.716 15 15 15C-6.716 15 0 8.284 0 0"
									style="fill-opacity:1;fill-rule:nonzero;stroke:none"
									transform="translate(286 316.036)"
									fill="#616161"
									data-original="#000000"
									opacity="1"
								></path><path
									d="M0 0c0-8.284-6.716-15-15-15-8.284 0-15 6.716-15 15 0 8.284 6.716 15 15 15C-6.716 15 0 8.284 0 0"
									style="fill-opacity:1;fill-rule:nonzero;stroke:none"
									transform="translate(436 437.036)"
									fill="#616161"
									data-original="#000000"
									opacity="1"
								></path><path
									d="M0 0c0-24.853-20.147-45-45-45S-90-24.853-90 0s20.147 45 45 45S0 24.853 0 0Z"
									style="stroke-width:30;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;stroke-dasharray:none;stroke-opacity:1"
									transform="translate(211 452.036)"
									fill="none"
									stroke="#616161"
									stroke-width="30"
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-miterlimit="10"
									stroke-dasharray="none"
									stroke-opacity=""
									data-original="#000000"
									class=""
									opacity="1"
								></path></g
							></g
						></svg
					>
					How to Borrow/Repay
				</div>
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<!-- svelte-ignore a11y-no-static-element-interactions -->
				<div on:click={() => startOnBoarding()} user-guide="-1" class="fd46d498 _127af464 e0093a3f">
					<svg
						fill="#616161"
						width="14"
						height="14"
						x="0"
						y="0"
						viewBox="0 0 513 513"
						xml:space="preserve"
						><g
							><g fill-rule="evenodd" clip-rule="evenodd"
								><path
									d="M48.675 80.623c64.843.296 110.041 8.448 140.441 22.973 29.485 14.087 45.275 34.215 52.049 60.956a16 16 0 0 0 31.02 0c6.774-26.741 22.564-46.869 52.049-60.956 30.4-14.525 75.598-22.677 140.441-22.973v288c-115.488 0-172.207 20.701-208.002 56.088-35.67-35.224-92.464-56.052-207.699-56.088-.136-.354-.3-.975-.3-1.93zM36.448 51.03a31.94 31.94 0 0 1 12.287-2.408h.012c66.689.299 117.468 8.566 154.164 26.099 23.868 11.403 41.619 26.671 53.764 45.608 12.145-18.937 29.896-34.205 53.764-45.608 36.696-17.533 87.475-25.8 154.164-26.1h.012a31.94 31.94 0 0 1 32.06 32.022v287.979a31.997 31.997 0 0 1-32 32c-126.105 0-169.456 25.43-195.506 57.994a16 16 0 0 1-24.993-.005c-25.872-32.373-69.405-57.989-195.501-57.989-9.651 0-18.097-4.087-23.888-10.888-5.589-6.564-8.112-14.896-8.112-23.042V80.648A31.94 31.94 0 0 1 36.448 51.03z"
								></path><path
									d="M256.675 144.623c8.836 0 16 7.163 16 16v288c0 8.836-7.164 16-16 16-8.837 0-16-7.164-16-16v-288c0-8.837 7.163-16 16-16z"
								></path></g
							></g
						></svg
					>
					User Guide <!---->
				</div>
			</div>
		</div>
	</section>
</div>
