<script>
    import "../../styles/notification/message-center.css";
    import Footer from "$lib/footer.svelte";
    import { isLogin } from "$lib/store/profile";
    import { onMount } from "svelte";
    $: selectedTab = 0;
    $: selectedTag = 0;
    let children = [];

    onMount(() => {
        onTabChanged(0);
    });

    const onTabChanged = (index) => {
        selectedTab = index;
        selectedTag = 0;
        children =
            index === 0
                ? [
                      "All",
                      "Trading&Positions",
                      "Transactions",
                      "Account Security",
                      "Rewards",
                  ]
                : [
                      "All",
                      "News/Announcements",
                      "New Listings",
                      "Referral Program, Campaigns, Polo Earn and Airdrops",
                      "Getting Started",
                      "Using Your Account",
                      "Trading on Ezcryptox",
                  ];
    };

    const notificationsList = [
        {
            id: 360002708213,
            category: "New Coin Listings",
            date: "2024-07-12 13:08:58",
            link: "https://support.poloniex.com/hc/en-us/articles/24841578636055-New-Listing-BWORM-BWORM",
            title: "New Listing: BWORM (BWORM)",
            imgSrc: "https://static.poloniex.com/vip.png",
        },
        {
            id: 360002708213,
            category: "Airdrops",
            date: "2024-07-12 12:00:01",
            link: "https://support.poloniex.com/hc/en-us/articles/24839187944599--18-000-Airdrop-to-Celebrate-the-Listing-of-GIOVE-GIOVE",
            title: "$18,000 Airdrop to Celebrate the Listing of GIOVE (GIOVE)",
            imgSrc: "https://static.poloniex.com/campaigns_airdrops.png",
        },
        {
            id: 360002708213,
            category: "New Coin Listings",
            date: "2024-07-12 10:56:29",
            link: "https://support.poloniex.com/hc/en-us/articles/24841303414551-New-Listing-OLYMPE-OLYMPE",
            title: "New Listing: OLYMPE (OLYMPE)",
            imgSrc: "https://static.poloniex.com/vip.png",
        },
        // Add more objects for each notification item
    ];

    const trendingItems = [
        {
            symbol: "BTC/USDT",
            image: "https://www.datocms-assets.com/51952/1635193869-btc.png",
            growth: "+0.84%",
            price: "$58,350.51",
        },
        {
            symbol: "TRX/USDT",
            image: "https://www.datocms-assets.com/51952/1638549830-trx.png",
            growth: "+1.36%",
            price: "$0.13",
        },
        {
            symbol: "USDT/USDC",
            image: "https://www.datocms-assets.com/51952/1638913308-usdt.png",
            growth: "+0.01%",
            price: "$1.00",
        },
        {
            symbol: "ETH/USDT",
            image: "https://www.datocms-assets.com/51952/1635345356-eth.png",
            growth: "+0.11%",
            price: "$3,145.08",
        },
        {
            symbol: "DOGE/USDT",
            image: "https://www.datocms-assets.com/51952/1638550559-doge.png",
            growth: "-0.26%",
            price: "$0.10",
        },
        {
            symbol: "LTC/USDT",
            image: "https://www.datocms-assets.com/51952/1635345330-ltc.png",
            growth: "+1.11%",
            price: "$69.28",
        },
        {
            symbol: "FTN/USDT",
            image: "https://www.datocms-assets.com/51952/1702985900-ftn-logo.jpg",
            growth: "+0.07%",
            price: "$2.34",
        },
        {
            symbol: "SOL/USDT",
            image: "https://www.datocms-assets.com/51952/1639107184-sol.png",
            growth: "+0.70%",
            price: "$139.71",
        },
    ];
    $: hideRead = false
    $: markAsRead = false
    const onMarkAsRead = ()=> {
        markAsRead = true
    }
</script>

<div class="app-notifications">
    <header class="_9ed2bf8f">
        <div class="content">
            <h1 class="font-bold text-large _1bc0e61b">Message Center</h1>
        </div>
    </header>
    <section class="f263374b">
        <div class="content">
            <div class="e0ff8edd">
                <div class="_48709716 c1b2260d">
                    <div class="cbfc5864">
                        <div class="feceea90">
                            <div class="a3ee27ce">
                                <!-- svelte-ignore a11y-click-events-have-key-events -->
                                <!-- svelte-ignore a11y-no-static-element-interactions -->
                                <span
                                    class={selectedTab === 0
                                        ? "_1b564715"
                                        : ""}
                                    on:click={() => onTabChanged(0)}
                                >
                                    Account Activities</span
                                >
                                <!-- svelte-ignore a11y-no-static-element-interactions -->
                                <!-- svelte-ignore a11y-click-events-have-key-events -->
                                <span
                                    class={selectedTab === 1
                                        ? "_1b564715"
                                        : ""}
                                    on:click={() => onTabChanged(1)}
                                >
                                    Platform Notices</span
                                >
                            </div>
                            {#if $isLogin}
                            <div class="_2114c9f2">
                                <span
                                    ><span
                                        class="polo-switch polo-switch-middle {hideRead ? 'is-checked' : ''}"
                                        ><span class="polo-switch-box"
                                            ><input
                                                type="checkbox"
                                                true-value="true"
                                                bind:checked={hideRead}
                                            /></span
                                        ><!----></span
                                    >Hide Read</span
                                >
                                <!-- svelte-ignore a11y-click-events-have-key-events -->
                                <!-- svelte-ignore a11y-no-static-element-interactions -->
                                <span on:click={()=> onMarkAsRead()}
                                    ><svg
                                        width="16"
                                        height="16"
                                        viewBox="0 0 16 16"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        ><g
                                            clip-path="url(#clip0_202_11639)"
                                            ><path
                                                d="M5.33325 13.333V9.99967H6.66658V13.333H12.6666V8.66634H3.33325V13.333H5.33325ZM2.66659 7.33301H13.3333V5.33301H9.33325V2.66634H6.66658V5.33301H2.66659V7.33301ZM1.99992 13.9997V8.66634H1.33325V4.66634C1.33325 4.48953 1.40349 4.31996 1.52851 4.19494C1.65354 4.06991 1.82311 3.99967 1.99992 3.99967H5.33325V1.99967C5.33325 1.82286 5.40349 1.65329 5.52851 1.52827C5.65354 1.40325 5.82311 1.33301 5.99992 1.33301H9.99992C10.1767 1.33301 10.3463 1.40325 10.4713 1.52827C10.5963 1.65329 10.6666 1.82286 10.6666 1.99967V3.99967H13.9999C14.1767 3.99967 14.3463 4.06991 14.4713 4.19494C14.5963 4.31996 14.6666 4.48953 14.6666 4.66634V8.66634H13.9999V13.9997C13.9999 14.1765 13.9297 14.3461 13.8047 14.4711C13.6796 14.5961 13.5101 14.6663 13.3333 14.6663H2.66659C2.48977 14.6663 2.3202 14.5961 2.19518 14.4711C2.07016 14.3461 1.99992 14.1765 1.99992 13.9997Z"
                                                fill="currentColor"
                                            ></path></g
                                        ><defs
                                            ><clipPath id="clip0_202_11639"
                                                ><rect
                                                    width="16"
                                                    height="16"
                                                    fill="white"
                                                ></rect></clipPath
                                            ></defs
                                        ></svg
                                    >Mark as read</span
                                >
                            </div>
                            {/if}
                            
                        </div>

                        <nav class="_5792e38c">
                            {#each children as child, index}
                                <!-- svelte-ignore a11y-click-events-have-key-events -->
                                <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
                                <li
                                    aria-current={index === selectedTag
                                        ? "active"
                                        : undefined}
                                    on:click={() => (selectedTag = index)}
                                >
                                    {child}
                                </li>
                            {/each}
                        </nav>
                    </div>

                    <div class="_86f80bf7 f08c1a81">
                        <div>
                            <div
                                class="ant-list ant-list-split"
                                infinite-scroll-distance="20"
                                infinite-scroll-disabled="disabled"
                                infinite-scroll-immediate-check="false"
                                renderempty={() => {}}
                                type="infinite"
                                loadmorehandler={() => {}}
                                emptytext=""
                            >
                                <div class="ant-spin-nested-loading">
                                    <div class="ant-spin-container">
                                        {#if notificationsList.length === 0}
                                            <div
                                                class="ant-list-empty-text"
                                            >
                                                <div class="e0e68c22">
                                                    <svg
                                                        width="80"
                                                        height="80"
                                                        viewBox="0 0 80 80"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            d="M69.0908 33.1038C69.0908 32.8627 68.995 32.6315 68.8246 32.461L51.1753 14.8117C51.0048 14.6412 50.7736 14.5454 50.5324 14.5454H9.09082C8.08667 14.5454 7.27264 15.3594 7.27264 16.3636V60C7.27264 61.0041 8.08667 61.8181 9.09082 61.8181H67.2726C68.2768 61.8181 69.0908 61.0041 69.0908 60V33.1038Z"
                                                            fill="#F2F2F2"
                                                        ></path>
                                                        <rect
                                                            width="29.0909"
                                                            height="3.63636"
                                                            rx="0.909091"
                                                            transform="matrix(-1 0 0 1 45.4543 30)"
                                                            fill="currentColor"
                                                        ></rect>
                                                        <rect
                                                            width="21.6667"
                                                            height="3.63636"
                                                            rx="0.909091"
                                                            transform="matrix(-1 0 0 1 38.03 42.7271)"
                                                            fill="currentColor"
                                                        ></rect>
                                                        <path
                                                            d="M50.909 30.909V14.5454L69.0908 32.7272H52.7272C51.723 32.7272 50.909 31.9132 50.909 30.909Z"
                                                            fill="currentColor"
                                                        ></path>
                                                        <circle
                                                            cx="61.8183"
                                                            cy="54.5453"
                                                            r="10.9091"
                                                            fill="#B8B8B8"
                                                        ></circle>
                                                        <path
                                                            d="M62.7214 57.902H60.915C60.4869 57.902 60.1399 58.249 60.1399 58.6771V60.4835C60.1399 60.9116 60.4869 61.2586 60.915 61.2586H62.7214C63.1495 61.2586 63.4965 60.9116 63.4965 60.4835V58.6771C63.4965 58.249 63.1495 57.902 62.7214 57.902Z"
                                                            fill="#F2F2F2"
                                                        ></path>
                                                        <path
                                                            d="M62.7214 47.832H60.915C60.4869 47.832 60.1399 48.1791 60.1399 48.6072V55.4485C60.1399 55.8766 60.4869 56.2236 60.915 56.2236H62.7214C63.1495 56.2236 63.4965 55.8766 63.4965 55.4485V48.6072C63.4965 48.1791 63.1495 47.832 62.7214 47.832Z"
                                                            fill="#F2F2F2"
                                                        ></path>
                                                    </svg>
                                                    <span>No Messages</span>
                                                </div>
                                            </div>
                                        {/if}

                                        {#each notificationsList as notification}
                                            <!-- svelte-ignore a11y-unknown-aria-attribute -->
                                            <div aria-read-status={markAsRead ? "2" : "1"} class="a8c11a1d">
                                                <div class="d4c7ed19">
                                                    <div class="e5497868">
                                                        <img
                                                            src={notification.imgSrc}
                                                            alt={notification.id}
                                                        />
                                                        <span
                                                            >{notification.category}</span
                                                        >
                                                    </div>
                                                    <span
                                                        >{notification.date}</span
                                                    >
                                                </div>
                                                <a
                                                    href={notification.link}
                                                    target="_blank"
                                                    class="e4058f03"
                                                >
                                                    {notification.title}
                                                </a>
                                            </div>
                                        {/each}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="_9ab6191d _97a51e5f">
                    <div class="_377b4cf3 font-bold">Trending</div>

                    <nav>
                        {#each trendingItems as item}
                            <a
                                href="/trade/{item.symbol}"
                                target="_blank"
                                class="f03c7c66 font-bold"
                            >
                                <div class="e702b086 text-normal">
                                    <i
                                        class="b8049b98"
                                        style="background-image: url('{item.image}');"
                                    ></i>
                                    <span>{item.symbol}</span>
                                </div>
                                <!-- svelte-ignore a11y-unknown-aria-attribute -->
                                <div
                                    aria-grow="positive"
                                    class="b7d04739 text-normal"
                                >
                                    {item.growth}
                                </div>
                                <div
                                    class="b9ff1e01 text-normal font-semibold"
                                >
                                    {item.price}
                                </div>
                            </a>
                        {/each}
                    </nav>
                    <a
                        href="/trade"
                        target="_blank"
                        class="f8e6b0b4 text-normal  font-semibold  ">View details &gt;</a
                    >
                </div>
            </div>
        </div>
    </section>
</div>
<Footer/>
