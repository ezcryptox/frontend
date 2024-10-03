<script lang="ts">
	import { _ } from 'svelte-i18n';
	import '../../../styles/buy.css';
	import axios from 'axios';
	import pkg from 'lodash';
	const { debounce } = pkg;
	import { tick } from 'svelte';
	import * as Command from '$lib/components/ui/command';
	import * as Popover from '$lib/components/ui/popover';
	import { Button } from '$lib/components/ui/button';
	import { goto } from '$app/navigation';
	import { loadMoonPay } from '@moonpay/moonpay-js';
	import { isLogin } from '$lib/store/profile';
	import { onMount } from 'svelte';
	import { ServerURl } from '$lib/backendUrl';
	import { handleAuthToken } from '$lib/store/routes';
	import { handleUserProfile } from '$lib/index';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import { browser } from '$app/environment';
	import { Label } from '$lib/components/ui/label';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import { screen } from '$lib/store/screen';
	import { toast } from 'svelte-sonner';
	import Footer from '$lib/footer.svelte';
	let termsChecked = false;

	$: responsiveClass = $screen <= 767 ? 'isMobile' : $screen <= 860 ? 'isSmall' : '';
	let moonPay: any = null;
	if (browser) loadMoonPay().then((mp) => (moonPay = mp));
	let currencyData: any[] = [];
	let cryptoData: any[] = [];

	let currencyOpen = false;
	let cryptoOpen = false;
	let _selectedCurrency = 'USD';
	let _selectedCrypto = 'USDT';

	let user_id = '';
	$: if ($isLogin) {
		const getUserID = async () => {
			const response = await handleUserProfile($handleAuthToken);
			if (response) {
				//@ts-ignore
				user_id = response.user_id;
			}
		};
		getUserID();
	}

	$: initializingOnrampFlow = false;
	$: selectedCurrency = currencyData.find((f) => f.code === _selectedCurrency) ?? {
		code: 'USD',
		icon: 'https://www.datocms-assets.com/51952/1665712815-eth-1.png'
	};
	$: selectedCrypto = cryptoData.find((f) => f.code === _selectedCrypto) ?? {
		code: 'USDT',
		icon: 'https://www.datocms-assets.com/51952/1638913308-usdt.png'
	};

	let inputAmount = '';
	let inputInvalid = false;

	let buyQuote: any = null;
	$: loadingQuote = false;
	onMount(async () => {
		try {
			const response = await axios.get(ServerURl() + '/api/transactions/list-currencies');
			const { fiatCurrencies, cryptoCurrencies } = response.data;
			currencyData = [...fiatCurrencies];
			cryptoData = [...cryptoCurrencies];
		} catch (error) {
			console.error('Error fetching currencies:', error);
		}
	});
	function closeAndFocusTrigger(triggerId: string) {
		currencyOpen = false;
		cryptoOpen = false;
		debouncedHandleInputChange({ target: { value: inputAmount } });
		tick().then(() => {
			document.getElementById(triggerId)?.focus();
		});
	}

	async function buyCrypto(gateway: 'moonPay' | 'onramper' = 'moonPay') {
		if (!$isLogin) {
			goto('/login');
			return;
		}
		if (initializingOnrampFlow || !termsChecked || !inputAmount) return;
		if (gateway === 'moonPay') {
			try {
				initializingOnrampFlow = true;
				const { address, tag: addressTag } = (
					await axios.get(
						`${ServerURl()}/api/assets/wallet-address?crypto=${selectedCrypto.code}`,
						{
							headers: {
								'Content-type': 'application/json',
								Authorization: `Bearer ${$handleAuthToken}`
							}
						}
					)
				).data;

				if (!moonPay) moonPay = await loadMoonPay();

				const widget = moonPay?.({
					flow: 'buy',
					environment: 'sandbox', // TODO: change to production
					params: {
						apiKey: 'pk_test_zN6fst3pHTfKPewrR9gmoZL3eD8NfA', //TODO: Change to Live PUBlic KEY
						walletAddress: address,
						...(addressTag ? { walletAddressTag: addressTag } : {}),
						baseCurrencyCode: selectedCurrency.code.toLowerCase(),
						baseCurrencyAmount: inputAmount,
						defaultCurrencyCode: selectedCrypto.code.toLowerCase(),
						externalCustomerId: user_id
					},
					variant: 'overlay',
					handlers: {
						async onTransactionCompleted(props) {
							console.log('onTransactionCompleted', props);
							toast.success('Purchased', {
								description: 'Monitor the status of the transaction on the activity page',
								position: 'top-center',
								action: {
									label: 'View',
									onClick: () => goto('/activity/cards/buy')
								}
							});
						}
					}
				});
				const urlForSignature = widget?.generateUrlForSigning();
				const data = (
					await axios.post(
						`${ServerURl()}/api/transactions/sign-url`,
						{
							urlForSignature
						},
						{
							headers: {
								'Content-type': 'application/json',
								Authorization: `Bearer ${$handleAuthToken}`
							}
						}
					)
				).data;
				widget.updateSignature(data.signature);
				widget?.show();
			} catch (err: any) {
				console.log('Error show processing buy order ', err.message);
			} finally {
				initializingOnrampFlow = false;
			}
		}
	}
	function validateNumberInput(ev: any) {
		const value = ev.target.value;
		if (value?.trim() === '') return;
		const numericValue = parseFloat(value);
		if (
			isNaN(numericValue) ||
			value.trim() === '' ||
			value.split('.').length > 2 ||
			/[^0-9.]/.test(value)
		) {
			ev.target.value = inputAmount; // Reset to previous valid input
		} else debouncedHandleInputChange(ev);
	}
	async function handleInputChange(ev: any) {
		const value = parseFloat(ev.target.value);
		if (value && !isNaN(value)) {
			inputInvalid = value < selectedCurrency.minBuyAmount || value > selectedCurrency.maxBuyAmount;
			if (inputInvalid) return;
			inputAmount = Math.max(
				selectedCurrency.minBuyAmount,
				Math.min(selectedCurrency.maxBuyAmount, value)
			).toString();
			try {
				loadingQuote = true;
				const { data } = (
					await axios.get(
						`${ServerURl()}/api/transactions/get-rates?crypto=${selectedCrypto.code}&fiat=${selectedCurrency.code}&amount=${inputAmount}`,
						{
							headers: {
								'Content-type': 'application/json',
								Authorization: `Bearer ${$handleAuthToken}`
							}
						}
					)
				).data;

				buyQuote = data;
			} catch (error) {
				console.log('Error get quote');
			} finally {
				loadingQuote = false;
			}
		}
	}
	const debouncedHandleInputChange = debounce(handleInputChange, 300); // 300ms debounce
</script>
<div class="contentWraper cardsWraper mt-[64px] {responsiveClass}">
	<dl class="navWaper">
		<dt>
			<a href="/cards/buy" class="router-link-exact-active router-link-active" aria-current="page">{$_('g-buy-crypto')}<!-- </a><a href="/cards/sell" class="">{$_('sell-crypto')}</a> -->
			</a>
		</dt>
		<dd>
			<p class="btn">
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<!-- svelte-ignore a11y-no-static-element-interactions -->
				<span on:click={() => goto('/activity/cards/buy')}
					><svg
						width="22"
						height="22"
						viewBox="0 0 22 22"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						><path
							d="M9.64844 12.7955L11.4444 10.9995V8.30566"
							stroke="currentColor"
							stroke-width="1.57143"
							stroke-linecap="square"
						></path><path
							d="M17.2187 11.8975C17.2607 11.6043 17.2824 11.3045 17.2824 10.9996C17.2824 7.52808 14.4682 4.71387 10.9967 4.71387C7.52515 4.71387 4.71094 7.52808 4.71094 10.9996C4.71094 14.1662 7.05255 16.7859 10.0987 17.2216"
							stroke="currentColor"
							stroke-width="1.57143"
							stroke-linecap="square"
							stroke-linejoin="round"
						></path><path
							d="M13.3516 14.5352H15.7087"
							stroke="currentColor"
							stroke-width="1.57143"
							stroke-linecap="square"
						></path><path
							d="M13.3516 17.2852H16.8873"
							stroke="currentColor"
							stroke-width="1.57143"
							stroke-linecap="square"
						></path></svg
					><i>{$_('g-history')}</i></span
				><span class="lan"></span><span
					><svg
						width="22"
						height="22"
						viewBox="0 0 22 22"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						><path
							fill-rule="evenodd"
							clip-rule="evenodd"
							d="M10.4524 6.5169L10.5 6.5473V13.7773H6.5V5.3432C6.86009 5.39501 7.29184 5.47175 7.79629 5.58505C8.75309 5.79995 9.44672 6.05202 9.88468 6.23973C10.1038 6.33365 10.2593 6.41162 10.3521 6.46103C10.3985 6.48574 10.4292 6.50332 10.4444 6.51218L10.4524 6.5169ZM16 13.7773H12V6.55521C12.032 6.54148 12.0697 6.52546 12.1127 6.50745C12.2771 6.43875 12.5181 6.34183 12.8145 6.23358C13.4126 6.0151 14.2107 5.75978 15.0454 5.59215C15.4037 5.52018 15.7216 5.46319 16 5.41805V13.7773ZM16 3.89977C15.6476 3.95303 15.2316 4.0248 14.75 4.12151C12.8828 4.49651 11.25 5.24651 11.25 5.24651C11.25 5.24651 10.2266 4.59353 8.125 4.12151C7.48335 3.9774 6.9422 3.88633 6.5 3.82935C6.12676 3.78125 5.82401 3.75744 5.59082 3.74651C5.19542 3.72799 5 3.74651 5 3.74651V15.2773H10.5V16.2617H12V15.2773H17.5V3.74651C17.5 3.74651 17.0138 3.74651 16 3.89977Z"
							fill="currentColor"
						></path></svg
					><i>{$_('footer-support')}</i></span
				>
			</p>
		</dd>
	</dl>
	<div class="marginTop16">
		<dl class="topLayer">
			<dt class="leftSlide">
				<dl>
					<dt class="leftSlideMain">
						<p>{$_('pay')}</p>
						<dl class="marginTop8">
							<dt>
								<span class="leftSelectWraper cardsSelectWraper _83857b91 _8a25e73a undefined"
									><!----><span class="_9f048623">
										<Popover.Root bind:open={currencyOpen} let:ids>
											<Popover.Trigger asChild let:builder disabled={initializingOnrampFlow}>
												<Button
													disabled={initializingOnrampFlow}
													builders={[builder]}
													variant="ghost"
													role="combobox"
													aria-expanded={currencyOpen}
													style="{responsiveClass === "isMobile" ? "flex: 1 1 60%": ""}"
													class="relative flex w-[126px]  items-center p-0 hover:bg-transparent"
												>
													<div class="a4af882f">
														<img src={selectedCurrency.icon} alt="" class="imgICon" />
													</div>
													<input
														style="background-color: transparent !important; font-size: 24px; line-height: 34px;  padding-left: 8px; min-width: 80px;"
														readonly={true}
														value={selectedCurrency.code}
														type="text"
														class="_44765a39"
													/>
													<span class="_9089f0db"
														><svg
															width="16"
															height="16"
															viewBox="0 0 16 16"
															fill="none"
															xmlns="http://www.w3.org/2000/svg"
															class="suffixIcon"
															><path
																d="M12.0738 4.84375H3.92625C3.07156 4.84375 2.61077 5.84654 3.16745 6.49508L7.2412 11.241C7.64026 11.7059 8.35974 11.7059 8.7588 11.241L12.8326 6.49508C13.3892 5.84655 12.9284 4.84375 12.0738 4.84375Z"
																fill="currentColor"
															></path></svg
														></span
													>
												</Button>
											</Popover.Trigger>
											<Popover.Content class="{responsiveClass === "isMobile" ? "w-[96%]": "w-[200px]"} p-0">
												<Command.Root style="border: none">
													<Command.Input style="border: none" placeholder="" />
													<Command.Empty>{$_('no-currency-found')}</Command.Empty>
													<Command.Group>
														<div style="top: 45px" class="f066ab20 c053e25d polo-select">
															{#each currencyData as currency}
																<Command.Item
																	value={currency.code}
																	onSelect={(currentValue) => {
																		_selectedCurrency = currentValue;
																		closeAndFocusTrigger(ids.trigger);
																	}}
																>
																	<div
																		style="width: 100%"
																		class="_43ec205b _00af2d11 _1701d8b1 polo-option {_selectedCurrency ===
																		currency.code
																			? 'polo-option__is-selected'
																			: ''}"
																	>
																		<dl>
																			<dt style="width: 100%;display: flex; padding: 10px; align-items: center; gap: 10px">
																				<img src={currency.icon} alt="" class="imgICon" /><strong>
																					{currency.code}</strong
																				>
																			</dt>
																			<!---->
																		</dl>
																	</div>
																</Command.Item>
															{/each}
														</div>
													</Command.Group>
												</Command.Root>
											</Popover.Content>
										</Popover.Root>
										<div style="{responsiveClass === "isMobile" ? "flex: 1 1 40%": ""}">
											<div style="{responsiveClass === "isMobile" ? "max-width: unset": ""}" class="polo-input right polo-input-medium polo-input-default {responsiveClass === 'isMobile' ? 'min-w-56' : ''}">
												<!----><input
													type="text"
													readonly={initializingOnrampFlow}
													on:input={validateNumberInput}
													style={inputInvalid ? "border: 1px solid red; border-radius: 3px" : ""}
													placeholder="{selectedCurrency.minBuyAmount ||
														''}-{selectedCurrency.maxBuyAmount || ''}"
												/><!---->
											</div>
										</div></span
									></span
								>
							</dt>
							<dd>
								<p class="Toicon">
									<svg
										width="24"
										height="24"
										viewBox="0 0 24 24"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
										><g clip-path="url(#clip0_226_28219)"
											><path
												opacity="0.2"
												d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
											></path><path
												d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
												stroke="currentColor"
												stroke-width="1.5"
												stroke-miterlimit="10"
											></path><path
												d="M12.5723 15.178L15.7504 11.9999L12.5723 8.82178"
												stroke="currentColor"
												stroke-width="1.5"
												stroke-linecap="round"
												stroke-linejoin="round"
											></path><path
												d="M8.25 12H15.75"
												stroke="currentColor"
												stroke-width="1.5"
												stroke-linecap="round"
												stroke-linejoin="round"
											></path></g
										><defs
											><clipPath id="clip0_226_28219"><rect width="24" height="24"></rect></clipPath
											></defs
										></svg
									>
								</p>
							</dd>
						</dl>
					</dt>
					<dd class="rightSlideMain">
						<p>{$_('receive')}</p>
						<span
							class="rightSelectWraper cardsSelectWraper marginTop8 _83857b91 _8a25e73a undefined"
							><!----><span class="_9f048623">
								<Popover.Root bind:open={cryptoOpen} let:ids>
									<Popover.Trigger asChild let:builder disabled={initializingOnrampFlow}>
										<Button
											disabled={initializingOnrampFlow}
											builders={[builder]}
											variant="ghost"
											role="combobox"
											aria-expanded={cryptoOpen}
											class="relative flex w-[126px] flex-auto items-center p-0 hover:bg-transparent"
										>
											<div class="a4af882f">
												<img src={selectedCrypto.icon} alt="" class="imgICon" />
											</div>
											<input
												style="background-color: transparent !important; font-size: 24px; line-height: 34px;  padding-left: 8px; min-width: 80px;"
												readonly={true}
												value={selectedCrypto.code}
												type="text"
												class="_44765a39"
											/>
											<span class="_9089f0db"
												><svg
													width="16"
													height="16"
													viewBox="0 0 16 16"
													fill="none"
													xmlns="http://www.w3.org/2000/svg"
													class="suffixIcon"
													><path
														d="M12.0738 4.84375H3.92625C3.07156 4.84375 2.61077 5.84654 3.16745 6.49508L7.2412 11.241C7.64026 11.7059 8.35974 11.7059 8.7588 11.241L12.8326 6.49508C13.3892 5.84655 12.9284 4.84375 12.0738 4.84375Z"
														fill="currentColor"
													></path></svg
												></span
											>
										</Button>
									</Popover.Trigger>
									<Popover.Content class="{responsiveClass === "isMobile" ? "w-[96%]": "w-[200px]"} p-0">
										<Command.Root style="border: none">
											<Command.Input style="border: none" placeholder="" />
											<Command.Empty>{$_('no-crypto-found')}</Command.Empty>
											<Command.Group>
												<div style="top: 45px" class="f066ab20 c053e25d polo-select">
													{#each cryptoData as crypto}
														<Command.Item
															value={crypto.code}
															onSelect={(currentValue) => {
																_selectedCrypto = currentValue;
																closeAndFocusTrigger(ids.trigger);
															}}
														>
															<div
																style="width: 100%"
																class="_43ec205b _00af2d11 _1701d8b1 polo-option {_selectedCrypto ===
																crypto.code
																	? 'polo-option__is-selected'
																	: ''}"
															>
																<dl>
																	<dt style="width: 100%;display: flex; padding: 10px; align-items: center; gap: 10px">
																		<img src={crypto.icon} alt="" class="imgICon" /><strong>
																			{crypto.code}</strong
																		>
																	</dt>
																	<!---->
																</dl>
															</div>
														</Command.Item>
													{/each}
												</div>
											</Command.Group>
										</Command.Root>
									</Popover.Content>
								</Popover.Root>
							</span></span
						>
					</dd>
				</dl>
			</dt>
			<dd>
				<svg
					width="200"
					height="200"
					viewBox="0 0 200 200"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					class="position"
					><path
						opacity="0.21"
						d="M24.8829 20.394C20.6319 20.394 17.1858 23.8402 17.1858 28.0912C17.1858 32.3422 20.6319 35.7884 24.8829 35.7884C29.1339 35.7884 32.5801 32.3422 32.5801 28.0912C32.5801 23.8402 29.1339 20.394 24.8829 20.394Z"
						fill="#B5B5B5"
					></path><path
						opacity="0.21"
						d="M9.69713 5.11713C5.44611 5.11713 1.99997 8.56326 1.99997 12.8143C1.99997 17.0653 5.44611 20.5114 9.69713 20.5114C13.9482 20.5114 17.3943 17.0653 17.3943 12.8143C17.3943 8.56326 13.9482 5.11713 9.69713 5.11713Z"
						fill="#E3E3E3"
					></path><path
						opacity="0.03"
						d="M41.2607 37.5521C37.0097 37.5521 33.5635 40.9983 33.5635 45.2493C33.5635 49.5003 37.0097 52.9464 41.2607 52.9464C45.5117 52.9464 48.9579 49.5003 48.9579 45.2493C48.9579 40.9983 45.5117 37.5521 41.2607 37.5521Z"
						fill="#AEAEAE"
					></path><path
						opacity="0.1"
						d="M55.1202 5C50.8691 5 47.423 8.44613 47.423 12.6972C47.423 16.9482 50.8691 20.3943 55.1202 20.3943C59.3712 20.3943 62.8173 16.9482 62.8173 12.6972C62.8173 8.44613 59.3712 5 55.1202 5Z"
						fill="#DBDBDB"
					></path><path
						opacity="0.02"
						d="M24.8819 35.7886C20.6309 35.7886 17.1848 39.2347 17.1848 43.4857C17.1848 47.7368 20.6309 51.1829 24.8819 51.1829C29.133 51.1829 32.5791 47.7368 32.5791 43.4857C32.5791 39.2347 29.133 35.7886 24.8819 35.7886Z"
						fill="#161616"
					></path><path
						opacity="0.2"
						d="M55.2969 51.1826C51.0458 51.1826 47.5997 54.6288 47.5997 58.8798C47.5997 63.1308 51.0458 66.5769 55.2969 66.5769C59.5479 66.5769 62.994 63.1308 62.994 58.8798C62.994 54.6288 59.5479 51.1826 55.2969 51.1826Z"
						fill="#DEDEDE"
					></path><path
						opacity="0.21"
						d="M156.61 163.38C152.359 163.38 148.912 166.826 148.912 171.077C148.912 175.328 152.359 178.774 156.61 178.774C160.861 178.774 164.307 175.328 164.307 171.077C164.307 166.826 160.861 163.38 156.61 163.38Z"
						fill="#B5B5B5"
					></path><path
						opacity="0.21"
						d="M141.426 148.103C137.175 148.103 133.729 151.549 133.729 155.8C133.729 160.051 137.175 163.497 141.426 163.497C145.677 163.497 149.123 160.051 149.123 155.8C149.123 151.549 145.677 148.103 141.426 148.103Z"
						fill="#E3E3E3"
					></path><path
						opacity="0.03"
						d="M186.973 159.45C182.867 160.55 180.43 164.771 181.531 168.877C182.631 172.983 186.852 175.42 190.958 174.32C195.064 173.22 197.501 168.999 196.4 164.893C195.3 160.787 191.08 158.35 186.973 159.45Z"
						fill="#AEAEAE"
					></path><path
						opacity="0.1"
						d="M188.384 165.143C184.133 165.143 180.687 168.59 180.687 172.841C180.687 177.092 184.133 180.538 188.384 180.538C192.635 180.538 196.081 177.092 196.081 172.841C196.081 168.59 192.635 165.143 188.384 165.143Z"
						fill="#DBDBDB"
					></path><path
						opacity="0.2"
						d="M187.025 178.947C182.774 178.947 179.327 182.394 179.327 186.645C179.327 190.896 182.774 194.342 187.025 194.342C191.276 194.342 194.722 190.896 194.722 186.645C194.722 182.394 191.276 178.947 187.025 178.947Z"
						fill="#161616"
					></path><path
						d="M145.702 134.913C142.946 135.156 140.909 137.586 141.151 140.342C141.394 143.098 143.824 145.135 146.58 144.893C149.336 144.65 151.373 142.22 151.131 139.464C150.888 136.708 148.458 134.671 145.702 134.913Z"
						fill="#161616"
					></path><rect
						x="2.30619"
						y="102.259"
						width="119.291"
						height="78.9632"
						rx="6.75"
						transform="rotate(-15 2.30619 102.259)"
						fill="#696969"
						stroke="#131316"
						stroke-width="0.5"
					></rect><path
						d="M77.4154 31.9868C78.1306 28.3281 81.6763 25.9419 85.335 26.6571L189.161 46.9517C192.82 47.6669 195.206 51.2125 194.491 54.8712L182.056 118.49C181.341 122.149 177.795 124.535 174.136 123.82L70.3098 103.525C66.6511 102.81 64.2649 99.2645 64.98 95.6058L77.4154 31.9868Z"
						fill="#EFEFEF"
						stroke="#131316"
						stroke-width="0.5"
					></path><rect
						x="5.24585"
						y="103.941"
						width="119.987"
						height="77.5391"
						rx="6"
						transform="rotate(-15 5.24585 103.941)"
						fill="black"
					></rect><path
						d="M60.4671 89.2821L118.298 74.8024L134.08 120.715L64.1676 107.115C60.383 106.379 57.9063 102.721 58.6279 98.934L60.4671 89.2821Z"
						fill="#434343"
					></path><rect
						x="74.9916"
						y="27.1691"
						width="120.487"
						height="78.0391"
						rx="6.25"
						transform="rotate(11.06 74.9916 27.1691)"
						fill="#FBFBFB"
						stroke="#2B2B2E"
						stroke-width="0.5"
					></rect><path
						d="M68.8711 59.1144L190.898 61.004L179.224 120.692C178.588 123.943 175.437 126.064 172.185 125.428L66.1861 104.709C62.9404 104.075 60.8201 100.934 61.4453 97.6864L68.8711 59.1144Z"
						fill="white"
					></path><path
						d="M188.165 77.5914L191.401 60.9888L193.441 58.7636L182.75 113.726L179.995 119.328L188.165 77.5914Z"
						fill="white"
					></path><path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M156.268 121.324C161.119 110.45 169.739 103.633 175.521 106.099C175.56 106.115 175.598 106.132 175.637 106.149L175.643 106.136L179.826 108.001L179.067 109.702C181.307 114.344 180.763 122.282 177.208 130.252C173.653 138.222 168.072 144.013 163.069 145.566L162.259 147.381L158.271 145.602C158.165 145.564 158.059 145.522 157.955 145.478C152.173 143.012 151.418 132.199 156.268 121.324Z"
						fill="#F4F4F4"
					></path><path
						d="M175.521 106.099L175.423 106.329L175.423 106.329L175.521 106.099ZM175.637 106.149L175.865 106.251L175.763 106.48L175.534 106.377L175.637 106.149ZM175.643 106.136L175.415 106.034L175.516 105.805L175.745 105.907L175.643 106.136ZM179.826 108.001L179.928 107.773L180.156 107.875L180.054 108.103L179.826 108.001ZM179.067 109.702L178.842 109.811L178.792 109.706L178.839 109.6L179.067 109.702ZM163.069 145.566L162.841 145.464L162.887 145.361L162.995 145.328L163.069 145.566ZM162.259 147.381L162.488 147.483L162.386 147.711L162.157 147.61L162.259 147.381ZM158.271 145.602L158.356 145.367L158.365 145.37L158.373 145.374L158.271 145.602ZM157.955 145.478L157.857 145.708L157.955 145.478ZM175.423 106.329C172.658 105.15 169.158 106.171 165.701 108.905C162.254 111.631 158.909 116.019 156.497 121.426L156.04 121.223C158.479 115.756 161.869 111.298 165.39 108.513C168.902 105.737 172.602 104.582 175.619 105.869L175.423 106.329ZM175.534 106.377C175.497 106.361 175.46 106.345 175.423 106.329L175.619 105.869C175.66 105.886 175.7 105.903 175.739 105.921L175.534 106.377ZM175.871 106.237L175.865 106.251L175.408 106.047L175.415 106.034L175.871 106.237ZM179.724 108.23L175.541 106.364L175.745 105.907L179.928 107.773L179.724 108.23ZM178.839 109.6L179.597 107.9L180.054 108.103L179.295 109.804L178.839 109.6ZM176.98 130.15C178.747 126.188 179.764 122.238 180.062 118.708C180.36 115.174 179.936 112.078 178.842 109.811L179.292 109.593C180.438 111.968 180.863 115.162 180.56 118.75C180.257 122.341 179.224 126.346 177.436 130.354L176.98 130.15ZM162.995 145.328C167.9 143.804 173.438 138.089 176.98 130.15L177.436 130.354C173.867 138.355 168.244 144.221 163.143 145.805L162.995 145.328ZM162.031 147.279L162.841 145.464L163.297 145.668L162.488 147.483L162.031 147.279ZM158.373 145.374L162.361 147.153L162.157 147.61L158.169 145.83L158.373 145.374ZM158.053 145.248C158.153 145.29 158.254 145.33 158.356 145.367L158.186 145.837C158.075 145.797 157.966 145.754 157.857 145.708L158.053 145.248ZM156.497 121.426C154.085 126.834 153.072 132.215 153.374 136.537C153.676 140.872 155.291 144.07 158.053 145.248L157.857 145.708C154.837 144.42 153.183 140.979 152.875 136.572C152.566 132.152 153.602 126.689 156.04 121.223L156.497 121.426Z"
						fill="black"
					></path><ellipse
						cx="21.5596"
						cy="11.3815"
						rx="21.5596"
						ry="11.3815"
						transform="matrix(0.407386 -0.913256 -0.919885 -0.392188 172.749 151.868)"
						fill="#F9F9F9"
						stroke="black"
						stroke-width="0.5"
					></ellipse><ellipse
						cx="18.0078"
						cy="8.92333"
						rx="18.0078"
						ry="8.92333"
						transform="matrix(0.407386 -0.913256 -0.919891 -0.392173 171.934 147.66)"
						fill="#DDDDDD"
						stroke="black"
						stroke-width="0.5"
					></ellipse><path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M162.5 143.387C166.985 143.93 173.092 138.382 176.784 130.106C180.434 121.922 180.479 113.863 177.136 110.934C172.65 110.391 166.544 115.939 162.852 124.215C159.202 132.399 159.157 140.458 162.5 143.387Z"
						fill="white"
					></path><path
						d="M162.5 143.387L162.47 143.635L162.394 143.626L162.335 143.575L162.5 143.387ZM177.136 110.934L177.166 110.685L177.242 110.695L177.3 110.746L177.136 110.934ZM162.53 143.139C164.664 143.397 167.24 142.206 169.77 139.87C172.29 137.543 174.721 134.116 176.555 130.004L177.012 130.208C175.155 134.372 172.687 137.857 170.109 140.237C167.541 142.609 164.822 143.92 162.47 143.635L162.53 143.139ZM176.555 130.004C178.369 125.938 179.283 121.91 179.332 118.546C179.381 115.169 178.56 112.514 176.971 111.122L177.3 110.746C179.054 112.282 179.882 115.122 179.832 118.553C179.782 121.996 178.849 126.09 177.012 130.208L176.555 130.004ZM177.106 111.182C174.972 110.924 172.395 112.115 169.866 114.451C167.346 116.778 164.915 120.205 163.08 124.317L162.624 124.113C164.481 119.949 166.949 116.464 169.527 114.084C172.095 111.712 174.814 110.401 177.166 110.685L177.106 111.182ZM163.08 124.317C161.267 128.383 160.353 132.411 160.304 135.775C160.255 139.152 161.076 141.807 162.665 143.199L162.335 143.575C160.582 142.038 159.754 139.199 159.804 135.768C159.854 132.325 160.787 128.23 162.624 124.113L163.08 124.317Z"
						fill="black"
					></path><path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M168.722 118.505C168.749 118.433 168.834 118.37 168.912 118.364L177.954 117.743C178.031 117.738 178.072 117.792 178.044 117.865L177.77 118.584C177.742 118.656 177.657 118.719 177.58 118.725L168.538 119.346C168.46 119.351 168.42 119.297 168.447 119.224L168.722 118.505ZM171.53 119.522C171.453 119.527 171.368 119.59 171.34 119.662L171.109 120.267C171.471 120.182 171.837 120.113 172.208 120.062L172.388 119.59C172.415 119.518 172.375 119.464 172.298 119.469L171.53 119.522ZM172.001 120.606C171.625 120.659 171.258 120.731 170.898 120.821L170.015 123.14C170.05 123.123 170.085 123.107 170.12 123.091C170.438 122.95 170.79 122.844 171.175 122.773L172.001 120.606ZM172.533 122.687L173.366 120.501C173.723 120.5 174.054 120.523 174.36 120.571L173.434 122.998C173.36 122.943 173.276 122.893 173.182 122.85C173.004 122.766 172.788 122.712 172.533 122.687ZM170.966 123.32C170.667 123.381 170.409 123.463 170.187 123.561C170.03 123.632 169.892 123.707 169.769 123.785L169.105 125.528C169.229 125.642 169.406 125.754 169.648 125.858C169.743 125.898 169.845 125.937 169.955 125.975L170.966 123.32ZM171.159 126.292L172.323 123.239C172.491 123.262 172.63 123.301 172.742 123.354L172.743 123.355L172.745 123.356C172.946 123.449 173.08 123.572 173.158 123.723L172.095 126.514C171.805 126.434 171.496 126.361 171.17 126.295C171.166 126.294 171.163 126.293 171.159 126.292ZM169.734 126.555C169.546 126.496 169.375 126.433 169.221 126.368C169.085 126.31 168.963 126.248 168.856 126.181L167.848 128.827C168.14 128.92 168.448 129.005 168.771 129.08L169.734 126.555ZM169.984 129.376L170.945 126.854C171.277 126.925 171.588 127.002 171.876 127.087L170.875 129.713C170.855 129.703 170.834 129.692 170.813 129.682C170.599 129.577 170.322 129.475 169.984 129.376ZM168.556 129.645C168.232 129.573 167.923 129.493 167.628 129.404L166.413 132.593C166.593 132.723 166.832 132.814 167.14 132.86C167.199 132.869 167.26 132.876 167.323 132.882L168.556 129.645ZM168.671 132.822L169.765 129.951C170.01 130.029 170.211 130.107 170.369 130.184C170.477 130.237 170.565 130.29 170.636 130.342L169.831 132.454C169.758 132.493 169.681 132.531 169.597 132.567C169.348 132.674 169.041 132.762 168.671 132.822ZM167.113 133.431C167.01 133.423 166.91 133.412 166.814 133.398C166.572 133.362 166.359 133.301 166.175 133.215L165.301 135.511C165.622 135.558 165.951 135.586 166.29 135.592L167.113 133.431ZM167.643 135.518L168.463 133.367C168.886 133.303 169.264 133.203 169.598 133.066L168.732 135.338C168.38 135.414 168.017 135.474 167.643 135.518ZM166.082 136.137C165.743 136.132 165.412 136.108 165.089 136.065L164.557 137.462C164.53 137.535 164.57 137.589 164.647 137.584L165.415 137.531C165.492 137.526 165.577 137.463 165.605 137.39L166.082 136.137ZM167.436 136.062C167.806 136.018 168.168 135.96 168.523 135.887L168.013 137.226C167.985 137.298 167.9 137.361 167.823 137.367L167.055 137.419C166.978 137.425 166.938 137.37 166.965 137.298L167.436 136.062ZM174.571 120.016L174.796 119.426C174.823 119.354 174.783 119.299 174.706 119.305L173.938 119.357C173.861 119.363 173.776 119.426 173.748 119.498L173.573 119.958C173.927 119.955 174.26 119.974 174.571 120.016Z"
						fill="#1F1F24"
					></path><path
						d="M171.417 131.304C171.549 130.929 171.576 130.613 171.499 130.355C171.429 130.096 171.201 129.872 170.813 129.682C170.425 129.493 169.835 129.312 169.043 129.141C168.159 128.953 167.387 128.703 166.728 128.39C166.07 128.077 165.604 127.662 165.332 127.144C165.069 126.619 165.081 125.948 165.368 125.132C165.647 124.336 166.136 123.61 166.835 122.955C167.54 122.3 168.383 121.761 169.363 121.339C170.35 120.915 171.404 120.651 172.524 120.545C173.695 120.434 174.638 120.536 175.352 120.85C176.073 121.164 176.55 121.636 176.783 122.267C177.015 122.899 177.028 123.425 176.732 124.268L173.716 124.76C173.876 124.305 173.912 123.913 173.825 123.585C173.745 123.256 173.53 123.012 173.182 122.85C172.84 122.689 172.355 122.637 171.726 122.697C171.119 122.754 170.584 122.886 170.12 123.091C169.664 123.296 169.284 123.552 168.98 123.859C168.684 124.165 168.474 124.495 168.349 124.85C168.227 125.198 168.238 125.494 168.383 125.74C168.534 125.984 168.814 126.194 169.22 126.369C169.634 126.543 170.167 126.697 170.82 126.829C171.863 127.041 172.698 127.321 173.323 127.669C173.956 128.017 174.365 128.464 174.551 129.009C174.739 129.547 174.694 130.212 174.417 131.001C174.123 131.837 173.635 132.579 172.954 133.226C172.273 133.872 171.449 134.396 170.483 134.798C169.527 135.193 168.474 135.444 167.325 135.553C166.559 135.625 165.833 135.603 165.147 135.487C164.471 135.363 163.896 135.139 163.423 134.815C162.952 134.485 162.639 134.042 162.485 133.487C162.332 132.926 162.352 132.459 162.631 131.663L165.668 131.168C165.506 131.63 165.447 132.017 165.491 132.33C165.544 132.635 165.683 132.878 165.906 133.057C166.139 133.229 166.442 133.343 166.814 133.398C167.185 133.454 167.606 133.459 168.076 133.415C168.683 133.358 169.209 133.233 169.653 133.043C170.107 132.845 170.481 132.596 170.775 132.296C171.076 131.996 171.29 131.665 171.417 131.304Z"
						fill="#1F1F24"
					></path><path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M68.0946 28.5012C59.9227 33.3229 55.0364 40.4831 57.1807 44.4941C57.4819 45.0575 57.9058 45.5289 58.4347 45.9095L59.1795 47.2259L60.0711 46.7071C63.7383 47.8655 69.8506 46.5717 75.8597 43.0262C81.7338 39.5602 85.9102 34.8859 86.9981 31.0416L88.2009 30.3418L87.2551 28.6701C87.1991 28.0826 87.041 27.5334 86.7736 27.0332C84.6293 23.0222 76.2664 23.6795 68.0946 28.5012Z"
						fill="#DBDBDB"
					></path><path
						d="M57.1807 44.4941L57.3771 44.3344L57.1807 44.4941ZM68.0946 28.5012L68.1802 28.7409L68.0946 28.5012ZM58.4347 45.9095L58.6282 45.7446L58.604 45.7017L58.5666 45.6748L58.4347 45.9095ZM59.1795 47.2259L58.9859 47.3907L59.087 47.5693L59.2639 47.4664L59.1795 47.2259ZM60.0711 46.7071L60.1494 46.4455L60.0677 46.4196L59.9868 46.4667L60.0711 46.7071ZM75.8597 43.0262L75.7741 42.7864L75.8597 43.0262ZM86.9981 31.0416L86.9137 30.8011L86.8163 30.8578L86.7821 30.9785L86.9981 31.0416ZM88.2009 30.3418L88.2853 30.5823L88.54 30.4341L88.3945 30.177L88.2009 30.3418ZM87.2551 28.6701L87.028 28.7257L87.0338 28.7861L87.0615 28.835L87.2551 28.6701ZM86.7736 27.0332L86.97 26.8735L86.7736 27.0332ZM57.3771 44.3344C56.3833 42.4755 56.9856 39.8246 58.9413 36.9589C60.8865 34.1083 64.1176 31.138 68.1802 28.7409L68.009 28.2614C63.8997 30.6861 60.6017 33.7067 58.5969 36.6444C56.6024 39.567 55.8338 42.5018 56.9843 44.6538L57.3771 44.3344ZM58.5666 45.6748C58.0599 45.3102 57.6596 44.8629 57.3771 44.3344L56.9843 44.6538C57.3041 45.2522 57.7517 45.7476 58.3027 46.1441L58.5666 45.6748ZM59.3731 47.061L58.6282 45.7446L58.2411 46.0743L58.9859 47.3907L59.3731 47.061ZM59.9868 46.4667L59.0952 46.9854L59.2639 47.4664L60.1555 46.9476L59.9868 46.4667ZM75.7741 42.7864C69.7912 46.3166 63.7418 47.5802 60.1494 46.4455L59.9929 46.9688C63.7347 48.1508 69.91 46.8269 75.9453 43.2659L75.7741 42.7864ZM86.7821 30.9785C86.2571 32.8338 84.9754 34.9212 83.0782 36.985C81.1844 39.045 78.6927 41.0643 75.7741 42.7864L75.9453 43.2659C78.9008 41.5221 81.4343 39.4713 83.3693 37.3666C85.3008 35.2656 86.6512 33.0938 87.214 31.1047L86.7821 30.9785ZM88.1166 30.1013L86.9137 30.8011L87.0824 31.2821L88.2853 30.5823L88.1166 30.1013ZM87.0615 28.835L88.0073 30.5066L88.3945 30.177L87.4487 28.5053L87.0615 28.835ZM86.5772 27.1929C86.8278 27.6617 86.9756 28.1753 87.028 28.7257L87.4821 28.6146C87.4226 27.9899 87.2542 27.4051 86.97 26.8735L86.5772 27.1929ZM68.1802 28.7409C72.2416 26.3445 76.3438 24.9875 79.6876 24.7247C83.0513 24.4603 85.5686 25.3063 86.5772 27.1929L86.97 26.8735C85.8343 24.7492 83.098 23.9183 79.7013 24.1852C76.2846 24.4537 72.1194 25.8361 68.009 28.2614L68.1802 28.7409Z"
						fill="#2B2B2E"
					></path><ellipse
						cx="17.3669"
						cy="8.36867"
						rx="17.3669"
						ry="8.36867"
						transform="matrix(-0.849724 0.500105 -0.468644 -0.873217 92.4802 37.5522)"
						fill="white"
						stroke="#2B2B2E"
						stroke-width="0.499608"
					></ellipse><ellipse
						cx="14.4886"
						cy="6.55214"
						rx="14.4886"
						ry="6.55214"
						transform="matrix(-0.849781 0.499955 -0.468745 -0.873138 89.1833 37.4073)"
						fill="#DBDBDB"
						stroke="#2B2B2E"
						stroke-width="0.499608"
					></ellipse><path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M85.4101 30.7579C85.988 34.0205 81.9855 39.1445 75.7943 42.7954C69.7244 46.3747 63.5977 47.331 61.1427 45.279C60.5648 42.0164 64.5672 36.8924 70.7585 33.2415C76.8284 29.6622 82.955 28.7059 85.4101 30.7579Z"
						fill="white"
					></path><path
						d="M85.4101 30.7579L85.634 30.6788L85.6176 30.5859L85.5535 30.5324L85.4101 30.7579ZM75.7943 42.7954L75.8802 43.0349L75.7943 42.7954ZM61.1427 45.279L60.9188 45.3581L60.9352 45.451L60.9992 45.5045L61.1427 45.279ZM70.7585 33.2415L70.8444 33.481L70.7585 33.2415ZM85.1861 30.837C85.4505 32.3294 84.6704 34.3276 82.9811 36.4565C81.3047 38.569 78.7834 40.7426 75.7084 42.5559L75.8802 43.0349C78.9964 41.1973 81.572 38.9834 83.3002 36.8056C85.0154 34.6441 85.9476 32.449 85.634 30.6788L85.1861 30.837ZM75.7084 42.5559C72.6945 44.3331 69.6709 45.4563 67.1027 45.8815C64.5224 46.3086 62.4475 46.0242 61.2861 45.0535L60.9992 45.5045C62.2929 46.5859 64.5089 46.8493 67.1232 46.4164C69.7496 45.9816 72.8242 44.837 75.8802 43.0349L75.7084 42.5559ZM61.3666 45.1999C61.1023 43.7075 61.8824 41.7093 63.5717 39.5804C65.2481 37.4679 67.7694 35.2943 70.8444 33.481L70.6726 33.002C67.5564 34.8396 64.9808 37.0535 63.2526 39.2313C61.5374 41.3928 60.6052 43.5879 60.9188 45.3581L61.3666 45.1999ZM70.8444 33.481C73.8583 31.7038 76.8819 30.5806 79.4501 30.1554C82.0304 29.7283 84.1053 30.0127 85.2666 30.9834L85.5535 30.5324C84.2598 29.4511 82.0439 29.1876 79.4296 29.6205C76.8032 30.0553 73.7286 31.1999 70.6726 33.002L70.8444 33.481Z"
						fill="#2B2B2E"
					></path><path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M71.5128 44.7577C71.4583 44.8162 71.3612 44.8441 71.2961 44.8202L64.8011 42.4318C64.736 42.4079 64.7274 42.3411 64.782 42.2826L65.1806 41.8556C65.2352 41.7972 65.3322 41.7692 65.3973 41.7932L71.8923 44.1815C71.9574 44.2055 71.966 44.2723 71.9115 44.3307L71.5128 44.7577ZM68.0795 42.5106C68.1457 42.5331 68.2461 42.5053 68.3037 42.4485L68.3875 42.3659C68.1524 42.2614 67.9387 42.1474 67.7472 42.0238L67.5693 42.1992C67.5117 42.256 67.5187 42.3202 67.585 42.3427L68.0795 42.5106ZM68.0852 41.6907L69.5872 40.2103C69.6229 40.2977 69.6755 40.3822 69.745 40.4638C69.8228 40.5571 69.9258 40.6436 70.0541 40.7233L68.7181 42.0401C68.4813 41.9332 68.2703 41.8167 68.0852 41.6907ZM69.4388 42.734L69.3124 42.8586C69.2548 42.9154 69.2618 42.9796 69.3281 43.0021L69.8226 43.17C69.8889 43.1925 69.9892 43.1647 70.0468 43.108L70.2449 42.9128C69.9738 42.8666 69.7051 42.8069 69.4388 42.734ZM70.5817 42.5808C70.3102 42.538 70.0395 42.4804 69.7697 42.4079L71.0872 41.1093C71.3808 41.1741 71.6625 41.203 71.9324 41.1961C71.9513 41.1955 71.9701 41.1948 71.9888 41.1939L70.5817 42.5808ZM75.7957 37.4418L77.7051 35.5598C77.6983 35.5409 77.6905 35.5222 77.6818 35.5037C77.6015 35.3553 77.4667 35.2178 77.268 35.0926C77.2526 35.0829 77.237 35.0733 77.221 35.0638L75.2536 37.0029C75.4464 37.1474 75.6272 37.2937 75.7957 37.4418ZM74.9111 37.3405C75.1029 37.4875 75.2813 37.636 75.4463 37.7861L73.8447 39.3647C73.7925 39.2842 73.7288 39.2023 73.6536 39.1188C73.5737 39.0315 73.4826 38.9416 73.3803 38.8492L74.9111 37.3405ZM74.4633 36.3776L76.1993 34.6665C75.9253 34.6003 75.6857 34.5732 75.4794 34.5759C75.4143 34.5772 75.3524 34.5807 75.2934 34.5862L74.0111 35.85C74.043 35.9109 74.0873 35.978 74.1468 36.0514C74.2255 36.1484 74.3305 36.2571 74.4633 36.3776ZM73.6301 36.2255C73.6435 36.2433 73.6575 36.2613 73.6721 36.2793C73.7796 36.4118 73.927 36.5592 74.1143 36.7215L72.5852 38.2287C72.3859 38.0827 72.2035 37.938 72.0381 37.7946L73.6301 36.2255ZM75.6655 34.2194C75.9364 34.2218 76.2249 34.2619 76.531 34.3396L77.8393 33.0501C77.5731 32.9726 77.3088 32.9087 77.0464 32.8584L75.6655 34.2194ZM77.3808 32.5289C77.6438 32.5818 77.9067 32.6472 78.1696 32.7246L78.752 32.1505C78.8096 32.0937 78.8026 32.0295 78.7364 32.007L78.2418 31.8391C78.1756 31.8166 78.0752 31.8444 78.0176 31.9012L77.3808 32.5289ZM78.8717 33.4368L77.5556 34.734C77.5961 34.7569 77.6354 34.7803 77.6734 34.8042C77.8515 34.9164 77.9916 35.0406 78.0938 35.1768L79.5012 33.7896C79.3036 33.6605 79.0938 33.5429 78.8717 33.4368ZM79.8383 33.4573C79.6381 33.3311 79.4263 33.2154 79.2028 33.1105L79.7607 32.5606C79.8183 32.5038 79.9187 32.4761 79.9849 32.4986L80.4795 32.6665C80.5457 32.6889 80.5527 32.7532 80.4952 32.8099L79.8383 33.4573ZM71.6909 38.1368L70.0618 39.7425C70.0352 39.9104 70.0804 40.0722 70.216 40.2314L70.2168 40.2323L70.2176 40.2333C70.2622 40.2868 70.3198 40.3393 70.392 40.3903L72.2443 38.5647C72.045 38.4216 71.8605 38.279 71.6909 38.1368ZM73.0291 39.1954L71.4207 40.7807C71.6495 40.8268 71.8574 40.8447 72.0447 40.84C72.1656 40.8362 72.277 40.8253 72.3802 40.8081L73.4506 39.7532C73.4035 39.6351 73.3193 39.5031 73.188 39.3573C73.1398 39.3047 73.0869 39.2507 73.0291 39.1954Z"
						fill="#616161"
					></path><path
						d="M73.8023 34.9432C73.5858 35.172 73.4606 35.39 73.4268 35.597C73.3879 35.8024 73.4697 36.0301 73.6724 36.2801C73.875 36.53 74.2201 36.833 74.7075 37.189C75.2523 37.5844 75.6986 37.9911 76.0463 38.4091C76.394 38.8271 76.5744 39.2612 76.5876 39.7114C76.5917 40.1641 76.3578 40.6397 75.886 41.1383C75.4257 41.6246 74.8454 41.9986 74.1451 42.2602C73.4395 42.5203 72.6787 42.6566 71.8626 42.6692C71.0414 42.6802 70.2277 42.5582 69.4217 42.3032C68.5792 42.0367 67.9653 41.6858 67.5798 41.2506C67.1892 40.8137 67.0202 40.3354 67.0728 39.8157C67.1254 39.296 67.2935 38.9167 67.7808 38.4018L70.0199 38.94C69.7569 39.2178 69.6003 39.4869 69.55 39.7471C69.4945 40.0057 69.5595 40.244 69.7451 40.462C69.9255 40.6784 70.2419 40.8581 70.6943 41.0013C71.1312 41.1395 71.5435 41.2035 71.9314 41.1935C72.3141 41.1818 72.6614 41.1112 72.9733 40.9815C73.28 40.8502 73.5359 40.6762 73.7409 40.4596C73.942 40.2471 74.0341 40.032 74.0172 39.8142C73.9951 39.5948 73.8736 39.3626 73.6528 39.1175C73.4268 38.8708 73.1118 38.6038 72.7078 38.3167C72.0614 37.8573 71.5818 37.4109 71.2691 36.9774C70.9511 36.5423 70.8199 36.1025 70.8756 35.6581C70.9274 35.2178 71.1815 34.7566 71.6378 34.2743C72.1213 33.7635 72.706 33.3777 73.3921 33.1168C74.0782 32.8559 74.8209 32.7245 75.6202 32.7225C76.4104 32.7229 77.2189 32.8539 78.0457 33.1154C78.5969 33.2898 79.0888 33.5198 79.5214 33.8053C79.9448 34.0933 80.2647 34.4228 80.4811 34.794C80.6936 35.1692 80.7597 35.5777 80.6794 36.0196C80.5952 36.4656 80.4248 36.7937 79.9646 37.2801L77.7098 36.737C77.9767 36.455 78.1477 36.1958 78.2228 35.9593C78.2888 35.7253 78.2752 35.5113 78.1819 35.3171C78.0795 35.1254 77.9097 34.9549 77.6727 34.8056C77.4356 34.6562 77.1481 34.5281 76.81 34.4211C76.3732 34.2829 75.9699 34.2164 75.6002 34.2216C75.2213 34.2292 74.8805 34.2966 74.5777 34.4238C74.2696 34.5494 74.0112 34.7225 73.8023 34.9432Z"
						fill="#616161"
					></path><path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M34.3164 150.166C22.2664 157.479 15.0634 168.267 18.2279 174.263C18.6688 175.099 19.2878 175.797 20.0592 176.36L21.1703 178.35L22.4965 177.556C27.906 179.255 36.9179 177.254 45.7763 171.878C54.44 166.621 60.5982 159.566 62.199 153.788L63.9795 152.722L62.573 150.204C62.4878 149.334 62.2552 148.521 61.8648 147.782C58.7002 141.786 46.3664 142.854 34.3164 150.166Z"
						fill="#1FC44E"
					></path><path
						d="M18.2279 174.263L18.0147 174.441L18.2279 174.263ZM34.3164 150.166L34.4089 150.43L34.3164 150.166ZM20.0592 176.36L20.2694 176.177L20.2433 176.13L20.2032 176.101L20.0592 176.36ZM21.1703 178.35L20.9601 178.533L21.0695 178.729L21.2615 178.614L21.1703 178.35ZM22.4965 177.556L22.5818 177.267L22.4931 177.239L22.4053 177.291L22.4965 177.556ZM45.7763 171.878L45.8688 172.142L45.7763 171.878ZM62.199 153.788L62.1078 153.524L62.0016 153.587L61.9645 153.721L62.199 153.788ZM63.9795 152.722L64.0707 152.987L64.3474 152.821L64.1897 152.539L63.9795 152.722ZM62.573 150.204L62.3267 150.269L62.3332 150.334L62.3628 150.387L62.573 150.204ZM61.8648 147.782L62.078 147.604L61.8648 147.782ZM18.4411 174.085C16.9436 171.248 17.8634 167.209 20.7535 162.88C23.6325 158.568 28.4094 154.071 34.4089 150.43L34.2238 149.902C28.1734 153.574 23.3237 158.128 20.3799 162.537C17.4471 166.929 16.3476 171.283 18.0147 174.441L18.4411 174.085ZM20.2032 176.101C19.4557 175.555 18.862 174.883 18.4411 174.085L18.0147 174.441C18.4756 175.314 19.1199 176.039 19.9151 176.62L20.2032 176.101ZM21.3805 178.166L20.2694 176.177L19.849 176.544L20.9601 178.533L21.3805 178.166ZM22.4053 177.291L21.0791 178.085L21.2615 178.614L22.5876 177.82L22.4053 177.291ZM45.6837 171.615C36.8539 176.973 27.9104 178.94 22.5818 177.267L22.4111 177.845C27.9017 179.57 36.9818 177.535 45.8688 172.142L45.6837 171.615ZM61.9645 153.721C61.1847 156.536 59.2823 159.697 56.4784 162.819C53.6782 165.938 49.9956 168.998 45.6837 171.615L45.8688 172.142C50.2207 169.501 53.949 166.406 56.794 163.238C59.6353 160.074 61.6124 156.819 62.4334 153.855L61.9645 153.721ZM63.8883 152.458L62.1078 153.524L62.2901 154.053L64.0707 152.987L63.8883 152.458ZM62.3628 150.387L63.7693 152.906L64.1897 152.539L62.7832 150.02L62.3628 150.387ZM61.6515 147.96C62.024 148.665 62.2455 149.439 62.3267 150.269L62.8192 150.139C62.73 149.228 62.4863 148.377 62.078 147.604L61.6515 147.96ZM34.4089 150.43C40.4072 146.79 46.4689 144.709 51.4147 144.281C56.3818 143.851 60.138 145.092 61.6515 147.96L62.078 147.604C60.427 144.476 56.434 143.253 51.4306 143.686C46.4057 144.121 40.2756 146.23 34.2238 149.902L34.4089 150.43Z"
						fill="#2B2B2E"
					></path><ellipse
						cx="25.8496"
						cy="12.4832"
						rx="25.8496"
						ry="12.4832"
						transform="matrix(-0.8419 0.509706 -0.463474 -0.874872 70.282 163.497)"
						fill="#85EAA2"
						stroke="#2B2B2E"
						stroke-width="0.54754"
					></ellipse><ellipse
						cx="21.5657"
						cy="9.77379"
						rx="21.5657"
						ry="9.77379"
						transform="matrix(-0.841956 0.509556 -0.463569 -0.874795 65.4216 163.311)"
						fill="#1FC44E"
						stroke="#2B2B2E"
						stroke-width="0.54754"
					></ellipse><path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M59.8563 153.38C60.708 158.268 54.8077 165.992 45.6795 171.529C36.7243 176.96 27.6839 178.453 24.0656 175.393C23.2139 170.504 29.1142 162.78 38.2424 157.244C47.1976 151.813 56.238 150.319 59.8563 153.38Z"
						fill="#1AA742"
					></path><path
						d="M59.8563 153.38L60.0993 153.29L60.0816 153.188L60.0125 153.13L59.8563 153.38ZM45.6795 171.529L45.5866 171.265L45.6795 171.529ZM24.0656 175.393L23.8225 175.483L23.8403 175.584L23.9093 175.643L24.0656 175.393ZM38.2424 157.244L38.3353 157.508L38.2424 157.244ZM59.6133 153.469C60.0125 155.76 58.8327 158.804 56.3373 162.02C53.8559 165.218 50.1283 168.511 45.5866 171.265L45.7723 171.792C50.3589 169.01 54.1456 165.673 56.6834 162.402C59.2073 159.15 60.5518 155.887 60.0993 153.29L59.6133 153.469ZM45.5866 171.265C41.1319 173.967 36.6608 175.686 32.8607 176.35C29.0475 177.017 25.9593 176.613 24.2218 175.143L23.9093 175.643C25.7902 177.234 29.0314 177.613 32.8817 176.94C36.7451 176.265 41.2718 174.522 45.7723 171.792L45.5866 171.265ZM24.3086 175.304C23.9094 173.012 25.0891 169.968 27.5846 166.752C30.066 163.555 33.7936 160.262 38.3353 157.508L38.1496 156.98C33.563 159.762 29.7763 163.1 27.2385 166.37C24.7146 169.623 23.37 172.885 23.8225 175.483L24.3086 175.304ZM38.3353 157.508C42.79 154.806 47.2611 153.087 51.0612 152.422C54.8744 151.756 57.9626 152.16 59.7001 153.629L60.0125 153.13C58.1317 151.539 54.8905 151.159 51.0402 151.832C47.1768 152.508 42.6501 154.251 38.1496 156.98L38.3353 157.508Z"
						fill="#2B2B2E"
					></path><mask
						id="mask0_254_31479"
						maskUnits="userSpaceOnUse"
						x="17"
						y="143"
						width="49"
						height="41"
						style="mask-type: alpha;"
						><path
							fill-rule="evenodd"
							clip-rule="evenodd"
							d="M20.2053 176.623C20.293 177.476 20.5236 178.274 20.9071 179.001C24.0661 184.99 36.3999 183.912 48.4555 176.593C60.511 169.274 67.7231 158.485 64.564 152.496C64.1096 151.634 63.4653 150.919 62.6593 150.347L62.5861 150.216C62.5037 149.337 62.2709 148.515 61.877 147.769C58.7165 141.778 46.3827 142.853 34.3286 150.171C22.2745 157.488 15.0647 168.277 18.2251 174.268C18.6671 175.106 19.2886 175.805 20.0636 176.369L20.2053 176.623Z"
							fill="#FFE091"
						></path><path
							d="M20.9071 179.001L21.1199 178.822L20.9071 179.001ZM20.2053 176.623L20.451 176.555L20.4443 176.491L20.4151 176.438L20.2053 176.623ZM48.4555 176.593L48.5472 176.857L48.4555 176.593ZM64.564 152.496L64.7769 152.317L64.564 152.496ZM62.6593 150.347L62.4495 150.532L62.4763 150.58L62.5178 150.609L62.6593 150.347ZM62.5861 150.216L62.3401 150.281L62.3463 150.347L62.3763 150.401L62.5861 150.216ZM61.877 147.769L62.0898 147.59L62.0898 147.59L61.877 147.769ZM34.3286 150.171L34.2368 149.907L34.3286 150.171ZM18.2251 174.268L18.4379 174.089L18.2251 174.268ZM20.0636 176.369L20.2734 176.185L20.2473 176.138L20.2072 176.109L20.0636 176.369ZM21.1199 178.822C20.7541 178.129 20.5346 177.369 20.451 176.555L19.9596 176.69C20.0514 177.584 20.2931 178.419 20.6942 179.18L21.1199 178.822ZM48.3637 176.328C42.3625 179.972 36.2993 182.057 31.3533 182.489C26.3859 182.924 22.6308 181.687 21.1199 178.822L20.6942 179.18C22.3423 182.304 26.3337 183.523 31.3368 183.086C36.3614 182.646 42.4928 180.533 48.5472 176.857L48.3637 176.328ZM64.3512 152.675C65.8457 155.508 64.9229 159.544 62.0292 163.873C59.1466 168.185 54.3661 172.684 48.3637 176.328L48.5472 176.857C54.6003 173.182 59.4537 168.627 62.4012 164.218C65.3376 159.825 66.4414 155.473 64.7769 152.317L64.3512 152.675ZM62.5178 150.609C63.2994 151.164 63.9174 151.852 64.3512 152.675L64.7769 152.317C64.3018 151.416 63.6312 150.674 62.8007 150.085L62.5178 150.609ZM62.8691 150.163L62.7959 150.032L62.3763 150.401L62.4495 150.532L62.8691 150.163ZM62.8321 150.152C62.7458 149.231 62.5018 148.371 62.0898 147.59L61.6641 147.948C62.0399 148.66 62.2615 149.442 62.3401 150.281L62.8321 150.152ZM62.0898 147.59C60.441 144.464 56.4494 143.245 51.4462 143.681C46.4216 144.119 40.2905 146.232 34.2368 149.907L34.4204 150.435C40.4208 146.793 46.4837 144.709 51.4296 144.277C56.397 143.844 60.1525 145.082 61.6641 147.948L62.0898 147.59ZM34.2368 149.907C28.1844 153.581 23.332 158.135 20.3853 162.544C17.4498 166.937 16.347 171.29 18.0123 174.447L18.4379 174.089C16.9428 171.255 17.8647 167.218 20.7574 162.889C23.6391 158.577 28.4186 154.079 34.4204 150.435L34.2368 149.907ZM18.0123 174.447C18.4744 175.323 19.1212 176.048 19.9201 176.629L20.2072 176.109C19.4559 175.562 18.8599 174.889 18.4379 174.089L18.0123 174.447ZM19.8538 176.553L19.9955 176.807L20.4151 176.438L20.2734 176.185L19.8538 176.553Z"
							fill="black"
						></path></mask
					><g mask="url(#mask0_254_31479)"
						><path
							fill-rule="evenodd"
							clip-rule="evenodd"
							d="M39.6357 171.448C39.5691 171.51 39.4566 171.534 39.3843 171.502L32.1547 168.254C32.0824 168.221 32.0778 168.145 32.1444 168.082L32.646 167.613C32.7125 167.551 32.8251 167.527 32.8973 167.56L40.127 170.807C40.1992 170.84 40.2038 170.917 40.1373 170.979L39.6357 171.448ZM35.8835 168.601C35.9573 168.631 36.0739 168.608 36.1439 168.548L36.1966 168.502C35.944 168.366 35.7163 168.221 35.5144 168.066L35.3401 168.215C35.2702 168.275 35.2733 168.348 35.3472 168.379L35.8835 168.601ZM35.9325 167.707L37.7994 166.107C37.8307 166.219 37.8848 166.328 37.962 166.435C38.0358 166.54 38.1351 166.639 38.2598 166.734L36.6052 168.152C36.351 168.013 36.1268 167.865 35.9325 167.707ZM37.3912 169.018L37.2854 169.109C37.2155 169.169 37.2187 169.242 37.2925 169.272L37.8288 169.494C37.9027 169.525 38.0192 169.501 38.0892 169.441L38.2802 169.277C37.98 169.206 37.6836 169.119 37.3912 169.018ZM38.6966 168.92C38.3954 168.853 38.0966 168.768 37.8001 168.667L39.429 167.271C39.7545 167.365 40.07 167.417 40.3757 167.428C40.3958 167.429 40.4158 167.429 40.4358 167.429L38.6966 168.92ZM45.1378 163.398L47.4866 161.385C47.4798 161.355 47.471 161.326 47.4603 161.297C47.3834 161.121 47.2437 160.954 47.0302 160.797C47.0214 160.79 47.0125 160.784 47.0035 160.777L44.5718 162.862C44.7742 163.039 44.9629 163.218 45.1378 163.398ZM44.1488 163.225C44.3497 163.405 44.5356 163.586 44.7064 163.768L42.7283 165.464C42.6765 165.367 42.6114 165.267 42.533 165.164C42.4529 165.062 42.3612 164.955 42.2578 164.846L44.1488 163.225ZM43.7076 162.063L45.8463 160.23C45.546 160.137 45.2802 160.09 45.0484 160.079C44.9728 160.076 44.9006 160.076 44.8316 160.078L43.2535 161.431C43.2839 161.505 43.3286 161.587 43.3913 161.679C43.469 161.793 43.574 161.921 43.7076 162.063ZM42.7824 161.835C42.7973 161.859 42.8131 161.883 42.8299 161.907C42.9367 162.063 43.0855 162.239 43.2765 162.433L41.3871 164.053C41.1777 163.873 40.9871 163.696 40.8154 163.521L42.7824 161.835ZM45.2927 159.683C45.5978 159.704 45.9191 159.769 46.2564 159.878L47.8739 158.491C47.5818 158.385 47.2907 158.294 47.0003 158.219L45.2927 159.683ZM47.4137 157.864C47.7044 157.943 47.9939 158.035 48.2821 158.141L48.9474 157.571C49.0174 157.511 49.0142 157.438 48.9403 157.407L48.4041 157.185C48.3302 157.155 48.2136 157.179 48.1437 157.238L47.4137 157.864ZM49.0451 159.027L47.4173 160.422C47.4521 160.446 47.4859 160.47 47.5187 160.494C47.7172 160.64 47.8681 160.799 47.9714 160.969L49.7154 159.474C49.5067 159.313 49.2833 159.164 49.0451 159.027ZM50.1321 159.117C49.9202 158.959 49.6943 158.812 49.4544 158.676L50.089 158.132C50.1589 158.072 50.2755 158.048 50.3494 158.079L50.8857 158.301C50.9595 158.331 50.9627 158.405 50.8928 158.465L50.1321 159.117ZM40.3865 163.889L38.403 165.589L38.4024 165.591C38.3411 165.795 38.3718 165.996 38.5196 166.201L38.5204 166.202L38.5212 166.203C38.5616 166.261 38.6137 166.318 38.6788 166.374L40.9659 164.414C40.7563 164.237 40.563 164.062 40.3865 163.889ZM41.824 165.218L39.8414 166.917C40.0943 166.985 40.3265 167.02 40.5379 167.027C40.6747 167.031 40.8017 167.027 40.92 167.014L42.2415 165.881C42.1999 165.742 42.1167 165.583 41.9808 165.406C41.9334 165.345 41.8811 165.282 41.824 165.218Z"
							fill="white"
						></path><path
							d="M43.1018 160.383C42.8338 160.63 42.6707 160.871 42.6125 161.106C42.5486 161.339 42.6198 161.606 42.8262 161.907C43.0326 162.208 43.3958 162.58 43.9157 163.023C44.497 163.515 44.9652 164.013 45.3204 164.517C45.6756 165.021 45.8391 165.532 45.811 166.049C45.7723 166.569 45.461 167.098 44.8771 167.637C44.3075 168.162 43.6123 168.551 42.7914 168.802C41.9647 169.051 41.087 169.153 40.1584 169.111C39.224 169.065 38.311 168.868 37.4194 168.519C36.4875 168.154 35.8233 167.708 35.4269 167.182C35.0248 166.653 34.8784 166.093 34.9879 165.5C35.0974 164.908 35.3248 164.484 35.9278 163.928L38.421 164.702C38.0955 165.003 37.8918 165.3 37.8097 165.595C37.7219 165.888 37.773 166.166 37.9631 166.429C38.1474 166.69 38.4898 166.919 38.9902 167.115C39.4734 167.304 39.9359 167.407 40.3777 167.422C40.8137 167.436 41.2152 167.379 41.5821 167.252C41.9432 167.123 42.2506 166.942 42.5042 166.707C42.7531 166.478 42.8784 166.237 42.88 165.986C42.8758 165.733 42.76 165.458 42.5326 165.161C42.2993 164.862 41.9669 164.534 41.5353 164.176C40.8446 163.604 40.3423 163.058 40.0283 162.539C39.7086 162.017 39.6016 161.503 39.7074 160.997C39.8083 160.496 40.1412 159.984 40.706 159.463C41.3042 158.911 42.0057 158.509 42.8104 158.258C43.615 158.007 44.4716 157.909 45.3801 157.963C46.2781 158.019 47.1844 158.226 48.099 158.584C48.7088 158.823 49.2458 159.121 49.71 159.479C50.1637 159.839 50.4958 160.24 50.7061 160.681C50.9118 161.126 50.9478 161.6 50.8142 162.101C50.6759 162.607 50.4508 162.971 49.8813 163.497L47.3709 162.715C47.7011 162.411 47.9202 162.125 48.0282 161.859C48.1256 161.595 48.1306 161.349 48.0431 161.119C47.9451 160.892 47.7685 160.685 47.5134 160.497C47.2583 160.309 46.9438 160.142 46.5699 159.995C46.0867 159.806 45.6347 159.701 45.214 159.681C44.7827 159.663 44.389 159.717 44.0326 159.841C43.6705 159.964 43.3603 160.144 43.1018 160.383Z"
							fill="white"
						></path></g
					><mask
						id="mask1_254_31479"
						maskUnits="userSpaceOnUse"
						x="70"
						y="84"
						width="36"
						height="20"
						style="mask-type: luminance;"
						><path
							d="M105.865 91.2087L72.8857 84.2646L70.2816 96.6319L103.261 103.576L105.865 91.2087Z"
							fill="white"
						></path></mask
					><g mask="url(#mask1_254_31479)"
						><path
							d="M84.873 98.4442L85.081 98.488L85.1576 98.2897L88.9457 88.4889L89.0517 88.2147L88.764 88.1541L86.1211 87.5978L85.913 87.554L85.8364 87.7523L82.0483 97.5531L81.9424 97.8273L82.23 97.8879L84.873 98.4442ZM82.2471 86.782L82.0753 86.7458L81.983 86.8951L78.4676 92.5793L78.4757 91.9144L78.4757 91.9136L78.5475 87.1702L78.548 87.1619C78.5486 87.1514 78.549 87.1374 78.5491 87.1202C78.5492 87.0861 78.5477 87.0392 78.5416 86.9831C78.5294 86.8714 78.4988 86.7192 78.4238 86.557C78.2685 86.2205 77.9378 85.8746 77.288 85.7378L73.1243 84.861L72.9394 84.8221L72.8515 84.9893L72.7665 85.1509L72.6416 85.3885L72.8874 85.4962L72.8874 85.4962L72.8874 85.4962L72.8875 85.4962L72.8876 85.4963L72.8895 85.4971L72.8983 85.5011C72.9064 85.5048 72.919 85.5106 72.9358 85.5185C72.9694 85.5344 73.0196 85.5588 73.0844 85.5919C73.2139 85.6583 73.4013 85.7597 73.6291 85.8984C74.067 86.1651 74.6524 86.5685 75.262 87.1236L75.6958 96.3212L75.7049 96.5143L75.894 96.5541L78.6479 97.1337L78.8113 97.1681L78.9057 97.0303L85.2457 87.7666L85.457 87.4578L85.0909 87.3807L82.2471 86.782ZM100.591 101.55L100.59 101.754L100.79 101.796L103.216 102.307L103.517 102.37L103.517 102.062L103.539 91.4683L103.539 91.265L103.34 91.2231L101.217 90.7759C100.655 90.6575 100.241 90.8001 99.9673 90.9859C99.8333 91.0768 99.7361 91.1756 99.6718 91.2525C99.6395 91.2912 99.615 91.3248 99.598 91.3499C99.5895 91.3625 99.5828 91.373 99.5779 91.381L99.5757 91.3846L93.6618 99.9406L93.448 100.25L93.8159 100.327L96.5708 100.907L96.7419 100.943L96.8344 100.795L97.6098 99.5519L100.598 100.181L100.591 101.55ZM95.5338 92.6076L95.7995 92.8366L95.9293 92.5107L96.7656 90.4108L96.8419 90.2193L96.6685 90.1079L96.5333 90.3183L96.6684 90.1079L96.6683 90.1078L96.668 90.1076L96.6671 90.1071L96.6642 90.1052L96.6538 90.0986C96.6448 90.093 96.6319 90.085 96.6152 90.0748C96.5818 90.0544 96.5333 90.0254 96.4716 89.99C96.3482 89.9192 96.1715 89.8226 95.9559 89.7178C95.5266 89.509 94.9355 89.2642 94.3017 89.1308C93.6209 88.9874 92.4414 88.8928 91.345 89.2002C90.2358 89.5111 89.191 90.2435 88.8735 91.7519C88.5662 93.2103 89.4455 94.1536 90.2585 94.8595C90.3979 94.9805 90.5332 95.093 90.662 95.2001C90.924 95.4181 91.1591 95.6136 91.3479 95.8136C91.6267 96.1089 91.7244 96.3346 91.6784 96.5528L91.6783 96.553C91.6316 96.7748 91.4736 96.9208 91.1772 96.9944C90.8713 97.0704 90.4548 97.055 89.9953 96.9592C89.5401 96.8643 89.0645 96.695 88.6502 96.4842C88.2322 96.2716 87.8958 96.0265 87.7017 95.7899L87.4327 95.462L87.2761 95.8562L86.4038 98.0521L86.3344 98.2268L86.4829 98.342L86.6361 98.1444C86.4829 98.342 86.483 98.342 86.483 98.3421L86.4832 98.3422L86.4836 98.3425L86.4846 98.3433L86.4879 98.3458L86.4991 98.3542C86.5086 98.3613 86.5222 98.3713 86.5398 98.3839C86.5751 98.4091 86.6265 98.4447 86.6934 98.4882C86.8272 98.5753 87.0232 98.6942 87.2764 98.8248C87.7827 99.0859 88.5193 99.3948 89.4464 99.59C90.3825 99.7872 91.6102 99.794 92.6835 99.4153C93.7664 99.0333 94.707 98.2502 94.9964 96.8748C95.3042 95.4126 94.4357 94.4109 93.6178 93.6742C93.4486 93.5218 93.2772 93.377 93.1165 93.2412C93.0817 93.2118 93.0474 93.1828 93.0138 93.1543C92.8221 92.9918 92.6513 92.8438 92.5103 92.7028C92.2104 92.4026 92.128 92.212 92.1586 92.0669L92.1586 92.0669C92.195 91.8941 92.3109 91.7784 92.536 91.7133C92.7723 91.6449 93.1012 91.6447 93.4789 91.7099C94.2349 91.8405 95.0754 92.2126 95.5338 92.6076ZM100.61 97.498L99.0911 97.1781L100.623 94.7229L100.61 97.498Z"
							fill="#1FC44E"
							stroke="black"
							stroke-width="0.5"
						></path><path
							d="M78.2255 91.9097L78.2974 87.1585C78.2974 87.1585 78.3824 86.2221 77.2363 85.9808L73.0725 85.104L72.9876 85.2656C72.9876 85.2656 74.9011 86.1018 76.4939 88.0602C78.0167 89.9322 78.2255 91.9097 78.2255 91.9097Z"
							fill="white"
						></path></g
					><path
						d="M34.8912 110.067L34.8912 110.067C37.1777 107.687 40.5616 106.707 43.7664 107.498C46.9712 108.289 49.5111 110.729 50.4293 113.9C51.8476 118.802 49.0246 123.926 44.1221 125.345C39.2206 126.764 34.0971 123.94 32.6778 119.038L32.4377 119.108L32.6778 119.038C31.7596 115.867 32.6036 112.447 34.8912 110.067Z"
						fill="#F1F395"
						stroke="black"
						stroke-width="0.5"
					></path><path
						d="M40.2512 116.845C39.3092 113.588 36.7006 111.081 33.4081 110.269C30.1166 109.457 26.6411 110.463 24.2927 112.908C21.9433 115.352 21.0764 118.865 22.0195 122.121C22.9625 125.379 25.5711 127.886 28.8626 128.698C32.1541 129.509 35.6296 128.504 37.979 126.059C40.3274 123.614 41.1943 120.102 40.2512 116.845Z"
						fill="#FFE091"
						stroke="black"
						stroke-width="0.5"
					></path><path
						d="M32.4388 119.106C33.343 122.232 35.6979 124.514 38.494 125.398C40.3479 123.026 41.1193 119.839 40.2522 116.844C39.385 113.849 36.9931 111.436 34.197 110.552C32.3051 112.793 31.5337 115.98 32.4388 119.106Z"
						fill="#FFBD13"
					></path></svg
				>
			</dd>
		</dl>
		<dl class="detailsWraper marginTop16">
			<dt class="leftSider">
				<h3 class="title">{$_('select-payment-method')}</h3>
				<ul class="methodWraper">
					<li class="active">
						<dl>
							<dt class="flex-start">
								<svg
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
									><path
										fill-rule="evenodd"
										clip-rule="evenodd"
										d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24ZM17.237 9.44598C18.469 10.678 20.137 11.37 21.877 11.37H21.873V12.514C20.181 12.518 18.561 13.174 17.341 14.338C17.605 15.258 17.765 16.154 17.817 16.998C17.921 18.714 17.553 20.054 16.773 20.878L16.781 20.886L16.745 20.922C16.161 21.506 15.349 21.802 14.333 21.802C13.573 21.786 12.817 21.65 12.101 21.394C10.153 20.746 8.07301 19.382 6.24501 17.554C4.41701 15.726 3.05301 13.642 2.40501 11.698C1.73301 9.68198 1.90101 8.02998 2.88101 7.04998C3.40101 6.52998 4.11301 6.23799 4.96901 6.18198C5.24501 5.36598 5.71301 4.74999 6.35301 4.37799C7.55301 3.68599 9.19301 3.94999 10.965 5.12198C11.873 5.72198 12.765 6.52598 13.597 7.48198C13.973 6.64598 14.173 5.73798 14.173 4.80598H15.313C15.313 6.54598 16.005 8.21399 17.237 9.44598ZM10.641 5.60598C9.06101 4.56199 7.63701 4.30598 6.63701 4.88198C6.16901 5.14998 5.81301 5.59399 5.58101 6.18998C6.24501 6.23398 6.89701 6.36598 7.52501 6.58198C9.09301 7.10198 10.745 8.08998 12.285 9.40998C12.689 8.99798 13.033 8.54198 13.313 8.04998C12.473 7.04998 11.565 6.21798 10.641 5.60598ZM2.95301 11.514C3.57701 13.378 4.89301 15.378 6.65701 17.142C8.12501 18.61 9.75701 19.766 11.333 20.474C9.69701 19.334 8.12501 17.542 6.88501 15.394C5.59301 13.154 4.81301 10.79 4.68901 8.74198C4.64101 8.08599 4.68101 7.42598 4.80901 6.77798C4.18501 6.85398 3.66901 7.08198 3.28901 7.46198C2.47301 8.27798 2.35301 9.71798 2.95301 11.514ZM11.865 20.134C13.445 21.178 14.869 21.434 15.869 20.858C16.869 20.282 17.361 18.922 17.237 17.03C17.197 16.33 17.073 15.594 16.877 14.834C15.873 16.014 15.317 17.518 15.313 19.078H14.169C14.165 17.338 13.473 15.67 12.241 14.438C11.009 13.206 9.34101 12.514 7.60101 12.51V11.938V11.366C9.16901 11.366 10.673 10.802 11.857 9.79398C10.393 8.54599 8.82501 7.60998 7.34101 7.11798C6.71701 6.89798 6.06501 6.77398 5.40501 6.74599C5.26101 7.38999 5.21301 8.04998 5.26501 8.70599C5.38501 10.666 6.13701 12.938 7.38501 15.102C8.63301 17.262 10.229 19.05 11.865 20.134Z"
										fill="currentColor"
									></path></svg
								><strong>MOONPAY</strong>
							</dt>
							<dd>
								<span class="payWraper"
									><span class="item item1"
										><svg
											width="31"
											height="18"
											viewBox="0 0 31 18"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
											><path
												d="M24.6263 8.80045C24.5806 6.68317 23.409 4.75096 21.5529 3.73174C19.6968 2.71252 17.4374 2.76089 15.627 3.85895C13.816 4.95685 12.7282 6.93736 12.7738 9.05465C12.8444 12.3274 15.5542 14.9239 18.8268 14.854C22.1002 14.7836 24.6962 12.0733 24.6263 8.80045Z"
												fill="#F79E1B"
											></path><path
												d="M17.8538 8.94496C17.8087 6.82772 16.6372 4.8954 14.7805 3.87595C12.9244 2.85666 10.665 2.90503 8.85457 4.00322C7.04353 5.10117 5.95566 7.0818 6.00139 9.19897C6.047 11.3165 7.21845 13.2491 9.0746 14.2682C10.9307 15.2873 13.19 15.2394 15.0011 14.1411C16.8117 13.0427 17.8994 11.0623 17.8538 8.94496Z"
												fill="#EB001B"
											></path><path
												d="M12.7749 9.05369C12.8181 11.0857 13.8725 12.8418 15.418 13.825C16.9183 12.6915 17.8962 10.8919 17.8543 8.94468C17.8124 6.9975 16.7566 5.15674 15.2111 4.17358C13.7089 5.22213 12.731 7.02176 12.7749 9.05369Z"
												fill="#FF5F00"
											></path></svg
										></span
									><span class="item item2"
										><svg
											width="44"
											height="18"
											viewBox="0 0 44 18"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
											><path
												d="M35.2645 13.8557L34.9746 12.4059H31.7349L31.2194 13.8454L28.6228 13.8505C29.859 10.8778 31.0978 7.90611 32.3393 4.93557C32.5506 4.4317 32.9256 4.17526 33.4784 4.17784C33.9011 4.1817 34.5906 4.1817 35.548 4.17912L37.5558 13.8518L35.2645 13.8557ZM32.4643 10.4201H34.5519L33.7723 6.78608L32.4643 10.4201ZM15.7259 4.17655L18.3367 4.17912L14.3006 13.857L11.6576 13.8544C10.9929 11.2981 10.3366 8.73966 9.6885 6.17912C9.55963 5.66881 9.30448 5.31186 8.8135 5.14304C8.37664 4.99227 7.64855 4.76031 6.62793 4.44459V4.18041H10.7993C11.521 4.18041 11.9424 4.52964 12.0777 5.24613C12.2143 5.96392 12.5571 7.79124 13.1086 10.7281L15.7259 4.17655ZM21.9243 4.17912L19.8599 13.8544L17.3754 13.8518L19.4372 4.17655L21.9243 4.17912ZM26.963 4C27.7065 4 28.6434 4.23196 29.1821 4.44459L28.7465 6.45103C28.2594 6.25516 27.4578 5.99098 26.7839 6C25.8045 6.01675 25.1988 6.42784 25.1988 6.82217C25.1988 7.46392 26.2504 7.78737 27.3328 8.4884C28.5686 9.28737 28.731 10.0052 28.7156 10.7848C28.6988 12.4034 27.3328 14 24.4514 14C23.1369 13.9807 22.6627 13.8698 21.5906 13.4897L22.0442 11.3956C23.1357 11.8531 23.5983 11.9987 24.5313 11.9987C25.3857 11.9987 26.1189 11.6534 26.1254 11.0515C26.1305 10.6237 25.8676 10.4111 24.9089 9.88273C23.9501 9.35309 22.6047 8.61985 22.6228 7.1482C22.6447 5.26418 24.4295 4 26.9643 4H26.963Z"
												fill="#00A3FF"
											></path></svg
										></span
									><span class="item item3"
										><svg
											width="103"
											height="18"
											viewBox="0 0 103 18"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
											><path
												d="M6 13.4H17V14.5H6V13.4ZM7.1 9H8.2V12.85H7.1V9ZM9.85 9H10.95V12.85H9.85V9ZM12.05 9H13.15V12.85H12.05V9ZM14.8 9H15.9V12.85H14.8V9ZM6 6.25L11.5 3.5L17 6.25V8.45H6V6.25ZM7.1 6.9298V7.35H15.9V6.9298L11.5 4.7298L7.1 6.9298ZM11.5 6.8C11.3541 6.8 11.2142 6.74205 11.1111 6.63891C11.0079 6.53576 10.95 6.39587 10.95 6.25C10.95 6.10413 11.0079 5.96424 11.1111 5.86109C11.2142 5.75795 11.3541 5.7 11.5 5.7C11.6459 5.7 11.7858 5.75795 11.8889 5.86109C11.9921 5.96424 12.05 6.10413 12.05 6.25C12.05 6.39587 11.9921 6.53576 11.8889 6.63891C11.7858 6.74205 11.6459 6.8 11.5 6.8Z"
												fill="#878787"
											></path><path
												d="M25.5694 7.964C26.3214 7.964 26.8694 8.2 27.2134 8.672C27.5574 9.144 27.7294 9.928 27.7294 11.024C27.7294 11.496 27.6854 11.924 27.5974 12.308C27.5174 12.692 27.3734 13.024 27.1654 13.304C26.9654 13.576 26.6854 13.784 26.3254 13.928C25.9654 14.072 25.5054 14.144 24.9454 14.144C24.7454 14.144 24.5174 14.136 24.2614 14.12C24.0054 14.104 23.7454 14.076 23.4814 14.036C23.2174 13.996 22.9614 13.952 22.7134 13.904C22.4734 13.848 22.2574 13.78 22.0654 13.7L23.2294 12.812C23.4054 12.868 23.5894 12.916 23.7814 12.956C23.9814 12.988 24.1774 13.012 24.3694 13.028C24.5694 13.036 24.7534 13.04 24.9214 13.04C25.2414 13.032 25.4934 12.968 25.6774 12.848C25.8694 12.728 26.0094 12.524 26.0974 12.236C26.1854 11.94 26.2294 11.536 26.2294 11.024C26.2294 10.544 26.1934 10.168 26.1214 9.896C26.0574 9.616 25.9374 9.42 25.7614 9.308C25.5854 9.196 25.3334 9.14 25.0054 9.14C24.7174 9.14 24.4494 9.208 24.2014 9.344C23.9614 9.48 23.6814 9.664 23.3614 9.896L23.2654 9.116C23.4814 8.884 23.7094 8.68 23.9494 8.504C24.1974 8.328 24.4574 8.196 24.7294 8.108C25.0094 8.012 25.2894 7.964 25.5694 7.964ZM23.5174 5.6L23.5294 7.64C23.5294 7.896 23.5174 8.144 23.4934 8.384C23.4774 8.616 23.4374 8.844 23.3734 9.068L23.5174 9.236V13.772L22.0654 13.7V5.6H23.5174ZM32.0613 7.964C32.5333 7.964 32.9293 8.028 33.2493 8.156C33.5773 8.276 33.8253 8.484 33.9933 8.78C34.1613 9.076 34.2453 9.484 34.2453 10.004V14H33.0933L32.8893 12.728L32.7813 12.56V9.992C32.7813 9.68 32.7093 9.456 32.5653 9.32C32.4213 9.176 32.1453 9.104 31.7373 9.104C31.4333 9.104 31.0493 9.116 30.5853 9.14C30.1293 9.164 29.6693 9.196 29.2053 9.236L29.0732 8.24C29.3533 8.184 29.6693 8.136 30.0213 8.096C30.3733 8.056 30.7293 8.024 31.0893 8C31.4493 7.976 31.7733 7.964 32.0613 7.964ZM33.6213 10.376L33.6093 11.276H30.9093C30.6693 11.284 30.4973 11.348 30.3933 11.468C30.2893 11.588 30.2373 11.752 30.2373 11.96V12.284C30.2373 12.524 30.3013 12.708 30.4293 12.836C30.5573 12.956 30.7573 13.016 31.0293 13.016C31.2453 13.016 31.4853 12.972 31.7493 12.884C32.0133 12.796 32.2733 12.668 32.5293 12.5C32.7933 12.332 33.0293 12.132 33.2373 11.9V12.656C33.1573 12.776 33.0413 12.92 32.8893 13.088C32.7373 13.248 32.5493 13.408 32.3253 13.568C32.1093 13.728 31.8573 13.86 31.5693 13.964C31.2893 14.068 30.9773 14.12 30.6333 14.12C30.2813 14.12 29.9653 14.06 29.6853 13.94C29.4053 13.812 29.1853 13.628 29.0253 13.388C28.8653 13.14 28.7853 12.836 28.7853 12.476V11.852C28.7853 11.388 28.9373 11.028 29.2413 10.772C29.5533 10.508 29.9773 10.376 30.5133 10.376H33.6213ZM39.6998 7.964C40.7958 7.964 41.3438 8.504 41.3438 9.584V14H39.8918V10.028C39.8918 9.708 39.8358 9.488 39.7238 9.368C39.6118 9.248 39.4238 9.188 39.1598 9.188C38.8638 9.188 38.5598 9.256 38.2478 9.392C37.9358 9.52 37.5598 9.708 37.1198 9.956L37.0598 9.08C37.4918 8.72 37.9318 8.444 38.3798 8.252C38.8278 8.06 39.2678 7.964 39.6998 7.964ZM37.0118 8.108L37.1558 9.26L37.2758 9.428V14H35.8238V8.108H37.0118ZM48.2651 8.108L46.5851 10.208C46.5211 10.304 46.4411 10.4 46.3451 10.496C46.2491 10.584 46.1651 10.652 46.0931 10.7V10.724C46.1651 10.772 46.2491 10.852 46.3451 10.964C46.4411 11.068 46.5211 11.176 46.5851 11.288L48.4571 14H46.8131L44.6651 10.664L46.6211 8.108H48.2651ZM44.3891 5.6L44.4011 9.188C44.4011 9.452 44.3851 9.704 44.3531 9.944C44.3291 10.184 44.2931 10.428 44.2451 10.676C44.2851 10.908 44.3171 11.148 44.3411 11.396C44.3731 11.644 44.3891 11.876 44.3891 12.092V14H42.9371V5.6H44.3891ZM45.2891 10.232V11.168H43.9211V10.232H45.2891ZM53.6702 6.428V12.224C53.6702 12.472 53.7222 12.648 53.8262 12.752C53.9382 12.856 54.1262 12.908 54.3902 12.908H55.2062L55.3622 13.928C55.2262 13.968 55.0622 14.004 54.8702 14.036C54.6782 14.068 54.4902 14.088 54.3062 14.096C54.1222 14.112 53.9662 14.12 53.8382 14.12C53.3262 14.12 52.9262 13.984 52.6382 13.712C52.3582 13.432 52.2182 13.032 52.2182 12.512V6.428H53.6702ZM55.4222 8.108V9.116H51.1742V8.168L52.3262 8.108H55.4222ZM57.6237 8.108L57.8157 9.26L57.9477 9.428V14H56.4957V8.108H57.6237ZM60.5037 7.964L60.3597 9.308H59.9397C59.6277 9.308 59.3117 9.36 58.9917 9.464C58.6717 9.568 58.2717 9.724 57.7917 9.932L57.6957 9.08C58.1117 8.728 58.5357 8.456 58.9677 8.264C59.3997 8.064 59.8157 7.964 60.2157 7.964H60.5037ZM64.4284 7.964C64.9004 7.964 65.2964 8.028 65.6164 8.156C65.9444 8.276 66.1924 8.484 66.3604 8.78C66.5284 9.076 66.6124 9.484 66.6124 10.004V14H65.4604L65.2564 12.728L65.1484 12.56V9.992C65.1484 9.68 65.0764 9.456 64.9324 9.32C64.7884 9.176 64.5124 9.104 64.1044 9.104C63.8004 9.104 63.4164 9.116 62.9524 9.14C62.4964 9.164 62.0364 9.196 61.5724 9.236L61.4404 8.24C61.7204 8.184 62.0364 8.136 62.3884 8.096C62.7404 8.056 63.0964 8.024 63.4564 8C63.8164 7.976 64.1404 7.964 64.4284 7.964ZM65.9884 10.376L65.9764 11.276H63.2764C63.0364 11.284 62.8644 11.348 62.7604 11.468C62.6564 11.588 62.6044 11.752 62.6044 11.96V12.284C62.6044 12.524 62.6684 12.708 62.7964 12.836C62.9244 12.956 63.1244 13.016 63.3964 13.016C63.6124 13.016 63.8524 12.972 64.1164 12.884C64.3804 12.796 64.6404 12.668 64.8964 12.5C65.1604 12.332 65.3964 12.132 65.6044 11.9V12.656C65.5244 12.776 65.4084 12.92 65.2564 13.088C65.1044 13.248 64.9164 13.408 64.6924 13.568C64.4764 13.728 64.2244 13.86 63.9364 13.964C63.6564 14.068 63.3444 14.12 63.0004 14.12C62.6484 14.12 62.3324 14.06 62.0524 13.94C61.7724 13.812 61.5524 13.628 61.3924 13.388C61.2324 13.14 61.1524 12.836 61.1524 12.476V11.852C61.1524 11.388 61.3044 11.028 61.6084 10.772C61.9204 10.508 62.3444 10.376 62.8804 10.376H65.9884ZM72.067 7.964C73.163 7.964 73.711 8.504 73.711 9.584V14H72.259V10.028C72.259 9.708 72.203 9.488 72.091 9.368C71.979 9.248 71.791 9.188 71.527 9.188C71.231 9.188 70.927 9.256 70.615 9.392C70.303 9.52 69.927 9.708 69.487 9.956L69.427 9.08C69.859 8.72 70.299 8.444 70.747 8.252C71.195 8.06 71.635 7.964 72.067 7.964ZM69.379 8.108L69.523 9.26L69.643 9.428V14H68.191V8.108H69.379ZM77.4283 7.964C77.7003 7.964 77.9923 7.972 78.3043 7.988C78.6243 8.004 78.9363 8.028 79.2403 8.06C79.5443 8.084 79.8163 8.12 80.0563 8.168L79.9603 9.116C79.5763 9.108 79.1923 9.1 78.8083 9.092C78.4323 9.076 78.0603 9.068 77.6923 9.068C77.3643 9.068 77.1043 9.076 76.9123 9.092C76.7283 9.108 76.5963 9.156 76.5163 9.236C76.4443 9.316 76.4083 9.452 76.4083 9.644C76.4083 9.876 76.4723 10.032 76.6003 10.112C76.7283 10.184 76.9363 10.256 77.2243 10.328L78.8323 10.7C79.3123 10.82 79.6683 11.004 79.9003 11.252C80.1323 11.492 80.2483 11.864 80.2483 12.368C80.2483 12.856 80.1563 13.228 79.9723 13.484C79.7963 13.732 79.5123 13.904 79.1203 14C78.7363 14.088 78.2443 14.132 77.6443 14.132C77.4123 14.132 77.0683 14.12 76.6123 14.096C76.1563 14.08 75.6563 14.028 75.1123 13.94L75.2083 12.992C75.3683 12.992 75.5563 12.996 75.7723 13.004C75.9963 13.012 76.2323 13.016 76.4803 13.016C76.7363 13.016 76.9963 13.016 77.2603 13.016C77.6843 13.016 78.0083 13.004 78.2323 12.98C78.4643 12.948 78.6243 12.888 78.7123 12.8C78.8003 12.704 78.8443 12.568 78.8443 12.392C78.8443 12.168 78.7683 12.02 78.6163 11.948C78.4723 11.868 78.2563 11.792 77.9683 11.72L76.3963 11.336C76.0363 11.24 75.7563 11.12 75.5563 10.976C75.3563 10.824 75.2123 10.64 75.1243 10.424C75.0363 10.2 74.9923 9.928 74.9923 9.608C74.9923 9.176 75.0723 8.84 75.2323 8.6C75.4003 8.36 75.6603 8.192 76.0123 8.096C76.3723 8 76.8443 7.956 77.4283 7.964ZM83.9021 5.372C84.0381 5.372 84.2141 5.376 84.4301 5.384C84.6541 5.392 84.8821 5.404 85.1141 5.42C85.3461 5.428 85.5421 5.448 85.7021 5.48L85.5821 6.452H84.4181C84.0821 6.452 83.8461 6.52 83.7101 6.656C83.5741 6.792 83.5061 7.02 83.5061 7.34V14H82.0541V7.16C82.0541 6.784 82.1141 6.464 82.2341 6.2C82.3541 5.936 82.5501 5.732 82.8221 5.588C83.0941 5.444 83.4541 5.372 83.9021 5.372ZM85.2581 8.108V9.116H81.0101V8.168L82.1021 8.108H85.2581ZM88.8307 7.964C89.7827 7.964 90.4667 8.132 90.8827 8.468C91.2987 8.796 91.5107 9.284 91.5187 9.932C91.5267 10.468 91.3987 10.876 91.1347 11.156C90.8787 11.428 90.4507 11.564 89.8507 11.564H86.4907V10.664H89.4547C89.7267 10.664 89.8987 10.592 89.9707 10.448C90.0507 10.304 90.0907 10.128 90.0907 9.92C90.0827 9.592 89.9867 9.364 89.8027 9.236C89.6267 9.108 89.3227 9.044 88.8907 9.044C88.5147 9.044 88.2227 9.096 88.0147 9.2C87.8067 9.304 87.6587 9.492 87.5707 9.764C87.4907 10.036 87.4507 10.428 87.4507 10.94C87.4507 11.484 87.5027 11.904 87.6067 12.2C87.7107 12.496 87.8827 12.7 88.1227 12.812C88.3627 12.916 88.6827 12.968 89.0827 12.968C89.3787 12.968 89.7187 12.956 90.1027 12.932C90.4947 12.908 90.8707 12.876 91.2307 12.836L91.3747 13.76C91.1587 13.848 90.9107 13.92 90.6307 13.976C90.3507 14.032 90.0587 14.072 89.7547 14.096C89.4587 14.128 89.1787 14.144 88.9147 14.144C88.1947 14.144 87.6147 14.04 87.1747 13.832C86.7427 13.616 86.4267 13.28 86.2267 12.824C86.0347 12.368 85.9387 11.78 85.9387 11.06C85.9387 10.284 86.0347 9.672 86.2267 9.224C86.4267 8.768 86.7387 8.444 87.1627 8.252C87.5947 8.06 88.1507 7.964 88.8307 7.964ZM93.9518 8.108L94.1438 9.26L94.2758 9.428V14H92.8238V8.108H93.9518ZM96.8318 7.964L96.6878 9.308H96.2678C95.9558 9.308 95.6398 9.36 95.3198 9.464C94.9998 9.568 94.5998 9.724 94.1198 9.932L94.0238 9.08C94.4398 8.728 94.8638 8.456 95.2958 8.264C95.7278 8.064 96.1438 7.964 96.5438 7.964H96.8318Z"
												fill="#878787"
											></path></svg
										></span
									><span class="item item4"
										><svg
											width="103"
											height="18"
											viewBox="0 0 103 18"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
											><path
												d="M16.9474 9.30801C17.1871 8.99132 17.3168 8.605 17.3167 8.20784C17.3167 7.57201 16.9614 6.97117 16.3898 6.63517C16.2428 6.54883 16.0755 6.50332 15.905 6.50334H12.5123L12.5975 4.76384C12.6081 4.55796 12.5765 4.35209 12.5048 4.15881C12.4331 3.96554 12.3227 3.78892 12.1804 3.63975C12.0388 3.48963 11.8679 3.37017 11.6783 3.2888C11.4886 3.20742 11.2843 3.16585 11.0779 3.16667C10.7191 3.16757 10.3704 3.28576 10.085 3.50323C9.79962 3.72071 9.59315 4.02553 9.49709 4.37125L8.28084 8.77426H6.45267C6.39317 8.77426 6.33426 8.78598 6.2793 8.80877C6.22435 8.83155 6.17442 8.86495 6.13238 8.90705C6.09034 8.94914 6.057 8.99911 6.03429 9.0541C6.01158 9.10909 5.99992 9.16801 6 9.22751V14.3801C6 14.6309 6.20242 14.8333 6.45267 14.8333H14.9583C15.0883 14.8333 15.2161 14.8077 15.3333 14.7569C15.746 14.5817 16.0795 14.2603 16.2698 13.8543C16.4601 13.4484 16.4939 12.9865 16.3647 12.5572C16.5378 12.3286 16.6545 12.0624 16.7054 11.7802C16.7563 11.498 16.7399 11.2078 16.6575 10.9332C16.8972 10.6165 17.0268 10.2302 17.0268 9.83301C17.0245 9.65519 16.9978 9.47854 16.9474 9.30801ZM7.0185 13.8143V9.79334H8.16417V13.8143H7.0185ZM16.0211 8.81684L15.7108 9.08517L15.9079 9.44509C15.9956 9.60668 16.0255 9.79332 15.9929 9.97423C15.9602 10.1551 15.8669 10.3195 15.7283 10.4403L15.4179 10.7098L15.6145 11.0691C15.7022 11.2307 15.7321 11.4173 15.6995 11.5982C15.6668 11.7791 15.5735 11.9435 15.4348 12.0643L15.1257 12.3332L15.3223 12.6931C15.3754 12.7906 15.4078 12.898 15.4174 13.0086C15.427 13.1192 15.4136 13.2306 15.3781 13.3357C15.3426 13.4409 15.2858 13.5376 15.2111 13.6198C15.1364 13.7019 15.0456 13.7677 14.9443 13.8131H9.07009V9.74842L10.4771 4.64425C10.5135 4.51364 10.5914 4.39841 10.699 4.31601C10.8067 4.2336 10.9383 4.18849 11.0738 4.1875C11.1818 4.1875 11.2879 4.21842 11.3725 4.282C11.5125 4.387 11.5878 4.54567 11.579 4.71367L11.4431 7.52301H15.8904C16.1424 7.67701 16.2982 7.93717 16.2982 8.20784C16.2982 8.44117 16.1961 8.66284 16.0205 8.81684H16.0211Z"
												fill="#EE9829"
											></path><path
												d="M21.9702 13L23.5302 5.152H25.8462C26.3422 5.152 26.7822 5.216 27.1662 5.344C27.5582 5.464 27.8622 5.668 28.0782 5.956C28.3022 6.236 28.4142 6.608 28.4142 7.072C28.4142 7.544 28.3222 7.96 28.1382 8.32C27.9622 8.672 27.7182 8.968 27.4062 9.208C27.0942 9.44 26.7382 9.616 26.3382 9.736C25.9382 9.848 25.5142 9.904 25.0662 9.904H23.8782L23.2662 13H21.9702ZM24.0942 8.872H25.0902C25.7622 8.872 26.2702 8.724 26.6142 8.428C26.9582 8.132 27.1302 7.74 27.1302 7.252C27.1302 6.876 26.9982 6.604 26.7342 6.436C26.4782 6.268 26.0982 6.184 25.5942 6.184H24.6102L24.0942 8.872ZM26.1822 13L24.9342 9.616L25.8942 8.812L27.5622 13H26.1822ZM31.2151 13.144C30.4711 13.144 29.8791 12.928 29.4391 12.496C28.9991 12.056 28.7791 11.44 28.7791 10.648C28.7791 10.096 28.8711 9.596 29.0551 9.148C29.2471 8.7 29.4951 8.312 29.7991 7.984C30.1111 7.656 30.4551 7.404 30.8311 7.228C31.2151 7.052 31.5991 6.964 31.9831 6.964C32.4471 6.964 32.8151 7.06 33.0871 7.252C33.3671 7.444 33.5671 7.704 33.6871 8.032C33.8151 8.36 33.8791 8.728 33.8791 9.136C33.8791 9.312 33.8671 9.48 33.8431 9.64C33.8191 9.792 33.7871 9.936 33.7471 10.072C33.7151 10.208 33.6791 10.328 33.6391 10.432H29.7151L29.8231 9.472H32.7511C32.7751 9.384 32.7871 9.316 32.7871 9.268C32.7951 9.212 32.7991 9.144 32.7991 9.064C32.7991 8.872 32.7671 8.696 32.7031 8.536C32.6471 8.368 32.5471 8.236 32.4031 8.14C32.2671 8.036 32.0791 7.984 31.8391 7.984C31.6631 7.984 31.4711 8.036 31.2631 8.14C31.0551 8.244 30.8591 8.4 30.6751 8.608C30.4991 8.808 30.3511 9.064 30.2311 9.376C30.1191 9.68 30.0631 10.032 30.0631 10.432C30.0631 10.88 30.1191 11.228 30.2311 11.476C30.3511 11.716 30.5151 11.884 30.7231 11.98C30.9391 12.068 31.1911 12.112 31.4791 12.112C31.7111 12.112 31.9311 12.076 32.1391 12.004C32.3471 11.924 32.5351 11.824 32.7031 11.704L33.1591 12.496C32.9191 12.688 32.6351 12.844 32.3071 12.964C31.9791 13.084 31.6151 13.144 31.2151 13.144ZM36.8824 13.144C36.4504 13.144 36.0664 13.052 35.7304 12.868C35.3944 12.676 35.1264 12.404 34.9264 12.052C34.7344 11.692 34.6384 11.256 34.6384 10.744C34.6384 10.216 34.7264 9.724 34.9024 9.268C35.0864 8.812 35.3304 8.412 35.6344 8.068C35.9464 7.716 36.3064 7.444 36.7144 7.252C37.1224 7.06 37.5544 6.964 38.0104 6.964C38.3864 6.964 38.7024 7.036 38.9584 7.18C39.2224 7.324 39.4264 7.492 39.5704 7.684L38.8744 8.416C38.7464 8.28 38.6104 8.18 38.4664 8.116C38.3224 8.044 38.1464 8.008 37.9384 8.008C37.6744 8.008 37.4224 8.08 37.1824 8.224C36.9504 8.368 36.7424 8.564 36.5584 8.812C36.3744 9.06 36.2264 9.348 36.1144 9.676C36.0104 9.996 35.9584 10.336 35.9584 10.696C35.9584 11.136 36.0584 11.48 36.2584 11.728C36.4584 11.976 36.7544 12.1 37.1464 12.1C37.3624 12.1 37.5664 12.056 37.7584 11.968C37.9584 11.872 38.1304 11.768 38.2744 11.656L38.8144 12.388C38.5904 12.596 38.3184 12.776 37.9984 12.928C37.6784 13.072 37.3064 13.144 36.8824 13.144ZM41.9675 13.144C41.5275 13.144 41.1395 13.048 40.8035 12.856C40.4755 12.656 40.2195 12.376 40.0355 12.016C39.8595 11.656 39.7715 11.232 39.7715 10.744C39.7715 10.176 39.8635 9.664 40.0475 9.208C40.2315 8.744 40.4795 8.344 40.7915 8.008C41.1035 7.672 41.4515 7.416 41.8355 7.24C42.2195 7.056 42.6115 6.964 43.0115 6.964C43.4595 6.964 43.8475 7.064 44.1755 7.264C44.5035 7.456 44.7595 7.732 44.9435 8.092C45.1275 8.452 45.2195 8.876 45.2195 9.364C45.2195 9.924 45.1235 10.436 44.9315 10.9C44.7475 11.364 44.4995 11.764 44.1875 12.1C43.8835 12.428 43.5355 12.684 43.1435 12.868C42.7595 13.052 42.3675 13.144 41.9675 13.144ZM42.1115 12.1C42.3435 12.1 42.5675 12.032 42.7835 11.896C42.9995 11.752 43.1915 11.56 43.3595 11.32C43.5275 11.072 43.6595 10.784 43.7555 10.456C43.8595 10.128 43.9115 9.776 43.9115 9.4C43.9115 8.952 43.8235 8.608 43.6475 8.368C43.4715 8.128 43.2155 8.008 42.8795 8.008C42.6475 8.008 42.4195 8.076 42.1955 8.212C41.9795 8.348 41.7875 8.54 41.6195 8.788C41.4515 9.028 41.3155 9.312 41.2115 9.64C41.1155 9.968 41.0675 10.32 41.0675 10.696C41.0675 11.136 41.1555 11.48 41.3315 11.728C41.5155 11.976 41.7755 12.1 42.1115 12.1ZM45.9088 13L47.0968 7.108H48.1408L48.0928 7.936H48.1408C48.4368 7.672 48.7488 7.444 49.0768 7.252C49.4048 7.06 49.7248 6.964 50.0368 6.964C50.4928 6.964 50.8168 7.068 51.0088 7.276C51.2088 7.476 51.3408 7.736 51.4048 8.056C51.7568 7.72 52.1048 7.456 52.4488 7.264C52.8008 7.064 53.1328 6.964 53.4448 6.964C53.9328 6.964 54.2848 7.096 54.5008 7.36C54.7248 7.616 54.8368 7.98 54.8368 8.452C54.8368 8.588 54.8288 8.724 54.8128 8.86C54.7968 8.988 54.7728 9.128 54.7408 9.28L53.9968 13H52.7008L53.4208 9.448C53.4528 9.304 53.4768 9.188 53.4928 9.1C53.5088 9.004 53.5168 8.912 53.5168 8.824C53.5168 8.568 53.4568 8.38 53.3368 8.26C53.2168 8.132 53.0368 8.068 52.7968 8.068C52.6448 8.068 52.4488 8.14 52.2088 8.284C51.9688 8.428 51.6968 8.66 51.3928 8.98L50.5888 13H49.3048L50.0128 9.448C50.0448 9.304 50.0688 9.188 50.0848 9.1C50.1008 9.004 50.1088 8.912 50.1088 8.824C50.1088 8.568 50.0488 8.38 49.9288 8.26C49.8168 8.132 49.6408 8.068 49.4008 8.068C49.2488 8.068 49.0488 8.14 48.8008 8.284C48.5608 8.428 48.2928 8.66 47.9968 8.98L47.2048 13H45.9088ZM55.6705 13L56.8585 7.108H57.9025L57.8545 7.936H57.9025C58.1985 7.672 58.5105 7.444 58.8385 7.252C59.1665 7.06 59.4865 6.964 59.7985 6.964C60.2545 6.964 60.5785 7.068 60.7705 7.276C60.9705 7.476 61.1025 7.736 61.1665 8.056C61.5185 7.72 61.8665 7.456 62.2105 7.264C62.5625 7.064 62.8945 6.964 63.2065 6.964C63.6945 6.964 64.0465 7.096 64.2625 7.36C64.4865 7.616 64.5985 7.98 64.5985 8.452C64.5985 8.588 64.5905 8.724 64.5745 8.86C64.5585 8.988 64.5345 9.128 64.5025 9.28L63.7585 13H62.4625L63.1825 9.448C63.2145 9.304 63.2385 9.188 63.2545 9.1C63.2705 9.004 63.2785 8.912 63.2785 8.824C63.2785 8.568 63.2185 8.38 63.0985 8.26C62.9785 8.132 62.7985 8.068 62.5585 8.068C62.4065 8.068 62.2105 8.14 61.9705 8.284C61.7305 8.428 61.4585 8.66 61.1545 8.98L60.3505 13H59.0665L59.7745 9.448C59.8065 9.304 59.8305 9.188 59.8465 9.1C59.8625 9.004 59.8705 8.912 59.8705 8.824C59.8705 8.568 59.8105 8.38 59.6905 8.26C59.5785 8.132 59.4025 8.068 59.1625 8.068C59.0105 8.068 58.8105 8.14 58.5625 8.284C58.3225 8.428 58.0545 8.66 57.7585 8.98L56.9665 13H55.6705ZM68.0002 13.144C67.2562 13.144 66.6642 12.928 66.2242 12.496C65.7842 12.056 65.5642 11.44 65.5642 10.648C65.5642 10.096 65.6562 9.596 65.8402 9.148C66.0322 8.7 66.2802 8.312 66.5842 7.984C66.8962 7.656 67.2402 7.404 67.6162 7.228C68.0002 7.052 68.3842 6.964 68.7682 6.964C69.2322 6.964 69.6002 7.06 69.8722 7.252C70.1522 7.444 70.3522 7.704 70.4722 8.032C70.6002 8.36 70.6642 8.728 70.6642 9.136C70.6642 9.312 70.6522 9.48 70.6282 9.64C70.6042 9.792 70.5722 9.936 70.5322 10.072C70.5002 10.208 70.4642 10.328 70.4242 10.432H66.5002L66.6082 9.472H69.5362C69.5602 9.384 69.5722 9.316 69.5722 9.268C69.5802 9.212 69.5842 9.144 69.5842 9.064C69.5842 8.872 69.5522 8.696 69.4882 8.536C69.4322 8.368 69.3322 8.236 69.1882 8.14C69.0522 8.036 68.8642 7.984 68.6242 7.984C68.4482 7.984 68.2562 8.036 68.0482 8.14C67.8402 8.244 67.6442 8.4 67.4602 8.608C67.2842 8.808 67.1362 9.064 67.0162 9.376C66.9042 9.68 66.8482 10.032 66.8482 10.432C66.8482 10.88 66.9042 11.228 67.0162 11.476C67.1362 11.716 67.3002 11.884 67.5082 11.98C67.7242 12.068 67.9762 12.112 68.2642 12.112C68.4962 12.112 68.7162 12.076 68.9242 12.004C69.1322 11.924 69.3202 11.824 69.4882 11.704L69.9442 12.496C69.7042 12.688 69.4202 12.844 69.0922 12.964C68.7642 13.084 68.4002 13.144 68.0002 13.144ZM71.2916 13L72.4796 7.108H73.5236L73.4756 7.936H73.5236C73.8196 7.672 74.1356 7.444 74.4716 7.252C74.8076 7.06 75.1596 6.964 75.5276 6.964C76.0236 6.964 76.3796 7.096 76.5956 7.36C76.8116 7.616 76.9196 7.98 76.9196 8.452C76.9196 8.588 76.9116 8.724 76.8956 8.86C76.8876 8.988 76.8636 9.128 76.8236 9.28L76.0796 13H74.7956L75.5156 9.448C75.5396 9.304 75.5596 9.188 75.5756 9.1C75.5996 9.004 75.6116 8.912 75.6116 8.824C75.6116 8.568 75.5516 8.38 75.4316 8.26C75.3116 8.132 75.1236 8.068 74.8676 8.068C74.6676 8.068 74.4476 8.14 74.2076 8.284C73.9676 8.428 73.6916 8.66 73.3796 8.98L72.5876 13H71.2916ZM79.5963 13.144C79.0763 13.144 78.6643 12.96 78.3603 12.592C78.0643 12.216 77.9163 11.684 77.9163 10.996C77.9163 10.436 78.0043 9.912 78.1803 9.424C78.3563 8.928 78.5923 8.496 78.8883 8.128C79.1923 7.76 79.5323 7.476 79.9083 7.276C80.2843 7.068 80.6763 6.964 81.0843 6.964C81.3803 6.964 81.6363 7.036 81.8523 7.18C82.0763 7.316 82.2523 7.504 82.3803 7.744H82.4163L82.5843 6.616L82.9923 4.528H84.2763L82.5723 13H81.5163L81.5763 12.184H81.5403C81.2683 12.472 80.9603 12.704 80.6163 12.88C80.2723 13.056 79.9323 13.144 79.5963 13.144ZM80.1243 12.088C80.3803 12.088 80.6403 12.012 80.9043 11.86C81.1683 11.7 81.4243 11.444 81.6723 11.092L82.1523 8.74C82.0163 8.484 81.8603 8.3 81.6843 8.188C81.5163 8.076 81.3403 8.02 81.1563 8.02C80.9083 8.02 80.6683 8.096 80.4363 8.248C80.2123 8.392 80.0083 8.592 79.8243 8.848C79.6483 9.104 79.5083 9.404 79.4043 9.748C79.3003 10.084 79.2483 10.44 79.2483 10.816C79.2483 11.248 79.3283 11.568 79.4883 11.776C79.6483 11.984 79.8603 12.088 80.1243 12.088ZM86.8088 13.144C86.0648 13.144 85.4728 12.928 85.0328 12.496C84.5928 12.056 84.3728 11.44 84.3728 10.648C84.3728 10.096 84.4648 9.596 84.6488 9.148C84.8408 8.7 85.0888 8.312 85.3928 7.984C85.7048 7.656 86.0488 7.404 86.4248 7.228C86.8088 7.052 87.1928 6.964 87.5768 6.964C88.0408 6.964 88.4088 7.06 88.6808 7.252C88.9608 7.444 89.1608 7.704 89.2808 8.032C89.4088 8.36 89.4728 8.728 89.4728 9.136C89.4728 9.312 89.4608 9.48 89.4368 9.64C89.4128 9.792 89.3808 9.936 89.3408 10.072C89.3088 10.208 89.2728 10.328 89.2328 10.432H85.3088L85.4168 9.472H88.3448C88.3688 9.384 88.3808 9.316 88.3808 9.268C88.3888 9.212 88.3928 9.144 88.3928 9.064C88.3928 8.872 88.3608 8.696 88.2968 8.536C88.2408 8.368 88.1408 8.236 87.9968 8.14C87.8608 8.036 87.6728 7.984 87.4328 7.984C87.2568 7.984 87.0648 8.036 86.8568 8.14C86.6488 8.244 86.4528 8.4 86.2688 8.608C86.0928 8.808 85.9448 9.064 85.8248 9.376C85.7128 9.68 85.6568 10.032 85.6568 10.432C85.6568 10.88 85.7128 11.228 85.8248 11.476C85.9448 11.716 86.1088 11.884 86.3168 11.98C86.5328 12.068 86.7848 12.112 87.0728 12.112C87.3048 12.112 87.5248 12.076 87.7328 12.004C87.9408 11.924 88.1288 11.824 88.2968 11.704L88.7528 12.496C88.5128 12.688 88.2288 12.844 87.9008 12.964C87.5728 13.084 87.2088 13.144 86.8088 13.144ZM91.9362 13.144C91.4162 13.144 91.0042 12.96 90.7002 12.592C90.4042 12.216 90.2562 11.684 90.2562 10.996C90.2562 10.436 90.3442 9.912 90.5202 9.424C90.6962 8.928 90.9322 8.496 91.2282 8.128C91.5322 7.76 91.8722 7.476 92.2482 7.276C92.6242 7.068 93.0162 6.964 93.4242 6.964C93.7202 6.964 93.9762 7.036 94.1922 7.18C94.4162 7.316 94.5922 7.504 94.7202 7.744H94.7562L94.9242 6.616L95.3322 4.528H96.6162L94.9122 13H93.8562L93.9162 12.184H93.8802C93.6082 12.472 93.3002 12.704 92.9562 12.88C92.6122 13.056 92.2722 13.144 91.9362 13.144ZM92.4642 12.088C92.7202 12.088 92.9802 12.012 93.2442 11.86C93.5082 11.7 93.7642 11.444 94.0122 11.092L94.4922 8.74C94.3562 8.484 94.2002 8.3 94.0242 8.188C93.8562 8.076 93.6802 8.02 93.4962 8.02C93.2482 8.02 93.0082 8.096 92.7762 8.248C92.5522 8.392 92.3482 8.592 92.1642 8.848C91.9882 9.104 91.8482 9.404 91.7442 9.748C91.6402 10.084 91.5882 10.44 91.5882 10.816C91.5882 11.248 91.6682 11.568 91.8282 11.776C91.9882 11.984 92.2002 12.088 92.4642 12.088Z"
												fill="#EE9829"
											></path></svg
										></span
									></span
								>
							</dd>
						</dl>
						<dl class="marginTop12">
							<dt>{$_('est-arrival-time-2-min')}</dt>
							<dd>{$_('fee')}<span class="emphasize_green"> 3.95%</span></dd>
						</dl>
					</li>
					<!-- <li class="">
						<dl>
							<dt class="flex-start">
								<svg
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
									><mask
										id="mask0_522_35361"
										maskUnits="userSpaceOnUse"
										x="3"
										y="3"
										width="18"
										height="18"
										style="mask-type: alpha;"
										><circle cx="12" cy="12" r="9" fill="#D9D9D9"></circle></mask
									><g mask="url(#mask0_522_35361)"></g><g clip-path="url(#clip0_522_35361)"
										><g clip-path="url(#clip1_522_35361)"
											><path
												fill-rule="evenodd"
												clip-rule="evenodd"
												d="M0 12C0 18.6274 5.37258 24 12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12ZM5.83984 13.8218L3.86523 16.7297C5.31906 18.0968 7.35883 19.0299 10.2885 19.0296C14.1728 19.0296 16.3211 17.0981 16.3211 14.1905C16.3211 10.7737 13.0233 10.0686 10.6153 9.55375C9.23065 9.2577 8.14023 9.02456 8.14023 8.37493C8.14023 7.74563 8.61766 7.37673 9.70258 7.37673C11.1348 7.37673 12.719 7.87595 13.934 8.89571L15.974 6.09657C14.4332 4.77282 12.415 4.07837 10.093 4.07837C6.38242 4.07837 4.34266 6.24821 4.34266 8.67868C4.34266 12.197 7.59852 12.8653 10.0023 13.3588C11.4088 13.6475 12.5235 13.8763 12.5235 14.5812C12.5235 15.2972 11.7423 15.7313 10.4838 15.7313C8.48711 15.7313 6.88141 14.8634 5.83984 13.8218Z"
												fill="currentColor"
											></path><path
												d="M18.4548 19.0697C19.5106 19.0697 20.3666 18.2137 20.3666 17.1579C20.3666 16.102 19.5106 15.2461 18.4548 15.2461C17.3989 15.2461 16.543 16.102 16.543 17.1579C16.543 18.2137 17.3989 19.0697 18.4548 19.0697Z"
												fill="url(#paint0_linear_522_35361)"
											></path></g
										></g
									><defs
										><linearGradient
											id="paint0_linear_522_35361"
											x1="16.138"
											y1="19.4748"
											x2="19.7227"
											y2="15.89"
											gradientUnits="userSpaceOnUse"
											><stop stop-color="#BD2F92"></stop><stop offset="0.6697" stop-color="#D9215D"
											></stop><stop offset="1" stop-color="#E41B48"></stop></linearGradient
										><clipPath id="clip0_522_35361"
											><rect width="24" height="24" fill="white"></rect></clipPath
										><clipPath id="clip1_522_35361"
											><rect width="24" height="24" fill="white"></rect></clipPath
										></defs
									></svg
								><strong>{$_('simplex')}</strong>
							</dt>
							<dd>
								<span class="payWraper"
									><span class="item item1"
										><svg
											width="31"
											height="18"
											viewBox="0 0 31 18"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
											><path
												d="M24.6263 8.80045C24.5806 6.68317 23.409 4.75096 21.5529 3.73174C19.6968 2.71252 17.4374 2.76089 15.627 3.85895C13.816 4.95685 12.7282 6.93736 12.7738 9.05465C12.8444 12.3274 15.5542 14.9239 18.8268 14.854C22.1002 14.7836 24.6962 12.0733 24.6263 8.80045Z"
												fill="#F79E1B"
											></path><path
												d="M17.8538 8.94496C17.8087 6.82772 16.6372 4.8954 14.7805 3.87595C12.9244 2.85666 10.665 2.90503 8.85457 4.00322C7.04353 5.10117 5.95566 7.0818 6.00139 9.19897C6.047 11.3165 7.21845 13.2491 9.0746 14.2682C10.9307 15.2873 13.19 15.2394 15.0011 14.1411C16.8117 13.0427 17.8994 11.0623 17.8538 8.94496Z"
												fill="#EB001B"
											></path><path
												d="M12.7749 9.05369C12.8181 11.0857 13.8725 12.8418 15.418 13.825C16.9183 12.6915 17.8962 10.8919 17.8543 8.94468C17.8124 6.9975 16.7566 5.15674 15.2111 4.17358C13.7089 5.22213 12.731 7.02176 12.7749 9.05369Z"
												fill="#FF5F00"
											></path></svg
										></span
									><span class="item item2"
										><svg
											width="44"
											height="18"
											viewBox="0 0 44 18"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
											><path
												d="M35.2645 13.8557L34.9746 12.4059H31.7349L31.2194 13.8454L28.6228 13.8505C29.859 10.8778 31.0978 7.90611 32.3393 4.93557C32.5506 4.4317 32.9256 4.17526 33.4784 4.17784C33.9011 4.1817 34.5906 4.1817 35.548 4.17912L37.5558 13.8518L35.2645 13.8557ZM32.4643 10.4201H34.5519L33.7723 6.78608L32.4643 10.4201ZM15.7259 4.17655L18.3367 4.17912L14.3006 13.857L11.6576 13.8544C10.9929 11.2981 10.3366 8.73966 9.6885 6.17912C9.55963 5.66881 9.30448 5.31186 8.8135 5.14304C8.37664 4.99227 7.64855 4.76031 6.62793 4.44459V4.18041H10.7993C11.521 4.18041 11.9424 4.52964 12.0777 5.24613C12.2143 5.96392 12.5571 7.79124 13.1086 10.7281L15.7259 4.17655ZM21.9243 4.17912L19.8599 13.8544L17.3754 13.8518L19.4372 4.17655L21.9243 4.17912ZM26.963 4C27.7065 4 28.6434 4.23196 29.1821 4.44459L28.7465 6.45103C28.2594 6.25516 27.4578 5.99098 26.7839 6C25.8045 6.01675 25.1988 6.42784 25.1988 6.82217C25.1988 7.46392 26.2504 7.78737 27.3328 8.4884C28.5686 9.28737 28.731 10.0052 28.7156 10.7848C28.6988 12.4034 27.3328 14 24.4514 14C23.1369 13.9807 22.6627 13.8698 21.5906 13.4897L22.0442 11.3956C23.1357 11.8531 23.5983 11.9987 24.5313 11.9987C25.3857 11.9987 26.1189 11.6534 26.1254 11.0515C26.1305 10.6237 25.8676 10.4111 24.9089 9.88273C23.9501 9.35309 22.6047 8.61985 22.6228 7.1482C22.6447 5.26418 24.4295 4 26.9643 4H26.963Z"
												fill="#00A3FF"
											></path></svg
										></span
									></span
								>
							</dd>
						</dl>
						<dl class="marginTop12">
							<dt>{$_('est-arrival-time-5-min')}</dt>
							<dd>{$_('fee')}<span class="emphasize_green"> 3.5%-5%</span></dd>
						</dl>
					</li> -->
				</ul>
			</dt>
			<dd class="rightSider">
				<h3 class="title">
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						><g clip-path="url(#clip0_226_28219)"
							><path
								opacity="0.2"
								d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
							></path><path
								d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
								stroke="currentColor"
								stroke-width="1.5"
								stroke-miterlimit="10"
							></path><path
								d="M12.5723 15.178L15.7504 11.9999L12.5723 8.82178"
								stroke="currentColor"
								stroke-width="1.5"
								stroke-linecap="round"
								stroke-linejoin="round"
							></path><path
								d="M8.25 12H15.75"
								stroke="currentColor"
								stroke-width="1.5"
								stroke-linecap="round"
								stroke-linejoin="round"
							></path></g
						><defs
							><clipPath id="clip0_226_28219"><rect width="24" height="24"></rect></clipPath></defs
						></svg
					>{$_('order-details')}</h3>
				<div class="orderDetailsWraper">
					{#if buyQuote}
						<div class="ant-spin-nested-loading">
							{#if loadingQuote}
								<div>
									<div class="ant-spin ant-spin-spinning">
										<span class="ant-spin-dot ant-spin-dot-spin"
											><i class="ant-spin-dot-item"></i><i class="ant-spin-dot-item"></i><i
												class="ant-spin-dot-item"
											></i><i class="ant-spin-dot-item"></i></span
										>
									</div>
								</div>
							{/if}
							<div class="ant-spin-container {loadingQuote ? 'ant-spin-blur' : ''}">
								<div class="display">
									<dl>
										<dt>{$_('payment-method')}</dt>
										<dd class="flex-start">
											<svg
												width="24"
												height="24"
												viewBox="0 0 24 24"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
												><path
													fill-rule="evenodd"
													clip-rule="evenodd"
													d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24ZM17.237 9.44598C18.469 10.678 20.137 11.37 21.877 11.37H21.873V12.514C20.181 12.518 18.561 13.174 17.341 14.338C17.605 15.258 17.765 16.154 17.817 16.998C17.921 18.714 17.553 20.054 16.773 20.878L16.781 20.886L16.745 20.922C16.161 21.506 15.349 21.802 14.333 21.802C13.573 21.786 12.817 21.65 12.101 21.394C10.153 20.746 8.07301 19.382 6.24501 17.554C4.41701 15.726 3.05301 13.642 2.40501 11.698C1.73301 9.68198 1.90101 8.02998 2.88101 7.04998C3.40101 6.52998 4.11301 6.23799 4.96901 6.18198C5.24501 5.36598 5.71301 4.74999 6.35301 4.37799C7.55301 3.68599 9.19301 3.94999 10.965 5.12198C11.873 5.72198 12.765 6.52598 13.597 7.48198C13.973 6.64598 14.173 5.73798 14.173 4.80598H15.313C15.313 6.54598 16.005 8.21399 17.237 9.44598ZM10.641 5.60598C9.06101 4.56199 7.63701 4.30598 6.63701 4.88198C6.16901 5.14998 5.81301 5.59399 5.58101 6.18998C6.24501 6.23398 6.89701 6.36598 7.52501 6.58198C9.09301 7.10198 10.745 8.08998 12.285 9.40998C12.689 8.99798 13.033 8.54198 13.313 8.04998C12.473 7.04998 11.565 6.21798 10.641 5.60598ZM2.95301 11.514C3.57701 13.378 4.89301 15.378 6.65701 17.142C8.12501 18.61 9.75701 19.766 11.333 20.474C9.69701 19.334 8.12501 17.542 6.88501 15.394C5.59301 13.154 4.81301 10.79 4.68901 8.74198C4.64101 8.08599 4.68101 7.42598 4.80901 6.77798C4.18501 6.85398 3.66901 7.08198 3.28901 7.46198C2.47301 8.27798 2.35301 9.71798 2.95301 11.514ZM11.865 20.134C13.445 21.178 14.869 21.434 15.869 20.858C16.869 20.282 17.361 18.922 17.237 17.03C17.197 16.33 17.073 15.594 16.877 14.834C15.873 16.014 15.317 17.518 15.313 19.078H14.169C14.165 17.338 13.473 15.67 12.241 14.438C11.009 13.206 9.34101 12.514 7.60101 12.51V11.938V11.366C9.16901 11.366 10.673 10.802 11.857 9.79398C10.393 8.54599 8.82501 7.60998 7.34101 7.11798C6.71701 6.89798 6.06501 6.77398 5.40501 6.74599C5.26101 7.38999 5.21301 8.04998 5.26501 8.70599C5.38501 10.666 6.13701 12.938 7.38501 15.102C8.63301 17.262 10.229 19.05 11.865 20.134Z"
													fill="currentColor"
												></path></svg
											>MOONPAY
											<a
												href="https://support.moonpay.com/"
												target="_blank"
												class="polo-link polo-link-default"
												>{$_('learn-more-3')}</a>
										</dd>
										
									</dl>
									<dl>
										<dt>{$_('g-price')}</dt>
										<dd>
											<strong
												>1 {buyQuote.cryptoCurrency.toUpperCase()} ≈ {buyQuote.price.toFixed(4)}
												{buyQuote.fiatCurrency.toUpperCase()}</strong
											>
										</dd>
									</dl>
									<dl>
										<Tooltip.Root>
											<Tooltip.Trigger>
												<dt><span class="tooltip">{$_('total-fee-included')}</span></dt>
											</Tooltip.Trigger>
											<Tooltip.Content>
												<p>
													Fee: {(
														((parseFloat(inputAmount || '0') - buyQuote.fiatAmount) /
															parseFloat(inputAmount || '0')) *
														100
													).toFixed(2)}%
												</p>
											</Tooltip.Content>
										</Tooltip.Root>

										<dd>{inputAmount} {buyQuote.fiatCurrency.toUpperCase()}</dd>
									</dl>
									<dl class="test-mode">
											<strong>{$_('test-mode')}</strong>{$_('eth-test-mode')}</dl>
								</div>
							</div>
						</div>
					{:else}
						<div class="empty">
							<svg
								style="margin: 0 auto"
								width="80"
								height="80"
								viewBox="0 0 80 80"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
								><path
									fill-rule="evenodd"
									clip-rule="evenodd"
									d="M12.7272 18.1819C11.7231 18.1819 10.9091 18.9959 10.9091 20.0001V43.6364H36.3636V36.3636H33.6364C33.1343 36.3636 32.7273 35.9566 32.7273 35.4545V26.3636C32.7273 25.8616 33.1343 25.4545 33.6364 25.4545H36.3636V18.1819H12.7272Z"
									fill="#878787"
								></path><path
									fill-rule="evenodd"
									clip-rule="evenodd"
									d="M53.6364 47.2725C54.1384 47.2725 54.5455 46.8655 54.5455 46.3634V43.6362H61.8182V67.2726C61.8182 68.2767 61.0042 69.0908 60 69.0908H36.3636V43.6362H43.6364V46.3634C43.6364 46.8655 44.0434 47.2725 44.5455 47.2725L53.6364 47.2725Z"
									fill="#878787"
								></path><path
									fill-rule="evenodd"
									clip-rule="evenodd"
									d="M50.616 39.7518C50.261 40.1069 49.6854 40.1069 49.3303 39.7518L42.9021 33.3236C42.5471 32.9686 42.5471 32.393 42.9021 32.0379L44.6816 30.2585L39.2805 24.8574L44.5721 19.5658L42.9021 17.8958C42.5471 17.5408 42.5471 16.9652 42.9021 16.6102L49.3304 10.182C49.6854 9.82693 50.261 9.82693 50.616 10.182L52.286 11.8519L57.2796 6.85833L73.9931 23.5718C74.7031 24.2818 74.7031 25.433 73.9931 26.1431L57.2796 42.8565L52.3955 37.9723L50.616 39.7518Z"
									fill="#B8B8B8"
								></path><path
									d="M55.4602 27.3997L54.496 26.4354C54.141 26.0804 53.5654 26.0804 53.2104 26.4354L52.2461 27.3997C51.8911 27.7547 51.8911 28.3303 52.2461 28.6853L53.2104 29.6496C53.5654 30.0046 54.141 30.0046 54.496 29.6496L55.4602 28.6853C55.8153 28.3303 55.8153 27.7547 55.4602 27.3997Z"
									fill="#616161"
								></path><path
									d="M62.2099 20.65L61.2457 19.6858C60.8906 19.3308 60.315 19.3308 59.96 19.6858L55.621 24.0249C55.2659 24.3799 55.2659 24.9555 55.621 25.3105L56.5852 26.2747C56.9402 26.6298 57.5158 26.6298 57.8708 26.2747L62.2099 21.9357C62.5649 21.5807 62.5649 21.0051 62.2099 20.65Z"
									fill="#616161"
								></path><path
									fill-rule="evenodd"
									clip-rule="evenodd"
									d="M18.1818 40.9091C18.1818 40.407 18.5888 40 19.0909 40H28.1818C28.6839 40 29.0909 40.407 29.0909 40.9091V43.6364H36.3636V50.9091H39.0909C39.593 50.9091 40 51.3161 40 51.8182V60.9091C40 61.4112 39.593 61.8182 39.0909 61.8182H36.3636V69.0909H12.7272C11.7231 69.0909 10.9091 68.2769 10.9091 67.2727V43.6364H18.1818V40.9091Z"
									fill="#616161"
								></path><rect
									x="15.4545"
									y="50.9092"
									width="16.3636"
									height="2.72727"
									rx="0.454545"
									fill="#878787"
								></rect><rect
									x="15.4545"
									y="59.0908"
									width="16.3636"
									height="2.72727"
									rx="0.454545"
									fill="#878787"
								></rect></svg
							>
							<p class="marginTop8">{$_('please-enter-an-amount-first')}</p>
						</div>
					{/if}

					<div class="agreenWraper marginTop40">
						<p>{$_('disclaimer')}</p>
						<div class="small">
							<p>{$_('leaving-ezcryptox-full')}<a
									href="https://www.moonpay.com/legal/terms_of_use_usa"
									target="_blank"
									>{$_('terms-of-use')}</a>{$_('before-proceeding')}</p>
							<p>{$_('card-margin-questions')}<a href="https://support.moonpay.com/" target="_blank"
									>{$_('moonpay-customer-support')}</a
								>
							</p>
						</div>
					</div>
				</div>
				<div class="mobileFixed">
					<div class="agreenWraper">
						<p class="marginTop32 flex-start">
							<Checkbox id="terms" bind:checked={termsChecked} disabled={initializingOnrampFlow} />
							<Label
								for="terms"
								class="ml-1 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
							>{$_('agree-to-terms')}</Label>
						</p>
					</div>
					<dl class="topborder marginTop16">
						<dt>
							<p>{$_('you-will-get')}<strong>{buyQuote?.cryptoAmount || '--'} {selectedCrypto.code}</strong>
							</p>
						</dt>
						<dd>
							<button
								on:click={() => buyCrypto('moonPay')}
								disabled={initializingOnrampFlow || !termsChecked || !inputAmount}
								type="button"
								class="polo-btn polo-btn-button polo-btn-primary polo-btn-huge {initializingOnrampFlow ||
								!termsChecked ||
								!inputAmount
									? 'is-disabled'
									: ''}"
								style="width: 145px;"
								><!---->
								<div aria-disabled={initializingOnrampFlow} class="btn-sp">
									{initializingOnrampFlow ? '. . .' : $_('g-submit')}
								</div></button
							>
						</dd>
					</dl>
				</div>
				<!---->
			</dd>
		</dl>
	</div>
</div>
<Footer />
