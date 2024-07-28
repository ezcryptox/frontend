<script lang="ts">
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
	import {selectedFilter} from './store';
	import DataTable from './data-table.svelte';
	let fiatOpen = false;
	let cryptoOpen = false;
	let statusOpen = false;

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
					<!-- <li>
						<a href="/activity/wallet/" class=""
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
							><span>Wallet</span></a
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
						<a href="/activity/futures/" class=""
							><svg
								width="18"
								height="18"
								viewBox="0 0 18 18"
								fill="currentColor"
								xmlns="http://www.w3.org/2000/svg"
								class="RL4nT"
								><path d="M6.75 9.5625H5.0625V12.9375H6.75V9.5625Z"></path><path
									d="M11.25 8.4375H12.9375V12.9375H11.25V8.4375Z"
								></path><path d="M9.84375 5.625H8.15625V12.9375H9.84375V5.625Z"></path><path
									fill-rule="evenodd"
									clip-rule="evenodd"
									d="M1.96875 1.96875H16.0312V16.0312H1.96875V1.96875ZM3.65625 3.65625H14.3438V14.3438H3.65625V3.65625Z"
								></path></svg
							><span>Futures</span></a
						>
					</li>
					<li>
						<a href="/activity/earn/" class=""
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
									d="M8.43747 9C10.6121 9 12.375 7.23712 12.375 5.0625C12.375 2.88788 10.6121 1.125 8.43747 1.125C6.26284 1.125 4.49997 2.88788 4.49997 5.0625C4.49997 5.09948 4.50048 5.13633 4.50149 5.17306C3.7033 5.88948 3.10144 6.82032 2.78631 7.875H1.125V12.4006H3.26368C3.4511 12.7424 3.67127 13.0635 3.91989 13.3597V16.875H8.41989V15.4687L8.44185 15.4688H9.56247V16.875H14.0625V14.9688C14.372 14.8134 14.6653 14.6233 14.9365 14.4007L16.875 12.8091V8.16504H15.3739L15.2158 6.84224L15.8975 3.66504H12.1198C12.2847 4.09933 12.375 4.57037 12.375 5.0625C12.375 5.16005 12.3715 5.25677 12.3645 5.35254H13.8095L13.5068 6.76323L13.876 9.85254H15.1875V12.0112L13.8657 13.0964C13.5886 13.3239 13.2755 13.4983 12.9418 13.6143L12.375 13.8112V15.1875H11.25V13.7812H8.44185C8.19496 13.7812 7.95368 13.7601 7.71954 13.7197L6.73239 13.5495V15.1875H5.60739V12.7036L5.3771 12.4597C5.03842 12.101 4.76235 11.6835 4.5658 11.2246L4.34669 10.7131H2.8125V9.5625H4.16778L4.28652 8.85921C4.39837 8.19666 4.66506 7.58665 5.04803 7.06762C5.73387 8.22446 6.9951 9 8.43747 9ZM8.43747 7.3125C9.68011 7.3125 10.6875 6.30514 10.6875 5.0625C10.6875 3.81986 9.68011 2.8125 8.43747 2.8125C7.19483 2.8125 6.18747 3.81986 6.18747 5.0625C6.18747 6.30514 7.19483 7.3125 8.43747 7.3125Z"
								></path><path
									d="M12.0937 10.6875C12.5597 10.6875 12.9375 10.3097 12.9375 9.84375C12.9375 9.37776 12.5597 9 12.0937 9C11.6277 9 11.25 9.37776 11.25 9.84375C11.25 10.3097 11.6277 10.6875 12.0937 10.6875Z"
								></path></svg
							><span>Earn</span></a
						>
					</li> -->
					<li>
						<a href="/activity/cards" class="p3PPD"
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
							><span>Buy Crypto</span></a
						>
					</li>
					<!-- <li>
						<a href="/activity/copytrading" class=""
							><svg
								width="18"
								height="18"
								viewBox="0 0 18 18"
								fill="currentColor"
								xmlns="http://www.w3.org/2000/svg"
								class="RL4nT"
								><path
									d="M9.00049 10.5V12C6.51521 12 4.50049 14.0147 4.50049 16.5H3.00049C3.00049 13.2488 5.58637 10.6016 8.81359 10.5029L9.00049 10.5ZM9.00049 0.75C11.4867 0.75 13.5005 2.76375 13.5005 5.25C13.5005 7.67978 11.5773 9.6582 9.16924 9.74692L9.00049 9.75C6.51424 9.75 4.50049 7.73625 4.50049 5.25C4.50049 2.82025 6.42374 0.841778 8.83174 0.753105L9.00049 0.75ZM9.00049 2.25C7.34267 2.25 6.00049 3.59218 6.00049 5.25C6.00049 6.90782 7.34267 8.25 9.00049 8.25C10.6583 8.25 12.0005 6.90782 12.0005 5.25C12.0005 3.59218 10.6583 2.25 9.00049 2.25Z"
								></path><rect
									x="9.81836"
									y="13.5"
									width="4.62834"
									height="4.62834"
									transform="rotate(-45 9.81836 13.5)"
								></rect></svg
							><span>Copy Trading</span></a
						>
					</li>
					<li>
						<a href="/activity/strategy" class=""
							><svg
								width="18"
								height="18"
								viewBox="0 0 18 18"
								fill="currentColor"
								xmlns="http://www.w3.org/2000/svg"
								class="RL4nT"
								><path d="M8.15625 2.8125H6.46875V7.875H8.15625V6.1875H16.0312V4.5H8.15625V2.8125Z"
								></path><path d="M1.96875 4.5H5.34375V6.1875H1.96875V4.5Z"></path><path
									d="M9.84375 11.8125H1.96875V13.5H9.84375V15.1875H11.5312V10.125H9.84375V11.8125Z"
								></path><path d="M12.6562 11.8125V13.5H16.0312V11.8125H12.6562Z"></path></svg
							><span>Strategy Trading</span></a
						>
					</li> -->
				</ul>
			</div>
		</div>
		<div class="zyo5p">
			<div class="TFdqF sOAaO">
				<div>
					<h1 class="EqAGa">Buy Crypto</h1>
					<div class="ArmYq" style="margin-top: 32px;">
						<ul>
							<li class="">
								<a
									aria-current="page"
									href="/activity/cards/buy"
									class="g5GQK router-link-exact-active _5m-Bj">Buy</a
								>
							</li>
							<!-- <li class=""><a href="/activity/cards/sell" class="_5m-Bj">Sell</a></li> -->
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
											<div class="field-header"><label>Fiat Currency</label><!----></div>
											<Popover.Root bind:open={fiatOpen} let:ids>
												<Popover.Trigger asChild let:builder>
													<Button
														builders={[builder]}
														variant="outline"
														role="combobox"
														aria-expanded={fiatOpen}
														class="w-[200px] justify-between"
													>
														{$selectedFilter.fiat}
														<ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
													</Button>
												</Popover.Trigger>
												<Popover.Content class="w-[200px] p-0">
													<Command.Root>
														<Command.Input placeholder="" />
														<Command.Empty>No currency found.</Command.Empty>
														<Command.Group class="max-h-80 overflow-y-auto">
															{#each ['All', 'AUD', 'BGN', 'BRL', 'CAD', 'CHF', 'COP', 'CZK', 'DKK', 'DOP', 'EGP', 'EUR', 'GBP', 'HKD', 'IDR', 'ILS', 'JOD', 'KES', 'KWD', 'LKR', 'MXN', 'NGN', 'NOK', 'NZD', 'OMR', 'PEN', 'PLN', 'RON', 'SEK', 'THB', 'TRY', 'TWD', 'USD', 'VND', 'ZAR'] as fiat}
																<Command.Item
																	value={fiat}
																	onSelect={(currentValue) => {
																		selectedFilter.set({ ...($selectedFilter), fiat: currentValue });
																		closeAndFocusTrigger(ids.trigger);
																	}}
																>
																	{fiat}
																</Command.Item>
															{/each}
														</Command.Group>
													</Command.Root>
												</Popover.Content>
											</Popover.Root>
										</div>
										<div>
											<div class="field-header"><label>Cryptocurrency</label><!----></div>
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
														<Command.Empty>No crypto found.</Command.Empty>
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
											<div class="field-header"><label>Status</label><!----></div>
											<Popover.Root bind:open={statusOpen} let:ids>
												<Popover.Trigger asChild let:builder>
													<Button
														builders={[builder]}
														variant="outline"
														role="combobox"
														aria-expanded={statusOpen}
														class="w-[200px] justify-between"
													>
														{$selectedFilter.status}
														<ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
													</Button>

												</Popover.Trigger>
												<Popover.Content class="w-[200px] p-0">
													<Command.Root>
														<Command.Group>
															{#each ['All', 'Processing', 'Failed', 'Completed'] as status}
																<Command.Item
																	value={status}
																	onSelect={(currentValue) => {
																		selectedFilter.set({ ...($selectedFilter), status: currentValue });
																		closeAndFocusTrigger(ids.trigger);
																	}}
																>
																	{status}
																</Command.Item>
															{/each}
														</Command.Group>
													</Command.Root>
												</Popover.Content>
											</Popover.Root>
										</div>
										<div>
											<div class="field-header"><label>Time</label><!----></div>
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
															selectedFilter.set({
																...($selectedFilter),
																time: {
																	start: ev.start?.toDate(getLocalTimeZone()).getTime() || 0,
																	end: ev.end?.toDate(getLocalTimeZone()).getTime() || 0
																}
															});
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
								<DataTable/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!---->
</div>
