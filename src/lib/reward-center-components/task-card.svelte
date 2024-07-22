<script>
    import { onMount } from "svelte";
    import { isLogin } from "$lib/store/profile";
    let now = new Date();
    $: tooltip_id = 0;
    $: tooltip_value = "";
 
    export let id;
    export let seatsOffered;
    export let amount;
    export let coupon;
    export let reward;
    export let description;
    export let progress;
    export let progressMax;
    export let expiration;
    export let button;
    export let hasClaimed = false;
    let progressText = `${progress} / ${progressMax}`
  
    $: claimed = hasClaimed;
    $: complete = claimed? true: progress >= progressMax;
    button = complete? "Claim reward" : claimed ? "Received" : button
   

    const onButtonClicked = ()=> {
        if(claimed) return
        claimed = true; // test

        if(complete){
            // claimed the reward
        }
        else if(!isLogin){
          
        }
        else {

        }
    
    }

    const onHover = (id, value) => {
        tooltip_id = id;
        tooltip_value = value;
    };

    $: getDaysLeft = (expiration, now) => {
        const timeLeft = expiration - now;
        if (timeLeft <= 0) return 0;
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        return days;
    };

    $: getHoursLeft = (expiration, now) => {
        const timeLeft = expiration - now;
        if (timeLeft <= 0) return 0;
        const hours = Math.floor(
            (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        );
        return hours;
    };

    $: getMinutesLeft = (expiration, now) => {
        const timeLeft = expiration - now;
        if (timeLeft <= 0) return 0;
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        return minutes;
    };

    $: getSecondsLeft = (expiration, now) => {
        const timeLeft = expiration - now;
        if (timeLeft <= 0) return 0;
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        return seconds;
    };

    onMount(() => {
        const interval = setInterval(() => {
            now = new Date();
        }, 1000);

        return () => clearInterval(interval);
    });
</script>

<div data-id={id} class="cb807b04 {claimed?"_487af95e":""}">
    {#if seatsOffered && !claimed}
    <span class="_7fc3b9df text-normal font-semibold">
        {seatsOffered} seats offered
    </span>
    {/if}
    <div class="_397d70c4">
        <div class="d7a949cf {claimed?"_5d977ec2":""}">
            <div class="_2aaf88de _57f4732b">
                <span class="b7769849">
                    <small>$</small><strong>{amount}</strong>
                </span>
            </div>
            <span class="e4061209 text-small text-strong">
                {coupon}
            </span>
        </div>
        {#if claimed}
            <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M78.5405 39.7869C78.5405 60.8624 61.3182 77.961 40.0567 77.961C18.7953 77.961 1.57294 60.8624 1.57294 39.7869C1.57294 18.7113 18.7953 1.61279 40.0567 1.61279C61.3182 1.61279 78.5405 18.7113 78.5405 39.7869Z" stroke="#B8B8B8" stroke-width="2"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M60.7018 60.6223C51.5446 69.6816 37.0734 71.9217 25.3365 65.1985C13.5997 58.4754 8.31941 44.9213 11.6484 32.5235L11.1991 32.2661C7.74029 44.9125 13.1078 58.7699 25.0851 65.6307C37.0623 72.4915 51.8418 70.1748 61.1511 60.8797L60.7018 60.6223ZM18.9405 19.7377C28.0752 10.3787 42.7725 7.9901 54.6634 14.8014C66.5542 21.6128 71.8179 35.4355 68.2161 47.9638L68.6634 48.22C72.3963 35.4442 67.0458 21.3181 54.9148 14.3693C42.7839 7.42042 27.7785 9.88612 18.4932 19.4815L18.9405 19.7377Z" fill="#B8B8B8"></path><path d="M29.3346 47.1762L29.3323 47.1687L29.3298 47.1612L24.7298 33.3871C24.3008 31.9382 25.1456 30.4902 26.6268 30.138C28.1325 29.7801 29.7213 30.6905 30.1605 32.162L30.176 32.2138L30.2022 32.261L34.6167 40.2018L34.7999 40.5312L35.1692 40.4447L56.8232 35.3745L56.8251 35.374C58.3313 35.0151 59.9198 35.9254 60.3585 37.3978L60.3587 37.3985C60.7936 38.8503 59.9487 40.3023 58.464 40.6545L58.442 40.6597L58.4206 40.6669L32.8485 49.206C32.1352 49.3698 31.3635 49.2537 30.7026 48.8751C30.0352 48.4928 29.5449 47.8796 29.3346 47.1762Z" fill="#B8B8B8" stroke="#B8B8B8"></path><path d="M17.046 22.7726L16.6968 24.4027C16.6063 24.825 16.7992 25.2564 17.1748 25.4715L18.6258 26.3027L16.9636 26.476C16.5303 26.5212 16.1748 26.8393 16.084 27.2631L15.736 28.8876L15.0524 27.3642C14.8761 26.9715 14.4658 26.7365 14.0349 26.7814L12.3634 26.9557L13.6074 25.8445C13.9319 25.5545 14.0318 25.0901 13.8546 24.6951L13.1748 23.1802L14.6258 24.0114C15.0014 24.2265 15.4744 24.1766 15.7978 23.8877L17.046 22.7726Z" fill="#B8B8B8" stroke="#B8B8B8"></path><path d="M66.6271 51.1739L66.2779 52.8041C66.1874 53.2264 66.3803 53.6577 66.7558 53.8729L68.2069 54.7041L66.5447 54.8774C66.1113 54.9226 65.7559 55.2406 65.6651 55.6645L65.317 57.289L64.6334 55.7656C64.4572 55.3729 64.0469 55.1379 63.616 55.1828L61.9445 55.3571L63.1884 54.2458C63.513 53.9559 63.6129 53.4914 63.4356 53.0965L62.7559 51.5816L64.2069 52.4128C64.5824 52.6279 65.0554 52.578 65.3788 52.2891L66.6271 51.1739Z" fill="#B8B8B8" stroke="#B8B8B8"></path></svg>
        {/if}
    </div>

    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <!-- svelte-ignore a11y-mouse-events-have-key-events -->
    <div
        class="_8b0ef0d8 font-bold text-strong text-medium {tooltip_id === id
            ? 'ant-tooltip-open'
            : ''}"
        on:mouseover={() => onHover(id, reward)}
        on:mouseleave={() => onHover(0, "")}
    >
        {reward}
    </div>
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <!-- svelte-ignore a11y-mouse-events-have-key-events -->
    <div
        class="b331b321 text-gray text-normal {tooltip_id === id
            ? 'ant-tooltip-open'
            : ''}"
        on:mouseover={() => onHover(id, description)}
        on:mouseleave={() => onHover(0, "")}
    >
        {description}
    </div>

    {#if progressMax && !claimed}
        <div class="a5aaef2b">
            <div class="_9dccb372">
                <div class="_5e327c62" style="--percent: {progress}%;"></div>
                <span class="fd8c3c5b text-normal font-semibold">
                    {progressText}
                </span>
            </div>
        </div>
    {:else}
        <div class="a5aaef2b">
            <div class="_75a0e437"></div>
        </div>
    {/if}
    <div class="dd5fa101">
        {#if expiration && !complete && !claimed}
        <div data-v-6acfb068="" class="countdown">
            <div data-v-6acfb068="" class="expiration text-gray">
                Expiration
            </div>
            <ul data-v-6acfb068="" class="countDownWraper">
                <li data-v-6acfb068="" class="day">
                    {getDaysLeft(expiration, now)}
                </li>
                <span data-v-6acfb068="" class="colon">-</span>
                <li data-v-6acfb068="" class="hour">
                    {getHoursLeft(expiration, now)}
                </li>
                <span data-v-6acfb068="" class="colon">:</span>
                <li data-v-6acfb068="" class="minute">
                    {getMinutesLeft(expiration, now)}
                </li>
                <span data-v-6acfb068="" class="colon">:</span>
                <li data-v-6acfb068="" class="second">
                    {getSecondsLeft(expiration, now)}
                </li>
            </ul>
        </div>
        {/if}
        <button
            type="button"
            disabled={claimed ? "disabled" : undefined}
            on:click={() => onButtonClicked()}
            class={complete ? "polo-btn polo-btn-button polo-btn-primary polo-btn-huge is-disabled _4607639f" : "polo-btn polo-btn-button polo-btn-primary polo-btn-huge d998e3fe"}
        >
            <div class="btn-sp">{button}</div>
        </button>
    </div>

    <div style="position: absolute; top: 0px; left: 0px; width: 100%;">
        <div>
            <div
                class="ant-tooltip _996f1b3e ant-tooltip-placement-top"
                style="left: 30.2578px; top: 103.016px; transform-origin: 50% 86.9219px; {tooltip_id ===
                    id && tooltip_value === description
                    ? ''
                    : 'display: none;'}"
            >
                <div class="ant-tooltip-content">
                    <div class="ant-tooltip-arrow"></div>
                    <div role="tooltip" class="ant-tooltip-inner">
                        {description}
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div style="position: absolute; top: 0px; left: 0px; width: 100%;">
        <div>
            <div
                class="ant-tooltip _996f1b3e ant-tooltip-placement-top"
                style="left: 134.042px; top: 98.6239px; transform-origin: 50% 44.9688px; {tooltip_id ===
                    id && tooltip_value === reward
                    ? ''
                    : 'display: none;'}"
            >
                <div class="ant-tooltip-content">
                    <div class="ant-tooltip-arrow"></div>
                    <div role="tooltip" class="ant-tooltip-inner">
                        {reward}
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
