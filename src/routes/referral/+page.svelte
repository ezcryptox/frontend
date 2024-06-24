<script>
  import Footer from "$lib/footer.svelte";
  // import "../../styles/referral.css";
  import Spot from "$lib/market/market-content/spot/spot.market.svelte";
  import { screen } from "$lib/store/screen";

  import { onMount } from "svelte";
  import { handleExchanegerate } from "$lib/home-page/hook";
  import SignedBanner from "../../lib/referrals/signedBanner.svelte";
  import UnsignedBanner from "../../lib/referrals/unsignedBanner.svelte";
  import QrCode from "../../lib/referrals/Modals/qrCode.svelte";

  $: tab = 1;
  let respons = [];
  $: loading = false;
  $: isSigned = true;

  $: refCode = "";
  $: QrCode_src = "";
  $: refCodeModalIsOpen = false;

  function handleRefModal() {
    refCodeModalIsOpen = !refCodeModalIsOpen;
  }

  onMount(async () => {
    loading = true;
    let { is_loading, response } = await handleExchanegerate();
    loading = is_loading;
    if (response) {
      respons = response;
    }
    const storedData = sessionStorage.getItem("user");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      refCode = parsedData?.user?.refCode;
      QrCode_src = parsedData?.user?.QrCode_src;
    }
  });
</script>

<!-- ////////////// -->
{#if QrCode_src && refCodeModalIsOpen}
  <QrCode {refCode} {QrCode_src} {handleRefModal} />
{/if}
<!-- //////////// -->
<!--  -->
<div class="wc-referral">
  <div data-v-1ed24750="" class="home">
    {#if isSigned}
      <SignedBanner {handleRefModal} />
    {/if}
    {#if !isSigned}
      <UnsignedBanner />
    {/if}
    <div data-v-1ed24750="" class="widget commission">
      <div data-v-1ed24750="" class="content">
        <div data-v-1ed24750="" class="bba24740">
          <div class="flex bad7fa93">
            <div class="_6fb0d8c5">
              <img
                alt=""
                src="https://v3.polo-static.com/spot-web/static/img/step_1.a1297cce.svg"
              />
              <div class="bc59fbae">
                <h3>Invitee Signup</h3>
                <p>
                  Your invitee accepts the invitation, signs up on Poloniex, and
                  complete trades.
                </p>
              </div>
            </div>
            <div class="_6fb0d8c5">
              <img
                alt=""
                src="https://v3.polo-static.com/spot-web/static/img/step_2.cbd2c2be.svg"
              />
              <div class="bc59fbae">
                <h3>Share 30% Commission</h3>
                <p>
                  For each trade your invitee completes, you'll earn a <strong
                    >20%</strong
                  >
                  commission on their trading fees, while they'll also receive a
                  rebate of <strong>10%</strong> on the same fees.
                </p>
              </div>
            </div>
            <div class="_6fb0d8c5">
              <img
                alt=""
                src="https://v3.polo-static.com/spot-web/static/img/step_3.cb2a1857.svg"
              />
              <div class="bc59fbae">
                <h3>
                  Refer friends to Unlock Mystery Boxes Together, Each Worth Up
                  to <strong>10,000</strong> USDT
                </h3>
                <p>
                  You'll receive <strong>1</strong> Mystery Box if your invitee
                  logs into Poloniex App within <strong>7 days</strong> after
                  signing up. When your invitee achieves a spot trading volume
                  of <strong>≥ 500 USDT</strong>, both you and the invitee will
                  get <strong>1</strong> Mystery Box each.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div data-v-1ed24750="" class="content">
      <div data-v-1ed24750="" class="cb5fde0e">
        <svg
          data-v-2360f2db=""
          xmlns="http://www.w3.org/2000/svg"
          width="64"
          height="64"
          viewBox="0 0 64 64"
          fill="none"
          ><mask data-v-2360f2db="" id="path-1-inside-1_2029_3804" fill="white"
            ><path
              data-v-2360f2db=""
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M48.4714 57.7699C51.1521 55.6095 52.4397 52.677 51.3474 51.2199C51.3402 51.2103 51.3329 51.2008 51.3256 51.1914L51.3274 51.19L50.5142 50.142L50.0971 50.4781C48.6492 50.1804 46.4809 50.9095 44.5156 52.4933C42.5504 54.0771 41.3339 56.0759 41.2549 57.6041L40.8063 57.9656L41.6021 58.9913C41.6143 59.0088 41.6269 59.0262 41.6397 59.0434C42.7321 60.5004 45.7908 59.9303 48.4714 57.7699Z"
            ></path></mask
          ><path
            data-v-2360f2db=""
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M48.4714 57.7699C51.1521 55.6095 52.4397 52.677 51.3474 51.2199C51.3402 51.2103 51.3329 51.2008 51.3256 51.1914L51.3274 51.19L50.5142 50.142L50.0971 50.4781C48.6492 50.1804 46.4809 50.9095 44.5156 52.4933C42.5504 54.0771 41.3339 56.0759 41.2549 57.6041L40.8063 57.9656L41.6021 58.9913C41.6143 59.0088 41.6269 59.0262 41.6397 59.0434C42.7321 60.5004 45.7908 59.9303 48.4714 57.7699Z"
            fill="black"
          ></path><path
            data-v-2360f2db=""
            d="M51.3474 51.2199L51.4625 51.1302L51.4625 51.1302L51.3474 51.2199ZM51.3256 51.1914L51.2361 51.0761L51.1221 51.168L51.2123 51.2835L51.3256 51.1914ZM51.3274 51.19L51.4168 51.3054L51.5305 51.2138L51.441 51.0984L51.3274 51.19ZM50.5142 50.142L50.6278 50.0504L50.5384 49.935L50.4247 50.0266L50.5142 50.142ZM50.0971 50.4781L50.0679 50.6225L50.1337 50.636L50.1866 50.5934L50.0971 50.4781ZM41.2549 57.6041L41.3444 57.7194L41.3959 57.6779L41.3994 57.6112L41.2549 57.6041ZM40.8063 57.9656L40.7169 57.8503L40.6032 57.9419L40.6927 58.0572L40.8063 57.9656ZM41.6021 58.9913L41.7205 58.9058L41.7158 58.8997L41.6021 58.9913ZM41.6397 59.0434L41.5246 59.133L41.5246 59.133L41.6397 59.0434ZM51.2322 51.3095C51.7304 51.9741 51.7045 53.0048 51.1923 54.1715C50.6831 55.3312 49.7075 56.5863 48.382 57.6546L48.5609 57.8852C49.916 56.7931 50.9246 55.5018 51.4563 54.2908C51.9849 53.0868 52.0567 51.9227 51.4625 51.1302L51.2322 51.3095ZM51.2123 51.2835C51.219 51.2921 51.2257 51.3008 51.2322 51.3095L51.4625 51.1302C51.4547 51.1199 51.4469 51.1096 51.4389 51.0994L51.2123 51.2835ZM51.2379 51.0747L51.2361 51.0761L51.4151 51.3068L51.4168 51.3054L51.2379 51.0747ZM50.4005 50.2335L51.2137 51.2816L51.441 51.0984L50.6278 50.0504L50.4005 50.2335ZM50.1866 50.5934L50.6037 50.2573L50.4247 50.0266L50.0076 50.3628L50.1866 50.5934ZM44.6051 52.6086C45.5763 51.826 46.5955 51.2563 47.5474 50.9192C48.5011 50.5815 49.3776 50.4806 50.0679 50.6225L50.1263 50.3337C49.3686 50.1779 48.4371 50.2927 47.4534 50.6411C46.4678 50.9901 45.4202 51.5769 44.4261 52.378L44.6051 52.6086ZM41.3994 57.6112C41.4752 56.1434 42.6556 54.1798 44.6051 52.6086L44.4261 52.378C42.4453 53.9744 41.1926 56.0084 41.1105 57.597L41.3994 57.6112ZM40.8958 58.0809L41.3444 57.7194L41.1654 57.4888L40.7169 57.8503L40.8958 58.0809ZM41.7158 58.8997L40.92 57.874L40.6927 58.0572L41.4885 59.0829L41.7158 58.8997ZM41.7548 58.9537C41.743 58.9379 41.7315 58.922 41.7203 58.9059L41.4839 59.0767C41.4971 59.0957 41.5107 59.1145 41.5246 59.133L41.7548 58.9537ZM48.382 57.6546C47.0563 58.7229 45.6429 59.3931 44.4345 59.6183C43.2191 59.8449 42.2521 59.6169 41.7548 58.9537L41.5246 59.133C42.1198 59.9269 43.2283 60.1424 44.4854 59.9081C45.7496 59.6724 47.2059 58.9773 48.5609 57.8852L48.382 57.6546Z"
            fill="black"
            mask="url(#path-1-inside-1_2029_3804)"
          ></path><path
            data-v-2360f2db=""
            d="M50.4471 50.1809C50.969 50.8771 50.9318 51.9405 50.4156 53.1162C49.9009 54.2884 48.9172 55.5525 47.5842 56.6267C46.2512 57.701 44.827 58.3775 43.6044 58.6054C42.3781 58.834 41.375 58.609 40.8531 57.9128C40.3312 57.2166 40.3684 56.1532 40.8846 54.9776C41.3993 53.8053 42.383 52.5412 43.716 51.467C45.0489 50.3927 46.4732 49.7162 47.6958 49.4883C48.922 49.2598 49.9251 49.4847 50.4471 50.1809Z"
            fill="white"
            stroke="black"
            stroke-width="0.145974"
          ></path><path
            data-v-2360f2db=""
            d="M26.284 15.208C24.1072 13.1182 19.8386 13.397 19.8386 13.397L23.0269 10.6464C23.0269 10.6464 25.2838 9.95669 28.4095 12.6448C31.5352 15.3329 31.8414 22.2115 31.8414 22.2115L28.8526 25.5627C28.8526 25.5627 29.4097 18.2087 26.284 15.208Z"
            fill="black"
            stroke="black"
            stroke-width="0.365714"
          ></path><path
            data-v-2360f2db=""
            d="M20.2109 18.6851C22.1568 22.3495 28.1041 26.5642 28.1041 26.5642L30.4007 23.6237C30.4007 23.6237 27.1381 21.9016 24.1493 17.8099C22.0614 14.9516 22.1552 11.708 22.7803 11.0203C23.2506 10.503 24.5307 10.6453 24.5307 10.6453C24.5307 10.6453 23.611 10.5004 23.0304 10.5828C21.3695 10.8187 20.3817 11.7714 19.7107 13.3089C19.1545 14.5837 19.2943 16.9591 20.2109 18.6851Z"
            fill="url(#paint0_linear_2029_3804)"
            stroke="#040815"
            stroke-width="0.365714"
            stroke-linejoin="round"
          ></path><path
            data-v-2360f2db=""
            d="M38.5255 19.5383C41.9013 17.3503 40.526 14.2871 40.526 14.2871L43.7768 16.6001C43.7768 16.6001 44.3394 18.5381 41.9013 20.9136C39.6652 23.0924 32.6492 23.7267 32.6492 23.7267L29.3984 21.7888C29.3984 21.7888 36.3009 20.9802 38.5255 19.5383Z"
            fill="black"
            stroke="black"
            stroke-width="0.365714"
          ></path><path
            data-v-2360f2db=""
            d="M34.7124 14.9113C31.0518 16.8644 28.2109 21.1003 28.2109 21.1003L31.2741 22.8507C31.2741 22.8507 33.5247 20.7876 37.4631 17.5994C39.8743 15.6475 43.1502 16.0217 43.5333 16.5246C43.9165 17.0275 43.7834 17.8374 43.7834 17.8374C43.7834 17.8374 43.9876 17.0247 43.7834 16.5871C43.3458 15.6494 42.0144 14.729 40.5263 14.2237C38.3614 13.4887 36.8443 13.7739 34.7124 14.9113Z"
            fill="url(#paint1_linear_2029_3804)"
            stroke="#040815"
            stroke-width="0.365714"
            stroke-linejoin="round"
          ></path><path
            data-v-2360f2db=""
            d="M48.5958 28.4501L44.0363 54.844L34.3066 47.3489L38.8646 20.9551L48.5958 28.4501Z"
            fill="#CECECE"
            stroke="black"
            stroke-width="0.365714"
          ></path><path
            data-v-2360f2db=""
            d="M44.0376 54.8446L18.6926 52.9741L8.96289 45.4805L34.3079 47.3496L44.0376 54.8446Z"
            fill="black"
            stroke="black"
            stroke-width="0.365714"
            stroke-linejoin="round"
          ></path><path
            data-v-2360f2db=""
            d="M34.3079 47.3489L8.96289 45.4798L13.5209 19.0859L38.8659 20.955L34.3079 47.3489Z"
            fill="white"
            stroke="black"
            stroke-width="0.365714"
          ></path><path
            data-v-2360f2db=""
            d="M23.5304 46.5939L18.7793 46.2188L23.5304 19.8379L28.094 20.1505L23.5304 46.5939Z"
            fill="url(#paint2_linear_2029_3804)"
            stroke="#040815"
            stroke-width="0.274286"
            stroke-linejoin="round"
          ></path><path
            data-v-2360f2db=""
            d="M38.5312 50.5313L42.9698 24.1504L45.4078 26.0258L40.9693 52.4067L38.5312 50.5313Z"
            fill="url(#paint3_linear_2029_3804)"
            stroke="#040815"
            stroke-width="0.274286"
            stroke-linejoin="round"
          ></path><path
            data-v-2360f2db=""
            d="M26.8417 53.5954L18.7773 46.2188L23.4659 46.5313L30.9051 53.8455L26.8417 53.5954Z"
            fill="#499939"
            stroke="black"
            stroke-width="0.365714"
          ></path><path
            data-v-2360f2db=""
            d="M13.7129 49.1543L38.5311 50.6546L40.9067 52.4675L16.0259 50.9047L13.7129 49.1543Z"
            fill="#499939"
            stroke="black"
            stroke-width="0.365714"
          ></path><path
            data-v-2360f2db=""
            d="M10.5278 9.46879L11.905 11.721L14.2077 11.9362L12.3621 13.33L12.375 15.9699L10.9978 13.7176L8.69507 13.5025L10.5407 12.1087L10.5278 9.46879Z"
            fill="#8FFF00"
            stroke="#0A0A0A"
            stroke-width="0.241274"
            stroke-linejoin="round"
          ></path><path
            data-v-2360f2db=""
            d="M53.7915 21.2889L53.0587 23.825L54.4538 25.6696L52.1798 25.2481L50.2402 27.0391L50.9731 24.5029L49.5779 22.6583L51.8519 23.0798L53.7915 21.2889Z"
            fill="white"
            stroke="#131316"
            stroke-width="0.365714"
            stroke-miterlimit="10"
            stroke-linejoin="round"
          ></path><defs data-v-2360f2db=""
            ><linearGradient
              data-v-2360f2db=""
              id="paint0_linear_2029_3804"
              x1="30.0161"
              y1="25.2249"
              x2="12.0943"
              y2="11.9118"
              gradientUnits="userSpaceOnUse"
              ><stop data-v-2360f2db="" stop-color="#83F57F"></stop><stop
                data-v-2360f2db=""
                offset="1"
                stop-color="#EDFF1C"
              ></stop></linearGradient
            ><linearGradient
              data-v-2360f2db=""
              id="paint1_linear_2029_3804"
              x1="29.6344"
              y1="22.61"
              x2="38.4285"
              y2="6.06564"
              gradientUnits="userSpaceOnUse"
              ><stop data-v-2360f2db="" stop-color="#83F57F"></stop><stop
                data-v-2360f2db=""
                offset="1"
                stop-color="#EDFF1C"
              ></stop></linearGradient
            ><linearGradient
              data-v-2360f2db=""
              id="paint2_linear_2029_3804"
              x1="19.6258"
              y1="45.8809"
              x2="40.4016"
              y2="38.0343"
              gradientUnits="userSpaceOnUse"
              ><stop data-v-2360f2db="" stop-color="#83F57F"></stop><stop
                data-v-2360f2db=""
                offset="1"
                stop-color="#EDFF1C"
              ></stop></linearGradient
            ><linearGradient
              data-v-2360f2db=""
              id="paint3_linear_2029_3804"
              x1="39.1562"
              y1="51.6538"
              x2="55.5398"
              y2="47.3282"
              gradientUnits="userSpaceOnUse"
              ><stop data-v-2360f2db="" stop-color="#83F57F"></stop><stop
                data-v-2360f2db=""
                offset="1"
                stop-color="#EDFF1C"
              ></stop></linearGradient
            ></defs
          ></svg
        >
        <div class="_9edb452b">
          <div class="cad5e470">
            Refer friends and Unlock Mystery Boxes Each Worth Up to 10,000 USDT
            Together
          </div>
          <div class="_68e9bac4">
            You'll receive <strong>1</strong> Mystery Box if your invitee logs
            into Poloniex App within <strong>7 days</strong> after signing up.
            When your invitee achieves a spot trading volume of
            <strong>≥ 500 USDT</strong>, both you and the invitee will get
            <strong>1</strong> Mystery Box each.
          </div>
        </div>
        <div class="_26815dbd">Invite Now</div>
        <!---->
      </div>
    </div>
    <!---->
    <div data-v-1ed24750="" class="widget">
      <div data-v-1ed24750="" class="content">
        <div data-v-6cc641e1="" data-v-1ed24750="" style="margin-bottom: 48px;">
          <div data-v-6cc641e1="" class="_4c45e0b0">
            <div class="ec58a5fa">
              More Benefits<svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="16"
                viewBox="0 0 24 16"
                fill="none"
                ><path
                  d="M17 0H19.5L23.5 8L19.5 16H17L21 8L17 0Z"
                  fill="url(#paint0_linear_918_1188)"
                ></path><path
                  d="M8.5 0H11L15 8L11 16H8.5L12.5 8L8.5 0Z"
                  fill="url(#paint1_linear_918_1188)"
                ></path><path
                  d="M0 0H2.5L6.5 8L2.5 16H0L4 8L0 0Z"
                  fill="url(#paint2_linear_918_1188)"
                ></path><defs
                  ><linearGradient
                    id="paint0_linear_918_1188"
                    x1="27.5"
                    y1="8"
                    x2="-7.5"
                    y2="8"
                    gradientUnits="userSpaceOnUse"
                    ><stop stop-color="white"></stop><stop
                      offset="1"
                      stop-color="#7CD614"
                    ></stop></linearGradient
                  ><linearGradient
                    id="paint1_linear_918_1188"
                    x1="27.5"
                    y1="8"
                    x2="-7.5"
                    y2="8"
                    gradientUnits="userSpaceOnUse"
                    ><stop stop-color="white"></stop><stop
                      offset="1"
                      stop-color="#7CD614"
                    ></stop></linearGradient
                  ><linearGradient
                    id="paint2_linear_918_1188"
                    x1="27.5"
                    y1="8"
                    x2="-7.5"
                    y2="8"
                    gradientUnits="userSpaceOnUse"
                    ><stop stop-color="white"></stop><stop
                      offset="1"
                      stop-color="#7CD614"
                    ></stop></linearGradient
                  ></defs
                ></svg
              >
            </div>
          </div>
          <div
            data-v-d4715390=""
            data-v-6cc641e1=""
            class="swiper-container swiper swiper-container-initialized swiper-container-horizontal"
          >
            <div
              class="swiper-wrapper"
              style="transform: translate3d(0px, 0px, 0px);"
            >
              <div
                data-v-d4715390=""
                class="swiper-slide swiper-slide-active"
                style="margin-right: 12px;"
              >
                <div data-v-d4715390="" class="_02c32b87">
                  <div class="c371f68e">A welcome bonus worth up to $1,000</div>
                  <div class="e1d37812">
                    Your friend will receive up to $1,000 as a welcome bonus
                    upon registering on Poloniex and can earn extra rewards by
                    completing Trading Tasks every day at the Reward Center.
                  </div>
                  <div class="f4bdc971">
                    <a
                      href="https://poloniex.com/reward-center/bonus"
                      target="_blank"
                      >View more <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="21"
                        height="16"
                        viewBox="0 0 21 16"
                        fill="none"
                        ><path
                          d="M0 7.82816H19M19 7.82816L12.0195 1.38672M19 7.82816L12.0195 14.2696"
                          stroke="#1A8F5C"
                          stroke-width="2"
                        ></path></svg
                      ></a
                    >
                  </div>
                  <img
                    src="https://www.datocms-assets.com/51952/1697195364-1000.png"
                    alt="A welcome bonus worth up to $1,000"
                  />
                </div>
              </div>
              <div
                data-v-d4715390=""
                class="swiper-slide swiper-slide-next"
                style="margin-right: 12px;"
              >
                <div data-v-d4715390="" class="_02c32b87">
                  <div class="c371f68e">Share industry dividends</div>
                  <div class="e1d37812">
                    We warmly welcome your suggestions regarding our products or
                    marketing plans. Let's work together with Poloniex to foster
                    the growth of the industry ecosystem and share its
                    dividends.
                  </div>
                  <!----><img
                    src="https://www.datocms-assets.com/51952/1697194093-.png"
                    alt="Share industry dividends"
                  />
                </div>
              </div>
              <!---->
            </div>
            <span
              class="swiper-notification"
              aria-live="assertive"
              aria-atomic="true"
            ></span>
          </div>
        </div>
        <div data-v-1ed24750="">
          <div class="_4c45e0b0">
            <div class="ec58a5fa">
              FAQs<svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="16"
                viewBox="0 0 24 16"
                fill="none"
                ><path
                  d="M17 0H19.5L23.5 8L19.5 16H17L21 8L17 0Z"
                  fill="url(#paint0_linear_918_1188)"
                ></path><path
                  d="M8.5 0H11L15 8L11 16H8.5L12.5 8L8.5 0Z"
                  fill="url(#paint1_linear_918_1188)"
                ></path><path
                  d="M0 0H2.5L6.5 8L2.5 16H0L4 8L0 0Z"
                  fill="url(#paint2_linear_918_1188)"
                ></path><defs
                  ><linearGradient
                    id="paint0_linear_918_1188"
                    x1="27.5"
                    y1="8"
                    x2="-7.5"
                    y2="8"
                    gradientUnits="userSpaceOnUse"
                    ><stop stop-color="white"></stop><stop
                      offset="1"
                      stop-color="#7CD614"
                    ></stop></linearGradient
                  ><linearGradient
                    id="paint1_linear_918_1188"
                    x1="27.5"
                    y1="8"
                    x2="-7.5"
                    y2="8"
                    gradientUnits="userSpaceOnUse"
                    ><stop stop-color="white"></stop><stop
                      offset="1"
                      stop-color="#7CD614"
                    ></stop></linearGradient
                  ><linearGradient
                    id="paint2_linear_918_1188"
                    x1="27.5"
                    y1="8"
                    x2="-7.5"
                    y2="8"
                    gradientUnits="userSpaceOnUse"
                    ><stop stop-color="white"></stop><stop
                      offset="1"
                      stop-color="#7CD614"
                    ></stop></linearGradient
                  ></defs
                ></svg
              >
            </div>
          </div>
          <ol class="e07c7627">
            <li>
              <p class="c81146a0">
                What kind of rewards can I receive by inviting friends to sign
                up on Poloniex?
              </p>
              <p class="_8857ec87">
                Poloniex Referral Program has undergone a major update! Each
                time you invite a friend to register and log in to the Poloniex
                App, you will receive a Mystery Box worth up to <strong
                  >10,000 USDT</strong
                >. When your invitee achieves a spot trading volume of
                <strong>≥ 500 USDT</strong>, both you and the invitee will get a
                Mystery Box each. Additionally, you'll also enjoy up to
                <strong>60%</strong> commission.
              </p>
            </li>
            <li>
              <p class="c81146a0">
                What is the maximum amount of referral rewards I can receive?
              </p>
              <p class="_8857ec87">
                You can invite an unlimited number of friends and enjoy infinite
                commission rewards. Moreover, each month, you'll receive
                additional Mystery Box rewards. The more friends you invite, the
                more Mystery Boxes you'll win.
              </p>
            </li>
            <li>
              <p class="c81146a0">When will I receive the referral rewards?</p>
              <p class="_8857ec87">
                To ensure the fairness and integrity of the event, we will
                carefully examine your invitee's account status. If there are no
                abnormal conditions with your invitee's account, both you and
                your invitee can check and claim the referral rewards via Wallet
                or Coupon Center.
              </p>
            </li>
          </ol>
          <a
            href="https://support.poloniex.com/hc/en-us/articles/6571052590999"
            target="_blank"
            class="_9dc1def7"
          >
            View more
          </a>
        </div>
        <div data-v-1ed24750="" class="flex justify-between ef367856">
          <div class="flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="72"
              height="63"
              viewBox="0 0 72 63"
              fill="none"
              ><path
                d="M7.00809 49.3494C6.08137 50.7873 5.86041 51.828 6.04079 52.5358L4.44592 53.277C3.90225 51.7826 4.47223 50.0656 5.54258 48.4049C6.70534 46.6008 8.61293 44.6118 11.0719 42.5571C16 38.4394 23.3015 33.9271 31.8079 29.9736C40.3143 26.0201 48.471 23.3479 54.7959 22.2356C57.9519 21.6806 60.7022 21.5047 62.8309 21.779C64.7905 22.0315 66.4704 22.7028 67.2623 24.0819L65.6675 24.8232C65.2427 24.229 64.3047 23.7269 62.6081 23.5082C60.7272 23.2659 58.1727 23.412 55.0979 23.9527C48.9613 25.0319 40.9523 27.6462 32.5427 31.5547C24.1332 35.4632 16.9712 39.8999 12.1899 43.8951C9.79412 45.8969 8.03544 47.7554 7.00809 49.3494Z"
                fill="white"
                stroke="black"
                stroke-width="0.584629"
              ></path><circle
                cx="36.0173"
                cy="38.2927"
                r="21.6429"
                fill="#2F9634"
                stroke="black"
                stroke-width="0.584629"
              ></circle><path
                d="M16.8571 53.9367C22.9937 52.8575 31.0027 50.2432 39.4123 46.3347C47.8218 42.4262 54.9838 37.9895 59.7651 33.9943C62.1609 31.9925 63.9196 30.134 64.9469 28.54C65.8736 27.1021 66.0946 26.0614 65.9142 25.3536L67.5091 24.6123C68.0527 26.1068 67.4828 27.8238 66.4124 29.4845C65.2496 31.2886 63.3421 33.2776 60.8831 35.3323C55.955 39.45 48.6535 43.9623 40.1471 47.9158C31.6407 51.8693 23.484 54.5415 17.1591 55.6538C14.0031 56.2088 11.2528 56.3847 9.12408 56.1104C7.16451 55.8579 5.48455 55.1866 4.69266 53.8075L6.28753 53.0662C6.71226 53.6604 7.6503 54.1625 9.34691 54.3812C11.2278 54.6235 13.7823 54.4774 16.8571 53.9367Z"
                fill="white"
                stroke="black"
                stroke-width="0.584629"
              ></path><circle
                cx="39.5515"
                cy="26.9538"
                r="3.23963"
                fill="#E59940"
                stroke="black"
                stroke-width="0.584629"
              ></circle><path
                d="M33.4965 42.1975C33.4965 45.0231 31.2875 47.2961 28.5839 47.2961C25.8803 47.2961 23.6712 45.0231 23.6712 42.1975C23.6712 39.3719 25.8803 37.099 28.5839 37.099C31.2875 37.099 33.4965 39.3719 33.4965 42.1975Z"
                fill="#E59940"
                stroke="black"
                stroke-width="0.584629"
              ></path><path
                d="M32.9011 15.3429L32.9011 4.05647L42.6754 9.69968L32.9011 15.3429Z"
                fill="white"
                stroke="black"
                stroke-width="0.584629"
              ></path><path
                d="M32.8635 15.249V19.3233"
                stroke="black"
                stroke-width="0.584629"
                stroke-linecap="round"
              ></path></svg
            >
            <div class="_5935a260">
              <h3 class="eb9ee20f">Poloniex Space Traveller</h3>
              <p class="_7578ffd7">
                Up to <span class="highlightNew"> 60% commission</span> waiting for
                you to unlock!
              </p>
            </div>
          </div>
          <div class="flex">
            <button class="_4b3dc099"> Join us now! </button><!---->
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<Footer />

<style>
</style>
