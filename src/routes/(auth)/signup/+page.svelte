<script>
	import { _ } from 'svelte-i18n';
  import "../../../styles/login.css";
  import { screen } from "$lib/store/screen";
  import { url } from "$lib/store/routes";
  import Phone from "../login/phone.svelte";
  import { allTimeZone, location } from "./countryList";
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { handleSignUpEmailAuth } from "$lib/auth/index";
  import { otp } from "$lib/store/otp";
  import { browser } from "$app/environment";
  import { page } from "$app/stores";

  $: isEmail = true;
  let email = "";
  let password = "";
  let phone = "";
  $: isPhone = false;
  $: currentPhone = 0;
  $: error = null;
  $: isloading = false;
  $: track = !email || password.length < 3 || isloading;
  $: showPassword = false;
  $: showRefCode = false;
  $: refCode = $page.url.searchParams.get("c") || "";

  // onMount(async()=>{
  //  let respose = await location()
  //  allTimeZone.forEach(element => {
  //     if(respose.country === element.Name){
  //         currentPhone = element
  //     }
  //  });
  // })

  const toggleRefField = () => {
    showRefCode = !showRefCode;
  };

  const handleSubmit = async (event) => {
    if ((event.key === "Enter" && !track) || event.type === "click") {
      isloading = true;
      const respose = await handleSignUpEmailAuth({ email, password, refCode });
      if (respose.error) {
        error = respose.error;
        setTimeout(() => {
          error = null;
        }, 5000);
      }
      isloading = respose.loading;
      if (respose.response) {
        browser &&
          sessionStorage.setItem("token", JSON.stringify(respose.response));
        otp.set(respose.response);
        goto("/signup/verify");
      }
    }
  };

  const handleCountry = (event) => {
    currentPhone = event.detail;
    isPhone = false;
  };

  onMount(() => {
    if (refCode) {
      showRefCode = true;
    }
  });
</script>
{#if isPhone}
  <Phone
    on:close={() => (isPhone = false)}
    on:country={handleCountry}
    countries={allTimeZone}
  />
{/if}
<svelte:head>
  <title>{$_('ezcryptox-login')}</title>
  <meta name="description" content="Login to Ezcryptox exchange " />
</svelte:head>

<svelte:body on:keypress={() => handleSubmit(event)} />

<div class="wc-signup">
  <div class="_149c0bee">
    <div class="a38e7416">
      <a target="_blank" href={$url}>
        <div
          class="a40d00e5"
          style="background: url(&quot;https://www.datocms-assets.com/51952/1683183420-bg.png&quot;) center center / cover no-repeat rgb(255, 255, 255);"
        >
          <p class="_005c09a5" style="color: rgb(255, 255, 255);">{$_('welcome-bonus')}</p>
          <p class="b5fa3c38" style="color: rgb(255, 255, 255);">{$_('connecting-you-to-the-power-of-crypto')}</p>
          <div
            class="cf24226d"
            style="background: url(&quot;https://www.datocms-assets.com/51952/1682304580-1.svg&quot;) center center no-repeat;"
          ></div>
        </div>
      </a>
    </div>
    <div class="_20c1a58b {$screen > 1025 ? '_8ec5b3ca' : ''}">
      <div class="c81ae558">
        <!---->
        <p class="d94bb610">{$_('create-account')}</p>
        <div class="_17d8b5db">
          <button
            on:click={() => (isEmail = true)}
            class="_483da2ae {isEmail ? 'ab6e6929' : ''} "
          >{$_('g-email')}</button>
          <button
            on:click={() => (isEmail = false)}
            class="_483da2ae {!isEmail ? 'ab6e6929' : ''}"
          >{$_('g-phone')}</button>
        </div>
        <div data-v-39752d79="" class="order-form _3f44b0a0">
          <div
            data-key="email"
            class="form-item _0e46cf5e"
            data-v-39752d79=""
            style="display: {isEmail ? 'block' : 'none'};"
          >
            <!---->
            <div class="form-item-content">
              <div
                class="polo-input left {error === 'Email is not valid' ||
                error === 'Email already exist'
                  ? 'error'
                  : ''}  polo-input-large polo-input-default"
                maxlength="64"
              >
                <!---->
                <input
                  type="text"
                  bind:value={email}
                  placeholder="Email address"
                />
                <!---->
              </div>
              <!---->
              {#if error === "Email is not valid" || error === "Email already exist" ? "error" : ""}
                <div class="msg-box" style="">
                  <!---->
                  <div class="msg-box" style=""><!----> {error}</div>
                </div>
              {/if}
            </div>
          </div>
          <div
            data-key="phone"
            class="form-item"
            data-v-39752d79=""
            style="display: {!isEmail ? 'block' : 'none'};"
          >
            <!---->
            <div class="form-item-content">
              <div class="_634393df" maxlength="20">
                <div
                  class="polo-input left polo-input-large polo-input-button"
                  width="100%"
                  maxlength="20"
                >
                  <button
                    on:click={(e) =>
                      e.pointerType ? (isPhone = true) : isPhone}
                    class="_94d06857 _96353d61"
                  >
                    {currentPhone.MobileCode ? currentPhone.MobileCode : ""}
                    <span class="_5cc0dd30"></span>
                  </button>
                  <input
                    type="number"
                    bind:value={phone}
                    placeholder="Phone"
                    width="100%"
                    maxlength="20"
                  />
                  <!---->
                </div>
              </div>
              {#if error === "Password is not strong" ? "error" : ""}
                <div class="msg-box" style="">
                  <div class="msg-box" style=""><!----> {error}</div>
                </div>
              {/if}
            </div>
          </div>
          <div data-key="password" class="form-item" data-v-39752d79="">
            <!---->
            <div class="form-item-content">
              <div class="_6b48c037" maxlength="54">
                <span class="f90d60ed">
                  {#if showPassword}
                    <input
                      type="text"
                      bind:value={password}
                      placeholder="Please enter your password"
                      maxlength="54"
                    />
                  {:else}
                    <input
                      type="password"
                      bind:value={password}
                      placeholder="Please enter your password"
                      maxlength="54"
                    />
                  {/if}
                  <!---->
                  <button
                    on:click={(e) => (showPassword = !showPassword)}
                    class="_3252b8aa df2187be {showPassword ? 'a24cf70b' : ''}"
                  ></button>
                </span>
                <!---->
                <div class="_2cf96413" style="display: none;"></div>
              </div>
              {#if error === "Password is not strong" ? "error" : ""}
                <div class="msg-box" style="">
                  <div class="msg-box" style=""><!----> {error}</div>
                </div>
              {/if}
            </div>
          </div>
          <div
            data-key="referral"
            class="form-item b21cb516"
            data-v-39752d79=""
          >
            <span class="item-label-title">{$_('referral-code-optional')}<span class="_37140af7">{$_('get-10-off')}</span>
              <button class="_9c04eb16" on:click={toggleRefField}></button>
            </span>
            <div class="form-item-content">
              <div
                class="polo-input left polo-input-large polo-input-default"
                maxlength="8"
                style={showRefCode ? "" : "display:none;"}
              >
                <!---->
                <input
                  type="text"
                  placeholder="10% off trading fee with a code! "
                  bind:value={refCode}
                  maxlength="9"
                />
                <!---->
              </div>
              <div class="msg-box" style="display: none;">
                <!---->
              </div>
            </div>
          </div>
          <div data-v-39752d79="" class="_59acf71e">
            <button
              on:click={handleSubmit}
              disabled={track}
              type="submit"
              class="polo-btn polo-btn-button polo-btn-primary polo-btn-large _48cc2c66"
              data-v-39752d79=""
              style="width: 100%;"
            >
              <!---->
              <div class="btn-sp">{$_('create-account')}</div>
            </button>
            <a
              href="/reward-center"
              target="_blank"
              class="c75bbaa0"
              data-v-39752d79="">{$_('up-to')}<strong>$1000</strong></a
            >
          </div>
          <p data-v-39752d79="" class="f8c64585">{$_('by-creating-account-i-agree-to-the')}<a href="/{$url}?support/terms">{$_('user-agreement')}</a
            >.
          </p>
          <p data-v-39752d79="" class="f8c64585 _02dc9043">{$_('already-have-an-account')}<a href="/login">{$_('login')}</a>
          </p>
        </div>
      </div>
    </div>
  </div>
</div>
<style>
</style>