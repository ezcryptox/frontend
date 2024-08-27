<script lang="ts">
	import { _ } from 'svelte-i18n';
	import '../../../styles/wallet/deposit_withdrawal.css';
	import { DataListTable } from '$lib/components/ui/datatable';
	import { onMount } from 'svelte';
	import axios from 'axios';
	import VirtualList from '@sveltejs/svelte-virtual-list';
	import RiskDialog from '../riskdialog/riskdialog.svelte';
	import { ServerURl } from '$lib/backendUrl';
	import { handleAuthToken } from '$lib/store/routes';
	import pkg from 'lodash';
	const { debounce } = pkg;
	import { mode } from 'mode-watcher';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import { toast } from 'svelte-sonner';

	type BlockChain = {
		name: string;
		fullName: string;
		confirmations: number;
		type: string;
		suspended: boolean;
		chainUrl: string;
	};
	$: loading = true;

	let riskDialogOpen = false;

	$: currencies = [];

	$: filteredCurrencies = [];
	let assetBalances: { [k: string]: { balance: number } } = {};
	let searchQuery = '';
	const handleSearch = (ev: any) => {
		const value = ev.target.value.trim();
		searchQuery = value;
		//@ts-ignore
		filteredCurrencies = [
			...currencies.filter(
				(c) =>
					c.name.toLowerCase().includes(value.toLowerCase()) ||
					c.fullName.toLowerCase().includes(value.toLowerCase())
			)
		];
	};
	const debouncedHandleInputChange = debounce(handleSearch, 300);

	$: walletAddressValid = true;
	$: walletAddress = '';

	const handleAddressInput = (ev: any) => {
		if (!selectedBlockchain) return;
		const { name, type } = selectedBlockchain;
		walletAddress = ev.target.value;

		if (type === 'ERC20') {
			walletAddressValid = /^0x[a-fA-F0-9]{40}$/.test(walletAddress);
		} else if (name === 'BTC') {
			walletAddressValid =
				/^(1[1-9A-HJ-NP-Za-km-z]{25,34}|3[1-9A-HJ-NP-Za-km-z]{25,34}|bc1[a-zA-HJ-NP-Z0-9]{39,59})$/.test(
					walletAddress
				);
		} else if (name === 'LTC') {
			walletAddressValid = /^(L[1-9A-HJ-NP-Za-km-z]{25,34}|M[1-9A-HJ-NP-Za-km-z]{25,34})$/.test(
				walletAddress
			);
		} else if (name === 'XRP') {
			walletAddressValid = /^r[1-9A-HJ-NP-Za-km-z]{25,34}$/.test(walletAddress);
		} else if (name === 'BCH') {
			walletAddressValid = /^(bitcoincash:|q|p)[pqz][1-9A-HJ-NP-Za-km-z]{25,39}$/.test(
				walletAddress
			);
		} else if (name === 'TRX') {
			walletAddressValid = /^T[a-zA-HJ-NP-Z0-9]{33}$/.test(walletAddress);
		} else walletAddressValid = false;

		if (walletAddressValid) {
			currentStep = 3;
		} else currentStep = 2;
	};

	const debounceHandleAddressChange = debounce(handleAddressInput, 300);

	$: withdrawalAmount = 0;
	$: withdrawalAmountValid = true;

	$: selectedCurrency = null;
	$: selectedBlockchain = null;
	$: networkOpen = false;
	const popular = [
		{ name: 'BTC', icon: 'https://www.datocms-assets.com/51952/1635193869-btc.png' },
		{ name: 'ETH', icon: 'https://www.datocms-assets.com/51952/1635345356-eth.png' },
		{ name: 'TRX', icon: 'https://www.datocms-assets.com/51952/1638549830-trx.png' },
		{ name: 'USDD', icon: 'https://www.datocms-assets.com/51952/1651675507-usdd.png' },
		{ name: 'USDT', icon: 'https://www.datocms-assets.com/51952/1638913308-usdt.png' }
		// { name: 'HTX', icon: 'https://www.datocms-assets.com/51952/1706088741-x-dark.png' }
	];

	let cryptoMenuOpen = false;
	$: currentStep = 1;

	$: getStepState = (step: number) => {
		if (currentStep > step) return 'is-finish';
		if (currentStep === step) return 'is-process';
		return 'is-wait';
	};

	const handleSetSelectedCurrency = (currency: string) => {
		selectedCurrency = currencies.find((c) => c.name === currency);
		selectedBlockchain = null;
		handleChangeWMTap(0)({})
		if (selectedCurrency) currentStep = 2;
		searchQuery = selectedCurrency?.name || '';
		
		if (!selectedCurrency) {
			currentStep = 1;
			selectedBlockchain = null;
		}
	};

	async function loadCurrencies() {
		try {
			const result = (
				await axios.get(`${ServerURl()}/api/assets/currencies`, {
					headers: {
						'Content-type': 'application/json',
						Authorization: `Bearer ${$handleAuthToken}`
					}
				})
			).data;
			return result;
		} catch (err: any) {
			console.log('error loading currencies', err.message);
		}
	}

	const handleSetSelectedBlockchain = (blockchain: BlockChain) => {
		if (blockchain.suspended) return;
		selectedBlockchain = blockchain;
		networkOpen = false;
		walletAddressValid = true;
		walletAddress = '';
		setTimeout(() => {
			if (blockchain) riskDialogOpen = true;
		}, 200);
	};

	$: currentWMTab = 0;
	const handleChangeWMTap = (tab: number) => (ev: any) => {
		currentWMTab = tab;
		selectedBlockchain = null;


		walletAddress = '';
		walletAddressValid = true;
		


		accountMethodValueValid = true;
		selectedAccountMethod = '';
		selectedAccountMethodValue = '';

		withdrawalAmountValid = true;
		withdrawalAmount = 0;
	};

	const handleWithdrawalAmountInput = (ev: any) => {
		const value = ev.target.value;
		if (value?.trim() === '') return;
		const numericValue = parseFloat(value);
		if (
			isNaN(numericValue) ||
			value.trim() === '' ||
			value.split('.').length > 2 ||
			/[^0-9.]/.test(value)
		) {
			ev.target.value = withdrawalAmount;
		} else withdrawalAmount = numericValue
	};
	const handleFormatAmount = () => {
		if (!selectedCurrency) return;
		const availableBalance = assetBalances[selectedCurrency.name].balance;
		if (availableBalance < withdrawalAmount) withdrawalAmount = availableBalance;
		withdrawalAmountValid = withdrawalAmount > 0;
	};


	$: selectedAccountMethod = '';
	$: selectedAccountMethodValue = '';
	$: accountMethodValueValid = true;
	$: accountMethodOpen = false;

	const handleAccountMethodChange = (ev: any) => {
		if (!selectedAccountMethod) return;
		const value = ev.target.value.trim();
		selectedAccountMethodValue = value;

		if (selectedAccountMethod === 'email' && !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
			accountMethodValueValid = false
		} else accountMethodValueValid = true


		if (accountMethodValueValid) currentStep++
		else currentStep = 2;

	}
	const debounceHandleAccountMethodChange = debounce(handleAccountMethodChange, 300);


	const handleSelectAccountMethod = (method: 'email' | 'uid') => (ev: any) => {
		ev.stopPropagation()
		accountMethodOpen = false;
		selectedAccountMethod=method;
	}


	$: processingWithdrawal = false;

	const handleProcessWithdrawal = async () => {
		if (processingWithdrawal || !withdrawalAmountValid || currentStep < 3) return;
		try {
			processingWithdrawal = true;

		  (await axios.post(`${ServerURl()}/api/assets/withdraw`, {
				amount: withdrawalAmount,
				chain: selectedBlockchain?.name,
				asset: selectedCurrency?.name,
				...(!currentWMTab ? {
					type: 'on-chain',
					walletAddress: walletAddress 
				} : {
					type: 'account',
					method: selectedAccountMethod,
					methodValue: selectedAccountMethodValue
				})
			}, {
				headers: {
					'Content-type': 'application/json',
					Authorization: `Bearer ${$handleAuthToken}`
				}
			}))
			//@ts-ignore
			assetBalances = {...assetBalances, [selectedCurrency.name]: {
				//@ts-ignore
				...assetBalances[selectedCurrency.name],
				//@ts-ignore
				balance: assetBalances[selectedCurrency.name] - withdrawalAmount
			}}
			toast.success('Withdrawal Successful')
		} catch (error) {}
		finally {
			processingWithdrawal = false;
		}
	};
	const handleSetMaxAmount = (ev: any) => {
		ev.preventDefault();
		withdrawalAmount = assetBalances[selectedCurrency?.name]?.balance;
		handleFormatAmount();
	};
	async function loadBalances() {
		const { balances } = (
			await axios.get(`${ServerURl()}/api/assets/wallet-balance`, {
				headers: {
					'Content-type': 'application/json',
					Authorization: `Bearer ${$handleAuthToken}`
				}
			})
		).data;
		return balances;
	}

	$: transTab = 0;
	onMount(async () => {
		try {
			const [balances, _list] = await Promise.all([loadBalances(), loadCurrencies()]);
			currencies = [..._list];
			filteredCurrencies = [...currencies];
			assetBalances = balances;
			loading = false;
		} catch (err: any) {
			console.log('Error > ', err.message);
		}

		const hideDialogs = () => {
			cryptoMenuOpen = false;
			networkOpen = false;
			accountMethodOpen = false;
		};
		document.body.addEventListener('click', hideDialogs);
		return () => {
			document.body.removeEventListener('click', hideDialogs);
		};
	});
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="P5bsS depositWithdrawLayout mt-[64px] p-[48px]" on:click={() => {}}>
	<h3 class="aWNEU aOozD">
		<a href="/wallet/spot">Assets</a><svg
			width="16"
			height="16"
			viewBox="0 0 16 16"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			style="margin: 0px 4px;"
			><path d="M11 2.5H13L5 13.5H3L11 2.5Z" fill="currentColor"></path></svg
		>
		<!-- svelte-ignore a11y-invalid-attribute -->
		<a href="javascript:;" class="-pl-z">Withdraw</a>
	</h3>
	<div
		class="f7TBC aOozD {!currencies.length || loading || processingWithdrawal
			? 'pointer-events-none opacity-45'
			: ''}"
	>
		<div class="qnl7D">
			<h3 class="i7xy1">Withdraw</h3>
			<div class="el-steps el-steps--vertical tNp4k">
				<div class="el-step is-vertical" style="flex-basis: 50%;">
					<!-- icon & line -->
					<div class="el-step__head {getStepState(1)}">
						<div class="el-step__line">
							<i
								class="el-step__line-inner"
								style="transition-delay: 0ms; border-width: 0px; height: 0%;"
							></i>
						</div>
						<div class="el-step__icon is-text"><div class="el-step__icon-inner">1</div></div>
					</div>
					<div class="el-step__main">
						<div class="el-step__title {getStepState(1)}">Select Crypto</div>
						<div class="el-step__description {getStepState(1)}">
							<div style="padding-bottom: 40px;">
								<div class="el-dropdown relative" style="margin-right: 30px;">
									<!-- svelte-ignore a11y-interactive-supports-focus -->
									<div
										on:click={(ev) => {
											ev.stopPropagation();
											cryptoMenuOpen = true;
										}}
										data-size="large"
										class="{cryptoMenuOpen
											? 'gs2D2 SKd74 currencySelectInput'
											: 'currencySelectInputBorderBox'} el-tooltip__trigger el-tooltip__trigger"
										role="button"
										aria-controls="el-id-5098-1"
										aria-expanded={cryptoMenuOpen ? 'true' : 'false'}
										aria-haspopup="menu"
									>
										{#if selectedCurrency && !cryptoMenuOpen}
											<span
												class="_3Fw8O"
												style="width: 20px; height: 20px; background-image: url(&quot;{selectedCurrency.icon ||
													`/svgs/currency-${$mode}.svg`}&quot;); margin-right: 4px;"
											></span><strong>{selectedCurrency.name}</strong
											>{selectedCurrency.fullName}<svg
												fill="currentColor"
												class="arrowIcon"
												style="width: 16px; height: 16px;"
												><use xlink:href="#web-core-icon-arrow-down"></use></svg
											>
										{:else if !selectedCurrency && !cryptoMenuOpen}
											Select Crypto
											<svg fill="currentColor" class="arrowIcon" style="width: 16px; height: 16px;"
												><use xlink:href="#web-core-icon-arrow-down"></use></svg
											><svg fill="currentColor" class="arrowIcon" style="width: 16px; height: 16px;"
												><use xlink:href="#web-core-icon-arrow-down"></use></svg
											>
										{:else}
											<div class="ZT1pJ -KOfC">
												<!-- svelte-ignore a11y-click-events-have-key-events -->
												<svg
													on:click={() => handleSetSelectedCurrency('-1')}
													fill="currentColor"
													style="width: 20px; height: 20px; color: rgb(135, 135, 135); margin-right: 4px;"
													><use xlink:href="#web-core-icon-search"></use></svg
												><input
													class="currencySelectInput el-tooltip__trigger el-tooltip__trigger x2zYL"
													role="button"
													on:input={debouncedHandleInputChange}
													on:focusin={() => (cryptoMenuOpen = true)}
													aria-controls="el-id-5098-1"
													aria-expanded="true"
													aria-haspopup="menu"
													type="text"
													autocomplete="off"
													tabindex="0"
													id="el-id-5098-0"
													value={searchQuery}
													placeholder="Select Crypto"
												/>
												{#if selectedCurrency}
													<button on:click={() => handleSetSelectedCurrency('-1')} class="gti-O"
														><svg fill="currentColor" style="width: 16px; height: 16px;"
															><use xlink:href="#web-core-icon-reverse-close"></use></svg
														></button
													>
												{/if}
											</div>
										{/if}
									</div>
									{#if cryptoMenuOpen}
										<div
											class="el-popper is-pure is-light el-dropdown__popper depositWithdrawDropdown"
											tabindex="-1"
											aria-hidden="false"
											data-popper-reference-hidden="false"
											data-popper-escaped="false"
											data-popper-placement="bottom"
											style="z-index: 1000008; position: absolute; inset: 55px 0 auto auto;"
										>
											<div class="el-scrollbar">
												<div class="el-scrollbar__wrap el-scrollbar__wrap--hidden-default">
													<div class="el-scrollbar__view el-dropdown__list" style="">
														<ul
															class="el-dropdown-menu eEaok"
															tabindex="-1"
															role="menu"
															aria-labelledby="el-id-7620-0"
															id="el-id-7620-1"
															style="outline: none;"
														>
															<div style="padding: 0px 12px;">
																<!----><!---->
																<p>Frequently Used</p>
																<ul class="yB0oP">
																	{#each popular as currency}
																		<!-- svelte-ignore a11y-click-events-have-key-events -->
																		<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
																		<li
																			on:click={() => handleSetSelectedCurrency(currency.name)}
																			class="cursorPointer"
																		>
																			<span
																				class="_3Fw8O"
																				style="width: 14px; height: 14px; background-image: url(&quot;{currency.icon}&quot;);"
																			></span>
																			{currency.name}
																		</li>
																	{/each}
																</ul>
																<p style="margin-top: 20px;">All</p>
															</div>
															<div style="margin-top: 8px;">
																<div
																	class="vue-recycle-scroller ready direction-vertical"
																	style="height: 260px;"
																>
																	<VirtualList itemHeight={48} items={filteredCurrencies} let:item>
																		<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
																		<!-- svelte-ignore a11y-click-events-have-key-events -->
																		<dl
																			on:click={(ev) => {
																				ev.stopPropagation();
																				!item.suspended && handleSetSelectedCurrency(item.name);
																			}}
																			class={item.suspended ? 'Gy-yk' : ''}
																		>
																			<dt class="DfPKc">
																				<span
																					class="_3Fw8O"
																					style="width: 24px; height: 24px; background-image: url(&quot;{item.icon ||
																						`/svgs/currency-${$mode}.svg`}&quot;);"
																				></span><strong>{item.name}</strong>
																				{item.fullName}
																			</dt>
																			{#if item.suspended}
																				<dd><span class="_2gAQg">Suspended</span></dd>
																			{:else}
																			<dd><strong class="block">{(assetBalances[item.name]?.balance || 0).toFixed(2)}</strong></dd>
																			{/if}
																		</dl>
																	</VirtualList>
																</div>
															</div>
														</ul>
													</div>
												</div>
											</div>
										</div>
									{/if}
								</div>
								<p style="margin-top: 12px; color: rgb(135, 135, 135); font-size: 14px;">
									Frequently Used
								</p>
								<ul class="yB0oP rElBU">
									{#each popular as currency}
										<!-- svelte-ignore a11y-click-events-have-key-events -->
										<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
										<li
											on:click={() => handleSetSelectedCurrency(currency.name)}
											class="cursorPointer"
										>
											<span
												class="_3Fw8O"
												style="width: 14px; height: 14px; background-image: url(&quot;{currency.icon}&quot;);"
											></span>
											{currency.name}
										</li>
									{/each}
								</ul>
							</div>
						</div>
					</div>
				</div>
				<div class="el-step is-vertical" style="flex-basis: 50%;">
					<!-- icon & line -->
					<div class="el-step__head {getStepState(2)}">
						<div class="el-step__line">
							<i
								class="el-step__line-inner"
								style="transition-delay: -150ms; border-width: 0px; height: 0%;"
							></i>
						</div>
						<div class="el-step__icon is-text"><div class="el-step__icon-inner">2</div></div>
					</div>
					<!-- title & description -->
					<div class="el-step__main">
						<div class="el-step__title {getStepState(2)}">Withdrawal Methods</div>
						<div class="el-step__description {getStepState(2)}">
							{#if currentStep >= 2}
								<div class="withdrawTabWraper" style="padding-bottom: 40px;">
									<div class="el-tabs el-tabs--top" style="width: 538px;">
										<div class="el-tabs__header is-top">
											<div class="el-tabs__nav-wrap is-top">
												<div class="el-tabs__nav-scroll">
													<div
														class="el-tabs__nav is-top"
														role="tablist"
														style="transform: translateX(0px);"
													>
														<div
															class="el-tabs__active-bar is-top"
															style="width: 53px; transform: translateX(0px);"
														></div>
														<div
															on:click={handleChangeWMTap(0)}
															class="el-tabs__item is-top {!currentWMTab ? 'is-active' : ''}"
															id="tab-onLine"
															aria-controls="pane-onLine"
															role="tab"
															aria-selected="true"
															tabindex="0"
														>
															On-chain
														</div>
														<div
															on:click={handleChangeWMTap(1)}
															class="el-tabs__item is-top {!!currentWMTab ? 'is-active' : ''}"
															id="tab-inHome"
															aria-controls="pane-inHome"
															role="tab"
															aria-selected="false"
															tabindex="-1"
														>
															Ezcryptox Accounts
														</div>
													</div>
												</div>
											</div>
										</div>
										<div class="el-tabs__content">
											{#if !currentWMTab}
												<div
													id="pane-onLine"
													class="el-tab-pane"
													role="tabpanel"
													aria-hidden="false"
													aria-labelledby="tab-onLine"
													style=""
												>
													<span class="JTqe3">Network</span>
													<div
														on:click={(ev) => {
															ev.stopPropagation();
															networkOpen = !networkOpen;
														}}
														class="_3Johe Bte5E currencySelectInput eEaok _2Kc0F"
														style="width: 538px;"
													>
														<span
															class="z6d5D {networkOpen ? 'CFwKl' : ''} {!!selectedBlockchain
																? 'v1WVj'
																: ''}"
															data-size="large"
															><span class="KwkiX"
																>{selectedBlockchain?.fullName || 'Select Network'}</span
															><span
																style="color: rgb(135, 135, 135); font-weight: 400; margin-left: 4px;"
																>{selectedBlockchain
																	? `${selectedBlockchain.name} (${selectedBlockchain?.type})`
																	: ''}</span
															><span class="NiKDB"
																><svg fill="currentColor" style="width: 16px; height: 16px;"
																	><use xlink:href="#web-core-icon-reverse-close"></use></svg
																></span
															><svg
																fill="currentColor"
																class="imI90"
																style="width: 16px; height: 16px;"
																><use xlink:href="#web-core-icon-arrow-down"></use></svg
															></span
														>
														{#if networkOpen}
															<div class="_2UN76 CFwKl" style="width: 100%;">
																<p class="DfPKc hpd-X">
																	<svg
																		width="22"
																		height="22"
																		viewBox="0 0 22 22"
																		fill="none"
																		xmlns="http://www.w3.org/2000/svg"
																		style="margin-right: 4px;"
																		><rect
																			x="10.5"
																			y="7.5"
																			width="1"
																			height="4"
																			fill="#E59940"
																			stroke="#E59940"
																		></rect><rect
																			x="10.5"
																			y="13.5"
																			width="1"
																			height="1"
																			fill="#E59940"
																			stroke="#E59940"
																		></rect><circle
																			cx="8"
																			cy="8"
																			r="7.25"
																			transform="matrix(1 0 0 -1 3 19)"
																			stroke="#E59940"
																			stroke-width="1.5"
																		></circle></svg
																	> Please make sure you select the same network as on the withdrawal
																	platform to avoid asset loss.
																</p>
																<ul class="prRS8" style="max-height: 300px;">
																	{#each selectedCurrency?.blockchains || [] as blockchain}
																		<!-- svelte-ignore a11y-click-events-have-key-events -->
																		<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
																		<li
																			on:click={(ev) => {
																				ev.stopPropagation();
																				handleSetSelectedBlockchain(blockchain);
																			}}
																		>
																			<dl class={blockchain.suspended ? 'Gy-yk' : ''}>
																				<dt>
																					<strong style="line-height: 26px;"
																						>{blockchain.fullName}</strong
																					><span>{blockchain.name} ({blockchain.type})</span>
																				</dt>
																				{#if blockchain.suspended}
																					<dd>Suspended</dd>
																				{:else}
																					<dd class="_2HHAg">
																						<span style="line-height: 26px;"
																							>Est. Arrival <strong style="font-weight: 400;"
																								>{blockchain.estArrival < 60
																									? blockchain.estArrival
																									: blockchain.estArrival < 3600
																										? ~~(blockchain.estArrival / 60)
																										: ~~(blockchain.estArrival / 3600)}
																								{blockchain.estArrival < 60
																									? 'sec'
																									: blockchain.estArrival < 3600
																										? 'min'
																										: 'hr'}</strong
																							></span
																						><span
																							>Fee <strong
																								style="font-weight: 400; margin-left: 1px;"
																								>{blockchain.fee.toFixed(8)}
																								{blockchain.name}</strong
																							>
																							(≈${(blockchain.fee * blockchain.usdRate).toFixed(2)})
																						</span>
																					</dd>
																				{/if}
																			</dl>
																		</li>
																	{/each}
																</ul>
															</div>
														{/if}
													</div>
													<span class="JTqe3">Address</span>
													<div
														data-size="large"
														class="gs2D2 SKd74 currencySelectInput IVSD3 {walletAddressValid
															? ''
															: 'FNAG2'} {selectedBlockchain
															? ''
															: 'pointer-events-none opacity-45'}"
													>
														<div class="ZT1pJ -KOfC">
															<!--ECYDD-->
															<input
																class="currencySelectInput IVSD3 x2zYL"
																on:input={debounceHandleAddressChange}
																type="text"
																value={walletAddress}
																autocomplete="off"
																id="web-core-input-2"
																placeholder="Enter address"
															/>
														</div>
													</div>
													{#if !walletAddressValid}
														<p class="FNAG2">
															The withdrawal address format is incorrect. Please check the
															withdrawal address length and character content and try again.
														</p>
													{/if}
												</div>
											{:else}
												<div
													id="pane-inHome"
													class="el-tab-pane"
													role="tabpanel"
													aria-labelledby="tab-inHome"
												>
													<div>
														<p class="v6ZL5">Select Method</p>
														<div on:click={(ev) => {
															ev.stopPropagation()
															accountMethodOpen = true;
														}} class="_3Johe Bte5E currencySelectInput" style="width: 538px;">
															<span class="z6d5D v1WVj" data-size="large"
																><span class="KwkiX">{selectedAccountMethod === 'email' ? 'Email Address' : selectedAccountMethod === 'uid' ? 'Ezcryptox UUID' : 'Select Method'}</span><span class="NiKDB"
																	><svg fill="currentColor" style="width: 16px; height: 16px;"
																		><use xlink:href="#web-core-icon-reverse-close"></use></svg
																	></span
																><svg
																	fill="currentColor"
																	class="imI90"
																	style="width: 16px; height: 16px;"
																	><use xlink:href="#web-core-icon-arrow-down"></use></svg
																></span
															>
															<!-- svelte-ignore missing-declaration -->
															<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
															{#if accountMethodOpen}
																<div class="_2UN76 CFwKl" style="width: 100%;">
																	<ul class="prRS8" style="max-height: 300px;">
																		<!-- svelte-ignore missing-declaration -->
																		<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
																		<li on:click={handleSelectAccountMethod('email')}>
																			<div
																				class="_0dpVu {selectedAccountMethod === 'email'
																					? 'tZytM'
																					: ''}"
																			>
																				<span class="KuoRC">Email Address</span>
																			</div>
																		</li>
																		<!-- svelte-ignore missing-declaration -->
																		<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
																		<li on:click={handleSelectAccountMethod('uid')}>
																			<div
																				class="_0dpVu {selectedAccountMethod === 'uid'
																					? 'tZytM'
																					: ''}"
																			>
																				<span class="KuoRC">Ezcryptox UUID</span>
																			</div>
																		</li>
																	</ul>
																</div>
															{/if}
														</div>
														<p class="v6ZL5">{selectedAccountMethod === 'email' ? 'Email Address' : 'Ezcrypto UUID'}</p>
														<div
															data-size="large"
															class="gs2D2 SKd74 currencySelectInput {accountMethodValueValid ? '' : 'FNAG2'} {!selectedAccountMethod ? 'opacity-45 pointer-events-none' : ''}"
															style="width: 540px;"
														>
															<div class="ZT1pJ -KOfC">
																<input
																	class="currencySelectInput x2zYL"
																	type="text"
																	on:input={debounceHandleAccountMethodChange}
																	autocomplete="off"
																	id="web-core-input-6"
																	value={selectedAccountMethodValue}
																	placeholder="Receiver's {selectedAccountMethod === 'email' ? ' email address' : 'Ezcrypto UUID'}"
																	style="width: 540px;"
																/>
																{#if selectedAccountMethodValue}
																	<button on:click={() => selectedAccountMethodValue = ''} class="gti-O"
																		><svg fill="currentColor" style="width: 16px; height: 16px;"
																			><use xlink:href="#web-core-icon-reverse-close"></use></svg
																		></button
																	>
																{/if}
															</div>
														</div>
														{#if !accountMethodValueValid && selectedAccountMethod === 'email'}
															<p class="FNAG2">Please enter a valid email address</p>
														{/if}
													</div>
												</div>
											{/if}
										</div>
									</div>
								</div>
							{/if}
						</div>
					</div>
				</div>
				<div class="el-step is-vertical is-flex" style="flex-basis: 50%;">
					<div class="el-step__head {getStepState(3)}">
						<div class="el-step__line"><i class="el-step__line-inner"></i></div>
						<div class="el-step__icon is-text"><div class="el-step__icon-inner">3</div></div>
					</div>
					<div class="el-step__main">
						<div class="el-step__title {getStepState(3)}">Withdraw Amount</div>
						<div class="el-step__description {getStepState(3)}">
							{#if currentStep >= 3}
								<div class="qtsYk">
									<div
										data-size="large"
										class="gs2D2 SKd74 {!withdrawalAmountValid ? 'rndsC' : ''}"
										style="z-index: 2; position: relative;"
									>
										<div class="ZT1pJ -KOfC">
											<input
												class="x2zYL"
												on:input={handleWithdrawalAmountInput}
												on:blur={handleFormatAmount}
												autocomplete="off"
												value={withdrawalAmount}
												type="text"
												data-min="-1"
												data-max="-1"
												id="web-core-input-7"
												data-fixed="8"
												data-negative="false"
												style="z-index: 2; position: relative;"
											/><span class="dCa74"
												>{selectedCurrency?.name}
												<a on:click={handleSetMaxAmount} href="javascript:;">Max</a></span
											>
										</div>
									</div>
									<div class="FW379 lqZuR">
										Max Amount Per Withdrawal <strong
											>{selectedBlockchain?.maxWithdrawal} {selectedBlockchain?.name}</strong
										>
									</div>
									{#if !withdrawalAmountValid}
										<p class="rndsC">
											The amount must be no less than {selectedBlockchain?.fee?.toFixed(
												8
											)}{selectedCurrency?.name}.
										</p>
									{/if}
									<div class="MhbUH">
										<dl>
											<dt class="lqZuR">
												24h Limit <span style="margin-left: 4px;">0 / $ 10,000</span>
											</dt>
											<dd class="lqZuR">
												<Tooltip.Root>
													<Tooltip.Trigger>
														<span class="-m6DU el-tooltip__trigger el-tooltip__trigger"
															>Available</span
														>
													</Tooltip.Trigger>
													<Tooltip.Content class="">
														<p class="max-w-40 text-[10px]">
															The amount of the chosen crypto that can be withdrawn or transferred
															out, with no borrowings and excluding the assets in use.<br/> The
															withdrawable amount may be less than the available balance when your
															account has borrowings, as withdrawing in this case will increase the
															risk of liquidation.
														</p>
													</Tooltip.Content>
												</Tooltip.Root>
												<strong style="margin: 0px 4px;"
													>{assetBalances[selectedCurrency?.name]?.balance?.toFixed(8)}
													{selectedCurrency?.name}</strong
												><svg fill="currentColor" style="width: 16px; height: 16px;"
													><use xlink:href="#web-core-icon-transfer"></use></svg
												>
											</dd>
										</dl>
									</div>
									<div class="_9truM">
										{#if !currentWMTab}
										<dl>
											<dt>Fee</dt>
											<dd>
												<strong
													>{selectedBlockchain?.fee?.toFixed(8)} {selectedCurrency?.name}</strong
												>
											</dd>
										</dl>
										{/if}
										<dl>
											<dt>To Receive</dt>
											<dd>
												<strong
													>{(withdrawalAmount - (!currentWMTab ? selectedBlockchain?.fee : 0)).toFixed(8)}
													{selectedCurrency?.name}</strong
												>
											</dd>
										</dl>
										{#if !!currentWMTab}
										<dl><dt>No fees will be charged for transfers between Ezcryptox accounts.</dt></dl>
										{/if}
									</div>
									<button
										data-size="large"
										type="button"
										on:click={handleProcessWithdrawal}
										disabled={!withdrawalAmount || !withdrawalAmountValid}
										class="jRLsY SOUdU"
										style="width: 100%; margin-top: 24px;"
										><span>{processingWithdrawal ? 'Please Wait...' : 'Withdraw'}</span></button
									>
									{#if selectedBlockchain?.withdrawalInstruction}
										<ol class="s-s-w">
										<li>
											{ selectedBlockchain?.withdrawalInstruction || ''}
										</li>
									</ol>
									{/if}
									
								</div>
							{/if}
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="JuvZU">
			<div class="raObg">
				<div class="qRSxN">
					<h4>FAQs</h4>
					<p>
						<span
							>Are you having any issues with your withdrawal? We've prepared FAQs to assist you. <a
								href="https://support.poloniex.com/hc/en-us/sections/360006475493"
								target="blank">View more here</a
							></span
						><svg
							width="14"
							height="14"
							viewBox="0 0 20 20"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
							><path
								fill-rule="evenodd"
								clip-rule="evenodd"
								d="M9.36018 3.06641L10.6419 4.43487L4.69353 10.0064L10.6412 15.5657L9.36089 16.9355L1.94922 10.0079L9.36018 3.06641Z"
								fill="currentColor"
							></path></svg
						>
					</p>
					<div class="_5I4sI">
						<a href="https://support.poloniex.com/hc/en-us/articles/13128910599959" target="_blank"
							>How to Check if a Token is Supported (Based on Contract Address)</a
						><a href="https://support.poloniex.com/hc/en-us/articles/4953389499415" target="_blank"
							>Depositing from MetaMask Wallet</a
						>
					</div>
				</div>
				<svg
					width="76"
					height="76"
					viewBox="0 0 76 76"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					><g clip-path="url(#clip0_3109_7199)"
						><path
							d="M0 3.5625C0 2.61767 0.375334 1.71153 1.04343 1.04343C1.71153 0.375334 2.61767 0 3.5625 0L49.875 0C50.8198 0 51.726 0.375334 52.3941 1.04343C53.0622 1.71153 53.4375 2.61767 53.4375 3.5625V34.143C53.4375 35.0878 53.0622 35.994 52.3941 36.6621C51.726 37.3302 50.8198 37.7055 49.875 37.7055H3.5625C2.61767 37.7055 1.71153 37.3302 1.04343 36.6621C0.375334 35.994 0 35.0878 0 34.143L0 3.5625Z"
							fill="#555555"
						></path><path
							d="M22.5625 31.8486C22.5625 30.5889 23.0629 29.3807 23.9537 28.4899C24.8445 27.5991 26.0527 27.0986 27.3125 27.0986H71.25C72.5098 27.0986 73.718 27.5991 74.6088 28.4899C75.4996 29.3807 76 30.5889 76 31.8486V60.0541C76 61.3139 75.4996 62.5221 74.6088 63.4129C73.718 64.3037 72.5098 64.8041 71.25 64.8041H27.3125C26.0527 64.8041 24.8445 64.3037 23.9537 63.4129C23.0629 62.5221 22.5625 61.3139 22.5625 60.0541V31.8486Z"
							fill="#119E5F"
						></path><path
							fill-rule="evenodd"
							clip-rule="evenodd"
							d="M53.4375 27.0986V34.1413C53.4375 35.0861 53.0622 35.9923 52.3941 36.6604C51.726 37.3285 50.8198 37.7038 49.875 37.7038H22.5625V31.8486C22.5625 30.5889 23.0629 29.3807 23.9537 28.4899C24.8445 27.5991 26.0527 27.0986 27.3125 27.0986H53.4375Z"
							fill="#555555"
						></path><path d="M7.125 48.3087V35.9365H17.2188L7.125 48.3087Z" fill="#555555"
						></path><path d="M68.2813 75.9991V63.627H58.1875L68.2813 75.9991Z" fill="#119E5F"
						></path><path
							d="M17.442 22.1664C18.2849 22.1693 19.0945 21.8374 19.6928 21.2436C20.2911 20.6497 20.6291 19.8426 20.6324 18.9997C20.6324 17.2501 19.2042 15.833 17.442 15.833C17.0245 15.8314 16.6107 15.912 16.2244 16.0702C15.838 16.2284 15.4866 16.4612 15.1902 16.7553C14.8937 17.0493 14.6582 17.3989 14.4969 17.784C14.3355 18.1691 14.2517 18.5822 14.25 18.9997C14.25 20.7493 15.6782 22.1664 17.442 22.1664ZM27.0164 22.1664C27.8594 22.1693 28.669 21.8374 29.2672 21.2436C29.8655 20.6497 30.2035 19.8426 30.2068 18.9997C30.2068 17.2501 28.7787 15.833 27.0164 15.833C26.5989 15.8314 26.1851 15.912 25.7988 16.0702C25.4124 16.2284 25.061 16.4612 24.7646 16.7553C24.4682 17.0493 24.2326 17.3989 24.0713 17.784C23.91 18.1691 23.8261 18.5822 23.8244 18.9997C23.8244 20.7493 25.2542 22.1664 27.0164 22.1664ZM36.5908 22.1664C37.4338 22.1693 38.2434 21.8374 38.8417 21.2436C39.4399 20.6497 39.7779 19.8426 39.7812 18.9997C39.7812 17.2501 38.3531 15.833 36.5892 15.833C35.7463 15.8301 34.9367 16.162 34.3384 16.7558C33.7402 17.3497 33.4022 18.1568 33.3988 18.9997C33.3988 20.7493 34.827 22.1664 36.5892 22.1664H36.5908ZM39.6087 49.083C40.4516 49.086 41.2612 48.754 41.8595 48.1602C42.4578 47.5664 42.7957 46.7593 42.7991 45.9164C42.7991 44.1668 41.3709 42.7497 39.6087 42.7497C39.1912 42.748 38.7774 42.8286 38.391 42.9869C38.0046 43.1451 37.6532 43.3779 37.3568 43.6719C37.0604 43.966 36.8248 44.3155 36.6635 44.7006C36.5022 45.0857 36.4183 45.4988 36.4167 45.9164C36.4167 47.6659 37.8448 49.083 39.6087 49.083ZM49.1831 49.083C50.026 49.086 50.8356 48.754 51.4339 48.1602C52.0322 47.5664 52.3701 46.7593 52.3735 45.9164C52.3735 44.1668 50.9453 42.7497 49.1815 42.7497C48.3386 42.7468 47.529 43.0787 46.9307 43.6725C46.3324 44.2663 45.9944 45.0734 45.9911 45.9164C45.9911 47.6659 47.4208 49.083 49.1831 49.083ZM58.7575 49.083C59.6004 49.086 60.41 48.754 61.0083 48.1602C61.6066 47.5664 61.9446 46.7593 61.9479 45.9164C61.9479 44.1668 60.5198 42.7497 58.7559 42.7497C57.913 42.7468 57.1034 43.0787 56.5051 43.6725C55.9068 44.2663 55.5689 45.0734 55.5655 45.9164C55.5655 47.6659 56.9953 49.083 58.7575 49.083Z"
							fill="black"
							fill-opacity="0.5"
						></path></g
					><defs
						><clipPath id="clip0_3109_7199"
							><rect width="76" height="76" fill="white"></rect></clipPath
						></defs
					></svg
				>
			</div>
		</div>
	</div>
	<div class="_5nfqZ aOozD">
		<div class="G-loI">
			<dl>
				<dt><h4>Recent Withdrawals</h4></dt>
				<dd>
					<button data-size="medium" type="button" class="jRLsY"
						><span
							><!---->View All
							<svg
								width="20"
								height="20"
								viewBox="0 0 20 20"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
								class="IUHgN"
								><path
									fill-rule="evenodd"
									clip-rule="evenodd"
									d="M9.36018 3.06641L10.6419 4.43487L4.69353 10.0064L10.6412 15.5657L9.36089 16.9355L1.94922 10.0079L9.36018 3.06641Z"
									fill="currentColor"
								></path></svg
							><!----></span
						></button
					>
				</dd>
			</dl>
			<div class="el-tabs el-tabs--top depositWithdrawHistoryWraper">
				<div class="el-tabs__header is-top">
					<!---->
					<div class="el-tabs__nav-wrap is-top">
						<!---->
						<div class="el-tabs__nav-scroll">
							<div class="el-tabs__nav is-top" role="tablist" style="transform: translateX(0px);">
								<div
									class="el-tabs__active-bar is-top"
									style="width: 55px; transform: translateX(0px);"
								></div>
								<div
									on:click={() => transTab = 2}
									class="el-tabs__item is-top {!transTab ? "is-active" : ""}"
									id="tab-onLine"
									aria-controls="pane-onLine"
									role="tab"
									aria-selected="true"
									tabindex="0"
								>
									On-chain
								</div>
								<div
									on:click={() => transTab = 1}
									class="el-tabs__item is-top {!!transTab ? "is-active" : ""}"
									id="tab-inHome"
									aria-controls="pane-inHome"
									role="tab"
									aria-selected="false"
									tabindex="-1"
								>
									Ezcryptox Accounts
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="el-tabs__content">
					{#if !transTab}
						<DataListTable
							dataListColumns={[
								{ accessor: 'time', header: 'Time', cell: value => new Date(value).toLocaleDateString() },
								{ accessor: 'address', header: 'Address' },
								{ accessor: 'trans_id', header: 'Transaction ID' },
								{ accessor: 'coin', header: 'Coin' },
								{ accessor: 'fee', header: 'Fee', cell: value => value.toFixed(4) },
								{ accessor: 'receiver', header: 'Address' },
								{ accessor: 'amount', header: 'Amount', cell: value => value.toFixed(2) },
								{ accessor: 'network', header: 'Network' },
								{ accessor: 'status', header: 'Status' }
							]}

							dataListFetcher={() => {
							return axios.get(`${ServerURl()}/api/assets/transactions?mode=withdrawal&type=onchain`, {
								headers: {
									'Content-type': 'application/json',
									Authorization: `Bearer ${$handleAuthToken}`
								}
							}).then(r => r.data.transactions)
						}}
						/>
						{:else}
						<DataListTable
						dataListColumns={[
							{ accessor: 'time', header: 'Time', cell: value => new Date(value).toLocaleDateString() },
							{ accessor: 'receiver', header: 'Receiver' },
							{ accessor: 'trans_id', header: 'Transaction ID' },
							{ accessor: 'coin', header: 'Coin' },
							{ accessor: 'amount', header: 'Amount', cell: value => value.toFixed(2) },
							{ accessor: 'trans_id', header: 'Order ID' },
							{ accessor: 'status', header: 'Status' }
						]}

						dataListFetcher={() => {
							return axios.get(`${ServerURl()}/api/assets/transactions?mode=withdrawal&type=account`, {
								headers: {
									'Content-type': 'application/json',
									Authorization: `Bearer ${$handleAuthToken}`
								}
							}).then(r => r.data.transactions)
						}}
					/>
					{/if}
				</div>
			</div>
		</div>
	</div>
</div>
{#if riskDialogOpen}
	<RiskDialog currency={selectedCurrency?.name} on:close={() => (riskDialogOpen = false)} />
{/if}
<style>
	
	@media only screen and (max-width:1000px) {
		.f7TBC.aOozD {
			flex-wrap: wrap;
		}
	}
	@media only screen and (max-width:590px) {
		.currencySelectInputBorderBox  {
			width: 100%!important;
		}
		.f7TBC .JuvZU>div {
			width: 100%!important;
		}
		.s-DPKYDpRWHKRN {
			flex-wrap: wrap;
		}
		.depositWithdrawDropdown.el-dropdown__popper {
			width: 100%!important;
		}
	}
</style>