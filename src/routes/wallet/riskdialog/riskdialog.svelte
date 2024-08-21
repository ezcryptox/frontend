
<script>
	import { createEventDispatcher } from "svelte";


  export let currency = '';
  const onClose = createEventDispatcher();
  const handleClose = () => {
      onClose('close')
  }
  </script>

<div class="vfm vfm--fixed vfm--inset" role="dialog" aria-modal="true" style="z-index: 1000001;">
      <div class="vfm__overlay vfm--overlay vfm--absolute vfm--inset vfm--prevent-none web-core-modal"
        aria-hidden="true">
      </div>
      <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
      <div class="vfm__content vfm--outline-none web-core-modal" tabindex="0">
        <div class="successDialog depositWithdrawWraper" style="width: 360px;">
          <h4 class="head-title">Risk Reminder</h4>
          <p class="marginTop48" style="text-align: left;">Send only <strong>{currency}</strong> to this address.</p>
          <p style="text-align: left;">Sending other cryptos to this address will result in irretrievable loss.</p>
          <button on:click={handleClose}  data-size="large" type="button" class="jRLsY SOUdU marginTop32" style="width: 100%;"><span><!---->Got
              It</span></button>
        </div><button on:click={handleClose} class="icon-close"><svg fill="currentColor" style="width: 24px; height: 24px;">
            <use xlink:href="#web-core-icon-cross"></use>
          </svg></button>
      </div>
</div>


<style>
.vfm--fixed {
  position: fixed;
}

.vfm--absolute {
  position: absolute;
}
.vfm--inset {
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.vfm--overlay {
  z-index: -1;
  background-color: #00000080;
}

.vfm--prevent-none {
  pointer-events: none;
}

.vfm--outline-none:focus {
  outline: none;
}

.vfm-fade-enter-active {
  animation: fade-in .3s ease;
}

.vfm-fade-leave-active {
  animation: fade-out .3s ease;
}

.vfm-bounce-back {
  transition-property: transform;
  transition-duration: .3s;
}

.vfm-slide-up-enter-active,.vfm-slide-up-leave-active,.vfm-slide-down-enter-active,.vfm-slide-down-leave-active {
  transition: transform .3s ease;
}

.vfm-slide-down-enter-from,.vfm-slide-down-leave-to {
  transform: translateY(100vh) !important;
}

.vfm-slide-up-enter-from,.vfm-slide-up-leave-to {
  transform: translateY(-100vh) !important;
}

.vfm-slide-right-enter-active,.vfm-slide-right-leave-active,.vfm-slide-left-enter-active,.vfm-slide-left-leave-active {
  transition: transform .3s ease;
}

.vfm-slide-right-enter-from,.vfm-slide-right-leave-to {
  transform: translate(100vw) !important;
}

.vfm-slide-left-enter-from,.vfm-slide-left-leave-to {
  transform: translate(-100vw) !important;
}

.vfm-swipe-banner-back,.vfm-swipe-banner-forward {
  position: fixed;
  top: 0;
  bottom: 0;
  width: 27px;
  z-index: 10;
}

.vfm-swipe-banner-back {
  left: 0;
}

.vfm-swipe-banner-forward {
  right: 0;
}

.web-core-modal.vfm__content {
  --border-radius: 8px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  border-radius: var(--border-radius);
}

:global(body:not(.dark-theme)) .vfm__content {
  background-color: #fff;
  box-shadow: 0 6px 16px #0000004d;
}

:global(body.dark-theme) .vfm__content {
  background-color: #1f1f24;
}

.web-core-modal.vfm__content .icon-close {
  position: absolute;
  right: 24px;
  top: 24px;
  cursor: pointer;
  -webkit-appearance: none;
  outline: none;
  border: none;
  -webkit-user-select: none;
  user-select: none;
  background-color: transparent;
  width: 24px;
  height: 24px;
}

html[data-theme=light] .web-core-modal.vfm__content .icon-close {
  color: #2b2b2e;
}

html[data-theme=dark] .web-core-modal.vfm__content .icon-close {
  color: #e3e3e3;
}

@media (prefers-color-scheme: dark) {
  .ag-theme-alpine-auto-dark {
    --ag-background-color: #181d1f;
    --ag-foreground-color: #fff;
    --ag-border-color: #68686e;
    --ag-secondary-border-color: rgba(88, 86, 82, .5);
    --ag-modal-overlay-background-color: rgba(24, 29, 31, .66);
    --ag-header-background-color: #222628;
    --ag-tooltip-background-color: #222628;
    --ag-odd-row-background-color: #222628;
    --ag-control-panel-background-color: #222628;
    --ag-subheader-background-color: #000;
    --ag-input-disabled-background-color: rgba(104, 104, 110, .07);
    --ag-input-focus-box-shadow: 0 0 2px .5px rgba(255, 255, 255, .5), 0 0 4px 3px var(--ag-input-focus-border-color);
    --ag-card-shadow: 0 1px 20px 1px black;
    --ag-disabled-foreground-color: rgba(255, 255, 255, .5);
    --ag-chip-background-color: rgba(255, 255, 255, .07);
    --ag-input-disabled-border-color: rgba(104, 104, 110, .3);
    --ag-advanced-filter-join-pill-color: #7a3a37;
    --ag-advanced-filter-column-pill-color: #355f2d;
    --ag-advanced-filter-option-pill-color: #5a3168;
    --ag-advanced-filter-value-pill-color: #374c86;
    --ag-row-loading-skeleton-effect-color: rgba(202, 203, 204, .4);
    color-scheme: dark;
  }

}

@media screen and (max-width:550px) {
  .a7ddb18f .ba0dfc48 {
    display: none;
  }

}

@media screen and (max-width:550px) {
  .ccf482a6 {
    min-width: 100%;
    border-radius: 0;
    box-shadow: none;
  }

}

@media screen and (max-width:1100px) {
  .eb13f307 {
    display: flex;
    align-items: flex-start;
  }

  .eb13f307 .bb407533 {
    margin-left: 45px;
  }

}

@media screen and (max-width:1100px) {
  .eb13f307 .abc20fb3 {
    margin-block: 0;
  }

}

@media screen and (max-width:1100px) {
  .eb13f307 .ca0fb6d9 {
    position: absolute;
    left: 0;
    bottom: -15px;
  }

}

@media screen and (max-width:815px) {
  .d83dcb4c {
    margin-left: 0;
    margin-top: 30px;
  }

}

@media screen and (max-width:1100px) {
  .beb6dc28 .e2fff687 .ce1f9e13 {
    padding-left: calc(48% - 369px);
    flex-direction: column;
    align-items: stretch;
  }

}

@media screen and (max-width:1100px) {
  .beb6dc28 .e2fff687 .ce1f9e13 .fa9ae9d7 {
    max-width: 1000px;
    padding-right: 0;
  }

}

@media screen and (max-width:1100px) {
  .beb6dc28 .e2fff687 .ce1f9e13 .e5cc3d28 {
    margin-left: 0;
    margin-top: 60px;
  }

}

@media screen and (max-width:815px) {
  .beb6dc28 .e2fff687 .ce1f9e13 .e5cc3d28 {
    flex-direction: column;
  }

}

@media screen and (max-width:1100px) {
  .beb6dc28 .e2fff687 .c17a4fd0 {
    padding-inline: calc(48% - 369px);
  }

}

@media screen and (max-width:815px) {
  .beb6dc28 .e2fff687 .c17a4fd0 {
    flex-direction: column;
    justify-content: flex-start;
  }

}

@media screen and (max-width:815px) {
  .beb6dc28 .e2fff687 .c17a4fd0 .a174fe8c a {
    flex-basis: 100%;
  }

  .beb6dc28 .e2fff687 .c17a4fd0 .a174fe8c a+a {
    margin-left: 0;
    margin-top: 20px;
  }

}

.vfm--fixed {
  position: fixed;
}

.vfm-slide-down-enter-active,.vfm-slide-down-leave-active,.vfm-slide-up-enter-active,.vfm-slide-up-leave-active {
  transition: transform .3s ease;
}

.vfm-slide-left-enter-active,.vfm-slide-left-leave-active,.vfm-slide-right-enter-active,.vfm-slide-right-leave-active {
  transition: transform .3s ease;
}

.uniframe-root.vfm__content {
  --border-radius: 8px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  border-radius: var(--border-radius);
}

html[data-uniframe-theme=light] .uniframe-root.vfm__content {
  background-color: #fff;
  box-shadow: 0 6px 16px #0000004d;
}

html[data-uniframe-theme=dark] .uniframe-root.vfm__content {
  background-color: #1f1f24;
}

.uniframe-root.vfm__content>.icon-close {
  position: absolute;
  right: 24px;
  top: 24px;
  cursor: pointer;
  -webkit-appearance: none;
  outline: none;
  border: none;
  -webkit-user-select: none;
  user-select: none;
  background-color: #0000;
  width: 24px;
  height: 24px;
  transition: opacity .3s;
}

html[data-uniframe-theme=light] .uniframe-root.vfm__content>.icon-close {
  color: #2b2b2e;
}

html[data-uniframe-theme=dark] .uniframe-root.vfm__content>.icon-close {
  color: #e3e3e3;
}

.uniframe-root.vfm__content>.icon-close:hover {
  opacity: .8;
}

@media screen and (max-width:500px) {
  .b26b640a {
    max-width: 95vw;
    padding-left: 12px;
    padding-right: 12px;
  }

}

@media (max-width:500px) {
  .fe6f7ce0 .ef8295d7 {
    width: 44px;
    height: 44px;
    font-size: 24px;
  }

  .fe6f7ce0 .dfddd2ce {
    font-size: 22px;
    width: 22px;
    height: 26px;
    line-height: 26px;
  }

}

@media (max-width:500px) {
  .be5d23c5 .d9218a3a {
    min-width: 296px;
  }

  .be5d23c5 .d9218a3a .fdb58477 {
    width: 120px;
    height: 120px;
    margin-bottom: 16px;
  }

  .be5d23c5 .d9218a3a .f453e4c1 {
    font-size: 16px;
    line-height: 24px;
    font-weight: 600;
  }

  .be5d23c5 .d9218a3a .ff765108 {
    font-size: 14px;
    line-height: 20px;
    margin-bottom: 8px;
  }

}

.depositWithdrawWraper .cursorPointer {
  cursor: pointer;
}

.depositWithdrawWraper .marginTop12 {
  margin-top: 12px;
}

.depositWithdrawWraper .marginTop24 {
  margin-top: 24px;
}

.depositWithdrawWraper .marginTop32 {
  margin-top: 32px;
}

.depositWithdrawWraper .marginTop48 {
  margin-top: 48px;
}

.depositWithdrawWraper.withdrawalConfirm {
  width: 520px;
  padding: 67px 24px 24px;
  position: relative;
}

.depositWithdrawWraper.withdrawalConfirm dl {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: 400;
  font-size: 16px;
  line-height: 23px;
}

html[data-theme=light] .depositWithdrawWraper.withdrawalConfirm {
  color: #616161;
}

html[data-theme=dark] .depositWithdrawWraper.withdrawalConfirm {
  color: #b8b8b8;
}

.depositWithdrawWraper.withdrawalConfirm .head-title {
  font-weight: 400;
  font-size: 20px;
  line-height: 28px;
  top: 24px;
  left: 24px;
  position: absolute;
}

html[data-theme=light] .depositWithdrawWraper.withdrawalConfirm .head-title {
  color: #131316;
}

html[data-theme=dark] .depositWithdrawWraper.withdrawalConfirm .head-title {
  color: #fff;
}

.depositWithdrawWraper.withdrawalConfirm strong {
  font-weight: 400;
  margin-left: 4px;
}

html[data-theme=light] .depositWithdrawWraper.withdrawalConfirm strong {
  color: #131316;
}

html[data-theme=dark] .depositWithdrawWraper.withdrawalConfirm strong {
  color: #fff;
}

.depositWithdrawWraper.withdrawalConfirm dd {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  word-break: break-all;
  flex: 1;
}

html[data-theme=light] .depositWithdrawWraper.withdrawalConfirm dd {
  color: #131316;
}

html[data-theme=dark] .depositWithdrawWraper.withdrawalConfirm dd {
  color: #fff;
}

.depositWithdrawWraper.withdrawalConfirm dd strong {
  font-weight: 600;
}

.depositWithdrawWraper.withdrawalConfirm dd .green {
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
}

html[data-theme=light] .depositWithdrawWraper.withdrawalConfirm dd .green {
  color: #1a8f5c;
}

html[data-theme=dark] .depositWithdrawWraper.withdrawalConfirm dd .green {
  color: #119e5f;
}

.depositWithdrawWraper.withdrawalConfirm dd svg {
  margin-left: 4px;
}

.depositWithdrawWraper.withdrawalConfirm dd span {
  display: flex;
  align-items: center;
  justify-content: center;
}

.depositWithdrawWraper.withdrawalConfirm dd .red {
  color: #c44749 !important;
}

.depositWithdrawWraper.withdrawalConfirm dd .status {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-left: 8px;
  position: relative;
}

.depositWithdrawWraper.withdrawalConfirm dd .status:before {
  position: absolute;
  width: 4px;
  height: 4px;
  border-radius: 2px;
  content: "";
  left: 0;
  top: 8px;
  background-color: #131316;
}

.depositWithdrawWraper.withdrawalConfirm dd .status.FUND_FROZEN {
  color: #878787;
}

.depositWithdrawWraper.withdrawalConfirm dd .status.FUND_FROZEN:before {
  background-color: #878787;
}

.depositWithdrawWraper.withdrawalConfirm dd .status.PROCESSING {
  color: #e59940 !important;
}

.depositWithdrawWraper.withdrawalConfirm dd .status.PROCESSING:before {
  background-color: #e59940 !important;
}

.depositWithdrawWraper.withdrawalConfirm dd .status.ERROR {
  color: #c44749 !important;
}

.depositWithdrawWraper.withdrawalConfirm dd .status.ERROR:before {
  background-color: #c44749 !important;
}

.depositWithdrawWraper.withdrawalConfirm dd .status.COMPLETED {
  color: #1a8f5c !important;
}

.depositWithdrawWraper.withdrawalConfirm dd .status.COMPLETED:before {
  background-color: #1a8f5c !important;
}

.depositWithdrawWraper.withdrawalConfirm .tipbj {
  border-radius: 8px;
  padding: 8px 16px 16px;
  margin-top: 16px;
}

html[data-theme=light] .depositWithdrawWraper.withdrawalConfirm .tipbj {
  background: #fafafa;
}

html[data-theme=dark] .depositWithdrawWraper.withdrawalConfirm .tipbj {
  background: #2b2b2e;
}

.depositWithdrawWraper.withdrawalConfirm .tipbj li {
  font-weight: 400;
  font-size: 12px;
  line-height: 17px;
  color: #e59940;
  margin-top: 8px;
  position: relative;
  padding-left: 8px;
}

.depositWithdrawWraper.withdrawalConfirm .tipbj li:before {
  content: "";
  position: absolute;
  width: 4px;
  height: 4px;
  left: 0;
  top: 6px;
  border-radius: 50%;
  background-color: #e59940;
}

.depositWithdrawWraper.withdrawalConfirm .btnOne {
  display: flex;
  align-items: center;
  justify-content: center;
}

.depositWithdrawWraper.successDialog {
  width: 420px;
  padding: 24px;
}

html[data-theme=light] .depositWithdrawWraper.successDialog a {
  color: #1a8f5c;
}

html[data-theme=dark] .depositWithdrawWraper.successDialog a {
  color: #119e5f;
}

.depositWithdrawWraper.successDialog .head-title {
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
  top: 24px;
  left: 24px;
  position: absolute;
}

html[data-theme=light] .depositWithdrawWraper.successDialog .head-title {
  color: #131316;
}

html[data-theme=dark] .depositWithdrawWraper.successDialog .head-title {
  color: #fff;
}

.depositWithdrawWraper.successDialog.errorWraper {
  width: 360px;
}

.depositWithdrawWraper.successDialog .successIcon {
  text-align: center;
  padding-top: 10px;
}

.depositWithdrawWraper.successDialog .successIcon svg {
  width: 40px;
  height: 40px;
}

.depositWithdrawWraper.successDialog h5 {
  margin-top: 22px;
  font-weight: 400;
  font-size: 20px;
  line-height: 28px;
  text-align: center;
}

html[data-theme=light] .depositWithdrawWraper.successDialog h5 {
  color: #131316;
}

html[data-theme=dark] .depositWithdrawWraper.successDialog h5 {
  color: #fff;
}

.depositWithdrawWraper.successDialog strong {
  margin: 0 2px;
}

html[data-theme=light] .depositWithdrawWraper.successDialog strong {
  color: #131316;
}

html[data-theme=dark] .depositWithdrawWraper.successDialog strong {
  color: #fff;
}

.depositWithdrawWraper.successDialog strong.big {
  font-size: 22px;
}

.depositWithdrawWraper.successDialog p {
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  font-weight: 400;
}

html[data-theme=light] .depositWithdrawWraper.successDialog p {
  color: #616161;
}

html[data-theme=dark] .depositWithdrawWraper.successDialog p {
  color: #b8b8b8;
}

html[data-theme=light] .depositWithdrawWraper.successDialog p.small {
  color: #131316;
}

html[data-theme=dark] .depositWithdrawWraper.successDialog p.small {
  color: #fff;
}

.jRLsY {
  position: relative;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  text-align: center;
  outline: 0;
  transition: background-color .2s,border-color .2s,color .2s;
  font-weight: 400;
  -webkit-user-select: none;
  user-select: none;
  vertical-align: middle;
  -webkit-appearance: none;
  padding: 4px 16px;
  border-radius: 4px;
  color: var(--web-core-button-text-color);
  background-color: var(--web-core-button-bg-color);
  border: 1px solid var(--web-core-button-bd-color);
}

.jRLsY[data-size=mini] {
  height: 24px;
  padding-left: 12px;
  padding-right: 12px;
  font-size: 12px;
}

.jRLsY[data-size=mini] .aKw2F {
  width: 12px !important;
  height: 12px !important;
}

.jRLsY[data-size=small] {
  height: 28px;
  padding-left: 16px;
  padding-right: 16px;
  font-size: 12px;
}

.jRLsY[data-size=small] .aKw2F {
  width: 12px !important;
  height: 12px !important;
}

.jRLsY[data-size=medium] {
  height: 36px;
  padding-left: 20px;
  padding-right: 20px;
  font-size: 14px;
}

.jRLsY[data-size=medium] .aKw2F {
  width: 16px !important;
  height: 16px !important;
}

.jRLsY[data-size=large] {
  height: 44px;
  padding-left: 24px;
  padding-right: 24px;
  font-size: 16px;
}

.jRLsY[data-size=large] .aKw2F {
  width: 20px !important;
  height: 20px !important;
}

.jRLsY:hover:not([disabled]):not(.hwhVM):not(.vlvLr) {
  color: var(--web-core-button-hover-text-color);
  background-color: var(--web-core-button-hover-bg-color);
  border: 1px solid var(--web-core-button-hover-bd-color);
}

.jRLsY[disabled],.jRLsY.hwhVM {
  pointer-events: none;
  cursor: not-allowed;
  color: var(--web-core-button-disabled-text-color);
  background-color: var(--web-core-button-disabled-bg-color);
  border: 1px solid var(--web-core-button-disabled-bd-color);
}

.jRLsY .ewyx- {
  margin-right: 4px;
}

.jRLsY .hMj5Z {
  margin-left: 4px;
}

.jRLsY>span {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

html[data-theme=light] .jRLsY.SOUdU {
  --web-core-button-text-color: #ffffff;
  --web-core-button-bg-color: #131316;
  --web-core-button-bd-color: #131316;
  --web-core-button-hover-text-color: #ffffff;
  --web-core-button-hover-bg-color: #2b2b2e;
  --web-core-button-hover-bd-color: #2b2b2e;
  --web-core-button-disabled-text-color: #878787;
  --web-core-button-disabled-bg-color: #b8b8b8;
  --web-core-button-disabled-bd-color: #b8b8b8;
}

html[data-theme=dark] .jRLsY.SOUdU {
  --web-core-button-text-color: #131316;
  --web-core-button-bg-color: #ffffff;
  --web-core-button-bd-color: #ffffff;
  --web-core-button-hover-text-color: #131316;
  --web-core-button-hover-bg-color: #fafafa;
  --web-core-button-hover-bd-color: #fafafa;
  --web-core-button-disabled-text-color: #878787;
  --web-core-button-disabled-bg-color: #616161;
  --web-core-button-disabled-bd-color: #616161;
}

html[data-theme=light] .jRLsY.rNnOn {
  --web-core-button-text-color: #131316;
  --web-core-button-bg-color: #ffffff;
  --web-core-button-bd-color: #616161;
  --web-core-button-hover-text-color: #131316;
  --web-core-button-hover-bg-color: #f2f2f2;
  --web-core-button-hover-bd-color: #616161;
  --web-core-button-disabled-text-color: #b8b8b8;
  --web-core-button-disabled-bg-color: #ffffff;
  --web-core-button-disabled-bd-color: #e3e3e3;
}

html[data-theme=dark] .jRLsY.rNnOn {
  --web-core-button-text-color: #ffffff;
  --web-core-button-bg-color: transparent;
  --web-core-button-bd-color: #b8b8b8;
  --web-core-button-hover-text-color: #ffffff;
  --web-core-button-hover-bg-color: #2b2b2e;
  --web-core-button-hover-bd-color: #b8b8b8;
  --web-core-button-disabled-text-color: #616161;
  --web-core-button-disabled-bg-color: #131316;
  --web-core-button-disabled-bd-color: #2b2b2e;
}

html[data-theme=light] .jRLsY.wzmE4 {
  --web-core-button-text-color: #ffffff;
  --web-core-button-bg-color: #1a8f5c;
  --web-core-button-bd-color: #1a8f5c;
  --web-core-button-hover-text-color: #ffffff;
  --web-core-button-hover-bg-color: #106f44;
  --web-core-button-hover-bd-color: #106f44;
  --web-core-button-disabled-text-color: #b8b8b8;
  --web-core-button-disabled-bg-color: #f2f2f2;
  --web-core-button-disabled-bd-color: #f2f2f2;
}

html[data-theme=dark] .jRLsY.wzmE4 {
  --web-core-button-text-color: #ffffff;
  --web-core-button-bg-color: #106f44;
  --web-core-button-bd-color: #106f44;
  --web-core-button-hover-text-color: #ffffff;
  --web-core-button-hover-bg-color: #1a8f5c;
  --web-core-button-hover-bd-color: #1a8f5c;
  --web-core-button-disabled-text-color: #616161;
  --web-core-button-disabled-bg-color: #2b2b2e;
  --web-core-button-disabled-bd-color: #2b2b2e;
}

html[data-theme=light] .jRLsY.Eve24 {
  --web-core-button-text-color: #1a8f5c;
  --web-core-button-bg-color: #ffffff;
  --web-core-button-bd-color: #616161;
  --web-core-button-hover-text-color: #1a8f5c;
  --web-core-button-hover-bg-color: #f2f2f2;
  --web-core-button-hover-bd-color: #616161;
  --web-core-button-disabled-text-color: #b8b8b8;
  --web-core-button-disabled-bg-color: #ffffff;
  --web-core-button-disabled-bd-color: #e3e3e3;
}

html[data-theme=dark] .jRLsY.Eve24 {
  --web-core-button-text-color: #119e5f;
  --web-core-button-bg-color: #131316;
  --web-core-button-bd-color: #b8b8b8;
  --web-core-button-hover-text-color: #119e5f;
  --web-core-button-hover-bg-color: #2b2b2e;
  --web-core-button-hover-bd-color: #b8b8b8;
  --web-core-button-disabled-text-color: #616161;
  --web-core-button-disabled-bg-color: #131316;
  --web-core-button-disabled-bd-color: #2b2b2e;
}

html[data-theme=light] .jRLsY.nFueq {
  --web-core-button-text-color: #131316;
  --web-core-button-bg-color: #f2f2f2;
  --web-core-button-bd-color: #f2f2f2;
  --web-core-button-hover-text-color: #131316;
  --web-core-button-hover-bg-color: #e3e3e3;
  --web-core-button-hover-bd-color: #e3e3e3;
  --web-core-button-disabled-text-color: #b8b8b8;
  --web-core-button-disabled-bg-color: #f2f2f2;
  --web-core-button-disabled-bd-color: #f2f2f2;
}

html[data-theme=dark] .jRLsY.nFueq {
  --web-core-button-text-color: #ffffff;
  --web-core-button-bg-color: #2b2b2e;
  --web-core-button-bd-color: #2b2b2e;
  --web-core-button-hover-text-color: #ffffff;
  --web-core-button-hover-bg-color: #616161;
  --web-core-button-hover-bd-color: #616161;
  --web-core-button-disabled-text-color: #616161;
  --web-core-button-disabled-bg-color: #2b2b2e;
  --web-core-button-disabled-bd-color: #2b2b2e;
}

html[data-theme=light] .jRLsY._99-zd {
  --web-core-button-text-color: #ffffff;
  --web-core-button-bg-color: #c44749;
  --web-core-button-bd-color: #c44749;
  --web-core-button-hover-text-color: #ffffff;
  --web-core-button-hover-bg-color: #9a2c2e;
  --web-core-button-hover-bd-color: #9a2c2e;
  --web-core-button-disabled-text-color: #b8b8b8;
  --web-core-button-disabled-bg-color: #f2f2f2;
  --web-core-button-disabled-bd-color: #f2f2f2;
}

html[data-theme=dark] .jRLsY._99-zd {
  --web-core-button-text-color: #ffffff;
  --web-core-button-bg-color: #9a2c2e;
  --web-core-button-bd-color: #9a2c2e;
  --web-core-button-hover-text-color: #ffffff;
  --web-core-button-hover-bg-color: #c44749;
  --web-core-button-hover-bd-color: #c44749;
  --web-core-button-disabled-text-color: #616161;
  --web-core-button-disabled-bg-color: #2b2b2e;
  --web-core-button-disabled-bd-color: #2b2b2e;
}

.jRLsY.vlvLr {
  pointer-events: none;
}

.jRLsY.vlvLr>span {
  visibility: hidden;
}

.jRLsY.vlvLr:after {
  content: "";
  width: 16px;
  height: 16px;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -8px;
  margin-top: -9px;
  display: inline-block;
  vertical-align: middle;
  animation: _7OWcc 1s infinite linear;
  font-size: 0;
  border-radius: 50%;
  border-style: solid;
  border-top-color: transparent !important;
  border-bottom-color: transparent !important;
  border-width: 2px;
  overflow: hidden;
}

.jRLsY.vlvLr[data-size=mini]:after,.jRLsY.vlvLr[data-size=small]:after {
  width: 12px;
  height: 12px;
  margin-left: -6px;
  margin-top: -7px;
}


</style>