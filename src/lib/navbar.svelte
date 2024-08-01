<script>
  import { screen } from "$lib/store/screen";
  import { onMount } from "svelte";
  import MobileMenu from "./mobile-menu.svelte";
  import BuyCrypto from "./navbar-components/buy-crypto.svelte";
  import Derivative from "./navbar-components/derivative.svelte";
  import { _ } from 'svelte-i18n';
  import Explore from "./navbar-components/explore.svelte";
  import Notification from "./navbar-components/notification.svelte";
  import Trade from "./navbar-components/trade.svelte";
  import { isLogin } from "$lib/store/profile";
  import Language from "./navbar-components/language.svelte";
  import { toggleMode } from "mode-watcher";
  import {
		fetchUnreadCount,
	} from '$lib/navbar-components/notifications';
	import { handleAuthToken } from "./store/routes";
  
  $: is_menu = false;
  $: showBuyCrypto = false;
  $: showTrade = false;
  $: showDerivative = false;
  $: showExplore = false;
  $: showNotification = false;
  $: showLanguageModal = false;
  $: unreadnotifications = "0"
  $: if ($isLogin) {
    fetchUnreadCount($handleAuthToken).then(data => {
      unreadnotifications = data.unreadCount || 0;
    })
  }
  $: logo = "https://res.cloudinary.com/dxwhz3r81/image/upload/v1715942424/ezcryptox.ioo-01_y2dny9.png"
  // removeme (remove the onMount)
  onMount(() => {
    if (sessionStorage.getItem("user")) isLogin.set(true);
  });


</script>
<Language {showLanguageModal} on:click={() => (showLanguageModal = false)} />
<div id="uniframe-header" data-v-app>
  <header class="cdd74806 uniframe-root uniframe-header">
    <div class="d576b507">

      <div>
        <div class="c0f4158f">
          <a href="/">
            <img src="{logo}"  alt="" />
          </a>
        </div>
      </div>

      <div style="margin-right: auto;">
        {#if $screen > 950}
          <ul class="a3107c1e">
            <li>
              <button  on:mouseenter={() => (showBuyCrypto = true)}
                on:mouseleave={() => (showBuyCrypto = false)}
                class="b8777ccf">
                <div class="bfe44f5e">
                  <span>{$_('g-buy-crypto')}</span>
                  <svg fill="currentColor" style="width: 16px; height: 16px;">
                    <use xlink:href="#uniframe-icon-arrow-down"></use>
                  </svg>
                </div>
                {#if showBuyCrypto}
                    <BuyCrypto />
                {/if}
              </button>
            </li>
            <li>
              <a class="bfe44f5e" target="_self" href="/markets">
                <!----><!---->
                <span>{$_('g-markets')}</span>
              </a>
            </li>
            <li>
              <button class="b8777ccf" on:mouseenter={() => (showTrade = true)}
                on:mouseleave={() => (showTrade = false)}>
                <div class="bfe44f5e">
                  <span>{$_('footer-futures-trade')}</span>
                  <svg fill="currentColor" style="width: 16px; height: 16px;">
                    <use xlink:href="#uniframe-icon-arrow-down"></use>
                  </svg>
                </div>
                {#if showTrade}
                  <Trade />
                {/if}
              </button>
            </li>
            <li>
              <button class="b8777ccf" on:mouseenter={() => (showDerivative = true)}
                on:mouseleave={() => (showDerivative = false)}>
                <div class="bfe44f5e">
                  <span>{$_('g-derivatives')}</span>
                  <svg fill="currentColor" style="width: 16px; height: 16px;">
                    <use xlink:href="#uniframe-icon-arrow-down"></use>
                  </svg>
                </div>
                {#if showDerivative}
                  <Derivative />
                {/if}
              </button>
            </li>
            <li>
              <a class="bfe44f5e" target="_self" href="/earn">
                <!----><!---->
                <span>{$_('g-earn')}</span>
              </a>
            </li>

            <li>
              <button
                on:mouseenter={() => (showExplore = true)}
                on:mouseleave={() => (showExplore = false)}
                class="b8777ccf"
              >
                <div class="bfe44f5e">
                  <span>{$_('explore')}</span>
                  <svg fill="currentColor" style="width: 16px; height: 16px;">
                    <use xlink:href="#uniframe-icon-arrow-down"></use>
                  </svg>
                </div>
                {#if showExplore}
                  <Explore />
                {/if}
              </button>
            </li>
          </ul>
        {/if}
      </div>

      <div>
        {#if !$isLogin}
          {#if $screen > 500}
            <div class="b6d9e754">
              <a
                href="/signup"
                class="b4f29bce ce727619 f53365fb b4f29bce"
                data-size="small"
              >
                <span>{$_('sign-up')}</span>
              </a>
              <a
                href="/login"
                class="d2c677df ce727619 fc91b736 d2c677df"
                data-size="small"
              >
                <span>{$_('log-in')}</span>
              </a>
            </div>
          {/if}
          <!---->
        {/if}
        {#if $isLogin}
          <div class="a7ddb18f">
            <a class="ba0dfc48" href="/wallet/?tab=spot">{$_('g-wallet')}</a>
            <!-- <a href="/activity" class="ba0dfc48">{$_('activity')}</a> -->
            <div class="b87cb199">
              <svg fill="currentColor" style="width: 20px; height: 20px;">
                <use xlink:href="#uniframe-icon-profile"></use>
              </svg>
              <div class="c8958f69">
                <a href="/profile/?tab=profile" class="e1027c7a">
                  <svg fill="currentColor" style="width: 20px; height: 20px;">
                    <use xlink:href="#uniframe-icon-profile"></use>
                  </svg>
                  <div class="a51ab1c0">{$_('profile')}</div>
                  <div class="a92347ea">{$_('profile-subtitle')}</div>
                </a>
                <a href="/profile/?tab=security" class="e1027c7a">
                  <svg fill="currentColor" style="width: 20px; height: 20px;">
                    <use xlink:href="#uniframe-icon-security"></use>
                  </svg>
                  <div class="a51ab1c0">{$_('g-security')}</div>
                  <div class="a92347ea">{$_('2fa-subtitle')}</div>
                </a>
                <a href="/?profile/subaccount/onboarding" class="e1027c7a">
                  <svg fill="currentColor" style="width: 20px; height: 20px;">
                    <use xlink:href="#uniframe-icon-subaccount"></use>
                  </svg>
                   <div class="a51ab1c0">{ $_("g-subaccount") }</div>
                  <div class="a92347ea">{ $_("subaccount-subtitle") }</div>
                </a>
                <a href="/?fee" class="e1027c7a">
                  <svg fill="currentColor" style="width: 20px; height: 20px;">
                    <use xlink:href="#uniframe-icon-feetier"></use>
                  </svg>
                  <div class="a51ab1c0">{ $_("more-settings") }</div>
                  <div class="a92347ea">{ $_("more-settings-subtitle") }</div>
                </a>
                <a href="/referral" class="e1027c7a">
                  <svg fill="currentColor" style="width: 20px; height: 20px;">
                    <use xlink:href="#uniframe-icon-referrals"></use>
                  </svg>
                  <div class="a51ab1c0">{ $_("g-referrals") }</div>
                  <div class="a92347ea">
                    { $_("referrals-subtitle") }
                  </div>
                </a>
                <a
                  href="/logout"
                  class="d0ac15a4 ce727619 cb6de6db d0ac15a4"
                  data-size="medium"
                >
                  <span>{ $_("log-out") }</span>
                </a>
              </div>
            </div>
          </div>
        {/if}
      </div>

      {#if $screen > 1130}
        <div>
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <!-- svelte-ignore a11y-no-static-element-interactions -->
          <div class="c9759bc4 relative" on:click={() => toggleMode()}>
            <svg fill="currentColor" style="width: 20px; height: 20px;" class="absolute scale-100 transition-all dark:scale-0">
              <use
                xlink:href="#uniframe-icon-sun"
              ></use>
            </svg>
            <svg fill="currentColor" style="width: 20px; height: 20px;" class="absolute scale-0 transition-all dark:scale-100">
              <use
                xlink:href="#uniframe-icon-moon"
              ></use>
            </svg>
          </div>
          <button
            class="dd8dbce9" 
            aria-account-unread="{unreadnotifications}"
            on:mouseenter={() => (showNotification = true)}
            on:mouseleave={() => (showNotification = false)}
          >
            <svg fill="currentColor" style="width: 20px; height: 20px;">
              <use xlink:href="#uniframe-icon-notification"></use>
            </svg>
            {#if showNotification}
              <Notification />
            {/if}
          </button>
          <a
            href="?support.poloniex.com"
            rel="noopener noreferrer"
            class="a9d0f06a"
          >
            <svg fill="currentColor" style="width: 20px; height: 20px;">
              <use xlink:href="#uniframe-icon-support"></use>
            </svg>
          </a>

          <button class="eb58c575" on:click={() => (showLanguageModal = true)}>
            <span>EN</span>
            <svg fill="currentColor" style="width: 16px; height: 16px;">
              <use xlink:href="#uniframe-icon-arrow-down"></use>
            </svg>
          </button>
        </div>
      {:else}
        <div>
          <button
            on:click={() => (is_menu = !is_menu)}
            class="d5236253 {is_menu ? 'b53872b6' : ''}"
          >
            <i></i><i></i><i></i>
          </button>
          {#if is_menu}
            <MobileMenu on:close={() => (is_menu = false)} />
          {/if}
        </div>
      {/if}
    </div>
  </header>
</div>
