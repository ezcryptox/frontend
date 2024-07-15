<script>
    import "../../styles/notification/notification.css";
    import { isLogin } from "$lib/store/profile";
    let selectedTab = 1;
    const accountunreadcount = 6;
    let notifications = [
        {
            imgSrc: "https://static.poloniex.com/vip.png",
            id: "360002708213",
            category: "New Coin Listings",
            date: "2024-07-12 13:08:58",
            link: "https://support.poloniex.com/hc/en-us/articles/24841578636055-New-Listing-BWORM-BWORM",
        },
        {
            imgSrc: "https://static.poloniex.com/campaigns_airdrops.png",
            id: "360002708233",
            category: "Airdrops",
            date: "2024-07-12 12:00:01",
            link: "https://support.poloniex.com/hc/en-us/articles/24839187944599--18-000-Airdrop-to-Celebrate-the-Listing-of-GIOVE-GIOVE",
        },
        {
            imgSrc: "https://static.poloniex.com/vip.png",
            id: "360002708213",
            category: "New Coin Listings",
            date: "2024-07-12 10:56:29",
            link: "https://support.poloniex.com/hc/en-us/articles/24841303414551-New-Listing-OLYMPE-OLYMPE",
        },
        {
            imgSrc: "https://static.poloniex.com/vip.png",
            id: "360002708213",
            category: "New Coin Listings",
            date: "2024-07-12 09:40:09",
            link: "https://support.poloniex.com/hc/en-us/articles/24840815467799-New-Listing-Doogle-DOOGLE",
        },
        {
            imgSrc: "https://static.poloniex.com/campaigns_airdrops.png",
            id: "360002708233",
            category: "Airdrops",
            date: "2024-07-11 13:00:03",
            link: "https://support.poloniex.com/hc/en-us/articles/24810097309847--12-000-Airdrop-to-Celebrate-the-Listing-of-Mocaverse-MOCA",
        },
        {
            imgSrc: "https://static.poloniex.com/vip.png",
            id: "360002708213",
            category: "New Coin Listings",
            date: "2024-07-11 09:13:29",
            link: "https://support.poloniex.com/hc/en-us/articles/24810345518487-New-Listing-GIOVE-GIOVE",
        },
        {
            imgSrc: "https://static.poloniex.com/vip.png",
            id: "360002708213",
            category: "New Coin Listings",
            date: "2024-07-11 07:54:49",
            link: "https://support.poloniex.com/hc/en-us/articles/24809582295447-New-Listing-Mini-Donald-BARRON",
        },
        {
            imgSrc: "https://static.poloniex.com/vip.png",
            id: "360002708213",
            category: "New Coin Listings",
            date: "2024-07-11 07:14:48",
            link: "https://support.poloniex.com/hc/en-us/articles/24808988681111-New-Listing-Mocaverse-MOCA",
        },
        {
            imgSrc: "https://static.poloniex.com/important_accouncements.png",
            id: "360002700674",
            category: "Wallet Maintenance Updates",
            date: "2024-07-11 05:15:37",
            link: "https://support.poloniex.com/hc/en-us/articles/24789645303319-Poloniex-to-Support-RNDR-RenderToken-Rebrand-to-RENDER-Render-Token",
        },
        {
            imgSrc: "https://static.poloniex.com/campaigns_airdrops.png",
            id: "360002708233",
            category: "Polo Earn - Staking / Saving",
            date: "2024-07-11 05:07:17",
            link: "https://support.poloniex.com/hc/en-us/articles/24808157058839-Hold-RIS-to-Earn-100-APY-with-Polo-Earn",
        },
        {
            imgSrc: "https://static.poloniex.com/vip.png",
            id: "360002708213",
            category: "New Coin Listings",
            date: "2024-07-10 16:04:39",
            link: "https://support.poloniex.com/hc/en-us/articles/24789269969047-New-Listing-FLAPPY-FLAPPY",
        },
        {
            imgSrc: "https://static.poloniex.com/campaigns_airdrops.png",
            id: "360002708233",
            category: "Airdrops",
            date: "2024-07-10 09:00:01",
            link: "https://support.poloniex.com/hc/en-us/articles/24781414780823--9-000-Airdrop-to-Celebrate-the-Listing-of-Caduceus-CAD",
        },
        {
            imgSrc: "https://static.poloniex.com/campaigns_airdrops.png",
            id: "360002708233",
            category: "Poloniex Referral Program",
            date: "2024-07-10 04:48:24",
            link: "https://support.poloniex.com/hc/en-us/articles/6571052590999-Refer-Friends-Share-a-30-Commission-and-Unlock-Mystery-Boxes-Each-Worth-up-to-100-USDT",
        },
        {
            imgSrc: "https://static.poloniex.com/campaigns_airdrops.png",
            id: "360002708233",
            category: "Airdrops",
            date: "2024-07-09 11:00:00",
            link: "https://support.poloniex.com/hc/en-us/articles/24750403877271--23-000-Airdrop-to-Celebrate-the-Listing-of-Riser-RIS",
        },
        {
            imgSrc: "https://static.poloniex.com/important_accouncements.png",
            id: "360002700674",
            category: "Latest Announcements",
            date: "2024-07-09 07:10:26",
            link: "https://support.poloniex.com/hc/en-us/articles/24749250179223-Project-introduction-What-is-RIS",
        },
        {
            imgSrc: "https://static.poloniex.com/new_listings.png",
            id: "360002700694",
            category: "Futures Grid Trading",
            date: "2024-07-09 02:58:33",
            link: "https://support.poloniex.com/hc/en-us/articles/24667584983447-Poloniex-to-Upgrade-Futures-Fee-Rate-System",
        },
        {
            imgSrc: "https://static.poloniex.com/vip.png",
            id: "360002708213",
            category: "New Coin Listings",
            date: "2024-07-08 13:11:08",
            link: "https://support.poloniex.com/hc/en-us/articles/24723573814807-New-Listing-Riser-RIS",
        },
        {
            imgSrc: "https://static.poloniex.com/new_listings.png",
            id: "360002700694",
            category: "Futures Trading",
            date: "2024-07-05 09:26:54",
            link: "https://support.poloniex.com/hc/en-us/articles/4403106482711-Poloniex-Futures-Trial-Fund-Coupon-Usage-Instructions",
        },
        {
            imgSrc: "https://static.poloniex.com/important_accouncements.png",
            id: "360002700674",
            category: "Wallet Maintenance Updates",
            date: "2024-07-05 07:48:52",
            link: "https://support.poloniex.com/hc/en-us/articles/24666866603031-Poloniex-to-Support-GAL-Project-Galaxy-Rebrand-to-G-Gravity",
        },
        {
            imgSrc: "https://static.poloniex.com/important_accouncements.png",
            id: "360002700674",
            category: "Latest Announcements",
            date: "2024-07-05 07:47:00",
            link: "https://support.poloniex.com/hc/en-us/articles/24666545951383-Bulk-Asset-Delistings-July-19-2024",
        },
    ];
</script>

<!-- svelte-ignore a11y-unknown-aria-attribute -->
<div class="c3288ade" aria-is-login={isLogin}>
    {#if isLogin}
        <div class="a6d3316e">
            <!-- svelte-ignore a11y-label-has-associated-control -->
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
            <label
                aria-current={selectedTab === 0 ? "active" : ""}
                on:click={() => (selectedTab = 0)}
            >
                <!-- svelte-ignore a11y-unknown-aria-attribute -->
                <span aria-account-unread={accountunreadcount}
                    >Account Activities</span
                >
            </label>
            <!-- svelte-ignore a11y-label-has-associated-control -->
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
            <label
                aria-current={selectedTab === 1 ? "active" : ""}
                on:click={() => (selectedTab = 1)}
                ><span>Platform Notices</span></label
            >
        </div>
    {/if}

    <main class="dad95e88">
        <div class="c2d29119" accountunreadcount="{accountunreadcount}">
            <nav>
                {#each notifications as notification}
                    <li>
                        <div class="a7c0fc49" aria-read-status="-1">
                            <div class="eb25c4fd">
                                <div class="b75ca08f">
                                    <img
                                        src={notification.imgSrc}
                                        alt={notification.id}
                                    /><span>{notification.category}</span>
                                </div>
                                <span>{notification.date}</span>
                            </div>
                            <a
                                href={notification.link}
                                target="_blank"
                                class="a1089035">{notification.category}</a
                            >
                        </div>
                    </li>
                {/each}
            </nav>
        </div>
    </main>
    <div class="c22446a5">
        <a href="/notifications" target="_blank"
            ><span>View All</span><svg
                fill="currentColor"
                style="width: 16px; height: 16px;"
                ><use xlink:href="#uniframe-icon-arrow-right-2"></use></svg
            ></a
        ><!---->
    </div>
</div>
