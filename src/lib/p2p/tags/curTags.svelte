<script>
  import { currencyOptions } from "./hook"
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher()
  export let activeCurrency
  
  function selectCurrency(option) {
    dispatch("close", option)
  }
</script>

<div
  class="el-popper is-pure is-light el-dropdown__popper e-dropdown"
  tabindex="-1"
  aria-hidden="false"
  role="menu"
  id="el-id-9233-1"
  data-popper-reference-hidden="false"
  data-popper-escaped="false"
  data-popper-placement="bottom"
  style="z-index: 1020018; position: absolute; inset: 50px auto auto 105.5px;"
>
  <div class="el-scrollbar">
    <div class="el-scrollbar__wrap el-scrollbar__wrap--hidden-default">
      <div class="el-scrollbar__view el-dropdown__list" style="">
        <div class="_coinBox_1wcwv_109">
          <ul class="_coinList_1wcwv_115">
            {#each currencyOptions as option}
              <li
                class={option?.code?.toLocaleLowerCase() === activeCurrency.code?.toLocaleLowerCase() ? "_active_1wcwv_44" : ""}
                on:click={() => selectCurrency(option)}
                on:keydown={() => selectCurrency(option)}
                role="option"
                aria-selected={option === activeCurrency}
                tabindex="0"
              >
                <div class="_imgBox_1wcwv_138">
                  <img alt="" loading="lazy" src={option.image} />
                </div>
                {option.code}
              </li>
            {/each}
          </ul>
        </div>
      </div>
    </div>
  </div>
  <span
    class="el-popper__arrow"
    data-popper-arrow=""
    style="position: absolute; left: 75px;"
  ></span>
</div>
