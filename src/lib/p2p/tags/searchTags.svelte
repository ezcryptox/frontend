<script>
  export let onOptionSelect;
  let isDropdownVisible = false;

  const options = [
    { class: "_payItem_1wcwv_211", value: '<em style="background-color: rgb(13, 43, 91);"></em>All Methods' },
    {
      class: "_payItem_1wcwv_211",
      value:
        '<em style="background-color: rgb(240, 185, 11);"></em> Bank Transfer',
    },
    {
      class: "_payItem_1wcwv_211",
      value: '<em style="background-color: rgb(0, 95, 175);"></em> BCA Mobile',
    },
    {
      class: "_payItem_1wcwv_211",
      value: '<em style="background-color: rgb(19, 142, 233);"></em> DANA',
    },
    {
      class: "_payItem_1wcwv_211",
      value: '<em style="background-color: rgb(76, 52, 148);"></em> OVO',
    },
    {
      class: "_payItem_1wcwv_211",
      value: '<em style="background-color: rgb(2, 175, 217);"></em> GoPay',
    },
    {
      class: "_payItem_1wcwv_211",
      value: '<em style="background-color: rgb(13, 43, 91);"></em> Mandiri Pay',
    },
    {
      class: "_payItem_1wcwv_211",
      value: '<em style="background-color: rgb(232, 37, 41);"></em> LinkAja',
    },
    {
      class: "_payItem_1wcwv_211",
      value:
        '<em style="background-color: rgb(13, 43, 91);"></em> Jenius PayMe',
    },
    {
      class: "_payItem_1wcwv_211",
      value: '<em style="background-color: rgb(240, 82, 35);"></em> Yap! (BNI)',
    },
    {
      class: "_payItem_1wcwv_211",
      value: '<em style="background-color: rgb(239, 32, 40);"></em> Sinarmas',
    },
    {
      class: "_payItem_1wcwv_211",
      value: '<em style="background-color: rgb(255, 206, 4);"></em> Maybank',
    },
    {
      class: "_payItem_1wcwv_211",
      value: '<em style="background-color: rgb(113, 0, 28);"></em> CIMB Niaga',
    },
    {
      class: "_payItem_1wcwv_211",
      value: '<em style="background-color: rgb(186, 58, 47);"></em> Permata Me',
    },
    {
      class: "_payItem_1wcwv_211",
      value: '<em style="background-color: rgb(253, 175, 39);"></em> Bank Jago',
    },
    {
      class: "_payItem_1wcwv_211",
      value: '<em style="background-color: rgb(234, 95, 0);"></em> SEA Bank',
    },
    {
      class: "_payItem_1wcwv_211",
      value:
        '<em style="background-color: rgb(169, 17, 207);"></em> Transfers with specific bank',
    },
    {
      class: "_payItem_1wcwv_211",
      value: '<em style="background-color: rgb(255, 190, 0);"></em> NEO',
    },
    {
      class: "_payItem_1wcwv_211",
      value: '<em style="background-color: rgb(253, 101, 66);"></em> Flip',
    },
    {
      class: "_payItem_1wcwv_211",
      value: '<em style="background-color: rgb(0, 185, 0);"></em> LINE Pay',
    },
    {
      class: "_payItem_1wcwv_211",
      value: '<em style="background-color: rgb(230, 32, 32);"></em> OCBC NISP',
    },
    {
      class: "_payItem_1wcwv_211",
      value: '<em style="background-color: rgb(99, 138, 198);"></em> Oy!',
    },
    { class: "_payItem_1wcwv_211", value: "ShopeePay" },
    {
      class: "_payItem_1wcwv_211",
      value: '<em style="background-color: rgb(0, 198, 255);"></em> wise',
    },
    { class: "_payItem_1wcwv_211", value: "" },
    {
      class: "_payItem_1wcwv_211",
      value:
        '<em style="background-color: rgb(54, 85, 120);"></em> Western Union',
    },
    {
      class: "_payItem_1wcwv_211",
      value:
        '<em style="background-color: rgb(218, 127, 80);"></em> SWIFT international remittance',
    },
    {
      class: "_payItem_1wcwv_211",
      value: '<em style="background-color: rgb(255, 140, 0);"></em> QIWI',
    },
    {
      class: "_payItem_1wcwv_211 _active_1wcwv_44",
      value:
        '<em style="background-color: rgb(129, 30, 104);"></em> Skrill (Moneybookers)',
    },
    {
      class: "_payItem_1wcwv_211",
      value:
        '<em style="background-color: rgb(66, 133, 244);"></em> Google Pay (GPay)',
    },
    {
      class: "_payItem_1wcwv_211",
      value:
        '<em style="background-color: rgb(226, 161, 0);"></em> Interac e-transfer',
    },
    { class: "_payItem_1wcwv_211", value: "Cash Deposit" },
  ];
  let selectedOption = null;

  function selectOption(option) {
    selectedOption = option;
    isDropdownVisible = false;
    if (onOptionSelect) {
      onOptionSelect(option);
    }
  }
  
</script>

<div
  class="el-popper is-pure is-light el-dropdown__popper e-dropdown"
  tabindex="-1"
  aria-hidden="false"
  role="menu"
  id="el-id-9233-3"
  data-popper-reference-hidden="false"
  data-popper-escaped="false"
  data-popper-placement="bottom"
  style="z-index: 1020019; position: absolute;"
>
  <div class="el-scrollbar">
    <div class="el-scrollbar__wrap el-scrollbar__wrap--hidden-default">
      <div class="el-scrollbar__view el-dropdown__list" style="">
        <div class="_payMethodBox_1wcwv_186">
          <div class="_boxContent_1wcwv_195">
            <div class="el-input el-input--prefix _coinSearchInput_1wcwv_95">
              <!-- input --><!-- prepend slot --><!--v-if-->
              <div class="el-input__wrapper">
                <!-- prefix slot --><span class="el-input__prefix"
                  ><span class="el-input__prefix-inner"
                    ><svg
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
                    ><!--v-if--></span
                  ></span
                ><input
                  class="el-input__inner"
                  type="text"
                  autocomplete="off"
                  tabindex="0"
                  placeholder="Search"
                  id="el-id-9233-7"
                /><!-- suffix slot --><!--v-if-->
              </div>
              <!-- append slot --><!--v-if-->
            </div>
            <ul>
              {#each options as option}
                <li
                  class={option.class}
                  class:selected={selectedOption === option}
                  class:hover={isDropdownVisible}
                  on:click={() => selectOption(option)}
                  on:keydown={() => selectOption(option)}
                  role="option"
                  aria-selected={selectedOption === option}
                  tabindex="0"
                >
                  {@html option.value}
                </li>
              {/each}
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="el-scrollbar__bar is-horizontal" style="display: none;">
      <div class="el-scrollbar__thumb" style="transform: translateX(0%);"></div>
    </div>
    <div class="el-scrollbar__bar is-vertical" style="display: none;">
      <div class="el-scrollbar__thumb" style="transform: translateY(0%);"></div>
    </div>
  </div>
  <span
    class="el-popper__arrow"
    data-popper-arrow=""
    style="position: absolute; left: 180px;"
  ></span>
</div>
