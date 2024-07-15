<script>
  import "../../styles/notification/notification.css";
  import { fetchUserNotifications, fetchUnreadCount, fetchPlatformNotifications } from "./notifications.js";
  import { isLogin } from "$lib/store/profile";
  import { isLoadingUN, isLoadingPN } from "$lib/store/notifications";
  let selectedTab = 1;
  let accountunreadcount = 6;
  $: platformNotifications = [];
  $: userNotifications = [];
   $: if ($isLogin) {
    fetchUserNotifications(auth).then(data => {
      userNotifications = data.notifications ?? [];
    });
    fetchUnreadCount(auth).then(data => {
      accountunreadcount = data.unreadCount;
    });
  }

  fetchPlatformNotifications(auth).then(data => {
    platformNotifications = data.notifications ?? [];
  });
</script>

<!-- svelte-ignore a11y-unknown-aria-attribute -->
<div class="c3288ade" aria-is-login={$isLogin}>
  {#if $isLogin}
    <div class="a6d3316e">
      <!-- svelte-ignore a11y-label-has-associated-control -->
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
      <label
        aria-current={selectedTab === 0 ? "active" : ""}
        on:click={() => (selectedTab = 0)}
      >
        <!-- svelte-ignore a11y-unknown-aria-attribute -->
        <span aria-account-unread={accountunreadcount}>Account Activities</span>
      </label>
      <!-- svelte-ignore a11y-label-has-associated-control -->
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
      <label
        aria-current={selectedTab === 1 ? "active" : ""}
        on:click={() => (selectedTab = 1)}><span>Platform Notices</span></label
      >
    </div>
  {/if}

  <main class="dad95e88">
    <div class="c2d29119">
      <nav>
        {#if selectedTab == 0}
        {#if isLoadingUN || isLoadingPN}
          <Skeleton class="h-12 w-full" />
          <Skeleton class="h-12 w-full" />
          <Skeleton class="h-12 w-full" />
        {:else}
          {#each userNotifications as activity}
            <li>
              <div class="a7c0fc49" aria-read-status="{activity.readStatus}">
                <div class="eb25c4fd">
                  <div class="b75ca08f">
                    <img
                      src="https://static.poloniex.com/campaigns_airdrops.png"
                      alt="360002708233"
                    /><span>{activity.category}</span>
                  </div>
                  <span>{new Date(Number(activity.timestamp)).toISOString().replace('T', ' ').substring(0, 19)}</span>
                </div>
                <a
                  href="https://www.poloniex.com/earn"
                  target="_blank"
                  class="a1089035"
                  >{activity.title}</a
                >
                <div data-v-4fbf5936="" class="expandable-text bdf07505">
                  <div data-v-4fbf5936="" class="inner close">
                    {activity.content}
                  </div>
                  <!---->
                </div>
              </div>
            </li>
          {/each}
        {/if}
         
        {:else}
          {#each platformNotifications as notification}
            <li>
              <div class="a7c0fc49" aria-read-status="-1">
                <div class="eb25c4fd">
                  <div class="b75ca08f">
                    <img src={notification.icon} alt={notification.id} /><span
                      >{notification.category}</span
                    >
                  </div>
                  <span>{new Date(Number(notification.timestamp)).toISOString().replace('T', ' ').substring(0, 19)}</span>
                </div>
                <a href={notification.link} target="_blank" class="a1089035"
                  >{notification.title}</a
                >
              </div>
            </li>
          {/each}
        {/if}
      </nav>
    </div>
  </main>
  <div class="c22446a5">
    <a href="/platformNotifications" target="_blank"
      ><span>View All</span><svg
        fill="currentColor"
        style="width: 16px; height: 16px;"
        ><use xlink:href="#uniframe-icon-arrow-right-2"></use></svg
      ></a
    ><!---->
  </div>
</div>
