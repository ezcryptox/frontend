<script>
import { createEventDispatcher } from "svelte";
const dispatch = createEventDispatcher()

</script>

<div id="uniframe-dialog" data-v-app="">
    <div class="vfm vfm--fixed vfm--inset" role="dialog" aria-modal="true" style="z-index: 1000101;">
        <div class="vfm__overlay vfm--overlay vfm--absolute vfm--inset vfm--prevent-none uniframe-root" aria-hidden="true"></div>
        <div class="vfm__content vfm--outline-none uniframe-root" >
            <div class="beeac841" component="[object Object]">
                <h2>Enable Passkey</h2>
                <dl><dt>
                    <svg width="20" height="21" viewBox="0 0 20 21" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.1669 11.3893V12.2227C14.1669 14.5307 13.6137 16.7602 12.5711 18.7606L12.3821 19.1112L10.9263 18.2997C11.893 16.5656 12.4342 14.6241 12.4946 12.6026L12.5002 12.2227V11.3893H14.1669ZM9.16692 8.88932H10.8336V12.2227L10.829 12.5382C10.7627 14.8472 9.97042 17.0336 8.5865
                            18.8293L8.39417 19.0717L7.10338 18.0173C8.36733 16.4701 9.09542 14.5574 9.16192 12.5279L9.16692 12.2227V8.88932ZM10.0002 5.55599C12.3014 5.55599 14.1669 7.42147 14.1669 9.72266H12.5002C12.5002 8.34195 11.3809 7.22266 10.0002 7.22266C8.6195 7.22266 7.50021 8.34195 7.50021 9.72266V12.2227C7.50021
                            14.0855 6.81717 15.843 5.60773 17.2033L5.43139 17.3949L4.22462 16.2454C5.1944 15.2273 5.76749 13.8992 5.82817 12.4749L5.83354 12.2227V9.72266C5.83354 7.42147 7.69902 5.55599 10.0002 5.55599ZM10.0002 2.22266C14.1423 2.22266 17.5002 5.58052 17.5002 9.72266V12.2227C17.5002 13.6376 17.3321 15.0309 17.0029
                            16.3812L16.8873 16.8297L15.2791 16.392C15.605 15.1945 15.7896 13.9567 15.8266 12.6963L15.8336 12.2227V9.72266C15.8336 6.501 13.2218 3.88932 10.0002 3.88932C8.68992 3.88932 7.48052 4.32133 6.50671 5.05069L5.31923 3.8624C6.60222 2.83625 8.22956 2.22266 10.0002 2.22266ZM4.13995 5.04167L5.32824 6.22916C4.63625
                            7.15309 4.21192 8.28908 4.17026 9.52207L4.16634 9.72182L4.16982 11.3893C4.16982 12.3222 3.94992 13.2248 3.53552 14.037L3.4054 14.2779L1.95801 13.4516C2.27407 12.8979 2.45897 12.2794 2.49616 11.633L2.50315 11.3893L2.50301 9.72266C2.50021 7.95201 3.1138 6.32467 4.13995 5.04167Z"></path>
                    </svg>
                    <span>Free Yourself from Password Memorization</span>
                </dt>
                <dd>Passkey enables you to log in with fingerprint or facial recognition.</dd>
                <dt>
                    <svg width="20" height="21" viewBox="0 0 20 21" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.61648 12.5399L13.8079 8.07204L12.4405 6.78918L9.52258 9.89949L8.13565 8.61723L6.86279 9.99399L9.61648 12.5399Z"></path>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M10 19.3057L17.2266 14.3057V1.80566H2.77344V14.3057L10 19.3057ZM4.64844 3.68066H15.3516V13.3229L10 17.0256L4.64844 13.3229V3.68066Z"></path>
                    </svg>
                    <span>Secure Your Account</span>
                </dt>
                <dd>Passkeys are a state-of-the-art technology resistant to phishing.</dd>
                <dt>
                    <svg width="20" height="21" viewBox="0 0 20 21" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M2.20703 2.68457V14.9307H9.0625V16.4932H6.21094V18.3682H13.7891V16.4932H10.9375V14.9307H17.8125V2.68457H2.20703ZM15.9375 4.55957H4.08203V13.0557H15.9375V4.55957Z"></path>
                    </svg>
                    <span>Work on All of Your Devices</span>
                </dt>
                <dd>Passkeys will automatically be available across all your devices.</dd>
                </dl>
                <div class="c7144b1d">
                    <button on:click={()=> dispatch("close")} data-size="large" type="button" class="ce727619 cb6de6db">
                        <span>Enable</span>
                    </button>
                </div>
            </div>
            <button on:click={()=> dispatch("close")} class="icon-close">
                <svg fill="currentColor" style="width: 24px; height: 24px;">
                    <use xlink:href="#uniframe-icon-cross"></use>
                </svg>
            </button>
            <!---->
        </div>
    </div>
</div>

<style>
.vfm--inset {
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
}
.vfm--fixed {
    position: fixed;
}
.vfm--prevent-none {
    pointer-events: none;
}
.vfm--overlay {
    z-index: -1;
    background-color: #00000080;
}
 .uniframe-root.vfm__content {
    background-color: #fff;
    box-shadow: 0 6px 16px #0000004d;
}
.uniframe-root.vfm__content {
    --border-radius: 8px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: var(--border-radius);
}
.ce727619 {
    position: relative;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    text-align: center;
    outline: 0;
    transition: background-color .2s, border-color .2s, color .2s;
    font-weight: 400;
    -webkit-user-select: none;
    user-select: none;
    vertical-align: middle;
    -webkit-appearance: none;
    padding: 4px 16px;
    font-size: 14px;
    border-radius: 4px;
    color: #fff;
    background-color: #131316;
    border: 1px solid #131316;
}
.vfm--absolute {
    position: absolute;
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
.beeac841 {
    background-image: url(https://wgc.polo-static.com/static/img/bg-light.df27017d.png);
}
.beeac841 {
    padding: 24px;
    width: 360px;
    padding-top: 148px;
    background-repeat: no-repeat;
    background-position: center 24px;
    background-size: 161px 116px;
}
.beeac841>h2 {
    color: #131316;
}
.beeac841>h2 {
    text-align: center;
    font-size: 15px;
    font-weight: 600;
    line-height: 26px;
}
.beeac841>dl {
    padding-top: 16px;
}
.beeac841>dl dt {
    position: relative;
    padding-left: 28px;
    font-size: 14px;
    line-height: 24px;
    margin-top: 12px;
}
.beeac841>dl dd {
    font-size: 14px;
    padding-left: 28px;
    line-height: 20px;
}
.beeac841>dl dt:first-child {
    margin-top: 0;
}
.beeac841>dl dt>svg {
    position: absolute;
    width: 20px;
    height: 20px;
    left: 0;
    top: 2px;
}
.beeac841>dl dd {
    color: #616161;
}
.beeac841 .c7144b1d {
    padding-top: 32px;
}
.ce727619[data-size=large] {
    height: 44px;
    padding-left: 24px;
    padding-right: 24px;
    font-size: 16px;
}
.beeac841 .c7144b1d button {
    width: 100%;
}
</style>
