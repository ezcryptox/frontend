<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher()
  export let selectedOption;
  let isDropdownVisible = true;

  const options = ["All Advertisers", "Thumbs-Up", "Verified"];

  function selectOption(option) {
    selectedOption = option;
    dispatch("close", option)
  }
  
</script>

<div
  class="el-popper is-pure is-light el-select__popper"
  tabindex="-1"
  aria-hidden="false"
  role="tooltip"
  id="el-id-9233-4"
  data-popper-reference-hidden="false"
  data-popper-escaped="false"
  data-popper-placement="bottom-start"
  style="z-index: 1020021; position: absolute; "
>
  <div class="el-select-dropdown" style="min-width: 189px;">
    <div class="el-scrollbar">
      <div
        class="el-select-dropdown__wrap el-scrollbar__wrap el-scrollbar__wrap--hidden-default"
      >
        <ul class="el-scrollbar__view el-select-dropdown__list">
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
  </div>
  <span
    class="el-popper__arrow"
    data-popper-arrow=""
    style="position: absolute; left: 93.5px;"
  ></span>
</div>
