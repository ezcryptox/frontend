<script>
	import { _ } from 'svelte-i18n';
import { slide } from "svelte/transition";
import { onMount } from "svelte";
import { screen } from "$lib/store/screen";
import { handleGiveAway } from "../public_api";
$: contestView = 1
$: contests = []

onMount(async()=>{
   let { response, error_message } =  await handleGiveAway()
   if(response){
        contests = response
   }
})


$:{
    contestView = $screen > 1200 ? 4 : $screen > 1022 ? 3 : $screen > 770 ? 2 : 1
} 

$: changeView = 0

const handleChangeView = ((event)=>{
    if(event === "prev"){
        changeView--
    }
    else if (event === "next"){
        changeView++
    }
   
})

</script>
<div class="_86eb487d">
    <div class="_238572a7 {$screen > 1200 ? "screen1" : $screen > 1022 ? "screen2" : $screen > 770 ? "screen3" : "screen4"}">
        <button disabled={!changeView} on:click={()=>handleChangeView("prev")} class="_590fc55f _0e85c167 {!changeView ? "_7c2fb6ee" : ""}"></button>
        <button disabled={changeView === contests.length - contestView} on:click={()=>handleChangeView("next")} class="_590fc55f _09c831ac {changeView === contests.length - contestView ? "_7c2fb6ee" : ""}"></button>
        {#each contests.slice(changeView, contestView + changeView) as contest}
            <a href="?poloniex.com/campaign/activitycenter?tradingcontestid={contest.id}"  class="_71522e36" style="background-image: url(&quot;{contest.image}&quot;);">/</a>   
        {/each}
    </div>
    <div class="_6fc74819 font-ss3">
        <a href="?support.poloniex.com/hc/en-us/articles/22637690081175-Bulk-Asset-Delistings-April-12-2024"  class="_303c9628">
            <div class="_1e05476f">{$_('bulk-asset-delistings-april-12-2024')}</div>
            <span class="ac20bdee"> 04-07 </span>
        </a>
        {#if $screen > 1022}
            <a href="?support.poloniex.com/hc/en-us/articles/22467997807383-Project-introduction-What-is-IXS"  class="_303c9628">
                <div class="_1e05476f">{$_('project-intro')}</div>
                <span class="ac20bdee"> 04-01 </span>
            </a>
        {/if}
        <a  href="?support.poloniex.com/hc/en-us/categories/360002700674" class="_41acdb78">{$_('learn-more-1')}</a>
    </div>
</div>
<style>
  ._238572a7.screen1 {
        width: 1136px;
        margin-bottom: 32px;
   }
   ._238572a7.screen2 {
        width: 980px;
        margin-bottom: 32px;
   }
   ._238572a7.screen3 {
        width: 648px; 
        margin-bottom: 32px;
   }
   ._238572a7.screen4 {
        width: 316px; 
        margin-bottom: 32px;
   }
</style>