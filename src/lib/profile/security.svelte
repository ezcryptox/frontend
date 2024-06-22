<script>
    import {  seaser} from "$lib/store/routes";
    import Fa from "./security/_2fa.svelte";
    import ChangePassword from "./security/change-password.svelte";
    import Index from "./security/index.svelte";
    import Phone from "./security/phone.svelte";

</script>


{#if !$seaser[1]}
    <Index />
{/if}

{#if $seaser[1] === "2fa"}
    <Fa />
{/if}

{#if $seaser[1] === "phone"}
    <Phone />
{/if}

{#if $seaser[1] === "change-password"}
    <ChangePassword />
{/if}

<style>
   
</style>