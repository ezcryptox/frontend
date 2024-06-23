<script>
  export let updateModalOpen = null;

  function closeModal() {
    if (updateModalOpen) updateModalOpen();
  }
</script>

<div
  tabindex="-1"
  role="dialog"
  aria-labelledby="rcDialogTitle0"
  class="ant-modal-wrap ant-modal-centered _87fac765"
>
  <div
    role="document"
    class="ant-modal"
    style="width: 520px; transform-origin: 59px 115.217px;"
  >
    <div
      tabindex="0"
      aria-hidden="true"
      style="width: 0px; height: 0px; overflow: hidden;"
    ></div>
    <div class="ant-modal-content">
      <button type="button" aria-label="Close" class="ant-modal-close">
        <span class="ant-modal-close-x">
          <i
            aria-label="icon: close"
            class="anticon anticon-close ant-modal-close-icon"
          >
            <svg
              viewBox="64 64 896 896"
              data-icon="close"
              width="1em"
              height="1em"
              fill="currentColor"
              aria-hidden="true"
              focusable="false"
              on:click={closeModal}
            >
              <path
                d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"
              ></path>
            </svg>
          </i>
        </span>
      </button>
      <div class="ant-modal-header">
        <div id="rcDialogTitle0" class="ant-modal-title">Top Inviters</div>
      </div>
      <div class="ant-modal-body" style="padding: 0px;">
        <div class="_86658441">
          <div class="_0e963cf4">
            <div class="ant-table-wrapper">
              <div class="ant-spin-nested-loading">
                <div class="ant-spin-container">
                  <div
                    class="ant-table ant-table-scroll-position-left ant-table-layout-fixed ant-table-default"
                  >
                    <div class="ant-table-content">
                      <div class="ant-table-body">
                        <table>
                          <colgroup>
                            <col style="width: 55px; min-width: 55px;" />
                            <col style="width: 125px; min-width: 125px;" />
                            <col style="width: 72px; min-width: 72px;" />
                            <col style="width: 100px; min-width: 100px;" />
                          </colgroup>
                          <thead class="ant-table-thead">
                            <tr>
                              <th
                                key="ranking"
                                class="ant-table-row-cell-break-word"
                              >
                                <span class="ant-table-header-column">
                                  <div>
                                    <span class="ant-table-column-title"
                                      >Ranking</span
                                    >
                                    <span class="ant-table-column-sorter"
                                    ></span>
                                  </div>
                                </span>
                              </th>
                              <th
                                key="email"
                                class="ant-table-row-cell-break-word"
                              >
                                <span class="ant-table-header-column">
                                  <div>
                                    <span class="ant-table-column-title"
                                      >Email</span
                                    >
                                    <span class="ant-table-column-sorter"
                                    ></span>
                                  </div>
                                </span>
                              </th>
                              <th
                                key="invitees"
                                class="ant-table-row-cell-break-word"
                              >
                                <span class="ant-table-header-column">
                                  <div>
                                    <span class="ant-table-column-title"
                                      >Invitees</span
                                    >
                                    <span class="ant-table-column-sorter"
                                    ></span>
                                  </div>
                                </span>
                              </th>
                              <th
                                key="totalRebate"
                                class="ant-table-align-right ant-table-row-cell-break-word ant-table-row-cell-last"
                                style="text-align: right;"
                              >
                                <span class="ant-table-header-column">
                                  <div>
                                    <span class="ant-table-column-title"
                                      >Earnings (USDT)</span
                                    >
                                    <span class="ant-table-column-sorter"
                                    ></span>
                                  </div>
                                </span>
                              </th>
                            </tr>
                          </thead>
                          <tbody class="ant-table-tbody">
                            <!-- Repeat for each row in the table -->
                            <tr
                              class="ant-table-row ant-table-row-level-0 _9b7b4107"
                              data-row-key="am***ck@gm***om"
                            >
                              <td class="ant-table-row-cell-break-word">
                                <div data-index="0" class="ec42ef1b">
                                  <span>1</span>
                                </div>
                              </td>
                              <td class="ant-table-row-cell-break-word">
                                <div data-index="0" class="_8513f9e3">
                                  am***ck@gm***om
                                </div>
                              </td>
                              <td class="ant-table-row-cell-break-word">
                                <div data-index="0" class="_4689f51d">80</div>
                              </td>
                              <td
                                class="ant-table-row-cell-break-word"
                                style="text-align: right;"
                              >
                                <div data-index="0" class="_3f342225">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                  >
                                    <path
                                      d="M13 7.67777C13 7.20656 11.302 6.81297 9.0398 6.71915V5.66443H11.6915V4L4.28945 4V5.66443H6.97944V6.71835C4.70745 6.81067 3 7.20518 3 7.67777C3 8.15047 4.70745 8.54498 6.97944 8.63736V12H9.0398V8.63662C11.302 8.54274 13 8.14915 13 7.67777ZM4.33333 7.42849C4.33333 7.15459 5.46488 6.92419 7 6.85714V8C5.46488 7.93295 4.33333 7.7025 4.33333 7.42849ZM9 8V6.85714C10.5385 6.92745 11.6667 7.15661 11.6667 7.42854C11.6667 7.70053 10.5385 7.92975 9 8Z"
                                      fill="#878787"
                                    ></path>
                                  </svg>
                                  14,857.76
                                </div>
                              </td>
                            </tr>
                            <!-- Repeat ends here -->
                          </tbody>
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
  </div>
</div>

<style>
  /* Add your styles here if needed */
</style>
