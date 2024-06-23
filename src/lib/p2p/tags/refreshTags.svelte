<script>
  export let selectedOption = "Do Not Refresh";
  export let onOptionSelect;
  let isDropdownVisible = false;

  const options = ["Do Not Refresh", "Every 5s", "Every 10s", "Every 15s"];

  function selectOption(option) {
    selectedOption = option;
    isDropdownVisible = false;
    if (onOptionSelect) {
      onOptionSelect(option);
    }
  }
  
</script>

<div
  class="el-popper is-pure is-light el-select__popper"
  tabindex="-1"
  aria-hidden="false"
  role="tooltip"
  id="el-id-9233-5"
  data-popper-reference-hidden="false"
  data-popper-escaped="false"
  data-popper-placement="bottom-start"
  style="z-index: 1020031; position: absolute;"
>
  <div class="el-select-dropdown" style="min-width: 190px;">
    <div class="el-scrollbar" style="">
      <div
        class="el-select-dropdown__wrap el-scrollbar__wrap el-scrollbar__wrap--hidden-default"
      >
        <ul class="el-scrollbar__view el-select-dropdown__list" style="">
          <!--v-if-->
          {#each options as option}
            <li
              class="el-select-dropdown__item"
              class:selected={selectedOption === option}
              class:hover={isDropdownVisible}
              on:click={() => selectOption(option)}
              on:keydown={() => selectOption(option)}
              role="option"
              aria-selected={selectedOption === option}
              tabindex="0"
            >
              <span>{option}</span>
            </li>
          {/each}
        </ul>
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
    <!--v-if-->
  </div>
  <span
    class="el-popper__arrow"
    data-popper-arrow=""
    style="position: absolute; left: 94px;"
  ></span>
</div>
