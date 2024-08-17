<script>
	import { slideFade } from '$lib/transitions'; 
	 

	$: networkStable = false; 
	$: showPopup = false;
	let popupId; 
	$: selectedPopupItem = 1;
	const onPopupItemSelected = (index) => {
		selectedPopupItem = index;
		showPopup = false;
	};
	let menuItems = [
		{ text: 'No Preview', active: false },
		{ text: 'Popular Searches', active: true },
		{ text: 'Favorites', active: false }
	]; 
</script>


<section class="_721fe061">
	
	<section class="ca61bd1e">
		{#if networkStable}
			<div class="_3f69905e">
				<svg
					width="14"
					height="12"
					viewBox="0 0 14 12"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					><rect y="9" width="2" height="3" fill="#1A8F5C"></rect><rect
						x="4"
						y="6"
						width="2"
						height="6"
						fill="#1A8F5C"
					></rect><rect x="8" y="3" width="2" height="9" fill="#1A8F5C"></rect><rect
						x="12"
						y="1"
						width="2"
						height="11"
						fill="#878787"
					></rect></svg
				><span class="_0a8448dd"> Stable connection </span>
			</div>
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		{:else}
			<div class="_3f69905e">
				<svg
					width="14"
					height="12"
					viewBox="0 0 14 12"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					><rect y="9" width="2" height="3" fill="#E59940"></rect><rect
						x="4"
						y="6"
						width="2"
						height="6"
						fill="#E59940"
					></rect><rect x="8" y="3" width="2" height="9" fill="#878787"></rect><rect
						x="12"
						y="1"
						width="2"
						height="11"
						fill="#878787"
					></rect></svg
				><span class="ea2dd907"> Unstable connection </span>
			</div>
			<!-- svelte-ignore a11y-mouse-events-have-key-events -->
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<div class="tooltip" 
				on:mouseover={() => {
					showPopup = true; 
					clearTimeout(popupId);
				}}
				on:mouseleave={() => {
					popupId = setTimeout(() => {
						showPopup = false;
						clearTimeout(popupId);
					}, 300);
				}}
				 
				style="height: 15px; margin-right: 18px;"
			>

			{#if showPopup}
			<!-- svelte-ignore a11y-mouse-events-have-key-events -->
			<ul
				transition:slideFade={{ duration: 200 }}
				on:mouseover={() => {
					showPopup = true;
					clearTimeout(popupId);
				}}
				on:mouseleave={() => {
					popupId = setTimeout(() => {
						showPopup = false;
						clearTimeout(popupId);
					}, 300);
				}}
				class="el-dropdown-menu el-popper"
				id="dropdown-menu-9726"
				style="translateX(-50%); top: auto; 
				left: 50%;
				right: auto;
				bottom:calc(100% + 0.0625rem - 0.1875rem); z-index: 1020043;"
			>
				<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
				{#each menuItems as item, index}
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<li 
						on:click={() => onPopupItemSelected(index)}
						class="_2bffe78d {index === selectedPopupItem ? 'active' : ''}"
					>
						{item.text}
						{#if index === selectedPopupItem}
							<svg style="margin-left: 10px;" class="svgicon" width="10px" height="10px" viewBox="0 0 511.985 511.985"
								><g
									><path
										d="M500.088 83.681c-15.841-15.862-41.564-15.852-57.426 0L184.205 342.148 69.332 227.276c-15.862-15.862-41.574-15.862-57.436 0-15.862 15.862-15.862 41.574 0 57.436l143.585 143.585c7.926 7.926 18.319 11.899 28.713 11.899 10.394 0 20.797-3.963 28.723-11.899l287.171-287.181c15.862-15.851 15.862-41.574 0-57.435z"
									></path></g
								></svg
							>
						{/if}
					</li>
				{/each}
			</ul>
			{/if}


				<span class="ea556df8 el-dropdown-selfdefine" role="button" tabindex="0">
					<svg class="svgicon" width="12px" height="12px" x="0" y="0" viewBox="0 0 32 32"
						><g
							><path
								d="M29.604 10.528 17.531 23.356a2.102 2.102 0 0 1-3.062 0L2.396 10.528c-.907-.964-.224-2.546 1.1-2.546h25.008c1.324 0 2.007 1.582 1.1 2.546z"
							></path></g
						></svg
					>
				</span>
				<ul class="el-dropdown-menu el-popper" id="dropdown-menu-5571" style="display: none;">
					<li class="_2bffe78d">No Preview <!----></li>
					<li class="_2bffe78d active">
						Popular Searches <svg
							aria-hidden="true"
							class="svgicon"
							style="width: 15px; height: 10px; min-width: 0px;"
							><use xlink:href="#checked"></use></svg
						>
					</li>
					<li class="_2bffe78d">Favorites <!----></li>
				</ul>
			</div>
			

		{/if}

		<div class="_4769223d">
			<div class="efb15da4">
				<div data-play="false" class="c105d8c5" style="animation-duration: 50s;">
					<dl class="_11d05b40">
						<dd><span>BTC/USDT</span><span class="_5ebc2b72 _1c7d7aa1">-3.33% </span></dd>
						<dd><span>ETH/USDT</span><span class="_5ebc2b72 _1c7d7aa1">-6.43% </span></dd>
						<dd><span>XRP/USDT</span><span class="_5ebc2b72 _1c7d7aa1">-2.79% </span></dd>
						<dd><span>ADA/USDT</span><span class="_5ebc2b72 _1c7d7aa1">-5.05% </span></dd>
						<dd><span>TRX/USDT</span><span class="_5ebc2b72 _582e025a">+0.62% </span></dd>
					</dl>
					<dl class="_11d05b40 da1b6d3a">
						<dd><span>BTC/USDT</span><span class="_5ebc2b72 _1c7d7aa1">-3.33% </span></dd>
						<dd><span>ETH/USDT</span><span class="_5ebc2b72 _1c7d7aa1">-6.43% </span></dd>
						<dd><span>XRP/USDT</span><span class="_5ebc2b72 _1c7d7aa1">-2.79% </span></dd>
						<dd><span>ADA/USDT</span><span class="_5ebc2b72 _1c7d7aa1">-5.05% </span></dd>
						<dd><span>TRX/USDT</span><span class="_5ebc2b72 _582e025a">+0.62% </span></dd>
					</dl>
				</div>
			</div>
		</div>
	</section>
</section>

	



