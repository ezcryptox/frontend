<script>
	import { getContext } from "svelte";

	$: selectedTabIndex = 0;
	const onTabSelected = (index) => {
		selectedTabIndex = index;
	};
    const toggleBorrowModal = getContext("toggleBorrowModal");
</script>

<div id="modals-container">
	<div class="vm--container">
		<div data-modal="dynamic_modal_2" aria-expanded="true" class="vm--overlay">
			<div class="vm--top-right-slot"></div>
		</div>
		<!-- svelte-ignore a11y-role-supports-aria-props -->
		<div
			aria-expanded="true"
			role="dialog"
			aria-modal="true"
			class="vm--modal trade-rules-modal"
			style="width: 790px; height: auto; margin: auto;"
		>
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<div class="cc374246" style="">
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<div class="a3e124ed" on:click={()=> toggleBorrowModal()}>
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
				<div class="b01ee9d8">
					<div class="_7e718cf2">
						<span class="eb01b484"
							><svg
								aria-hidden="true"
								class="svgicon"
								style="width: 24px; height: 24px; min-width: 24px;"
								><use xlink:href="#bulb"></use></svg
							></span
						>Margin Trading Rules
					</div>
					<!-- svelte-ignore a11y-no-static-element-interactions -->
					<div class="_0fdebcb6">
						<!-- svelte-ignore a11y-click-events-have-key-events -->
						<div
							class="_3a7a4d55 {selectedTabIndex === 0 ? 'ea0912a9' : ''}"
							on:click={() => onTabSelected(0)}
						>
							<div class="_7e718cf2">How to Borrow</div>
							<div class="_793175cd">
								By turning “Auto borrow“ on, you can view and trade with the maximum available
								amount, which includes borrowable funds. Currently, “Auto borrow” is available only
								for currencies that support borrowing.
							</div>
						</div>
						<!-- svelte-ignore a11y-click-events-have-key-events -->
						<div
							class="_3a7a4d55 {selectedTabIndex === 1 ? 'ea0912a9' : ''}"
							on:click={() => onTabSelected(1)}
						>
							<div class="_7e718cf2">How to Repay</div>
							<div class="_793175cd">
								By turning “Auto borrow“ on, you can view and trade with the maximum available
								amount, which includes borrowable funds. Currently, “Auto borrow” is available only
								for currencies that support borrowing.
							</div>
						</div>
					</div>
				</div>
				<div class="bd204142">
                    {#if selectedTabIndex===0}
                    <div class="_21587813">
						<p>
							<span style="font-weight: 400;"
								>By turning “Auto borrow“ on, you can view and trade with the maximum available
								amount, which includes borrowable funds. Currently, “Auto borrow” is available only
								for currencies that support borrowing.</span
							>
						</p>
						<p>
							<span style="display: flex; padding-bottom: 8px;"
								><img
									src="https://support.poloniex.com/hc/article_attachments/12232311803671"
									alt="How_to_Borrow_2x.png"
								/></span
							>
						</p>
						<p style="background: rgb(242, 242, 242); border-radius: 8px 8px 0px 0px;">
							<span style="height: 300px; display: inline-block; overflow: hidden;"
								><img
									src="https://support.poloniex.com/hc/article_attachments/12232342922391"
									alt="__.gif"
								/></span
							>
						</p>
						<p style="background: rgb(255, 255, 255); padding-left: 16px; line-height: 38px;">
							<span style="font-weight: 400;"
								>Borrow to buy BTC and sell when its price goes up.</span
							>
						</p>
					</div>
                    {:else}
                    <div class="_21587813">
						<p>
							<span style="font-weight: 400;"
								>If you have borrowed a currency, then any purchases of this currency in the spot
								market and deposits/transfers of this currency into your spot account will be used
								for repayment first, regardless of whether “Auto borrow” is turned on or not.</span
							>
						</p>
						<p style="display: flex; padding-bottom: 8px;">
							<img
								src="https://support.poloniex.com/hc/article_attachments/12232994244247"
								alt="Group_1321316422_2x.png"
							/>
						</p>
						<p style="background: rgb(242, 242, 242); border-radius: 8px 8px 0px 0px;">
							<span style="height: 300px; display: inline-block; overflow: hidden;"
								><img
									src="https://support.poloniex.com/hc/article_attachments/12232279958679"
									alt="__1.gif"
								/></span
							>
						</p>
						<p style="background: rgb(255, 255, 255); padding-left: 16px; line-height: 38px;">
							<span style="font-weight: 400;"
								>Sell BTC to repay the borrowed USDT and earn profits.</span
							>
						</p>
					</div>
                    {/if}

					

					

					<!-- svelte-ignore a11y-no-static-element-interactions -->
					<div class="e2075eed">
						<div class="_2b699ef8" style="color: green;">
							<a href="/fee/margin">
								View borrowable assets and their borrow interest rates
							</a><span class="eb01b484"
								><svg class="svgicon" width="15px" height="15px" x="0" y="0" viewBox="0 0 128 128"
									><g
										><path
											d="M44 108a3.988 3.988 0 0 1-2.828-1.172 3.997 3.997 0 0 1 0-5.656L78.344 64 41.172 26.828c-1.563-1.563-1.563-4.094 0-5.656s4.094-1.563 5.656 0l40 40a3.997 3.997 0 0 1 0 5.656l-40 40A3.988 3.988 0 0 1 44 108z"
										></path></g
									></svg
								></span
							>
						</div>
						<!-- svelte-ignore a11y-click-events-have-key-events -->
						<div class="_28d2a6d0" on:click={()=> toggleBorrowModal()}>Confirm</div>
					</div>
				</div>
			</div>
			<!---->
		</div>
	</div>
</div>
