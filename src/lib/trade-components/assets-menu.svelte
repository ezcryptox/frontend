<script>
	import { _ } from 'svelte-i18n';
	import { createEventDispatcher, onMount } from 'svelte';
	import { cryptoQuotes, currentSelectedPair, tradePairs } from '$lib/store/marketdata';
	import { browser } from '$app/environment';
	import VirtualList from '@sveltejs/svelte-virtual-list';
	import { abbreviateNumber } from '$lib/utils';
	import pkg from 'lodash';
	import X from 'lucide-svelte/icons/x';
	const { debounce } = pkg;
	const dispatch = createEventDispatcher();

	$: pairs = [];
	$: listSorter = {};
	$: zoneToFilterBy = null;
	const applySort = (list = pairs) => {
		let temp = [...list];

		Object.keys(listSorter).forEach((k) => {
			const order = listSorter[k].trim();
			temp = [...temp].sort((a, b) => {
				if (order === 'asc') return a[k] < b[k] ? -1 : 1;
				else if (order === 'desc') return a[k] > b[k] ? -1 : 1;
				else return a.sort - b.sort;
			});
		});
		return [...temp];
	};
	const applyFilter = (list = pairs) => {
		if (!zoneToFilterBy) return list;
		if (zoneToFilterBy.id === -1) {
			return list.filter((p) => Object.keys(favList).includes(p.symbol));
		}
		return list.filter((i) => i.symbolZones.split(',').includes(`${zoneToFilterBy.id}`));
	};
	function updateList(p) {
		const q = $cryptoQuotes;
		return {
			...p,
			price: p.price || 0,
			...(q && q[p.symbol]
				? {
						changePercent: parseFloat(q[p.symbol].changePercent) || 0,
						volumeFrom: parseFloat(q[p.symbol].volumeFrom) || 0,
						volumeTo: parseFloat(q[p.symbol].volumeTo) || 0,
						high: parseFloat(q[p.symbol].high) || 0,
						low: parseFloat(q[p.symbol].low) || 0,
						price: parseFloat(q[p.symbol].price) || p.price || 0
					}
				: {})
		};
	}
	let searchQuery = '';
	const applySearch = (value = searchQuery) => {
		if (!value) {
			return $tradePairs.map(updateList);
		}
		return $tradePairs
			.filter(({ symbol }) => {
				return symbol.toLowerCase().includes(value.toLowerCase());
			})
			.map(updateList);
	};
	const handleSearch = (ev) => {
		const value = ev.target.value.trim();
		searchQuery = value;
		pairs = applyFilter(applySort(applySearch(value))).map(updateList);
	};
	const debouncedHandleInputChange = debounce(handleSearch, 300);

	const handleSort = (sortBy) => {
		let tempSort = { ...listSorter };
		if (!tempSort[sortBy]) tempSort = { [sortBy]: ' asc' };
		else if (tempSort[sortBy].trim() === 'asc') tempSort = { [sortBy]: ' desc' };
		else tempSort = {};
		listSorter = tempSort;

		pairs = applyFilter(applySort(applySearch()));
	};

	let currentTab = 1;

	let tabs = [];

	let favList = {};
	onMount(() => {
		pairs = [...$tradePairs];
		cryptoQuotes.subscribe((q) => {
			if (!q) return;
			pairs = pairs.map((p) => ({
				...p,
				price: p.price || 0,
				...(q[p.symbol]
					? {
							changePercent: parseFloat(q[p.symbol].changePercent) || 0,
							volumeFrom: parseFloat(q[p.symbol].volumeFrom) || 0,
							volumeTo: parseFloat(q[p.symbol].volumeTo) || 0,
							high: parseFloat(q[p.symbol].high) || 0,
							low: parseFloat(q[p.symbol].low) || 0,
							price: parseFloat(q[p.symbol].price || p.price) || 0
						}
					: {})
			}));
		});
		if (browser) {
			const favs = localStorage.getItem('favs_list');
			if (favs) {
				favList = JSON.parse(favs);
			}
			const zones = JSON.parse(localStorage.getItem('x-symbol-zones') || '[]');
			tabs = [
				{
					id: -1,
					label: $_('favorites'),
					subs: []
				},
				...zones
					.filter(z => ['USD', 'BTC'].includes(z.zoneName))
					.filter((z) => z.parentId === 0)
					.sort((a, b) => b.sort - a.sort)
					.map((z) => ({
						id: z.id,
						label: z.zoneName,
						subs: zones
							.filter((c) => c.parentId === z.id)
							.sort((a, b) => b.sort - a.sort)
							.map((c) => ({
								id: c.id,
								label: c.zoneName,
								parentId: c.parentId
							}))
					}))
			];
			zoneToFilterBy = tabs[1].subs[0];
		}
	});
	const handleFav = (pair) => {
		const temp = { ...favList };
		if (temp[pair.symbol]) {
			delete temp[pair.symbol];
		} else {
			temp[pair.symbol] = true;
		}
		localStorage.setItem('favs_list', JSON.stringify(temp));
		favList = { ...temp };
	};

	const handleTabChange = (index, zone) => (ev) => {
		if (zoneToFilterBy?.id === zone.id) return;
		zoneToFilterBy = zone.subs.length ? zone.subs[0] : zone;
		currentTab = index;
		pairs = [...applyFilter(applySort(applySearch()))];
		setTimeout(() => {
			ev.target.scrollIntoView({
				behavior: 'smooth',
				block: 'nearest',
				inline: 'center'
			});
		}, 10);
	};
	const handleSubTabChange = (zone) => {
		if (zoneToFilterBy?.id === zone.id) return;
		zoneToFilterBy = zone;
		pairs = [...applyFilter(applySort(applySearch()))];
	};

	const handleAssetClick = (item) => (ev) => {
		ev.stopPropagation();
		currentSelectedPair.set(item);
		dispatch('onAssetSelected');
		ev.preventDefault();
	};
</script>
<!-- svelte-ignore a11y-click-events-have-key-events -->
						<!-- svelte-ignore a11y-no-static-element-interactions -->
<section class="eccdf1e6 _66ad3486" on:click={ev => ev.stopPropagation()}>
	<div class="d08552a7">
		<div class="polo-input left polo-input-medium polo-input-default">
			<span class="c82c0403"
				><svg aria-hidden="true" class="svgicon" style="width: 16px; height: 16px; min-width: 16px;"
					><use xlink:href="#search"></use></svg
				></span
			><input type="text" on:input={debouncedHandleInputChange} placeholder="Search" /><span
				class="_897d4943"
				style="display: none;"
				><svg aria-hidden="true" class="svgicon" style="width: 16px; height: 16px; min-width: 16px;"
					><use xlink:href="#clear"></use></svg
				></span
			>
		</div>
	</div>
	<nav class="_8828982a">
		<div class="bbb02be1">
			<div class="_3bc72d58">
				<div class="c1fa951e">
					{#each tabs as tab, index}
						<!-- svelte-ignore a11y-click-events-have-key-events -->
						<!-- svelte-ignore a11y-no-static-element-interactions -->
						<span
							on:click={handleTabChange(index, tab)}
							class="a8b135af {zoneToFilterBy?.id === tab.id || zoneToFilterBy?.parentId === tab.id
								? '_606d29e6'
								: ''}">{tab.label}</span
						>
					{/each}
				</div>
			</div>
		</div>
		
				<!-- svelte-ignore a11y-click-events-have-key-events -->
						<!-- svelte-ignore a11y-no-static-element-interactions -->
		<!-- {#if tabs.length && tabs[currentTab]?.subs?.length}
			<div class="_896a701d" style="">
				{#each tabs[currentTab].subs as subTab}
					<span
						on:click={() => handleSubTabChange(subTab)}
						class={subTab.id === zoneToFilterBy?.id ? '_606d29e6' : ''}>{subTab.label}</span
					>
				{/each}
			</div>
		{/if} -->
	</nav>
	<div class="de0a0725">
		<dl class="abc336e7 _0fae74ff">
			<dd>
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<!-- svelte-ignore a11y-no-static-element-interactions -->
				<!-- svelte-ignore missing-declaration -->
				<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
				<em on:click={() => handleSort('symbol')} data-v-102823d5="" class="sort"
					>{$_('g-symbol')}<svg
						data-v-102823d5=""
						width="14"
						height="12"
						class={listSorter['symbol'] || ''}
						viewBox="-2 -1 8 12"
						><path
							data-v-102823d5=""
							d="M3.3894 0.389565C3.58718 0.1786 3.92206 0.1786 4.11984 0.389566L6.71892 3.16192C7.01866 3.48165 6.79196 4.00493 6.3537 4.00493H1.15554C0.717279 4.00493 0.490576 3.48164 0.79032 3.16192L3.3894 0.389565Z"
							id="arrow-up"
							fill="#878787"
						></path><path
							data-v-102823d5=""
							d="M3.3894 9.62215C3.58718 9.83312 3.92206 9.83312 4.11984 9.62215L6.71892 6.8498C7.01866 6.53007 6.79196 6.00679 6.3537 6.00679H1.15554C0.717279 6.00679 0.490576 6.53007 0.79032 6.8498L3.3894 9.62215Z"
							id="arrow-down"
							fill="#878787"
						></path></svg
					></em
				>
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<!-- svelte-ignore a11y-no-static-element-interactions -->
				<!-- svelte-ignore missing-declaration -->
				<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
				<em data-v-102823d5="" on:click={() => handleSort('volumeFrom')} class="sort"
					>{$_('vol')}<svg
						class={listSorter['volumeFrom'] || ''}
						data-v-102823d5=""
						width="14"
						height="12"
						viewBox="-2 -1 8 12"
						><path
							data-v-102823d5=""
							d="M3.3894 0.389565C3.58718 0.1786 3.92206 0.1786 4.11984 0.389566L6.71892 3.16192C7.01866 3.48165 6.79196 4.00493 6.3537 4.00493H1.15554C0.717279 4.00493 0.490576 3.48164 0.79032 3.16192L3.3894 0.389565Z"
							id="arrow-up"
							fill="#878787"
						></path><path
							data-v-102823d5=""
							d="M3.3894 9.62215C3.58718 9.83312 3.92206 9.83312 4.11984 9.62215L6.71892 6.8498C7.01866 6.53007 6.79196 6.00679 6.3537 6.00679H1.15554C0.717279 6.00679 0.490576 6.53007 0.79032 6.8498L3.3894 9.62215Z"
							id="arrow-down"
							fill="#878787"
						></path></svg
					></em
				>
			</dd>

			<dd>
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<!-- svelte-ignore a11y-no-static-element-interactions -->
				<!-- svelte-ignore missing-declaration -->
				<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
				<em on:click={() => handleSort('price')} data-v-102823d5="" class="sort"
					>{$_('g-price')}<svg
						class={listSorter['price'] || ''}
						data-v-102823d5=""
						width="14"
						height="12"
						viewBox="-2 -1 8 12"
						><path
							data-v-102823d5=""
							d="M3.3894 0.389565C3.58718 0.1786 3.92206 0.1786 4.11984 0.389566L6.71892 3.16192C7.01866 3.48165 6.79196 4.00493 6.3537 4.00493H1.15554C0.717279 4.00493 0.490576 3.48164 0.79032 3.16192L3.3894 0.389565Z"
							id="arrow-up"
							fill="#878787"
						></path><path
							data-v-102823d5=""
							d="M3.3894 9.62215C3.58718 9.83312 3.92206 9.83312 4.11984 9.62215L6.71892 6.8498C7.01866 6.53007 6.79196 6.00679 6.3537 6.00679H1.15554C0.717279 6.00679 0.490576 6.53007 0.79032 6.8498L3.3894 9.62215Z"
							id="arrow-down"
							fill="#878787"
						></path></svg
					></em
				>
			</dd>

			<dd>
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<!-- svelte-ignore a11y-no-static-element-interactions -->
				<!-- svelte-ignore missing-declaration -->
				<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
				<em on:click={() => handleSort('changePercent')} data-v-102823d5="" class="sort"
					>{$_('24h-change')}<svg
						class={listSorter['change'] || ''}
						data-v-102823d5=""
						width="14"
						height="12"
						viewBox="-2 -1 8 12"
						><path
							data-v-102823d5=""
							d="M3.3894 0.389565C3.58718 0.1786 3.92206 0.1786 4.11984 0.389566L6.71892 3.16192C7.01866 3.48165 6.79196 4.00493 6.3537 4.00493H1.15554C0.717279 4.00493 0.490576 3.48164 0.79032 3.16192L3.3894 0.389565Z"
							id="arrow-up"
							fill="#878787"
						></path><path
							data-v-102823d5=""
							d="M3.3894 9.62215C3.58718 9.83312 3.92206 9.83312 4.11984 9.62215L6.71892 6.8498C7.01866 6.53007 6.79196 6.00679 6.3537 6.00679H1.15554C0.717279 6.00679 0.490576 6.53007 0.79032 6.8498L3.3894 9.62215Z"
							id="arrow-down"
							fill="#878787"
						></path></svg
					></em
				>
			</dd>
		</dl>
		<div class="_0f4459a3">
			<div class="_00761050" style="height: calc((100vh - 155px) - 110px)">
				{#if !pairs.length}
					<div class="_20a38d89 bdb62701">
						<svg
							width="60"
							height="60"
							viewBox="0 0 60 60"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
							><path
								d="M8.18164 20.9916C8.18164 20.648 8.31813 20.3185 8.56107 20.0756L18.7113 9.92533C18.9542 9.68238 19.2838 9.5459 19.6273 9.5459H45.068C45.7835 9.5459 46.3635 10.1259 46.3635 10.8414V49.1595C46.3635 49.875 45.7835 50.455 45.068 50.455H9.4771C8.76164 50.455 8.18164 49.875 8.18164 49.1595V20.9916Z"
								fill="#616161"
							></path><path
								d="M19.0908 19.8074C19.0908 20.1651 18.8008 20.4551 18.4431 20.4551L8.18173 20.4551L13.6363 15.0005L19.0908 9.54599L19.0908 19.8074Z"
								fill="#878787"
							></path><rect
								width="21.8182"
								height="2.72727"
								rx="0.647727"
								transform="matrix(-1 -8.74228e-08 -8.74228e-08 1 38.1816 26.5918)"
								fill="#878787"
							></rect><rect
								width="18.4091"
								height="2.72727"
								rx="0.647727"
								transform="matrix(-1 -8.74228e-08 -8.74228e-08 1 34.7725 34.7734)"
								fill="#878787"
							></rect><path
								fill-rule="evenodd"
								clip-rule="evenodd"
								d="M48.5736 43.4363C51.0273 39.8523 50.6627 34.9184 47.4799 31.7355C43.8853 28.1409 38.0573 28.1409 34.4627 31.7355C30.8681 35.3301 30.8681 41.1581 34.4627 44.7527C37.8128 48.1028 43.1027 48.3307 46.7167 45.4364L52.0842 50.8039C52.3372 51.0568 52.7473 51.0568 53.0003 50.8039L54.0127 49.7914C54.2657 49.5385 54.2657 49.1284 54.0127 48.8754L48.5736 43.4363ZM45.5511 33.6641C48.0807 36.1937 48.0807 40.2948 45.5511 42.8244C43.0216 45.3539 38.9204 45.3539 36.3909 42.8244C33.8614 40.2948 33.8614 36.1937 36.3909 33.6641C38.9204 31.1346 43.0216 31.1346 45.5511 33.6641Z"
								fill="#B8B8B8"
							></path></svg
						>
						<p>No results found</p>
					</div>
				{:else}
					<VirtualList itemHeight={52} items={pairs} let:item>
						<dl class="abc336e7 _1d9ddf38" style="min-height: 52px;">
							<dd>
								<span
									on:click={() => handleFav(item)}
									class="_8f210f7a {favList[item.symbol] ? '_1d9ddf38' : ''}"
									><svg
										aria-hidden="true"
										class="svgicon"
										style="width: 16px; height: 16px; min-width: 16px;"
										><use xlink:href="#star"></use></svg
									></span
								><a
									href="/trade/{item.symbol}/?type=spot"
									on:click={handleAssetClick(item)}
									class="router-link-exact-active router-link-active"
									aria-current="page"
									><i class="_9b33bef0 _66bb57cd"
										><img loading="lazy" src={item.baseIcon} class="_6197556c" /></i
									><span class="f1e17be0">
										<span
											>{item.symbol.replace('_', '/')}
											{#if item.crossMargin.maxLeverage === 3}
												<i class="_6e4b4277">3X</i>
											{/if}</span
										>

										<span>
											Vol ${abbreviateNumber(item.volumeFrom)}
										</span></span
									></a
								>
							</dd>
							<dd>
								<a
									href="/trade/{item.symbol}/?type=spot"
									class="router-link-exact-active router-link-active"
									aria-current="page"
									>{parseFloat(item.price?.toFixed(2) || '0').toLocaleString()}</a
								>
							</dd>
							<dd>
								<a
									href="/trade/{item.symbol}/?type=spot"
									class="router-link-exact-active router-link-active"
									aria-current="page"
									><span class="_7cb43809 {item.change < 0 ? '_65a0ee45' : '_9b99c5d7'}">
										{parseFloat(item.changePercent?.toFixed(2) || '0')}%
									</span></a
								>
							</dd>
						</dl>
					</VirtualList>
				{/if}
			</div>
		</div>
	</div>
</section>
