<script>
	import { ServerURl } from '$lib/backendUrl';
	import axios from 'axios';
	import { onMount } from 'svelte';

	export let closeModal;

  $: onCloseModal = closeModal;

	let loadingBoard = false;
	$: list = [];
	async function loadItems() {
		loadingBoard = true;
		try {
			const {leaderboard} = (await axios.get(`${ServerURl()}/api/referral/leaderboard`)).data;
			list = leaderboard;
		} catch (err) {
			console.log('Error loading Orders');
		} finally {
			loadingBoard = false;
		}
	}
  onMount(() => {
    loadItems();
  })
</script>

<div
	tabindex="-1"
	role="dialog"
	aria-labelledby="rcDialogTitle0"
	class="ant-modal-wrap ant-modal-centered _87fac765"
>
	<div role="document" class="ant-modal" style="width: 520px; transform-origin: 59px 115.217px;">
		<div tabindex="0" aria-hidden="true" style="width: 0px; height: 0px; overflow: hidden;"></div>
		<div class="ant-modal-content">
			<button type="button" aria-label="Close" class="ant-modal-close" on:click={onCloseModal}>
				<span class="ant-modal-close-x">
					<i aria-label="icon: close" class="anticon anticon-close ant-modal-close-icon">
						<svg
							viewBox="64 64 896 896"
							data-icon="close"
							width="1em"
							height="1em"
							fill="currentColor"
							aria-hidden="true"
							focusable="false"
							
						>
							<path
								d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"
							></path>
						</svg>
					</i>
				</span>
			</button>
			<div class="ant-modal-header">
				<div id="rcDialogTitle0" class="ant-modal-title">Top Inviters</div>
			</div>
			<div class="ant-modal-body" style="padding: 0px;">
				<div class="_86658441">
					<div class="_0e963cf4">
						<div class="ant-table-wrapper">
							<div class="ant-spin-nested-loading">
								<div class="ant-spin-container">
									<div
										class="ant-table ant-table-scroll-position-left ant-table-layout-fixed ant-table-default"
									>
										<div class="ant-table-content">
											<div class="ant-table-body">
												<table>
													<colgroup>
														<col style="width: 55px; min-width: 55px;" />
														<col style="width: 125px; min-width: 125px;" />
														<col style="width: 72px; min-width: 72px;" />
														<col style="width: 100px; min-width: 100px;" />
													</colgroup>
													<thead class="ant-table-thead">
														<tr>
															<th key="ranking" class="ant-table-row-cell-break-word">
																<span class="ant-table-header-column">
																	<div>
																		<span class="ant-table-column-title">Ranking</span>
																		<span class="ant-table-column-sorter"></span>
																	</div>
																</span>
															</th>
															<th key="email" class="ant-table-row-cell-break-word">
																<span class="ant-table-header-column">
																	<div>
																		<span class="ant-table-column-title">Email</span>
																		<span class="ant-table-column-sorter"></span>
																	</div>
																</span>
															</th>
															<th key="invitees" class="ant-table-row-cell-break-word">
																<span class="ant-table-header-column">
																	<div>
																		<span class="ant-table-column-title">Invitees</span>
																		<span class="ant-table-column-sorter"></span>
																	</div>
																</span>
															</th>
															<th
																key="totalRebate"
																class="ant-table-align-right ant-table-row-cell-break-word ant-table-row-cell-last"
																style="text-align: right;"
															>
																<span class="ant-table-header-column">
																	<div>
																		<span class="ant-table-column-title">Earnings (USDT)</span>
																		<span class="ant-table-column-sorter"></span>
																	</div>
																</span>
															</th>
														</tr>
													</thead>
													<tbody class="ant-table-tbody">
														<!-- Repeat for each row in the table -->
														{#each list as item, index}
															<tr
																class="ant-table-row ant-table-row-level-0 _9b7b4107"
																data-row-key={item.email}
															>
																<td class="ant-table-row-cell-break-word">
																	<div data-index={index} class="ec42ef1b">
																		<span>{index}</span>
																	</div>
																</td>
																<td class="ant-table-row-cell-break-word">
																	<div data-index="0" class="_8513f9e3">{item.email}</div>
																</td>
																<td class="ant-table-row-cell-break-word">
																	<div data-index="0" class="_4689f51d">{item.Invitees}</div>
																</td>
																<td
																	class="ant-table-row-cell-break-word"
																	style="text-align: right;"
																>
																	<div data-index="0" class="_3f342225">
																		<svg
																			xmlns="http://www.w3.org/2000/svg"
																			width="16"
																			height="16"
																			viewBox="0 0 16 16"
																			fill="none"
																		>
																			<path
																				d="M13 7.67777C13 7.20656 11.302 6.81297 9.0398 6.71915V5.66443H11.6915V4L4.28945 4V5.66443H6.97944V6.71835C4.70745 6.81067 3 7.20518 3 7.67777C3 8.15047 4.70745 8.54498 6.97944 8.63736V12H9.0398V8.63662C11.302 8.54274 13 8.14915 13 7.67777ZM4.33333 7.42849C4.33333 7.15459 5.46488 6.92419 7 6.85714V8C5.46488 7.93295 4.33333 7.7025 4.33333 7.42849ZM9 8V6.85714C10.5385 6.92745 11.6667 7.15661 11.6667 7.42854C11.6667 7.70053 10.5385 7.92975 9 8Z"
																				fill="#878787"
																			></path>
																		</svg>
																		{(item.referralEarnings || 0).toString()}
																	</div>
																</td>
															</tr>
														{/each}

														<!-- Repeat ends here -->
														{#if !loadingBoard && !list.length}
															<tr>
																<td colspan="4">
																	<div class="qqWi0">
																		<div class="YSmmf dark:text-white">
																			<div>No records</div>
																			<!---->
																		</div>
																	</div>
																</td>
															</tr>
														{/if}
														{#if loadingBoard}
															<tr>
																<td colspan="4">
																	<div class="ant-spin ant-spin-spinning w-full">
																		<span class="ant-spin-dot ant-spin-dot-spin"
																			><i class="ant-spin-dot-item"></i><i class="ant-spin-dot-item"
																			></i><i class="ant-spin-dot-item"></i><i
																				class="ant-spin-dot-item"
																			></i></span
																		>
																	</div>
																</td>
															</tr>
														{/if}
													</tbody>
												</table>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	/* Add your styles here if needed */
	.qqWi0 {
		padding: 10px;
		display: flex;
		justify-content: center;
		align-items: center;
		text-align: center;
	}
	html[data-theme='light'] .qqWi0 .YSmmf {
		background-image: url(data:image/png;base64,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);
	}
	html[data-theme='dark'] .qqWi0 .YSmmf {
		background-image: url(data:image/png;base64,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);
	}
	.qqWi0 .YSmmf,
	.qqWi0 .w5hSZ {
		background-repeat: no-repeat;
		background-position: center top;
		background-size: 80px;
		padding-top: 88px;
		line-height: 20px;
		color: #878787;
		pointer-events: auto;
		min-width: 80px;
	}
</style>
