<script>
	import { _ } from 'svelte-i18n';
  export let refCode = "";
  export let QrCode_src = "";
  export let handleRefModal = null;

  function _handleRefModal() {
    if (handleRefModal) handleRefModal();
  }
</script>
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="ant-modal-root">
  <div class="ant-modal-mask"></div>
  <div
    tabindex="-1"
    role="dialog"
    aria-labelledby="rcDialogTitle0"
    class="ant-modal-wrap ant-modal-centered f8913de3"
  >
    <div
      role="document"
      class="ant-modal"
      style="width: 376px; transform-origin: 791px 182.5px;"
    >
      <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
      <div
        tabindex="0"
        aria-hidden="true"
        style="width: 0px; height: 0px; overflow: hidden;"
      ></div>
      <div class="ant-modal-content">
        <button type="button" aria-label="Close" class="ant-modal-close"
          ><span
            class="ant-modal-close-x"
            on:click={_handleRefModal}
            role="button"
            tabindex={0}
            ><i
              aria-label="icon: close"
              class="anticon anticon-close ant-modal-close-icon"
              ><svg
                viewBox="64 64 896 896"
                data-icon="close"
                width="1em"
                height="1em"
                fill="currentColor"
                aria-hidden="true"
                focusable="false"
                class=""
                ><path
                  d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"
                ></path></svg
              ></i
            ></span
          ></button
        >
        <div class="ant-modal-header">
          <div id="rcDialogTitle0" class="ant-modal-title">
            <div>
              <div class="_2139a479">
                <!-- You can put the website logo here -->
              </div>
            </div>
          </div>
        </div>
        <div class="ant-modal-body" style="padding: 21px 24px 40px;">
          <div class="_46d2aea3">
            <div
              value="https://poloniex.com/signup?c=EBMJA7QE&amp;r=%2Freferral%2Ftasks"
              level="L"
              background="#fff"
              foreground="#000"
              class=""
            >
              <img
                src={QrCode_src}
                alt=""
                height="576"
                width="576"
                style="width: 288px; height: 288px;"
              />
              <!-- <canvas
                height="576"
                width="576"
                style="width: 288px; height: 288px;"
              ></canvas> -->
            </div>
            <div class="c083e7ea"><span>{$_('referral-code-2')}</span></div>
            <div class="_35a4a9e8 flex justify-between">
              <strong>{refCode}</strong>
              <div class="flex">
                <svg
                  width="26"
                  height="29"
                  viewBox="0 0 26 29"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#616161"
                  stroke="white"
                  ><rect x="7.66797" width="17.3333" height="21.3333" rx="3"
                  ></rect><rect
                    x="1"
                    y="5.33301"
                    width="18.6667"
                    height="22.6667"
                    rx="3"
                    stroke-width="2"
                  ></rect></svg
                ><svg
                  width="28"
                  height="28"
                  viewBox="0 0 28 28"
                  fill="#616161"
                  xmlns="http://www.w3.org/2000/svg"
                  style="margin-left: 20px; margin-top: -4px;"
                  ><path
                    d="M28 14.6663V24.6675C28 26.5088 26.509 27.9998 24.6677 27.9998H3.33232C1.491 27.9998 0 26.5088 0 24.6675V14.6663C0 12.825 1.491 11.334 3.33232 11.334H6.2545C7.14312 11.334 7.96338 11.915 8.17699 12.778C8.82209 15.3926 11.1846 17.3322 14.0043 17.3322C16.8239 17.3322 19.1779 15.3926 19.8273 12.778C20.0409 11.915 20.8569 11.334 21.7498 11.334H24.1935C26.509 11.334 28 12.825 28 14.6663Z"
                  ></path><path
                    d="M13.0607 13.6112L8.06649 8.62557C7.22487 7.78395 7.8187 6.34422 9.00638 6.34422H11.3347V1.33293C11.3347 0.598108 11.9328 0 12.6677 0H15.3335C16.0683 0 16.6664 0.598108 16.6664 1.33293V6.34422H18.9948C20.1825 6.34422 20.7763 7.78395 19.9347 8.62557L14.9405 13.6112C14.4193 14.1282 13.5819 14.1282 13.0607 13.6112Z"
                  ></path></svg
                >
              </div>
            </div>
          </div>
          <div class="e166b803 flex" style="display: none;">{$_('g-copied')}</div>
        </div>
      </div>
      <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
      <div
        tabindex="0"
        aria-hidden="true"
        style="width: 0px; height: 0px; overflow: hidden;"
      ></div>
    </div>
  </div>
</div>
