<script>
	import { _ } from 'svelte-i18n';
  export let handleModalOpen = null;
  function handleModal() {
    if (handleModalOpen) handleModalOpen();
  }
</script>
<div class="ant-table-placeholder">
  <div class="empty-wrapper">
    <svg
      width="80"
      height="80"
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      ><path
        d="M64 55.2593L50 69L17.8182 69C16.814 69 16 68.186 16 67.1818L16 17.8182C16 16.814 16.814 16 17.8182 16L62.1818 16C63.186 16 64 16.814 64 17.8182L64 55.2593Z"
        fill="#E3E3E3"
      ></path><path
        d="M50 55.9091C50 55.407 50.407 55 50.9091 55L64 55L57 62L50 69L50 55.9091Z"
        fill="#B8B8B8"
      ></path><rect
        width="26"
        height="3.63636"
        rx="0.909091"
        transform="matrix(1 5.56363e-08 5.56363e-08 -1 28 46.5469)"
        fill="#FAFAFA"
      ></rect><rect
        width="22"
        height="3.63637"
        rx="0.909091"
        transform="matrix(1 5.56363e-08 5.56363e-08 -1 28 35.6367)"
        fill="#FAFAFA"
      ></rect><circle cx="20.9091" cy="19.9091" r="10.9091" fill="#2B2B2E"
      ></circle><path
        d="M21.5815 23.0699H19.7751C19.347 23.0699 19 23.417 19 23.8451V25.6514C19 26.0795 19.347 26.4266 19.7751 26.4266H21.5815C22.0096 26.4266 22.3566 26.0795 22.3566 25.6514V23.8451C22.3566 23.417 22.0096 23.0699 21.5815 23.0699Z"
        fill="#FAFAFA"
      ></path><path
        d="M21.5815 13H19.7751C19.347 13 19 13.347 19 13.7751V20.6165C19 21.0446 19.347 21.3916 19.7751 21.3916H21.5815C22.0096 21.3916 22.3566 21.0446 22.3566 20.6165V13.7751C22.3566 13.347 22.0096 13 21.5815 13Z"
        fill="#FAFAFA"
      ></path></svg
    >
    <div>
      <button
        type="button"
        class="empty-button polo-btn polo-btn-button polo-btn-primary polo-btn-medium"
        ><!---->
        <div class="btn-sp">{$_('invite-friends-now')}</div></button
      >
    </div>
    <div class="ant-modal-root">
      <div class="ant-modal-mask"></div>
      <div
        tabindex="-1"
        role="dialog"
        class="ant-modal-wrap ant-modal-centered _1b7365a1"
      >
        <div
          role="document"
          class="ant-modal"
          style="width: 644px; transform-origin: 310px 656px;"
        >
          <div
            tabindex="0"
            aria-hidden="true"
            style="width: 0px; height: 0px; overflow: hidden;"
          ></div>
          <div class="ant-modal-content">
            <button
              type="button"
              aria-label="Close"
              class="ant-modal-close"
              on:click={handleModal}
              ><span class="ant-modal-close-x"
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
            <div class="ant-modal-body" style="padding: 41px 0px 46px;">
              <div class="b3a426e1">
                <nav style="left: 217px;">
                  <div class="ba3231fa ad8db931">
                    <img
                      src="https://www.datocms-assets.com/51952/1697175705-400.png"
                      alt=""
                    />
                    <div class="cc011bf7">
                      <div class="fb7cd702">{$_('scan-qr-code')}</div>
                      <div class="_53cc68e9">
                        <span>{$_('referral-code-1')}</span><strong>EBMJA7QE</strong>
                      </div>
                    </div>
                    <div
                      value="https://poloniex.com/signup?c=EBMJA7QE&amp;r=%2Freferral%2Ftasks"
                      level="L"
                      background="#fff"
                      foreground="#000"
                      class="dddaa209"
                    >
                      <canvas
                        height="200"
                        width="200"
                        style="width: 100px; height: 100px;"
                      ></canvas>
                    </div>
                  </div>
                  <div class="ba3231fa">
                    <img
                      src="https://www.datocms-assets.com/51952/1697176221-.png"
                      alt=""
                    />
                    <div class="cc011bf7">
                      <div class="fb7cd702">{$_('scan-qr-code')}</div>
                      <div class="_53cc68e9">
                        <span>{$_('referral-code-1')}</span><strong>EBMJA7QE</strong>
                      </div>
                    </div>
                    <div
                      value="https://poloniex.com/signup?c=EBMJA7QE&amp;r=%2Freferral%2Ftasks"
                      level="L"
                      background="#fff"
                      foreground="#000"
                      class="dddaa209"
                    >
                      <canvas
                        height="200"
                        width="200"
                        style="width: 100px; height: 100px;"
                      ></canvas>
                    </div>
                  </div>
                </nav>
                <div class="_5722798a">
                  <svg
                    width="26"
                    height="29"
                    viewBox="0 0 26 29"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#FAFAFA"
                    stroke="#424548"
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
                    fill="#FAFAFA"
                    xmlns="http://www.w3.org/2000/svg"
                    ><path
                      d="M28 14.6663V24.6675C28 26.5088 26.509 27.9998 24.6677 27.9998H3.33232C1.491 27.9998 0 26.5088 0 24.6675V14.6663C0 12.825 1.491 11.334 3.33232 11.334H6.2545C7.14312 11.334 7.96338 11.915 8.17699 12.778C8.82209 15.3926 11.1846 17.3322 14.0043 17.3322C16.8239 17.3322 19.1779 15.3926 19.8273 12.778C20.0409 11.915 20.8569 11.334 21.7498 11.334H24.1935C26.509 11.334 28 12.825 28 14.6663Z"
                    ></path><path
                      d="M13.0607 13.6112L8.06649 8.62557C7.22487 7.78395 7.8187 6.34422 9.00638 6.34422H11.3347V1.33293C11.3347 0.598108 11.9328 0 12.6677 0H15.3335C16.0683 0 16.6664 0.598108 16.6664 1.33293V6.34422H18.9948C20.1825 6.34422 20.7763 7.78395 19.9347 8.62557L14.9405 13.6112C14.4193 14.1282 13.5819 14.1282 13.0607 13.6112Z"
                    ></path></svg
                  >
                </div>
              </div>
              <div class="_9039fb86 flex" style="display: none;">{$_('g-copied')}</div>
            </div>
          </div>
          <div
            tabindex="0"
            aria-hidden="true"
            style="width: 0px; height: 0px; overflow: hidden;"
          ></div>
        </div>
      </div>
    </div>
  </div>
</div>
