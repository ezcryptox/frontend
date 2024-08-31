<script lang="ts">
	import ChevronsUpDown from 'lucide-svelte/icons/chevrons-up-down';
	import { onMount, tick } from 'svelte';
	import { Button } from '$lib/components/ui/button/index';
	import * as Command from '$lib/components/ui/command/index';
	import * as Popover from '$lib/components/ui/popover/index';
	import '../../../../styles/trade/orderbook.css';
	import { splitSymbolName } from '$lib/datafeeds/helpers';
	import { currentSelectedPair, orderBook } from '$lib/store/marketdata';
	import { abbreviateNumber } from '$lib/utils';
	let selectedDepth = '15';
	let depthOpen = false;

	export let data;

	function handleDepthChange(depth: string, triggerId: string) {
		selectedDepth = depth;
		depthOpen = false;
		tick().then(() => {
			document.getElementById(triggerId)?.focus();
		});
	}

	let buyData = Array(100).fill({
		price: '--',
		amount: '--',
		total: '--',
		sum: '--'
	});
	let sellData = Array(100).fill({
		price: '--',
		amount: '--',
		total: '--',
		sum: '--'
	});

	function calculateBackgroundSize(amount, side: 'buy' | 'sell') {
		const maxAmount = Math.max(...(side === 'buy' ? buyData : sellData).map((o) => parseFloat(o.amount)));
		const percentage = (parseFloat(amount) / maxAmount) * 100;
		return percentage.toFixed(2) + '%';
	}

	function fillData(orderbook: []) {
		let orderData = Object.entries(orderbook)
				.map(([price, amount]) => ({
					price: parseFloat(price).toFixed(2),
					amount: parseFloat(amount).toFixed(4),
					total: abbreviateNumber((parseFloat(price) * parseFloat(amount)).toFixed(2)),
					sum: abbreviateNumber((parseFloat(price) * parseFloat(amount)).toFixed(2))
				})).slice(0, 100);
			if (orderData.length < 100) {
				orderData = [
					...orderData,
					...Array(100 - orderData.length).fill({
						price: '--',
						amount: '--',
						total: '--',
						sum: '--'
					})
				];
			}

			return orderData;
	}
	onMount(() => {
		currentSelectedPair.set(data.pair)
	})
	orderBook.subscribe((ob) => {
		if (!ob) return;
		// @ts-ignore
		const { base, quote } = splitSymbolName(ob.symbol.toUpperCase());
		if (data.pair?.symbol === `${base}_${quote}`) {
			// @ts-ignore
			buyData = fillData(ob.orderbook['asks']);
				// @ts-ignore
			sellData = fillData(ob.orderbook['bids']);
		}
	});
</script>

<div class="app-trade mt-[64px]">
	<div class="cb90cb9d">
		<div class="_90130be4">
			<div class="_431e36a9">
				<div class="a6f0eb07">
					<a href="/trade/{data.pair?.symbol}?type=spot" class=""
						><span>Spot Trade</span></a
					>
					- Order Book : {data.pair?.displayName || '--'}
				</div>
				<div class="_4b16a15a">
					<div>
						<span class="_83857b91 _8a25e73a undefined" style="margin-right: 20px;">
							<!-- svelte-ignore a11y-label-has-associated-control -->
							<label class="fd95b42d block">Depth</label>
							<Popover.Root bind:open={depthOpen} let:ids>
								<Popover.Trigger asChild let:builder>
									<Button
										builders={[builder]}
										variant="outline"
										role="combobox"
										aria-expanded={depthOpen}
										class="w-[200px] justify-between"
									>
										{selectedDepth}
										<ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
									</Button>
								</Popover.Trigger>
								<Popover.Content class="w-[200px] p-0">
									<Command.Root>
										<Command.Group>
											{#each ['15', '30', '50', '100'] as depth}
												<Command.Item
													value={depth}
													onSelect={(currentValue) => {
														handleDepthChange(currentValue, ids.trigger);
													}}
												>
													{depth}
												</Command.Item>
											{/each}
										</Command.Group>
									</Command.Root>
								</Popover.Content>
							</Popover.Root>
						</span>
					</div>
				</div>
			</div>
			<div class="_88ee40ba">
				<div class="_31b024e8">
					<p class="_8d23d66b">Buy Order</p>
					<div class="b11f5fa0">
						<div class="_1658a9d7 ea5d1793">
							<span title="Side">Side</span><span
								title="Price({data.pair?.quoteCurrencyName || '--'})"
								>Price({data.pair?.quoteCurrencyName || '--'})</span
							><span title="Amount({data.pair?.baseCurrencyName || '--'})"
								>Amount({data.pair?.baseCurrencyName || '--'})</span
							><span title="Total({data.pair?.quoteCurrencyName || '--'})"
								>Total({data.pair?.quoteCurrencyName || '--'})</span
							><span title="Sum(USDT)">Sum({data.pair?.quoteCurrencyName || '--'})</span>
						</div>
						<div class="ebe49bb2 _688ed1be">
							{#each buyData.slice(0, parseInt(selectedDepth))  as buy, index}
								<div class="_1658a9d7 cdbeb268" style="background-size: {calculateBackgroundSize(buy.amount, 'buy')} 100%;">
								<span>Buy {index + 1}</span><span>{buy.price}</span><span>{buy.amount}</span><span>{buy.total}</span><span
									>{buy.sum}</span
								>
							</div>
							{/each}
						</div>
					</div>
				</div>
				<div class="_31b024e8">
					<p class="_8d23d66b">Sell Order</p>
					<div class="b11f5fa0">
						<div class="_1658a9d7 ea5d1793">
							<span title="Side">Side</span><span
								title="Price({data.pair?.quoteCurrencyName || '--'})"
								>Price({data.pair?.quoteCurrencyName || '--'})</span
							><span title="Amount({data.pair?.baseCurrencyName || '--'})"
								>Amount({data.pair?.baseCurrencyName || '--'})</span
							><span title="Total({data.pair?.quoteCurrencyName || '--'})"
								>Total({data.pair?.quoteCurrencyName || '--'})</span
							><span title="Sum({data.pair?.quoteCurrencyName || '--'})"
								>Sum({data.pair?.quoteCurrencyName || '--'})</span
							>
						</div>
						<div class="ebe49bb2 _2588f124">
							{#each sellData.slice(0, parseInt(selectedDepth)) as sell, index}
								<div class="_1658a9d7 cdbeb268" style="background-size: {calculateBackgroundSize(sell.amount, 'sell')} 100%;">
								<span>Sell {index + 1}</span><span>{sell.price}</span><span>{sell.amount}</span><span>{sell.total}</span><span
									>{sell.sum}</span
								>
							</div>
							{/each}
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<style>
	body.dark-theme a {
		color: #119e5f;
	}

	a {
		font-size: 14px;
		color: #1a8f5c;
	}
</style>
