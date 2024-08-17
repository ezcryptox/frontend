<script>
	import { getContext, onMount } from 'svelte';
	import { calculateTextWidth, findPos } from '../utils';
	export let autoBorrow = false;
	export let progress;
	let startX;
	let progressDiv;
	$: currentX = 0;
	$: percentage = 0;
	$: isDragging = false;
	onMount(() => {
		setProgress(progress);
	});
	function setProgress(progress) {
		if (!progressDiv) return;
		const maxWidth = progressDiv.clientWidth;
		updateProgress((maxWidth * progress) / 100, maxWidth);
	}

	function handleDrag(event) {
		if (!progressDiv) return;
		const deltaX = event.clientX - startX;
		const maxWidth = progressDiv.clientWidth;
		updateProgress(Math.max(0, Math.min(maxWidth, currentX + deltaX)), maxWidth);
		startX = event.clientX; // Update startX for the next move
		isDragging = true;
	}
	function moveBy(step) {
		if (!progressDiv) return;
		const maxWidth = progressDiv.clientWidth;
		updateProgress(maxWidth * (0.25 * step), maxWidth);
	}
	function updateProgress(progress, max) {
		currentX = progress;
		percentage = Math.round((currentX / max) * 100);
	}

	function handleMouseDown(event) {
		startX = event.clientX;
		document.addEventListener('mousemove', handleDrag);
		document.addEventListener('mouseup', handleMouseUp);
	}

	function handleMouseUp() {
		document.removeEventListener('mousemove', handleDrag);
		document.removeEventListener('mouseup', handleMouseUp);
		isDragging = false;
	}
	export let onboardingData;
	$: onboarding = false;
	let _onboardingFocusRef = null;
	const updateData = getContext('updateOnboardingData');

	$: {
		if (_onboardingFocusRef && onboardingData) {
			if (onboardingData.show) setProgress(50);
			else setProgress(0);
			if (onboardingData.show && onboardingData.step === 2 && onboardingData.id !== 'deposit') {
				const coordinate = findPos(_onboardingFocusRef);

				updateData({
					...onboardingData,
					id: 'deposit',
					title: 'Deposit',
					message: 'Deposit digital assets for trading',
					top: coordinate[3] + 20,
					left: coordinate[1] - onboardingData.width + 30,
					target: 90
				});
			}
			onboarding = onboardingData.show && onboardingData.step === 2;
		}
	}
</script>

<div data-key="" class="form-item" data-v-39752d79="">
	<!---->
	<div class="form-item-content">
		<div class="c1494ea4">
			<dl>
				<dt
					class="el-tooltip tips-text _69279727 tooltip"
					data-tip="The amount of the chosen currency you can trade without borrowing, excluding the assets in use."
					tabindex="0"
				>
					Available
				</dt>
				<dd>
					<span class="dcf97881">0.00</span><span>USDT</span>
					<a
						bind:this={_onboardingFocusRef}
						user-guide="2"
						href="/wallet/deposit/BTC/"
						style={onboarding ? 'pointer-events: none; z-index: 1000002; position: relative;' : ''}
						class="dfad9a60 {onboarding ? 'c806c316' : ''}"
					>
						<svg width="14" height="14" x="0" y="0" viewBox="0 0 6.35 6.35" fill="#1a8f5c"
							><g
								><path
									d="M3.174.202C1.535.202.202 1.537.202 3.176s1.333 2.972 2.972 2.972 2.975-1.333 2.975-2.972S4.813.202 3.174.202zm0 .529a2.442 2.442 0 0 1 2.445 2.445c0 1.353-1.092 2.443-2.445 2.443S.731 4.53.731 3.176A2.44 2.44 0 0 1 3.174.731zM3.17 1.848a.265.265 0 0 0-.26.27v.792h-.792a.265.265 0 0 0 0 .53h.792v.792a.265.265 0 1 0 .53 0V3.44h.793a.265.265 0 0 0 0-.53H3.44v-.793a.265.265 0 0 0-.27-.27z"
								></path></g
							></svg
						>
					</a>
				</dd>
			</dl>
		</div>
		<!---->
	</div>
</div>

<div class="c37e339e" data-v-39752d79="">
	<div class="_8896a707">
		<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
		<em
			class="_801097a7"
			style="transform: translateX({currentX}px); z-index: 200000"
			on:mousedown={handleMouseDown}
		>
			<span class={isDragging ? '_9de842b1' : ''}>{percentage}%</span></em
		>

		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div bind:this={progressDiv} class="_058566e8">
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<span
				class="a8700312 {percentage >= 0 ? '_9de842b1' : ''}"
				on:click={() => moveBy(0)}
				style="width: 0%;"><em></em></span
			>
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<span
				class="a8700312 {percentage >= 25 ? '_9de842b1' : ''}"
				on:click={() => moveBy(1)}
				style="width: 25%;"><em></em></span
			>
			<!-- remove _48576cc9 to remove orange progress-->
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<span
				class="a8700312 {percentage >= 50 ? '_9de842b1' : ''} _48576cc9"
				on:click={() => moveBy(2)}
				style="width: 25%;"><em></em></span
			>
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<span
				class="a8700312 {percentage >= 75 ? '_9de842b1' : ''} _48576cc9"
				on:click={() => moveBy(3)}
				style="width: 25%;"><em></em></span
			>
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<span
				class="a8700312 {percentage >= 100 ? '_9de842b1' : ''} _48576cc9"
				on:click={() => moveBy(4)}
				style="width: 25%;"><em></em></span
			>
		</div>

		<div class="fc6cc505">
			<span></span>
			<span style="width: 67%;"></span>
			<!-- add to style="display: none;" -->
		</div>
		<div class="_5803cb7f" style="width: {percentage}%;">
			<span style="width: 80px;"></span>
			<span></span>
			<!-- add to style="display: none;" -->
		</div>
	</div>
</div>

<div class="c1783486" data-v-39752d79="">
	{#if autoBorrow}
		<dl>
			<dt>
				<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
				<span
					class="el-tooltip tips-text _6dd30582 focusing tooltip tooltip-overlay"
					data-tip="Max Available refers to the maximum amount of the chosen currency you can trade with borrowing, which equals your available amount plus the borrowable amount. It equals your available amount when the currency does not support borrowing or the borrowable amount is reduced to zero."
					tabindex="0">Max Available</span
				>
			</dt>
			<dd class="_75ff0e99">0.00 USDT</dd>
		</dl>
		<dl>
			<dt>
				<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
				<span
					class="el-tooltip tips-text _6dd30582 tooltip tooltip-overlay"
					data-tip="You will need to borrow funds when your order amount exceeds the available amount."
					aria-describedby="el-tooltip-7357"
					tabindex="0">Borrow</span
				>
			</dt>
			<dd class="c4065325">0.00 USDT</dd>
		</dl>
		<dl style="display: none;">
			<dt>
				<span class="el-tooltip tips-text _6dd30582" aria-describedby="el-tooltip-3387" tabindex="0"
					>Repay</span
				>
			</dt>
			<dd class="c4065325">BTC</dd>
		</dl>
	{/if}
</div>
