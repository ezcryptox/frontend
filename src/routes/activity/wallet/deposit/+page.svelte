<script lang="ts">
	import { _ } from 'svelte-i18n';
	import '../../../../styles/activity.css';
	import ChevronsUpDown from 'lucide-svelte/icons/chevrons-up-down';
	import { tick } from 'svelte';
	import * as Command from '$lib/components/ui/command/index';
	import * as Popover from '$lib/components/ui/popover/index';
	import { RangeCalendar } from '$lib/components/ui/range-calendar/index';
	import { Button } from '$lib/components/ui/button/index';
	import CalendarIcon from 'lucide-svelte/icons/calendar';
	import type { DateRange } from 'bits-ui';
	import {
		DateFormatter,
		type DateValue,
		getLocalTimeZone,
		today
	} from '@internationalized/date';
	import { cn } from '$lib/utils.js';
  import {writable} from 'svelte/store'
	import { DataListTable } from '$lib/components/ui/datatable';
	let fiatOpen = false;
	let cryptoOpen = false;
	let statusOpen = false;


  const selectedFilter = writable({})
	const df = new DateFormatter('en-US', {
		dateStyle: 'medium'
	});

	let value: DateRange | undefined = {
		start: today(getLocalTimeZone()),
		end: today(getLocalTimeZone()).add({ days: 7 })
	};

	let startValue: DateValue | undefined = undefined;

	function closeAndFocusTrigger(triggerId: string) {
		fiatOpen = false;
		cryptoOpen = false;
		statusOpen = false;
		tick().then(() => {
			document.getElementById(triggerId)?.focus();
		});
	}

	
</script>
<div class="TFdqF TFdqF"></div>
<div id="root" data-v-app="" style="margin-top: 50px;">
	<div class="GKE6F">
		<div class="_0zlMs">
			<div class="_1715a">
				<ul>
					<li>
						<a href="/activity/wallet/" class="p3PPD"
							><svg
								width="18"
								height="18"
								viewBox="0 0 18 18"
								fill="currentColor"
								xmlns="http://www.w3.org/2000/svg"
								class="RL4nT"
								><path d="M12.9375 8.4375H11.25V9.5625H12.9375V8.4375Z"></path><path
									fill-rule="evenodd"
									clip-rule="evenodd"
									d="M16.875 5.87109H15.75V2.49609H1.08984V15.5039H15.75V12.1289H16.875V5.87109ZM2.77734 4.18359H14.0625V5.87109H11.0039C9.27586 5.87109 7.875 7.27195 7.875 9C7.875 10.728 9.27586 12.1289 11.0039 12.1289H14.0625V13.8164H2.77734V4.18359ZM15.1875 7.55859H11.0039C10.2078 7.55859 9.5625 8.20393 9.5625 9C9.5625 9.79607 10.2078 10.4414 11.0039 10.4414H15.1875V7.55859Z"
								></path></svg
							><span>{$_('g-wallet')}</span></a
						>
					</li>
					<li>
						<a href="/activity/spot/" class=""
							><svg
								width="18"
								height="18"
								viewBox="0 0 18 18"
								fill="currentColor"
								xmlns="http://www.w3.org/2000/svg"
								class="RL4nT"
								><path
									fill-rule="evenodd"
									clip-rule="evenodd"
									d="M15.1881 7.3125C15.1881 8.7343 14.5287 10.0021 13.4991 10.8268C13.4818 11.6081 13.3197 12.3538 13.0386 13.0379C15.2902 12.1126 16.8756 9.89771 16.8756 7.3125C16.8756 3.89524 14.1054 1.125 10.6881 1.125C8.10303 1.125 5.88821 2.7103 4.9628 4.96175C2.71079 5.8869 1.125 8.10201 1.125 10.6875C1.125 14.1048 3.89524 16.875 7.3125 16.875C10.7298 16.875 13.5 14.1048 13.5 10.6875C13.5 7.27024 10.7298 4.5 7.3125 4.5C7.26617 4.5 7.21996 4.50051 7.17388 4.50152C7.99854 3.47188 9.26633 2.8125 10.6881 2.8125C13.1734 2.8125 15.1881 4.82722 15.1881 7.3125ZM11.8125 10.6875C11.8125 13.1728 9.79778 15.1875 7.3125 15.1875C4.82722 15.1875 2.8125 13.1728 2.8125 10.6875C2.8125 8.20222 4.82722 6.1875 7.3125 6.1875C9.79778 6.1875 11.8125 8.20222 11.8125 10.6875Z"
								></path></svg
							><span>Spot</span></a
						>
					</li>
					<li>
						<a href="/activity/cards" class=""
							><svg
								width="18"
								height="18"
								viewBox="0 0 18 18"
								fill="currentColor"
								xmlns="http://www.w3.org/2000/svg"
								class="RL4nT"
								><path d="M14.0801 11.0039H10.7051V12.6914H14.0801V11.0039Z"></path><path
									fill-rule="evenodd"
									clip-rule="evenodd"
									d="M1.08984 2.49609V15.5039H16.875V2.49609H1.08984ZM15.1875 4.18359H2.77734V6.43359H15.1875V4.18359ZM2.77734 13.8164V8.12109H15.1875V13.8164H2.77734Z"
								></path></svg
							><span>{$_('g-buy-crypto')}</span></a
						>
					</li>
				</ul>
			</div>
		</div>
		<div class="zyo5p">
			<div class="TFdqF sOAaO">
				<div>
					<h1 class="EqAGa">Wallet</h1>
					<div class="ArmYq" style="margin-top: 32px;">
						<ul>
							<li class="">
								<a
									aria-current="page"
									href="/activity/wallet/withdraw"
									class="">Withdraw</a
								>
							</li>
							<li class="g5GQK router-link-exact-active _5m-Bj"><a href="/activity/wallet/deposit" class="_5m-Bj">Deposit</a></li>
						</ul>
					</div>
					<div style="margin-top: 32px;">
						<div
							class="OVqFT AJuz- web-core-table web-core-table-sticky web-core-table-auto-height"
							style="--edd8930a: 72px;"
						>
							<div class="web-core-table-filter">
								<div class="_1mSet">
									<div class="iL5vR">
										<div>
											<div class="field-header"><label>Coin</label><!----></div>
											<Popover.Root bind:open={cryptoOpen} let:ids>
												<Popover.Trigger asChild let:builder>
													<Button
														builders={[builder]}
														variant="outline"
														role="combobox"
														aria-expanded={cryptoOpen}
														class="w-[200px] justify-between"
													>
														{$selectedFilter.crypto}
														<ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
													</Button>
												</Popover.Trigger>
												<Popover.Content class="w-[200px] p-0">
													<Command.Root>
														<Command.Input placeholder="" />
														<Command.Empty>{$_('no-crypto-found-1')}</Command.Empty>
														<Command.Group>
															{#each ['All', 'BTC', 'ETH', 'LTC', 'TRX', 'USDC', 'USDT', 'XRP'] as crypto}
																<Command.Item
																	value={crypto}
																	onSelect={(currentValue) => {
																		selectedFilter.set({ ...($selectedFilter), crypto: currentValue });
																		closeAndFocusTrigger(ids.trigger);
																	}}
																>
																	{crypto}
																</Command.Item>
															{/each}
														</Command.Group>
													</Command.Root>
												</Popover.Content>
											</Popover.Root>
										</div>
										<div>
											<div class="field-header"><label>{$_('g-date')}</label><!----></div>
											<Popover.Root openFocus>
												<Popover.Trigger asChild let:builder>
													<Button
														variant="outline"
														class={cn(
															'w-[300px] justify-start text-left font-normal',
															!value && 'text-muted-foreground'
														)}
														builders={[builder]}
													>
														<CalendarIcon class="mr-2 h-4 w-4" />
														{#if value && value.start}
															{#if value.end}
																{df.format(value.start.toDate(getLocalTimeZone()))} - {df.format(
																	value.end.toDate(getLocalTimeZone())
																)}
															{:else}
																{df.format(value.start.toDate(getLocalTimeZone()))}
															{/if}
														{:else if startValue}
															{df.format(startValue.toDate(getLocalTimeZone()))}
														{:else}
															Pick a date
														{/if}
													</Button>
												</Popover.Trigger>
												<Popover.Content class="w-auto p-0" align="start">
													<RangeCalendar
														bind:value
														bind:startValue
														placeholder={value?.start}
														initialFocus
														onValueChange={(ev) => {
															selectedFilter.update(old => ({
																...old,
																time: {
																	start: ev.start?.toDate(getLocalTimeZone()).getTime() || 0,
																	end: ev.end?.toDate(getLocalTimeZone()).getTime() || 0
																}
															}));
														}}
														numberOfMonths={2}
													/>
												</Popover.Content>
											</Popover.Root>
										</div>
									</div>
									<div class="REwGV"><div></div></div>
								</div>
							</div>
							<div class="ag-theme-alpine po-ag-table">
								<DataListTable dataListColumns={[
                  {accessor: 'time', header: 'Time'},
                  {accessor: 'coin', header: 'Coin'},
                  {accessor: 'amount', header: 'Amount'},
                  {accessor: 'actual_amount', header: 'Actual Arrival Amount'},
                  {accessor: 'network', header: 'Network'},
                  {accessor: 'status', header: 'Status'},
                ]}/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
