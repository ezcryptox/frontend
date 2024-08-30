<script lang="ts">
	import { _ } from 'svelte-i18n';
	import '../../../styles/wallet/deposit_withdrawal.css';
	import { DataListTable } from '$lib/components/ui/datatable';
	import { onMount } from 'svelte';
	import {mode} from 'mode-watcher';
	import QRCode from 'qrcode';
	import axios from 'axios';
	import VirtualList from '@sveltejs/svelte-virtual-list';
	import RiskDialog from '../riskdialog/riskdialog.svelte';
	import { ServerURl } from '$lib/backendUrl';
	import { handleAuthToken } from '$lib/store/routes';
	let canvasEL: HTMLCanvasElement;
	import pkg from 'lodash';
	const { debounce } = pkg;
	import { toast } from 'svelte-sonner';

  export let defaultSelectedCurrency = null;

	// Generate QR code for a given string

 async function loadQRCode(address: string) {
		if (canvasEL) {
			await QRCode.toDataURL(address)
				.then((url) => {
					const img = new Image();
					img.src = url;
					img.onload = () => {
						const ctx = canvasEL.getContext('2d');
						if (ctx) {
							ctx.clearRect(0, 0, canvasEL.width, canvasEL.height);
							const scale = Math.min(canvasEL.width / img.width, canvasEL.height / img.height);
							const x = canvasEL.width / 2 - (img.width / 2) * scale;
							const y = canvasEL.height / 2 - (img.height / 2) * scale;
							ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
						}
					};
				})
				.catch((err) => {
					console.log(err.message);
				});
		}
	}
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
	$: selectedCurrency = defaultSelectedCurrency;
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
		if (selectedCurrency) currentStep = 2;
		searchQuery = selectedCurrency?.name || '';
		if (!selectedCurrency) {
			currentStep = 1;
			selectedBlockchain = null;
		}
		cryptoMenuOpen = false;
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
	let fetchingAddress = {};
	async function fetchDepositAddress(currency, chain) {
		fetchingAddress[currency] = true;
		try {
			const { address, tag } = (
				await axios.get(
					`${ServerURl()}/api/assets/wallet-address?crypto=${currency}&chain=${chain}`,
					{
						headers: {
							'Content-type': 'application/json',
							Authorization: `Bearer ${$handleAuthToken}`
						}
					}
				)
			).data;
			if (selectedCurrency?.name !== currency || selectedBlockchain.name !== chain) return;
			await loadQRCode(address);
			if (selectedCurrency?.name !== currency || selectedBlockchain.name !== chain) return;
			//@ts-ignore
			selectedCurrency = { ...selectedCurrency, depositAddress: address };
			currentStep++;
		} catch (err: any) {
			console.log('error loading currencies', err.message);
		} finally {
			fetchingAddress[currency] = false;
		}
	}

	const handleSetSelectedBlockchain = (blockchain: BlockChain) => {
		if (blockchain.suspended) return;
		selectedBlockchain = blockchain;
		networkOpen = false;

		if (!selectedCurrency?.depositAddress && !blockchain.suspended) {
			fetchDepositAddress(selectedCurrency?.name, blockchain.name);
		}
		currentStep++;
		setTimeout(() => {
			if (blockchain) riskDialogOpen = true;
		}, 200);
	};
	onMount(async () => {
		currencies = [...(await loadCurrencies())];
		filteredCurrencies = [...currencies];
		loading = false;

		if (defaultSelectedCurrency) currentStep = 2;

		const hideDialogs = () => {
			cryptoMenuOpen = false;
			networkOpen = false;
		};
		document.body.addEventListener('click', hideDialogs);
		return () => {
			document.body.removeEventListener('click', hideDialogs);
		};
	});
	const handleCopyAddress = () => {
		navigator.clipboard.writeText(selectedCurrency?.depositAddress);
		toast.success('Copied', {
			description: 'Address copied to clipboard',
			position: 'top-center'
		});
	};
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
		<a href="javascript:;" class="-pl-z">Deposit</a>
	</h3>
	<div class="f7TBC aOozD {!currencies.length ? 'opacity-45 pointer-events-none' : ''}">
		<div class="qnl7D">
			<h3 class="i7xy1">Deposit</h3>
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
												style="width: 20px; height: 20px; background-image: url(&quot;{selectedCurrency.icon || `/svgs/currency-${$mode}.svg` }&quot;); margin-right: 4px;"
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
																			on:click={(ev) =>
																				{
																					ev.stopPropagation();
																					!item.suspended && handleSetSelectedCurrency(item.name)}
																				}
																			class="{item.suspended ? 'Gy-yk' : ''}"
																		>
																			<dt class="DfPKc">
																				<span
																					class="_3Fw8O"
																					style="width: 24px; height: 24px; background-image: url(&quot;{item.icon || `/svgs/currency-${$mode}.svg`}&quot;);"
																				></span><strong>{item.name}</strong>
																				{item.fullName}
																			</dt>
																			{#if item.suspended}
																				<dd><span class="_2gAQg">Suspended</span></dd>
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
						<div class="el-step__title {getStepState(2)}">Select Network</div>
						<div class="el-step__description {getStepState(2)}">
							{#if currentStep >= 2}
								{#if selectedBlockchain}
									<span class="luzAm AqLuX"
										>Address ending with <a
											class="luzAm"
											href={selectedBlockchain?.chainUrl || '#'}
											target="_blank"
											style="margin-left: 4px;"
											>M8XbnR2DdoJ6 <svg
												fill="currentColor"
												style="width: 14px; height: 14px; margin-left: 2px;"
												><use xlink:href="#web-core-icon-link"></use></svg
											></a
										></span
									>
								{/if}
								<div style="padding-bottom: 40px;">
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
											><span class="KwkiX">{selectedBlockchain?.fullName || 'Select Network'}</span
											><span style="color: rgb(135, 135, 135); font-weight: 400; margin-left: 4px;"
												>{selectedBlockchain
													? `${selectedBlockchain.name} (${selectedBlockchain?.type})`
													: ''}</span
											><span class="NiKDB"
												><svg fill="currentColor" style="width: 16px; height: 16px;"
													><use xlink:href="#web-core-icon-reverse-close"></use></svg
												></span
											><svg fill="currentColor" class="imI90" style="width: 16px; height: 16px;"
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
													> Please make sure you select the same network as on the withdrawal platform
													to avoid asset loss.
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
															<dl class="{blockchain.suspended ? 'Gy-yk' : ''}">
																<dt>
																	<strong style="line-height: 26px;">{blockchain.fullName}</strong
																	><span>{blockchain.name} ({blockchain.type})</span>
																</dt>
																{#if blockchain.suspended}
																	<dd>Suspended</dd>
																	{:else}
																	<dd class="_2HHAg">
																	<span
																		>{blockchain.confirmations} block confirmation(s)</span
																	>
																</dd>
																{/if}
															</dl>
														</li>
													{/each}
												</ul>
											</div>
										{/if}
									</div>
								</div>
							{/if}
						</div>
					</div>
				</div>
				<div class="el-step is-vertical is-flex" style="flex-basis: 50%;">
					<!-- icon & line -->
					<div class="el-step__head {getStepState(3)}">
						<div class="el-step__line"><i class="el-step__line-inner"></i></div>
						<div class="el-step__icon is-text"><div class="el-step__icon-inner">3</div></div>
					</div>
					<!-- title & description -->
					<div class="el-step__main">
						<div class="el-step__title {getStepState(3)}">Deposit Address</div>
						<div class="el-step__description {getStepState(3)}">
							{#if currentStep >= 3}
								<div class="PipoQ">
									<p style="line-height: 14px;">
										Important Note: Send only {selectedCurrency?.name} to this address. Sending other
										cryptos to this address may result in the loss of your deposit.
									</p>
									<div class="nwyne {!!fetchingAddress[selectedCurrency?.name || ''] ? 'address-loader' : ''}">
										<ul>
											<li>
												<canvas
													bind:this={canvasEL}
													width="90"
													height="90"
													style="width: 90px; height: 90px;"
												></canvas>
											</li>
											<li>
												<p class="luzAm">
													{selectedCurrency?.name} Address
													<!-- <a href="javascript:;" style="margin-left: 4px;"
															><svg
																width="16"
																height="16"
																viewBox="0 0 16 16"
																fill="none"
																xmlns="http://www.w3.org/2000/svg"
																><path d="M11.25 5H9.75V11H11.25V5Z" fill="currentColor"
																></path><path
																	fill-rule="evenodd"
																	clip-rule="evenodd"
																	d="M2.5 15V11H1V9.5H2.5V6.5H1V5H2.5V1H14.25V15H2.5ZM4 2.5H12.75V13.5H4V11H5.5V9.5H4V6.5H5.5V5H4V2.5Z"
																	fill="currentColor"
																></path></svg
															></a
														> -->
												</p>
												<h5>{selectedCurrency?.depositAddress || '--'}</h5>
											</li>
											<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
											<li on:click={handleCopyAddress}>
												<svg
													width="16"
													height="16"
													viewBox="0 0 16 16"
													fill="none"
													xmlns="http://www.w3.org/2000/svg"
													><path
														fill-rule="evenodd"
														clip-rule="evenodd"
														d="M6 1.75H12.75H14.25V3.25V10H12.75V3.25H6V1.75ZM9.75 6.25H3.25V12.75H9.75V6.25ZM1.75 4.75V14.25H11.25V4.75H1.75Z"
														fill="#878787"
													></path></svg
												>
											</li>
										</ul>
										<!---->
									</div>
									<div class="Ft-JD">
										<!---->
										<dl>
											<dt>Arrival Requires</dt>
											<dd>{selectedBlockchain?.confirmations} block confirmation(s)</dd>
										</dl>
										<!---->
									</div>
									<ol class="NztVh">
										<!---->
										<li>
											Ensure that the network is <span class="green"
												>{selectedBlockchain?.name} ({selectedBlockchain?.type})
											</span>.
										</li>
									</ol>
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
							>Are you having any issues with your deposit? We've prepared FAQs to assist you. <a
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
				<dt><h4>Recent Deposits</h4></dt>
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
									class="el-tabs__item is-top is-active"
									id="tab-onLine"
									aria-controls="pane-onLine"
									role="tab"
									aria-selected="true"
									tabindex="0"
								>
									On-chain
								</div>
								<!-- <div
									class="el-tabs__item is-top"
									id="tab-inHome"
									aria-controls="pane-inHome"
									role="tab"
									aria-selected="false"
									tabindex="-1"
								>
									Ezcryptox Accounts
								</div> -->
							</div>
						</div>
					</div>
				</div>
				<div class="el-tabs__content">
					<DataListTable
						dataListColumns={[
							{ accessor: 'time', header: 'Time' },
							{ accessor: 'address', header: 'Address' },
							{ accessor: 'trans_id', header: 'Transaction ID' },
							{ accessor: 'coin', header: 'Coin' },
							{ accessor: 'amount', header: 'Amount' },
							{ accessor: 'network', header: 'Network' },
							{ accessor: 'status', header: 'Status' }
						]}
					/>
				</div>
			</div>
		</div>
	</div>
</div>
{#if riskDialogOpen}
	<RiskDialog currency={selectedCurrency?.name} on:close={() => (riskDialogOpen = false)} />
{/if}


<style>
	.address-loader {
		border: 1px solid grey;
		animation: blink 1s infinite;
	}

	@keyframes blink {
		0%, 100% {
			border-color: transparent;
		}
		50% {
			border-color: grey;
		}
	}

	body.dark-theme .address-loader {
		border-color: lightgrey; /* Adjust for dark theme */
	}
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
		._3Johe.Bte5E.currencySelectInput, .PipoQ {
			width: 100%!important
		}
		.PipoQ h5 {
			text-wrap: nowrap;
			font-size: 11px;
			max-width: 60px;
			word-wrap: normal;
			text-overflow: ellipsis;
			overflow: hidden;
		}
	}
</style>