<script>
	import { _ } from 'svelte-i18n';
	/** @type {import('./$types').PageData} */
	import '../../../styles/trade.css';
	import VirtualList from '@sveltejs/svelte-virtual-list';
	import Tradingview from '$lib/components/tradingview/tradingview.svelte';
	import { cryptoQuotes, socketRequest } from '../store';
	import pkg from 'lodash';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	const { debounce } = pkg;
	export let data;

	let falling = false;

	let quotes = data.pair;
	let pairs = data.pairs;
	const indexMap = {};
	function assignIndex() {
		data.pairs.forEach((p, index) => {
			indexMap[p.symbol] = index;
		})
	}
	assignIndex();
	$: showCryptoDialog = false;

	function abbreviateNumber(number) {
		if (number >= 1e12) {
			// Trillion
			return parseFloat((number / 1e12).toFixed(2)).toLocaleString() + 'T';
		} else if (number >= 1e9) {
			// Billion
			return parseFloat((number / 1e9).toFixed(2)).toLocaleString() + 'B';
		} else if (number >= 1e6) {
			// Million
			return parseFloat((number / 1e6).toFixed(2)).toLocaleString() + 'M';
		} else if (number >= 1e3) {
			// Thousand
			return parseFloat((number / 1e3).toFixed(2)).toLocaleString() + 'K';
		} else {
			return parseFloat(number.toFixed(2)).toLocaleString();
		}
	}
	cryptoQuotes.subscribe((q) => {
		if (!q) return;
		// console.log(q);
		if (quotes && quotes.price > q[data.slug.toUpperCase()].price) {
			falling = true;
		} else {
			falling = false;
		}
		if (q[data.pair.symbol]) {
			const p = data.pair;
			quotes = {
				...quotes,
				changePercent: q[p.symbol].changePercent,
				volumeFrom: q[p.symbol].volumeFrom,
				price: q[p.symbol].price
			};
		}
		pairs = (pairs || data.pairs).map((p) => ({
			...p,
			price: p.price || 0,
			...(q[p.symbol]
				? {
						changePercent: q[p.symbol].changePercent,
						volumeFrom: q[p.symbol].volumeFrom,
						price: q[p.symbol].price || p.price || 0
					}
				: {})
		}));
	});

	$: listSorter = {};
	$: listToFilter = 'USDT';
	const applySort = (list = pairs) => {
		let temp = [...list];
		
		Object.keys(listSorter).forEach(k => {
			const order = listSorter[k].trim();
			temp = [...temp].sort((a, b) => {
				if (order === 'asc') return a[k] < b[k] ? -1 : 1
				else if (order === 'desc') return a[k] > b[k] ? -1 : 1
				else return temp.indexOf(a) - temp.indexOf(b);//indexMap[a.symbol] - indexMap[b.symbol]
			})
		})
		return [...temp]
	}
	const applyFilter = (list = pairs) => {
		if (!listToFilter) return list;
		return list.filter(i => i.symbol.split('_')[1] === listToFilter)
	}
	function updateList(p) {
		const q = $cryptoQuotes;
		return {
			...p,
				price: p.price || 0,
				...(q && q[p.symbol]
					? {
							changePercent: q[p.symbol].changePercent,
							volumeFrom: q[p.symbol].volumeFrom,
							price: q[p.symbol].price || p.price || 0
						}
					: {})
		}
	}
	let searchQuery = '';
	const applySearch = (value = searchQuery) => {
		if (!value) {
			return data.pairs.map(updateList);
		}
		return data.pairs
			.filter(({ symbol }) => {
				return symbol.toLowerCase().includes(value.toLowerCase());
			})
			.map(updateList)
	}
	const handleSearch = (ev) => {
		const value = ev.target.value.trim();
		searchQuery = value
		pairs =  applyFilter(applySort(applySearch(value))).map(updateList)
	};
	const debouncedHandleInputChange = debounce(handleSearch, 300);

	let joined = false;
	socketRequest.subscribe(sr => {
		if (sr && !joined) {
			joined = true;
			const [from, to] = data.pair.symbol.split('_');
			sr("join-ticker", {from, to})
		}
	})

	const handleSort = (sortBy) => {
		const tempSort = {...listSorter};
		if (!tempSort[sortBy]) tempSort[sortBy] = ' asc'
		else if (tempSort[sortBy] === ' asc') tempSort[sortBy] = ' desc'
		else tempSort[sortBy] = ''
		listSorter = {...tempSort}

		pairs = applyFilter(applySort(applySearch()));
	}

	let currentTab = 1;
	
	let tabs = [{
		label: $_('favorites'),
		sub: [],
	},{
		label: $_('usd'),
		sub: ['USDT', 'USDC', 'USDD']
	},
	{label: 'BTC', sub: []}
	, {
		label: $_('ordinals'),
		sub: []
	}, {
		label:  $_('trx'),
		sub: []
	}, {
		label: $_('margin'),
		sub: []
	}, {
		label: $_('alts'),
		sub: []
	}, {
		label: $_('innov'),
		sub: []
	}, {
		label: $_('meme'),
		sub: []
	}, {
		label: $_('shanghai-upgrade'),
		sub: []
	}, {
		label: $_('hong-kong'),
		sub: []
	}, {
		label: $_('arbitrum'),
		sub: []
	}, {
		label:  $_('ai'),
		sub: [],
	}, {label:  $_('fan-token'),
		sub: []
	} ]

	let favList = {};
	onMount(() => {
		if(browser) {
			const favs = localStorage.getItem('favs_list');
			if (favs) {
				favList = JSON.parse(favs)
			}
		}
	})
	const handleFav = (pair) => {
		const temp = {...favList};
		if (temp[pair.symbol]) {
			delete temp[pair.symbol]
		} else {
			temp[pair.symbol] = true
		}
		localStorage.setItem('favs_list', JSON.stringify(temp))
		favList = {...temp}
	}
	const handleTabChange = (tab, index) =>{
															listToFilter = tab.sub[0] || "";
															currentTab = index
															if (index === 0) {
																pairs = [...applyFilter(applySort(applySearch())).filter(p => Object.keys(favList).includes(p.symbol))]
															} else {
																pairs = [...applyFilter(applySort(applySearch()))]
															}
														}
	const handleSubTabChange = (filter) => {
		listToFilter = filter
		pairs = [...applyFilter(applySort(applySearch()))]
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	class="app-trade mt-[64px]"
	on:click={() => {
		showCryptoDialog = false;
	}}
>
	<main class="_99ca71d3">
		<!---->
		<section class="e94bdc41">
			<div class="_61aea1ce">
				<section class="_49567930">
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<!-- svelte-ignore a11y-no-static-element-interactions -->
					<div
						data-user-guide="1"
						class="_90e8af53"
						style=""
						on:click={(ev) => {
							showCryptoDialog = !showCryptoDialog;
							ev.stopPropagation();
						}}
					>
						<div class="ef057bf0">
							<i
								class="_9b33bef0 _3b46d5a7"
								style="width: 18px; height: 18px; min-width: 18px; min-height: 18px;"
								><img
									loading="lazy"
									src={data.pair.fromIcon}
									class="_6197556c"
									alt=""
									style=""
								/></i
							><i
								class="_9b33bef0 f0557c33"
								style="width: 18px; height: 18px; min-width: 18px; min-height: 18px;"
								><img loading="lazy" src={data.pair.toIcon} class="_6197556c" alt="" style="" /></i
							>
						</div>
						<div class="cb42a1b7">
							<div class="f7a95949 _5bd83198">
								<span>{data?.slug.replace('_', '/') || ''}</span>
								<div class="ab81295b">3X</div>
								<svg
									aria-hidden="true"
									class="svgicon d4379d29"
									style="width: 9px; height: 6px; min-width: 0px;"
									><use xlink:href="#arrow"></use></svg
								>
							</div>
							<div class="_88741fd9">
								<svg
									aria-hidden="true"
									class="svgicon"
									style="width: 12px; height: 12px; min-width: 12px;"
									><use xlink:href="#book"></use></svg
								><span class="cf00bf05">{$_('ethereum')}</span>
							</div>
						</div>
						{#if showCryptoDialog}
							<!-- svelte-ignore a11y-click-events-have-key-events -->
							<!-- svelte-ignore a11y-no-static-element-interactions -->
							<div
								on:click={(ev) => ev.stopPropagation()}
								class="_64aeb761"
								style="height: calc(100vh - 155px); display: block"
							>
								<section class="eccdf1e6 _66ad3486">
									<div class="d08552a7">
										<div class="polo-input left polo-input-medium polo-input-default">
											<span class="c82c0403"
												><svg
													aria-hidden="true"
													class="svgicon"
													style="width: 16px; height: 16px; min-width: 16px;"
													><use xlink:href="#search"></use></svg
												></span
											><input
												type="text"
												on:input={debouncedHandleInputChange}
												placeholder="Search"
											/><span class="_897d4943" style="display: none;"
												><svg
													aria-hidden="true"
													class="svgicon"
													style="width: 16px; height: 16px; min-width: 16px;"
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
														<span on:click={() => handleTabChange(tab, index)} class="a8b135af{index === currentTab ? ' _606d29e6': ''}">{tab.label}</span>
													{/each}
												</div>
											</div>
										</div>
										{#if tabs[currentTab].sub.length}
											<div class="_896a701d" style="">
												{#each tabs[currentTab].sub as subTab}
													<span on:click={() => handleSubTabChange(subTab)} class="{subTab === listToFilter ? '_606d29e6' : ''}">{subTab}</span>
												{/each}
										</div>
										{/if}
										
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
														class="{listSorter['symbol'] || ''}"
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
													class="{listSorter['volumeFrom'] || ''}"
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
													class="{listSorter['price'] || ''}"
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
												<em on:click={() => handleSort('change')} data-v-102823d5="" class="sort"
													>{$_('24h-change')}<svg
													class="{listSorter['change'] || ''}"
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
															<span on:click={() => handleFav(item)} class="_8f210f7a {favList[item.symbol] ? '_1d9ddf38' : ''}"
																><svg
																	aria-hidden="true"
																	class="svgicon"
																	style="width: 16px; height: 16px; min-width: 16px;"
																	><use xlink:href="#star"></use></svg
																></span
															><a
																href="/trade/{item.symbol}/?type=spot"
																class="router-link-exact-active router-link-active"
																aria-current="page"
																><i class="_9b33bef0 _66bb57cd"
																	><img loading="lazy" src={item.fromIcon} class="_6197556c" /></i
																><span class="f1e17be0"
																	><span
																		>{item.symbol.replace('_', '/')}<i class="_6e4b4277">3X</i
																		></span
																	><span>
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
																href="/trade/ETH_USDT/?type=spot"
																class="router-link-exact-active router-link-active"
																aria-current="page"
																><span
																	class="_7cb43809 {item.change < 0 ? '_65a0ee45' : '_9b99c5d7'}"
																>
																	{parseFloat(item.changePercent?.toFixed(2) || '0')}%
																</span></a
															>
														</dd>
													</dl>
												</VirtualList>
													<div data-v-b329ee4c="" tabindex="-1" class="resize-observer">
														<!-- svelte-ignore a11y-missing-attribute -->
														<object
															aria-hidden="true"
															tabindex="-1"
															type="text/html"
															data="about:blank"
														></object>
													</div>
												{/if}
											</div>
										</div>
									</div>
								</section>
							</div>
						{/if}
					</div>
					<div class="_07eaee34">
						<div class="_0c7c0f49">
							<dl class="_0166c194">
								<dt class={falling ? '_395fff9e' : '_0ce4a56e'}>
									{quotes ? parseFloat(quotes.price.toFixed(2)).toLocaleString() : '--'}
								</dt>
								<dd>${quotes ? parseFloat(quotes.price.toFixed(2)).toLocaleString() : '--'}</dd>
							</dl>
							<dl>
								<dt>{$_('24h-change')}</dt>
								<dd class={falling ? '_395fff9e' : '_0ce4a56e'}>
									<span class={quotes && quotes.change < 0 ? '_395fff9e' : '_0ce4a56e'}
										>{quotes ? quotes.changePercent.toFixed(2) : '--'}%</span
									>
								</dd>
							</dl>
							<dl>
								<dt>{$_('24h-high')}</dt>
								<dd>{quotes ? parseFloat(quotes.high.toFixed(2)).toLocaleString() : '--'}</dd>
							</dl>
							<dl>
								<dt>{$_('24h-low')}</dt>
								<dd>{quotes ? parseFloat(quotes.low.toFixed(2)).toLocaleString() : '--'}</dd>
							</dl>
							<dl>
								<dt>24h Volume({quotes.symbol.split('_')[0]})</dt>
								<dd>{quotes ? abbreviateNumber(quotes.volumeFrom) : '--'}</dd>
							</dl>
							<dl>
								<dt>24h Volume({quotes.symbol.split('_')[1]})</dt>
								<dd>{quotes ? abbreviateNumber(quotes.volumeTo) : '--'}</dd>
							</dl>
						</div>
						<div class="_3dcbe398">
							<div class="_9b1c1ac5 _127af464">
								<svg
									aria-hidden="true"
									class="svgicon"
									style="width: 14px; height: 14px; min-width: 14px;"
									><use xlink:href="#hand"></use></svg
								>{$_('borrow-repay-guide')}
							</div>
							<div data-user-guide="-1" class="fd46d498 _127af464">
								<svg
									aria-hidden="true"
									class="svgicon"
									style="width: 14px; height: 14px; min-width: 14px;"
									><use xlink:href="#userGuide"></use></svg
								>{$_('user-guide')}
							</div>
						</div>
					</div>
				</section>
			</div>
			<section class="_497e9d61">
				<section class="ee935bfd"><!----></section>
				<section class="_03fafbdf">
					<section class="_8a825ebf">
						<div class="_731f9e0c">
							<section class="_65d2dc70">
								<dl class="_4b0c0787">
									<dd class="afed7137 _54ffc89b">
										<a
											href="/trade/{data.slug}/"
											class="router-link-exact-active router-link-active"
											aria-current="page"
											><span class="_2365dc81">{data?.slug.replace('_', '/') || ''}</span><span
												class="_48a39702"
												>{quotes
													? parseFloat(quotes.price.toFixed(2)).toLocaleString()
													: '--'}</span
											></a
										><!---->
									</dd>
								</dl>
								<section class="_7f9800af">
									<div class="f2ad5021 _8eddb339">
										<div class="ea55d85f">
											<div class="_9d1f25a8">
												<svg
													width="16"
													height="16"
													viewBox="0 0 16 16"
													fill="none"
													xmlns="http://www.w3.org/2000/svg"
													><path
														d="M4.4603 5.59847L3.66802 6.39076L1.87204 4.53064L1.87205 4.53063L1.87081 4.52939C1.64319 4.30177 1.64319 3.96509 1.87081 3.73748L3.73748 1.87081C3.96509 1.64319 4.30177 1.64319 4.52939 1.87081L6.32534 3.66676L5.53343 4.45868L4.20414 3.12939L4.13343 3.05868L4.06272 3.12939L3.12939 4.06272L3.0603 4.13181L3.12776 4.20248L4.4603 5.59847ZM12.8334 11.8001V11.7587L12.8041 11.7294L11.344 10.2692L12.1977 9.47246L13.9668 11.2415V13.9668H11.2415L9.47246 12.1977L10.2692 11.344L11.7294 12.8041L11.7587 12.8334H11.8001H12.7334H12.8334V12.7334V11.8001ZM10.4039 1.87109L10.4041 1.87081C10.6318 1.64319 10.9684 1.64319 11.1961 1.87081L13.9961 4.67081C14.2237 4.89842 14.2237 5.30177 13.9961 5.52939L5.52939 13.9961C5.30177 14.2237 4.96509 14.2237 4.73748 13.9961L1.87081 11.1294C1.64323 10.9018 1.64319 10.5652 1.87069 10.3376C1.87073 10.3376 1.87077 10.3375 1.87081 10.3375L10.4039 1.87109ZM5.06272 12.7375L5.13343 12.8082L5.20414 12.7375L12.7375 5.20414L12.8082 5.13343L12.7375 5.06272L10.8041 3.12939L10.7334 3.05868L10.6627 3.12939L9.26272 4.52939L9.19441 4.5977L9.26033 4.66833L10.1277 5.5977L9.33343 6.39201L8.47081 5.52939L8.4001 5.45868L8.32939 5.52939L7.39605 6.46272L7.32534 6.53343L7.39605 6.60414L8.25868 7.46676L7.46676 8.25868L6.60414 7.39605L6.53343 7.32534L6.46272 7.39605L5.52939 8.32939L5.45868 8.4001L5.52939 8.47081L6.39201 9.33343L5.6001 10.1253L4.73748 9.26272L4.6651 9.19035L4.59443 9.26438L3.19443 10.7311L3.12697 10.8017L3.19605 10.8708L5.06272 12.7375Z"
														fill="#2B2B2E"
														stroke="white"
														stroke-width="0.2"
													></path></svg
												>
											</div>
											<div class="_5daf8810">
												<span class="_9391ea7a">{$_('g-date')}</span><span
													class="_9391ea7a d6ac01f2">{$_('1min')}</span
												><span class="_40989834 _8ac44990"
													><span class="_432cfdda">{$_('g-more')}</span>
													<div class="_41c42367">
														<span class="_3b5033be"
															><!----><span class="a53c3f73">{$_('fifteen-minutes')}</span><span
																><span class="_53b7858e _829577c6"></span></span
															></span
														><span class="_3b5033be"
															><svg
																aria-hidden="true"
																class="svgicon _3c0880e0"
																style="width: 14px; height: 14px; min-width: 14px;"
																><use xlink:href="#star"></use></svg
															><span class="d6ac01f2 a53c3f73">{$_('1min')}</span><span
																><span class="_53b7858e _689984b3"></span></span
															></span
														><span class="_3b5033be"
															><!----><span class="a53c3f73">{$_('5min')}</span><span
																><span class="_53b7858e _829577c6"></span></span
															></span
														><span class="_3b5033be"
															><!----><span class="a53c3f73">{$_('10min')}</span><span
																><span class="_53b7858e _829577c6"></span></span
															></span
														><span class="_3b5033be"
															><!----><span class="a53c3f73">{$_('thirty-minutes')}</span><span
																><span class="_53b7858e _829577c6"></span></span
															></span
														><span class="_3b5033be"
															><!----><span class="a53c3f73">{$_('one-hour')}</span><span
																><span class="_53b7858e _829577c6"></span></span
															></span
														><span class="_3b5033be"
															><!----><span class="a53c3f73">{$_('2hour')}</span><span
																><span class="_53b7858e _829577c6"></span></span
															></span
														><span class="_3b5033be"
															><!----><span class="a53c3f73">{$_('4hour')}</span><span
																><span class="_53b7858e _829577c6"></span></span
															></span
														><span class="_3b5033be"
															><!----><span class="a53c3f73">{$_('six-hour')}</span><span
																><span class="_53b7858e _829577c6"></span></span
															></span
														><span class="_3b5033be"
															><!----><span class="a53c3f73">{$_('twelve-hour')}</span><span
																><span class="_53b7858e _829577c6"></span></span
															></span
														><span class="_3b5033be"
															><!----><span class="a53c3f73">{$_('one-day')}</span><span
																><span class="_53b7858e _829577c6"></span></span
															></span
														><span class="_3b5033be"
															><!----><span class="a53c3f73">{$_('three-day')}</span><span
																><span class="_53b7858e _829577c6"></span></span
															></span
														><span class="_3b5033be"
															><!----><span class="a53c3f73">{$_('one-week')}</span><span
																><span class="_53b7858e _829577c6"></span></span
															></span
														><span class="_3b5033be"
															><!----><span class="a53c3f73">{$_('one-month')}</span><span
																><span class="_53b7858e _829577c6"></span></span
															></span
														>
													</div></span
												><span class="_087a05bb"></span><span class="fe19bcf9"
													><svg
														width="15"
														height="8"
														fill="currentColor"
														viewBox="0 0 15 8"
														xmlns="http://www.w3.org/2000/svg"
														><path
															fill-rule="evenodd"
															clip-rule="evenodd"
															d="M14.6818 0.813949L12.0933 5.34375C11.1553 6.98535 8.80477 7.03172 7.8027 5.4284L6.34845 3.1016C5.7472 2.13961 4.33692 2.16743 3.77409 3.15239L1.18563 7.68219L0.317383 7.18605L2.90584 2.65625C3.8439 1.01466 6.19437 0.968282 7.19645 2.5716L8.6507 4.8984C9.25194 5.86039 10.6622 5.83257 11.2251 4.84761L13.8135 0.31781L14.6818 0.813949Z"
														></path></svg
													></span
												><span class="_087a05bb"></span><span class="b0a0fc30"
													><svg
														width="16"
														height="16"
														viewBox="0 0 16 16"
														fill="currentColor"
														xmlns="http://www.w3.org/2000/svg"
														><g clip-path="url(#clip0_15422_14214)"
															><path
																d="M9.19943 2L9.38693 3.3L9.46193 3.8375L9.94943 4.0625C10.1494 4.1625 10.3619 4.275 10.5494 4.4L10.9869 4.6875L11.4744 4.5L12.7494 4L13.9369 5.9875L12.8869 6.7875L12.4494 7.125L12.4994 7.675C12.5119 7.7875 12.5119 7.9 12.5119 8C12.5119 8.1 12.5119 8.2125 12.4994 8.325L12.4494 8.875L12.8869 9.2125L13.9369 10.0125L12.7619 12L11.4744 11.5L10.9869 11.3125L10.5494 11.6C10.3494 11.7375 10.1494 11.85 9.94943 11.9375L9.46193 12.1625L9.38693 12.6875L9.19943 14H6.79943L6.61193 12.7L6.53693 12.1625L6.04943 11.9375C5.84943 11.8375 5.63693 11.725 5.44943 11.6L5.01193 11.3125L4.52443 11.5L3.24943 12L2.06193 10.0125L3.11193 9.2125L3.54943 8.875L3.49943 8.325C3.48693 8.2125 3.48693 8.1 3.48693 8C3.48693 7.9 3.48693 7.7875 3.49943 7.675L3.54943 7.125L3.11193 6.7875L2.06193 5.9875L3.23693 4L4.52443 4.5L5.01193 4.6875L5.44943 4.4C5.64943 4.2625 5.84943 4.15 6.04943 4.0625L6.53693 3.8375L6.61193 3.3125L6.79943 2H9.19943ZM9.33693 1H6.66193C6.23693 1 5.88693 1.3 5.82443 1.7L5.62443 3.15C5.37443 3.2625 5.13693 3.4 4.88693 3.5625L3.47443 3.0125C3.37443 2.975 3.27443 2.9625 3.17443 2.9625C2.87443 2.9625 2.58693 3.1125 2.44943 3.375L1.11193 5.625C0.899427 5.975 0.986927 6.4375 1.31193 6.6875L2.49943 7.5875C2.48693 7.7375 2.47443 7.875 2.47443 8C2.47443 8.125 2.47443 8.2625 2.49943 8.4125L1.31193 9.3125C0.986927 9.5625 0.899427 10 1.11193 10.375L2.43693 12.6125C2.58693 12.875 2.87443 13.0375 3.17443 13.0375C3.27443 13.0375 3.36193 13.025 3.46193 12.9875L4.87443 12.4375C5.11193 12.6 5.36193 12.7375 5.61193 12.85L5.82443 14.2875C5.87443 14.6875 6.23693 15 6.66193 15H9.33693C9.76193 15 10.1119 14.7 10.1744 14.3L10.3869 12.85C10.6369 12.7375 10.8744 12.6 11.1244 12.4375L12.5369 12.9875C12.6369 13.025 12.7369 13.0375 12.8369 13.0375C13.1369 13.0375 13.4244 12.8875 13.5619 12.625L14.8994 10.3625C15.0994 10 15.0119 9.5625 14.6869 9.3125L13.4994 8.4125C13.5119 8.2875 13.5244 8.15 13.5244 8C13.5244 7.85 13.5119 7.7125 13.4994 7.5875L14.6869 6.6875C15.0119 6.4375 15.0994 6 14.8869 5.625L13.5619 3.3875C13.4119 3.125 13.1244 2.9625 12.8244 2.9625C12.7244 2.9625 12.6369 2.975 12.5369 3.0125L11.1244 3.5625C10.8869 3.4 10.6369 3.2625 10.3869 3.15L10.1744 1.7125C10.1119 1.3 9.76193 1 9.33693 1ZM7.99943 6C9.09943 6 9.99943 6.9 9.99943 8C9.99943 9.1 9.09943 10 7.99943 10C6.89943 10 5.99943 9.1 5.99943 8C5.99943 6.9 6.89943 6 7.99943 6ZM7.99943 5C6.34943 5 4.99943 6.35 4.99943 8C4.99943 9.65 6.34943 11 7.99943 11C9.64943 11 10.9994 9.65 10.9994 8C10.9994 6.35 9.64943 5 7.99943 5Z"
															></path><path
																fill-rule="evenodd"
																clip-rule="evenodd"
																d="M5.77514 1.69229C5.84155 1.26726 6.21311 0.950012 6.66204 0.950012H9.33704C9.78639 0.950012 10.1577 1.26772 10.224 1.70502L10.4325 3.11573C10.669 3.22372 10.9053 3.35392 11.1309 3.50638L12.5189 2.96592C12.6254 2.92599 12.7195 2.91251 12.8245 2.91251C13.1419 2.91251 13.4461 3.08413 13.6053 3.36238C13.6053 3.36249 13.6052 3.36227 13.6053 3.36238L14.9301 5.59954C15.1544 5.99541 15.063 6.4614 14.7175 6.72714L13.5521 7.61045C13.5636 7.7284 13.5745 7.8586 13.5745 8.00001C13.5745 8.14142 13.5636 8.27163 13.5521 8.38958L14.7172 9.27266C15.0623 9.53807 15.155 10.003 14.9433 10.3867L14.9426 10.388L13.6057 12.6494C13.4581 12.9301 13.1522 13.0875 12.837 13.0875C12.7328 13.0875 12.6265 13.0745 12.5195 13.0343L11.1303 12.4934C10.895 12.6454 10.6693 12.7758 10.4326 12.8843L10.224 14.3073C10.1576 14.7323 9.78597 15.05 9.33704 15.05H6.66204C6.21348 15.05 5.82857 14.7204 5.775 14.2943C5.77497 14.2941 5.77502 14.2945 5.775 14.2943L5.56657 12.8843C5.33005 12.7763 5.0938 12.6461 4.86818 12.4936L3.48018 13.0341C3.3737 13.074 3.27954 13.0875 3.17454 13.0875C2.85715 13.0875 2.55299 12.9159 2.39383 12.6377C2.39376 12.6376 2.3939 12.6378 2.39383 12.6377L1.06902 10.4005C0.844691 10.0046 0.936083 9.53863 1.28156 9.27288L2.44551 8.39072C2.42454 8.24831 2.42454 8.11757 2.42454 8.0013V8.00001C2.42454 7.88329 2.43521 7.75617 2.44654 7.62124C2.44683 7.61775 2.44713 7.61425 2.44742 7.61075L1.28184 6.72736C0.936812 6.46195 0.843531 5.97115 1.06918 5.59926C1.06922 5.59919 1.06914 5.59932 1.06918 5.59926L2.40589 3.3506C2.55356 3.06991 2.85937 2.91251 3.17454 2.91251C3.27877 2.91251 3.38504 2.92555 3.4921 2.9657L4.88133 3.50663C5.11647 3.35472 5.34214 3.22429 5.57878 3.11588L5.77514 1.69229ZM5.87401 1.70731L5.67029 3.18425L5.64506 3.19561C5.39817 3.30671 5.163 3.44277 4.91429 3.60443L4.89279 3.61841L3.45669 3.05922C3.36384 3.02445 3.27021 3.01251 3.17454 3.01251C2.89017 3.01251 2.62141 3.15467 2.49383 3.39821L2.49258 3.4006L1.15502 5.65056C0.955849 5.97861 1.0376 6.41323 1.34242 6.6478C1.34245 6.64782 1.34238 6.64777 1.34242 6.6478L2.55165 7.56427L2.54937 7.59166C2.54833 7.60414 2.54729 7.6165 2.54626 7.62875C2.53485 7.76483 2.52454 7.88772 2.52454 8.00001C2.52454 8.1253 2.52463 8.25891 2.54886 8.40429L2.55383 8.43411L1.34253 9.35214C1.34248 9.35218 1.34258 9.3521 1.34253 9.35214C1.03825 9.58632 0.95497 9.99597 1.1553 10.3499C1.15538 10.3501 1.15522 10.3498 1.1553 10.3499L2.48006 12.587C2.62095 12.8336 2.89207 12.9875 3.17454 12.9875C3.26945 12.9875 3.3508 12.9758 3.44421 12.9408C3.4443 12.9408 3.44411 12.9408 3.44421 12.9408L4.88099 12.3813L4.90278 12.3962C5.13766 12.557 5.38505 12.693 5.63256 12.8044L5.6575 12.8156L5.87417 14.2813C5.92086 14.6549 6.26079 14.95 6.66204 14.95H9.33704C9.73801 14.95 10.0664 14.6674 10.1251 14.2926C10.1251 14.2925 10.1251 14.2927 10.1251 14.2926L10.3415 12.8157L10.3665 12.8044C10.6134 12.6933 10.8486 12.5573 11.0973 12.3956L11.1188 12.3816L12.5546 12.9407C12.5547 12.9407 12.5545 12.9407 12.5546 12.9407C12.6475 12.9755 12.7414 12.9875 12.837 12.9875C13.1214 12.9875 13.3902 12.8454 13.5177 12.6018L13.5189 12.5995L14.8561 10.3377C15.044 9.99654 14.9614 9.58675 14.6567 9.35228C14.6567 9.35223 14.6568 9.35233 14.6567 9.35228L13.447 8.43543L13.4498 8.40754C13.4623 8.28276 13.4745 8.14736 13.4745 8.00001C13.4745 7.85267 13.4623 7.71727 13.4498 7.59249L13.447 7.5646L14.6566 6.64788C14.6566 6.64785 14.6565 6.64792 14.6566 6.64788C14.9609 6.4137 15.0441 6.00405 14.8438 5.65007C14.8437 5.64994 14.8439 5.65021 14.8438 5.65007L13.519 3.41299C13.3781 3.16643 13.107 3.01251 12.8245 3.01251C12.7296 3.01251 12.6483 3.02424 12.5549 3.05922C12.5548 3.05926 12.555 3.05919 12.5549 3.05922L11.1181 3.61868L11.0963 3.60378C10.8614 3.44307 10.614 3.30699 10.3665 3.19561L10.3416 3.18438L10.1251 1.72C10.1251 1.71997 10.1251 1.72003 10.1251 1.72C10.0663 1.33235 9.73766 1.05001 9.33704 1.05001H6.66204C6.26112 1.05001 5.93278 1.33255 5.87401 1.70731ZM6.75618 1.95001H9.24285L9.43653 3.29287L9.50779 3.80356L9.97191 4.01777C10.1723 4.11797 10.387 4.23157 10.5771 4.3583C10.5772 4.35834 10.5771 4.35827 10.5771 4.3583L10.993 4.63163L11.4563 4.45346L12.7707 3.93799L14.0029 6.00021L12.9176 6.8271L12.5018 7.14783L12.5492 7.66949C12.5493 7.66965 12.5492 7.66933 12.5492 7.66949C12.562 7.78458 12.562 7.89968 12.562 7.99891V8.00111C12.562 8.10035 12.562 8.21496 12.5493 8.33005C12.5493 8.33021 12.5493 8.32989 12.5493 8.33005L12.5018 8.85219L12.9173 9.17274L14.0027 9.99969L12.7835 12.062L11.4566 11.5467L10.993 11.3684L10.5779 11.6412C10.5777 11.6413 10.578 11.6411 10.5779 11.6412C10.3758 11.7801 10.1729 11.8943 9.97005 11.9831C9.96989 11.9832 9.9702 11.983 9.97005 11.9831L9.50769 12.1965L9.24291 14.05H6.75624L6.56255 12.7071L6.4913 12.1965L6.02717 11.9823C5.82677 11.8821 5.6121 11.7685 5.42198 11.6417C5.42192 11.6417 5.42204 11.6418 5.42198 11.6417L5.00603 11.3684L4.5428 11.5466L3.22835 12.062L1.99621 9.99981L3.0815 9.17292L3.49726 8.85219L3.44979 8.33004C3.43704 8.21495 3.43704 8.10034 3.43704 8.00111V7.99892C3.43704 7.89968 3.43704 7.78508 3.44979 7.66998L3.49726 7.14783L3.08174 6.82728L1.99637 6.00034L3.21559 3.93804L4.54249 4.45334L5.00603 4.63163L5.42164 4.35852C5.62367 4.21966 5.82614 4.10571 6.02904 4.0169L6.49139 3.80351L6.75618 1.95001ZM6.84291 2.05001L6.58269 3.87151L6.07049 4.10791C5.8737 4.19401 5.67554 4.30531 5.47787 4.44121L5.47701 4.44181L5.01805 4.74339L4.50659 4.54668L3.25849 4.06198L2.12771 5.97469L3.14234 6.74774L3.60182 7.10219L3.54925 7.68054C3.5371 7.78986 3.53704 7.89964 3.53704 8.00001C3.53704 8.10039 3.53709 8.21017 3.54924 8.31949L3.54935 8.32048L3.60182 8.89783L3.14258 9.2521L2.12787 10.0252L3.27073 11.938L4.50629 11.4535L5.01805 11.2566L5.477 11.5582C5.66163 11.6813 5.87188 11.7928 6.07121 11.8924L6.58279 12.1286L6.66153 12.6929L6.84285 13.95H9.15618L9.41639 12.1285L9.9295 11.8917C10.1263 11.8056 10.3235 11.6947 10.5212 11.5588L10.5221 11.5582L10.981 11.2566L11.4925 11.4533L12.7406 11.938L13.8714 10.0253L12.8567 9.25228L12.3973 8.89783L12.4497 8.32049L12.4498 8.31949C12.462 8.21017 12.462 8.10039 12.462 8.00001C12.462 7.89964 12.462 7.78985 12.4498 7.68053L12.4497 7.67954L12.3973 7.10219L12.8565 6.74792L13.8712 5.97481L12.7284 4.06203L11.4928 4.54656L10.981 4.74339L10.5221 4.4418C10.3375 4.31871 10.1272 4.20726 9.92788 4.10758L9.41629 3.87147L9.33755 3.30715L9.15623 2.05001H6.84291ZM4.94954 8.00001C4.94954 6.3224 6.32193 4.95001 7.99954 4.95001C9.67716 4.95001 11.0495 6.3224 11.0495 8.00001C11.0495 9.67763 9.67716 11.05 7.99954 11.05C6.32193 11.05 4.94954 9.67763 4.94954 8.00001ZM7.99954 5.05001C6.37716 5.05001 5.04954 6.37763 5.04954 8.00001C5.04954 9.6224 6.37716 10.95 7.99954 10.95C9.62193 10.95 10.9495 9.6224 10.9495 8.00001C10.9495 6.37763 9.62193 5.05001 7.99954 5.05001ZM7.99954 6.05001C6.92716 6.05001 6.04954 6.92763 6.04954 8.00001C6.04954 9.0724 6.92716 9.95001 7.99954 9.95001C9.07193 9.95001 9.94954 9.0724 9.94954 8.00001C9.94954 6.92763 9.07193 6.05001 7.99954 6.05001ZM5.94954 8.00001C5.94954 6.8724 6.87193 5.95001 7.99954 5.95001C9.12716 5.95001 10.0495 6.8724 10.0495 8.00001C10.0495 9.12763 9.12716 10.05 7.99954 10.05C6.87193 10.05 5.94954 9.12763 5.94954 8.00001Z"
															></path></g
														><defs
															><clipPath id="clip0_15422_14214"
																><rect width="16" height="16"></rect></clipPath
															></defs
														></svg
													></span
												>
											</div>
										</div>
										<div class="d66c85b6">
											<span class="_63bc7ce4">{$_('tradingview')}</span><span class="_0fc78741">
											</span><span class="">{$_('depth')}</span><span class="_0fc78741"></span><span
												class="a09788c4"
												><svg
													width="16"
													height="16"
													viewBox="0 0 16 16"
													fill="none"
													xmlns="http://www.w3.org/2000/svg"
													><path
														d="M9.34443 8L12.0575 5.28738L14 7.22995L14 2.00031L8.77058 2.00031L10.7131 3.94288L8 6.65551L9.34443 8Z"
														fill="#616161"
													></path><path
														d="M6.65557 8L3.9425 10.7126L2.00001 8.77005L2.00001 13.9997H7.22942L5.28693 12.0571L8 9.34449L6.65557 8Z"
														fill="#616161"
													></path></svg
												></span
											>
										</div>
									</div>
									<Tradingview pair={data.slug || 'ETH_USDT'} />
								</section>
								<!---->
							</section>
						</div>
						<div class="_21f7c03c">
							<div class="b24f0f42">
								<section class="_6b23a6d3">
									<nav class="cdc6768f" value="orders">
										<span class="bf786d3a">{$_('order-book')}</span><span class=""
											>{$_('market-trades')}</span
										>
									</nav>
									<section class="fa124b69" style="">
										<!---->
										<div class="_57a26a53" value="all">
											<div>
												<span class="_986e6957"
													><svg
														width="18"
														height="14"
														viewBox="0 0 18 14"
														fill="none"
														xmlns="http://www.w3.org/2000/svg"
														><path d="M18 0H0V2H18V0Z" fill="#1A8F5C"></path><path
															d="M18 4H0V6H18V4Z"
															fill="#1A8F5C"
														></path><path d="M18 8H0V10H18V8Z" fill="#1A8F5C"></path><path
															d="M18 12H0V14H18V12Z"
															fill="#1A8F5C"
														></path></svg
													></span
												><span class="_986e6957"
													><svg
														width="18"
														height="14"
														viewBox="0 0 18 14"
														fill="none"
														xmlns="http://www.w3.org/2000/svg"
														><path d="M18 0H0V2H18V0Z" fill="#C44749"></path><path
															d="M18 4H0V6H18V4Z"
															fill="#C44749"
														></path><path d="M18 8H0V10H18V8Z" fill="#C44749"></path><path
															d="M18 12H0V14H18V12Z"
															fill="#C44749"
														></path></svg
													></span
												><span class="_986e6957 _4f405bfc"
													><svg
														width="18"
														height="14"
														viewBox="0 0 18 14"
														fill="none"
														xmlns="http://www.w3.org/2000/svg"
														><path d="M18 0H0V2H18V0Z" fill="#C44749"></path><path
															d="M18 4H0V6H18V4Z"
															fill="#C44749"
														></path><path d="M18 8H0V10H18V8Z" fill="#1A8F5C"></path><path
															d="M18 12H0V14H18V12Z"
															fill="#1A8F5C"
														></path></svg
													></span
												>
											</div>
											<div class="el-dropdown">
												<span
													class="df654141 el-dropdown-selfdefine"
													aria-haspopup="list"
													aria-controls="dropdown-menu-5353"
													role="button"
													tabindex="0"
												>
													0.01<svg
														aria-hidden="true"
														class="svgicon"
														style="width: 9px; height: 6px; min-width: 0px;"
														><use xlink:href="#arrow"></use></svg
													></span
												>
												<ul
													class="el-dropdown-menu el-popper _904f000d"
													id="dropdown-menu-5353"
													style="display: none;"
												>
													<li class="_65045930 _5161a055">
														0.01 <svg
															aria-hidden="true"
															class="svgicon"
															style="width: 15px; height: 10px; min-width: 0px;"
															><use xlink:href="#checked"></use></svg
														>
													</li>
													<li class="_65045930">0.1 <!----></li>
													<li class="_65045930">1 <!----></li>
													<li class="_65045930">10 <!----></li>
													<li class="_65045930">100 <!----></li>
												</ul>
											</div>
										</div>
										<div class="_1658a9d7 c14e70ac">
											<span title="Price(USDT)">{$_('price-usdt')}</span><span title="Amount(ETH)"
												>{$_('amount-eth')}</span
											><span title="Total(USDT)">{$_('total-usdt')}</span>
										</div>
										<div class="_31e5c959 _89980363">
											<div class="bd304729 _9bd73e27">
												<div class="_52218c31">
													<span class="_86c486b8">3,397.41</span><span class="_8054e9cd"
														><span>{$_('mark')}</span><span>3,396.92</span></span
													>
												</div>
												<a href="/trade/orderbook/ETH_USDT" class="_3a629d1d">{$_('g-more')}</a>
											</div>
											<div class="_68e93d14 _85e4ce8e _2fde4712">
												<div class="">
													<div class="_1658a9d7 _360ce864" style="background-size: 0% 100%;">
														<span title="">--</span><span title="">--</span><span title="">--</span>
													</div>
													<div class="_1658a9d7 _360ce864" style="background-size: 0% 100%;">
														<span title="">--</span><span title="">--</span><span title="">--</span>
													</div>
													<div class="_1658a9d7 _360ce864" style="background-size: 0% 100%;">
														<span title="">--</span><span title="">--</span><span title="">--</span>
													</div>
													<div class="_1658a9d7 _360ce864" style="background-size: 0% 100%;">
														<span title="">--</span><span title="">--</span><span title="">--</span>
													</div>
													<div class="_1658a9d7 _360ce864" style="background-size: 0% 100%;">
														<span title="">--</span><span title="">--</span><span title="">--</span>
													</div>
													<div class="_1658a9d7 _360ce864" style="background-size: 0% 100%;">
														<span title="">--</span><span title="">--</span><span title="">--</span>
													</div>
													<div class="_1658a9d7 _360ce864" style="background-size: 0% 100%;">
														<span title="">--</span><span title="">--</span><span title="">--</span>
													</div>
													<div class="_1658a9d7 _360ce864" style="background-size: 0% 100%;">
														<span title="">--</span><span title="">--</span><span title="">--</span>
													</div>
													<div class="_1658a9d7 _360ce864" style="background-size: 0% 100%;">
														<span title="">--</span><span title="">--</span><span title="">--</span>
													</div>
												</div>
											</div>
											<div class="_68e93d14 _90a06506 _36a947c2">
												<div class="">
													<div class="_1658a9d7 _360ce864" style="background-size: 0% 100%;">
														<span title="">--</span><span title="">--</span><span title="">--</span>
													</div>
													<div class="_1658a9d7 _360ce864" style="background-size: 0% 100%;">
														<span title="">--</span><span title="">--</span><span title="">--</span>
													</div>
													<div class="_1658a9d7 _360ce864" style="background-size: 0% 100%;">
														<span title="">--</span><span title="">--</span><span title="">--</span>
													</div>
													<div class="_1658a9d7 _360ce864" style="background-size: 0% 100%;">
														<span title="">--</span><span title="">--</span><span title="">--</span>
													</div>
													<div class="_1658a9d7 _360ce864" style="background-size: 0% 100%;">
														<span title="">--</span><span title="">--</span><span title="">--</span>
													</div>
													<div class="_1658a9d7 _360ce864" style="background-size: 0% 100%;">
														<span title="">--</span><span title="">--</span><span title="">--</span>
													</div>
													<div class="_1658a9d7 _360ce864" style="background-size: 0% 100%;">
														<span title="">--</span><span title="">--</span><span title="">--</span>
													</div>
													<div class="_1658a9d7 _360ce864" style="background-size: 0% 100%;">
														<span title="">--</span><span title="">--</span><span title="">--</span>
													</div>
													<div class="_1658a9d7 _360ce864" style="background-size: 0% 100%;">
														<span title="">--</span><span title="">--</span><span title="">--</span>
													</div>
												</div>
											</div>
										</div>
									</section>
									<!---->
								</section>
							</div>
						</div>
						<!---->
					</section>
					<div class="_15e27295">
						<section class="_96f68a1c">
							<div class="_43a2945c">
								<div data-user-guide="6" class="_6bf69178" style="">
									<span class="_667a0527">{$_('open-orders')}</span><span class=""
										>{$_('order-history')}</span
									><span class="">{$_('trade-history')}</span><span class="">{$_('assets')}</span>
								</div>
								<!---->
							</div>
							<div class="eb859fec _6d122bdf" activeindex="0">
								<div class="_321f1327">
									<button class="_2f8d100e">{$_('limit-market-count')}</button><button class=""
										>{$_('tp-sl-count')}</button
									><button class="">{$_('trailing-stop-count')}</button>
								</div>
								<div
									class="el-table order-table el-table--fit el-table--scrollable-x el-table--enable-row-hover el-table--small d9f59dac"
									style="height: 100%;"
								>
									<div class="hidden-columns">
										<div></div>
										<div></div>
										<div></div>
										<div></div>
										<div dangerouslyusehtmlstring="true"></div>
										<div></div>
										<div></div>
										<div></div>
										<div></div>
										<div></div>
									</div>
									<div class="el-table__header-wrapper">
										<table
											cellspacing="0"
											cellpadding="0"
											border="0"
											class="el-table__header"
											style="width: 1556px;"
										>
											<colgroup
												><col name="el-table_6_column_44" width="130" /><col
													name="el-table_6_column_45"
													width="150"
												/><col name="el-table_6_column_46" width="80" /><col
													name="el-table_6_column_47"
													width="80"
												/><col name="el-table_6_column_58" width="80" /><col
													name="el-table_6_column_49"
													width="80"
												/><col name="el-table_6_column_50" width="80" /><col
													name="el-table_6_column_60"
													width="80"
												/><col name="el-table_6_column_61" width="80" /><col
													name="el-table_6_column_53"
													width="80"
												/><col name="gutter" width="0" /></colgroup
											><thead class="has-gutter"
												><tr class=""
													><th
														colspan="1"
														rowspan="1"
														class="el-table_6_column_44 d807dae7 is-leaf el-table__cell"
														><div class="cell">{$_('g-date')}</div></th
													><th
														colspan="1"
														rowspan="1"
														class="el-table_6_column_45 is-leaf el-table__cell"
														><div class="cell">{$_('g-symbol')}</div></th
													><th
														colspan="1"
														rowspan="1"
														class="el-table_6_column_46 is-leaf el-table__cell"
														><div class="cell">{$_('g-type')}</div></th
													><th
														colspan="1"
														rowspan="1"
														class="el-table_6_column_47 is-leaf el-table__cell"
														><div class="cell">{$_('g-side')}</div></th
													><th
														colspan="1"
														rowspan="1"
														class="el-table_6_column_58 is-leaf el-table__cell"
														><div class="cell">{$_('g-price')}</div></th
													><th
														colspan="1"
														rowspan="1"
														class="el-table_6_column_49 is-leaf el-table__cell"
														><div class="cell">{$_('g-qty')}</div></th
													><th
														colspan="1"
														rowspan="1"
														class="el-table_6_column_50 is-leaf el-table__cell"
														><div class="cell">{$_('g-amount')}</div></th
													><th
														colspan="1"
														rowspan="1"
														class="el-table_6_column_60 is-leaf el-table__cell"
														><div class="cell">{$_('g-filled')}</div></th
													><th
														colspan="1"
														rowspan="1"
														class="el-table_6_column_61 is-leaf el-table__cell"
														><div class="cell">{$_('g-unfilled')}</div></th
													><th
														colspan="1"
														rowspan="1"
														class="el-table_6_column_53 is-right is-leaf el-table__cell"
														><div class="cell"><span>{$_('g-action')}</span></div></th
													><th class="el-table__cell gutter" style="width: 0px; display: none;"
													></th></tr
												></thead
											>
										</table>
									</div>
									<div class="el-table__body-wrapper is-scrolling-left" style="height: 219px;">
										<table
											cellspacing="0"
											cellpadding="0"
											border="0"
											class="el-table__body"
											style="width: 920px;"
										>
											<colgroup
												><col name="el-table_6_column_44" width="130" /><col
													name="el-table_6_column_45"
													width="150"
												/><col name="el-table_6_column_46" width="80" /><col
													name="el-table_6_column_47"
													width="80"
												/><col name="el-table_6_column_58" width="80" /><col
													name="el-table_6_column_49"
													width="80"
												/><col name="el-table_6_column_50" width="80" /><col
													name="el-table_6_column_60"
													width="80"
												/><col name="el-table_6_column_61" width="80" /><col
													name="el-table_6_column_53"
													width="80"
												/></colgroup
											><tbody><!----></tbody>
										</table>
										<div class="el-table__empty-block" style="height: 100%; width: 920px;">
											<span class="el-table__empty-text"
												><div class="e0263add">
													<div class="_4309a313">
														<svg
															width="60"
															height="60"
															viewBox="0 0 60 60"
															fill="none"
															xmlns="http://www.w3.org/2000/svg"
															><path
																fill-rule="evenodd"
																clip-rule="evenodd"
																d="M10.1816 13.6357C9.07707 13.6357 8.18164 14.5312 8.18164 15.6357V32.7267H27.2726V27.2721H25.5459C24.9936 27.2721 24.5459 26.8244 24.5459 26.2721V20.0903C24.5459 19.538 24.9936 19.0903 25.5459 19.0903H27.2726V13.6357H10.1816Z"
																fill="#E3E3E3"
															></path><path
																fill-rule="evenodd"
																clip-rule="evenodd"
																d="M46.3643 32.7266H27.2734V51.8175H44.3643C45.4689 51.8175 46.3643 50.922 46.3643 49.8175V32.7266ZM39.9102 35.4538C40.4624 35.4538 40.9102 35.0061 40.9102 34.4538V32.7266L32.7283 32.7266V34.4538C32.7283 35.0061 33.1761 35.4538 33.7283 35.4538L39.9102 35.4538Z"
																fill="#E3E3E3"
															></path><path
																fill-rule="evenodd"
																clip-rule="evenodd"
																d="M13.6367 31C13.6367 30.4477 14.0844 30 14.6367 30H20.8185C21.3708 30 21.8185 30.4477 21.8185 31V32.7273H27.2726V51.8182H10.1816C9.07707 51.8182 8.18164 50.9228 8.18164 49.8182V32.7273H13.6367V31ZM30 39.1818C30 38.6295 29.5523 38.1818 29 38.1818H27.2727L27.2727 46.3636H29C29.5523 46.3636 30 45.9159 30 45.3636V39.1818Z"
																fill="#F2F2F2"
															></path><path
																fill-rule="evenodd"
																clip-rule="evenodd"
																d="M36.7734 29.5887C37.1639 29.9793 37.7971 29.9792 38.1876 29.5887L39.2971 28.4793L42.96 32.1422L55.0451 20.0571C55.8261 19.2761 55.8261 18.0097 55.0451 17.2287L42.96 5.14358L39.2152 8.88841L38.1879 7.86112C37.7973 7.4706 37.1642 7.47059 36.7736 7.86112L32.4024 12.2323C32.0119 12.6228 32.0119 13.256 32.4024 13.6465L33.4297 14.6738L29.4607 18.6429L33.5116 22.6939L32.4022 23.8033C32.0117 24.1938 32.0117 24.827 32.4022 25.2175L36.7734 29.5887ZM46.1593 14.9888L46.4325 15.262C46.823 15.6525 46.823 16.2857 46.4325 16.6762L43.6282 19.4805C43.2376 19.871 42.6045 19.871 42.2139 19.4805L41.9407 19.2073C41.5502 18.8168 41.5502 18.1836 41.9407 17.7931L44.7451 14.9888C45.1356 14.5983 45.7688 14.5983 46.1593 14.9888ZM41.097 20.051L41.3702 20.3242C41.7608 20.7147 41.7608 21.3479 41.3702 21.7384L41.097 22.0116C40.7065 22.4022 40.0733 22.4022 39.6828 22.0116L39.4096 21.7384C39.0191 21.3479 39.0191 20.7147 39.4096 20.3242L39.6828 20.051C40.0733 19.6605 40.7065 19.6605 41.097 20.051Z"
																fill="#B8B8B8"
															></path><rect
																x="11.5908"
																y="38.1816"
																width="12.2727"
																height="2.04545"
																rx="0.5"
																fill="#E3E3E3"
															></rect><rect
																x="11.5908"
																y="44.3184"
																width="12.2727"
																height="2.04545"
																rx="0.5"
																fill="#E3E3E3"
															></rect></svg
														>
														<p>{$_('no-data')}</p>
													</div>
													<div class="_9e7987dd">
														<a href="/login">{$_('log-in')}</a>{$_('or-lc')}<a href="/signup"
															>{$_('sign-up')}</a
														>{$_('now-to-trade')}
													</div>
												</div></span
											>
										</div>
										<!---->
									</div>
									<!----><!----><!----><!---->
									<div class="el-table__column-resize-proxy" style="display: none;"></div>
								</div>
							</div>
						</section>
					</div>
				</section>
				<section class="_13e551a7">
					<div class="d568c879">
						<section class="_23f4b355">
							<nav class="_3f2fed70">
								<button class="ad797042">{$_('g-buy')}</button><button class=""
									>{$_('g-sell')}</button
								>
							</nav>
							<div data-user-guide="4" class="" style="">
								<div data-user-guide-4="" class="_9654432c">
									<div class="_19abeeda">
										<span class="polo-switch polo-switch-middle is-disabled"
											><span class="polo-switch-box"
												><input type="checkbox" true-value="true" disabled={true} /></span
											></span
										>
										<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
										<span
											class="el-tooltip tips-text _13a24dcf _5ee158b0"
											aria-describedby="el-tooltip-2434"
											tabindex="0">{$_('g-autoborrow')}</span
										>
									</div>
									<div class="el-dropdown">
										<div
											data-user-guide="7"
											class="_54b36967 el-dropdown-selfdefine"
											aria-haspopup="list"
											aria-controls="dropdown-menu-6203"
											role="button"
											tabindex="0"
											style=""
										>
											<em class="_4ccc8f9f"></em>
										</div>
									</div>
								</div>
								<div data-user-guide="3" class="" style="">
									<div class="_0fbcf1c2">
										<div class="_724c340a">
											<span class="e0093a3f _8c3dc366">{$_('g-limit')}</span><span class="e0093a3f"
												>{$_('g-market')}</span
											>
											<div class="el-dropdown _11f0f85e">
												<span
													class="e0093a3f el-dropdown-selfdefine"
													aria-haspopup="list"
													aria-controls="dropdown-menu-618"
													role="button"
													tabindex="0"
													>{$_('stop-limit')}<svg
														aria-hidden="true"
														class="svgicon"
														style="width: 9px; height: 6px; min-width: 0px;"
														><use xlink:href="#arrow"></use></svg
													></span
												>
												<ul
													class="el-dropdown-menu el-popper b408bec8"
													id="dropdown-menu-618"
													style="display: none;"
												>
													<li class="d911f463">{$_('stop-limit')}</li>
													<li class="d911f463">{$_('stop-market')}</li>
													<li class="d911f463">{$_('g-trading-stop-category')}</li>
												</ul>
											</div>
										</div>
										<span class="_9d87404a"
											><svg
												aria-hidden="true"
												class="svgicon el-tooltip"
												aria-describedby="el-tooltip-5833"
												tabindex="0"
												style="width: 12px; height: 12px; min-width: 12px;"
												><use xlink:href="#question"></use></svg
											></span
										>
									</div>
									<div data-v-39752d79="" class="order-form _8a4bb888">
										<!----><!----><!---->
										<div data-key="price" class="form-item" data-v-39752d79="">
											<!---->
											<div class="form-item-content">
												<div class="polo-input right polo-input-small polo-input-default">
													<span class="input-prefix">{$_('g-price')}</span><input
														type="text"
														placeholder=""
													/><span class="input-suffix">USDT</span>
												</div>
												<div class="tool-box" style="display: none;">
													<div class="tooltips"><i></i></div>
													<!---->
												</div>
											</div>
										</div>
										<div data-key="quantity" class="form-item" data-v-39752d79="">
											<!---->
											<div class="form-item-content">
												<div class="polo-input right polo-input-small polo-input-default">
													<span class="input-prefix">{$_('g-qty')}</span><input
														type="text"
														placeholder=""
													/><span class="input-suffix">ETH</span>
												</div>
												<div class="tool-box" style="display: none;">
													<div class="tooltips"><i></i></div>
													<!---->
												</div>
											</div>
										</div>
										<div data-key="" class="form-item" data-v-39752d79="">
											<!---->
											<div class="form-item-content">
												<div class="c1494ea4">
													<dl>
														<dt
															class="el-tooltip tips-text _69279727"
															aria-describedby="el-tooltip-7556"
															tabindex="0"
														>
															{$_('g-available')}
														</dt>
														<dd>
															<span class="dcf97881">--</span><span>USDT</span><a
																data-user-guide="2"
																href="/wallet/deposit/ETH/"
																class="dfad9a60"
																style=""
																><svg
																	aria-hidden="true"
																	class="svgicon"
																	style="width: 14px; height: 14px; min-width: 14px;"
																	><use xlink:href="#deposit"></use></svg
																></a
															>
														</dd>
													</dl>
												</div>
												<!---->
											</div>
										</div>
										<div class="c37e339e" data-v-39752d79="">
											<div class="_8896a707">
												<em class="_801097a7" style="transform: translateX(0px);"><!----></em>
												<div class="_058566e8">
													<span class="a8700312" style="width: 25%;"><em></em></span><span
														class="a8700312"
														style="width: 25%;"><em></em></span
													><span class="a8700312" style="width: 25%;"><em></em></span><span
														class="a8700312"
														style="width: 25%;"><em></em></span
													><span class="a8700312" style="width: 25%;"><em></em></span>
												</div>
												<div class="fc6cc505">
													<span></span><span style="width: 0%; display: none;"></span>
												</div>
												<div class="_5803cb7f" style="width: 0%;">
													<span style="width: 244px;"></span><span style="display: none;"></span>
												</div>
											</div>
										</div>
										<div class="c1783486" data-v-39752d79="">
											<!---->
											<dl style="display: none;">
												<dt>
													<span
														class="el-tooltip tips-text _6dd30582"
														aria-describedby="el-tooltip-1968"
														tabindex="0">{$_('margin-ratio-repay-debts-title')}</span
													>
												</dt>
												<dd class="c4065325">ETH</dd>
											</dl>
										</div>
										<div data-key="amount" class="form-item f3a05fb6" data-v-39752d79="">
											<!---->
											<div class="form-item-content">
												<div class="polo-input right polo-input-small polo-input-default">
													<span class="input-prefix">{$_('g-amount')}</span><input
														type="text"
														placeholder=""
													/><!----><span class="_3d54521c">USDT</span>
												</div>
												<div class="tool-box" style="display: none;">
													<div class="tooltips"><i></i></div>
													<!---->
												</div>
											</div>
										</div>
										<!---->
										<div data-key="" class="form-item" data-v-39752d79="">
											<!---->
											<div class="form-item-content">
												<div class="dd39985f">
													<div class="_07442100">
														<span class="ae48005d"
															>{$_('advanced')}<svg
																aria-hidden="true"
																class="svgicon"
																style="width: 9px; height: 5px; min-width: 0px;"
																><use xlink:href="#arrow"></use></svg
															></span
														>
													</div>
													<div class="a8d68229" style="display: none;">
														<label class="_24fd45b5 _5c2e6257"
															><input true-value="true" type="checkbox" /><i
																><svg
																	width="12"
																	height="12"
																	viewBox="0 0 12 12"
																	fill="none"
																	xmlns="http://www.w3.org/2000/svg"
																	style="display: none;"
																	><path
																		fill-rule="evenodd"
																		clip-rule="evenodd"
																		d="M12 0H0V12H12V0ZM5.53217 9.093L10.0606 3.9985L8.9395 3.00195L5.46794 6.90745L3.53039 4.9699L2.46973 6.03056L5.53217 9.093Z"
																		fill="#131316"
																	></path></svg
																></i
															>{$_('post-only')}</label
														>
													</div>
												</div>
												<!---->
											</div>
										</div>
										<div class="_89425504" data-v-39752d79="">
											<button
												type="button"
												class="polo-btn polo-btn-button polo-btn-positive polo-btn-small"
												style="width: 100%;"
												><!---->
												<div class="btn-sp">{$_('buy-eth')}</div></button
											>
											<div class="e8cd35f1">
												<a href="/login">{$_('log-in')}</a>{$_('or-lc')}<a href="/signup"
													>{$_('sign-up')}</a
												>
											</div>
										</div>
									</div>
								</div>
							</div>
							<!---->
						</section>
					</div>
					<div class="bf4db17d">
						<section class="b44d3422">
							<div data-user-guide="5" class="" style="">
								<div class="_43fe473e">{$_('assets')}<!----></div>
								<div class="c9ee1d63">
									<div class="_596549f7">
										<span>ETH<em>{$_('balance')}</em></span><span>--</span>
									</div>
									<div class="_596549f7">
										<span>USDT<em>{$_('balance')}</em></span><span>--</span>
									</div>
								</div>
								<div class="_11817139">
									<a href="javascript:;" class="_6fda91af edd5a9be">{$_('g-deposit')}</a><a
										href="javascript:;"
										class="_6fda91af edd5a9be">{$_('g-buy-crypto')}</a
									>
								</div>
								<div class="_2ef9552d">
									<div class="_09b06b13">
										<svg
											width="60"
											height="60"
											viewBox="0 0 60 60"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
											><ellipse
												cx="30.0029"
												cy="30.0003"
												rx="25.5263"
												ry="25.5018"
												fill="url(#paint0_linear_5718_5097)"
											></ellipse><mask
												id="mask0_5718_5097"
												maskUnits="userSpaceOnUse"
												x="4"
												y="4"
												width="52"
												height="52"
												style="mask-type: alpha;"
												><ellipse
													cx="30.0263"
													cy="30.0003"
													rx="25.5263"
													ry="25.5018"
													fill="url(#paint1_linear_5718_5097)"
												></ellipse></mask
											><g mask="url(#mask0_5718_5097)"
												><path
													d="M40.6804 40.0944L34.4776 36.5073L28.2578 40.0944L34.4776 43.6563L40.6804 40.0944Z"
													fill="#089E33"
													stroke="black"
													stroke-width="0.241254"
												></path><path
													d="M34.49 43.6701L28.2872 40.083L22.0674 43.6701L28.2872 47.232L34.49 43.6701Z"
													fill="#1FC44E"
													stroke="black"
													stroke-width="0.241254"
												></path><path
													d="M28.2957 47.2414L22.0929 43.6543L15.873 47.2414L22.0929 50.8033L28.2957 47.2414Z"
													fill="#089E33"
													stroke="black"
													stroke-width="0.241254"
												></path><path
													d="M15.876 48.3251V47.2451L34.5329 57.9386V59.0248L15.876 48.3251Z"
													fill="#29C756"
													stroke="black"
													stroke-width="0.241254"
												></path><path
													d="M15.876 48.3251V47.2451L22.0924 50.8199V51.9061L15.876 48.3251Z"
													fill="#0DA036"
													stroke="black"
													stroke-width="0.241254"
												></path><path
													d="M28.3154 55.4467V54.3667L34.5319 57.9415V59.0277L28.3154 55.4467Z"
													fill="#0DA036"
													stroke="black"
													stroke-width="0.241254"
												></path><path
													d="M53.1016 48.3141V47.2451L34.5361 57.9354V59.0105L53.1016 48.3141Z"
													fill="#1ADE51"
													stroke="black"
													stroke-width="0.241254"
												></path><path
													d="M46.8884 43.6701L40.6857 40.083L34.4658 43.6701L40.6857 47.232L46.8884 43.6701Z"
													fill="#1FC44E"
													stroke="black"
													stroke-width="0.241254"
												></path><path
													d="M40.697 47.2414L34.4942 43.6543L28.2744 47.2414L34.4942 50.8033L40.697 47.2414Z"
													fill="#FFB8B8"
													stroke="black"
													stroke-width="0.241254"
												></path><path
													d="M34.5037 50.8156L28.3009 47.2285L22.0811 50.8156L28.3009 54.3775L34.5037 50.8156Z"
													fill="#1FC44E"
													stroke="black"
													stroke-width="0.241254"
												></path><path
													d="M53.1023 47.2414L46.8995 43.6543L40.6797 47.2414L46.8995 50.8033L53.1023 47.2414Z"
													fill="#009B2C"
													stroke="black"
													stroke-width="0.241254"
												></path><path
													d="M46.9089 50.8156L40.7062 47.2285L34.4863 50.8156L40.7062 54.3775L46.9089 50.8156Z"
													fill="#1FC44E"
													stroke="black"
													stroke-width="0.241254"
												></path><path
													d="M46.9082 51.9311V50.8511L40.6918 54.4259V55.5121L46.9082 51.9311Z"
													fill="#58FF87"
													stroke="black"
													stroke-width="0.241254"
												></path><path
													d="M40.7175 54.3933L34.5148 50.8062L28.2949 54.3933L34.5148 57.9551L40.7175 54.3933Z"
													fill="#009B2C"
													stroke="black"
													stroke-width="0.241254"
												></path><path
													d="M34.4863 39.8687V50.8037L40.6692 47.196L34.5717 39.8379C34.5429 39.8031 34.4863 39.8235 34.4863 39.8687Z"
													fill="#F1F395"
													stroke="black"
													stroke-width="0.241254"
												></path><path
													d="M34.5332 39.8687V50.8037L28.3503 47.196L34.4478 39.8379C34.4766 39.8031 34.5332 39.8235 34.5332 39.8687Z"
													fill="#DBDD68"
													stroke="black"
													stroke-width="0.241254"
												></path><path
													d="M34.5235 43.2296L32.4238 42.2267L34.4965 39.7417L34.5235 43.2296Z"
													fill="black"
												></path><path
													opacity="0.4"
													d="M36.6199 42.2149L34.6053 43.2178L34.6052 39.7521L36.6199 42.2149Z"
													fill="black"
												></path><path
													opacity="0.15"
													d="M22.1697 51.9759L15.8604 48.3528V47.25L34.492 36.5044L43.4202 41.7444C36.8354 45.6198 29.948 48.9563 22.8254 51.7213L22.1697 51.9759Z"
													fill="black"
												></path></g
											><path
												fill-rule="evenodd"
												clip-rule="evenodd"
												d="M34.8483 24.1035C32.8694 26.0011 32.0648 28.3996 33.051 29.4608C33.0572 29.4674 33.0634 29.474 33.0697 29.4805L33.0674 29.4828L33.7986 30.2438L34.1067 29.9484C35.2882 30.0738 36.9682 29.338 38.4197 27.9462C39.8711 26.5543 40.6909 24.8929 40.6355 23.6875L40.9647 23.3718L40.2666 22.6452C40.2506 22.626 40.234 22.6073 40.2169 22.5889C39.2307 21.5278 36.8271 22.2059 34.8483 24.1035Z"
												fill="#D6D6D6"
											></path><path
												d="M33.051 29.4608L32.9625 29.5428L32.9626 29.5428L33.051 29.4608ZM33.0697 29.4805L33.1533 29.5675L33.2406 29.4838L33.1566 29.3968L33.0697 29.4805ZM33.0674 29.4828L32.9838 29.3958L32.8968 29.4793L32.9803 29.5663L33.0674 29.4828ZM33.7986 30.2438L33.7115 30.3273L33.7951 30.4143L33.8822 30.3308L33.7986 30.2438ZM34.1067 29.9484L34.1194 29.8285L34.0636 29.8226L34.0231 29.8614L34.1067 29.9484ZM40.6355 23.6875L40.5519 23.6005L40.5125 23.6384L40.515 23.693L40.6355 23.6875ZM40.9647 23.3718L41.0483 23.4588L41.1353 23.3753L41.0518 23.2883L40.9647 23.3718ZM40.2666 22.6452L40.1737 22.7226L40.1795 22.7287L40.2666 22.6452ZM40.2169 22.5889L40.3054 22.5069L40.2169 22.5889ZM33.1394 29.3787C32.6913 28.8966 32.6322 28.0878 32.9522 27.1341C33.2701 26.1864 33.9537 25.1284 34.9318 24.1905L34.7647 24.0165C33.764 24.9762 33.0559 26.0662 32.7233 27.0575C32.3928 28.0427 32.4244 28.9638 32.9625 29.5428L33.1394 29.3787ZM33.1566 29.3968C33.1508 29.3909 33.1451 29.3848 33.1394 29.3787L32.9626 29.5428C32.9693 29.55 32.9761 29.5572 32.9829 29.5643L33.1566 29.3968ZM33.151 29.5698L33.1533 29.5675L32.9862 29.3936L32.9838 29.3958L33.151 29.5698ZM33.8857 30.1603L33.1545 29.3993L32.9803 29.5663L33.7115 30.3273L33.8857 30.1603ZM34.0231 29.8614L33.715 30.1568L33.8822 30.3308L34.1903 30.0354L34.0231 29.8614ZM38.3361 27.8592C37.6191 28.5467 36.8474 29.0705 36.1118 29.4066C35.3747 29.7434 34.6816 29.8882 34.1194 29.8285L34.0939 30.0683C34.7133 30.134 35.451 29.9736 36.2122 29.6259C36.9748 29.2775 37.7688 28.7375 38.5032 28.0331L38.3361 27.8592ZM40.515 23.693C40.568 24.849 39.7756 26.4788 38.3361 27.8592L38.5032 28.0331C39.9667 26.6298 40.8137 24.9369 40.7561 23.682L40.515 23.693ZM40.8811 23.2848L40.5519 23.6005L40.7191 23.7745L41.0483 23.4588L40.8811 23.2848ZM40.1795 22.7287L40.8776 23.4553L41.0518 23.2883L40.3536 22.5617L40.1795 22.7287ZM40.1285 22.6709C40.1441 22.6877 40.1593 22.7049 40.1739 22.7224L40.3592 22.568C40.3419 22.5472 40.3239 22.5268 40.3054 22.5069L40.1285 22.6709ZM34.9318 24.1905C35.91 23.2525 36.9888 22.6204 37.9376 22.3527C38.8922 22.0834 39.6813 22.1898 40.1285 22.6709L40.3054 22.5069C39.7663 21.9268 38.8605 21.8418 37.872 22.1206C36.8777 22.4011 35.7653 23.0569 34.7647 24.0165L34.9318 24.1905Z"
												fill="black"
											></path><ellipse
												rx="4.96421"
												ry="2.62307"
												transform="matrix(-0.721762 0.692141 -0.680772 -0.732474 37.3862 26.8144)"
												fill="#F9F9F9"
												stroke="black"
												stroke-width="0.241254"
											></ellipse><ellipse
												rx="4.14638"
												ry="2.05653"
												transform="matrix(-0.721762 0.692141 -0.680772 -0.732474 37.3846 26.8157)"
												fill="#DDDDDD"
												stroke="black"
												stroke-width="0.241254"
											></ellipse><path
												fill-rule="evenodd"
												clip-rule="evenodd"
												d="M40.122 23.7413C40.5885 24.6714 39.8627 26.4253 38.3574 27.8688C36.8664 29.2987 35.1199 29.9354 34.2247 29.4356C33.7582 28.5055 34.484 26.7516 35.9893 25.3081C37.4803 23.8783 39.2268 23.2415 40.122 23.7413Z"
												fill="white"
											></path><path
												d="M40.122 23.7413L40.2299 23.6873L40.2133 23.6541L40.1809 23.636L40.122 23.7413ZM34.2247 29.4356L34.1168 29.4896L34.1334 29.5228L34.1658 29.5409L34.2247 29.4356ZM40.0141 23.7953C40.2236 24.2131 40.1743 24.8421 39.868 25.5656C39.564 26.2833 39.0166 27.0695 38.2738 27.7818L38.441 27.9558C39.2035 27.2246 39.7716 26.4121 40.0903 25.6595C40.4065 24.9126 40.4869 24.1996 40.2299 23.6873L40.0141 23.7953ZM38.2738 27.7818C37.5381 28.4874 36.7423 28.9942 36.0252 29.2629C35.3026 29.5338 34.6849 29.5544 34.2835 29.3304L34.1658 29.5409C34.6598 29.8166 35.3629 29.7688 36.11 29.4887C36.8628 29.2066 37.6858 28.68 38.441 27.9558L38.2738 27.7818ZM34.3326 29.3816C34.1231 28.9639 34.1724 28.3348 34.4787 27.6114C34.7827 26.8936 35.3301 26.1074 36.0729 25.3951L35.9057 25.2211C35.1432 25.9523 34.5751 26.7648 34.2564 27.5174C33.9402 28.2644 33.8598 28.9773 34.1168 29.4896L34.3326 29.3816ZM36.0729 25.3951C36.8086 24.6895 37.6044 24.1828 38.3215 23.914C39.0441 23.6431 39.6618 23.6225 40.0632 23.8466L40.1809 23.636C39.6869 23.3603 38.9838 23.4082 38.2367 23.6882C37.4839 23.9704 36.6609 24.4969 35.9057 25.2211L36.0729 25.3951Z"
												fill="black"
											></path><path
												fill-rule="evenodd"
												clip-rule="evenodd"
												d="M37.1595 28.642C37.1399 28.6739 37.0939 28.6961 37.0567 28.6917L35.0525 28.4525C35.0153 28.448 35.0011 28.4186 35.0206 28.3868L35.0764 28.2961C35.096 28.2642 35.142 28.242 35.1791 28.2464L37.1834 28.4857C37.2206 28.4901 37.2348 28.5195 37.2152 28.5514L37.1595 28.642ZM35.9619 28.2531C35.999 28.2575 36.045 28.2353 36.0646 28.2034L36.1054 28.137C36.0253 28.1223 35.9509 28.1035 35.8823 28.0804L35.8243 28.1747C35.8047 28.2066 35.819 28.236 35.8561 28.2404L35.9619 28.2531ZM35.954 27.9639L36.2686 27.4521C36.2839 27.4694 36.302 27.4855 36.323 27.5005C36.3585 27.5263 36.4035 27.5474 36.458 27.5636L36.1756 28.0229C36.0947 28.0077 36.0209 27.988 35.954 27.9639ZM36.415 28.1725L36.3734 28.24C36.3538 28.2719 36.3681 28.3013 36.4052 28.3057L36.511 28.3184C36.5481 28.3228 36.5941 28.3006 36.6137 28.2687L36.6719 28.1742C36.5866 28.1778 36.501 28.1772 36.415 28.1725ZM36.7432 28.0581C36.6582 28.0626 36.5721 28.0627 36.4851 28.0583L36.7645 27.6041C36.8585 27.6052 36.9459 27.5963 37.0267 27.5774C37.0315 27.5763 37.0362 27.5751 37.041 27.5739L36.7432 28.0581ZM37.8536 26.2523L38.2666 25.5806C38.2317 25.5462 38.1833 25.5174 38.1194 25.4952C38.1038 25.4897 38.0875 25.4847 38.0706 25.4799L37.6534 26.1584C37.7237 26.1884 37.7905 26.2197 37.8536 26.2523ZM37.5806 26.2768C37.6508 26.3077 37.717 26.3398 37.7792 26.3732L37.4389 26.9267C37.4189 26.9091 37.3962 26.8917 37.3707 26.8745C37.3365 26.8519 37.2979 26.8291 37.255 26.8064L37.5806 26.2768ZM37.3961 26.0381L37.7652 25.4378C37.6812 25.4359 37.61 25.4428 37.5504 25.4559C37.5271 25.4612 37.5054 25.4672 37.4851 25.4738L37.2164 25.9108C37.2308 25.9268 37.2496 25.9438 37.2737 25.9619C37.3053 25.9855 37.3459 26.0109 37.3961 26.0381ZM37.1348 26.0435C37.1402 26.0478 37.1458 26.0521 37.1516 26.0565C37.1947 26.0887 37.2514 26.1229 37.3217 26.159L36.9961 26.6885C36.9239 26.6582 36.857 26.6273 36.7953 26.5956L37.1348 26.0435ZM37.5646 25.3445C37.6462 25.3271 37.7365 25.3201 37.8355 25.3234L38.1133 24.8717C38.0266 24.866 37.9418 24.8642 37.8586 24.8664L37.5646 25.3445ZM37.9296 24.751C38.0132 24.7495 38.0978 24.7518 38.1834 24.7577L38.3244 24.5283C38.344 24.4964 38.3298 24.467 38.2926 24.4626L38.1869 24.4499C38.1497 24.4455 38.1037 24.4677 38.0841 24.4996L37.9296 24.751ZM38.42 24.9117L38.1413 25.3649C38.1674 25.3716 38.1924 25.3791 38.2163 25.3874C38.2664 25.4049 38.3097 25.4262 38.3461 25.4513L38.6411 24.9716C38.5702 24.9474 38.4965 24.9274 38.42 24.9117ZM38.7126 24.8553C38.6412 24.8321 38.5671 24.8128 38.4903 24.7974L38.6333 24.5649C38.6528 24.533 38.6988 24.5108 38.736 24.5152L38.8417 24.5279C38.8789 24.5323 38.8931 24.5617 38.8736 24.5936L38.7126 24.8553ZM36.7213 26.7159L36.3638 27.2974C36.3741 27.3375 36.3996 27.3734 36.4437 27.4048L36.444 27.405L36.4443 27.4053C36.4663 27.4213 36.4944 27.4356 36.5293 27.4477L36.9235 26.8065C36.8516 26.7771 36.7842 26.7469 36.7213 26.7159ZM37.1803 26.9278L36.8351 27.4892C36.9095 27.489 36.9748 27.4813 37.0317 27.4681C37.065 27.4601 37.0953 27.4508 37.123 27.4404L37.3554 27.0624C37.3323 27.0334 37.2986 27.003 37.2521 26.9716C37.2302 26.9572 37.2063 26.9426 37.1803 26.9278Z"
												fill="black"
											></path><path
												d="M37.0819 25.6689C37.036 25.7481 37.0163 25.8184 37.0228 25.8801C37.0275 25.9416 37.0697 26.0022 37.1494 26.0617C37.2291 26.1213 37.355 26.1874 37.5272 26.2601C37.7194 26.3406 37.8835 26.4304 38.0193 26.5295C38.1551 26.6286 38.2428 26.7425 38.2824 26.8713C38.3194 27.0014 38.2881 27.1526 38.1882 27.325C38.0908 27.4931 37.9491 27.6363 37.7629 27.7544C37.5751 27.8724 37.3612 27.9582 37.1212 28.0117C36.8795 28.0651 36.6295 28.0797 36.3712 28.0556C36.1013 28.0303 35.8922 27.9669 35.7438 27.8651C35.5938 27.7632 35.506 27.6359 35.4804 27.4831C35.4547 27.3302 35.4743 27.2108 35.5774 27.0327L36.2814 27.0508C36.2258 27.1468 36.2008 27.2339 36.2066 27.3119C36.2107 27.3897 36.2488 27.4543 36.3209 27.5057C36.3913 27.557 36.499 27.5894 36.644 27.603C36.7839 27.616 36.9108 27.6093 37.0246 27.5827C37.1367 27.5559 37.2337 27.5143 37.3155 27.4579C37.3957 27.4014 37.4575 27.3357 37.5009 27.2608C37.5434 27.1873 37.5536 27.1197 37.5313 27.0581C37.5074 26.9963 37.4531 26.9368 37.3685 26.8798C37.2822 26.8226 37.168 26.765 37.0259 26.707C36.7986 26.6143 36.6216 26.5151 36.4948 26.4094C36.3664 26.3036 36.2929 26.185 36.2741 26.0537C36.2545 25.9238 36.293 25.7754 36.3896 25.6087C36.4919 25.4321 36.634 25.2853 36.816 25.1682C36.9979 25.0512 37.2069 24.9679 37.4428 24.9185C37.6762 24.8703 37.9254 24.8586 38.1903 24.8833C38.367 24.8998 38.5305 24.936 38.6808 24.9917C38.8287 25.0487 38.9493 25.1241 39.0427 25.2177C39.1352 25.3127 39.1871 25.4263 39.1984 25.5584C39.2088 25.6919 39.1845 25.7968 39.0871 25.9649L38.3781 25.9464C38.4346 25.849 38.4646 25.7639 38.468 25.6912C38.469 25.6198 38.448 25.559 38.405 25.5088C38.3596 25.4599 38.2959 25.4212 38.2141 25.3927C38.1322 25.3642 38.0372 25.3449 37.9288 25.3348C37.7889 25.3217 37.6645 25.3272 37.5557 25.3513C37.4444 25.3766 37.3491 25.4169 37.2697 25.472C37.1887 25.527 37.1261 25.5926 37.0819 25.6689Z"
												fill="black"
											></path><path
												d="M10.6969 49.0811L2.09668 44.1349L3.64255 43.4139C20.1845 35.6984 36.002 26.5166 50.9054 15.9785L59.5251 19.1173V20.9632C44.6152 31.4885 28.7925 40.6573 12.2468 48.3596L10.6969 49.0811Z"
												fill="black"
												stroke="black"
												stroke-width="0.241254"
											></path><path
												d="M2.05957 44.1281V42.3345L10.6709 47.2443V49.0753L2.05957 44.1281Z"
												fill="#DBDD68"
												stroke="black"
												stroke-width="0.241254"
											></path><path
												d="M10.6969 47.2515L2.09668 42.3052L3.64255 41.5842C20.1845 33.8688 36.002 24.687 50.9054 14.1489L59.5251 19.1335C44.6152 29.6589 28.7926 38.8277 12.2468 46.53L10.6969 47.2515Z"
												fill="#F1F395"
												stroke="black"
												stroke-width="0.241254"
											></path><ellipse
												opacity="0.15"
												cx="13.4226"
												cy="41.3146"
												rx="7.72338"
												ry="1.8932"
												fill="black"
											></ellipse><ellipse
												opacity="0.15"
												rx="5.79074"
												ry="1.89328"
												transform="matrix(0.977655 -0.210218 0.210604 0.977571 47.7027 22.6477)"
												fill="black"
											></ellipse><path
												fill-rule="evenodd"
												clip-rule="evenodd"
												d="M14.3977 42.1386C18.9688 41.7842 22.5552 39.5385 22.4082 37.1225C22.4072 37.1061 22.406 37.0896 22.4046 37.0732L22.4092 37.0729L22.2728 35.3145L21.5585 35.3699C20.1639 33.9582 17.2149 33.1301 13.8652 33.3898C10.5154 33.6495 7.69445 34.9249 6.48397 36.5386L5.71897 36.5979L5.85049 38.2944C5.851 38.3315 5.85238 38.3687 5.85464 38.4059C6.00169 40.8218 9.82652 42.493 14.3977 42.1386Z"
												fill="#F4F4F4"
											></path><path
												d="M22.4082 37.1225L22.4924 37.1174L22.4924 37.1174L22.4082 37.1225ZM22.4046 37.0732L22.3981 36.9891L22.3136 36.9956L22.3205 37.0801L22.4046 37.0732ZM22.4092 37.0729L22.4157 37.1571L22.4999 37.1505L22.4934 37.0664L22.4092 37.0729ZM22.2728 35.3145L22.357 35.308L22.3505 35.2238L22.2663 35.2304L22.2728 35.3145ZM21.5585 35.3699L21.4984 35.4293L21.526 35.4571L21.565 35.4541L21.5585 35.3699ZM6.48397 36.5386L6.4905 36.6228L6.52859 36.6198L6.55152 36.5892L6.48397 36.5386ZM5.71897 36.5979L5.71245 36.5137L5.62826 36.5202L5.63479 36.6044L5.71897 36.5979ZM5.85049 38.2944L5.9351 38.2932L5.93468 38.2878L5.85049 38.2944ZM5.85464 38.4059L5.77036 38.411L5.85464 38.4059ZM22.3239 37.1277C22.3946 38.2894 21.5672 39.4305 20.1274 40.3321C18.6914 41.2313 16.6658 41.8781 14.3911 42.0544L14.4042 42.2228C16.7007 42.0448 18.7538 41.3915 20.217 40.4752C21.6765 39.5613 22.5688 38.3716 22.4924 37.1174L22.3239 37.1277ZM22.3205 37.0801C22.3218 37.0959 22.3229 37.1118 22.3239 37.1277L22.4924 37.1174C22.4914 37.1004 22.4902 37.0833 22.4888 37.0663L22.3205 37.0801ZM22.4026 36.9887L22.3981 36.9891L22.4112 37.1574L22.4157 37.1571L22.4026 36.9887ZM22.1887 35.3211L22.325 37.0794L22.4934 37.0664L22.357 35.308L22.1887 35.3211ZM21.565 35.4541L22.2794 35.3987L22.2663 35.2304L21.552 35.2857L21.565 35.4541ZM13.8717 33.474C15.5381 33.3448 17.1032 33.4863 18.4235 33.8347C19.7448 34.1834 20.8152 34.7377 21.4984 35.4293L21.6186 35.3106C20.9072 34.5904 19.8057 34.0248 18.4665 33.6714C17.1262 33.3178 15.542 33.1751 13.8586 33.3056L13.8717 33.474ZM6.55152 36.5892C7.74124 35.0032 10.5335 33.7328 13.8717 33.474L13.8586 33.3056C10.4973 33.5662 7.64766 34.8465 6.41643 36.4879L6.55152 36.5892ZM5.7255 36.6821L6.4905 36.6228L6.47745 36.4544L5.71245 36.5137L5.7255 36.6821ZM5.93468 38.2878L5.80316 36.5914L5.63479 36.6044L5.76631 38.3009L5.93468 38.2878ZM5.93892 38.4007C5.93674 38.3649 5.93541 38.329 5.93492 38.2932L5.76606 38.2955C5.76658 38.334 5.76801 38.3725 5.77036 38.411L5.93892 38.4007ZM14.3911 42.0544C12.1164 42.2308 10.0318 41.9026 8.50092 41.2337C6.96623 40.5632 6.00957 39.5615 5.93892 38.4007L5.77036 38.411C5.84675 39.6662 6.87604 40.708 8.43331 41.3885C9.99442 42.0706 12.1077 42.4008 14.4042 42.2228L14.3911 42.0544Z"
												fill="black"
											></path><ellipse
												rx="8.3016"
												ry="4.38249"
												transform="matrix(0.997008 -0.0772936 0.0607527 0.998153 13.9922 35.9466)"
												fill="#F9F9F9"
												stroke="black"
												stroke-width="0.168878"
											></ellipse><ellipse
												rx="6.93395"
												ry="3.43595"
												transform="matrix(0.997008 -0.0772936 0.0607367 0.998154 13.991 35.9479)"
												fill="#DDDDDD"
												stroke="black"
												stroke-width="0.168878"
											></ellipse><path
												fill-rule="evenodd"
												clip-rule="evenodd"
												d="M7.20176 37.0296C7.58513 35.3329 10.3861 33.8351 13.8647 33.5655C17.3053 33.2987 20.2348 34.3244 20.8647 35.9159C20.4813 37.6126 17.6803 39.1103 14.2017 39.38C10.7611 39.6468 7.83166 38.6211 7.20176 37.0296Z"
												fill="white"
											></path><path
												d="M7.20176 37.0296L7.11939 37.011L7.11365 37.0364L7.12324 37.0607L7.20176 37.0296ZM20.8647 35.9159L20.9471 35.9345L20.9528 35.9091L20.9432 35.8848L20.8647 35.9159ZM7.28412 37.0482C7.46763 36.236 8.23663 35.4533 9.41173 34.8372C10.583 34.2231 12.1414 33.7837 13.8712 33.6496L13.8582 33.4813C12.1094 33.6168 10.528 34.0612 9.33331 34.6876C8.14243 35.312 7.31926 36.1264 7.11939 37.011L7.28412 37.0482ZM13.8712 33.6496C15.5822 33.517 17.163 33.706 18.3915 34.1238C19.6241 34.5429 20.4849 35.1856 20.7862 35.947L20.9432 35.8848C20.6146 35.0547 19.6957 34.3888 18.4459 33.9639C17.1921 33.5376 15.5879 33.3472 13.8582 33.4813L13.8712 33.6496ZM20.7823 35.8973C20.5988 36.7094 19.8298 37.4922 18.6547 38.1083C17.4834 38.7224 15.925 39.1617 14.1952 39.2958L14.2083 39.4642C15.9571 39.3286 17.5384 38.8842 18.7331 38.2579C19.924 37.6335 20.7472 36.819 20.9471 35.9345L20.7823 35.8973ZM14.1952 39.2958C12.4843 39.4285 10.9035 39.2394 9.67491 38.8217C8.44237 38.4026 7.5816 37.7598 7.28027 36.9985L7.12324 37.0607C7.45182 37.8908 8.37073 38.5566 9.62054 38.9816C10.8743 39.4079 12.4786 39.5983 14.2083 39.4642L14.1952 39.2958Z"
												fill="black"
											></path><path
												fill-rule="evenodd"
												clip-rule="evenodd"
												d="M16.2641 33.8067C16.2995 33.7946 16.3491 33.8065 16.375 33.8335L18.7726 36.3319C18.7984 36.3589 18.7908 36.3906 18.7554 36.4028L18.5011 36.4906C18.4657 36.5028 18.4161 36.4908 18.3902 36.4638L15.9926 33.9654C15.9667 33.9384 15.9744 33.9067 16.0098 33.8945L16.2641 33.8067ZM16.6797 34.8932C16.6538 34.8663 16.6042 34.8543 16.5688 34.8665L16.3469 34.943C16.4614 35.0285 16.5719 35.1199 16.6785 35.2169L16.8488 35.1582C16.8841 35.146 16.8918 35.1142 16.8659 35.0873L16.6797 34.8932ZM16.4666 35.29C16.3583 35.1923 16.2466 35.1014 16.1313 35.0174L15.229 35.3286C15.2413 35.3342 15.2536 35.34 15.266 35.3461C15.3869 35.4056 15.5059 35.4839 15.6228 35.581L16.4666 35.29ZM15.9826 35.9617L16.8345 35.6679C16.923 35.7732 16.9978 35.8768 17.059 35.9787L16.1118 36.3054C16.11 36.2688 16.1038 36.2307 16.0931 36.1911C16.0743 36.1186 16.0375 36.0422 15.9826 35.9617ZM15.4095 35.6546C15.3169 35.5803 15.2279 35.5236 15.1434 35.482C15.0854 35.4538 15.0305 35.4318 14.9782 35.4151L14.295 35.6507C14.2923 35.715 14.3032 35.794 14.3317 35.8898C14.3436 35.9284 14.3576 35.9691 14.3739 36.0118L15.4095 35.6546ZM14.578 36.4461L15.7676 36.0358C15.8016 36.0904 15.8236 36.1402 15.8354 36.1856L15.8355 36.1862L15.8357 36.1868C15.8584 36.271 15.8545 36.3421 15.8279 36.4033L14.7433 36.7774C14.6952 36.6711 14.6402 36.561 14.5786 36.4472C14.5784 36.4469 14.5782 36.4465 14.578 36.4461ZM14.1481 36.0897C14.1188 36.0187 14.0946 35.952 14.0754 35.8895C14.0595 35.836 14.048 35.7856 14.041 35.7383L13.0111 36.0935C13.0557 36.2028 13.1068 36.3146 13.1645 36.4289L14.1481 36.0897ZM13.3767 36.8605L14.359 36.5217C14.4203 36.6373 14.474 36.7482 14.5201 36.8544L13.4965 37.2075C13.4944 37.1979 13.4922 37.1882 13.4898 37.1784C13.468 37.0897 13.4303 36.9838 13.3767 36.8605ZM12.9445 36.5048C12.8858 36.3914 12.8331 36.2802 12.7865 36.171L11.5432 36.5998C11.5499 36.6846 11.5821 36.7768 11.6438 36.8779C11.6563 36.8983 11.6696 36.9189 11.6839 36.9396L12.9445 36.5048ZM12.0355 37.3231L13.1523 36.9379C13.1894 37.0283 13.2156 37.106 13.2316 37.1712C13.2429 37.2174 13.249 37.2575 13.251 37.2921L12.4324 37.5745C12.4017 37.5622 12.3699 37.5479 12.3369 37.5315C12.2447 37.4847 12.1438 37.4167 12.0355 37.3231ZM11.4701 37.0133C11.4463 36.9802 11.4243 36.9472 11.4043 36.9144C11.3557 36.8348 11.3213 36.7578 11.3012 36.6833L10.4078 36.9914C10.4732 37.098 10.5467 37.2021 10.6283 37.3037L11.4701 37.0133ZM10.9851 37.6854L11.8231 37.3963C11.9469 37.5055 12.0704 37.5923 12.1937 37.6568L11.3077 37.9624C11.1982 37.877 11.0906 37.7847 10.9851 37.6854ZM10.4162 37.3768C10.3338 37.2754 10.259 37.1718 10.1919 37.0659L9.66089 37.2491C9.62554 37.2612 9.61787 37.293 9.64376 37.32L9.82994 37.514C9.85584 37.541 9.90549 37.553 9.94085 37.5408L10.4162 37.3768ZM10.7735 37.7583C10.8776 37.8568 10.9843 37.9494 11.0936 38.0362L10.5837 38.2121C10.5484 38.2243 10.4987 38.2123 10.4728 38.1853L10.2866 37.9913C10.2607 37.9643 10.2684 37.9326 10.3038 37.9204L10.7735 37.7583ZM17.2751 35.9042L17.4916 35.8295C17.527 35.8173 17.5346 35.7856 17.5087 35.7586L17.3226 35.5646C17.2967 35.5376 17.247 35.5256 17.2117 35.5378L17.0462 35.5948C17.1343 35.6987 17.2107 35.8018 17.2751 35.9042Z"
												fill="#1F1F24"
											></path><path
												d="M13.1593 37.7561C13.3025 37.7024 13.4027 37.6324 13.4598 37.5459C13.519 37.4614 13.5288 37.3385 13.4891 37.1771C13.4495 37.0157 13.3571 36.7969 13.2119 36.5205C13.0491 36.2128 12.9326 35.923 12.8624 35.6511C12.7922 35.3792 12.7999 35.1391 12.8856 34.9308C12.9758 34.7235 13.1769 34.5615 13.4889 34.4446C13.7932 34.3306 14.1283 34.2959 14.4941 34.3405C14.862 34.3871 15.2293 34.503 15.5961 34.6882C15.965 34.8754 16.3034 35.1214 16.6113 35.4262C16.9332 35.7448 17.1359 36.0484 17.2194 36.337C17.3049 36.6276 17.2831 36.8852 17.154 37.1097C17.0248 37.3343 16.8726 37.4679 16.5504 37.5886L15.6604 36.8193C15.8343 36.7542 15.9589 36.6682 16.0343 36.5613C16.1116 36.4565 16.131 36.3326 16.0925 36.1898C16.056 36.049 15.9513 35.893 15.7785 35.7219C15.6116 35.5567 15.4405 35.431 15.2654 35.3448C15.0921 35.2606 14.9227 35.2115 14.7572 35.1976C14.5935 35.1857 14.444 35.2051 14.3084 35.2559C14.1755 35.3057 14.0906 35.3822 14.0539 35.4854C14.0191 35.5906 14.0261 35.7249 14.0748 35.8883C14.1255 36.0536 14.2119 36.249 14.3338 36.4744C14.5289 36.8351 14.6522 37.1508 14.7037 37.4216C14.7572 37.6943 14.7263 37.9255 14.6111 38.115C14.4984 38.3036 14.2912 38.4544 13.9895 38.5674C13.6698 38.6872 13.3303 38.7262 12.971 38.6846C12.6117 38.6429 12.2535 38.5291 11.8963 38.343C11.5436 38.1579 11.2094 37.909 10.8935 37.5963C10.6829 37.3878 10.5101 37.1679 10.3751 36.9365C10.2446 36.7061 10.1688 36.4811 10.1477 36.2612C10.1291 36.0405 10.1827 35.8388 10.3084 35.6562C10.4367 35.4726 10.5795 35.3629 10.8838 35.2489L11.7798 36.0241C11.6033 36.0901 11.4743 36.1683 11.3927 36.2585C11.3157 36.3497 11.2782 36.4505 11.2804 36.5608C11.2871 36.6721 11.3282 36.7896 11.4037 36.9131C11.4791 37.0367 11.5814 37.1624 11.7105 37.2902C11.8774 37.4554 12.0439 37.5801 12.21 37.6643C12.3807 37.7495 12.5465 37.7985 12.7076 37.8114C12.8706 37.8262 13.0212 37.8078 13.1593 37.7561Z"
												fill="#1F1F24"
											></path><path
												fill-rule="evenodd"
												clip-rule="evenodd"
												d="M48.1474 24.1953C51.444 22.6427 53.4742 19.9624 52.682 18.2087C52.6766 18.1968 52.6711 18.1849 52.6655 18.1731L52.6663 18.1727L52.0681 16.9049L51.5556 17.1462C50.1202 16.4903 47.6945 16.7067 45.2784 17.8446C42.8624 18.9825 41.1265 20.7261 40.6835 22.2668L40.1297 22.5276L40.728 23.7954L40.7281 23.7954C40.7332 23.8074 40.7384 23.8193 40.7438 23.8312C41.5361 25.5849 44.8507 25.7479 48.1474 24.1953Z"
												fill="#F4F4F4"
											></path><path
												d="M52.682 18.2087L52.7589 18.174L52.7589 18.174L52.682 18.2087ZM52.6655 18.1731L52.6294 18.0968L52.5527 18.1329L52.5892 18.2094L52.6655 18.1731ZM52.6663 18.1727L52.7024 18.2491L52.7788 18.2131L52.7427 18.1367L52.6663 18.1727ZM52.0681 16.9049L52.1445 16.8689L52.1084 16.7925L52.032 16.8285L52.0681 16.9049ZM51.5556 17.1462L51.5205 17.223L51.5562 17.2393L51.5916 17.2226L51.5556 17.1462ZM40.6835 22.2668L40.7195 22.3431L40.7541 22.3268L40.7646 22.2901L40.6835 22.2668ZM40.1297 22.5276L40.0936 22.4512L40.0173 22.4872L40.0533 22.5636L40.1297 22.5276ZM40.728 23.7954L40.6516 23.8314L40.6876 23.9078L40.764 23.8718L40.728 23.7954ZM40.7281 23.7954L40.8058 23.7623L40.7713 23.6817L40.692 23.719L40.7281 23.7954ZM40.7438 23.8312L40.8208 23.7965L40.7438 23.8312ZM52.605 18.2434C52.982 19.078 52.6942 20.1523 51.8806 21.2264C51.0697 22.2969 49.7497 23.3473 48.1113 24.1189L48.1834 24.2716C49.8416 23.4907 51.185 22.4245 52.0153 21.3283C52.843 20.2357 53.1741 19.093 52.7589 18.174L52.605 18.2434ZM52.5892 18.2094C52.5946 18.2207 52.5998 18.232 52.605 18.2434L52.7589 18.174C52.7533 18.1615 52.7476 18.1491 52.7417 18.1368L52.5892 18.2094ZM52.6303 18.0964L52.6294 18.0968L52.7015 18.2495L52.7024 18.2491L52.6303 18.0964ZM51.9917 16.9409L52.5899 18.2087L52.7427 18.1367L52.1445 16.8689L51.9917 16.9409ZM51.5916 17.2226L52.1041 16.9812L52.032 16.8285L51.5196 17.0699L51.5916 17.2226ZM45.3145 17.921C46.5148 17.3557 47.7161 17.02 48.7936 16.9067C49.8723 16.7933 50.8211 16.9034 51.5205 17.223L51.5907 17.0695C50.8547 16.7332 49.8729 16.6235 48.7759 16.7388C47.6777 16.8542 46.4581 17.1957 45.2424 17.7683L45.3145 17.921ZM40.7646 22.2901C41.1982 20.7827 42.9089 19.054 45.3145 17.921L45.2424 17.7683C42.8158 18.9111 41.0549 20.6695 40.6023 22.2434L40.7646 22.2901ZM40.1657 22.6039L40.7195 22.3431L40.6474 22.1904L40.0936 22.4512L40.1657 22.6039ZM40.8043 23.7594L40.2061 22.4916L40.0533 22.5636L40.6516 23.8314L40.8043 23.7594ZM40.692 23.719L40.6919 23.7191L40.764 23.8718L40.7641 23.8717L40.692 23.719ZM40.8208 23.7965C40.8157 23.7852 40.8106 23.7737 40.8058 23.7623L40.6504 23.8285C40.6557 23.841 40.6612 23.8535 40.6668 23.866L40.8208 23.7965ZM48.1113 24.1189C46.4729 24.8906 44.8338 25.2339 43.5106 25.1688C42.1831 25.1036 41.1975 24.6303 40.8208 23.7965L40.6668 23.866C41.0824 24.7859 42.1502 25.271 43.5023 25.3374C44.8586 25.4041 46.5252 25.0526 48.1834 24.2716L48.1113 24.1189Z"
												fill="black"
											></path><ellipse
												rx="6.59796"
												ry="3.48435"
												transform="matrix(0.904683 -0.426085 0.411688 0.911312 46.0861 19.7102)"
												fill="#F9F9F9"
												stroke="black"
												stroke-width="0.168878"
											></ellipse><ellipse
												rx="5.51098"
												ry="2.73179"
												transform="matrix(0.904683 -0.426085 0.411688 0.911312 46.0918 19.7102)"
												fill="#DDDDDD"
												stroke="black"
												stroke-width="0.168878"
											></ellipse><path
												fill-rule="evenodd"
												clip-rule="evenodd"
												d="M41.3429 22.4266C41.148 21.0578 42.806 19.1548 45.3147 17.9732C47.7962 16.8045 50.2631 16.7404 51.181 17.7454C51.3759 19.1143 49.7179 21.0173 47.2091 22.1988C44.7277 23.3675 42.2608 23.4316 41.3429 22.4266Z"
												fill="white"
											></path><path
												d="M41.3429 22.4266L41.2592 22.4385L41.2629 22.4643L41.2805 22.4835L41.3429 22.4266ZM51.181 17.7454L51.2647 17.7335L51.261 17.7077L51.2434 17.6885L51.181 17.7454ZM41.4265 22.4148C41.3343 21.7671 41.6804 20.9735 42.3782 20.1856C43.0731 19.401 44.105 18.6363 45.3508 18.0495L45.2787 17.8968C44.0157 18.4917 42.9642 19.2692 42.2517 20.0737C41.542 20.8749 41.1566 21.7173 41.2592 22.4385L41.4265 22.4148ZM45.3508 18.0495C46.583 17.4692 47.8088 17.1645 48.8372 17.1285C49.8697 17.0923 50.6847 17.3271 51.1187 17.8023L51.2434 17.6885C50.7595 17.1587 49.882 16.923 48.8312 16.9598C47.7762 16.9967 46.5279 17.3085 45.2787 17.8968L45.3508 18.0495ZM51.0974 17.7572C51.1896 18.4049 50.8435 19.1985 50.1457 19.9864C49.4507 20.771 48.4189 21.5357 47.1731 22.1225L47.2452 22.2752C48.5082 21.6804 49.5597 20.9028 50.2722 20.0983C50.9819 19.2971 51.3673 18.4547 51.2647 17.7335L51.0974 17.7572ZM47.1731 22.1225C45.9409 22.7028 44.715 23.0075 43.6867 23.0435C42.6542 23.0797 41.8392 22.8449 41.4052 22.3697L41.2805 22.4835C41.7644 23.0133 42.6419 23.249 43.6927 23.2122C44.7476 23.1753 45.9959 22.8636 47.2452 22.2752L47.1731 22.1225Z"
												fill="black"
											></path><path
												fill-rule="evenodd"
												clip-rule="evenodd"
												d="M47.1707 17.4828C47.1994 17.4589 47.2501 17.4525 47.2839 17.4685L49.747 18.6369C49.7808 18.6529 49.7849 18.6853 49.7562 18.7093L49.6133 18.8284C49.5846 18.8524 49.5339 18.8588 49.5001 18.8428L47.037 17.6743C47.0032 17.6583 46.9991 17.6259 47.0278 17.602L47.1707 17.4828ZM47.8129 18.1716C47.7791 18.1556 47.7284 18.162 47.6997 18.1859L47.5663 18.2971C47.6755 18.3285 47.7834 18.3652 47.8899 18.4073L47.9902 18.3238C48.0189 18.2998 48.0148 18.2674 47.981 18.2514L47.8129 18.1716ZM47.7532 18.5214C47.6452 18.4793 47.5365 18.4432 47.4271 18.4132L46.845 18.8986C46.855 18.8993 46.865 18.9001 46.8751 18.901C46.9823 18.9111 47.0935 18.936 47.2085 18.9756L47.7532 18.5214ZM47.5788 19.1543L48.1285 18.6959C48.2241 18.7491 48.3092 18.8049 48.3836 18.8633L47.7734 19.3721C47.7619 19.3464 47.747 19.3209 47.7286 19.2956C47.6937 19.2463 47.6437 19.1992 47.5788 19.1543ZM47.0708 19.0904C46.9802 19.0609 46.8975 19.0437 46.8224 19.0365C46.7724 19.0321 46.7263 19.0311 46.6835 19.0333L46.2402 19.4029C46.2566 19.4511 46.2868 19.5061 46.3345 19.5685C46.3546 19.5943 46.3769 19.6209 46.4015 19.6485L47.0708 19.0904ZM46.6723 19.9102L47.4401 19.27C47.4822 19.3016 47.5135 19.3331 47.5355 19.3642L47.5358 19.3646L47.5361 19.365C47.5756 19.4195 47.593 19.472 47.5917 19.5236L46.8889 20.1096C46.8237 20.045 46.7526 19.9795 46.6756 19.9131C46.6745 19.9121 46.6734 19.9112 46.6723 19.9102ZM46.2557 19.77C46.2134 19.7251 46.1762 19.682 46.144 19.6406C46.1174 19.6059 46.0949 19.5721 46.0765 19.5394L45.4119 20.0936C45.476 20.1622 45.5456 20.2308 45.6208 20.2995L46.2557 19.77ZM45.8969 20.5567L46.5309 20.0281C46.6092 20.0967 46.6805 20.1639 46.7449 20.2297L46.0845 20.7804C46.0809 20.7748 46.0771 20.7691 46.0732 20.7635C46.0315 20.7031 45.9728 20.6342 45.8969 20.5567ZM45.4788 20.4179C45.4031 20.3502 45.3325 20.2825 45.2669 20.2145L44.4638 20.8842C44.4929 20.9447 44.5427 21.0036 44.6165 21.0608C44.6319 21.0728 44.6482 21.0847 44.6652 21.0964L45.4788 20.4179ZM45.0297 21.2799L45.7521 20.6775C45.8063 20.7353 45.8485 20.7864 45.8793 20.8309C45.8999 20.8608 45.9153 20.8878 45.9265 20.9121L45.3943 21.3559C45.3695 21.3554 45.3436 21.3538 45.3163 21.351C45.2336 21.3421 45.1382 21.3197 45.0297 21.2799ZM44.5271 21.2115C44.4995 21.1933 44.4734 21.1746 44.4488 21.1556C44.3907 21.1106 44.3438 21.0634 44.3079 21.0142L43.7315 21.4949C43.8102 21.5556 43.8943 21.6121 43.9838 21.6645L44.5271 21.2115ZM44.3518 21.8452L44.8927 21.3941C45.0151 21.4405 45.1311 21.4704 45.2407 21.484L44.6695 21.9603C44.5641 21.9277 44.4582 21.8893 44.3518 21.8452ZM43.8469 21.7787C43.7569 21.7267 43.672 21.6708 43.5921 21.6111L43.2612 21.8871C43.2325 21.911 43.2366 21.9434 43.2704 21.9595L43.4385 22.0392C43.4723 22.0552 43.523 22.0488 43.5517 22.0249L43.8469 21.7787ZM44.2152 21.9591C44.3202 22.0029 44.4256 22.0418 44.5313 22.0755L44.2146 22.3396C44.1859 22.3636 44.1352 22.37 44.1014 22.3539L43.9333 22.2742C43.8995 22.2582 43.8954 22.2257 43.9241 22.2018L44.2152 21.9591ZM48.5231 18.7469L48.6531 18.6385C48.6819 18.6145 48.6777 18.5821 48.6439 18.5661L48.4758 18.4863C48.442 18.4703 48.3913 18.4767 48.3626 18.5007L48.2652 18.582C48.3601 18.6342 48.4462 18.6892 48.5231 18.7469Z"
												fill="#1F1F24"
											></path><path
												d="M45.9891 21.2876C46.0804 21.2073 46.135 21.127 46.1531 21.0466C46.1731 20.9671 46.1456 20.873 46.0705 20.7643C45.9955 20.6556 45.8649 20.519 45.6788 20.3546C45.4709 20.1719 45.3023 19.9894 45.1733 19.8071C45.0442 19.6249 44.9821 19.4443 44.9868 19.2653C44.9953 19.0858 45.0989 18.9087 45.2977 18.7338C45.4916 18.5633 45.7308 18.443 46.0153 18.373C46.3018 18.3038 46.6076 18.2864 46.9326 18.3205C47.2596 18.3556 47.5806 18.4429 47.8957 18.5826C48.225 18.7286 48.4615 18.897 48.6052 19.0879C48.7509 19.2797 48.8075 19.4772 48.775 19.6806C48.7426 19.8839 48.6672 20.026 48.4619 20.2066L47.5829 19.886C47.6937 19.7886 47.7621 19.6895 47.7878 19.5889C47.8157 19.4891 47.7951 19.3916 47.7261 19.2963C47.6591 19.202 47.5372 19.1156 47.3604 19.0372C47.1896 18.9615 47.027 18.9163 46.8724 18.9017C46.7199 18.888 46.5801 18.8993 46.4531 18.9357C46.3282 18.973 46.2225 19.0296 46.1362 19.1056C46.0514 19.1801 46.01 19.2609 46.0119 19.3479C46.0158 19.4359 46.059 19.5337 46.1414 19.6414C46.2258 19.75 46.3452 19.8708 46.4996 20.0039C46.7466 20.2169 46.9275 20.4167 47.0423 20.6034C47.1591 20.791 47.2016 20.9715 47.1695 21.1448C47.1392 21.3168 47.0278 21.4873 46.8355 21.6564C46.6318 21.8355 46.3906 21.9603 46.1118 22.0307C45.833 22.1011 45.5346 22.1175 45.2165 22.08C44.9021 22.0419 44.5833 21.9512 44.2601 21.8079C44.0446 21.7124 43.854 21.5977 43.6883 21.4639C43.5262 21.3295 43.4062 21.1836 43.3284 21.0262C43.2521 20.8674 43.2349 20.7024 43.2767 20.5313C43.3201 20.3587 43.3952 20.2369 43.5891 20.0663L44.4742 20.3896C44.3618 20.4885 44.288 20.583 44.2528 20.673C44.2214 20.7625 44.222 20.848 44.2548 20.9293C44.2913 21.0102 44.3551 21.0859 44.4461 21.1564C44.5371 21.2269 44.6487 21.2915 44.7808 21.35C44.9515 21.4257 45.1105 21.4714 45.2577 21.4871C45.4086 21.5023 45.5458 21.492 45.6691 21.4561C45.7944 21.4211 45.9011 21.365 45.9891 21.2876Z"
												fill="#1F1F24"
											></path><path
												fill-rule="evenodd"
												clip-rule="evenodd"
												d="M54.2566 14.5306C56.0356 11.8198 56.3282 8.84183 54.9102 7.87907C54.9017 7.87329 54.8931 7.8676 54.8845 7.862L54.8873 7.85774L53.8428 7.17357L53.5658 7.59562C52.17 7.76235 50.427 9.0549 49.1215 11.0441C47.8161 13.0333 47.311 15.1664 47.695 16.5415L47.4004 16.9903L48.3826 17.6337C48.4103 17.6552 48.4388 17.6758 48.468 17.6956C49.886 18.6584 52.4776 17.2414 54.2566 14.5306Z"
												fill="#F4F4F4"
											></path><path
												d="M54.9102 7.87907L54.8627 7.94888L54.8627 7.94888L54.9102 7.87907ZM54.8845 7.862L54.8139 7.81573L54.7675 7.88645L54.8383 7.93268L54.8845 7.862ZM54.8873 7.85774L54.958 7.90401L55.0043 7.83341L54.9336 7.78715L54.8873 7.85774ZM53.8428 7.17357L53.8891 7.10298L53.8185 7.05671L53.7722 7.12731L53.8428 7.17357ZM53.5658 7.59562L53.5758 7.67943L53.6149 7.67476L53.6365 7.64189L53.5658 7.59562ZM47.695 16.5415L47.7656 16.5878L47.7867 16.5557L47.7764 16.5188L47.695 16.5415ZM47.4004 16.9903L47.3298 16.9441L47.2835 17.0147L47.3541 17.0609L47.4004 16.9903ZM48.3826 17.6337L48.4346 17.5668L48.4289 17.5631L48.3826 17.6337ZM48.468 17.6956L48.5154 17.6258L48.468 17.6956ZM54.8627 7.94888C55.5334 8.40427 55.8153 9.34902 55.6982 10.5411C55.5815 11.7288 55.0694 13.1381 54.186 14.4843L54.3272 14.5769C55.2227 13.2123 55.7465 11.7772 55.8663 10.5575C55.9857 9.34225 55.705 8.31662 54.9577 7.80925L54.8627 7.94888ZM54.8383 7.93268C54.8465 7.93799 54.8546 7.9434 54.8627 7.94888L54.9577 7.80925C54.9487 7.80318 54.9398 7.79721 54.9307 7.79132L54.8383 7.93268ZM54.8167 7.81148L54.8139 7.81573L54.9552 7.90826L54.958 7.90401L54.8167 7.81148ZM53.7965 7.24417L54.841 7.92834L54.9336 7.78715L53.8891 7.10298L53.7965 7.24417ZM53.6365 7.64189L53.9134 7.21984L53.7722 7.12731L53.4952 7.54935L53.6365 7.64189ZM49.1922 11.0904C49.8402 10.1029 50.596 9.2897 51.3612 8.70341C52.1273 8.1164 52.8979 7.7604 53.5758 7.67943L53.5558 7.51181C52.8379 7.59757 52.0392 7.97121 51.2584 8.56947C50.4767 9.16844 49.7083 9.99613 49.0509 10.9978L49.1922 11.0904ZM47.7764 16.5188C47.4017 15.1771 47.8931 13.0699 49.1922 11.0904L49.0509 10.9978C47.7391 12.9968 47.2203 15.1557 47.6136 16.5642L47.7764 16.5188ZM47.4711 17.0366L47.7656 16.5878L47.6244 16.4952L47.3298 16.9441L47.4711 17.0366ZM48.4289 17.5631L47.4468 16.9198L47.3541 17.0609L48.3363 17.7043L48.4289 17.5631ZM48.5154 17.6258C48.4877 17.607 48.4607 17.5874 48.4344 17.567L48.3308 17.7004C48.3599 17.7229 48.3898 17.7446 48.4205 17.7655L48.5154 17.6258ZM54.186 14.4843C53.3025 15.8306 52.2194 16.8518 51.1864 17.4166C50.1497 17.9835 49.1854 18.0807 48.5154 17.6258L48.4205 17.7655C49.1685 18.2734 50.2091 18.1434 51.2674 17.5647C52.3295 16.984 53.4318 15.9414 54.3272 14.5769L54.186 14.4843Z"
												fill="black"
											></path><ellipse
												rx="5.87084"
												ry="3.10344"
												transform="matrix(0.548662 -0.836044 0.827316 0.56171 50.6197 12.0791)"
												fill="#F9F9F9"
												stroke="black"
												stroke-width="0.168878"
											></ellipse><ellipse
												rx="4.90365"
												ry="2.43315"
												transform="matrix(0.548662 -0.836044 0.827319 0.561706 50.6195 12.0727)"
												fill="#DDDDDD"
												stroke="black"
												stroke-width="0.168878"
											></ellipse><path
												fill-rule="evenodd"
												clip-rule="evenodd"
												d="M48.2917 16.3411C47.5053 15.3933 47.8772 13.1775 49.2315 11.1139C50.5693 9.07538 52.4096 7.88038 53.5745 8.21329C54.3609 9.16114 53.989 11.3769 52.6347 13.4405C51.2969 15.479 49.4566 16.674 48.2917 16.3411Z"
												fill="#D6D6D6"
											></path><path
												d="M48.2917 16.3411L48.2267 16.395L48.2433 16.4151L48.2684 16.4223L48.2917 16.3411ZM53.5745 8.21329L53.6395 8.15941L53.6228 8.13931L53.5977 8.13214L53.5745 8.21329ZM48.3567 16.2873C47.9872 15.8419 47.8796 15.0821 48.042 14.1605C48.2037 13.2432 48.6302 12.184 49.3021 11.1602L49.1608 11.0676C48.4785 12.1074 48.0419 13.1879 47.8756 14.1313C47.7101 15.0705 47.8098 15.8925 48.2267 16.395L48.3567 16.2873ZM49.3021 11.1602C49.9658 10.1488 50.7526 9.34926 51.5145 8.84465C52.2797 8.33776 53.0042 8.13812 53.5512 8.29444L53.5977 8.13214C52.9798 7.95554 52.2017 8.18695 51.4211 8.70396C50.6371 9.22326 49.8349 10.0405 49.1608 11.0676L49.3021 11.1602ZM53.5094 8.26717C53.8789 8.71253 53.9865 9.47232 53.8241 10.3939C53.6625 11.3112 53.236 12.3704 52.5641 13.3943L52.7053 13.4868C53.3877 12.447 53.8243 11.3665 53.9905 10.4231C54.156 9.48392 54.0564 8.6619 53.6395 8.15941L53.5094 8.26717ZM52.5641 13.3943C51.9003 14.4056 51.1135 15.2052 50.3517 15.7098C49.5864 16.2167 48.8619 16.4163 48.315 16.26L48.2684 16.4223C48.8864 16.5989 49.6645 16.3675 50.445 15.8505C51.229 15.3312 52.0313 14.5139 52.7053 13.4868L52.5641 13.3943Z"
												fill="black"
											></path><path
												fill-rule="evenodd"
												clip-rule="evenodd"
												d="M50.411 9.89423C50.4229 9.8588 50.4628 9.82685 50.5 9.82287L52.8987 9.56634C52.936 9.56236 52.9564 9.58786 52.9445 9.62328L52.8963 9.76601C52.8843 9.80144 52.8444 9.83338 52.8072 9.83736L50.4085 10.0939C50.3713 10.0979 50.3508 10.0724 50.3628 10.037L50.411 9.89423ZM51.2299 10.1091C51.1927 10.1131 51.1528 10.1451 51.1409 10.1805L51.0939 10.3196C51.1913 10.2928 51.2902 10.2707 51.3906 10.2533L51.4255 10.1501C51.4375 10.1146 51.417 10.0891 51.3798 10.0931L51.2299 10.1091ZM51.3399 10.4035C51.2385 10.4215 51.1393 10.4444 51.0424 10.4723L50.8271 11.1098C50.8331 11.1067 50.8391 11.1036 50.8452 11.1006C50.9328 11.0578 51.0304 11.0246 51.1382 11.0011L51.3399 10.4035ZM51.5026 10.9661L51.7065 10.3622C51.8038 10.3583 51.8942 10.3614 51.9777 10.3714L51.7508 11.0436C51.729 11.0282 51.7044 11.0148 51.6769 11.0033C51.6286 10.9827 51.5705 10.9703 51.5026 10.9661ZM51.0872 11.1522C51.0025 11.1721 50.93 11.1979 50.8684 11.228C50.831 11.2465 50.7976 11.2659 50.7676 11.2859L50.6009 11.7797C50.6355 11.8076 50.6829 11.8342 50.7459 11.8585C50.7743 11.8692 50.8051 11.8795 50.8382 11.8894L51.0872 11.1522ZM51.1664 11.9617L51.4511 11.1185C51.4954 11.1232 51.5322 11.1323 51.5622 11.1452L51.5627 11.1453L51.5631 11.1455C51.6212 11.1697 51.6598 11.2035 51.6824 11.246L51.4236 12.0126C51.3429 11.9935 51.2572 11.9766 51.1664 11.9617ZM50.7843 12.0493C50.7295 12.0345 50.6797 12.0187 50.6349 12.0018C50.6002 11.9884 50.5687 11.974 50.5405 11.9586L50.2945 12.6871C50.3751 12.7093 50.46 12.7289 50.5491 12.7459L50.7843 12.0493ZM50.8789 12.8132L51.114 12.1169C51.2053 12.1327 51.2907 12.1507 51.3702 12.1708L51.1251 12.8967C51.1183 12.8934 51.1112 12.8901 51.104 12.887C51.0453 12.861 50.9703 12.8364 50.8789 12.8132ZM50.4964 12.9017C50.4075 12.8857 50.3223 12.8672 50.2408 12.8462L49.9427 13.7291C49.9924 13.7601 50.0564 13.7809 50.1369 13.7898C50.1557 13.7918 50.1751 13.7934 50.1951 13.7943L50.4964 12.9017ZM50.5583 13.7627L50.8252 12.9723C50.891 12.9905 50.9452 13.0092 50.9883 13.0283C51.02 13.0423 51.0457 13.0567 51.0663 13.0709L50.8713 13.6483C50.8504 13.6607 50.8278 13.6729 50.8032 13.6847C50.7376 13.7158 50.6566 13.7427 50.5583 13.7627ZM50.1439 13.9457C50.1129 13.9448 50.0828 13.9428 50.0538 13.9396C49.9905 13.9326 49.9343 13.9193 49.8852 13.8995L49.672 14.5311C49.7601 14.5403 49.8503 14.5439 49.9426 14.5419L50.1439 13.9457ZM50.307 14.5072L50.5075 13.9132C50.6224 13.891 50.7245 13.8593 50.8141 13.8179L50.6019 14.4463C50.5066 14.4707 50.4083 14.491 50.307 14.5072ZM49.8919 14.6922C49.7993 14.6947 49.7088 14.692 49.6203 14.684L49.5007 15.0383C49.4887 15.0738 49.5092 15.0993 49.5464 15.0953L49.6963 15.0793C49.7335 15.0753 49.7734 15.0433 49.7853 15.0079L49.8919 14.6922ZM50.2563 14.6572C50.3565 14.6414 50.4547 14.6218 50.5506 14.598L50.4349 14.9409C50.4229 14.9764 50.3831 15.0083 50.3459 15.0123L50.1959 15.0283C50.1587 15.0323 50.1383 15.0068 50.1502 14.9714L50.2563 14.6572ZM52.0295 10.2182L52.0751 10.0831C52.087 10.0477 52.0666 10.0222 52.0294 10.0262L51.8795 10.0422C51.8422 10.0462 51.8024 10.0781 51.7904 10.1135L51.7572 10.2121C51.8534 10.2078 51.9443 10.2098 52.0295 10.2182Z"
												fill="#1F1F24"
											></path><path
												d="M51.2808 13.3182C51.3127 13.2149 51.3168 13.1285 51.2931 13.0591C51.2713 12.9895 51.2066 12.9308 51.099 12.8832C50.9914 12.8356 50.8287 12.7926 50.6109 12.7543C50.368 12.7123 50.1551 12.6521 49.9723 12.5738C49.7895 12.4955 49.6582 12.3873 49.5785 12.2493C49.5014 12.1091 49.4975 11.9265 49.567 11.7014C49.6347 11.4818 49.7603 11.2794 49.9435 11.094C50.1288 10.9083 50.3527 10.753 50.6152 10.6278C50.8797 10.5024 51.164 10.4195 51.4682 10.3791C51.786 10.3368 52.0439 10.3547 52.2419 10.4328C52.4418 10.5106 52.5767 10.6343 52.6468 10.8037C52.7168 10.9731 52.7258 11.116 52.6541 11.3485L51.8377 11.5137C51.8765 11.3882 51.8822 11.2813 51.8549 11.1929C51.8296 11.1043 51.7685 11.0398 51.6718 10.9996C51.577 10.9591 51.4443 10.9502 51.2736 10.9729C51.1088 10.9948 50.9643 11.0362 50.8402 11.0969C50.718 11.1574 50.6173 11.2309 50.5378 11.3176C50.4604 11.4039 50.4065 11.496 50.3764 11.5938C50.3468 11.6898 50.3529 11.7703 50.3949 11.8355C50.4388 11.9005 50.5171 11.9546 50.6298 11.9981C50.7445 12.0412 50.8913 12.0774 51.0705 12.1067C51.3571 12.1535 51.5874 12.2211 51.7615 12.3094C51.9375 12.3975 52.0538 12.5148 52.1102 12.6612C52.1672 12.8058 52.1621 12.987 52.0949 13.2047C52.0237 13.4353 51.8987 13.6422 51.7199 13.8252C51.5411 14.0082 51.3223 14.1594 51.0634 14.2787C50.8071 14.3959 50.523 14.4753 50.211 14.5168C50.003 14.5444 49.8049 14.546 49.6168 14.5214C49.4312 14.4948 49.2722 14.4398 49.1399 14.3566C49.0081 14.2715 48.9182 14.1543 48.8702 14.0049C48.8228 13.8538 48.823 13.7264 48.8908 13.5068L49.713 13.3408C49.6737 13.4681 49.6617 13.5741 49.677 13.6588C49.6948 13.7414 49.7351 13.8059 49.7979 13.8524C49.8632 13.8968 49.9468 13.9246 50.0487 13.9358C50.1506 13.9471 50.2654 13.9442 50.3929 13.9273C50.5577 13.9053 50.6997 13.8661 50.8187 13.8096C50.9403 13.751 51.0395 13.6794 51.1164 13.5949C51.1953 13.5101 51.2501 13.4178 51.2808 13.3182Z"
												fill="#1F1F24"
											></path><path
												fill-rule="evenodd"
												clip-rule="evenodd"
												d="M46.5402 6.04968C45.9371 3.37645 44.2979 1.44842 42.8789 1.7433C42.8703 1.74508 42.8618 1.74694 42.8533 1.74886L42.8529 1.74713L41.8229 1.97905L41.9162 2.39289C41.1973 3.33822 40.9589 5.15599 41.4014 7.11757C41.8439 9.07915 42.8443 10.6395 43.9063 11.2147L44.0067 11.6599L45.0126 11.4334C45.0293 11.4306 45.046 11.4274 45.0627 11.4239C46.4817 11.1291 47.1432 8.72292 46.5402 6.04968Z"
												fill="#F4F4F4"
											></path><path
												d="M42.8789 1.7433L42.8961 1.82597L42.8961 1.82597L42.8789 1.7433ZM42.8533 1.74886L42.7709 1.76741L42.7896 1.84993L42.8721 1.8312L42.8533 1.74886ZM42.8529 1.74713L42.9353 1.72858L42.9167 1.64621L42.8343 1.66476L42.8529 1.74713ZM41.8229 1.97905L41.8043 1.89668L41.7219 1.91523L41.7405 1.9976L41.8229 1.97905ZM41.9162 2.39289L41.9834 2.44401L42.0072 2.41271L41.9986 2.37435L41.9162 2.39289ZM43.9063 11.2147L43.9887 11.1962L43.9802 11.1588L43.9465 11.1405L43.9063 11.2147ZM44.0067 11.6599L43.9243 11.6784L43.9429 11.7608L44.0253 11.7423L44.0067 11.6599ZM45.0126 11.4334L44.9983 11.3501L44.994 11.3511L45.0126 11.4334ZM45.0627 11.4239L45.0455 11.3413L45.0627 11.4239ZM42.8961 1.82597C43.5603 1.68794 44.2962 2.06772 44.9512 2.83812C45.6033 3.60514 46.1587 4.74232 46.4578 6.06823L46.6226 6.03114C46.3186 4.68382 45.7529 3.52035 45.0799 2.72878C44.4097 1.94057 43.6165 1.50378 42.8617 1.66064L42.8961 1.82597ZM42.8721 1.8312C42.8801 1.82938 42.8881 1.82764 42.8961 1.82597L42.8617 1.66064C42.8526 1.66252 42.8436 1.66449 42.8346 1.66653L42.8721 1.8312ZM42.7706 1.76568L42.7709 1.76741L42.9357 1.73032L42.9353 1.72858L42.7706 1.76568ZM41.8414 2.06142L42.8715 1.8295L42.8343 1.66476L41.8043 1.89668L41.8414 2.06142ZM41.9986 2.37435L41.9052 1.9605L41.7405 1.9976L41.8338 2.41144L41.9986 2.37435ZM41.4838 7.09902C41.2644 6.12653 41.2142 5.19127 41.3072 4.38382C41.4003 3.5752 41.6362 2.90065 41.9834 2.44401L41.849 2.34177C41.4773 2.83047 41.2346 3.53746 41.1394 4.36445C41.044 5.19261 41.0959 6.14703 41.319 7.13612L41.4838 7.09902ZM43.9465 11.1405C42.9151 10.5818 41.9237 9.04925 41.4838 7.09902L41.319 7.13612C41.7641 9.10905 42.7736 10.6972 43.8661 11.289L43.9465 11.1405ZM44.0891 11.6414L43.9887 11.1962L43.8239 11.2333L43.9243 11.6784L44.0891 11.6414ZM44.994 11.3511L43.9881 11.5775L44.0253 11.7423L45.0312 11.5158L44.994 11.3511ZM45.0455 11.3413C45.0298 11.3445 45.0141 11.3475 44.9983 11.3502L45.0268 11.5167C45.0445 11.5136 45.0622 11.5103 45.0799 11.5066L45.0455 11.3413ZM46.4578 6.06823C46.7569 7.3942 46.7413 8.64968 46.4783 9.60629C46.2142 10.5669 45.7088 11.2034 45.0455 11.3413L45.0799 11.5066C45.8357 11.3496 46.3705 10.6356 46.6411 9.6511C46.9129 8.66261 46.9265 7.37841 46.6226 6.03114L46.4578 6.06823Z"
												fill="black"
											></path><ellipse
												rx="4.96195"
												ry="2.62426"
												transform="matrix(-0.220056 -0.975487 0.979092 -0.203453 42.9101 6.81766)"
												fill="#F9F9F9"
												stroke="black"
												stroke-width="0.168878"
											></ellipse><ellipse
												rx="4.1445"
												ry="2.05746"
												transform="matrix(-0.220056 -0.975487 0.979089 -0.203464 42.91 6.81826)"
												fill="#DDDDDD"
												stroke="black"
												stroke-width="0.168878"
											></ellipse><path
												fill-rule="evenodd"
												clip-rule="evenodd"
												d="M44.1379 10.7381C43.0997 10.6567 41.9717 9.12913 41.5129 7.09532C41.059 5.08306 41.415 3.26194 42.3041 2.75256C43.3424 2.83401 44.4703 4.36157 44.9291 6.39537C45.383 8.40764 45.027 10.2288 44.1379 10.7381Z"
												fill="#D6D6D6"
											></path><path
												d="M44.1379 10.7381L44.1313 10.8223L44.1573 10.8244L44.1799 10.8114L44.1379 10.7381ZM42.3041 2.75256L42.3107 2.66839L42.2847 2.66635L42.2621 2.6793L42.3041 2.75256ZM44.1445 10.654C43.6623 10.6161 43.1403 10.2383 42.6765 9.59929C42.2152 8.96371 41.8226 8.08436 41.5953 7.07677L41.4306 7.11387C41.6621 8.14008 42.0629 9.04142 42.5398 9.69844C43.0142 10.352 43.5753 10.7787 44.1313 10.8223L44.1445 10.654ZM41.5953 7.07677C41.3704 6.07985 41.347 5.13322 41.4879 4.37584C41.6297 3.61436 41.9337 3.06213 42.3462 2.82583L42.2621 2.6793C41.7855 2.95238 41.467 3.56539 41.3219 4.34488C41.176 5.12847 41.2015 6.09853 41.4306 7.11387L41.5953 7.07677ZM42.2976 2.83674C42.7797 2.87456 43.3017 3.25236 43.7656 3.89141C44.2269 4.52698 44.6194 5.40633 44.8467 6.41392L45.0115 6.37682C44.78 5.35061 44.3791 4.44928 43.9022 3.79226C43.4279 3.13871 42.8668 2.71201 42.3107 2.66839L42.2976 2.83674ZM44.8467 6.41392C45.0716 7.41085 45.0951 8.35747 44.9541 9.11486C44.8124 9.87634 44.5084 10.4286 44.0959 10.6649L44.1799 10.8114C44.6566 10.5383 44.9751 9.92531 45.1202 9.14581C45.266 8.36223 45.2405 7.39216 45.0115 6.37682L44.8467 6.41392Z"
												fill="black"
											></path><path
												fill-rule="evenodd"
												clip-rule="evenodd"
												d="M47.3683 36.7049C49.7688 38.0307 52.3003 38.0876 53.0224 36.8321C53.0273 36.8237 53.0321 36.8152 53.0367 36.8067L53.0392 36.8081L53.5501 35.8849L53.1753 35.6779C52.9438 34.5138 51.743 33.1302 49.9835 32.1584C48.2239 31.1867 46.394 30.8966 45.2579 31.3054L44.8567 31.0838L44.3652 31.9721C44.3528 31.9915 44.3408 32.0112 44.3293 32.0312C43.6071 33.2867 44.9678 35.3792 47.3683 36.7049Z"
												fill="#F4F4F4"
											></path><path
												d="M53.0224 36.8321L53.0957 36.8742L53.0957 36.8742L53.0224 36.8321ZM53.0367 36.8067L53.0776 36.7328L53.0034 36.6919L52.9626 36.7662L53.0367 36.8067ZM53.0392 36.8081L52.9983 36.882L53.0723 36.9228L53.1131 36.8489L53.0392 36.8081ZM53.5501 35.8849L53.624 35.9257L53.6649 35.8518L53.591 35.811L53.5501 35.8849ZM53.1753 35.6779L53.0924 35.6944L53.1001 35.7328L53.1344 35.7518L53.1753 35.6779ZM45.2579 31.3054L45.217 31.3793L45.2505 31.3977L45.2865 31.3848L45.2579 31.3054ZM44.8567 31.0838L44.8976 31.01L44.8237 30.9691L44.7828 31.043L44.8567 31.0838ZM44.3652 31.9721L44.4365 32.0178L44.4392 32.0129L44.3652 31.9721ZM44.3293 32.0312L44.2561 31.9892L44.3293 32.0312ZM52.9492 36.7901C52.6112 37.3777 51.8383 37.6749 50.8267 37.6521C49.8196 37.6294 48.5999 37.2886 47.4092 36.631L47.3274 36.7788C48.5373 37.447 49.7835 37.7975 50.8228 37.8209C51.8577 37.8442 52.7115 37.5421 53.0957 36.8742L52.9492 36.7901ZM52.9626 36.7662C52.9583 36.7742 52.9538 36.7822 52.9492 36.7901L53.0957 36.8742C53.1008 36.8652 53.1059 36.8563 53.1108 36.8473L52.9626 36.7662ZM53.0801 36.7342L53.0776 36.7328L52.9958 36.8806L52.9983 36.882L53.0801 36.7342ZM53.4762 35.8441L52.9653 36.7673L53.1131 36.8489L53.624 35.9257L53.4762 35.8441ZM53.1344 35.7518L53.5092 35.9588L53.591 35.811L53.2162 35.604L53.1344 35.7518ZM49.9426 32.2323C50.8149 32.7141 51.5473 33.2972 52.0895 33.9024C52.6324 34.5084 52.9806 35.1321 53.0924 35.6944L53.2581 35.6614C53.1385 35.0597 52.7706 34.4095 52.2153 33.7897C51.6593 33.1691 50.9115 32.5745 50.0243 32.0845L49.9426 32.2323ZM45.2865 31.3848C46.39 30.9877 48.1932 31.2662 49.9426 32.2323L50.0243 32.0845C48.2546 31.1072 46.398 30.8055 45.2293 31.226L45.2865 31.3848ZM44.8159 31.1577L45.217 31.3793L45.2988 31.2315L44.8976 31.01L44.8159 31.1577ZM44.4392 32.0129L44.9307 31.1247L44.7828 31.043L44.2913 31.9313L44.4392 32.0129ZM44.4025 32.0732C44.4134 32.0544 44.4246 32.0359 44.4363 32.0177L44.2942 31.9265C44.281 31.9471 44.2683 31.9679 44.2561 31.9892L44.4025 32.0732ZM47.4092 36.631C46.2184 35.9734 45.2896 35.1276 44.7486 34.2957C44.2054 33.4602 44.065 32.66 44.4025 32.0732L44.2561 31.9892C43.8714 32.6579 44.0503 33.5316 44.607 34.3877C45.1659 35.2473 46.1176 36.1107 47.3274 36.7788L47.4092 36.631Z"
												fill="black"
											></path><ellipse
												rx="4.96538"
												ry="2.62245"
												transform="matrix(0.875376 0.483443 -0.49861 0.866842 49.2031 33.475)"
												fill="#F9F9F9"
												stroke="black"
												stroke-width="0.168878"
											></ellipse><ellipse
												rx="4.14736"
												ry="2.05605"
												transform="matrix(0.875376 0.483443 -0.498608 0.866843 49.2049 33.4777)"
												fill="#DDDDDD"
												stroke="black"
												stroke-width="0.168878"
											></ellipse><path
												fill-rule="evenodd"
												clip-rule="evenodd"
												d="M45.4563 31.7862C46.2046 31.0612 48.0998 31.2328 49.929 32.243C51.7347 33.2403 52.8603 34.7147 52.6527 35.717C51.9044 36.4419 50.0092 36.2703 48.18 35.2601C46.3743 34.2629 45.2487 32.7885 45.4563 31.7862Z"
												fill="white"
											></path><path
												d="M45.4563 31.7862L45.3975 31.7256L45.3789 31.7437L45.3736 31.7691L45.4563 31.7862ZM52.6527 35.717L52.7114 35.7775L52.7301 35.7595L52.7354 35.734L52.6527 35.717ZM45.5151 31.8468C45.8625 31.5102 46.4919 31.3702 47.279 31.4479C48.0618 31.5252 48.9819 31.8164 49.8881 32.3169L49.9698 32.1691C49.0469 31.6594 48.1048 31.3598 47.2956 31.2799C46.4908 31.2005 45.7984 31.3372 45.3975 31.7256L45.5151 31.8468ZM49.8881 32.3169C50.7827 32.811 51.5061 33.4219 51.9791 34.0299C52.4547 34.6413 52.6663 35.2349 52.57 35.6999L52.7354 35.734C52.8467 35.1967 52.5993 34.552 52.1125 33.9263C51.6232 33.2973 50.881 32.6723 49.9698 32.1691L49.8881 32.3169ZM52.5939 35.6564C52.2465 35.9929 51.6171 36.1329 50.83 36.0552C50.0472 35.978 49.1271 35.6867 48.2209 35.1863L48.1391 35.334C49.0621 35.8437 50.0041 36.1434 50.8133 36.2232C51.6182 36.3027 52.3105 36.166 52.7114 35.7775L52.5939 35.6564ZM48.2209 35.1863C47.3263 34.6922 46.6028 34.0813 46.1298 33.4732C45.6543 32.8619 45.4427 32.2683 45.539 31.8033L45.3736 31.7691C45.2623 32.3064 45.5097 32.9511 45.9964 33.5769C46.4858 34.2059 47.228 34.8308 48.1391 35.334L48.2209 35.1863Z"
												fill="black"
											></path><path
												fill-rule="evenodd"
												clip-rule="evenodd"
												d="M51.0262 33.1483C51.0624 33.1575 51.0973 33.1948 51.1041 33.2316L51.4694 35.2149C51.4761 35.2517 51.4522 35.274 51.416 35.2648L51.3128 35.2384C51.2765 35.2292 51.2416 35.1919 51.2349 35.1551L50.8696 33.1718C50.8628 33.135 50.8867 33.1127 50.9229 33.122L51.0262 33.1483ZM50.9065 33.8611C50.8997 33.8243 50.8649 33.787 50.8286 33.7778L50.7131 33.7483C50.7424 33.8287 50.7677 33.9108 50.7893 33.9944L50.8724 34.0156C50.9087 34.0248 50.9326 34.0025 50.9258 33.9657L50.9065 33.8611ZM50.6593 33.9612C50.6371 33.8767 50.611 33.7945 50.5807 33.7145L50.0254 33.5729C50.0312 33.582 50.037 33.5914 50.0426 33.6009C50.0824 33.6687 50.1154 33.7447 50.1415 33.8291L50.6593 33.9612ZM50.1979 34.1387L50.7197 34.2718C50.7295 34.3536 50.733 34.43 50.7304 34.5011L50.1521 34.3536C50.1621 34.336 50.1706 34.3165 50.1776 34.2952C50.1926 34.2515 50.1993 34.1993 50.1979 34.1387ZM50.0106 33.7957C49.9892 33.7309 49.9642 33.6755 49.9367 33.6286C49.9149 33.5921 49.8926 33.5605 49.8699 33.5332L49.4609 33.4289C49.4369 33.4605 49.415 33.5051 49.3968 33.5655C49.3905 33.587 49.3845 33.61 49.3789 33.6346L50.0106 33.7957ZM49.3371 33.9191L50.0662 34.1051C50.0656 34.146 50.0602 34.1799 50.0507 34.2077L50.0505 34.208L50.0504 34.2084C50.035 34.255 50.0117 34.2881 49.9811 34.31L49.3109 34.1391C49.3215 34.0717 49.33 34.0004 49.3365 33.9252C49.3367 33.9232 49.3369 33.9211 49.3371 33.9191ZM49.2403 33.5992C49.2488 33.5564 49.2583 33.517 49.2688 33.4811C49.2791 33.4469 49.2908 33.4161 49.3039 33.3888L48.6709 33.2274C48.6571 33.2966 48.6457 33.3692 48.6367 33.4453L49.2403 33.5992ZM48.6008 33.7313L49.2028 33.8849C49.1955 33.9628 49.1859 34.0359 49.1742 34.1042L48.5474 33.9443C48.5489 33.9405 48.5503 33.9365 48.5517 33.9326C48.5704 33.88 48.5868 33.8129 48.6008 33.7313ZM48.5017 33.4108C48.5099 33.3349 48.5203 33.262 48.5331 33.1922L47.7727 32.9982C47.7723 32.9989 47.7718 32.9996 47.7714 33.0003C47.7458 33.0454 47.7308 33.103 47.7283 33.1755C47.7279 33.1878 47.7278 33.2005 47.7279 33.2134L48.5017 33.4108ZM47.7757 33.5208L48.4633 33.6962C48.4518 33.756 48.439 33.8051 48.4251 33.8441C48.4164 33.8686 48.4072 33.8891 48.3977 33.9061L47.8883 33.7762C47.8786 33.7618 47.8689 33.7465 47.8594 33.73C47.828 33.675 47.7994 33.6059 47.7757 33.5208ZM47.5967 33.18C47.5959 33.1577 47.5959 33.1361 47.5966 33.115C47.5986 33.0569 47.6075 33.0052 47.6231 32.9601L47.0736 32.8199C47.0709 32.8945 47.0731 32.9706 47.0802 33.0482L47.5967 33.18ZM47.1319 33.3566L47.6456 33.4876C47.671 33.5825 47.7034 33.6663 47.743 33.7391L47.2012 33.6009C47.1748 33.5223 47.1517 33.4408 47.1319 33.3566ZM46.9501 33.015C46.9425 32.9373 46.9395 32.861 46.9411 32.7861L46.6452 32.7106C46.609 32.7014 46.5851 32.7237 46.5918 32.7604L46.6111 32.8651C46.6179 32.9019 46.6528 32.9392 46.689 32.9484L46.9501 33.015ZM47.0022 33.3235C47.0216 33.4068 47.0441 33.4881 47.07 33.5674L46.7895 33.4959C46.7532 33.4866 46.7183 33.4493 46.7116 33.4125L46.6923 33.3079C46.6855 33.2711 46.7094 33.2488 46.7457 33.258L47.0022 33.3235ZM50.8628 34.5349L50.9729 34.563C51.0091 34.5723 51.033 34.5499 51.0262 34.5132L51.007 34.4085C51.0002 34.3717 50.9653 34.3344 50.9291 34.3252L50.8495 34.3049C50.8596 34.3858 50.8641 34.4625 50.8628 34.5349Z"
												fill="#1F1F24"
											></path><path
												d="M48.2019 34.1107C48.2911 34.1309 48.3642 34.1289 48.4213 34.1045C48.4787 34.0817 48.524 34.0235 48.5574 33.9298C48.5907 33.8361 48.6166 33.6964 48.6351 33.5105C48.6551 33.3032 48.6923 33.1201 48.7468 32.9611C48.8012 32.8022 48.8842 32.6847 48.9956 32.6088C49.1089 32.5349 49.2628 32.52 49.4571 32.5642C49.6467 32.6073 49.8256 32.7001 49.9937 32.8427C50.1621 32.9869 50.3075 33.1656 50.4298 33.3788C50.5525 33.5936 50.6405 33.8278 50.694 34.0814C50.7499 34.3464 50.7512 34.5648 50.6979 34.7365C50.6449 34.9098 50.5492 35.0314 50.4107 35.1011C50.2722 35.1709 50.1522 35.1876 49.9514 35.1419L49.7601 34.4649C49.8684 34.4895 49.959 34.4875 50.0318 34.4589C50.105 34.4319 50.1555 34.3764 50.1833 34.2924C50.2114 34.21 50.2105 34.0976 50.1805 33.9553C50.1515 33.8179 50.1074 33.6988 50.0483 33.5981C49.9895 33.4991 49.921 33.4189 49.8428 33.3575C49.765 33.2978 49.6839 33.2583 49.5994 33.2391C49.5166 33.2203 49.449 33.2306 49.3967 33.2701C49.3447 33.3112 49.3039 33.3806 49.2745 33.4783C49.2453 33.5776 49.2241 33.7036 49.2108 33.8564C49.1896 34.1008 49.1472 34.2991 49.0837 34.4513C49.0206 34.6052 48.9291 34.7106 48.8091 34.7674C48.6907 34.8246 48.5375 34.8318 48.3495 34.7891C48.1503 34.7438 47.9678 34.6517 47.802 34.5128C47.6362 34.3738 47.4947 34.1991 47.3775 33.9887C47.2623 33.7802 47.1773 33.546 47.1224 33.2858C47.0858 33.1124 47.0719 32.9457 47.0807 32.7857C47.0913 32.6277 47.1276 32.4903 47.1894 32.3735C47.2528 32.257 47.346 32.1739 47.469 32.1239C47.5935 32.0744 47.701 32.0665 47.8906 32.1096L48.083 32.7916C47.9731 32.7666 47.8829 32.7632 47.8124 32.7814C47.7439 32.8017 47.692 32.8397 47.6567 32.8956C47.6234 32.9534 47.6053 33.0256 47.6023 33.1122C47.5993 33.1987 47.609 33.2952 47.6314 33.4015C47.6604 33.539 47.7025 33.656 47.7578 33.7527C47.815 33.8514 47.8817 33.9304 47.958 33.9898C48.0345 34.0508 48.1159 34.0911 48.2019 34.1107Z"
												fill="#1F1F24"
											></path><path
												d="M7.17882 32.624L7.17697 31.3378L7.94193 32.3719C8.23811 32.7722 8.70686 33.0081 9.20487 33.0074L10.4911 33.0056L9.45706 33.7705C9.05669 34.0667 8.8208 34.5354 8.82152 35.0335L8.82337 36.3197L8.0584 35.2856C7.76223 34.8853 7.29348 34.6494 6.79546 34.6501L5.5092 34.6519L6.54327 33.887C6.94365 33.5908 7.17953 33.1221 7.17882 32.624Z"
												fill="#F1F395"
												stroke="black"
												stroke-width="0.241254"
											></path><path
												d="M39.4284 11.9641L39.9462 10.0263L40.4641 11.9641C40.5912 12.4397 40.9344 12.8281 41.3908 13.0128L42.9411 13.6403L41.3908 14.2677C40.9344 14.4524 40.5912 14.8408 40.4641 15.3164L39.9462 17.2542L39.4284 15.3164C39.3012 14.8408 38.9581 14.4524 38.5017 14.2677L36.9514 13.6403L38.5017 13.0128C38.9581 12.8281 39.3012 12.4397 39.4284 11.9641Z"
												fill="#F1F395"
												stroke="black"
												stroke-width="0.241254"
											></path><path
												d="M38.3706 31.2803L37.7715 28.411L39.9568 30.3645C40.328 30.6964 40.8349 30.8322 41.3224 30.7304L44.1917 30.1313L42.2382 32.3166C41.9062 32.6878 41.7704 33.1947 41.8722 33.6822L42.4714 36.5515L40.2861 34.598C39.9148 34.266 39.408 34.1302 38.9205 34.232L36.0512 34.8312L38.0047 32.6459C38.3366 32.2746 38.4724 31.7678 38.3706 31.2803Z"
												fill="white"
												stroke="black"
												stroke-width="0.241254"
											></path><defs
												><linearGradient
													id="paint0_linear_5718_5097"
													x1="52.8952"
													y1="55.502"
													x2="33.3424"
													y2="24.7591"
													gradientUnits="userSpaceOnUse"
													><stop stop-color="#679E77"></stop><stop
														offset="1"
														stop-color="#646464"
														stop-opacity="0"
													></stop></linearGradient
												><linearGradient
													id="paint1_linear_5718_5097"
													x1="46.4216"
													y1="48.2267"
													x2="13.631"
													y2="11.7739"
													gradientUnits="userSpaceOnUse"
													><stop stop-color="#DAFDE4"></stop><stop
														offset="1"
														stop-color="#DAFDE4"
														stop-opacity="0"
													></stop></linearGradient
												></defs
											></svg
										>
										<div class="_9e6fa940">
											<p>{$_('margin-trading-desc')}</p>
											<button>{$_('enable-margin-trading')}</button>
										</div>
									</div>
									<div class="d76572a4 d8a77f75">
										<div class="_885eb473">
											<div class="_0573d27f">
												<span
													class="el-tooltip tips-text _3cb3befc"
													aria-describedby="el-tooltip-296"
													tabindex="0">{$_('total-margin')}</span
												><b>$ 0.00</b>
											</div>
											<div class="_0573d27f">
												<span
													class="el-tooltip tips-text _3cb3befc"
													aria-describedby="el-tooltip-2506"
													tabindex="0">{$_('free-margin')}</span
												><b>$ 0.00</b>
											</div>
											<div class="_0573d27f">
												<span
													class="el-tooltip tips-text _3cb3befc"
													aria-describedby="el-tooltip-4767"
													tabindex="0">{$_('maintenance-margin')}</span
												><b class="_3cb5001e">$ 0.00</b>
											</div>
											<div class="_0573d27f">
												<span
													class="el-tooltip tips-text _3cb3befc"
													aria-describedby="el-tooltip-3638"
													tabindex="0">{$_('total-borrowed')}</span
												><b class="_3cb5001e">$ 0.00</b>
											</div>
											<div class="_0573d27f">
												<span
													class="el-tooltip tips-text _3cb3befc"
													aria-describedby="el-tooltip-2561"
													tabindex="0">{$_('leverage')}</span
												><b class="_3cb5001e">0x</b>
											</div>
										</div>
									</div>
								</div>
							</div>
							<!----><!----><!---->
						</section>
					</div>
				</section>
			</section>
		</section>
		<section class="_721fe061">
			<section class="ca61bd1e">
				<div class="_3f69905e">
					<svg
						width="14"
						height="12"
						viewBox="0 0 14 12"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						><rect y="9" width="2" height="3" fill="#1A8F5C"></rect><rect
							x="4"
							y="6"
							width="2"
							height="6"
							fill="#1A8F5C"
						></rect><rect x="8" y="3" width="2" height="9" fill="#1A8F5C"></rect><rect
							x="12"
							y="1"
							width="2"
							height="11"
							fill="#1A8F5C"
						></rect></svg
					><span class="_0a8448dd">{$_('stable-connection')}</span>
				</div>
				<div class="_4769223d">
					<div class="el-dropdown">
						<span
							class="ea556df8 el-dropdown-selfdefine"
							aria-haspopup="list"
							aria-controls="dropdown-menu-1938"
							role="button"
							tabindex="0"
							><svg
								aria-hidden="true"
								class="svgicon"
								style="width: 9px; height: 6px; min-width: 0px;"
								><use xlink:href="#arrow"></use></svg
							></span
						>
						<ul class="el-dropdown-menu el-popper" id="dropdown-menu-1938" style="display: none;">
							<li class="_2bffe78d">{$_('no-preview')}<!----></li>
							<li class="_2bffe78d active">
								{$_('popular-searches')}<svg
									aria-hidden="true"
									class="svgicon"
									style="width: 15px; height: 10px; min-width: 0px;"
									><use xlink:href="#checked"></use></svg
								>
							</li>
							<li class="_2bffe78d">{$_('favorites')}<!----></li>
						</ul>
					</div>
					<div class="efb15da4">
						<div data-play="false" class="c105d8c5" style="animation-duration: 50s;">
							<dl class="_11d05b40">
								<dd>
									<span>BTC/USDT</span><span class="_5ebc2b72 _1c7d7aa1">-3.40% </span>
								</dd>
								<dd>
									<span>ETH/USDT</span><span class="_5ebc2b72 _1c7d7aa1">-4.06% </span>
								</dd>
								<dd>
									<span>SHIB/USDT</span><span class="_5ebc2b72 _1c7d7aa1">-11.08% </span>
								</dd>
								<dd>
									<span>{$_('xrp-usdt')}</span><span class="_5ebc2b72 _1c7d7aa1">-7.22% </span>
								</dd>
								<dd>
									<span>DOGE/USDT</span><span class="_5ebc2b72 _1c7d7aa1">-10.43% </span>
								</dd>
							</dl>
							<dl class="_11d05b40 da1b6d3a">
								<dd>
									<span>BTC/USDT</span><span class="_5ebc2b72 _1c7d7aa1">-3.40% </span>
								</dd>
								<dd>
									<span>ETH/USDT</span><span class="_5ebc2b72 _1c7d7aa1">-4.06% </span>
								</dd>
								<dd>
									<span>SHIB/USDT</span><span class="_5ebc2b72 _1c7d7aa1">-11.08% </span>
								</dd>
								<dd>
									<span>{$_('xrp-usdt')}</span><span class="_5ebc2b72 _1c7d7aa1">-7.22% </span>
								</dd>
								<dd>
									<span>DOGE/USDT</span><span class="_5ebc2b72 _1c7d7aa1">-10.43% </span>
								</dd>
							</dl>
						</div>
					</div>
				</div>
			</section>
		</section>
	</main>
</div>
