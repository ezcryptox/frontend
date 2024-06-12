<script>
import "../../../../styles/login.css"
import Rule from "./rule.svelte";
import { otp } from "$lib/store/otp"
import {handleAuthToken} from "$lib/store/routes";
import { handleSignUpEmailAuth, handleCreateUser } from "$lib/auth/index";
import { browser } from '$app/environment'
import { goto } from "$app/navigation";

$: isRule = false
$: canResend = 30

const resent = setInterval(()=>{
    canResend =  parseInt(canResend - 0.1)
    if(canResend < 1){
        clearInterval(resent)
    }
},1000)

let otpCode = ""
$: error = null
$: isloading = false
$: loading = false


const handleResent = (async(event)=> {
    canResend = 60
    const resent = setInterval(()=>{
        canResend =  parseInt(canResend - 0.1)
        if(canResend < 1){
            clearInterval(resent)
        }
    },1000)
    isloading = true
    const respose = await handleSignUpEmailAuth($otp.resent)
    if(respose.error){
        error = respose.error
        setTimeout(()=>{
            error = null
        }, 5000)
    }
    isloading = respose.loading
    if(respose.response){
        browser && sessionStorage.setItem('token', JSON.stringify(respose.response));
        otp.set(respose.response)
        goto("/signup/verify")
    }
})

$: trackActivator = loading || !otpCode

const handleSubmit = (async()=>{
    loading = true
    const response = await handleCreateUser({user:$otp, code:otpCode, time: new Date() })
    error = response.error
    loading = response.loading
    if(error){
        setTimeout(()=>{
            error = null
        }, 5000)
    }
    if(response?.response){
        browser && sessionStorage.setItem('user', JSON.stringify(response?.response));
        browser && sessionStorage.removeItem("token");
        handleAuthToken.set(response?.response.Token)
        goto("/")
    }
})


</script>

{#if isRule}
    <Rule on:close={()=> isRule = false}/>
{/if}

<div class="wc-signup">
    <div class="_848abb12 bf2bd91d">
        <p class="_54043c3a">Verification Code</p>
        <div data-v-39752d79="" class="order-form">
            <div data-key="emailCode" class="form-item" data-v-39752d79="">
                <!---->
                <div class="form-item-content">
                    <p class="_81c39b32">Enter the 6-digit code sent to <strong>{$otp?.email}</strong></p>
                    <div class="_041e59c9">
                        <span>
                            <input type="text" bind:value={otpCode} maxlength="6" placeholder="Verification Code" name="email-one-time-code" class="cb1dd55f">
                            <button disabled={canResend} on:click={()=> handleResent()} class="a30257f6 _1f498e28"> Resend{canResend ? `(${canResend})` : ""} </button>
                        </span>
                    </div>
                    <div class="msg-box" style="">
                        <!----> 
                        {error ? error : ""}
                    </div>
                </div>
            </div>
            <button disabled={trackActivator} on:click={handleSubmit} type="button" class="polo-btn polo-btn-button polo-btn-primary polo-btn-medium _0ccbd664" data-v-39752d79="">
                <!---->
                <div class="btn-sp"> {loading ? "Loading..." : "Activate Account"} </div>
            </button>
        </div>
        <p class="_5100ec47"> 
            Didn’t receive email code?
            <button on:click={()=> isRule = true} class="cfcce75a"> Learn More </button>
        </p>
    </div>
</div>

<style>
   
</style>