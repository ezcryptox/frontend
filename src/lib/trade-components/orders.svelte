<script>
	import OrderTabs from './ordertabs/open-orders.svelte';
	import OrderHistory from './ordertabs/order-history.svelte';
	import TradeHistory from './ordertabs/trade-history.svelte';
	import Assets from './ordertabs/assets.svelte';
	import { findPos } from './utils';
	import { isLogin } from '$lib/store/profile';
	import { getContext } from 'svelte';
	import { dataRefreshKey, hideCanceledOrders, hideOtherPairs, openOrders } from './store';
	import { ServerURl } from '$lib/backendUrl';
	import { handleAuthToken } from '$lib/store/routes';
	import axios from 'axios';
	import { currentSelectedPair } from '$lib/store/marketdata';
	import { toast } from 'svelte-sonner';
	export let onboardingData;
	let tabs = ['Open Orders', 'Order History', 'Trade History', 'Assets'];
	let selectedTab = 0;
	$: showCancelOrderMenu = false;
	let showCancelOrderMenuId;
	let buttonRef;
	let dropDownMenuCoordinate;

	$: cancelingOrder = false;
	const onCancelCurrentTradingPairOrder = () => {
		if (!$isLogin || cancelingOrder || !openOrders) return;
		const p = $currentSelectedPair;
		if (!p) return;
		axios
			.post(`${ServerURl()}/api/spot/cancel-all-orders?pair=${p.displayName}`, {}, {
				headers: {
					'Content-type': 'application/json',
					Authorization: `Bearer ${$handleAuthToken}`
				}
			})
			.then(() => {
				toast.success('Order canceled successfully');
				dataRefreshKey.update(p => p++)
			})
			.finally(() => {
				cancelingOrder = false;
			});
	};
	const onCancelAllOrder = () => {
		if (!$isLogin || cancelingOrder) return;
		const p = $currentSelectedPair;
		if (!p) return;
		axios
			.post(`${ServerURl()}/api/spot/cancel-all-orders?pair=${p.displayName}`,{}, {
				headers: {
					'Content-type': 'application/json',
					Authorization: `Bearer ${$handleAuthToken}`
				}
			})
			.catch()
			.then(() => {
				toast.success('Order canceled successfully');
				dataRefreshKey.update(p => p++)
			})
			.finally(() => {
				cancelingOrder = false;
			});
	};
	$: _hideOrderPairs = false;
	$: _hideCanceledOrders = false;
	$: onboarding = false;
	let _onboardingFocusRef = null;
	$: selectedActionID = 0;
	const orderActions = [
		{
			id: 0,
			label: 'Cancel orders of the current trading pair'
		},
		{
			id: 1,
			label: 'Cancel All'
		}
	];
	const updateData = getContext('updateOnboardingData');
	$: {
		hideOtherPairs.set(_hideOrderPairs);
		hideCanceledOrders.set(_hideCanceledOrders);
	}
	$: {
		if (_onboardingFocusRef) {
			if (
				onboardingData &&
				onboardingData.show &&
				onboardingData.step === 6 &&
				onboardingData.id !== 'order_and_asset'
			) {
				const coordinate = findPos(_onboardingFocusRef);
				updateData({
					...onboardingData,
					id: 'order_and_asset',
					title: 'Orders and assets',
					message: 'View your open orders and spot assets here.',
					top: coordinate[3] + 20,
					left: coordinate[1],
					target: 50,
					placeLeft: false
				});
			}
			onboarding = onboardingData.show && onboardingData.step === 6;
		}
	}
</script>

<div class="_15e27295">
	<section class="_96f68a1c">
		<div class="_43a2945c">
			<div
				bind:this={_onboardingFocusRef}
				user-guide="6"
				class="_6bf69178 {onboarding ? 'c806c316' : ''}"
				style={onboarding ? 'pointer-events: none; z-index: 1000002; position: relative;' : ''}
			>
				<div class="_667a0527">
					{#each tabs as name, index}
						<!-- svelte-ignore a11y-click-events-have-key-events -->
						<!-- svelte-ignore a11y-no-static-element-interactions -->
						<span
							class={selectedTab === index ? '_667a0527' : ''}
							on:click={() => (selectedTab = index)}>{name}</span
						>
					{/each}
				</div>
			</div>
			{#if $isLogin}
				{#if selectedTab === 0}
					<div class="e75d47dd">
						<div class="_1cbd22e3">
							{#each orderActions as action}
								{#if action.id === selectedActionID}
									<button
										disabled={cancelingOrder || !$openOrders}
										bind:this={buttonRef}
										on:click={() =>
											!action.id ? onCancelCurrentTradingPairOrder() : onCancelAllOrder()}
										class="_2fcd4389 {(cancelingOrder || !$openOrders) && !action.id ? 'opacity-45 pointer-events-none cursor-not-allowed' : ''}"
									>
										{action.label}
									</button>
								{/if}
							{/each}
							<div class="el-dropdown {cancelingOrder ? ' pointer-events-none opacity-45' : ''}">
								<!-- svelte-ignore missing-declaration -->
								<!-- svelte-ignore missing-declaration -->
								<!-- svelte-ignore a11y-mouse-events-have-key-events -->
								<span
									class="a3b16f38 el-dropdown-selfdefine"
									aria-controls="dropdown-menu-1041"
									role="button"
									on:mouseover={(e) => {
										if (cancelingOrder) return;
										dropDownMenuCoordinate = findPos(buttonRef);
										showCancelOrderMenu = true;
									}}
									on:mouseleave={() => {
										showCancelOrderMenuId = setTimeout(() => {
											showCancelOrderMenu = false;
											clearTimeout(showCancelOrderMenuId);
										}, 300);
									}}
									tabindex="0"
									><svg
										width="14"
										height="14"
										viewBox="0 0 14 14"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
										><path
											fill-rule="evenodd"
											clip-rule="evenodd"
											d="M10.3291 6.24581L7.41243 9.16248C7.18462 9.39028 6.81528 9.39028 6.58747 9.16248L3.6708 6.24581C3.30332 5.87833 3.56359 5.25 4.08328 5.25H9.91662C10.4363 5.25 10.6966 5.87833 10.3291 6.24581Z"
											fill="#616161"
										></path><rect x="0.5" y="0.5" width="13" height="13" rx="1.5" stroke="#E3E3E3"
										></rect></svg
									></span
								>
							</div>
						</div>

						<label class="_24fd45b5"
							><input  type="checkbox" bind:checked={_hideOrderPairs} /><i
								><svg
									width="12"
									height="12"
									viewBox="0 0 12 12"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
									style={_hideOrderPairs ? '' : 'display: none;'}
									><path
										fill-rule="evenodd"
										clip-rule="evenodd"
										d="M12 0H0V12H12V0ZM5.53217 9.093L10.0606 3.9985L8.9395 3.00195L5.46794 6.90745L3.53039 4.9699L2.46973 6.03056L5.53217 9.093Z"
										fill="#ffffff"
									></path></svg
								></i
							>Hide Other Pairs</label
						>
					</div>
				{:else if selectedTab === 1}
					<div class="e75d47dd">
						<label class="_24fd45b5"
							><input bind:checked={_hideCanceledOrders} type="checkbox" /><i
								><svg
									width="12"
									height="12"
									viewBox="0 0 12 12"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
									style={_hideCanceledOrders ? '' : 'display: none;'}
									><path
										fill-rule="evenodd"
										clip-rule="evenodd"
										d="M12 0H0V12H12V0ZM5.53217 9.093L10.0606 3.9985L8.9395 3.00195L5.46794 6.90745L3.53039 4.9699L2.46973 6.03056L5.53217 9.093Z"
										fill="#ffffff"
									></path></svg
								></i
							>Hide canceled orders</label
						>
					</div>
				{:else if selectedTab === 2}
					<div class="e75d47dd"><a href="/activity/spot/trades/">All Orders</a></div>
				{/if}
			{/if}
		</div>

		{#if selectedTab === 0}
			<OrderTabs />
		{:else if selectedTab === 1}
			<OrderHistory />
		{:else if selectedTab === 2}
			<TradeHistory />
		{:else if selectedTab === 3}
			<Assets />
		{/if}
	</section>
</div>
{#if showCancelOrderMenu}
	<!-- svelte-ignore missing-declaration -->
	<!-- svelte-ignore missing-declaration -->
	<!-- svelte-ignore a11y-mouse-events-have-key-events -->
	<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
	<ul
		on:mouseover={() => {
			showCancelOrderMenu = true;
			clearTimeout(showCancelOrderMenuId);
		}}
		on:mouseleave={() => {
			showCancelOrderMenuId = setTimeout(() => {
				showCancelOrderMenu = false;
				clearTimeout(showCancelOrderMenuId);
			}, 300);
		}}
		class="el-dropdown-menu el-popper _51739a5a"
		id="dropdown-menu-8467"
		style="transform-origin: center top; 
						top: {dropDownMenuCoordinate[0]}px; 
						left:{dropDownMenuCoordinate[1] + buttonRef.clientWidth}px; z-index: 1020237;"
	>
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<li
			tabindex="-1"
			on:click={() => {
				selectedActionID = 0;
				showCancelOrderMenu = false;
			}}
			class="el-dropdown-menu__item _63c230dd"
		>
			Cancel orders of the current trading pair
		</li>
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<li
			tabindex="-1"
			on:click={() => {
				selectedActionID = 1;
				showCancelOrderMenu = false;
			}}
			class="el-dropdown-menu__item _63c230dd"
		>
			Cancel all
		</li>
	</ul>
{/if}
