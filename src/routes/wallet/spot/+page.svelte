<script lang="ts">
	import { _ } from 'svelte-i18n';
	import '../../../styles/wallet/spot.css';
	import { handleAuthToken, seaser } from '$lib/store/routes';
	import { isLogin } from '$lib/store/profile';
	import { screen } from '$lib/store/screen';
	import { ServerURl } from '$lib/backendUrl';
	import axios from 'axios';

	$: masked = false;

	let assetBalances: { [k: string]: { balance: number } } | null = null;
	$: walletBalance = {
		btcUsdRate: 60_000,
		estimated: 0,
		spot: 0,
		futures: 0,
		earnings: 0,
		assets: []
	};
	async function loadBalances() {
		try {
			// @ts-ignore
			const { balances,  btcUsdRate} = (
				await axios.get(`${ServerURl()}/api/assets/wallet-balance`, {
					headers: {
						'Content-type': 'application/json',
						Authorization: `Bearer ${$handleAuthToken}`
					}
				})
			).data;
			walletBalance = {
				btcUsdRate: btcUsdRate,
				estimated: Object.keys(balances).reduce(
					(prev, current) => prev + (balances[current].btc * balances[current].balance),
					0
				),
				spot: Object.keys(balances).reduce(
					(prev, current) => prev + (balances[current].btc * balances[current].balance),
					0
				),
				futures: 0,
				earnings: 0,
				assets: Object.keys(balances).map((k) => balances[k])
			};
			assetBalances={};
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

	const handleToggleMask = () => {
		masked = !masked;
	};

	$: getDisplayValue = (key: string, usd: string) => {
		if (masked) return '********';
		if (usd)
			return (
				'≈$' + (assetBalances ? (walletBalance.btcUsdRate * walletBalance[key]).toFixed(2) : '--')
			);
		return (assetBalances ? walletBalance[key].toFixed(8) : '--') + ' BTC';
	};
</script>

<div class="wc-wallet f25e176f">
	<div class="d27ea19a{$screen <= 1020 ? ' _695962ac' : ''}">
		<div class="_352af221">
			<div class="dfafa451">
				<div class="_8979253c">
					<span class="_6e618a34">Estimated Balance</span>
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<!-- svelte-ignore a11y-no-static-element-interactions -->
					<span on:click={handleToggleMask} class="f6d83fd9">
						{#if masked}
							<svg
								width="18"
								height="18"
								viewBox="0 0 18 18"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
								><path
									d="M9 14.1428C12.321 14.1428 15.2833 12.096 16.6166 8.99998C15.2833 5.90398 12.321 3.85713 9 3.85713C5.679 3.85713 2.71671 5.90398 1.38343 8.99998C2.71671 12.096 5.679 14.1428 9 14.1428ZM9 2.57141C13.1079 2.57141 16.6153 5.24055 18 8.99998C16.6153 12.7594 13.1079 15.4286 9 15.4286C4.89214 15.4286 1.38471 12.7594 0 8.99998C1.38471 5.24055 4.89214 2.57141 9 2.57141ZM9 11.5714C8.31802 11.5714 7.66396 11.3005 7.18173 10.8183C6.69949 10.336 6.42857 9.68197 6.42857 8.99998C6.42857 8.318 6.69949 7.66394 7.18173 7.18171C7.66396 6.69947 8.31802 6.42855 9 6.42855C9.68198 6.42855 10.336 6.69947 10.8183 7.18171C11.3005 7.66394 11.5714 8.318 11.5714 8.99998C11.5714 9.68197 11.3005 10.336 10.8183 10.8183C10.336 11.3005 9.68198 11.5714 9 11.5714ZM9 12.8571C9.50653 12.8571 10.0081 12.7574 10.4761 12.5635C10.944 12.3697 11.3692 12.0856 11.7274 11.7274C12.0856 11.3692 12.3697 10.944 12.5635 10.476C12.7574 10.0081 12.8571 9.50651 12.8571 8.99998C12.8571 8.49345 12.7574 7.99189 12.5635 7.52392C12.3697 7.05595 12.0856 6.63074 11.7274 6.27257C11.3692 5.9144 10.944 5.63029 10.4761 5.43645C10.0081 5.24261 9.50653 5.14284 9 5.14284C7.97702 5.14284 6.99594 5.54922 6.27259 6.27257C5.54923 6.99592 5.14286 7.977 5.14286 8.99998C5.14286 10.023 5.54923 11.004 6.27259 11.7274C6.99594 12.4507 7.97702 12.8571 9 12.8571Z"
									fill="#616161"
								></path><line x1="13.3401" y1="1.58703" x2="4.94014" y2="17.187" stroke="#616161"
								></line></svg
							>
						{:else}
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
								></path>
							</svg>
						{/if}
					</span>
				</div>
				<div class="_802fc171{$screen <= 770 ? ' a5c07b49' : ''}">
					<div class="fed61cf8">{getDisplayValue('estimated')}</div>
					<div class="_731ec4d9">{getDisplayValue('estimated', true)}</div>
					<div class="_08daca67">
						<a href="/wallet/deposit" class="_8ae4d264 fb100468"> Deposit </a><a
							href="/wallet/withdraw"
							class="_8ae4d264 fb100468"
						>
							Withdraw
						</a><span class="_8ae4d264"> Transfer </span><a href="/reward-center" class="_7999440f"
							><svg
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
								></rect>
								<path
									d="M1.89453 6.63672H12.1029V11.0398C12.1029 12.031 11.2993 12.8346 10.308 12.8346H3.6894C2.69812 12.8346 1.89453 12.031 1.89453 11.0398V6.63672Z"
									fill="url(#paint0_linear_2354_24205)"
								></path>
								<path
									d="M8.94401 1.16797C8.6065 2.02639 7.83569 2.6263 6.9388 2.6263C6.04191 2.6263 5.2711 2.02639 4.93359 1.16797"
									stroke="#FF756C"
									stroke-width="1.34615"
									stroke-linecap="round"
								></path>
								<path
									d="M6.3291 8.84375C6.3291 8.42954 6.66489 8.09375 7.0791 8.09375C7.49332 8.09375 7.8291 8.42954 7.8291 8.84375V10.2604C7.8291 10.6746 7.49332 11.0104 7.0791 11.0104C6.66489 11.0104 6.3291 10.6746 6.3291 10.2604V8.84375Z"
									fill="white"
								></path>
								<defs>
									<linearGradient
										id="paint0_linear_2354_24205"
										x1="11.9206"
										y1="12.8346"
										x2="1.89453"
										y2="12.8346"
										gradientUnits="userSpaceOnUse"
									>
										<stop stop-color="#FF212C"></stop>
										<stop offset="1" stop-color="#FF7163"></stop>
									</linearGradient>
								</defs>
							</svg>My Coupons (0)&gt;</a
						>
					</div>
				</div>
				<div class="_3b04c316{$screen <= 765 ? ' a5c07b49' : ''}">
					<div class="_8b305fc7">
						<div class="_66590ade">
							<div class="_92aab3aa">Spot Account</div>
						</div>
						<div class="_3fdd424e">
							<div class="a3e2e302">{getDisplayValue('spot')}</div>
							<div class="_010696f9">{getDisplayValue('spot', true)}</div>
						</div>
					</div>
					<div class="_8b305fc7">
						<div class="_66590ade">
							<div class="_92aab3aa">Futures Account</div>
							<div class="_3fdd424e">
								<div class="a3e2e302">{getDisplayValue('futures')}</div>
								<div class="_010696f9">{getDisplayValue('futures', true)}</div>
							</div>
							<div class="_53ae92b4">Available Coupons: <span class=""> 0.00 USDT </span></div>
						</div>
					</div>
					<div class="_8b305fc7">
						<div class="_66590ade">
							<div class="_92aab3aa">
								Earn Account <a href="#" class="e3b4302b"
									><span class="_6e618a34">Earn History</span></a
								>
							</div>
							<div class="_3fdd424e">
								<div class="a3e2e302">{getDisplayValue('earnings')}</div>
								<div class="_010696f9">{getDisplayValue('earnings', true)}</div>
							</div>
							<div class="_53ae92b4">
								Last Day Returns : <span class=""> 0 USDT </span><svg
									width="12"
									height="12"
									viewBox="0 0 12 12"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
									class=""
								>
									<g clip-path="url(#clip0_754_1097)">
										<path
											d="M6 11C3.2385 11 1 8.7615 1 6C1 3.2385 3.2385 1 6 1C8.7615 1 11 3.2385 11 6C11 8.7615 8.7615 11 6 11ZM6 10C7.06087 10 8.07828 9.57857 8.82843 8.82843C9.57857 8.07828 10 7.06087 10 6C10 4.93913 9.57857 3.92172 8.82843 3.17157C8.07828 2.42143 7.06087 2 6 2C4.93913 2 3.92172 2.42143 3.17157 3.17157C2.42143 3.92172 2 4.93913 2 6C2 7.06087 2.42143 8.07828 3.17157 8.82843C3.92172 9.57857 4.93913 10 6 10ZM5.5 3.5H6.5V4.5H5.5V3.5ZM5.5 5.5H6.5V8.5H5.5V5.5Z"
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
					<!-- <div class="_8b305fc7">
						<div class="_66590ade">
							<div class="_92aab3aa">Copy Trade Account</div>
							<div class="_3fdd424e">
								<div class="a3e2e302">0.00000000 BTC</div>
								<div class="_010696f9">≈$0.00</div>
							</div>
						</div>
					</div>
					<div class="_8b305fc7">
						<div class="_66590ade">
							<div class="_92aab3aa">Strategy Account</div>
							<div class="_3fdd424e">
								<div class="a3e2e302">0.00000000 BTC</div>
								<div class="_010696f9">≈$0.00</div>
							</div>
							<div class="_53ae92b4">Cumulative: <span class=""> 0.00 USDT </span></div>
						</div>
					</div> -->
					<!-- <div class="_8b305fc7" style="background: none !important;"></div> -->
				</div>
				<!---->
			</div>
			{#if $screen >= 766}
				<div class="_0fafb26d">
					<nav class="c4856b09">
						<a
							href="/wallet/spot"
							aria-current="page"
							class="router-link-exact-active _34945ed8 _833dd21c"
							><span class="_8f87c557">Spot</span></a
						><a href="/wallet/futures" class="_833dd21c"><span class="_8f87c557">Futures</span></a
						><a href="/wallet/earn" class="_833dd21c"><span class="_8f87c557">Earn</span></a><a
							href="/wallet/copytrading"
							class="_833dd21c"><span class="_8f87c557"> Copy Trade Account </span></a
						><a href="/wallet/strategy" class="_833dd21c"><span class="_8f87c557">Strategy</span></a
						>
					</nav>
					<div class="d468c593">
						<div class="c9f34430">
							<div class="_4a9a9384">
								<span class="polo-switch polo-switch-middle"
									><span class="polo-switch-box"><input type="checkbox" true-value="true" /></span
									><!----></span
								><span class="g-tips-text _4b499324"> Margin Wallet Mode </span><!---->
							</div>
							<div class="d7adc68b">
								<span class="_7c90adca"><input type="checkbox" class="f9fc5c52" /></span><span
									class="_8f87c557">Hide not held assets</span
								>
							</div>
							<!-- <div class="_4a9a9384">
							<span class="polo-switch polo-switch-middle is-checked"
								><span class="polo-switch-box"><input type="checkbox" true-value="true" /></span
								></span
							>
							<p>
								Auto-Earn <span
									><svg
										width="16"
										height="16"
										viewBox="0 0 16 16"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path d="M8.75 10V11.5H7.25V10H8.75Z" fill="currentColor"></path>
										<path
											d="M7.14844 7.01562C7.14844 6.77234 7.23276 6.50467 7.38389 6.31298C7.51949 6.14099 7.70964 6.02344 8 6.02344C8.69124 6.02344 8.94343 6.43841 8.92305 6.80176C8.91449 6.95448 8.85771 7.05503 8.70346 7.19429C8.62694 7.26338 8.54616 7.32441 8.43877 7.40555L8.37812 7.45144C8.25647 7.54373 8.08798 7.67329 7.94359 7.83303C7.60081 8.21228 7.42832 8.61378 7.34164 8.92048C7.29824 9.07407 7.27552 9.2066 7.26356 9.30551C7.25756 9.35513 7.25421 9.39683 7.25233 9.42911C7.25139 9.44528 7.25082 9.45914 7.25048 9.47052L7.25013 9.48574L7.25004 9.49193L7.25002 9.49466L7.25001 9.49593C7.25001 9.49623 7.25001 9.49715 8 9.5C8.74999 9.50285 8.74999 9.50315 8.74999 9.50344L8.74998 9.50512L8.74996 9.50718L8.74992 9.51071L8.74981 9.51543C8.75001 9.51202 8.75072 9.50207 8.75272 9.48558C8.75675 9.45226 8.76572 9.39702 8.78511 9.32841C8.82402 9.19073 8.90152 9.0102 9.05641 8.83884C9.09562 8.79546 9.15954 8.74143 9.28472 8.64646L9.33311 8.60994C9.43852 8.53054 9.5788 8.42489 9.70865 8.30766C10.0368 8.01138 10.3824 7.56895 10.4207 6.88574C10.4941 5.57721 9.46501 4.52344 8 4.52344C7.21223 4.52344 6.60161 4.88245 6.20595 5.38429C5.82584 5.86642 5.64844 6.46984 5.64844 7.01562H7.14844Z"
											fill="currentColor"
										></path>
										<path
											fill-rule="evenodd"
											clip-rule="evenodd"
											d="M8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15ZM8 13.5C11.0376 13.5 13.5 11.0376 13.5 8C13.5 4.96243 11.0376 2.5 8 2.5C4.96243 2.5 2.5 4.96243 2.5 8C2.5 11.0376 4.96243 13.5 8 13.5Z"
											fill="currentColor"
										></path>
									</svg></span
								>
							</p>
						</div> -->
							<!-- <span class="cafcfd6f"
							><a href="/convert/small" class="_4f6d8f6a">Convert Low-Value Balance to TRX</a></span
						> -->
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
								></path>
							</svg><input type="text" placeholder="Search" class="_2d963734" /><!---->
						</div>
					</div>
					<!---->
				</div>
				<div class="_753fc960">
					<!---->
					<div class="d52631a5">
						<span class="_6c80e451">Coin</span><span
							><span class="g-tips-text"> Available </span></span
						><!----><!----><span><span class="g-tips-text"> In Use </span></span><span
							class="_6a482ffd"><span class="g-tips-text"> Balance </span></span
						><span class="_6645d580"> Action </span>
					</div>
					<div class="_743cc7da">
						{#each walletBalance.assets as asset }
							<div class="_214a5636">
							<div class="c11ea69f">
								<span
									class="_508bc8c4"
									style="display: inline-block; border-radius: 100%; width: 28px; height: 28px; background-size: 28px 28px; background-position: center center; background-repeat: no-repeat; background-color: rgb(28, 28, 225); background-image: url(&quot;{asset.icon}&quot;);"
								></span>
								<div class="_08f39f66">
									<div class="_4eeef9eb">
										{asset.symbol} <span class="c1609ed9"><!----><!----></span>
									</div>
									<div class="_2f2633e0">{asset.name}</div>
								</div>
							</div>
							<div><span class="_3bf1f82c">{masked ? '********' : asset.balance.toFixed(8)} </span></div>
							<!----><!---->
							<div><span class="_3bf1f82c"> {masked ? '********' : 0.00 } </span></div>
							<div class="_2762e6ea"><span class="_3bf1f82c">{masked ? '********' : asset.balance.toFixed(8)} </span><!----></div>
							<div class="dd466019">
								<span class="ebff5032 _5a4e75d5 _2c143edc">
									Trade <ul class="e643ae4b"></ul>
								</span><!----><!----><a href="/wallet/deposit?asset={asset.symbol}" class="ebff5032"> Deposit </a><a
									href="/wallet/withdraw?asset={asset.symbol}"
									class="ebff5032"
								>
									Withdraw
								</a><!---->
							</div>
							<!----><!---->
						</div>
						{/each}
						{#if assetBalances && !walletBalance.assets.length}
							<div class="fe0d85d4">
								<div class="empty-wrapper">
									<svg
										width="80"
										height="80"
										viewBox="0 0 80 80"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
										class="empty-img"
										><path
											fill-rule="evenodd"
											clip-rule="evenodd"
											d="M12.7272 18.1816C11.7231 18.1816 10.9091 18.9957 10.9091 19.9998V43.6362H36.3636V36.3634H33.6364C33.1343 36.3634 32.7273 35.9564 32.7273 35.4543V26.3634C32.7273 25.8613 33.1343 25.4543 33.6364 25.4543H36.3636V18.1816H12.7272Z"
											fill="#E3E3E3"
										></path><path
											fill-rule="evenodd"
											clip-rule="evenodd"
											d="M61.8182 43.6357H36.3636V69.0903H60C61.0042 69.0903 61.8182 68.2763 61.8182 67.2721V43.6357ZM53.6364 47.2725C54.1385 47.2725 54.5455 46.8654 54.5455 46.3634V43.6361L43.6364 43.6361V46.3634C43.6364 46.8654 44.0434 47.2725 44.5455 47.2725L53.6364 47.2725Z"
											fill="#E3E3E3"
										></path><path
											fill-rule="evenodd"
											clip-rule="evenodd"
											d="M18.1818 40.9091C18.1818 40.407 18.5888 40 19.0908 40H28.1818C28.6838 40 29.0908 40.407 29.0908 40.9091V43.6364H18.1818V40.9091ZM10.9091 43.6367H36.3636V50.9091H39.0908C39.5929 50.9091 39.9999 51.3161 39.9999 51.8182V60.9091C39.9999 61.4112 39.5929 61.8182 39.0908 61.8182H36.3636V69.0913H12.7272C11.7231 69.0913 10.9091 68.2772 10.9091 67.2731V43.6367Z"
											fill="#F2F2F2"
										></path><path
											fill-rule="evenodd"
											clip-rule="evenodd"
											d="M49.3305 39.7517C49.6855 40.1067 50.2611 40.1067 50.6161 39.7517L52.3961 37.9717L57.2798 42.8554L73.9932 26.142C74.7032 25.432 74.7032 24.2808 73.9932 23.5707L57.2798 6.85727L52.2857 11.8514L50.6161 10.1818C50.2611 9.82681 49.6855 9.82681 49.3305 10.1818L42.9023 16.6101C42.5472 16.9651 42.5472 17.5407 42.9023 17.8957L44.5718 19.5652L39.2807 24.8564L44.6822 30.2578L42.9022 32.0378C42.5472 32.3928 42.5472 32.9684 42.9022 33.3234L49.3305 39.7517ZM61.2458 19.6858L62.21 20.65C62.565 21.005 62.565 21.5806 62.21 21.9356L57.8709 26.2747C57.5159 26.6297 56.9403 26.6297 56.5853 26.2747L55.621 25.3105C55.266 24.9555 55.266 24.3798 55.621 24.0248L59.9601 19.6858C60.3151 19.3307 60.8907 19.3307 61.2458 19.6858ZM54.4961 26.4354L55.4603 27.3997C55.8154 27.7547 55.8154 28.3303 55.4603 28.6853L54.4961 29.6495C54.1411 30.0046 53.5655 30.0046 53.2105 29.6495L52.2462 28.6853C51.8912 28.3303 51.8912 27.7547 52.2462 27.3997L53.2105 26.4354C53.5655 26.0804 54.1411 26.0804 54.4961 26.4354Z"
											fill="#B8B8B8"
										></path><rect
											x="15.4546"
											y="50.9082"
											width="16.3636"
											height="2.72727"
											rx="0.454545"
											fill="#E3E3E3"
										></rect><rect
											x="15.4546"
											y="59.0898"
											width="16.3636"
											height="2.72727"
											rx="0.454545"
											fill="#E3E3E3"
										></rect></svg
									>
									<p class="empty-text">No Data</p>
								</div>
							</div>
						{/if}
					</div>
				</div>
			{:else}
				<div class="_0fafb26d">
					<nav class="c4856b09 _668a0e48">
						<a
							href="/wallet/spot"
							class="router-link-exact-active _34945ed8 _833dd21c"
							aria-current="page"><span class="_8f87c557">Spot</span></a
						><a href="/wallet/futures" class="_833dd21c"><span class="_8f87c557">Futures</span></a
						><a href="/wallet/earn" class="_833dd21c"><span class="_8f87c557">Earn</span></a>
						<!-- <a
							href="/wallet/copytrading"
							class="_833dd21c"><span class="_8f87c557"> Copy Trade Account </span></a
						><a href="/wallet/strategy" class="_833dd21c"><span class="_8f87c557">Strategy</span></a
						> -->
					</nav>
					<div class="d468c593" style="">
						<div class="c9f34430">
							<!---->
							<!-- <div class="d7adc68b">
								<span class="_7c90adca"><input type="checkbox" class="f9fc5c52" /></span><span
									class="_8f87c557">Hide not held assets</span
								>
							</div> -->
							<!-- <span class="cafcfd6f"
								><a href="/convert/small" class="_4f6d8f6a">Convert Low-Value Balance to TRX</a
								></span
							> -->
						</div>
						<!---->
					</div>
					<div class="ab4fa3f2">
						<div class="_4a9a9384 afdfbc31">
							<span class="polo-switch polo-switch-middle"
								><span class="polo-switch-box"><input type="checkbox" true-value="true" /></span
								><span class="polo-switch-text">Margin Wallet Mode</span></span
							><!---->
						</div>
						<div class="_9c5bacd2">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="14"
								height="14"
								viewBox="0 0 14 14"
								fill="none"
								class="b2223728"
								><path
									fill-rule="evenodd"
									clip-rule="evenodd"
									d="M13.7803 12.7197L9.0261 7.96544C9.63821 7.13578 10 6.11014 10 5C10 2.23858 7.76142 0 5 0C2.23858 0 0 2.23858 0 5C0 7.76142 2.23858 10 5 10C6.11014 10 7.13578 9.63821 7.96544 9.0261L12.7197 13.7803C13.0126 14.0732 13.4874 14.0732 13.7803 13.7803C14.0732 13.4874 14.0732 13.0126 13.7803 12.7197ZM8.5 5C8.5 6.933 6.933 8.5 5 8.5C3.067 8.5 1.5 6.933 1.5 5C1.5 3.067 3.067 1.5 5 1.5C6.933 1.5 8.5 3.067 8.5 5Z"
									fill="#AFAFB0"
								></path></svg
							><input type="text" placeholder="Search" class="_2d963734" />
						</div>
					</div>
				</div>
				<div class="_753fc960">
					<div class="d52631a5">
						<span class="_6c80e451">Coin</span><span class="_6a482ffd"
							><span class="g-tips-text"> Balance </span></span
						><span class="_6645d580 fd94ebff"> </span>
					</div>
					<div class="_743cc7da">
						{#each walletBalance.assets as asset}
							<div class="_214a5636" style="/* display: none; */">
								<div class="c11ea69f">
									<span
										class="_508bc8c4"
										style="display: inline-block; border-radius: 100%; width: 28px; height: 28px; background-size: 28px 28px; background-position: center center; background-repeat: no-repeat; background-color: rgb(28, 28, 225); background-image: url(&quot;{asset.icon}&quot;);"
									></span>
									<div class="_08f39f66">
										<div class="_4eeef9eb">{asset.symbol}<span class="c1609ed9"></span></div>
										<div class="_2f2633e0">{asset.name}</div>
									</div>
								</div>
								<div class="_2762e6ea">
									<span class="_3bf1f82c"> {masked ? '********' : asset.balance.toFixed(8)} </span>
								</div>
								<div class="dd466019 _5d7823ef">
									<div class="_8be16352">
										<span class="_2ed8f121"></span><span class="_2ed8f121"></span><span
											class="_2ed8f121"
										></span>
										<ul class="e643ae4b">
											<li class="b234d075">Trade</li>
											<li class="b234d075">Deposit</li>
											<li class="b234d075">Withdraw</li>
										</ul>
									</div>
								</div>
							</div>
						{/each}
					</div>
				</div>
			{/if}
		</div>
	</div>
</div>
