<script>
import ChangePasswordModal from "./changePasswordModal.svelte";
$: isWarning = true
  
</script>

{#if isWarning}
    <ChangePasswordModal on:close={()=> isWarning = false} />
{/if}

<div class="_6Uhih">
    <div class="_1wZMa">
        <div class="_1SRXm">
            <a href="/profile/security" class="">Security</a>
            <svg viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" width="16" height="16">
                <path d="M11 2.5H13L5 13.5H3L11 2.5Z"></path>
            </svg>
        </div>
        <div class="_1SRXm">
            <span>Advanced Security Settings</span>
        <!---->
        </div>
    </div>
    <div></div>
</div>

<style>
   
</style>