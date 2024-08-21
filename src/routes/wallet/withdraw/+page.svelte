<script lang="ts">
	import { _ } from 'svelte-i18n';
	import '../../../styles/wallet/withdraw.css';
	import { DataListTable } from '$lib/components/ui/datatable';
	import { onMount } from 'svelte';

  $:loading = true;

  let currencies: {name: string, icon: string, suspended: boolean, blockchains: {
    name: string,
    fullName: string,
    blocks: number,
    suspended: boolean
  }[]}[] = []
  let assetBalances: {[k: string]: number} = {};
  $: selectedCurrency = null;
  $: selectedBlockchain = null;


  async function loadCurrencies() {
    
  }
  async function loadAssetBalances() {

  }
  onMount(() => {
    Promise.all([loadAssetBalances(), loadCurrencies()]).finally(() => {
      loading = false;
    })
  })


</script>

<div class="P5bsS depositWithdrawLayout mt-[64px] p-[48px]">
	<h3 class="aWNEU aOozD">
		<a href="/wallet/spot">Assets</a><svg
			width="16"
			height="16"
			viewBox="0 0 16 16"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			style="margin: 0px 4px;"
			><path d="M11 2.5H13L5 13.5H3L11 2.5Z" fill="currentColor"></path></svg
		><a href="javascript:;" class="-pl-z">Withdraw</a>
	</h3>
	<div class="f7TBC aOozD">
		<div class="qnl7D">
			<h3 class="uueH8">Withdraw</h3>
			<div class="el-steps el-steps--vertical b9EeN">
				<div class="el-step is-vertical" style="flex-basis: 50%;">
					<!-- icon & line -->
					<div class="el-step__head is-finish">
						<div class="el-step__line">
							<i
								class="el-step__line-inner"
								style="transition-delay: 0ms; border-width: 1px; height: 100%;"
							></i>
						</div>
						<div class="el-step__icon is-text">
							<div class="el-step__icon-inner">1</div>
						</div>
					</div>
					<!-- title & description -->
					<div class="el-step__main">
						<div class="el-step__title is-finish">Select Crypto</div>
						<div class="el-step__description is-finish">
							<div style="padding-bottom: 40px;">
								<div class="el-dropdown" style="margin-right: 30px;">
									<div
										class="currencySelectInputBorderBox el-tooltip__trigger el-tooltip__trigger"
										id="el-id-7700-0"
										role="button"
										tabindex="0"
										aria-controls="el-id-7700-1"
										aria-expanded="false"
										aria-haspopup="menu"
									>
										<span
											class="_3Fw8O"
											style="width: 20px; height: 20px; background-image: url(&quot;https://www.datocms-assets.com/51952/1635345356-eth.png&quot;); margin-right: 4px;"
										></span><strong>ETH</strong>Ethereum<svg
											fill="currentColor"
											class="arrowIcon"
											style="width: 16px; height: 16px;"
										>
											<use xlink:href="#web-core-icon-arrow-down"></use>
										</svg>
									</div>
									<!--v-if-->
								</div>
								<p style="margin-top: 12px; color: rgb(135, 135, 135); font-size: 14px;">
									Frequently Used
								</p>
								<ul class="yB0oP wLT-A">
									<li class="cursorPointer">
										<span
											class="_3Fw8O"
											style="width: 14px; height: 14px; background-image: url(&quot;https://www.datocms-assets.com/51952/1635193869-btc.png&quot;);"
										></span>
										BTC
									</li>
									<li class="cursorPointer">
										<span
											class="_3Fw8O"
											style="width: 14px; height: 14px; background-image: url(&quot;https://www.datocms-assets.com/51952/1635345356-eth.png&quot;);"
										></span>
										ETH
									</li>
									<li class="cursorPointer">
										<span
											class="_3Fw8O"
											style="width: 14px; height: 14px; background-image: url(&quot;https://www.datocms-assets.com/51952/1638549830-trx.png&quot;);"
										></span>
										TRX
									</li>
									<li class="cursorPointer">
										<span
											class="_3Fw8O"
											style="width: 14px; height: 14px; background-image: url(&quot;https://www.datocms-assets.com/51952/1651675507-usdd.png&quot;);"
										></span>
										USDD
									</li>
									<li class="cursorPointer">
										<span
											class="_3Fw8O"
											style="width: 14px; height: 14px; background-image: url(&quot;https://www.datocms-assets.com/51952/1638913308-usdt.png&quot;);"
										></span>
										USDT
									</li>
									<li class="cursorPointer">
										<span
											class="_3Fw8O"
											style="width: 14px; height: 14px; background-image: url(&quot;https://www.datocms-assets.com/51952/1706088741-x-dark.png&quot;);"
										></span>
										HTX
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
				<div class="el-step is-vertical" style="flex-basis: 50%;">
					<!-- icon & line -->
					<div class="el-step__head is-finish">
						<div class="el-step__line">
							<i
								class="el-step__line-inner"
								style="transition-delay: 150ms; border-width: 0px; height: 0%;"
							></i>
						</div>
						<div class="el-step__icon is-text">
							<div class="el-step__icon-inner">2</div>
						</div>
					</div>
					<!-- title & description -->
					<div class="el-step__main">
						<div class="el-step__title is-finish">Withdrawal Methods</div>
						<div class="el-step__description is-finish">
							<div class="withdrawTabWraper" style="padding-bottom: 40px;">
								<div class="el-tabs el-tabs--top" style="width: 538px;">
									<div class="el-tabs__header is-top">
										<!---->
										<div class="el-tabs__nav-wrap is-top">
											<!---->
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
														class="el-tabs__item is-top is-active"
														id="tab-onLine"
														aria-controls="pane-onLine"
														role="tab"
														aria-selected="true"
														tabindex="0"
													>
														On-chain<!---->
													</div>
													<div
														class="el-tabs__item is-top"
														id="tab-inHome"
														aria-controls="pane-inHome"
														role="tab"
														aria-selected="false"
														tabindex="-1"
													>
														Poloniex Accounts<!---->
													</div>
												</div>
											</div>
										</div>
									</div>
									<div class="el-tabs__content">
										<div
											id="pane-onLine"
											class="el-tab-pane"
											role="tabpanel"
											aria-hidden="false"
											aria-labelledby="tab-onLine"
										>
											<span class="JTqe3">Network <!----></span>
											<div
												class="_3Johe Bte5E currencySelectInput eEaok _2Kc0F"
												style="width: 538px;"
											>
												<span class="z6d5D v1WVj" data-size="large"
													><span class="KwkiX">Ethereum</span><span
														style="color: rgb(135, 135, 135); font-weight: 400; margin-left: 4px;"
														>ETH (ERC20)</span
													><span class="NiKDB"
														><svg fill="currentColor" style="width: 16px; height: 16px;">
															<use xlink:href="#web-core-icon-reverse-close"></use>
														</svg></span
													><svg
														fill="currentColor"
														class="imI90"
														style="width: 16px; height: 16px;"
													>
														<use xlink:href="#web-core-icon-arrow-down"></use>
													</svg></span
												><!---->
											</div>
											<span class="JTqe3">Address</span>
											<div data-size="large" class="gs2D2 SKd74 currencySelectInput IVSD3">
												<!---->
												<div class="ZT1pJ -KOfC">
													<!----><input
														class="currencySelectInput IVSD3 x2zYL"
														type="text"
														autocomplete="off"
														id="web-core-input-2"
														placeholder="Enter address"
													/><!----><a href="javascript:;"
														><svg
															width="16"
															height="16"
															viewBox="0 0 16 16"
															fill="none"
															xmlns="http://www.w3.org/2000/svg"
														>
															<path d="M11.25 5H9.75V11H11.25V5Z" fill="currentColor"></path>
															<path
																fill-rule="evenodd"
																clip-rule="evenodd"
																d="M2.5 15V11H1V9.5H2.5V6.5H1V5H2.5V1H14.25V15H2.5ZM4 2.5H12.75V13.5H4V11H5.5V9.5H4V6.5H5.5V5H4V2.5Z"
																fill="currentColor"
															></path>
														</svg></a
													>
												</div>
												<!---->
											</div>
											<!----><!---->
										</div>
										<div
											id="pane-inHome"
											class="el-tab-pane"
											role="tabpanel"
											aria-hidden="true"
											aria-labelledby="tab-inHome"
											style="display: none;"
										>
											<div>
												<p class="v6ZL5">Select Method</p>
												<div class="_3Johe Bte5E currencySelectInput" style="width: 538px;">
													<span class="z6d5D v1WVj" data-size="large"
														><span class="KwkiX">Phone Number</span><span class="NiKDB"
															><svg fill="currentColor" style="width: 16px; height: 16px;">
																<use xlink:href="#web-core-icon-reverse-close"></use>
															</svg></span
														><svg
															fill="currentColor"
															class="imI90"
															style="width: 16px; height: 16px;"
														>
															<use xlink:href="#web-core-icon-arrow-down"></use>
														</svg></span
													><!---->
												</div>
												<p class="v6ZL5">Phone Number</p>
												<div class="_2hDh9">
													<div class="_3Johe Bte5E currencySelectInput sS-wy" style="width: 110px;">
														<span class="z6d5D v1WVj" data-size="large"
															><img src="https://static.poloniex.com/country/flag/NG.png" /><span
																class="KwkiX">+ 234</span
															><span class="NiKDB"
																><svg fill="currentColor" style="width: 16px; height: 16px;">
																	<use xlink:href="#web-core-icon-reverse-close"></use>
																</svg></span
															><svg
																fill="currentColor"
																class="imI90"
																style="width: 16px; height: 16px;"
															>
																<use xlink:href="#web-core-icon-arrow-down"></use>
															</svg></span
														><!---->
													</div>
													<div
														data-size="large"
														class="gs2D2 SKd74 currencySelectInput"
														style="width: 420px;"
													>
														<!---->
														<div class="ZT1pJ -KOfC">
															<!----><input
																class="currencySelectInput x2zYL"
																type="text"
																autocomplete="off"
																id="web-core-input-3"
																placeholder="Receiver's phone number"
																style="width: 420px;"
															/><!----><!---->
														</div>
														<!---->
													</div>
												</div>
												<!---->
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="el-step is-vertical is-flex" style="flex-basis: 50%;">
					<!-- icon & line -->
					<div class="el-step__head is-process">
						<div class="el-step__line"><i class="el-step__line-inner"></i></div>
						<div class="el-step__icon is-text">
							<div class="el-step__icon-inner">3</div>
						</div>
					</div>
					<!-- title & description -->
					<div class="el-step__main">
						<div class="el-step__title is-process">Withdrawal Amount</div>
						<div class="el-step__description is-process">
							<div class="qtsYk">
								<!---->
								<div
									data-size="large"
									class="gs2D2 SKd74 rndsC"
									style="z-index: 2; position: relative;"
								>
									<!---->
									<div class="ZT1pJ -KOfC">
										<!----><input
											class="rndsC x2zYL"
											autocomplete="off"
											type="text"
											data-min="-1"
											data-max="-1"
											id="web-core-input-6"
											data-fixed="8"
											data-negative="false"
											style="z-index: 2; position: relative;"
										/><!----><span class="dCa74">ETH <a href="javascript:;">Max</a></span>
									</div>
									<!---->
								</div>
								<div class="FW379 lqZuR">
									<!----> Max Amount Per Withdrawal <!----><strong>200 ETH</strong>
								</div>
								<p class="rndsC">The amount to withdraw must be less than 0.00000000 ETH.</p>
								<div class="MhbUH">
									<dl>
										<dt class="lqZuR">
											24h Limit <span style="margin-left: 4px;">0 / $ 10,000</span>
										</dt>
										<dd class="lqZuR">
											<span class="-m6DU el-tooltip__trigger el-tooltip__trigger">Available</span
											><strong style="margin: 0px 4px;">-- ETH</strong><svg
												fill="currentColor"
												style="width: 16px; height: 16px;"
											>
												<use xlink:href="#web-core-icon-transfer"></use>
											</svg>
										</dd>
									</dl>
									<!---->
								</div>
								<div class="_9truM">
									<dl>
										<dt>Fee</dt>
										<dd><strong>0.00013443 ETH</strong></dd>
									</dl>
									<dl>
										<dt>To Receive</dt>
										<dd><strong>11.99986557 ETH</strong></dd>
									</dl>
									<!---->
								</div>
								<button
									data-size="large"
									type="button"
									disabled={true}
									class="jRLsY SOUdU"
									style="width: 100%; margin-top: 24px;"><span><!---->Withdraw<!----></span></button
								>
								<ol class="s-s-w">
									<li>
										Poloniex supports ETH withdrawals on the Tron network and BSC network in
										addition to the Ethereum network. Enter a valid address for the network to be
										auto-detected. The transaction fee will also update based on the network.
									</li>
								</ol>
							</div>
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
								href="https://support.poloniex.com/hc/en-us/sections/360006455294"
								target="blank">View more here</a
							></span
						><svg
							width="14"
							height="14"
							viewBox="0 0 20 20"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								fill-rule="evenodd"
								clip-rule="evenodd"
								d="M9.36018 3.06641L10.6419 4.43487L4.69353 10.0064L10.6412 15.5657L9.36089 16.9355L1.94922 10.0079L9.36018 3.06641Z"
								fill="currentColor"
							></path>
						</svg>
					</p>
					<div class="_5I4sI">
						<a href="https://support.poloniex.com/hc/en-us/articles/4955767360791" target="_blank"
							>Withdrawing from Poloniex to MetaMask Wallet</a
						><a href="https://support.poloniex.com/hc/en-us/articles/360039545554" target="_blank"
							>Delayed or Missing Withdrawals</a
						>
					</div>
				</div>
				<svg
					width="76"
					height="76"
					viewBox="0 0 76 76"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<g clip-path="url(#clip0_3109_7199)">
						<path
							d="M0 3.5625C0 2.61767 0.375334 1.71153 1.04343 1.04343C1.71153 0.375334 2.61767 0 3.5625 0L49.875 0C50.8198 0 51.726 0.375334 52.3941 1.04343C53.0622 1.71153 53.4375 2.61767 53.4375 3.5625V34.143C53.4375 35.0878 53.0622 35.994 52.3941 36.6621C51.726 37.3302 50.8198 37.7055 49.875 37.7055H3.5625C2.61767 37.7055 1.71153 37.3302 1.04343 36.6621C0.375334 35.994 0 35.0878 0 34.143L0 3.5625Z"
							fill="#555555"
						></path>
						<path
							d="M22.5625 31.8486C22.5625 30.5889 23.0629 29.3807 23.9537 28.4899C24.8445 27.5991 26.0527 27.0986 27.3125 27.0986H71.25C72.5098 27.0986 73.718 27.5991 74.6088 28.4899C75.4996 29.3807 76 30.5889 76 31.8486V60.0541C76 61.3139 75.4996 62.5221 74.6088 63.4129C73.718 64.3037 72.5098 64.8041 71.25 64.8041H27.3125C26.0527 64.8041 24.8445 64.3037 23.9537 63.4129C23.0629 62.5221 22.5625 61.3139 22.5625 60.0541V31.8486Z"
							fill="#119E5F"
						></path>
						<path
							fill-rule="evenodd"
							clip-rule="evenodd"
							d="M53.4375 27.0986V34.1413C53.4375 35.0861 53.0622 35.9923 52.3941 36.6604C51.726 37.3285 50.8198 37.7038 49.875 37.7038H22.5625V31.8486C22.5625 30.5889 23.0629 29.3807 23.9537 28.4899C24.8445 27.5991 26.0527 27.0986 27.3125 27.0986H53.4375Z"
							fill="#555555"
						></path>
						<path d="M7.125 48.3087V35.9365H17.2188L7.125 48.3087Z" fill="#555555"></path>
						<path d="M68.2813 75.9991V63.627H58.1875L68.2813 75.9991Z" fill="#119E5F"></path>
						<path
							d="M17.442 22.1664C18.2849 22.1693 19.0945 21.8374 19.6928 21.2436C20.2911 20.6497 20.6291 19.8426 20.6324 18.9997C20.6324 17.2501 19.2042 15.833 17.442 15.833C17.0245 15.8314 16.6107 15.912 16.2244 16.0702C15.838 16.2284 15.4866 16.4612 15.1902 16.7553C14.8937 17.0493 14.6582 17.3989 14.4969 17.784C14.3355 18.1691 14.2517 18.5822 14.25 18.9997C14.25 20.7493 15.6782 22.1664 17.442 22.1664ZM27.0164 22.1664C27.8594 22.1693 28.669 21.8374 29.2672 21.2436C29.8655 20.6497 30.2035 19.8426 30.2068 18.9997C30.2068 17.2501 28.7787 15.833 27.0164 15.833C26.5989 15.8314 26.1851 15.912 25.7988 16.0702C25.4124 16.2284 25.061 16.4612 24.7646 16.7553C24.4682 17.0493 24.2326 17.3989 24.0713 17.784C23.91 18.1691 23.8261 18.5822 23.8244 18.9997C23.8244 20.7493 25.2542 22.1664 27.0164 22.1664ZM36.5908 22.1664C37.4338 22.1693 38.2434 21.8374 38.8417 21.2436C39.4399 20.6497 39.7779 19.8426 39.7812 18.9997C39.7812 17.2501 38.3531 15.833 36.5892 15.833C35.7463 15.8301 34.9367 16.162 34.3384 16.7558C33.7402 17.3497 33.4022 18.1568 33.3988 18.9997C33.3988 20.7493 34.827 22.1664 36.5892 22.1664H36.5908ZM39.6087 49.083C40.4516 49.086 41.2612 48.754 41.8595 48.1602C42.4578 47.5664 42.7957 46.7593 42.7991 45.9164C42.7991 44.1668 41.3709 42.7497 39.6087 42.7497C39.1912 42.748 38.7774 42.8286 38.391 42.9869C38.0046 43.1451 37.6532 43.3779 37.3568 43.6719C37.0604 43.966 36.8248 44.3155 36.6635 44.7006C36.5022 45.0857 36.4183 45.4988 36.4167 45.9164C36.4167 47.6659 37.8448 49.083 39.6087 49.083ZM49.1831 49.083C50.026 49.086 50.8356 48.754 51.4339 48.1602C52.0322 47.5664 52.3701 46.7593 52.3735 45.9164C52.3735 44.1668 50.9453 42.7497 49.1815 42.7497C48.3386 42.7468 47.529 43.0787 46.9307 43.6725C46.3324 44.2663 45.9944 45.0734 45.9911 45.9164C45.9911 47.6659 47.4208 49.083 49.1831 49.083ZM58.7575 49.083C59.6004 49.086 60.41 48.754 61.0083 48.1602C61.6066 47.5664 61.9446 46.7593 61.9479 45.9164C61.9479 44.1668 60.5198 42.7497 58.7559 42.7497C57.913 42.7468 57.1034 43.0787 56.5051 43.6725C55.9068 44.2663 55.5689 45.0734 55.5655 45.9164C55.5655 47.6659 56.9953 49.083 58.7575 49.083Z"
							fill="black"
							fill-opacity="0.5"
						></path>
					</g>
					<defs>
						<clipPath id="clip0_3109_7199">
							<rect width="76" height="76" fill="white"></rect>
						</clipPath>
					</defs>
				</svg>
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
							></span
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
									Poloniex Accounts
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
