<script>
	import { getContext } from 'svelte';

	$: title = '';
	$: message = '';
	$: top = '';
	$: left = '';
	$: right = '';
	$: bottom = '';
	$: target = '';
	$: placeLeft = false;
	$: step = 1;
	const cancelOnBoarding = getContext('toggleOnBoarding');
	export let onboardingData;
	let updateData = getContext('updateOnboardingData');
	const onNextTip = () => {
		if (step === 6) cancelOnBoarding(true);
		else {
			step++;
			updateData({
				...onboardingData,
				step: step,
				width: 280 // width of component
			});
		}
	};

	// Listen for changes in the context value

	$: {
		if (onboardingData && onboardingData.show) {
			title = onboardingData.title;
			message = onboardingData.message;

			top = onboardingData.top || 'auto';
			left = onboardingData.left || 'auto';
			target = onboardingData.target || '';
			right = onboardingData.right || '';
			bottom = onboardingData.bottom || '';
			placeLeft = onboardingData.placeLeft || false;
		}
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	id="guideLayer"
    on:click={()=> cancelOnBoarding()}
	style="inset: 0px; z-index: 1000001; position: fixed; background: rgba(0, 0, 0, 0.6);"
></div>

<div
	id="guideTips"
	class="_58875e24"
	style="top: {top}px; left: {left}px; {right ? `right: ${right}px;` : ''} {bottom
		? `bottom: ${bottom}px;`
		: ''}  opacity: 1;"
>
	<div class="_71d4289c">
		{#if placeLeft}
			<i placement="left" class="bb4a3105"></i>
		{:else}
			<i placement="bottom" class="bb4a3105" style={target ? `left: ${target}%;` : ''}></i>
		{/if}
		<div class="_17b9e35d">
			<div>
				{#if step === 1}
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						><path
							fill-rule="evenodd"
							clip-rule="evenodd"
							d="M8.90202 4.99955C8.93463 4.9992 8.9673 4.99902 9 4.99902C13.9706 4.99902 18 9.02846 18 13.999C18 14.4797 17.9623 14.9515 17.8898 15.4118C21.3774 14.634 23.9844 11.5209 23.9844 7.7989C23.9844 3.49115 20.4923 -0.000976868 16.1845 -0.000977244C12.8634 -0.000977535 10.027 2.0747 8.90202 4.99955Z"
							fill="url(#paint0_linear_7774_52402)"
						></path><path
							fill-rule="evenodd"
							clip-rule="evenodd"
							d="M7.79988 23.2101C12.1076 23.2101 15.5998 19.718 15.5998 15.4102C15.5998 11.1025 12.1076 7.61035 7.79988 7.61035C3.49212 7.61035 0 11.1025 0 15.4102C0 19.718 3.49212 23.2101 7.79988 23.2101ZM10.9202 15.41L7.79979 12.2896L4.67936 15.41L7.79979 18.5304L10.9202 15.41Z"
							fill="url(#paint1_linear_7774_52402)"
						></path><defs
							><linearGradient
								id="paint0_linear_7774_52402"
								x1="16"
								y1="7.99902"
								x2="22.4124"
								y2="6.55752"
								gradientUnits="userSpaceOnUse"
								><stop stop-color="#B6B6B6"></stop><stop offset="1" stop-color="#D8D8D8"
								></stop></linearGradient
							><linearGradient
								id="paint1_linear_7774_52402"
								x1="0"
								y1="23.2101"
								x2="15.5998"
								y2="23.2101"
								gradientUnits="userSpaceOnUse"
								><stop stop-color="#1A8F5C"></stop><stop offset="1" stop-color="#4FCF97"
								></stop></linearGradient
							></defs
						></svg>
				{/if}
                {#if step === 2}
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 15.5H21V18.7H11.6301V23.5L3 15.5Z" fill="url(#paint0_linear_7774_53394)"></path><path d="M16.3699 4.5V9.3H7V12.5H25L16.3699 4.5Z" fill="url(#paint1_linear_7774_53394)"></path><defs><linearGradient id="paint0_linear_7774_53394" x1="12.5289" y1="19.6524" x2="6.18444" y2="16.373" gradientUnits="userSpaceOnUse"><stop stop-color="#B6B6B6"></stop><stop offset="1" stop-color="#D8D8D8"></stop></linearGradient><linearGradient id="paint1_linear_7774_53394" x1="7" y1="12.5" x2="25" y2="12.5" gradientUnits="userSpaceOnUse"><stop stop-color="#1A8F5C"></stop><stop offset="1" stop-color="#4FCF97"></stop></linearGradient></defs></svg>
                {/if}
                {#if step === 3}
                <svg width="28" height="28" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.501 18.6a7.8 7.8 0 1 0 0-15.6 7.8 7.8 0 0 0 0 15.6zm3.12-7.8L14.5 7.68l-3.12 3.12 3.12 3.12 3.12-3.12z" fill="url(#a)" fill-rule="evenodd" clip-rule="evenodd"></path><path d="M4 13h19.5l1 1 .5.5V24H4V13z" fill="url(#b)"></path><defs><linearGradient id="a" x1="6.701" y1="18.6" x2="22.301" y2="18.6" gradientUnits="userSpaceOnUse"><stop stop-color="#1A8F5C"></stop><stop offset="1" stop-color="#4FCF97"></stop></linearGradient><linearGradient id="b" x1="15.117" y1="18.709" x2="7.251" y2="15.26" gradientUnits="userSpaceOnUse"><stop stop-color="#B6B6B6"></stop><stop offset="1" stop-color="#D8D8D8"></stop></linearGradient></defs></svg>
                {/if}
                {#if step === 4}
                    <svg width="28" height="28" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28"><path d="M12.7629 18.1127C16.4494 18.1127 19.4379 15.1242 19.4379 11.4377C19.4379 7.75119 16.4494 4.7627 12.7629 4.7627C9.07639 4.7627 6.08789 7.75119 6.08789 11.4377C6.08789 15.1242 9.07639 18.1127 12.7629 18.1127ZM15.4333 11.4374L12.7629 8.76695L10.0925 11.4374L12.7629 14.1078L15.4333 11.4374Z" fill="url(#paint0_linear_7774_55424)" fill-rule="evenodd" clip-rule="evenodd"></path><path d="M6.3 16.125L3 19.5L8.5 24L9.6 22.875H17.3L25 15H22.8L16.2 18.9375H14L16.2 17.25V16.125H6.3Z" fill="url(#paint1_linear_7774_55424)"></path><defs><linearGradient id="paint0_linear_7774_55424" x1="6.08789" y1="18.1127" x2="19.4379" y2="18.1127" gradientUnits="userSpaceOnUse"><stop stop-color="#1A8F5C"></stop><stop offset="1" stop-color="#4FCF97"></stop></linearGradient><linearGradient id="paint1_linear_7774_55424" x1="14.6465" y1="19.6714" x2="7.17608" y2="15.4764" gradientUnits="userSpaceOnUse"><stop stop-color="#B6B6B6"></stop><stop offset="1" stop-color="#D8D8D8"></stop></linearGradient></defs></svg>
                {/if}
                {#if step === 5}
                    <svg width="28" height="29" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 29"><path d="M18 21.1709V22.1709C18 22.7013 17.7893 23.21 17.4142 23.5851C17.0391 23.9602 16.5304 24.1709 16 24.1709H12C11.4696 24.1709 10.9609 23.9602 10.5858 23.5851C10.2107 23.21 10 22.7013 10 22.1709V21.1709H18Z" fill="url(#paint0_linear_7774_56535)"></path><path d="M9.9412 19.1709C9.72141 18.2288 8.93039 17.4138 8.31107 16.7757L8.31106 16.7756C8.09353 16.5515 7.89717 16.3492 7.7542 16.1709C6.81239 14.9942 6.22215 13.5753 6.05147 12.0778C5.88078 10.5803 6.1366 9.06508 6.78946 7.70662C7.44231 6.34815 8.46564 5.20175 9.74156 4.39946C11.0175 3.59717 12.4941 3.17164 14.0013 3.17188C15.5085 3.17212 16.985 3.59812 18.2606 4.40082C19.5363 5.20352 20.5592 6.35025 21.2117 7.70893C21.8641 9.0676 22.1194 10.5829 21.9482 12.0804C21.7771 13.5778 21.1864 14.9965 20.2442 16.1729C20.1017 16.3504 19.9062 16.5518 19.6897 16.775L19.6897 16.775C19.0706 17.4129 18.2792 18.2285 18.0592 19.1709H16.3949L17.0799 17.2531H17.086C17.2533 16.5366 17.855 15.9166 18.3256 15.4316L18.3256 15.4316C18.4902 15.2619 18.6388 15.1088 18.7472 14.9738C19.4635 14.0795 19.9125 13.001 20.0427 11.8625C20.1728 10.7241 19.9787 9.57207 19.4827 8.53913C18.9867 7.5062 18.209 6.6344 17.2392 6.02415C16.2693 5.4139 15.1468 5.09003 14.001 5.08985C12.8552 5.08966 11.7326 5.41317 10.7625 6.02311C9.79253 6.63305 9.01455 7.50461 8.51821 8.53738C8.02188 9.57015 7.8274 10.7221 7.95716 11.8606C8.08692 12.9991 8.53565 14.0777 9.25166 14.9723C9.36036 15.1079 9.50964 15.2617 9.67502 15.4321C10.1459 15.9172 10.7472 16.5369 10.9143 17.2531H10.9286L11.5397 19.1709H9.9412Z" fill="url(#paint1_linear_7774_56535)" fill-rule="evenodd" clip-rule="evenodd"></path><path d="M15 6.16688V10.1719H17.5L13 16.1719V12.1719H10.5L15 6.16688Z" fill="url(#paint2_linear_7774_56535)"></path><defs><linearGradient id="paint0_linear_7774_56535" x1="14.2351" y1="22.728" x2="11.637" y2="21.1364" gradientUnits="userSpaceOnUse"><stop stop-color="#B6B6B6"></stop><stop offset="1" stop-color="#D8D8D8"></stop></linearGradient><linearGradient id="paint1_linear_7774_56535" x1="14.4702" y1="11.4761" x2="7.68217" y2="9.91667" gradientUnits="userSpaceOnUse"><stop stop-color="#B6B6B6"></stop><stop offset="1" stop-color="#D8D8D8"></stop></linearGradient><linearGradient id="paint2_linear_7774_56535" x1="10.5" y1="16.1719" x2="17.5" y2="16.1719" gradientUnits="userSpaceOnUse"><stop stop-color="#1A8F5C"></stop><stop offset="1" stop-color="#4FCF97"></stop></linearGradient></defs></svg>
                {/if}
                {#if step === 6}
                    <svg width="28" height="29" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 29"><path d="M15 14.1788H24V23.1788H15V14.1788Z" fill="url(#paint0_linear_7774_57528)"></path><path d="M5 5.17883H20V23.1788H7C5.89543 23.1788 5 22.2834 5 21.1788V5.17883Z" fill="url(#paint1_linear_7774_57528)"></path><path d="M11.952 18.3228C11.504 18.3228 11.06 18.2428 10.62 18.0828C10.188 17.9228 9.804 17.6708 9.468 17.3268L10.26 16.2348C10.556 16.4828 10.84 16.6548 11.112 16.7508C11.392 16.8468 11.672 16.8948 11.952 16.8948C12.296 16.8948 12.544 16.8228 12.696 16.6788C12.848 16.5348 12.924 16.3308 12.924 16.0668C12.924 15.8668 12.848 15.6948 12.696 15.5508C12.544 15.4068 12.348 15.2708 12.108 15.1428C11.868 15.0068 11.612 14.8708 11.34 14.7348C11.076 14.5908 10.82 14.4308 10.572 14.2548C10.332 14.0708 10.136 13.8548 9.984 13.6068C9.832 13.3508 9.756 13.0468 9.756 12.6948C9.756 12.2308 9.856 11.8268 10.056 11.4828C10.264 11.1388 10.552 10.8748 10.92 10.6908C11.296 10.5068 11.736 10.4148 12.24 10.4148C12.752 10.4148 13.192 10.5108 13.56 10.7028C13.936 10.8868 14.264 11.1388 14.544 11.4588L13.644 12.4188C13.452 12.2268 13.244 12.0828 13.02 11.9868C12.796 11.8908 12.556 11.8428 12.3 11.8428C12.036 11.8428 11.828 11.9068 11.676 12.0348C11.524 12.1548 11.448 12.3468 11.448 12.6108C11.448 12.7948 11.524 12.9548 11.676 13.0908C11.828 13.2188 12.024 13.3428 12.264 13.4628C12.504 13.5828 12.76 13.7148 13.032 13.8588C13.304 13.9948 13.56 14.1508 13.8 14.3268C14.04 14.5028 14.236 14.7228 14.388 14.9868C14.54 15.2428 14.616 15.5548 14.616 15.9228C14.616 16.3868 14.516 16.7988 14.316 17.1588C14.116 17.5188 13.816 17.8028 13.416 18.0108C13.024 18.2188 12.536 18.3228 11.952 18.3228ZM11.58 19.4988V17.6028H12.744V19.4988H11.58ZM11.58 10.9668V9.23883H12.744V10.9668H11.58Z" fill="white"></path><defs><linearGradient id="paint0_linear_7774_57528" x1="20" y1="22.9991" x2="15.9947" y2="16.448" gradientUnits="userSpaceOnUse"><stop stop-color="#B6B6B6"></stop><stop offset="1" stop-color="#D8D8D8"></stop></linearGradient><linearGradient id="paint1_linear_7774_57528" x1="18" y1="5.17883" x2="5" y2="23.1788" gradientUnits="userSpaceOnUse"><stop stop-color="#4ECD95"></stop><stop offset="1" stop-color="#209562"></stop></linearGradient></defs></svg>
                {/if}
            </div>
			<div class="_041f5925">
				<p class="ef977bdf">{title}</p>
				<p class="_7ff3d09f">{message}</p>
			</div>
		</div>
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div class="d44aba4a">
			<span class="ee4cd985"><b>Step {step}</b>/6</span>
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<div on:click={() => onNextTip()} class="_80bd1167">
				<span on:click={() => cancelOnBoarding(true)} class="_28850b28">Skip</span><span
					class="_26a5e35d">Next</span
				>
			</div>
		</div>
	</div>
</div>
