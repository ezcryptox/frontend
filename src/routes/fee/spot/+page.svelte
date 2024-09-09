<script lang="ts">
	import '../../../styles/fee/spot.css';
	import { handleAuthToken } from '$lib/store/routes';
	import { handleUserProfile } from '$lib/index';
	import { isLogin } from '$lib/store/profile';
	import { DataListTable } from '$lib/components/ui/datatable';
	import { onMount } from 'svelte';
	import axios from 'axios';
	import { ServerURl } from '$lib/backendUrl';
	import { vipLevels } from '../store';

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
		const unsub = isLogin.subscribe(async (loggedIn) => {
			if (loggedIn) {
				const response = await handleUserProfile($handleAuthToken);
				if (response?.profile) {
					data = {
						...response?.profile,
						level: parseInt(response?.profile.level?.toString() || '0'),
					};
				}
			}
		});
		return () => {
			unsub();
		};
	});

	$: fetcher = (levels = $vipLevels) => async () => {
		return Object.keys(levels).map((k) => ({
			level: k,
			spot: `$${levels[k].spotTradingVolume.toLocaleString()}`,
			futures: `$${levels[k].futuresTradingVolume.toLocaleString()}`,
			balance: `$${levels[k].totalBalance.toLocaleString()}`,
			asks_bids: `${(levels[k].makerTaker.maker * 100).toFixed(4)}%/${(levels[k].makerTaker.taker * 100).toFixed(4)}%`
		}))
	}

</script>

<div class="_2BNf5">
	<div class="uFeIb">
		<ul>
			<li class="">
				<a aria-current="page" href="/fee/spot" class="miAZa router-link-exact-active yXhKP">Spot</a
				>
			</li>
			<li class="">
				<a href="/fee/margin" class="yXhKP">Interest Rate and Borrow Limit</a>
			</li>
			<!-- <li class="">
										<a href="/fee/futures" class="yXhKP">USDT-M Perpetual Futures</a>
									</li> -->
		</ul>
	</div>
</div>
<DataListTable
	dataListColumns={[
		{ accessor: 'level', header: 'Level' },
		{ accessor: 'spot', header: '30 day Spot Trading Vol.' },
		{ accessor: 'futures', header: '30 day Futures Trading Vol.' },
		{ accessor: 'balance', header: 'Total Balance' },
		{ accessor: 'asks_bids', header: 'Maker/Taker' }
	]}
	tableCellClasses={(_, cell) => {
		if (cell.value === `VIP${data?.level}`) return 'text-[#e59940] font-bold';
		return '';
	}}
	tableRowClasses={(row) => {
		if (!!data && row.cells[0].value === `VIP${data?.level - 1}`) return 'border-b-[#e59940]';
		if (!!data && row.cells[0].value === `VIP${data?.level}`)
			return 'rounded-[8px] border border-solid border-[#e59940]';
		return '';
	}}
	dataListFetcher={fetcher($vipLevels)}
/>
