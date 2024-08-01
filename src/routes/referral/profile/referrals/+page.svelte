<script>
	import { _ } from 'svelte-i18n';
  import "../../../../styles/referral/p_referral.css";
  import Footer from "$lib/footer.svelte";
  import Modal from "$lib/referral/profile/Modals/referral.svelte";
  // import "../../../../styles/referral.css";

  $: isModalOPen = true;

  function handleModalOpen() {
    isModalOPen = !isModalOPen;
  }
</script>
{#if isModalOPen}
  <Modal {handleModalOpen} />
{/if}
<div class="wc-referral">
  <div data-v-3399c889="">
    <div data-v-3399c889="" class="_8948516f">
      <div class="content _5d2808b8">
        <div class="left">
          <h1>{$_('ezcryptox-referral-center')}</h1>
          <p>{$_('earn-commission')}</p>
          <div class="f73f9ec3">
            <!----><a
              href="/referral/"
              class="router-link-active _8dad4db1 _61be5a23"
            >{$_('check-the-referral-program')}<svg
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
        </div>
        <div class="right">
          <div class="fef54d3a">
            <div class="flex justify-between _893633d3">{$_('share-your-referral-code')}<!---->
            </div>
            <div class="_288b3943">
              <!---->
              <div class="a5fa35fa">
                <div class="b003f225">
                  <span>{$_('commission-rate')}</span><strong>20%</strong>
                </div>
                <div class="b003f225">
                  <span>{$_('total-earnings')}</span><strong>{$_('0-00-usdt')}</strong>
                </div>
              </div>
            </div>
            <div class="_5370c68a">
              <div class="_830a66f5">
                <label class="_27004f09">{$_('referral-code')}</label>
                <div class="a7a784a5"><span>EBMJA7QE</span></div>
              </div>
              <div class="bb8d5c1d">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  ><path
                    d="M6 1.75H14.25V10H12.75V3.25H6V1.75Z"
                    fill="currentColor"
                  ></path><path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M1.75 4.75V14.25H11.25V4.75H1.75ZM9.75 6.25H3.25V12.75H9.75V6.25Z"
                    fill="currentColor"
                  ></path></svg
                >
              </div>
            </div>
            <div class="_5370c68a">
              <div class="_830a66f5">
                <label class="_27004f09">{$_('referral-link')}</label>
                <div class="a7a784a5 _21bf3f75">
                  <span
                    >https://poloniex.com/signup?c=EBMJA7QE&amp;r=%2Freferral%2Ftasks</span
                  ><span>EBMJA7QE</span>
                </div>
              </div>
              <div class="bb8d5c1d">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  ><path
                    d="M6 1.75H14.25V10H12.75V3.25H6V1.75Z"
                    fill="currentColor"
                  ></path><path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M1.75 4.75V14.25H11.25V4.75H1.75ZM9.75 6.25H3.25V12.75H9.75V6.25Z"
                    fill="currentColor"
                  ></path></svg
                >
              </div>
            </div>
            <div class="flex justify-between e8611f99">
              <button class="_1a0f7f35" on:click={handleModalOpen}>{$_('invite-friends-now')}</button>
              <div class="_99bda4e8 qrcode-button flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="26"
                  height="26"
                  viewBox="0 0 26 26"
                  fill="none"
                  ><path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M2.86914 12.1875V2.86914H12.1875V12.1875H2.86914ZM5.30664 5.30664H9.75V9.75H5.30664V5.30664Z"
                    fill="currentColor"
                  ></path><path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M2.86914 23.1562V13.8379H12.1875V23.1562H2.86914ZM5.30664 16.2754H9.75V20.7188H5.30664V16.2754Z"
                    fill="currentColor"
                  ></path><path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M13.8379 2.86914V12.1875H23.1562V2.86914H13.8379ZM20.7188 5.30664H16.2754V9.75H20.7188V5.30664Z"
                    fill="currentColor"
                  ></path><path
                    d="M16.8594 19.9062H13.8379V23.1562H17.0879V19.9062H19.9062V23.1562H23.1562V19.9062H20.1094V18.7129H23.1562V13.8379H19.9062V16.6562H17.0879V13.8379H13.8379V18.7129H16.8594V19.9062Z"
                    fill="currentColor"
                  ></path></svg
                >
              </div>
            </div>
            <!----><!---->
          </div>
        </div>
      </div>
    </div>
    <main data-v-3399c889="">
      <div data-v-3399c889="" data-kol="0" class="c2825692">
        <div class="content _6c75d35c">
          <!----><!---->
          <div class="dd75317f">
            <div class="_859ec72a">
              <div class="d8501248">
                <span class="_1303b7e3">{$_('referral-commissions')}</span><span
                  class="f321c588">I</span
                ><span class="_486a1536 ant-dropdown-trigger">{$_('all')}<svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="13"
                    viewBox="0 0 12 13"
                    fill="none"
                    ><path
                      d="M2.94468 4.13281L9.05532 4.13281C9.69633 4.13281 10.0419 4.88491 9.62441 5.37131L6.5691 8.93075C6.26981 9.27942 5.73019 9.27942 5.4309 8.93075L2.37559 5.37131C1.95808 4.88491 2.30367 4.13281 2.94468 4.13281Z"
                      fill="#616161"
                    ></path></svg
                  ></span
                >
              </div>
              <div class="_95db046e">
                <strong>{$_('0-00-usdt')}</strong><span> ≈$0.00 </span>
              </div>
            </div>
            <div class="_85007b83"></div>
            <div class="f583df2e">
              <div class="_6c7773b5">
                <label>{$_('spot-earnings')}</label><strong>$0.00</strong>
              </div>
              <div class="_6c7773b5">
                <label>{$_('futures-earnings')}</label><strong>$0.00</strong>
              </div>
              <div data-label="firstInvitees" class="_6c7773b5">
                <label>{$_('invitees')}</label><strong>0</strong>
              </div>
              <div class="_6c7773b5">
                <label>{$_('traders')}</label><strong>0</strong>
              </div>
              <div class="_6c7773b5">
                <label>{$_('trade-activation-rate')}</label><strong>0%</strong>
              </div>
              <!---->
            </div>
          </div>
        </div>
      </div>
      <div data-v-3399c889="" class="content">
        <div data-v-3399c889="" class="_8558e97a">
          <div class="_7d2cefcb">
            <h2>{$_('referral-history')}</h2>
            <i
              aria-label="icon: question-circle"
              class="anticon anticon-question-circle _5dccde6c"
              ><svg
                viewBox="64 64 896 896"
                data-icon="question-circle"
                width="1em"
                height="1em"
                fill="currentColor"
                aria-hidden="true"
                focusable="false"
                class=""
                ><path
                  d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"
                ></path><path
                  d="M623.6 316.7C593.6 290.4 554 276 512 276s-81.6 14.5-111.6 40.7C369.2 344 352 380.7 352 420v7.6c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V420c0-44.1 43.1-80 96-80s96 35.9 96 80c0 31.1-22 59.6-56.1 72.7-21.2 8.1-39.2 22.3-52.1 40.9-13.1 19-19.9 41.8-19.9 64.9V620c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8v-22.7a48.3 48.3 0 0 1 30.9-44.8c59-22.7 97.1-74.7 97.1-132.5.1-39.3-17.1-76-48.3-103.3zM472 732a40 40 0 1 0 80 0 40 40 0 1 0-80 0z"
                ></path></svg
              ></i
            >
          </div>
          <section>
            <div class="_39b35d5b">
              <a
                href="/referral/profile/referrals"
                aria-current="page"
                class="router-link-exact-active _042ace51 _5451a841"
              >{$_('invitees')}</a><a href="/referral/profile/commissions" class="_5451a841">{$_('commissions')}</a><a href="/referral/profile/blindbox" class="_5451a841">{$_('mystery-boxes')}</a>
              <div class="_4340d8ff">
                <span class="_486a1536 ant-dropdown-trigger">{$_('all')}<svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="13"
                    viewBox="0 0 12 13"
                    fill="none"
                    ><path
                      d="M2.94468 4.13281L9.05532 4.13281C9.69633 4.13281 10.0419 4.88491 9.62441 5.37131L6.5691 8.93075C6.26981 9.27942 5.73019 9.27942 5.4309 8.93075L2.37559 5.37131C1.95808 4.88491 2.30367 4.13281 2.94468 4.13281Z"
                      fill="#616161"
                    ></path></svg
                  ></span
                ><!---->
              </div>
            </div>
            <div class="_270b4e4d">
              <div class="_0e963cf4">
                <div
                  class="ant-table-wrapper"
                  loginurl="/login"
                  signupurl="/signup"
                >
                  <div class="ant-spin-nested-loading">
                    <div class="ant-spin-container">
                      <div
                        class="ant-table ant-table-fixed-header ant-table-scroll-position-left ant-table-layout-fixed ant-table-default ant-table-empty"
                      >
                        <div class="ant-table-content">
                          <div class="ant-table-scroll">
                            <div
                              class="ant-table-header ant-table-hide-scrollbar"
                              style="margin-bottom: -11px; padding-bottom: 0px; min-width: 11px; overflow: scroll;"
                            >
                              <table class="">
                                <colgroup
                                  ><col /><col /><col /><col /><col /></colgroup
                                ><thead class="ant-table-thead"
                                  ><tr
                                    ><th
                                      key="email"
                                      class="ant-table-align-left"
                                      style="text-align: left;"
                                      ><span class="ant-table-header-column"
                                        ><div>
                                          <span class="ant-table-column-title"
                                            >{$_('g-email')}</span
                                          ><span class="ant-table-column-sorter"
                                          ></span>
                                        </div></span
                                      ></th
                                    ><th key="regDate" class=""
                                      ><span class="ant-table-header-column"
                                        ><div>
                                          <span class="ant-table-column-title"
                                            >{$_('joined-ezcryptox')}</span
                                          ><span class="ant-table-column-sorter"
                                          ></span>
                                        </div></span
                                      ></th
                                    ><th
                                      key="spotFirstRebate"
                                      class="ant-table-column-has-actions ant-table-column-has-sorters"
                                      ><span class="ant-table-header-column"
                                        ><div class="ant-table-column-sorters">
                                          <span class="ant-table-column-title"
                                            >{$_('spot-commission-usdt')}</span
                                          ><span class="ant-table-column-sorter"
                                            ><div
                                              title="Sort"
                                              class="ant-table-column-sorter-inner ant-table-column-sorter-inner-full"
                                            >
                                              <i
                                                aria-label="icon: caret-up"
                                                class="anticon anticon-caret-up ant-table-column-sorter-up off"
                                                ><svg
                                                  viewBox="0 0 1024 1024"
                                                  data-icon="caret-up"
                                                  width="1em"
                                                  height="1em"
                                                  fill="currentColor"
                                                  aria-hidden="true"
                                                  focusable="false"
                                                  class=""
                                                  ><path
                                                    d="M858.9 689L530.5 308.2c-9.4-10.9-27.5-10.9-37 0L165.1 689c-12.2 14.2-1.2 35 18.5 35h656.8c19.7 0 30.7-20.8 18.5-35z"
                                                  ></path></svg
                                                ></i
                                              ><i
                                                aria-label="icon: caret-down"
                                                class="anticon anticon-caret-down ant-table-column-sorter-down off"
                                                ><svg
                                                  viewBox="0 0 1024 1024"
                                                  data-icon="caret-down"
                                                  width="1em"
                                                  height="1em"
                                                  fill="currentColor"
                                                  aria-hidden="true"
                                                  focusable="false"
                                                  class=""
                                                  ><path
                                                    d="M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35l328.4 380.8c9.4 10.9 27.5 10.9 37 0L858.9 335c12.2-14.2 1.2-35-18.5-35z"
                                                  ></path></svg
                                                ></i
                                              >
                                            </div></span
                                          >
                                        </div></span
                                      ></th
                                    ><th
                                      key="futuresFirstRebate"
                                      class="ant-table-column-has-actions ant-table-column-has-sorters"
                                      ><span class="ant-table-header-column"
                                        ><div class="ant-table-column-sorters">
                                          <span class="ant-table-column-title"
                                            >{$_('futures-commission-usdt')}</span
                                          ><span class="ant-table-column-sorter"
                                            ><div
                                              title="Sort"
                                              class="ant-table-column-sorter-inner ant-table-column-sorter-inner-full"
                                            >
                                              <i
                                                aria-label="icon: caret-up"
                                                class="anticon anticon-caret-up ant-table-column-sorter-up off"
                                                ><svg
                                                  viewBox="0 0 1024 1024"
                                                  data-icon="caret-up"
                                                  width="1em"
                                                  height="1em"
                                                  fill="currentColor"
                                                  aria-hidden="true"
                                                  focusable="false"
                                                  class=""
                                                  ><path
                                                    d="M858.9 689L530.5 308.2c-9.4-10.9-27.5-10.9-37 0L165.1 689c-12.2 14.2-1.2 35 18.5 35h656.8c19.7 0 30.7-20.8 18.5-35z"
                                                  ></path></svg
                                                ></i
                                              ><i
                                                aria-label="icon: caret-down"
                                                class="anticon anticon-caret-down ant-table-column-sorter-down off"
                                                ><svg
                                                  viewBox="0 0 1024 1024"
                                                  data-icon="caret-down"
                                                  width="1em"
                                                  height="1em"
                                                  fill="currentColor"
                                                  aria-hidden="true"
                                                  focusable="false"
                                                  class=""
                                                  ><path
                                                    d="M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35l328.4 380.8c9.4 10.9 27.5 10.9 37 0L858.9 335c12.2-14.2 1.2-35-18.5-35z"
                                                  ></path></svg
                                                ></i
                                              >
                                            </div></span
                                          >
                                        </div></span
                                      ></th
                                    ><th
                                      key="totalRebate"
                                      class="ant-table-column-has-actions ant-table-column-has-sorters ant-table-align-right ant-table-row-cell-last"
                                      style="text-align: right;"
                                      ><span class="ant-table-header-column"
                                        ><div class="ant-table-column-sorters">
                                          <span class="ant-table-column-title"
                                            >{$_('total-commission-usdt')}</span
                                          ><span class="ant-table-column-sorter"
                                            ><div
                                              title="Sort"
                                              class="ant-table-column-sorter-inner ant-table-column-sorter-inner-full"
                                            >
                                              <i
                                                aria-label="icon: caret-up"
                                                class="anticon anticon-caret-up ant-table-column-sorter-up off"
                                                ><svg
                                                  viewBox="0 0 1024 1024"
                                                  data-icon="caret-up"
                                                  width="1em"
                                                  height="1em"
                                                  fill="currentColor"
                                                  aria-hidden="true"
                                                  focusable="false"
                                                  class=""
                                                  ><path
                                                    d="M858.9 689L530.5 308.2c-9.4-10.9-27.5-10.9-37 0L165.1 689c-12.2 14.2-1.2 35 18.5 35h656.8c19.7 0 30.7-20.8 18.5-35z"
                                                  ></path></svg
                                                ></i
                                              ><i
                                                aria-label="icon: caret-down"
                                                class="anticon anticon-caret-down ant-table-column-sorter-down off"
                                                ><svg
                                                  viewBox="0 0 1024 1024"
                                                  data-icon="caret-down"
                                                  width="1em"
                                                  height="1em"
                                                  fill="currentColor"
                                                  aria-hidden="true"
                                                  focusable="false"
                                                  class=""
                                                  ><path
                                                    d="M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35l328.4 380.8c9.4 10.9 27.5 10.9 37 0L858.9 335c12.2-14.2 1.2-35-18.5-35z"
                                                  ></path></svg
                                                ></i
                                              >
                                            </div></span
                                          >
                                        </div></span
                                      ></th
                                    ></tr
                                  ></thead
                                >
                              </table>
                            </div>
                            <div
                              tabindex="-1"
                              class="ant-table-body"
                              style="max-height: 350px; overflow-y: scroll;"
                            >
                              <table class="">
                                <colgroup
                                  ><col /><col /><col /><col /><col /></colgroup
                                ><tbody class="ant-table-tbody"></tbody>
                              </table>
                            </div>
                            <div class="ant-table-placeholder">
                              <div class="empty-wrapper">
                                <svg
                                  width="80"
                                  height="80"
                                  viewBox="0 0 80 80"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                  ><path
                                    d="M64 55.2593L50 69L17.8182 69C16.814 69 16 68.186 16 67.1818L16 17.8182C16 16.814 16.814 16 17.8182 16L62.1818 16C63.186 16 64 16.814 64 17.8182L64 55.2593Z"
                                    fill="#E3E3E3"
                                  ></path><path
                                    d="M50 55.9091C50 55.407 50.407 55 50.9091 55L64 55L57 62L50 69L50 55.9091Z"
                                    fill="#B8B8B8"
                                  ></path><rect
                                    width="26"
                                    height="3.63636"
                                    rx="0.909091"
                                    transform="matrix(1 5.56363e-08 5.56363e-08 -1 28 46.5469)"
                                    fill="#FAFAFA"
                                  ></rect><rect
                                    width="22"
                                    height="3.63637"
                                    rx="0.909091"
                                    transform="matrix(1 5.56363e-08 5.56363e-08 -1 28 35.6367)"
                                    fill="#FAFAFA"
                                  ></rect><circle
                                    cx="20.9091"
                                    cy="19.9091"
                                    r="10.9091"
                                    fill="#2B2B2E"
                                  ></circle><path
                                    d="M21.5815 23.0699H19.7751C19.347 23.0699 19 23.417 19 23.8451V25.6514C19 26.0795 19.347 26.4266 19.7751 26.4266H21.5815C22.0096 26.4266 22.3566 26.0795 22.3566 25.6514V23.8451C22.3566 23.417 22.0096 23.0699 21.5815 23.0699Z"
                                    fill="#FAFAFA"
                                  ></path><path
                                    d="M21.5815 13H19.7751C19.347 13 19 13.347 19 13.7751V20.6165C19 21.0446 19.347 21.3916 19.7751 21.3916H21.5815C22.0096 21.3916 22.3566 21.0446 22.3566 20.6165V13.7751C22.3566 13.347 22.0096 13 21.5815 13Z"
                                    fill="#FAFAFA"
                                  ></path></svg
                                ><!---->
                                <div>
                                  <button
                                    type="button"
                                    class="empty-button polo-btn polo-btn-button polo-btn-primary polo-btn-medium"
                                    on:click={handleModalOpen}
                                    ><!---->
                                    <div class="btn-sp">{$_('invite-friends-now')}</div></button
                                  >
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="_3e06ff50">{$_('only-displays-180')}</div>
          </section>
        </div>
      </div>
      <!---->
      <div data-v-3399c889="" class="content">
        <h2 data-v-3399c889="">{$_('top-inviters')}</h2>
        <div data-v-3399c889="" class="card">
          <div data-v-3399c889="" class="_86658441" hasdarkmode="true">
            <div class="_0e963cf4">
              <div class="ant-table-wrapper">
                <div class="ant-spin-nested-loading">
                  <div class="ant-spin-container">
                    <div
                      class="ant-table ant-table-scroll-position-left ant-table-layout-fixed ant-table-default"
                    >
                      <div class="ant-table-content">
                        <!---->
                        <div class="ant-table-body">
                          <table class="">
                            <colgroup
                              ><col style="width: 55px; min-width: 55px;" /><col
                                style="width: 125px; min-width: 125px;"
                              /><col
                                style="width: 72px; min-width: 72px;"
                              /><col
                                style="width: 100px; min-width: 100px;"
                              /></colgroup
                            ><thead class="ant-table-thead"
                              ><tr
                                ><th
                                  key="ranking"
                                  class="ant-table-row-cell-break-word"
                                  ><span class="ant-table-header-column"
                                    ><div>
                                      <span class="ant-table-column-title"
                                        >{$_('ranking')}</span
                                      ><span class="ant-table-column-sorter"
                                      ></span>
                                    </div></span
                                  ></th
                                ><th
                                  key="email"
                                  class="ant-table-row-cell-break-word"
                                  ><span class="ant-table-header-column"
                                    ><div>
                                      <span class="ant-table-column-title"
                                        >{$_('g-email')}</span
                                      ><span class="ant-table-column-sorter"
                                      ></span>
                                    </div></span
                                  ></th
                                ><th
                                  key="invitees"
                                  class="ant-table-row-cell-break-word"
                                  ><span class="ant-table-header-column"
                                    ><div>
                                      <span class="ant-table-column-title"
                                        >{$_('invitees')}</span
                                      ><span class="ant-table-column-sorter"
                                      ></span>
                                    </div></span
                                  ></th
                                ><th
                                  key="totalRebate"
                                  class="ant-table-align-right ant-table-row-cell-break-word ant-table-row-cell-last"
                                  style="text-align: right;"
                                  ><span class="ant-table-header-column"
                                    ><div>
                                      <span class="ant-table-column-title"
                                        >{$_('earnings-usdt')}</span
                                      ><span class="ant-table-column-sorter"
                                      ></span>
                                    </div></span
                                  ></th
                                ></tr
                              ></thead
                            ><tbody class="ant-table-tbody"
                              ><tr
                                class="ant-table-row ant-table-row-level-0 _9b7b4107"
                                data-row-key="am***ck@gm***om"
                                ><td class="ant-table-row-cell-break-word"
                                  ><div data-index="0" class="ec42ef1b">
                                    <span>1</span>
                                  </div></td
                                ><td class="ant-table-row-cell-break-word"
                                  ><div data-index="0" class="_8513f9e3">
                                    am***ck@gm***om
                                  </div></td
                                ><td class="ant-table-row-cell-break-word"
                                  ><div data-index="0" class="_4689f51d">
                                    80
                                  </div></td
                                ><td
                                  class="ant-table-row-cell-break-word"
                                  style="text-align: right;"
                                  ><div data-index="0" class="_3f342225">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="16"
                                      height="16"
                                      viewBox="0 0 16 16"
                                      fill="none"
                                      ><path
                                        d="M13 7.67777C13 7.20656 11.302 6.81297 9.0398 6.71915V5.66443H11.6915V4L4.28945 4V5.66443H6.97944V6.71835C4.70745 6.81067 3 7.20518 3 7.67777C3 8.15047 4.70745 8.54498 6.97944 8.63736V12H9.0398V8.63662C11.302 8.54274 13 8.14915 13 7.67777ZM4.33333 7.42849C4.33333 7.15459 5.46488 6.92419 7 6.85714V8C5.46488 7.93295 4.33333 7.7025 4.33333 7.42849ZM9 8V6.85714C10.5385 6.92745 11.6667 7.15661 11.6667 7.42854C11.6667 7.70053 10.5385 7.92975 9 8Z"
                                        fill="#878787"
                                      ></path></svg
                                    >14,860.39
                                  </div></td
                                ></tr
                              ><tr
                                class="ant-table-row ant-table-row-level-0 _9b7b4107"
                                data-row-key="wu***23@gm***om"
                                ><td class="ant-table-row-cell-break-word"
                                  ><div data-index="1" class="ec42ef1b">
                                    <span>2</span>
                                  </div></td
                                ><td class="ant-table-row-cell-break-word"
                                  ><div data-index="1" class="_8513f9e3">
                                    wu***23@gm***om
                                  </div></td
                                ><td class="ant-table-row-cell-break-word"
                                  ><div data-index="1" class="_4689f51d">
                                    18
                                  </div></td
                                ><td
                                  class="ant-table-row-cell-break-word"
                                  style="text-align: right;"
                                  ><div data-index="1" class="_3f342225">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="16"
                                      height="16"
                                      viewBox="0 0 16 16"
                                      fill="none"
                                      ><path
                                        d="M13 7.67777C13 7.20656 11.302 6.81297 9.0398 6.71915V5.66443H11.6915V4L4.28945 4V5.66443H6.97944V6.71835C4.70745 6.81067 3 7.20518 3 7.67777C3 8.15047 4.70745 8.54498 6.97944 8.63736V12H9.0398V8.63662C11.302 8.54274 13 8.14915 13 7.67777ZM4.33333 7.42849C4.33333 7.15459 5.46488 6.92419 7 6.85714V8C5.46488 7.93295 4.33333 7.7025 4.33333 7.42849ZM9 8V6.85714C10.5385 6.92745 11.6667 7.15661 11.6667 7.42854C11.6667 7.70053 10.5385 7.92975 9 8Z"
                                        fill="#878787"
                                      ></path></svg
                                    >10,021.24
                                  </div></td
                                ></tr
                              ><tr
                                class="ant-table-row ant-table-row-level-0 _9b7b4107"
                                data-row-key="ze***eh@gm***om"
                                ><td class="ant-table-row-cell-break-word"
                                  ><div data-index="2" class="ec42ef1b">
                                    <span>3</span>
                                  </div></td
                                ><td class="ant-table-row-cell-break-word"
                                  ><div data-index="2" class="_8513f9e3">
                                    ze***eh@gm***om
                                  </div></td
                                ><td class="ant-table-row-cell-break-word"
                                  ><div data-index="2" class="_4689f51d">
                                    467
                                  </div></td
                                ><td
                                  class="ant-table-row-cell-break-word"
                                  style="text-align: right;"
                                  ><div data-index="2" class="_3f342225">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="16"
                                      height="16"
                                      viewBox="0 0 16 16"
                                      fill="none"
                                      ><path
                                        d="M13 7.67777C13 7.20656 11.302 6.81297 9.0398 6.71915V5.66443H11.6915V4L4.28945 4V5.66443H6.97944V6.71835C4.70745 6.81067 3 7.20518 3 7.67777C3 8.15047 4.70745 8.54498 6.97944 8.63736V12H9.0398V8.63662C11.302 8.54274 13 8.14915 13 7.67777ZM4.33333 7.42849C4.33333 7.15459 5.46488 6.92419 7 6.85714V8C5.46488 7.93295 4.33333 7.7025 4.33333 7.42849ZM9 8V6.85714C10.5385 6.92745 11.6667 7.15661 11.6667 7.42854C11.6667 7.70053 10.5385 7.92975 9 8Z"
                                        fill="#878787"
                                      ></path></svg
                                    >7,733.48
                                  </div></td
                                ></tr
                              ><tr
                                class="ant-table-row ant-table-row-level-0 _9b7b4107"
                                data-row-key="ha***71@gm***om"
                                ><td class="ant-table-row-cell-break-word"
                                  ><div data-index="3" class="ec42ef1b">
                                    <span>4</span>
                                  </div></td
                                ><td class="ant-table-row-cell-break-word"
                                  ><div data-index="3" class="_8513f9e3">
                                    ha***71@gm***om
                                  </div></td
                                ><td class="ant-table-row-cell-break-word"
                                  ><div data-index="3" class="_4689f51d">
                                    2
                                  </div></td
                                ><td
                                  class="ant-table-row-cell-break-word"
                                  style="text-align: right;"
                                  ><div data-index="3" class="_3f342225">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="16"
                                      height="16"
                                      viewBox="0 0 16 16"
                                      fill="none"
                                      ><path
                                        d="M13 7.67777C13 7.20656 11.302 6.81297 9.0398 6.71915V5.66443H11.6915V4L4.28945 4V5.66443H6.97944V6.71835C4.70745 6.81067 3 7.20518 3 7.67777C3 8.15047 4.70745 8.54498 6.97944 8.63736V12H9.0398V8.63662C11.302 8.54274 13 8.14915 13 7.67777ZM4.33333 7.42849C4.33333 7.15459 5.46488 6.92419 7 6.85714V8C5.46488 7.93295 4.33333 7.7025 4.33333 7.42849ZM9 8V6.85714C10.5385 6.92745 11.6667 7.15661 11.6667 7.42854C11.6667 7.70053 10.5385 7.92975 9 8Z"
                                        fill="#878787"
                                      ></path></svg
                                    >6,666.66
                                  </div></td
                                ></tr
                              ><tr
                                class="ant-table-row ant-table-row-level-0 _9b7b4107"
                                data-row-key="ar***na@ic***om"
                                ><td class="ant-table-row-cell-break-word"
                                  ><div data-index="4" class="ec42ef1b">
                                    <span>5</span>
                                  </div></td
                                ><td class="ant-table-row-cell-break-word"
                                  ><div data-index="4" class="_8513f9e3">
                                    ar***na@ic***om
                                  </div></td
                                ><td class="ant-table-row-cell-break-word"
                                  ><div data-index="4" class="_4689f51d">
                                    10
                                  </div></td
                                ><td
                                  class="ant-table-row-cell-break-word"
                                  style="text-align: right;"
                                  ><div data-index="4" class="_3f342225">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="16"
                                      height="16"
                                      viewBox="0 0 16 16"
                                      fill="none"
                                      ><path
                                        d="M13 7.67777C13 7.20656 11.302 6.81297 9.0398 6.71915V5.66443H11.6915V4L4.28945 4V5.66443H6.97944V6.71835C4.70745 6.81067 3 7.20518 3 7.67777C3 8.15047 4.70745 8.54498 6.97944 8.63736V12H9.0398V8.63662C11.302 8.54274 13 8.14915 13 7.67777ZM4.33333 7.42849C4.33333 7.15459 5.46488 6.92419 7 6.85714V8C5.46488 7.93295 4.33333 7.7025 4.33333 7.42849ZM9 8V6.85714C10.5385 6.92745 11.6667 7.15661 11.6667 7.42854C11.6667 7.70053 10.5385 7.92975 9 8Z"
                                        fill="#878787"
                                      ></path></svg
                                    >5,841.17
                                  </div></td
                                ></tr
                              ><tr
                                class="ant-table-row ant-table-row-level-0 _9b7b4107"
                                data-row-key="sa***02@gm***om"
                                ><td class="ant-table-row-cell-break-word"
                                  ><div data-index="5" class="ec42ef1b">
                                    <span>6</span>
                                  </div></td
                                ><td class="ant-table-row-cell-break-word"
                                  ><div data-index="5" class="_8513f9e3">
                                    sa***02@gm***om
                                  </div></td
                                ><td class="ant-table-row-cell-break-word"
                                  ><div data-index="5" class="_4689f51d">
                                    18
                                  </div></td
                                ><td
                                  class="ant-table-row-cell-break-word"
                                  style="text-align: right;"
                                  ><div data-index="5" class="_3f342225">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="16"
                                      height="16"
                                      viewBox="0 0 16 16"
                                      fill="none"
                                      ><path
                                        d="M13 7.67777C13 7.20656 11.302 6.81297 9.0398 6.71915V5.66443H11.6915V4L4.28945 4V5.66443H6.97944V6.71835C4.70745 6.81067 3 7.20518 3 7.67777C3 8.15047 4.70745 8.54498 6.97944 8.63736V12H9.0398V8.63662C11.302 8.54274 13 8.14915 13 7.67777ZM4.33333 7.42849C4.33333 7.15459 5.46488 6.92419 7 6.85714V8C5.46488 7.93295 4.33333 7.7025 4.33333 7.42849ZM9 8V6.85714C10.5385 6.92745 11.6667 7.15661 11.6667 7.42854C11.6667 7.70053 10.5385 7.92975 9 8Z"
                                        fill="#878787"
                                      ></path></svg
                                    >4,817.05
                                  </div></td
                                ></tr
                              ><tr
                                class="ant-table-row ant-table-row-level-0 _9b7b4107"
                                data-row-key="al***la@gm***om"
                                ><td class="ant-table-row-cell-break-word"
                                  ><div data-index="6" class="ec42ef1b">
                                    <span>7</span>
                                  </div></td
                                ><td class="ant-table-row-cell-break-word"
                                  ><div data-index="6" class="_8513f9e3">
                                    al***la@gm***om
                                  </div></td
                                ><td class="ant-table-row-cell-break-word"
                                  ><div data-index="6" class="_4689f51d">
                                    8
                                  </div></td
                                ><td
                                  class="ant-table-row-cell-break-word"
                                  style="text-align: right;"
                                  ><div data-index="6" class="_3f342225">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="16"
                                      height="16"
                                      viewBox="0 0 16 16"
                                      fill="none"
                                      ><path
                                        d="M13 7.67777C13 7.20656 11.302 6.81297 9.0398 6.71915V5.66443H11.6915V4L4.28945 4V5.66443H6.97944V6.71835C4.70745 6.81067 3 7.20518 3 7.67777C3 8.15047 4.70745 8.54498 6.97944 8.63736V12H9.0398V8.63662C11.302 8.54274 13 8.14915 13 7.67777ZM4.33333 7.42849C4.33333 7.15459 5.46488 6.92419 7 6.85714V8C5.46488 7.93295 4.33333 7.7025 4.33333 7.42849ZM9 8V6.85714C10.5385 6.92745 11.6667 7.15661 11.6667 7.42854C11.6667 7.70053 10.5385 7.92975 9 8Z"
                                        fill="#878787"
                                      ></path></svg
                                    >4,669.07
                                  </div></td
                                ></tr
                              ><tr
                                class="ant-table-row ant-table-row-level-0 _9b7b4107"
                                data-row-key="Ed***el@ho***om"
                                ><td class="ant-table-row-cell-break-word"
                                  ><div data-index="7" class="ec42ef1b">
                                    <span>8</span>
                                  </div></td
                                ><td class="ant-table-row-cell-break-word"
                                  ><div data-index="7" class="_8513f9e3">
                                    Ed***el@ho***om
                                  </div></td
                                ><td class="ant-table-row-cell-break-word"
                                  ><div data-index="7" class="_4689f51d">
                                    66
                                  </div></td
                                ><td
                                  class="ant-table-row-cell-break-word"
                                  style="text-align: right;"
                                  ><div data-index="7" class="_3f342225">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="16"
                                      height="16"
                                      viewBox="0 0 16 16"
                                      fill="none"
                                      ><path
                                        d="M13 7.67777C13 7.20656 11.302 6.81297 9.0398 6.71915V5.66443H11.6915V4L4.28945 4V5.66443H6.97944V6.71835C4.70745 6.81067 3 7.20518 3 7.67777C3 8.15047 4.70745 8.54498 6.97944 8.63736V12H9.0398V8.63662C11.302 8.54274 13 8.14915 13 7.67777ZM4.33333 7.42849C4.33333 7.15459 5.46488 6.92419 7 6.85714V8C5.46488 7.93295 4.33333 7.7025 4.33333 7.42849ZM9 8V6.85714C10.5385 6.92745 11.6667 7.15661 11.6667 7.42854C11.6667 7.70053 10.5385 7.92975 9 8Z"
                                        fill="#878787"
                                      ></path></svg
                                    >4,318.79
                                  </div></td
                                ></tr
                              ><tr
                                class="ant-table-row ant-table-row-level-0 _9b7b4107"
                                data-row-key="ad***82@gm***om"
                                ><td class="ant-table-row-cell-break-word"
                                  ><div data-index="8" class="ec42ef1b">
                                    <span>9</span>
                                  </div></td
                                ><td class="ant-table-row-cell-break-word"
                                  ><div data-index="8" class="_8513f9e3">
                                    ad***82@gm***om
                                  </div></td
                                ><td class="ant-table-row-cell-break-word"
                                  ><div data-index="8" class="_4689f51d">
                                    4
                                  </div></td
                                ><td
                                  class="ant-table-row-cell-break-word"
                                  style="text-align: right;"
                                  ><div data-index="8" class="_3f342225">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="16"
                                      height="16"
                                      viewBox="0 0 16 16"
                                      fill="none"
                                      ><path
                                        d="M13 7.67777C13 7.20656 11.302 6.81297 9.0398 6.71915V5.66443H11.6915V4L4.28945 4V5.66443H6.97944V6.71835C4.70745 6.81067 3 7.20518 3 7.67777C3 8.15047 4.70745 8.54498 6.97944 8.63736V12H9.0398V8.63662C11.302 8.54274 13 8.14915 13 7.67777ZM4.33333 7.42849C4.33333 7.15459 5.46488 6.92419 7 6.85714V8C5.46488 7.93295 4.33333 7.7025 4.33333 7.42849ZM9 8V6.85714C10.5385 6.92745 11.6667 7.15661 11.6667 7.42854C11.6667 7.70053 10.5385 7.92975 9 8Z"
                                        fill="#878787"
                                      ></path></svg
                                    >4,051.97
                                  </div></td
                                ></tr
                              ><tr
                                class="ant-table-row ant-table-row-level-0 _9b7b4107"
                                data-row-key="th***pt@gm***om"
                                ><td class="ant-table-row-cell-break-word"
                                  ><div data-index="9" class="ec42ef1b">
                                    <span>10</span>
                                  </div></td
                                ><td class="ant-table-row-cell-break-word"
                                  ><div data-index="9" class="_8513f9e3">
                                    th***pt@gm***om
                                  </div></td
                                ><td class="ant-table-row-cell-break-word"
                                  ><div data-index="9" class="_4689f51d">
                                    9
                                  </div></td
                                ><td
                                  class="ant-table-row-cell-break-word"
                                  style="text-align: right;"
                                  ><div data-index="9" class="_3f342225">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="16"
                                      height="16"
                                      viewBox="0 0 16 16"
                                      fill="none"
                                      ><path
                                        d="M13 7.67777C13 7.20656 11.302 6.81297 9.0398 6.71915V5.66443H11.6915V4L4.28945 4V5.66443H6.97944V6.71835C4.70745 6.81067 3 7.20518 3 7.67777C3 8.15047 4.70745 8.54498 6.97944 8.63736V12H9.0398V8.63662C11.302 8.54274 13 8.14915 13 7.67777ZM4.33333 7.42849C4.33333 7.15459 5.46488 6.92419 7 6.85714V8C5.46488 7.93295 4.33333 7.7025 4.33333 7.42849ZM9 8V6.85714C10.5385 6.92745 11.6667 7.15661 11.6667 7.42854C11.6667 7.70053 10.5385 7.92975 9 8Z"
                                        fill="#878787"
                                      ></path></svg
                                    >3,936.38
                                  </div></td
                                ></tr
                              ></tbody
                            >
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div data-v-3399c889="" class="content">
        <div data-v-3399c889="">
          <div class="_4c45e0b0"><div class="ec58a5fa">{$_('faqs')}<!----></div></div>
          <ol class="e07c7627">
            <li>
              <p class="c81146a0">{$_('what-kind-of-rewards')}</p>
              <p class="_8857ec87">{$_('referral-program-update')}<strong
                  >{$_('10-000-usdt')}</strong
                >{$_('invitee-achieves-spot-volume')}<strong>≥ -- USDT</strong>{$_('both-mystery-box')}<strong>60%</strong>{$_('commission')}</p>
            </li>
            <li>
              <p class="c81146a0">{$_('max-referral-rewards')}</p>
              <p class="_8857ec87">{$_('unlimited-invites')}</p>
            </li>
            <li>
              <p class="c81146a0">{$_('when-will-i-receive-the-referral-rewards')}</p>
              <p class="_8857ec87">{$_('fairness-integrity')}</p>
            </li>
          </ol>
          <a
            href="https://support.poloniex.com/hc/en-us/articles/6571052590999"
            target="_blank"
            class="_9dc1def7"
          >{$_('comments-expand')}</a>
        </div>
      </div>
    </main>
  </div>
</div>

<Footer />
