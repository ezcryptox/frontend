<script>
	 
	import { getContext } from 'svelte';
	import '../../../styles/trade/margin-ratio.css';
	 
	const toggleMarginRatioModal = getContext('toggleMarginRatio');
	 
</script>

<div id="modals-container">
	<div class="vm--container">
		<div data-modal="dynamic_modal_8" aria-expanded="true" class="vm--overlay">
			<div class="vm--top-right-slot"></div>
		</div>
			<!-- svelte-ignore a11y-role-supports-aria-props -->
		<div
			aria-expanded="true"
			role="dialog"
			aria-modal="true"
			class="vm--modal"
			style="width: 450px; height: auto; margin: auto;"
		>
			<section class="_10d2343b _606fbc58">
				<div class="_54c35763">
					<div class="af20599b">
						<span>Margin Ratio</span><span class="_9f52deff"
							><svg class="svgicon" width="16px" height="16px" x="0" y="0" viewBox="0 0 512 512"><g><path d="M26.668 298.668h94.227L101.44 482.582c-.086.555-.109 2.195-.109 2.75 0 14.7 11.969 26.668 26.668 26.668 8.363 0 16.34-4.012 21.633-11.113L336 234.668a26.865 26.865 0 0 0 5.332-16c0-14.7-11.965-26.668-26.664-26.668H199.34l19.2-162.2c.062-.616.105-2.515.105-3.132C218.668 11.968 206.699 0 192 0c-8.363 0-16.34 4.012-21.8 11.328L5.331 256A26.857 26.857 0 0 0 0 272c0 14.7 11.969 26.668 26.668 26.668zm0 0"></path></g></svg>
                            --</span>
					</div>
						<!-- svelte-ignore a11y-click-events-have-key-events -->
						<!-- svelte-ignore a11y-no-static-element-interactions -->
					<span class="f1585a67" on:click={()=> toggleMarginRatioModal()}
						>
                        <svg width="16" height="16" x="0" y="0" viewBox="0 0 24 24" class="svgicon"
                        ><g
                            ><path
                                d="M5 17.586a1 1 0 1 0 1.415 1.415L12 13.414 17.586 19A1 1 0 0 0 19 17.586L13.414 12 19 6.414A1 1 0 0 0 17.585 5L12 10.586 6.414 5A1 1 0 0 0 5 6.414L10.586 12z"
                            ></path></g
                        ></svg
                    >
				</div>
				<div class="_3ed9059b">
					<div class="f81824cf">
						<div class="fb818ee7">Total margin / Maintenance margin *100%.</div>
						<div class="_05771f8a">
							<dl>
								<dt>
									<svg class="svgicon" width="16px" height="16px" x="0" y="0" viewBox="0 0 512 512"><g><path d="M26.668 298.668h94.227L101.44 482.582c-.086.555-.109 2.195-.109 2.75 0 14.7 11.969 26.668 26.668 26.668 8.363 0 16.34-4.012 21.633-11.113L336 234.668a26.865 26.865 0 0 0 5.332-16c0-14.7-11.965-26.668-26.664-26.668H199.34l19.2-162.2c.062-.616.105-2.515.105-3.132C218.668 11.968 206.699 0 192 0c-8.363 0-16.34 4.012-21.8 11.328L5.331 256A26.857 26.857 0 0 0 0 272c0 14.7 11.969 26.668 26.668 26.668zm0 0"></path></g></svg>
                                     Ratio≥200%
								</dt>
								<dd>Low risk</dd>
							</dl>
							<dl>
								<dt>
									<svg class="svgicon" width="16px" height="16px" x="0" y="0" viewBox="0 0 512 512"><g><path d="M26.668 298.668h94.227L101.44 482.582c-.086.555-.109 2.195-.109 2.75 0 14.7 11.969 26.668 26.668 26.668 8.363 0 16.34-4.012 21.633-11.113L336 234.668a26.865 26.865 0 0 0 5.332-16c0-14.7-11.965-26.668-26.664-26.668H199.34l19.2-162.2c.062-.616.105-2.515.105-3.132C218.668 11.968 206.699 0 192 0c-8.363 0-16.34 4.012-21.8 11.328L5.331 256A26.857 26.857 0 0 0 0 272c0 14.7 11.969 26.668 26.668 26.668zm0 0"></path></g></svg>
                                     Ratio&lt;200%
								</dt>
								<dd>Disable transfers and withdrawals of margin assets</dd>
							</dl>
							<dl>
								<dt>
									<svg class="svgicon" width="16px" height="16px" x="0" y="0" viewBox="0 0 512 512"><g><path d="M26.668 298.668h94.227L101.44 482.582c-.086.555-.109 2.195-.109 2.75 0 14.7 11.969 26.668 26.668 26.668 8.363 0 16.34-4.012 21.633-11.113L336 234.668a26.865 26.865 0 0 0 5.332-16c0-14.7-11.965-26.668-26.664-26.668H199.34l19.2-162.2c.062-.616.105-2.515.105-3.132C218.668 11.968 206.699 0 192 0c-8.363 0-16.34 4.012-21.8 11.328L5.331 256A26.857 26.857 0 0 0 0 272c0 14.7 11.969 26.668 26.668 26.668zm0 0"></path></g></svg>
                                     Ratio&lt;150%
								</dt>
								<dd>Trigger a margin call</dd>
							</dl>
							<dl>
								<dt>
									<svg class="svgicon" width="16px" height="16px" x="0" y="0" viewBox="0 0 512 512"><g><path d="M26.668 298.668h94.227L101.44 482.582c-.086.555-.109 2.195-.109 2.75 0 14.7 11.969 26.668 26.668 26.668 8.363 0 16.34-4.012 21.633-11.113L336 234.668a26.865 26.865 0 0 0 5.332-16c0-14.7-11.965-26.668-26.664-26.668H199.34l19.2-162.2c.062-.616.105-2.515.105-3.132C218.668 11.968 206.699 0 192 0c-8.363 0-16.34 4.012-21.8 11.328L5.331 256A26.857 26.857 0 0 0 0 272c0 14.7 11.969 26.668 26.668 26.668zm0 0"></path></g></svg>
                                     Ratio&lt;100%
								</dt>
								<dd>Trigger liquidation to liquidate all margin assets in the spot account</dd>
							</dl>
						</div>
					</div>
					<div class="_5e81b574">
						<div class="_609fdc83">How to increase the margin ratio?</div>
						<div class="_409b5496">
							<dl>
								<dt>Repay</dt>
								<dd>
									Deposits and purchases of the currencies borrowed will be used for repayment first
								</dd>
							</dl>
							<dl>
								<dt>Add margin</dt>
								<dd>
									Deposit or purchase any margin asset (<a target="_blank" href="/fee"
										>"Margin Asset List"</a 
									>)
								</dd>
							</dl>
						</div>
					</div>
				</div>
				<div class="e62895b5"><div class="_6a7c73e2"></div></div>
			</section>
			<!---->
		</div>
	</div>
</div>
