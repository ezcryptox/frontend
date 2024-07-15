<script>
    import CouponHistoryTab from "./coupon-history-tab.svelte";
    import RewardHistoryTab from "./reward-history-tab.svelte";
    import RedemptionHistoryTab from "./redemption-history.svelte";

    const REWARD_HISTORY = "reward";
    const COUPON_HISTORY = "coupon";
    const REDEEM_HISTORY = "redemption";

    export let type = REWARD_HISTORY;

    const title =
        type === REWARD_HISTORY
            ? "My Rewards"
            : type === COUPON_HISTORY
              ? "Coupon History"
              : type === REDEEM_HISTORY
                ? "Redemption History"
                : "Unknown";
    const tabs =
        type === REWARD_HISTORY
            ? [
                  { name: "Spot", translate: "5px", width: "81px" },
                  { name: "Earn", translate: "125px", width: "79px" },
                  { name: "Futures", translate: "270px", width: "111px" },
              ]
            : type === COUPON_HISTORY
              ? [
                    { name: "Spot", translate: "5px", width: "81px" },
                    { name: "Margin", translate: "125px", width: "104px" },
                    { name: "Earn", translate: "270px", width: "79px" },
                    { name: "Futures", translate: "385px", width: "111px" },
                ]
              : [];
    $: selectedTab = 0;
    const onTabChanged = (index) => {
        selectedTab = index;
    };
</script>

<div class="vm--container">
    <div
        data-modal="CouponHistoryDialog"
        aria-expanded="true"
        class="vm--overlay"
    >
        <div class="vm--top-right-slot"></div>
    </div>
    <!-- svelte-ignore a11y-role-supports-aria-props -->
    <div
        aria-expanded="true"
        role="dialog"
        aria-modal="true"
        class="vm--modal"
        style="left: 0px; width: 1180px; height: auto;"
    >
        <section class="modal-box">
            <button on:click class="close"><i class="icon-close"></i></button>
            <div class="modal-head"><!----></div>
            <div class="modal-content">
                <div class="historyWraper">
                    <h1 class="historyBanner">{title}</h1>
                    <div class="historyConnent">
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
                                        ><span class="ant-tabs-tab-prev-icon">
                                            <i
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
                                    {#if tabs.length > 0}
                                        <div class="ant-tabs-nav-wrap">
                                            <div class="ant-tabs-nav-scroll">
                                                <div
                                                    class="ant-tabs-nav ant-tabs-nav-animated"
                                                >
                                                    <div>
                                                        {#each tabs as tab, index}
                                                            <!-- svelte-ignore a11y-interactive-supports-focus -->
                                                            <!-- svelte-ignore a11y-click-events-have-key-events -->
                                                            <div
                                                                role="tab"
                                                                aria-disabled="false"
                                                                on:click={() =>
                                                                    onTabChanged(
                                                                        index,
                                                                    )}
                                                                aria-selected={index ===
                                                                    selectedTab}
                                                                class="ant-tabs-tab {index ===
                                                                selectedTab
                                                                    ? 'ant-tabs-tab-active'
                                                                    : ''}"
                                                            >
                                                                {tab.name}
                                                            </div>
                                                        {/each}
                                                    </div>

                                                    <div
                                                        class="ant-tabs-ink-bar ant-tabs-ink-bar-animated"
                                                        style="display: block; transform: translate3d({tabs[
                                                            selectedTab
                                                        ]
                                                            .translate}, 0px, 0px); width: {tabs[
                                                            selectedTab
                                                        ].width}"
                                                    ></div>
                                                </div>
                                            </div>
                                        </div>
                                    {/if}
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
                                style="margin-left: {0 - selectedTab * 100}%;"
                            >
                                {#if type === REDEEM_HISTORY}
                                    <RedemptionHistoryTab />
                                {:else if type === COUPON_HISTORY || type === REWARD_HISTORY}
                                    {#each tabs as tab, index}
                                        <div
                                            role="tabpanel"
                                            aria-hidden={index !== selectedTab}
                                            class="ant-tabs-tabpane {index ===
                                            selectedTab
                                                ? 'ant-tabs-tabpane-active'
                                                : 'ant-tabs-tabpane-inactive'}"
                                        >
                                            {#if index === 0}
                                                <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
                                                <div
                                                    tabindex="0"
                                                    role="presentation"
                                                    style="width: 0px; height: 0px; overflow: hidden; position: absolute;"
                                                ></div>
                                            {/if}
                                            {#if type === COUPON_HISTORY}
                                                <CouponHistoryTab />
                                            {:else if type === REWARD_HISTORY}
                                                <RewardHistoryTab />
                                            {/if}

                                            <!---->
                                            {#if index === 0}
                                                <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
                                                <div
                                                    tabindex="0"
                                                    role="presentation"
                                                    style="width: 0px; height: 0px; overflow: hidden; position: absolute;"
                                                ></div>
                                            {/if}
                                        </div>
                                    {/each}
                                {/if}
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
            <div class="modal-foot"></div>
        </section>
        <!---->
    </div>
</div>
