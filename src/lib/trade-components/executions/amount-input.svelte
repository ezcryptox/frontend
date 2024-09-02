<script>
	import { slideFade } from '$lib/transitions';
	import { onMount } from 'svelte';
	import { findPos } from '../utils';
	export let style = '';
	export let assetLabel;
	export let placeholder = 'Amount';
	export let isBuying = true;
	export let min = 0;
	export let value = 0;

	export let dropdownOption = {
		items: [],
		selectedIndex: 0,
		callback: (selectedIndex) => {}
	};

	$: showDropdownMenu = false;
	let divRef;
	let drowdownMenuId;
	export let decimal = 8;
	export let disableInput = false;
	export let onAmountChanged = (value) => {};
	export let isInsufficient = (value) => {
		return true;
	};
	$: validAmount = checkAmountValid(totalText, min, isBuying);
	let inputRef;
	$: totalAmount = value || 0;
	const getValue = (value) => {
		const _val =
			typeof value === 'number'
				? value.toFixed(decimal)
				: typeof value === 'string'
					? parseFloat(value || '0').toFixed(decimal)
					: '';
		if (isNaN(parseFloat(_val))) return '';

		return parseFloat(_val) <= min ? '' : _val;
	};
	$: totalText = getValue(value);
	$: amountInfo = validateTotalAmountInfo(totalText, isBuying);
	onMount(() => {
		totalText = getValue(value);
	});

	const checkAmountValid = (totalText, min, isBuying) => {
		return (
			!isNaN(parseFloat(totalText)) &&
			parseFloat(totalText) >= min &&
			!isInsufficient(parseFloat(totalText))
		);
	};

	const validateTotalAmountInfo = (totalText, isBuying) => {
		const _totalAmount = parseFloat(totalText);
		if (isNaN(_totalAmount)) return `Please enter ${placeholder}`;
		else if (_totalAmount < min) return `Total must be at least ${min}`;
		else if (isInsufficient(_totalAmount)) return 'Not enough available balance';
		return null;
	};
</script>

<div data-key="amount" class="form-item f3a05fb6" {style} data-v-39752d79="">
	<!---->
	<div class="form-item-content">
		{#if disableInput}
			<div disabled="disabled" class="polo-input right polo-input-small polo-input-default">
				<span class="input-prefix">{placeholder}</span>
			</div>
		{:else}
			<div class="_9bbde898">
				<div
					data-tip={amountInfo}
					style="display: flex!important"
					class="polo-input right polo-input-small polo-input-default {dropdownOption.items.length >
					0
						? '_1ac4ce2c'
						: ''} {validAmount ? '' : 'tooltip tooltip-focus tooltip-overlay error'}"
				>
					<span class="input-prefix">{placeholder}</span>

					<input
						type="text"
						placeholder=""
						bind:this={inputRef}
						value={totalText}
						on:change={() => {
							totalAmount = parseFloat(totalText);
							validAmount = checkAmountValid();
						}}
						on:input={(e) => {
							if (!e.target) return;
							totalText = e.target.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');
							e.target.value = totalText;
							totalAmount = parseFloat(totalText);
							validAmount = checkAmountValid();
							onAmountChanged(totalAmount);
						}}
					/>
					<!-- svelte-ignore a11y-no-static-element-interactions -->
					{#if dropdownOption.items.length > 0}
						<!-- svelte-ignore missing-declaration -->
						<!-- svelte-ignore a11y-mouse-events-have-key-events -->
						<div
							bind:this={divRef}
							class="c3d3da83"
							on:mouseover={(e) => {
								showDropdownMenu = true;
								clearTimeout(drowdownMenuId);
							}}
							on:mouseleave={() => {
								drowdownMenuId = setTimeout(() => {
									showDropdownMenu = false;
									clearTimeout(drowdownMenuId);
								}, 300);
							}}
						>
							<span class="c3d3da83" style="margin-right: 5px;">{assetLabel}</span>
							<svg class="svgicon" width="9px" height="9px" x="0" y="0" viewBox="0 0 32 32"
								><g
									><path
										d="M29.604 10.528 17.531 23.356a2.102 2.102 0 0 1-3.062 0L2.396 10.528c-.907-.964-.224-2.546 1.1-2.546h25.008c1.324 0 2.007 1.582 1.1 2.546z"
									></path></g
								></svg
							>
							<!-- svelte-ignore a11y-mouse-events-have-key-events -->
							{#if showDropdownMenu}
								<ul
									transition:slideFade={{ duration: 200 }}
									on:mouseover={() => {
										showDropdownMenu = true;
										clearTimeout(drowdownMenuId);
									}}
									on:mouseleave={() => {
										drowdownMenuId = setTimeout(() => {
											showDropdownMenu = false;
											clearTimeout(drowdownMenuId);
										}, 300);
									}}
									class="el-dropdown-menu el-popper _5cee1314"
									id="dropdown-menu-5468"
									style="transform-origin: center top; position: absolute; top:calc(100% + 0.0625rem - 0.1875rem);  left:50%; right:auto; bottom:auto; z-index: 1020237;"
								>
									{#each dropdownOption.items as item, index}
										<!-- svelte-ignore a11y-click-events-have-key-events -->
										<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
										<li
											on:click={() => {
												dropdownOption.selectedIndex = index;
												dropdownOption.callback(index);
												showDropdownMenu = false;
											}}
											tabindex="-1"
											class="e45ef080 {dropdownOption.selectedIndex === index ? '_1007348c' : ''}"
										>
											{item}
										</li>
									{/each}
								</ul>
							{/if}
						</div>
					{:else}
						<span class="_3d54521c">{assetLabel}</span>
					{/if}
				</div>
			</div>

			<div class="tool-box" style="display: none;">
				<div class="tooltips">
					<i></i>
				</div>
				<!---->
			</div>
		{/if}
	</div>
</div>
