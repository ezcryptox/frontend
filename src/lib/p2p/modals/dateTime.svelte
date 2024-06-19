<script>
  import Calendar from "./calendar.svelte";

  $: calendarOpen = false;
  $: coinIsOpen = false;
  $: fiatIsOpen = false;
  $: typeIsOpen = false;

 

  function openCalendar() {
    calendarOpen = !calendarOpen;
    coinIsOpen = fiatIsOpen = typeIsOpen = false;
  }
  function openCoin() {
    coinIsOpen = !coinIsOpen;
    calendarOpen = fiatIsOpen = typeIsOpen = false;
  }

  function openFiat() {
    fiatIsOpen = !fiatIsOpen;
    calendarOpen = coinIsOpen = typeIsOpen = false;
  }

  function openType() {
    typeIsOpen = !typeIsOpen;
    calendarOpen = coinIsOpen = fiatIsOpen = false;
  }
</script>

<div id="el-popper-container-8688">
  <div
    class="el-popper is-pure is-light el-dropdown__popper e-dropdown order-dropdown"
    tabindex="-1"
    aria-hidden="false"
    role="menu"
    id="el-id-8688-1"
    data-popper-reference-hidden="false"
    data-popper-escaped="false"
    data-popper-placement="bottom"
    style="z-index: 1020014; position: absolute; inset: 216px auto auto 65%;
    "
  >
    <div class="el-scrollbar">
      <div class="el-scrollbar__wrap el-scrollbar__wrap--hidden-default">
        <div class="el-scrollbar__view el-dropdown__list" style="">
          <div class="_boxContent_dh5q2_158">
            <dl>
              <dt>Date</dt>
              <dd>
                <div
                  class="el-date-editor el-date-editor--daterange el-input__wrapper el-range-editor el-tooltip__trigger el-tooltip__trigger"
                  aria-controls="el-id-8688-2"
                  aria-expanded="false"
                  aria-haspopup="dialog"
                  on:click={openCalendar}
                  role="button"
                  tabindex={0}
                >
                  <i class="el-icon el-input__icon el-range__icon"
                    ><svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 1024 1024"
                      ><path
                        fill="currentColor"
                        d="M128 384v512h768V192H768v32a32 32 0 1 1-64 0v-32H320v32a32 32 0 0 1-64 0v-32H128v128h768v64H128zm192-256h384V96a32 32 0 1 1 64 0v32h160a32 32 0 0 1 32 32v768a32 32 0 0 1-32 32H96a32 32 0 0 1-32-32V160a32 32 0 0 1 32-32h160V96a32 32 0 0 1 64 0v32zm-32 384h64a32 32 0 0 1 0 64h-64a32 32 0 0 1 0-64zm0 192h64a32 32 0 1 1 0 64h-64a32 32 0 1 1 0-64zm192-192h64a32 32 0 0 1 0 64h-64a32 32 0 0 1 0-64zm0 192h64a32 32 0 1 1 0 64h-64a32 32 0 1 1 0-64zm192-192h64a32 32 0 1 1 0 64h-64a32 32 0 1 1 0-64zm0 192h64a32 32 0 1 1 0 64h-64a32 32 0 1 1 0-64z"
                      ></path></svg
                    ></i
                  ><input
                    autocomplete="off"
                    name=""
                    placeholder="Start Date"
                    class="el-range-input"
                  /><span class="el-range-separator">-</span><input
                    autocomplete="off"
                    name=""
                    placeholder="End Date"
                    class="el-range-input"
                  /><i
                    class="el-icon el-input__icon el-range__close-icon el-range__close-icon--hidden"
                    ><svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 1024 1024"
                      ><path
                        fill="currentColor"
                        d="m466.752 512-90.496-90.496a32 32 0 0 1 45.248-45.248L512 466.752l90.496-90.496a32 32 0 1 1 45.248 45.248L557.248 512l90.496 90.496a32 32 0 1 1-45.248 45.248L512 557.248l-90.496 90.496a32 32 0 0 1-45.248-45.248L466.752 512z"
                      ></path><path
                        fill="currentColor"
                        d="M512 896a384 384 0 1 0 0-768 384 384 0 0 0 0 768zm0 64a448 448 0 1 1 0-896 448 448 0 0 1 0 896z"
                      ></path></svg
                    ></i
                  >
                </div>
                {#if calendarOpen}
                  <Calendar />
                {/if}
              </dd>
            </dl>
            <dl>
              <dt>Coin</dt>
              <dd>
                <div class="el-select">
                  <div
                    class="select-trigger el-tooltip__trigger el-tooltip__trigger"
                    on:click={openCoin}
                    tabindex={0}
                    role="button"
                  >
                    <!--v-if--><!-- fix: https://github.com/element-plus/element-plus/issues/11415 --><!--v-if-->
                    <div class="el-input el-input--suffix">
                      <!-- input --><!-- prepend slot --><!--v-if-->
                      <div class="el-input__wrapper">
                        <!-- prefix slot --><!--v-if--><input
                          class="el-input__inner"
                          type="text"
                          readonly=""
                          autocomplete="off"
                          tabindex="0"
                          placeholder="Select"
                          id="el-id-8688-6"
                        /><!-- suffix slot --><span class="el-input__suffix"
                          ><span class="el-input__suffix-inner"
                            ><i class="el-icon el-select__caret el-select__icon"
                              ><svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                ><path
                                  d="M12.0738 4.8438H3.92625C3.07156 4.8438 2.61077 5.84659 3.16745 6.49512L7.24121 11.241C7.64026 11.7059 8.35975 11.7059 8.7588 11.241L12.8326 6.49512C13.3892 5.84659 12.9284 4.8438 12.0738 4.8438Z"
                                ></path></svg
                              ></i
                            ><!--v-if--><!--v-if--><!--v-if--><!--v-if--><!--v-if--><!--v-if--></span
                          ></span
                        >
                      </div>
                      <!-- append slot --><!--v-if-->
                    </div>
                  </div>
                  <div
                    class="el-popper is-pure is-light el-select__popper"
                    tabindex="-1"
                    aria-hidden="true"
                    role="tooltip"
                    id="el-id-8688-3"
                    data-popper-reference-hidden="false"
                    data-popper-escaped="false"
                    data-popper-placement="bottom-start"
                    style="z-index: 1020013; position: absolute; inset: 40px auto auto 1px;
                     
                    {coinIsOpen ? '' : 'display:none;'}"
                  >
                    <div class="el-select-dropdown" style="min-width: 173px;">
                      <div class="el-scrollbar" style="">
                        <div
                          class="el-select-dropdown__wrap el-scrollbar__wrap el-scrollbar__wrap--hidden-default"
                        >
                          <ul
                            class="el-scrollbar__view el-select-dropdown__list"
                            style=""
                          >
                            <!--v-if-->
                            <li class="el-select-dropdown__item selected hover">
                              <span>BTC</span>
                            </li>
                            <li class="el-select-dropdown__item">
                              <span>USDT</span>
                            </li>
                          </ul>
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
                      <!--v-if-->
                    </div>
                    <span
                      class="el-popper__arrow"
                      data-popper-arrow=""
                      style="position: absolute; left: 261.5px;"
                    ></span>
                  </div>
                </div>
              </dd>
            </dl>
            <dl>
              <dt>Fiat Currency</dt>
              <dd>
                <div class="el-select">
                  <div
                    class="select-trigger el-tooltip__trigger el-tooltip__trigger"
                    on:click={openFiat}
                    tabindex={0}
                    role="button"
                  >
                    <!--v-if--><!-- fix: https://github.com/element-plus/element-plus/issues/11415 --><!--v-if-->
                    <div class="el-input el-input--suffix">
                      <!-- input --><!-- prepend slot --><!--v-if-->
                      <div class="el-input__wrapper">
                        <!-- prefix slot --><!--v-if--><input
                          class="el-input__inner"
                          type="text"
                          readonly=""
                          autocomplete="off"
                          tabindex="0"
                          placeholder="Select"
                          id="el-id-8688-7"
                        /><!-- suffix slot --><span class="el-input__suffix"
                          ><span class="el-input__suffix-inner"
                            ><i class="el-icon el-select__caret el-select__icon"
                              ><svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                ><path
                                  d="M12.0738 4.8438H3.92625C3.07156 4.8438 2.61077 5.84659 3.16745 6.49512L7.24121 11.241C7.64026 11.7059 8.35975 11.7059 8.7588 11.241L12.8326 6.49512C13.3892 5.84659 12.9284 4.8438 12.0738 4.8438Z"
                                ></path></svg
                              ></i
                            ><!--v-if--><!--v-if--><!--v-if--><!--v-if--><!--v-if--><!--v-if--></span
                          ></span
                        >
                      </div>
                      <!-- append slot --><!--v-if-->
                    </div>
                  </div>
                  <div
                    class="el-popper is-pure is-light el-select__popper"
                    tabindex="-1"
                    aria-hidden="true"
                    role="tooltip"
                    id="el-id-8688-4"
                    data-popper-reference-hidden="false"
                    data-popper-escaped="false"
                    data-popper-placement="bottom-start"
                    style="z-index: 1020004; position: absolute; inset: 40px auto auto 1px;
                    {fiatIsOpen ? '' : 'display:none;'}"
                  >
                    <div class="el-select-dropdown" style="min-width: 173px;">
                      <div class="el-scrollbar" style="">
                        <div
                          class="el-select-dropdown__wrap el-scrollbar__wrap el-scrollbar__wrap--hidden-default"
                        >
                          <ul
                            class="el-scrollbar__view el-select-dropdown__list"
                            style=""
                          >
                            <!--v-if-->
                            <li class="el-select-dropdown__item">
                              <span>USD</span>
                            </li>
                            <li class="el-select-dropdown__item">
                              <span>SGD</span>
                            </li>
                            <li class="el-select-dropdown__item">
                              <span>INR</span>
                            </li>
                            <li class="el-select-dropdown__item">
                              <span>VND</span>
                            </li>
                            <li class="el-select-dropdown__item">
                              <span>CAD</span>
                            </li>
                            <li class="el-select-dropdown__item">
                              <span>AUD</span>
                            </li>
                            <li class="el-select-dropdown__item">
                              <span>TWD</span>
                            </li>
                            <li class="el-select-dropdown__item">
                              <span>RUB</span>
                            </li>
                            <li class="el-select-dropdown__item">
                              <span>GBP</span>
                            </li>
                            <li class="el-select-dropdown__item">
                              <span>HKD</span>
                            </li>
                            <li class="el-select-dropdown__item">
                              <span>EUR</span>
                            </li>
                            <li class="el-select-dropdown__item">
                              <span>NGN</span>
                            </li>
                            <li class="el-select-dropdown__item">
                              <span>IDR</span>
                            </li>
                            <li class="el-select-dropdown__item">
                              <span>PHP</span>
                            </li>
                            <li class="el-select-dropdown__item">
                              <span>KHR</span>
                            </li>
                            <li class="el-select-dropdown__item">
                              <span>BRL</span>
                            </li>
                            <li class="el-select-dropdown__item">
                              <span>AED</span>
                            </li>
                            <li class="el-select-dropdown__item">
                              <span>MYR</span>
                            </li>
                            <li class="el-select-dropdown__item">
                              <span>TRY</span>
                            </li>
                            <li class="el-select-dropdown__item">
                              <span>THB</span>
                            </li>
                            <li class="el-select-dropdown__item">
                              <span>UAH</span>
                            </li>
                            <li class="el-select-dropdown__item">
                              <span>GEL</span>
                            </li>
                            <li class="el-select-dropdown__item">
                              <span>KZT</span>
                            </li>
                            <li class="el-select-dropdown__item">
                              <span>PKR</span>
                            </li>
                            <li class="el-select-dropdown__item">
                              <span>MOP</span>
                            </li>
                          </ul>
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
                      <!--v-if-->
                    </div>
                    <span
                      class="el-popper__arrow"
                      data-popper-arrow=""
                      style="position: absolute; left: 261.5px;"
                    ></span>
                  </div>
                </div>
              </dd>
            </dl>
            <dl>
              <dt>Type</dt>
              <dd>
                <div class="el-select">
                  <div
                    class="select-trigger el-tooltip__trigger el-tooltip__trigger"
                    on:click={openType}
                    tabindex={0}
                    role="button"
                  >
                    <!--v-if--><!-- fix: https://github.com/element-plus/element-plus/issues/11415 --><!--v-if-->
                    <div class="el-input el-input--suffix">
                      <!-- input --><!-- prepend slot --><!--v-if-->
                      <div class="el-input__wrapper">
                        <!-- prefix slot --><!--v-if--><input
                          class="el-input__inner"
                          type="text"
                          readonly=""
                          autocomplete="off"
                          tabindex="0"
                          placeholder="Select"
                          id="el-id-8688-8"
                        /><!-- suffix slot --><span class="el-input__suffix"
                          ><span class="el-input__suffix-inner"
                            ><i class="el-icon el-select__caret el-select__icon"
                              ><svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                ><path
                                  d="M12.0738 4.8438H3.92625C3.07156 4.8438 2.61077 5.84659 3.16745 6.49512L7.24121 11.241C7.64026 11.7059 8.35975 11.7059 8.7588 11.241L12.8326 6.49512C13.3892 5.84659 12.9284 4.8438 12.0738 4.8438Z"
                                ></path></svg
                              ></i
                            ><!--v-if--><!--v-if--><!--v-if--><!--v-if--><!--v-if--><!--v-if--></span
                          ></span
                        >
                      </div>
                      <!-- append slot --><!--v-if-->
                    </div>
                  </div>
                  <div
                    class="el-popper is-pure is-light el-select__popper"
                    tabindex="-1"
                    aria-hidden="true"
                    role="tooltip"
                    id="el-id-8688-5"
                    data-popper-reference-hidden="false"
                    data-popper-escaped="false"
                    data-popper-placement="bottom-start"
                    style="z-index: 1020005; position: absolute; inset: 40px auto auto 1px; 
                    {typeIsOpen ? '' : 'display:none;'}"
                  >
                    <div class="el-select-dropdown" style="min-width: 173px;">
                      <div class="el-scrollbar" style="">
                        <div
                          class="el-select-dropdown__wrap el-scrollbar__wrap el-scrollbar__wrap--hidden-default"
                        >
                          <ul
                            class="el-scrollbar__view el-select-dropdown__list"
                            style=""
                          >
                            <!--v-if-->
                            <li class="el-select-dropdown__item">
                              <span>Buy</span>
                            </li>
                            <li class="el-select-dropdown__item">
                              <span>Sell</span>
                            </li>
                          </ul>
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
                      <!--v-if-->
                    </div>
                    <span
                      class="el-popper__arrow"
                      data-popper-arrow=""
                      style="position: absolute; left: 261.5px;"
                    ></span>
                  </div>
                </div>
              </dd>
            </dl>
            <dl class="_btnGroup_dh5q2_186">
              <dt><a href="javascript:;">Clear</a></dt>
              <dd>
                <button
                  class="el-button el-button--info is-plain"
                  aria-disabled="false"
                  type="button"><!--v-if--><span class="">Cancel</span></button
                ><button
                  class="el-button el-button--success"
                  aria-disabled="false"
                  type="button"><!--v-if--><span class="">Confirm</span></button
                >
              </dd>
            </dl>
          </div>
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
    <span
      class="el-popper__arrow"
      data-popper-arrow=""
      style="position: absolute; left: 295.5px;"
    ></span>
  </div>
</div>
