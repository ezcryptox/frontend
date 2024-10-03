<script>
	import { getContext } from "svelte";
	$: useBalanceInEarnToTrade = false;
	const toggleRedeemModal = getContext('toggleRedeemModal');
	const onConfirm = () => {
		// Save settings
		toggleRedeemModal();
	};
	
</script>
<div id="modals-container">
	<div class="vm--container">
		<div data-modal="dynamic_modal_5" aria-expanded="true" class="vm--overlay">
			<div class="vm--top-right-slot"></div>
		</div>
		<!-- svelte-ignore a11y-role-supports-aria-props -->
		<div
			aria-expanded="true"
			role="dialog"
			aria-modal="true"
			class="vm--modal"
			style="width: 446px; height: auto; margin: auto"
		>
			<section class="_10d2343b">
				<div class="_54c35763">
					<span>Auto-redeem from Earn</span><span class="f1585a67">
						<!-- svelte-ignore a11y-click-events-have-key-events -->
						<!-- svelte-ignore a11y-no-static-element-interactions -->
						<div class="a3e124ed" on:click={() => toggleRedeemModal()}>
							<span class="eb01b484"
								><svg width="16" height="16" x="0" y="0" viewBox="0 0 24 24" class="svgicon"
									><g
										><path
											d="M5 17.586a1 1 0 1 0 1.415 1.415L12 13.414 17.586 19A1 1 0 0 0 19 17.586L13.414 12 19 6.414A1 1 0 0 0 17.585 5L12 10.586 6.414 5A1 1 0 0 0 5 6.414L10.586 12z"
										></path></g
									></svg
								>
							</span>
						</div>
						
						</span
					>
				</div>
				<div class="_3ed9059b">
					<dl class="_9c2adcb9">
						<dt>Use balances in Earn to trade</dt>
						<dd>
							<span class="polo-switch polo-switch-middle {useBalanceInEarnToTrade ? 'is-checked' : ''}"
								><span class="polo-switch-box"><input type="checkbox" bind:checked={useBalanceInEarnToTrade}  /></span
								><!----></span
							>
						</dd>
					</dl>
					<p class="_40d524a3">
						By enabling this feature, your available assets for spot trading will be displayed as a
						sum of the available balance of the quote currency in your Spot account with no
						borrowings and that of the quote currency in the Earn - Flexible product. The balance of
						the current crypto in the Flexible product will only be auto-redeemed when necessary for
						spot trading.
					</p>
				</div>
				<div class="e62895b5">
					<div class="_6a7c73e2">
						<div class="a9ac9cd7">
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
			<!---->
		</div>
	</div>
</div>
