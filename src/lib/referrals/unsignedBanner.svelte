<script>
  import Footer from "$lib/footer.svelte";
  import "../../styles/referral.css";
  import Spot from "$lib/market/market-content/spot/spot.market.svelte";
  import { screen } from "$lib/store/screen";

  import { onMount } from "svelte";
  import { handleExchanegerate } from "$lib/home-page/hook";
  import Loader from "$lib/loader.svelte";
  import HModal from "../../lib/referrals/hModal.svelte";
  import ShareCode from "../../lib/referrals/Modals/shareCode.svelte";
  import SignedBanner from "../../lib/referrals/signedBanner.svelte";

  $: HModalOpen = false;
  $: tab = 1;
  let respons = [];
  $: loading = false;
  $: shareCodeModalIsOpen = true;

  function updateModalOpen() {
    HModalOpen = !HModalOpen;
  }

  onMount(async () => {
    loading = true;
    let { is_loading, response } = await handleExchanegerate();
    loading = is_loading;
    if (response) {
      respons = response;
    }
  });
</script>

<!-- ///// -->
{#if HModalOpen}
  <HModal {updateModalOpen} />
{/if}

<div data-v-1ed24750="" class="banner">
  <div data-v-1ed24750="" class="_8ca0ec16 fe217ee2">
    <div class="content da84151d">
      <div class="_10f77353">
        <div>
          <h1>Refer friends and earn easily</h1>
          <p>Earn commissions from your invitees' trades</p>
        </div>
        <div class="_14f6f023">
          <!----><!----><a
            href="https://support.poloniex.com/hc/en-us/articles/6571052590999"
            target="_blank"
            class="be65d88a e553ff25"
            >View the rules <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="14"
              viewBox="0 0 16 14"
              fill="none"
              ><path
                d="M0 7H14M14 7L8.37838 1M14 7L8.37838 13"
                stroke="currentColor"
                stroke-width="1.5"
              ></path></svg
            ></a
          >
        </div>
        <div class="_9e7a0370">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            ><path
              opacity="0.2"
              d="M20.5378 4.99182C23.0253 8.02891 22.9422 11.6537 19.1935 16.4057C15.8644 19.8328 11.0311 21.5052 8.11205 19.453C2.54441 15.5386 6.02506 12.0324 9.45633 8.03906C12.8876 4.04573 15.0984 -0.566168 20.5378 4.99182Z"
              fill="url(#paint0_linear_497_2256)"
            ></path><path
              d="M18.2561 4.74348C19.4708 6.22914 20.0497 7.84594 19.8768 9.66776C19.7032 11.4973 18.7692 13.5563 16.9105 15.9143C15.2661 17.605 13.2546 18.8588 11.3018 19.438C9.3445 20.0184 7.47025 19.9155 6.07221 18.9326C4.6963 17.9653 3.89881 17.0364 3.5139 16.1371C3.1312 15.243 3.14825 14.3594 3.43866 13.4614C3.73081 12.558 4.29908 11.6424 5.01649 10.6968C5.59677 9.93193 6.26716 9.15678 6.95785 8.35814C7.12109 8.16939 7.28547 7.97933 7.45006 7.78778C7.88121 7.286 8.29283 6.77494 8.69215 6.27767L8.74868 6.20727C9.12868 5.73402 9.4975 5.27467 9.86454 4.84496C10.6369 3.94074 11.3881 3.18396 12.1903 2.72173C12.9844 2.26413 13.8275 2.0955 14.7996 2.36733C15.78 2.64146 16.9093 3.36847 18.2561 4.74348Z"
              fill="#E3E3E3"
              stroke="black"
              stroke-width="0.36618"
            ></path><g filter="url(#filter0_i_497_2256)"
              ><ellipse
                cx="10.5802"
                cy="10.3473"
                rx="9.53316"
                ry="6.41899"
                transform="rotate(-49.3292 10.5802 10.3473)"
                fill="#CEFF00"
              ></ellipse></g
            ><path
              d="M16.6738 3.25557C17.958 4.35901 18.4728 6.1451 18.2342 8.17114C17.9957 10.1958 17.0051 12.4385 15.31 14.4113C13.6148 16.3841 11.5469 17.7011 9.58115 18.2416C7.61412 18.7825 5.77088 18.5424 4.48669 17.439C3.2025 16.3356 2.68768 14.5495 2.9263 12.5234C3.16476 10.4987 4.15539 8.25607 5.85052 6.28327C7.54565 4.31047 9.61362 2.99351 11.5793 2.45296C13.5464 1.91206 15.3896 2.15213 16.6738 3.25557Z"
              stroke="black"
              stroke-width="0.36618"
            ></path><path
              d="M15.1995 10.1675C15.3389 9.68472 13.9067 9.38301 11.8713 9.42213L12.1834 8.34163L14.6018 8.18312L15.0942 6.478L8.34338 6.92048L7.8509 8.62559L10.3043 8.46479L9.99241 9.54447C7.89297 9.77486 6.219 10.2811 6.07916 10.7652C5.9393 11.2495 7.37982 11.5516 9.42461 11.5104L8.42966 14.9552L10.3088 14.8321L11.3039 11.3865C13.3949 11.1551 15.06 10.6504 15.1995 10.1675ZM7.36896 10.4302C7.45 10.1496 8.55018 9.84589 9.97009 9.68543L9.63194 10.8562C8.25171 10.8793 7.28789 10.7109 7.36896 10.4302ZM11.456 10.7367L11.7942 9.56588C13.1765 9.54593 14.1376 9.71326 14.0572 9.99184C13.9767 10.2705 12.8799 10.5727 11.456 10.7367Z"
              fill="#090305"
            ></path><path
              d="M14.8137 1.27061C16.1333 2.40453 16.665 4.2422 16.4188 6.33271C16.1728 8.42163 15.1503 10.7373 13.3994 12.7751C11.6484 14.8129 9.51304 16.1722 7.48497 16.7299C5.45535 17.2881 3.55858 17.0391 2.23892 15.9052C0.91926 14.7713 0.387582 12.9336 0.633794 10.8431C0.879818 8.75415 1.90223 6.43852 3.65322 4.40071C5.40421 2.3629 7.53953 1.00354 9.56761 0.445845C11.5972 -0.112272 13.494 0.136698 14.8137 1.27061Z"
              stroke="url(#paint1_linear_497_2256)"
              stroke-width="0.435077"
            ></path><defs
              ><filter
                id="filter0_i_497_2256"
                x="2.68665"
                y="1.99219"
                width="15.7871"
                height="16.71"
                filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB"
                ><feFlood flood-opacity="0" result="BackgroundImageFix"
                ></feFlood><feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="BackgroundImageFix"
                  result="shape"
                ></feBlend><feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                ></feColorMatrix><feOffset dx="0.6103" dy="0.6103"
                ></feOffset><feComposite
                  in2="hardAlpha"
                  operator="arithmetic"
                  k2="-1"
                  k3="1"
                ></feComposite><feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0.502667 0 0 0 0 0.866667 0 0 0 0 0.216667 0 0 0 1 0"
                ></feColorMatrix><feBlend
                  mode="normal"
                  in2="shape"
                  result="effect1_innerShadow_497_2256"
                ></feBlend></filter
              ><linearGradient
                id="paint0_linear_497_2256"
                x1="21.3877"
                y1="10.8608"
                x2="10.0067"
                y2="7.40886"
                gradientUnits="userSpaceOnUse"
                ><stop offset="0.0856701" stop-color="#CEFF00" stop-opacity="0"
                ></stop><stop offset="1" stop-color="#CEFF00"
                ></stop></linearGradient
              ><linearGradient
                id="paint1_linear_497_2256"
                x1="3.48822"
                y1="4.25894"
                x2="18.2334"
                y2="8.32165"
                gradientUnits="userSpaceOnUse"
                ><stop stop-color="white"></stop><stop
                  offset="1"
                  stop-color="white"
                  stop-opacity="0"
                ></stop></linearGradient
              ></defs
            ></svg
          ><span
            ><strong>$</strong> commissions have been refunded to users</span
          ><span class="_5e79b267"
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="18"
              viewBox="0 0 16 18"
              fill="none"
              ><path
                d="M12.2143 2.57129H3.78577C2.95734 2.57129 2.28577 3.24286 2.28577 4.07129V13.9284C2.28577 14.7569 2.95734 15.4284 3.78577 15.4284H12.2143C13.0428 15.4284 13.7143 14.7569 13.7143 13.9284V10.3774V4.07129C13.7143 3.24286 13.0428 2.57129 12.2143 2.57129Z"
                stroke="#E59940"
              ></path><path d="M4 5.5H10" stroke="#E59940"></path><path
                d="M4 8H7"
                stroke="#E59940"
              ></path></svg
            >View leaderboard
          </span>
        </div>
      </div>
      <!---->
    </div>
    <!----><!---->
  </div>
</div>
