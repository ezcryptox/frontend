<script lang="ts">
	import '../../styles/fee/spot.css';
	import { handleAuthToken } from '$lib/store/routes';
	import { handleUserProfile } from '$lib/index';
	import { isLogin } from '$lib/store/profile';
	import Footer from '$lib/footer.svelte';
	import { onMount } from 'svelte';
	import { vipLevels } from './store';
	import { ServerURl } from '$lib/backendUrl';
	import axios from 'axios';
	import { vipLevels as levels } from '$lib/trade-components/utils';
	let data: {
		email: string;
		level: number;
		spotBalance: number;
		futuresBalance: number;
		totalSpotBalance: number;
		bids: number;
		asks: number;
		fBids: number;
		fAsks: number;
	} | null = null;

	onMount(() => {
		// axios.get(`${ServerURl()}/api/trading/spot-fees`).then(d => d.data).then(levels => {
		// 	vipLevels.set(levels)
		// })
		vipLevels.set(levels)
		const unsub = isLogin.subscribe(async (loggedIn) => {
			if (loggedIn) {
				const response = await handleUserProfile($handleAuthToken);
				if (response?.profile) {
					data = {
						...response?.profile,
						level: parseInt(response?.profile.level?.toString() || '0'),
						spotBalance: response?.profile.spotBalance || 0,
						futuresBalance: response?.profile.futuresBalance || 0,
						totalSpotBalance: response?.profile.totalSpotBalance || 0
					};
				}
			}
		});
		return () => {
			unsub();
		};
	});

</script>

<div id="root" data-v-app="">
	<nav class="efb13d49">
		<li aria-active="false"><a class="" href="/profile?tab=profile">Profile</a></li>
		<li aria-active="false"><a href="/profile?tab=security">Security</a></li>
		<!-- <li aria-active="false"> API Keys</li> -->
		<li aria-active="true"><a href="/fee">Trading Tier Status</a></li>
		<!-- <li aria-active="false">Address Management</li> -->
	</nav>
	<div class="jo4-l f9cb- mt-16">
		<div class="-QzNA">
			{#if $isLogin && data}
				<div class="VsRDU">
					<div class="v1ctF">
						<div class="RAK7u">
							<div class="N3bTC">{data.email}</div>
							<div class="Lj-Ok">Your VIP Level</div>
						</div>
						<div class="z7Z5d">
							<div class="CPm6l">
								<div class="YDpxL">
									<div class="Lj-Ok">Spot</div>
									<span class="PKhVH {$vipLevels[`VIP${data.level}`]?.iconClass}"></span>
								</div>
								<div class="qw9gi">
									<div class="_9JAOs">
										<div class="xzAjk">Maker:</div>
										<div class="fN9uV">
											<span
												>{($vipLevels[`VIP${data.level}`]?.makerTaker.maker * 100).toFixed(4)}</span
											><span style="0px">%</span>
										</div>
									</div>
									<div class="k77gs">
										<div class="xzAjk">Taker:</div>
										<div class="fN9uV">
											<span
												>{($vipLevels[`VIP${data.level}`]?.makerTaker.taker * 100).toFixed(4)}</span
											><span style="0px">%</span>
										</div>
									</div>
								</div>
								<!-- <div class="fknm2">
								<div class="sL7Aa">
									<div class="xzAjk">TRX Deduction <span>30% discount</span></div>
									<div class="el-switch el-switch--small q8qc-">
										<input
											class="el-switch__input"
											type="checkbox"
											role="switch"
											aria-checked="false"
											aria-disabled="false"
											name=""
											true-value="true"
											false-value="false"
											id="el-id-4066-0"
										/><span class="el-switch__core"
											>
											<div class="el-switch__action"></div></span
										>
									</div>
								</div>
								<div class="sL7Aa">
									<div class="xzAjk">HTX Deduction <span>30% discount</span></div>
									<div class="el-switch el-switch--small q8qc-">
										<input
											class="el-switch__input"
											type="checkbox"
											role="switch"
											aria-checked="false"
											aria-disabled="false"
											name=""
											true-value="true"
											false-value="false"
											id="el-id-4066-1"
										/><span class="el-switch__core"
											>
											<div class="el-switch__action"></div></span
										>
									</div>
								</div>
							</div> -->
							</div>
						</div>
						<div class="z7Z5d ErQf4">
							<div class="CPm6l">
								<div class="YDpxL">
									<div class="Lj-Ok">USDT-M Perpetual Futures</div>
									<span class="PKhVH _6WngX"></span>
								</div>
								<div class="qw9gi">
									<div class="_9JAOs">
										<div class="xzAjk">Maker:</div>
										<div class="fN9uV"><span>0.0150</span><span style="0px">%</span></div>
									</div>
									<div class="k77gs">
										<div class="xzAjk">Taker:</div>
										<div class="fN9uV"><span>0.0500</span><span style="0px">%</span></div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			{/if}
			<div class="BNTrl" style="--5406e91f: 48px 0;">
				<div class="J-vm8">
					{#if $isLogin && data}
						<div class="XF2b-">
							<div class="adAs2">How to Improve Your VIP Level?</div>
							<div class="rqYXF">
								<a
									class="u8x1b"
									target="_blank"
									rel="noopener noreferrer nofollow"
									href="/trade/BTC_USDT/?type=spot"
									><div class="vkiAF">30-Day Spot Trading Volume</div>
									<div class="_8LnFp">
										<div class="y-DsX">${(data.spotBalance || 0).toFixed(2)}</div>
										<div class="kFWGE">
											${$vipLevels[`VIP${(data.level || 0) + 1}`]?.spotTradingVolume.toLocaleString()}
										</div>
									</div>
									<div class="E0jeS"><div class="OYJvZ" style="width: 0%;"></div></div>
									<div class="C6gz3">
										<span class="CHbTQ">Trade <span class="XGs-p">&gt;</span></span>
									</div></a
								><a
									class="u8x1b"
									target="_blank"
									rel="noopener noreferrer nofollow"
									href="/futures/trade"
									><div class="vkiAF">30-Day Futures Trading Volume</div>
									<div class="_8LnFp">
										<div class="y-DsX">${(data.futuresBalance || 0).toFixed(2)}</div>
										<div class="kFWGE">
											${$vipLevels[
												`VIP${(data.level || 0) + 1}`
											]?.futuresTradingVolume.toLocaleString()}
										</div>
									</div>
									<div class="E0jeS"><div class="OYJvZ" style="width: 0%;"></div></div>
									<div class="C6gz3">
										<span class="CHbTQ">Trade <span class="XGs-p">&gt;</span></span>
									</div></a
								><a
									class="u8x1b"
									target="_blank"
									rel="noopener noreferrer nofollow"
									href="/wallet/deposit/USDT"
									><div class="vkiAF">Total Balance</div>
									<div class="_8LnFp">
										<div class="y-DsX">${(data.totalSpotBalance || 0).toFixed(2)}</div>
										<div class="kFWGE">
											${$vipLevels[`VIP${(data.level || 0) + 1}`].totalBalance.toLocaleString()}
										</div>
									</div>
									<div class="E0jeS"><div class="OYJvZ" style="width: 0%;"></div></div>
									<div class="C6gz3">
										<span class="CHbTQ">Deposit <span class="XGs-p">&gt;</span></span>
									</div></a
								>
								<!-- <div class="X39Uc">
									<div class="_7Vnc-">TRX + HTX Balance</div>
									<div class="-Xu7m">
										<div class="mgMuc">$0.00</div>
										<div class="_-3laK">$1,000</div>
									</div>
									<div class="lfxR-"><div class="_4PlBP" style="width: 0%;"></div></div>
									<div class="DSgrO">
										<a
											class="DeI6P"
											target="_blank"
											rel="noopener noreferrer nofollow"
											href="/trade/HTX_USDT/?type=spot">Buy HTX <span class="BWZlb">&gt;</span></a
										><a
											class="DeI6P"
											target="_blank"
											rel="noopener noreferrer nofollow"
											href="/trade/TRX_USDT/?type=spot">Buy TRX <span class="BWZlb">&gt;</span></a
										>
									</div>
								</div> -->
							</div>
						</div>
					{/if}
					<div class="QWTt5">
						<div class="NcnKT">Fee Schedule</div>
						<slot></slot>
						<!-- <div class="unfVG">
							<div class="adiPk"></div>
							<div class="M9ts4">
								Special offer for market makers, institutional clients, and HNW clients
							</div>
							<a
								class="V8ZYq"
								target="_blank"
								rel="noopener noreferrer nofollow"
								href="https://forms.gle/5zZLNmgW9kmoWan37"
								>Apply Here <span class="_9ir5i"></span></a
							>
						</div> -->
					</div>
				</div>
			</div>
			<div class="BNTrl _7nofl" style="--5406e91f: 40px 0;">
				<div class="J-vm8">
					<div class="_3u1v6">FAQ</div>
					<div class="xymjU">
						<div class="JGrHK">
							<div class="p-Q5i">How is my 30-day trading volume calculated?</div>
							<div class="vcybs">
								Your 30-day trading volume is converted to USD using the average daily BTC-USD rate,
								which is calculated by daily closing price.
							</div>
						</div>
						<div class="JGrHK">
							<div class="p-Q5i">How is my TRX + HTX balance calculated?</div>
							<div class="vcybs">
								You must hold TRX and/or HTX in your Spot account to be eligible for a fee discount.
								The USD equivalent of your TRX + HTX balance is calculated based on the daily
								average TRX-USD and HTX-USD price.
							</div>
						</div>
						<div class="JGrHK">
							<div class="p-Q5i">What do "maker" and "taker" mean?</div>
							<div class="vcybs">
								There are two parties involved in every trade: the maker, who places an order on the
								orderbook before the trade is executed, and the taker, who places an order that
								matches (or takes) the maker's order.
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<Footer />

<style>
	body.dark-theme .efb13d49 a {
		color: white !important;
	}
	body:not(.dark-theme) .efb13d49 a {
		color: rgb(0, 0, 0) !important;
	}
</style>
