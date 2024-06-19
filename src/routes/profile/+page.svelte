<script>
  import ProfileInfo from "$lib/profile/profile-info.svelte";
  import { seaser } from "$lib/store/routes";
  import "../../styles/profile.css";
  import { goto } from "$app/navigation";
  import Security from "$lib/profile/security.svelte";
</script>

<div id="root" data-v-app="">
  <div id="subnav-1" data-v-app="" style="height: 104px;">
    <div class="efb13d49">
      <button
        on:click={() => goto("/profile/?tab=profile")}
        class={$seaser[0] === "profile" ? "active" : ""}>Profile</button
      >
      <button
        on:click={() => goto("/profile/?tab=security")}
        class={$seaser[0] === "security" ? "active" : ""}>Security</button
      >
    </div>
  </div>
  {#if $seaser[0] === "profile"}
    <ProfileInfo />
  {/if}
  {#if $seaser[0] === "security"}
    <Security />
  {/if}
  <!---->
</div>

<style>
</style>
