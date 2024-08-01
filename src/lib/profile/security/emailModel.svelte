<script>
	import { _ } from 'svelte-i18n';
import { createEventDispatcher } from "svelte";
const dispatch = createEventDispatcher()
</script>
<div id="uniframe-dialog" data-v-app="">
    <div class="vfm vfm--fixed vfm--inset" role="dialog" aria-modal="true" style="z-index: 1000101;">
        <div class="vfm__overlay vfm--overlay vfm--absolute vfm--inset vfm--prevent-none uniframe-root" aria-hidden="true"></div>
        <div class="vfm__content vfm--outline-none uniframe-root" >
            <div class="b26b640a f7829a1e d18f1a18">
                <div class="a777dc19">
                    <h3>{$_('enable-verification')}</h3>
                </div>
                <!----><!---->
                <div class="ef7d8eba">
                    <!---->
                    <button on:click={()=> dispatch("close")} data-size="large" type="button" class="ce727619 cb6de6db">
                        <span>{$_('i-understand')}</span>
                    </button>
                </div>
                <svg fill="currentColor" class="d43c3839">
                    <use xlink:href="#uniframe-icon-help"></use>
                </svg>
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
.b26b640a.f7829a1e {
    padding-top: 96px;
}
.b26b640a {
    position: relative;
    padding: 24px;
    padding-top: 30px;
    width: 420px;
}
.b26b640a .a777dc19 {
    text-align: center;
    line-height: 26px;
    font-size: 15px;
    font-weight: 600;
}
.b26b640a .ef7d8eba {
    display: flex;
    justify-content: space-between;
    padding-top: 24px;
}
.b26b640a .ef7d8eba>button {
    display: flex;
    width: 100%;
}
.ce727619[data-size=large] {
    height: 44px;
    padding-left: 24px;
    padding-right: 24px;
    font-size: 16px;
}
.b26b640a.d18f1a18 .d43c3839 {
    color: #e59940;
}
.b26b640a .d43c3839 {
    position: absolute;
    left: 50%;
    top: 32px;
    width: 40px;
    height: 40px;
    transform: translateX(-50%);
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

</style>