<script>
    import SignUpBonus from "../../../lib/reward-center-components/sign-up-bonus.svelte";
    import RedeemCoupon from "../../../lib/reward-center-components/redeem-coupon.svelte";
    import ActiveCoupon from "../../../lib/reward-center-components/coupon-active.svelte";
    import InvalidCoupon from "../../../lib/reward-center-components/coupon-invalid.svelte";
    import { isLogin } from "$lib/store/profile";
    import { getContext } from 'svelte';
    $: contentTabIndex = 0;

    const onContentTabChanged = (index) => {
        contentTabIndex = index;
    };
    
    const toggleCouponHistoryModal = getContext('toggleCouponHistoryModal');

</script>

<div class="coupon">
    <div class="content">
        {#if !isLogin}
        <SignUpBonus />
        {:else}
        <RedeemCoupon />
        {/if}
        
        
        <div class="tabWraper">
            <button on:click={toggleCouponHistoryModal} class="couponLink"
                >Coupon History<svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    ><path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M6.3846 1.83984L5.61554 2.66092L9.18459 6.00386L5.61597 9.33944L6.38417 10.1613L10.8312 6.00472L6.3846 1.83984Z"
                        fill="currentColor"
                    ></path></svg
                ></button
            >
            <div class="ant-tabs ant-tabs-top ant-tabs-line">
                <div
                    role="tablist"
                    tabindex="0"
                    class="ant-tabs-bar ant-tabs-top-bar"
                >
                    <div class="ant-tabs-nav-container">
                        <span
                            unselectable="unselectable"
                            class="ant-tabs-tab-prev ant-tabs-tab-btn-disabled"
                            ><span class="ant-tabs-tab-prev-icon"
                                ><i
                                    aria-label="icon: left"
                                    class="anticon anticon-left ant-tabs-tab-prev-icon-target"
                                    ><svg
                                        viewBox="64 64 896 896"
                                        data-icon="left"
                                        width="1em"
                                        height="1em"
                                        fill="currentColor"
                                        aria-hidden="true"
                                        focusable="false"
                                        class=""
                                        ><path
                                            d="M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 0 0 0 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z"
                                        ></path></svg
                                    ></i
                                ></span
                            ></span
                        ><span
                            unselectable="unselectable"
                            class="ant-tabs-tab-next ant-tabs-tab-btn-disabled"
                            ><span class="ant-tabs-tab-next-icon"
                                ><i
                                    aria-label="icon: right"
                                    class="anticon anticon-right ant-tabs-tab-next-icon-target"
                                    ><svg
                                        viewBox="64 64 896 896"
                                        data-icon="right"
                                        width="1em"
                                        height="1em"
                                        fill="currentColor"
                                        aria-hidden="true"
                                        focusable="false"
                                        class=""
                                        ><path
                                            d="M765.7 486.8L314.9 134.7A7.97 7.97 0 0 0 302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 0 0 0-50.4z"
                                        ></path></svg
                                    ></i
                                ></span
                            ></span
                        >
                        <div class="ant-tabs-nav-wrap">
                            <div class="ant-tabs-nav-scroll">
                                <div class="ant-tabs-nav ant-tabs-nav-animated">
                                    <div>
                                        <!-- svelte-ignore a11y-interactive-supports-focus -->
                                        <!-- svelte-ignore a11y-click-events-have-key-events -->
                                        <div
                                            role="tab"
                                            aria-disabled="false"
                                            aria-selected={contentTabIndex ===
                                                0}
                                            class={contentTabIndex === 0
                                                ? "ant-tabs-tab-active ant-tabs-tab"
                                                : " ant-tabs-tab"}
                                            on:click={() =>
                                                onContentTabChanged(0)}
                                        >
                                            Active
                                        </div>
                                        <!-- svelte-ignore a11y-interactive-supports-focus -->
                                        <!-- svelte-ignore a11y-click-events-have-key-events -->
                                        <div
                                            role="tab"
                                            aria-disabled="false"
                                            aria-selected={contentTabIndex ===
                                                1}
                                            class={contentTabIndex === 1
                                                ? "ant-tabs-tab-active ant-tabs-tab"
                                                : " ant-tabs-tab"}
                                            on:click={() =>
                                                onContentTabChanged(1)}
                                        >
                                            Invalid
                                        </div>
                                    </div>
                                    <div
                                        class="ant-tabs-ink-bar ant-tabs-ink-bar-animated"
                                        style={contentTabIndex === 0
                                            ? "display: block; transform: translate3d(5px, 0px, 0px); width: 100px;"
                                            : "display: block; transform: translate3d(145px, 0px, 0px); width: 100px;"}
                                    ></div>

                                   
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
                <div
                    tabindex="0"
                    role="presentation"
                    style="width: 0px; height: 0px; overflow: hidden; position: absolute;"
                ></div>
                <div
                    class="ant-tabs-content ant-tabs-content-animated ant-tabs-top-content"
                    style={contentTabIndex === 0
                        ? "margin-left: 0%;"
                        : "margin-left: -100%;"}
                >
                    <div
                        role="tabpanel"
                        aria-hidden={contentTabIndex != 0}
                        class={contentTabIndex != 0
                            ? "ant-tabs-tabpane ant-tabs-tabpane-inactive"
                            : "ant-tabs-tabpane ant-tabs-tabpane-active"}
                    >
                        <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
                        <div
                            tabindex="0"
                            role="presentation"
                            style="width: 0px; height: 0px; overflow: hidden; position: absolute;"
                        ></div>

                        <ActiveCoupon />

                        <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
                        <div
                            tabindex="0"
                            role="presentation"
                            style="width: 0px; height: 0px; overflow: hidden; position: absolute;"
                        ></div>
                    </div>
                    <div
                        role="tabpanel"
                        aria-hidden={contentTabIndex != 1}
                        class={contentTabIndex != 1
                            ? "ant-tabs-tabpane ant-tabs-tabpane-inactive"
                            : "ant-tabs-tabpane ant-tabs-tabpane-active"}
                    >
                        <InvalidCoupon />
                    </div>
                </div>
                <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
                <div
                    tabindex="0"
                    role="presentation"
                    style="width: 0px; height: 0px; overflow: hidden; position: absolute;"
                ></div>
            </div>
        </div>
    </div>
</div>

