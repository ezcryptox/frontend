<script>
	import { _ } from 'svelte-i18n';

</script>
<div class="_6Uhih">
    <div class="_1wZMa">
        <div class="_1SRXm">
            <a href="/profile?tab=security" class="">{$_('g-security')}</a>
            <svg viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" width="16" height="16">
                <path d="M11 2.5H13L5 13.5H3L11 2.5Z"></path>
            </svg>
        </div>
        <div class="_1SRXm">
            <span>{$_('two-factor-authentication-2fa')}</span><!---->
        </div>
    </div>
    <div></div>
</div>

<div class="f3uQo">
    <div class="SB4GP">
        <div class="_9646K">
            <svg fill="currentColor" style="width: 18px; height: 18px;">
                <use xlink:href="#web-core-icon-outline-warning"></use>
            </svg>
            <span>{$_('ga-auth-key')}</span>
        </div>
        <div class="_3Rbyl">
            <div class="_1Y5QL">{$_('enable-google-authenticator')}</div>
            <div class="mvUYw">
                <div class="_4h-U-">
                    <ul class="mgZl-">
                        <li class="stq8S">
                            <span class="_5NYxM">{$_('step-one-install')}<a href="/?#">{$_('g-google')}</a>{$_('on-your-smartphone')}</span>
                            <div class="_3qbY-">
                                <div class="tAorP">
                                    <div class="zFPj-">
                                        <span class="_5pjRH"></span>
                                        <span>{$_('g-download')}</span>
                                    </div>
                                    <div class="GJZBQ"><div>
                                        <canvas width="99" height="99" style="width: 88px; height: 88px;"></canvas>
                                        <div class="BIjxi">{$_('ios')}</div>
                                    </div>
                                    <div>
                                        <canvas width="99" height="99" style="width: 88px; height: 88px;"></canvas>
                                        <div class="BIjxi">{$_('android')}</div>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>{$_('step-two')}<b>{$_('ga-acc-setup')}</b>{$_('add-google-auth')}</li>
                        <li>{$_('complete-verification')}</li>
                    </ul>
                    <ul class="HCPmX">
                        <li>
                            <a target="_blank" href="https://support.poloniex.com/hc/en-us/articles/360039545534" rel="noopener noreferrer nofollow">{$_('what-is-2fa-and-why-do-i-need-it')}</a></li><li><a target="_blank" href="https://support.poloniex.com/hc/en-us/articles/360040016513" rel="noopener noreferrer nofollow">{$_('how-do-i-set-up-2fa')}</a>
                        </li>
                    </ul>
                </div>
                <div class="Om8Tj">
                    <div class="qr3Kp" loading="false">
                        <img src="https://nanogames.io/api/game/support/qrcode/320/?text=0x351455346d88ee6FE927c79f23395143662EC88e" alt="">
                    </div>
                    <p class="BqRxK">{$_('scan-qr')}</p>
                    <div class="n-YFk">
                        <div class="yY-Ye">{$_('enter-this-code-manually-into-the-app')}</div>
                        <div class="UCvwK _6zRWA">
                            <div class="e78Rk">ENMKTOYBSBBEPSJN</div>
                            <div class="ZCOPD">{$_('g-copy')}</div>
                        </div>
                        <button data-size="large" type="button" class="jRLsY SOUdU LqP40">
                            <span><!---->{$_('global-open')}<!----></span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<style>

</style>