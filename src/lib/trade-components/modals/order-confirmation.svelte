<script>
	import { getContext } from 'svelte';
	$: showTooltip = -1;
	$: orderTypes = [
		{ label: 'Limit', checked: false },
		{ label: 'Market', checked: false},
		{ label: 'Stop-Limit', checked: true },
		{ label: 'Stop-Market', checked: true },
		{ label: 'Trailing Stop', checked: true },
		{ label: 'Post-Only', checked: true },
		{
			label: 'Margin',
			checked: true,
			info: 'When it is enabled, you will be asked to confirm the order details before placing any orders that involve borrowing or repayment.'
		}
	];
	const toggleOrderModal = getContext('toggleOrderModal');
	const onConfirm = () => {
		// Save settings
		toggleOrderModal();
	};
</script>

<div id="modals-container">
	<div class="vm--container">
		<div data-modal="dynamic_modal_1" aria-expanded="true" class="vm--overlay">
			<div class="vm--top-right-slot"></div>
		</div>
		<div
			aria-expanded="true"
			role="dialog"
			aria-modal="true"
			class="vm--modal"
			style="width: 446px; height: auto;  margin: auto;"
		>
			<section class="_10d2343b">
				<div class="_54c35763">
					<span>Order Confirmation</span><span class="f1585a67">
						<!-- svelte-ignore a11y-click-events-have-key-events -->
						<!-- svelte-ignore a11y-no-static-element-interactions -->
						<div class="a3e124ed" on:click={() => toggleOrderModal()}>
							<span class="eb01b484"
								>
								<svg width="16" height="16" x="0" y="0" viewBox="0 0 24 24" class="svgicon"
									><g
										><path
											d="M5 17.586a1 1 0 1 0 1.415 1.415L12 13.414 17.586 19A1 1 0 0 0 19 17.586L13.414 12 19 6.414A1 1 0 0 0 17.585 5L12 10.586 6.414 5A1 1 0 0 0 5 6.414L10.586 12z"
										></path></g
									></svg
								>
							</span>
						</div>
					</span>
				</div>
				<div class="afe98167">
					<div class="_0bc69f71">
						<span class="_5c458c4b"
							><svg
								width="22"
								height="22"
								viewBox="0 0 22 22"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
								><rect x="10" y="7" width="2" height="5" fill="#119E5F"></rect><rect
									x="10"
									y="13"
									width="2"
									height="2"
									fill="#119E5F"
								></rect><circle
									r="7.25"
									transform="matrix(1 0 0 -1 11 11)"
									stroke="#119E5F"
									stroke-width="1.5"
								></circle></svg
							></span
						>
						<div>You will be asked to confirm order details before placing an order</div>
					</div>
				</div>

				<div class="_3ed9059b">
					{#each orderTypes as { label, checked, info },index}
						<dl class="_8ba0c013">
							<dt>
								{#if info}
                                <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
                                <!-- svelte-ignore a11y-no-static-element-interactions -->
                                <!-- svelte-ignore a11y-mouse-events-have-key-events -->
                                <span id="title"
                                    on:mouseover={() => {
                                        showTooltip = index;
                                    }}
                                    on:mouseleave={() => {
                                        showTooltip = -1;
                                    }}
                                    class="el-tooltip tips-text"
                                    aria-describedby="el-tooltip-8822"
                                    tabindex="0">{label}</span>
                                    {#if showTooltip === index}
                                    <div
                                    role="tooltip"
                                    id="el-tooltip-3917"
                                    aria-hidden={showTooltip === -1}
                                    class="el-tooltip__popper is-dark"
                                    style="font-size: smaller; transform-origin: center bottom; margin-top: 5px; {showTooltip != -1
                                        ? 'position: absolute;'
                                        : 'display: none;'} "
                                >
                                    {orderTypes[showTooltip].info}
                                    <div x-arrow="" class="popper__arrow" style="left: 104px;"></div>
                                </div>
                                    {/if}
									
								{:else}
									<span>{label}</span>
								{/if}
							</dt>
							<dd>
								<span class="polo-switch polo-switch-middle {checked ? 'is-checked' : ''}">
									<span class="polo-switch-box">
										<input type="checkbox" bind:checked />
									</span>
								</span>
							</dd>
						</dl>
					{/each}
				</div>
				<div class="e62895b5">
					<div class="_6a7c73e2">
						<div class="_608d14eb">
							<button
								on:click={() => onConfirm()}
								type="button"
								class="polo-btn polo-btn-button polo-btn-primary polo-btn-medium"
								><!---->
								<div class="btn-sp">Confirm</div></button
							>
						</div>
					</div>
				</div>
			</section>
		</div>
	</div>
</div>
