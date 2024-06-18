<script>
  import OrdersSettings from "../../../lib/p2p/OrdersSettings.svelte";
  import "../../../styles/orders.css";

</script>

<main id="app" class="app-container" data-v-app="">
  <section class="_layout_cw6mx_9">
    <div class="_header_piyeq_16">
      <div class="_inner_piyeq_21">
        <div class="_navBox_piyeq_26">
          <a href="/p2p/markets" class="">P2P Trading</a>
        </div>
        <OrdersSettings />
      </div>
    </div>
    <div class="_inner_cw6mx_14">
      <dl class="_spaceBetween_dh5q2_9">
        <dt>
          <ul class="_nalWraper_dh5q2_128">
            <li class="_active_dh5q2_147">In progress</li>
            <li class="">Complete</li>
            <li class="">Other</li>
            <li class="">All</li>
          </ul>
        </dt>
        <dd>
          <div class="el-dropdown">
            <dl
              class="_searchWraper_dh5q2_43 el-tooltip__trigger el-tooltip__trigger"
              id="el-id-7746-19"
              role="button"
              tabindex="0"
              aria-controls="el-id-7746-20"
              aria-expanded="false"
              aria-haspopup="menu"
            >
              <dt>
                <p>
                  <svg
                    data-v-c936a896=""
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    class="svg-icon"
                    ><path
                      d="M14.3138 13.47L12.0325 11.1888C13.94 8.862 13.8075 5.41525 11.6263 3.2355C9.31375 0.9215 5.5575 0.9215 3.2355 3.2355C0.9215 5.5575 0.9215 9.31375 3.2355 11.6263C5.41525 13.8075 8.862 13.9403 11.1888 12.0325L13.47 14.3138C13.52 14.3575 13.5995 14.3575 13.6418 14.3138L14.3138 13.6418C14.3575 13.5995 14.3575 13.52 14.3138 13.47ZM10.798 10.798C8.94175 12.6528 5.9355 12.6528 4.07925 10.798C2.2245 8.94175 2.2245 5.9355 4.07925 4.07925C5.9355 2.2245 8.94175 2.2245 10.798 4.07925C12.6528 5.9355 12.6528 8.94175 10.798 10.798Z"
                    ></path><path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M3.05921 3.05842C5.47857 0.647394 9.39292 0.646873 11.8033 3.05878C14.0211 5.27517 14.2064 8.74884 12.3666 11.1692L14.4907 13.2932L14.3139 13.47L14.5021 13.3054C14.6201 13.4403 14.6407 13.6717 14.4895 13.8197L13.8199 14.4893C13.6718 14.6405 13.4404 14.6199 13.3056 14.5019L13.2993 14.4964L11.1693 12.3665C8.74902 14.2065 5.27535 14.0209 3.05896 11.8031C0.647057 9.39274 0.648187 5.47778 3.05921 3.05842ZM14.0463 13.5559L11.6958 11.2054L11.8393 11.0303C13.666 8.80213 13.5393 5.50048 11.4497 3.41234C9.23516 1.19635 5.63712 1.19561 3.41246 3.41228C1.19579 5.63694 1.19641 9.23486 3.4124 11.4494C5.50056 13.539 8.80232 13.666 11.0304 11.8392L11.2056 11.6956L13.5561 14.0461L14.0463 13.5559ZM10.6213 4.25596C8.86271 2.49891 6.0148 2.49893 4.25621 4.25603C2.49911 6.01462 2.49909 8.86253 4.25614 10.6212C6.01475 12.3783 8.86277 12.3784 10.6214 10.6212C12.3786 8.86258 12.3785 6.01457 10.6213 4.25596ZM3.90273 3.9024C5.85659 1.95012 9.02102 1.95012 10.9749 3.9024C12.9272 5.85627 12.9273 9.02084 10.975 10.9747C9.02117 12.927 5.85659 12.9271 3.90273 10.9748C1.95044 9.02098 1.95044 5.85627 3.90273 3.9024Z"
                    ></path></svg
                  > Date/Type/Coin
                </p>
              </dt>
              <dd>
                <svg
                  data-v-c936a896=""
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  class="svg-icon"
                  ><path
                    d="M12.0738 4.8438H3.92625C3.07156 4.8438 2.61077 5.84659 3.16745 6.49512L7.24121 11.241C7.64026 11.7059 8.35975 11.7059 8.7588 11.241L12.8326 6.49512C13.3892 5.84659 12.9284 4.8438 12.0738 4.8438Z"
                  ></path></svg
                >
              </dd>
            </dl>
            <!--v-if-->
          </div>
          <button
            class="el-button el-button--info el-button--default is-plain"
            aria-disabled="false"
            type="button"
            style="margin-left: 16px;"
            ><!--v-if--><span class=""
              ><svg
                data-v-c936a896=""
                width="16"
                height="16"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                class="svg-icon"
                style="margin-right: 4px;"
                ><path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M6.99888 10.5439L3.91668 7.46166L4.84476 6.53358L6.32901 8.01784L6.32901 1.3125L7.64151 1.3125L7.64151 8.04508L9.15301 6.53358L10.0811 7.46166L6.99888 10.5439ZM3.25391 6.5642H1.94141V12.6875H12.0586V6.56249H10.7461V6.99999V11.375H3.25391V6.99999V6.5642Z"
                ></path></svg
              > Export</span
            ></button
          >
        </dd>
      </dl>
      <div class="content" style="min-height: 360px;">
        <div class="_table_ha0x9_9">
          <div
            class="el-table--fit el-table--enable-row-hover el-table el-table--layout-fixed is-scrolling-none"
            data-prefix="el"
            style="width: 100%;"
          >
            <div class="el-table__inner-wrapper">
              <div class="hidden-columns">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
              <div class="el-table__header-wrapper">
                <table
                  class="el-table__header"
                  border="0"
                  cellpadding="0"
                  cellspacing="0"
                  style="width: 1312px;"
                >
                  <colgroup
                    ><col name="el-table_2_column_6" width="210" /><col
                      name="el-table_2_column_7"
                      width="187"
                    /><col name="el-table_2_column_8" width="183" /><col
                      name="el-table_2_column_9"
                      width="183"
                    /><col name="el-table_2_column_10" width="183" /><col
                      name="el-table_2_column_11"
                      width="183"
                    /><col name="el-table_2_column_12" width="183" /></colgroup
                  ><thead class=""
                    ><tr class=""
                      ><th
                        class="el-table_2_column_6 is-leaf el-table__cell"
                        colspan="1"
                        rowspan="1"
                        ><div class="cell">No.<!----><!----></div></th
                      ><th
                        class="el-table_2_column_7 is-leaf el-table__cell"
                        colspan="1"
                        rowspan="1"
                        ><div class="cell">Status<!----><!----></div></th
                      ><th
                        class="el-table_2_column_8 is-leaf el-table__cell"
                        colspan="1"
                        rowspan="1"
                        ><div class="cell">Amount<!----><!----></div></th
                      ><th
                        class="el-table_2_column_9 is-leaf el-table__cell"
                        colspan="1"
                        rowspan="1"
                        ><div class="cell">Price<!----><!----></div></th
                      ><th
                        class="el-table_2_column_10 is-leaf el-table__cell"
                        colspan="1"
                        rowspan="1"
                        ><div class="cell">Volume<!----><!----></div></th
                      ><th
                        class="el-table_2_column_11 is-leaf el-table__cell"
                        colspan="1"
                        rowspan="1"
                        ><div class="cell">Counterparty<!----><!----></div></th
                      ><th
                        class="el-table_2_column_12 is-leaf el-table__cell"
                        colspan="1"
                        rowspan="1"
                        ><div class="cell">Time<!----><!----></div></th
                      ></tr
                    ></thead
                  >
                </table>
              </div>
              <div class="el-table__body-wrapper">
                <div class="el-scrollbar">
                  <div
                    class="el-scrollbar__wrap el-scrollbar__wrap--hidden-default"
                  >
                    <div
                      class="el-scrollbar__view"
                      style="display: inline-block; vertical-align: middle;"
                    >
                      <table
                        class="el-table__body"
                        cellspacing="0"
                        cellpadding="0"
                        border="0"
                        style="table-layout: fixed; width: 1312px;"
                      >
                        <colgroup
                          ><col name="el-table_2_column_6" width="210" /><col
                            name="el-table_2_column_7"
                            width="187"
                          /><col name="el-table_2_column_8" width="183" /><col
                            name="el-table_2_column_9"
                            width="183"
                          /><col name="el-table_2_column_10" width="183" /><col
                            name="el-table_2_column_11"
                            width="183"
                          /><col
                            name="el-table_2_column_12"
                            width="183"
                          /></colgroup
                        ><!--v-if--><tbody></tbody>
                      </table>
                      <div
                        class="el-table__empty-block"
                        style="height: 100%; width: 1312px;"
                      >
                        <span class="el-table__empty-text"
                          ><section class="_tableEmpty_102ze_9">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="80"
                              height="80"
                              fill="none"
                              ><path
                                fill="#e3e3e3"
                                d="M64 55.26 50 69H17.818A1.818 1.818 0 0 1 16 67.182V17.818c0-1.004.814-1.818 1.818-1.818h44.364c1.004 0 1.818.814 1.818 1.818z"
                              ></path><path
                                fill="#b8b8b8"
                                d="M50 55.91a.91.91 0 0 1 .91-.91H64l-7 7-7 7z"
                              ></path><rect
                                width="26"
                                height="3.636"
                                fill="#fafafa"
                                rx=".909"
                                transform="matrix(1 0 0 -1 28 46.547)"
                              ></rect><rect
                                width="22"
                                height="3.636"
                                fill="#fafafa"
                                rx=".909"
                                transform="matrix(1 0 0 -1 28 35.637)"
                              ></rect><circle
                                cx="20.909"
                                cy="19.909"
                                r="10.909"
                                fill="#2b2b2e"
                              ></circle><g fill="#fafafa"
                                ><path
                                  d="M21.581 23.07h-1.806a.775.775 0 0 0-.775.775v1.806c0 .429.347.776.775.776h1.806a.775.775 0 0 0 .776-.776v-1.806a.775.775 0 0 0-.776-.775zM21.581 13h-1.806a.775.775 0 0 0-.775.775v6.841c0 .429.347.776.775.776h1.806a.775.775 0 0 0 .776-.775v-6.842A.775.775 0 0 0 21.58 13z"
                                ></path></g
                              ></svg
                            >
                            <p class="_info_102ze_17">
                              Orders from the last three months are displayed by
                              default
                            </p>
                          </section></span
                        >
                      </div>
                      <!--v-if-->
                    </div>
                  </div>
                  <div
                    class="el-scrollbar__bar is-horizontal"
                    style="display: none;"
                  >
                    <div
                      class="el-scrollbar__thumb"
                      style="transform: translateX(0%);"
                    ></div>
                  </div>
                  <div
                    class="el-scrollbar__bar is-vertical"
                    style="display: none;"
                  >
                    <div
                      class="el-scrollbar__thumb"
                      style="transform: translateY(0%);"
                    ></div>
                  </div>
                </div>
              </div>
              <!--v-if--><!--v-if-->
            </div>
            <div
              class="el-table__column-resize-proxy"
              style="display: none;"
            ></div>
          </div>
        </div>
        <!---->
      </div>
    </div>
  </section>
  <!---->
</main>
