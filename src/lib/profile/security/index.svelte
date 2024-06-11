<script>
    import {handleAuthToken} from "$lib/store/routes";
    import { onMount } from "svelte";
    import { handleProfileSecurity } from "$lib/index"
    import Loader from '$lib/loader.svelte';
    import EmailModel from "./emailModel.svelte";
    import Passkeymodal from "./passkeymodal.svelte";
    $: isLoading = true
    $: data = null
    $: errorEl = null
    $: showEmailModel = false
    $: showPasskeyModel = false
    
    onMount(async()=>{
      const { is_loading, error, response } = await handleProfileSecurity($handleAuthToken)
      if(response){
        data = response
        isLoading = is_loading
      }
      if(error){
        errorEl = error
        isLoading = is_loading
      }
    })

</script>

    {#if showEmailModel}
        <EmailModel on:close={()=> showEmailModel = false}/>
    {/if}

    {#if showPasskeyModel}
        <Passkeymodal on:close={()=> showPasskeyModel = false}/>
    {/if}
 
    
    {#if data}
    <div class="_3yZtL ZZKGD" style="--12829c0b: 0 64px;">
        <div class="pvuZv">
            <h2>Two-Factor Authentication (2FA)</h2>
            <div class="N1KMQ">
                <div class="_2lg0i">
                    <div class="w94ff">
                        <div class="BynR- _5cbXB"></div>
                        <div>
                            <h3>Passkeys <span class="M42GW">Hot</span></h3>
                            <h4>Faster login and enhanced account security</h4>
                        </div>
                    </div>
                    <div class="cMzxQ">
                        <div class="jFNWE">
                            <svg fill="currentColor" class="euYsy {data.passkey ? "O-m3o" : ""} " style="width: 14px; height: 14px;">
                                <use xlink:href="#web-core-icon-fill-pass"></use>
                            </svg>
                            <span class="cpapx">Not linked</span>
                        </div>
                        <div class="_9Tue6">
                            <button on:click={()=> showPasskeyModel = true} data-size="small" type="button" class="jRLsY wzmE4">
                                <span><!---->Add<!---->
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="_2lg0i">
                    <div class="w94ff">
                        <div class="BynR- IDa6w"></div>
                        <div>
                            <h3>Google Authenticator <!---->
                            </h3>
                            <h4>Protect your account and transactions</h4>
                        </div>
                    </div>
                    <div class="cMzxQ">
                        <div class="jFNWE">
                            <svg fill="currentColor" class="euYsy {data.fa_auth ? "O-m3o" : ""} " style="width: 14px; height: 14px;">
                                <use xlink:href="#web-core-icon-fill-pass"></use>
                            </svg>
                            <span class="cpapx">Not linked</span>
                             <!---->
                            </div>
                            <div class="_9Tue6">
                                <a href="/profile?tab=security&&model=2fa" data-size="small" class="jRLsY wzmE4">
                                    <span> <!---->Enable<!----></span>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="_2lg0i">
                        <div class="w94ff">
                            <div class="BynR- ZRWIU"></div>
                            <div>
                                <h3>Email <!----></h3>
                                <h4>Protect your account and transactions</h4>
                            </div>
                        </div>
                        <div class="cMzxQ">
                            <div class="jFNWE">
                                <svg fill="currentColor" class="euYsy {data.email ? "O-m3o" : ""} " style="width: 14px; height: 14px;">
                                    <use xlink:href="#web-core-icon-fill-pass"> </use>
                                </svg>
                                <span class="cpapx"> {data.email ? "Linked" : "Not linked"}</span>
                            </div>
                            <div class="_9Tue6">
                                <button on:click={()=> showEmailModel = true} data-size="small" type="button" class="jRLsY nFueq">
                                    <span>
                                        <!---->Manage<!---->
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="_2lg0i">
                        <div class="w94ff">
                            <div class="BynR- xbP0k"></div>
                            <div>
                                <h3>Phone <!---->
                                </h3>
                                <h4>Protect your account and transactions</h4>
                            </div>
                        </div>
                        <div class="cMzxQ">
                            <div class="jFNWE">
                                <svg fill="currentColor" class="euYsy {data.phone ? "O-m3o" : ""} " style="width: 14px; height: 14px;">
                                    <use xlink:href="#web-core-icon-fill-pass"></use>
                                </svg>
                                <span class="cpapx">Not linked</span>
                            </div>
                            <div class="_9Tue6">
                                <!---->
                                <a href="/profile?tab=security&&model=phone" data-size="small" class="jRLsY wzmE4">
                                    <span>
                                        <!---->Enable<!---->
                                    </span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    </div>
    
    
    <div class="_3yZtL on9Xm" style="--12829c0b: 0 64px;">
        <div class="pvuZv">
            <h2>Advanced Security Settings</h2>
            <div class="N1KMQ">
                <div class="MrcpO">
                    <div class="w94ff">
                        <div class="BynR- xTHGO"></div>
                        <div>
                            <h3>Login Password <!---->
                            </h3>
                            <h4>You will be logged out automatically after changing your password.</h4>
                        </div>
                    </div>
                    <div class="D8FJb">
                        <a href="/profile?tab=security&&model=change-password" data-size="small" class="jRLsY nFueq">
                            <span>
                                <!---->Change<!---->
                            </span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    
    <div class="_3yZtL UGkZw" style="--12829c0b: 0 64px;">
        <div class="pvuZv">
            <h2>Devices and Activities</h2>
            <div class="N1KMQ">
                <div class="UTBi-">
                    <div class="w94ff">
                        <div class="BynR- _7iFBo">
    
                        </div>
                        <div>
                            <h3>Device Management <!---->
                            </h3>
                            <h4>Manage allowed device list</h4>
                        </div>
                    </div>
                    <div class="Yq6kf">
                        <a href="/profile/security/device-management" data-size="small" class="jRLsY nFueq">
                            <span>
                                <!---->More<!---->
                            </span>
                        </a>
                    </div>
                </div>
                <div class="UTBi-">
                    <div class="w94ff">
                        <div class="BynR- _227Ej">
    
                        </div>
                        <div>
                            <h3>Account Activity <!---->
                            </h3>
                            <h4>
    
                            </h4>
                        </div>
                    </div>
                    <div class="Yq6kf">
                        <a href="/profile/security/login-history" data-size="small" class="jRLsY nFueq">
                            <span>
                                <!---->More<!---->
                            </span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    {:else if errorEl}
        <div style="height: 60vh; display: flex; justify-content: center; align-items: center;">
            <h2> Something went wrong</h2>
        </div>
    {:else if isLoading}
    <div style="height: 60vh;">
        <Loader />
    </div>
    {/if}