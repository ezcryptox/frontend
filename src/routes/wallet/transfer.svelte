
<script>
import "../../styles/withdraw.css";


</script>

<div id="uniframe-dialog" data-v-app="">
    <div class="vfm vfm--fixed vfm--inset" role="dialog" aria-modal="true" style="z-index: 1000101;">
        <div class="vfm__overlay vfm--overlay vfm--absolute vfm--inset vfm--prevent-none uniframe-root" aria-hidden="true"></div>
        <div class="vfm__content vfm--outline-none uniframe-root" >
            <div class="e2b79a2c" component="[object Object]">
                <div class="b14bb9d6">Transfer From</div>
                <div class="f3564e86">
                    <div class="caf7723c">account</div>
                    <div class="c6df21d0" >
                        <div class="e1d7e7fd">
                            <p>from</p>
                            <p>to</p>
                        </div>
                        <div class="d67d38d2">
                            <div class="a6461327 a27dd43c">
                                <div class="a3ce13c7" aira-show-dropdown="false">
                                    <div class="e2f26988">
                                        <span>Spot Account</span>
                                        <svg fill="currentColor" style="width: 16px; height: 16px;">
                                            <use xlink:href="#uniframe-icon-arrow-down">

                                            </use>
                                        </svg>
                                    </div><!---->
                                </div>
                            
                        </div>
                        <div class="d000f313 a27dd43c">
                            <div class="a3ce13c7" aira-show-dropdown="false">
                                <div class="e2f26988">
                                    <span>

                                    </span>
                                    <svg fill="currentColor" style="width: 16px; height: 16px;">
                                        <use xlink:href="#uniframe-icon-arrow-down">

                                        </use>
                                    </svg>
                                </div>
                                <!---->
                            </div>
                        </div>
                    </div>
                    <span class="fc0a29a6">
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16 30C23.732 30 30 23.732 30 16C30 8.26801 23.732 2 16 2C8.26801 2 2 8.26801 2 16C2 23.732 8.26801 30 16 30Z" fill="#1A8F5C">

                            </path><path d="M13.6364 9V22.1818L10 19" stroke="currentColor" stroke-width="2">

                            </path>
                            <path d="M18.7275 24.0002V10.8184L22.3638 14.0002" stroke="currentColor" stroke-width="2">

                            </path>
                        </svg>
                    </span>
                </div>
            </div>
            <div class="f3564e86">
                <div class="caf7723c">Coin</div>
                <div class="cec7c1d6">
                    <img src="https://www.datocms-assets.com/51952/1638913308-usdt.png" alt="USDT" class="bebfaae0">
                    <span class="d082e966">USDT</span>
                    <span class="ba8047dc">Tether USD</span>
                </div>
            </div>
            <div class="f3564e86">
                <div class="caf7723c">
                    <span>amount</span>
                    <div class="dd571ab6">
                        <!---->
                        <span polo-tooltip="The amount of the chosen currency that can be withdrawn or transferred out without borrowing, excluding the assets in use. The transferrable amount may be lower than the available balance as transfers-out from an account with borrowed assets will increase the risk of liquidation" position="top" dashed="true" class="b3754d91">Avaliable</span>
                        <strong>0.00 USDT</strong>
                    </div>
                </div>
                <div class="c3e99745" style="height: 52px;">
                    <!----><input autocomplete="off" type="text" data-negative="true" data-code="false" maxlength="20" data-min="" data-max="" class="c3ca013b" id="wgc-input-number-4" data-fixed="8" placeholder="Enter the transfer amount">
                    <span class="e8e7fa1a">USDT</span>
                    <span class="fe0758c4">Max</span>
                    <!---->
                </div>
                <!---->
            </div>
            <div class="f3564e86 bf3f6913">
                <!----><!---->
            </div>
            <div class="b9bbd4c1">
                <button data-size="large" type="button" disabled="" class="ce727619 f53365fb e101316b">
                    <span>Confirm</span>
                </button>
            </div>
        </div>
        <button on:click={()=> history.back()} class="icon-close">
            <svg fill="currentColor" style="width: 24px; height: 24px;">
                <use xlink:href="#uniframe-icon-cross"></use>
            </svg>
        </button>
        <!---->
    </div>
    </div>
</div>

<style>
   
</style>