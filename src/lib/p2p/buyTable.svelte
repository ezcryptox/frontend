<script>
  import { screen } from "$lib/store/screen"
  export let openSetupModal = null;
  const onOpenModal = () => {
    if (openSetupModal) openSetupModal(true);
  };
</script>

<section class="_tableList_2ean6_9">
  <div class="el-table--fit el-table--enable-row-hover el-table--enable-row-transition el-table el-table--layout-fixed _tableLayout_f1c54_9 is-scrolling-none"
    data-prefix="el" >
    <div class="el-table__inner-wrapper">
      <div class="el-table__header-wrapper">
        <table
          class="el-table__header"
          border="0"
          cellpadding="0"
          cellspacing="0"
        >
          <thead class="">
            <tr class="">
              <th
                class="el-table_1_column_1 is-leaf el-table__cell"
                colspan="1"
                rowspan="1"
                ><div class="cell">
                  Advertisers (Completion rate)<!----><!---->
                </div>
                </th>
                {#if $screen > 1000}
                <th
                class="el-table_1_column_2 is-leaf el-table__cell"
                colspan="1"
                rowspan="1"><div class="cell">Price<!----><!----></div></th>
              <th
                class="el-table_1_column_3 is-leaf el-table__cell"
                colspan="1"
                rowspan="1"
                ><div class="cell">
                  <div class="_headerLine_2ean6_111">
                    Available <span></span> Limits
                  </div>
                  <!----><!---->
                </div></th
              >
              
                <th class="el-table_1_column_4 is-leaf el-table__cell" colspan="1"  rowspan="1">
                  <div class="cell">Payment Method<!----><!----></div>
                </th>
              {/if}
              <th class="el-table_1_column_5 is-right is-leaf el-table__cell"
                colspan="1" rowspan="1">
                <div class="cell">Trade<!----><!----></div>
              </th>
                </tr>
            </thead>
          <tbody>
            <tr class="el-table__row"
            ><td
              class="el-table_1_column_1 el-table__cell"
              rowspan="1"
              colspan="1"
              ><div class="cell">
                <!---->
                <div class="_merchantInfo_2ean6_123">
                  <a href="/p2p/merchant/481359171" class="">
                    <span class="_merchantIcon_f9alk_9 _icon_2ean6_127 _online_2ean6_157">N</span></a>
                  <div class="">
                    <div class="_name_2ean6_165">
                      <a href="/p2p/merchant/481359171" class="">Nasi Lemak</a>
                      <span class="_flex_xvdld_9">
                        <!----><!----><!---->
                        </span>
                    </div>
                    {#if $screen > 1000}
                      <div class="_trade_2ean6_189">Trades: 9 | 47%</div>
                      {:else}
                      <div class="cell">
                        <!---->
                        <div class="_price_2ean6_192">0.99 USD</div>
                      </div>
                    {/if}
                  </div>
                </div>
                {#if $screen < 1000}
                  <div class="_record_2ean6_205">
                    <div class="_line_2ean6_211">
                      <span class="_label_2ean6_215">Available</span><span
                        class="_label_2ean6_215">Limits</span>
                    </div>
                    <div class="_line_2ean6_211">
                      <span class="_value_2ean6_227">7287.834766 USDT</span>
                      <span class="_value_2ean6_227">55.00 - 855.00 USD</span>
                    </div>
                  </div>

                  <div class="_method_2ean6_239">
                    <span style="color: rgb(240, 185, 11);">
                      <em style="background-color: rgb(240, 185, 11);">
                    </em> Bank Transfer</span>
                  </div>
                {/if}
               

              </div>
              </td>
              {#if $screen > 1000}
              <td class="el-table_1_column_2 el-table__cell" rowspan="1" colspan="1">
              <div class="cell">
                <!---->
                <div class="_price_2ean6_192">0.99 USD</div>
              </div>
            </td>
           
              <td class="el-table_1_column_3 el-table__cell" rowspan="1" colspan="1" >
                <div class="cell">
                <!---->
                <div class="_record_2ean6_205">
                  <div class="_line_2ean6_211">
                    <span class="_label_2ean6_215">Available</span><span
                      class="_label_2ean6_215">Limits</span>
                  </div>
                  <div class="_line_2ean6_211">
                    <span class="_value_2ean6_227">7287.834766 USDT</span>
                    <span class="_value_2ean6_227">55.00 - 855.00 USD</span>
                  </div>
                </div>
              </div>
              </td>
              <td class="el-table_1_column_4 el-table__cell" rowspan="1" colspan="1">
                <div class="cell">
                <!---->
                <div class="_method_2ean6_239">
                  <span style="color: rgb(240, 185, 11);">
                    <em style="background-color: rgb(240, 185, 11);">
                  </em> Bank Transfer</span>
                </div>
              </div>
              </td>
              {/if}
              <td
              class="el-table_1_column_5 is-right el-table__cell"
              rowspan="1"
              colspan="1"
              ><div class="cell">
                <!---->
                <div class="_trade_2ean6_189">Trades: 9 | 47%</div>
                <div class="_BtnWraper_d4ofj_9">
                  <button
                    class="el-button el-button--success"
                    aria-disabled="false"
                    type="button"
                    on:click={onOpenModal}
                    ><!--v-if--><span class="">Buy USDT</span></button
                  >
                </div>
              </div></td
            ></tr
          ></tbody
        >
        </table>
      </div>
      <div class="el-table__body-wrapper">
        <div class="el-scrollbar">
          <div class="el-scrollbar__wrap el-scrollbar__wrap--hidden-default">
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
                
                  <!--v-if-->
                
              </table>
              <!--v-if--><!--v-if-->
            </div>
          </div>
          <div class="el-scrollbar__bar is-horizontal" style="display: none;">
            <div
              class="el-scrollbar__thumb"
              style="transform: translateX(0%);"
            ></div>
          </div>
          <div class="el-scrollbar__bar is-vertical" style="display: none;">
            <div
              class="el-scrollbar__thumb"
              style="transform: translateY(0%);"
            ></div>
          </div>
        </div>
      </div>
      <!--v-if--><!--v-if-->
    </div>
    <div class="el-table__column-resize-proxy" style="display: none;"></div>
  </div>


  <div class="_pagination_2ean6_258">
    <div class="el-pagination el-pagination--small">
      <button
        type="button"
        class="btn-prev is-first"
        disabled=""
        aria-label="Go to previous page"
        aria-disabled="true"
        ><i class="el-icon"
          ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"
            ><path
              fill="currentColor"
              d="M609.408 149.376 277.76 489.6a32 32 0 0 0 0 44.672l331.648 340.352a29.12 29.12 0 0 0 41.728 0 30.592 30.592 0 0 0 0-42.752L339.264 511.936l311.872-319.872a30.592 30.592 0 0 0 0-42.688 29.12 29.12 0 0 0-41.728 0z"
            ></path></svg
          ></i
        ></button
      >
      <ul class="el-pager">
        <li class="is-active number" aria-current="true" aria-label="page 1">
          1
        </li>
        <!--v-if-->
        <li class="number" aria-current="false" aria-label="page 2">2</li>
        <li class="number" aria-label="page 3">3</li>
        <li class="number" aria-current="false" aria-label="page 4">4</li>
        <li class="number" aria-current="false" aria-label="page 5">5</li>
        <li class="number" aria-current="false" aria-label="page 6">6</li>
        <li class="more btn-quicknext el-icon" aria-label="Next 5 pages">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"
            ><path
              fill="currentColor"
              d="M176 416a112 112 0 1 1 0 224 112 112 0 0 1 0-224zm336 0a112 112 0 1 1 0 224 112 112 0 0 1 0-224zm336 0a112 112 0 1 1 0 224 112 112 0 0 1 0-224z"
            ></path></svg
          >
        </li>
        <li class="number" aria-current="false" aria-label="page 8">8</li>
      </ul>
      <button
        type="button"
        class="btn-next is-last"
        aria-label="Go to next page"
        aria-disabled="false"
        ><i class="el-icon"
          ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"
            ><path
              fill="currentColor"
              d="M340.864 149.312a30.592 30.592 0 0 0 0 42.752L652.736 512 340.864 831.872a30.592 30.592 0 0 0 0 42.752 29.12 29.12 0 0 0 41.728 0L714.24 534.336a32 32 0 0 0 0-44.672L382.592 149.376a29.12 29.12 0 0 0-41.728 0z"
            ></path></svg
          ></i
        ></button
      >
    </div>
  </div>
</section>
