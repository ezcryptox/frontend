<script lang="ts">
	import '../../../styles/fee/spot.css';
	import { handleAuthToken } from '$lib/store/routes';
	import { handleUserProfile } from '$lib/index';
	import { isLogin } from '$lib/store/profile';
	import { DataListTable } from '$lib/components/ui/datatable';
	import { onMount, tick } from 'svelte';
	import ChevronsUpDown from 'lucide-svelte/icons/chevrons-up-down';
	import axios from 'axios';
	import * as Command from '$lib/components/ui/command/index';
	import * as Popover from '$lib/components/ui/popover/index';
	import { Button } from '$lib/components/ui/button/index';
	import { ServerURl } from '$lib/backendUrl';
	import { writable } from 'svelte/store';

	let levelOpen = false;
	const selectedLevel = writable('VIP0');
	const levelList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => `VIP${i}`);
	function closeAndFocusTrigger(triggerId: string) {
		levelOpen = false;
		tick().then(() => {
			document.getElementById(triggerId)?.focus();
		});
	}

	let feesData;
	$: fetcher =
		(level = $selectedLevel) =>
		async () => {
			if (!feesData) {
				feesData = (await axios.get(`${ServerURl()}/api/trading/margin-fees`)).data;
			}
			return feesData[level].map((d) => ({
				coin: d.currencyName,
				borrowable: d.borrowable ? 'YES' : 'NO',
				margin: d.collateral ? 'YES' : 'NO',
				rate: d.collateralRate,
				hourly_annually: `${d.hourInterest.toFixed(4)}%/${d.yearlyInterest.toFixed(4)}%`,
				limit: d.borrowLimit
			}));
		};
</script>

<div class="_2BNf5">
	<div class="uFeIb">
		<ul>
			<li class="">
				<a aria-current="page" href="/fee/spot" class="yXhKP">Spot</a>
			</li>
			<li class="">
				<a href="/fee/margin" class="miAZa router-link-exact-active yXhKP"
					>Interest Rate and Borrow Limit</a
				>
			</li>
			<!-- <li class="">
										<a href="/fee/futures" class="yXhKP">USDT-M Perpetual Futures</a>
									</li> -->
		</ul>
	</div>
</div>
<div class="noVk6">
	<div class="_426nl">Spot Level</div>
	<div class="_3Johe _0R1e9 vwe9n">
		<Popover.Root bind:open={levelOpen} let:ids>
			<Popover.Trigger asChild let:builder>
				<Button
					builders={[builder]}
					variant="outline"
					role="combobox"
					aria-expanded={levelOpen}
					class="w-[200px] justify-between"
				>
					{$selectedLevel}
					<ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</Popover.Trigger>
			<Popover.Content class="w-[200px] p-0">
				<Command.Root>
					<Command.Group>
						{#each levelList as level}
							<Command.Item
								value={level}
								onSelect={(currentValue) => {
									selectedLevel.set(currentValue);
									closeAndFocusTrigger(ids.trigger);
								}}
							>
								{level}
							</Command.Item>
						{/each}
					</Command.Group>
				</Command.Root>
			</Popover.Content>
		</Popover.Root>
	</div>
</div>
<DataListTable
	dataListColumns={[
		{ accessor: 'coin', header: 'Coin' },
		{ accessor: 'borrowable', header: 'Borrowable' },
		{ accessor: 'margin', header: 'Margin' },
		{ accessor: 'rate', header: 'Collateral Rate' },
		{ accessor: 'hourly_annually', header: 'Hourly/Annual Interest Rate' },
		{ accessor: 'limit', header: 'Borrow Limit' }
	]}
	dataListFetcher={fetcher($selectedLevel)}
/>

<style>
	.noVk6 {
		display: flex;
		align-items: center;
		margin-top: 16px;
	}
	html[data-theme='light'] .noVk6 ._426nl,
	html[data-theme='dark'] .noVk6 ._426nl {
		color: #616161;
	}
	.noVk6 ._426nl {
		font-size: 14px;
		line-height: 20px;
		margin-right: 8px;
	}
	html[data-theme='dark'] ._3Johe._0R1e9 {
		--web-core-select-bg: #2b2b2e;
		--web-core-select-disabled-bg: #2b2b2e;
		--web-core-select-arrow: #878787;
		--web-core-select-disabled-arrow: #b8b8b8;
		--web-core-select-bd-color: #2b2b2e;
		--web-core-select-disabled-bd: #2b2b2e;
		--web-core-select-active-bd-color: #119e5f;
		--web-core-select-color: #878787;
		--web-core-select-selected-color: #ffffff;
		--web-core-select-disabled-color: #b8b8b8;
	}

	.noVk6 .vwe9n {
		width: 140px;
	}
	._3Johe {
		position: relative;
	}
</style>
