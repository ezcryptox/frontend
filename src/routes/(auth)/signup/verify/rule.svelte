<script>
import { createEventDispatcher } from "svelte";
const dispatch = createEventDispatcher()
import { otp } from "$lib/store/otp"
</script>

<div id="modals-container">
    <div class="vm--container">
        <div data-modal="dynamic_modal_0" aria-expanded="true" class="vm--overlay">
            <div class="vm--top-right-slot"></div>
        </div>
        <div  role="dialog" aria-modal="true" class="vm--modal" style="left: 392px; width: 430px; height: auto; top: 106px;">
            <section class="modal-box a1e6e1ea">
                <!---->
                <div class="modal-head">
                    <div class="_92132967">Didn't receive the code?</div>
                </div>
                <div class="modal-content">
                    <!----><div class="de37a84c"> Verification code was sent to your email. If you have not received the code after several attempts. Please try: <ul>
                        <li>Check if it is in your junk/spam folder.</li>
                        <li>Make sure your email is {$otp?.email}</li>
                        <li>The message may be delayed for a few minutes. Please try again after 20 minutes.</li>
                    </ul>
                    <p class="_791a1866">
                        <a target="_blank" href="?https://support.poloniex.com/hc/en-us/requests/new"> Contact Support </a> if the issue persists. </p>
                    </div>
                </div>
                <div class="modal-foot">
                    <button on:click={()=> dispatch("close")} type="button" class="polo-btn polo-btn-button polo-btn-primary polo-btn-medium a814907b">
                        <!---->
                        <div class="btn-sp"> I understand </div>
                    </button>
                </div>
            </section> 
        <!---->
        </div>
    </div>
</div>

<style>
.modal-box {
    height: 100%;
    display: flex;
    padding: 24px;
    position: relative;
    flex-direction: column;
    color: #000;
}
.a1e6e1ea ._92132967 {
    margin-top: 8px;
    padding-top: 64px;
    font-weight: 700;
    font-size: 18px;
    line-height: 26px;
    text-align: center;
    background: url(https://v3.polo-static.com/spot-web/static/img/notify.2f2e2b22.svg) no-repeat top;
}
.a1e6e1ea .de37a84c {
    padding-top: 20px;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
}
.a1e6e1ea ._92132967, .a1e6e1ea .de37a84c {
    color: #131316;
}
.a1e6e1ea .de37a84c ul {
    margin: 0;
    padding: 16px 0 16px 24px;
    list-style-type: decimal;
    -webkit-padding-start: 16px;
    padding-inline-start: 16px;
}
.a1e6e1ea .de37a84c ._791a1866 a {
    color: #1a8f5c;
    text-decoration: underline;
}
.modal-box .modal-foot {
    display: flex;
    flex-wrap: nowrap;
}
.modal-box .modal-foot button {
    flex: 1 1 0;
}
.a1e6e1ea .a814907b {
    width: 100%;
    height: 48px;
}
.a1e6e1ea .a814907b {
    margin-top: 32px;
}
</style>