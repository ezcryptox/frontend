<script>
import { screen } from "$lib/store/screen"
</script>

<div class="d68d17a2 _1e5e2a71">
    <section class="c6e41aee">
        <div class="el-table el-table--fit el-table--enable-row-hover el-table--enable-row-transition _2a39ccb4">
            <div class="hidden-columns">
                <div></div><div></div><div></div><div></div><div></div><div></div>
            </div>
            <div class="el-table__header-wrapper">
                <table cellspacing="0" cellpadding="0" border="0" class="el-table__header" >
                    <thead class="has-gutter">
                        <tr class="">
                            <th colspan="1" rowspan="1" class="el-table_1_column_1   _8e0516f6  is-leaf is-sortable el-table__cell">
                                <div class="cell">Pair<span class="caret-wrapper">
                                    <!-- <i class="sort-caret ascending"></i>
                                    <i class="sort-caret descending"></i> -->
                                </span>
                                </div>
                            </th>
                            {#if $screen > 550}
                            <th colspan="1" rowspan="1" class="el-table_1_column_2   ba00c845  is-leaf is-sortable el-table__cell">
                                <div class="cell">
                                    Price
                                    <span class="caret-wrapper">
                                        <!-- <i class="sort-caret ascending"></i>
                                        <i class="sort-caret descending"></i> -->
                                    </span>
                                </div>
                            </th>
                            {/if}
                            <th colspan="1" rowspan="1" class="el-table_1_column_3  is-middle _582f7adf  is-leaf is-sortable el-table__cell">
                                <div class="cell">
                                    24h Change
                                    <span class="caret-wrapper">
                                        <!-- <i class="sort-caret ascending"></i>
                                        <i class="sort-caret descending"></i> -->
                                    </span>
                                </div>
                            </th>
                            {#if $screen > 1138}
                                <th colspan="1" rowspan="1" class="el-table_1_column_4  is-middle d1a50393  is-leaf el-table__cell">
                                    <div class="cell">24h High/Low</div>
                                </th>
                            {/if}
                            {#if $screen > 750}
                            <th colspan="1" rowspan="1" class="el-table_1_column_5  is-middle d7e432a6  is-leaf is-sortable el-table__cell">
                                <div class="cell">Volume<span class="caret-wrapper">
                                    <i class="sort-caret ascending"></i>
                                    <i class="sort-caret descending"></i>
                                </span>
                                </div>
                            </th>
                            {/if}
                            <th colspan="1" rowspan="1" class="el-table_1_column_6  is-right   is-leaf el-table__cell">
                                <div class="cell">Action</div>
                            </th>
                            <th class="el-table__cell gutter" style="width: 0px; display: none;"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="el-table__row">
                            <td rowspan="1" colspan="1" class="el-table_1_column_1  _8e0516f6 el-table__cell">
                                <div class="cell">
                                    <div class="_9675cf33">
                                        <!-- <svg aria-hidden="true" class="svgicon" style="width: 10px; height: 10px; min-width: 10px;">
                                            <use xlink:href="#star"></use>
                                        </svg> -->
                                        <i class="_5f81b418" style="width: 20px; height: 20px; min-width: 20px; min-height: 20px;">
                                            <img loading="lazy" alt="" src="https://www.datocms-assets.com/51952/1635193869-btc.png" class="_390cb02c">
                                        </i>
                                        BTC/USDT
                                        <!---->
                                        <span class="_2033d003">3X</span>
                                    </div>
                                </div>
                            </td>
                            {#if $screen > 550}
                            <td rowspan="1" colspan="1" class="el-table_1_column_2  ba00c845 el-table__cell">
                                <div class="cell">
                                    <div>66,868.43</div>
                                </div>
                            </td>
                            {/if}
                            <td rowspan="1" colspan="1" class="el-table_1_column_3 is-middle _582f7adf el-table__cell">
                                <div class="cell">
                                    <span class="_39dd850a">+2.54%</span>
                                </div>
                            </td>
                            {#if $screen > 1138}
                                <td rowspan="1" colspan="1" class="el-table_1_column_4 is-middle d1a50393 el-table__cell">
                                    <div class="cell">
                                        <div class="d7e432a6">
                                            <span>67,390.65</span>
                                            <span>&nbsp;/&nbsp;</span>
                                            <span>65,020.57</span>
                                        </div>
                                    </div>
                                </td>
                            {/if}
                            {#if $screen > 750}
                            <td rowspan="1" colspan="1" class="el-table_1_column_5 is-middle d7e432a6 el-table__cell">
                                <div class="cell">$68.37M</div>
                            </td>
                            {/if}
                            <td rowspan="1" colspan="1" class="el-table_1_column_6 is-right  el-table__cell">
                                <div class="cell">
                                    <a href="/trade/BTC_USDT?type=spot" class="_189b2a6c">Trade</a>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="el-table__body-wrapper is-scrolling-none">
                <table cellspacing="0" cellpadding="0" border="0" class="el-table__body">
                  
                   
                </table>
            </div>
        </div>
    </section>
</div>

<style>

</style>
