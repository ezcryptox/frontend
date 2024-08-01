<script>
	import { _ } from 'svelte-i18n';
	import Spot from '$lib/wallet/spot.svelte';
	import '../../styles/wallet.css';
	import '../../styles/withdraw.css';
	import { handleAuthToken, seaser } from '$lib/store/routes';
	import Futures from '$lib/wallet/futures.svelte';
	import Earn from '$lib/wallet/earn.svelte';
	import Transfer from './transfer.svelte';
	import { onMount } from 'svelte';
	import { isLogin } from '$lib/store/profile';
	import { ServerURl } from '$lib/backendUrl';
	import axios from 'axios';

	// @ts-ignore
	$: balances = [];
	async function loadBalances() {
		try {
			// @ts-ignore
			const { balances: data } = (
				await axios.get(`${ServerURl()}/api/assets/wallet-balance`, {
					headers: {
						'Content-type': 'application/json',
						Authorization: `Bearer ${$handleAuthToken}`
					}
				})
			).data;
			balances = data;
		} catch (error) {
			// @ts-ignore
			console.log('Balances failed => ', error?.message);
		}
	}
	isLogin.subscribe((login) => {
		if (login) {
			loadBalances();
		}
	});
</script>
{#if $seaser[0] === 'transfer'}
	<Transfer />
{/if}

<div class="wc-wallet f25e176f">
	<div class="d27ea19a">
		<!---->
		<div class="_352af221">
			<div class="dfafa451">
				<div class="_8979253c">
					<span class="_6e618a34">{$_('estimated-balance')}</span>
					<span class="f6d83fd9">
						<svg
							width="18"
							height="14"
							viewBox="0 0 18 14"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M9 12.1427C12.321 12.1427 15.2833 10.0959 16.6166 6.99986C15.2833 3.90386 12.321 1.857 9 1.857C5.679 1.857 2.71671 3.90386 1.38343 6.99986C2.71671 10.0959 5.679 12.1427 9 12.1427ZM9 0.571289C13.1079 0.571289 16.6153 3.24043 18 6.99986C16.6153 10.7593 13.1079 13.4284 9 13.4284C4.89214 13.4284 1.38471 10.7593 0 6.99986C1.38471 3.24043 4.89214 0.571289 9 0.571289ZM9 9.57129C8.31802 9.57129 7.66396 9.30037 7.18173 8.81813C6.69949 8.3359 6.42857 7.68185 6.42857 6.99986C6.42857 6.31787 6.69949 5.66382 7.18173 5.18159C7.66396 4.69935 8.31802 4.42843 9 4.42843C9.68198 4.42843 10.336 4.69935 10.8183 5.18159C11.3005 5.66382 11.5714 6.31787 11.5714 6.99986C11.5714 7.68185 11.3005 8.3359 10.8183 8.81813C10.336 9.30037 9.68198 9.57129 9 9.57129ZM9 10.857C9.50653 10.857 10.0081 10.7572 10.4761 10.5634C10.944 10.3696 11.3692 10.0854 11.7274 9.72727C12.0856 9.3691 12.3697 8.94389 12.5635 8.47592C12.7574 8.00795 12.8571 7.50639 12.8571 6.99986C12.8571 6.49333 12.7574 5.99177 12.5635 5.5238C12.3697 5.05583 12.0856 4.63062 11.7274 4.27245C11.3692 3.91428 10.944 3.63016 10.4761 3.43632C10.0081 3.24249 9.50653 3.14272 9 3.14272C7.97702 3.14272 6.99594 3.54909 6.27259 4.27245C5.54923 4.9958 5.14286 5.97688 5.14286 6.99986C5.14286 8.02284 5.54923 9.00392 6.27259 9.72727C6.99594 10.4506 7.97702 10.857 9 10.857Z"
								fill="#616161"
							>
							</path>
						</svg>
					</span>
				</div>
				<div class="_802fc171">
					<div class="fed61cf8">{$_('btc-amount')}</div>
					<div class="_731ec4d9">≈$0.00</div>
					<div class="_08daca67">
						<a href="/wallet/deposit" class="_8ae4d264 fb100468">{$_('g-deposit')}</a>
						<a href="/wallet/withdraw" class="_8ae4d264 fb100468">{$_('g-withdraw')}</a>
						<a href="/wallet/?tab=transfer" class="_8ae4d264">{$_('g-transfer')}</a>
						<a href="/wallet/?tab=transfer" class="_7999440f">
							<svg
								width="14"
								height="14"
								viewBox="0 0 14 14"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<rect
									x="1.16504"
									y="3.71875"
									width="11.6667"
									height="2.91667"
									rx="0.897436"
									fill="#FFCEBB"
								>
								</rect>
								<path
									d="M1.89453 6.63672H12.1029V11.0398C12.1029 12.031 11.2993 12.8346 10.308 12.8346H3.6894C2.69812 12.8346 1.89453 12.031 1.89453 11.0398V6.63672Z"
									fill="url(#paint0_linear_2354_24205)"
								>
								</path>
								<path
									d="M8.94401 1.16797C8.6065 2.02639 7.83569 2.6263 6.9388 2.6263C6.04191 2.6263 5.2711 2.02639 4.93359 1.16797"
									stroke="#FF756C"
									stroke-width="1.34615"
									stroke-linecap="round"
								>
								</path>
								<path
									d="M6.3291 8.84375C6.3291 8.42954 6.66489 8.09375 7.0791 8.09375C7.49332 8.09375 7.8291 8.42954 7.8291 8.84375V10.2604C7.8291 10.6746 7.49332 11.0104 7.0791 11.0104C6.66489 11.0104 6.3291 10.6746 6.3291 10.2604V8.84375Z"
									fill="white"
								>
								</path>
								<defs>
									<linearGradient
										id="paint0_linear_2354_24205"
										x1="11.9206"
										y1="12.8346"
										x2="1.89453"
										y2="12.8346"
										gradientUnits="userSpaceOnUse"
									>
										<stop stop-color="#FF212C"> </stop>
										<stop offset="1" stop-color="#FF7163"></stop>
									</linearGradient>
								</defs>
							</svg>{$_('my-coupons-count>', {count: 0})}</a
						>
					</div>
				</div>
				<div class="_3b04c316">
					<div class="_8b305fc7">
						<div class="_66590ade">
							<div class="_92aab3aa">{$_('g-account-spot')}</div>
						</div>
						<div class="_3fdd424e">
							<div class="a3e2e302">{$_('btc-amount')}</div>
							<div class="_010696f9">≈$0.00</div>
						</div>
					</div>
					<div class="_8b305fc7">
						<div class="_66590ade">
							<div class="_92aab3aa">{$_('g-account-futures')}</div>
							<div class="_3fdd424e">
								<div class="a3e2e302">{$_('btc-amount')}</div>
								<div class="_010696f9">≈$0.00</div>
							</div>
							<div class="_53ae92b4">{$_('available-coupons')}<span class="">{$_('0-00-usdt')}</span></div>
						</div>
					</div>
					<div class="_8b305fc7">
						<div class="_66590ade">
							<div class="_92aab3aa">{$_('earn-account')}<a href="?javascript" class="e3b4302b"
									><span class="_6e618a34">{$_('earn-history')}</span></a
								>
							</div>
							<div class="_3fdd424e">
								<div class="a3e2e302">{$_('btc-amount')}</div>
								<div class="_010696f9">≈$0.00</div>
							</div>
							<div class="_53ae92b4">{$_('last-day-returns')}<span class=""> 0 USDT </span>
								<svg
									width="12"
									height="12"
									viewBox="0 0 12 12"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
									class=""
								>
									<g clip-path="url(#clip0_754_1097)">
										<path
											d="M6 11C3.2385 11 1 8.7615 1 6C1 3.2385 3.2385 1 6 1C8.7615 1 11 3.2385 11 6C11 8.7615 8.7615 11 6 11ZM6 10C7.06087 10 8.07828 9.57857 8.82843 8.82843C9.57857 8.07828 
                                        10 7.06087 10 6C10 4.93913 9.57857 3.92172 8.82843 3.17157C8.07828 2.42143 7.06087 2 6 2C4.93913 2 3.92172 2.42143 3.17157 3.17157C2.42143 3.92172 2 4.93913 2 6C2 7.06087 2.42143
                                         8.07828 3.17157 8.82843C3.92172 9.57857 4.93913 10 6 10ZM5.5 3.5H6.5V4.5H5.5V3.5ZM5.5 5.5H6.5V8.5H5.5V5.5Z"
											fill="#616161"
										></path>
									</g>
									<defs>
										<clipPath id="clip0_754_1097">
											<rect width="12" height="12" fill="white"></rect>
										</clipPath>
									</defs>
								</svg>
							</div>
						</div>
					</div>
				</div>
				<div class="_3b04c316">
					{#each balances as balance}
						<div class="_8b305fc7">
							<div class="_66590ade">
								<div class="_92aab3aa">{balance.crypto}</div>
							</div>
							<div class="_3fdd424e">
								<div class="a3e2e302">{parseFloat(balance.balance).toFixed(8)} {balance.crypto}</div>
								<div class="_010696f9">≈$-.--</div>
							</div>
						</div>
					{/each}
				</div>
				<!---->
			</div>
			<div class="_0fafb26d">
				<nav class="c4856b09">
					<a
						href="/wallet/?tab=spot"
						class=" {$seaser[0] === 'spot' ? '_34945ed8' : ''}  _833dd21c"
					>
						<span class="_8f87c557">{$_('g-spot')}</span>
					</a>
					<a
						href="/wallet/?tab=futures"
						class="_833dd21c {$seaser[0] === 'futures' ? '_34945ed8' : ''} "
					>
						<span class="_8f87c557">{$_('g-futures')}</span>
					</a>
					<a href="/wallet/?tab=earn" class="_833dd21c {$seaser[0] === 'earn' ? '_34945ed8' : ''}">
						<span class="_8f87c557">{$_('g-earn')}</span>
					</a>
				</nav>

				<div class="d468c593" style={$seaser[0] !== 'spot' ? 'display: none' : ''}>
					<div class="c9f34430">
						<div class="_4a9a9384">
							<span class="polo-switch polo-switch-middle">
								<span class="polo-switch-box">
									<input type="checkbox" true-value="true" />
								</span>
								<!---->
							</span>
							<span class="g-tips-text _4b499324">{$_('margin-wallet-mode')}</span>
							<!---->
						</div>
						<div class="d7adc68b">
							<span class="_7c90adca">
								<input type="checkbox" class="f9fc5c52" />
							</span>
							<span class="_8f87c557">{$_('hide-not-held-assets')}</span>
						</div>
						<div class="_4a9a9384">
							<span class="polo-switch polo-switch-middle">
								<span class="polo-switch-box">
									<input type="checkbox" true-value="true" />
								</span><!---->
							</span>
							<p>{$_('auto-earn')}<span>
									<svg
										width="16"
										height="16"
										viewBox="0 0 16 16"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path d="M8.75 10V11.5H7.25V10H8.75Z" fill="currentColor"> </path>
										<path
											d="M7.14844 7.01562C7.14844 6.77234 7.23276 6.50467 7.38389 6.31298C7.51949 6.14099 7.70964 6.02344 8 6.02344C8.69124 6.02344 8.94343 6.43841 8.92305 6.80176C8.91449 6.95448 8.85771 7.05503 8.70346 7.19429C8.62694 7.26338 8.54616 7.32441 8.43877 7.40555L8.37812 7.45144C8.25647 7.54373 8.08798 7.67329 7.94359 7.83303C7.60081 8.21228 7.42832 8.61378 7.34164 8.92048C7.29824 9.07407 7.27552 9.2066 7.26356 9.30551C7.25756 9.35513 7.25421 9.39683 7.25233 9.42911C7.25139 9.44528 7.25082 9.45914 7.25048 9.47052L7.25013 9.48574L7.25004 9.49193L7.25002 9.49466L7.25001 9.49593C7.25001 9.49623 7.25001 9.49715 8 9.5C8.74999 9.50285 8.74999 9.50315 8.74999 9.50344L8.74998 9.50512L8.74996 9.50718L8.74992 9.51071L8.74981 9.51543C8.75001 9.51202 8.75072 9.50207 8.75272 9.48558C8.75675 9.45226 8.76572 9.39702 8.78511 9.32841C8.82402 9.19073 8.90152 9.0102 9.05641 8.83884C9.09562 8.79546 9.15954 8.74143 9.28472 8.64646L9.33311 8.60994C9.43852 8.53054 9.5788 8.42489 9.70865 8.30766C10.0368 8.01138 10.3824 7.56895 10.4207 6.88574C10.4941 5.57721 9.46501 4.52344 8 4.52344C7.21223 4.52344 6.60161 4.88245 6.20595 5.38429C5.82584 5.86642 5.64844 6.46984 5.64844 7.01562H7.14844Z"
											fill="currentColor"
										>
										</path>
										<path
											fill-rule="evenodd"
											clip-rule="evenodd"
											d="M8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15ZM8 13.5C11.0376 13.5 13.5 11.0376 13.5 8C13.5 4.96243 11.0376 2.5 8 2.5C4.96243 2.5 2.5 4.96243 2.5 8C2.5 11.0376 4.96243 13.5 8 13.5Z"
											fill="currentColor"
										>
										</path>
									</svg>
								</span>
							</p>
						</div>
						<span class="cafcfd6f">
							<a href="/convert/small" class="_4f6d8f6a">{$_('convert-to-trx')}</a>
						</span>
					</div>
					<div class="_9c5bacd2">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="14"
							height="14"
							viewBox="0 0 14 14"
							fill="none"
							class="b2223728"
						>
							<path
								fill-rule="evenodd"
								clip-rule="evenodd"
								d="M13.7803 12.7197L9.0261 7.96544C9.63821 7.13578 10 6.11014 10 5C10 2.23858 7.76142 0 5 0C2.23858 0 0 2.23858 0 5C0 7.76142 2.23858 10 5 10C6.11014 10 7.13578 9.63821 7.96544 9.0261L12.7197 13.7803C13.0126 14.0732 13.4874 14.0732 13.7803 13.7803C14.0732 13.4874 14.0732 13.0126 13.7803 12.7197ZM8.5 5C8.5 6.933 6.933 8.5 5 8.5C3.067 8.5 1.5 6.933 1.5 5C1.5 3.067 3.067 1.5 5 1.5C6.933 1.5 8.5 3.067 8.5 5Z"
								fill="#AFAFB0"
							>
							</path>
						</svg>
						<input type="text" placeholder="Search" class="_2d963734" />
						<!---->
					</div>
				</div>

				<!---->
			</div>
			{#if $seaser[0] === 'spot'}
				<Spot />
			{/if}
			{#if $seaser[0] === 'futures'}
				<Futures />
			{/if}
			{#if $seaser[0] === 'earn'}
				<Earn />
			{/if}
		</div>
	</div>
</div>
