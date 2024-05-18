<script>
import { slide } from "svelte/transition";
import { screen } from "$lib/store/screen"
$: contestView = 1

const contests = [
    {id:1, image: "https://www.datocms-assets.com/51952/1715938280-en.png"}, 
    {id:2, image: "https://www.datocms-assets.com/51952/1715931491-en.png"}, 
    {id:3, image: "https://www.datocms-assets.com/51952/1715758694-en.png"}, 
    {id:4, image: "https://www.datocms-assets.com/51952/1715930453-en.png"}, 
    {id:5, image: "https://www.datocms-assets.com/51952/1715676856-en.png"}, 
    {id:6, image: "https://www.datocms-assets.com/51952/1715667730-en.png"}, 
    {id:7, image: "https://www.datocms-assets.com/51952/1715247214-en.png"}, 
    {id:8, image: "https://www.datocms-assets.com/51952/1715224739-en.png"}, 
    {id:9, image: "https://www.datocms-assets.com/51952/1705285512-650x325_en.png"}, 
    {id:10, image: "https://www.datocms-assets.com/51952/1705399108-en.png"}, 
]

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
            <a href="https://poloniex.com/campaign/activitycenter?tradingcontestid={contest.id}" target="_blank" class="_71522e36" style="background-image: url(&quot;{contest.image}&quot;);">'</a>   
        {/each}
    </div>
    <div class="_6fc74819 font-ss3">
        <a href="https://support.poloniex.com/hc/en-us/articles/22637690081175-Bulk-Asset-Delistings-April-12-2024" target="_blank" class="_303c9628">
            <div class="_1e05476f"> Bulk Asset Delistings April 12, 2024 </div>
            <span class="ac20bdee"> 04-07 </span></a>
        <a href="https://support.poloniex.com/hc/en-us/articles/22467997807383-Project-introduction-What-is-IXS" target="_blank" class="_303c9628">
            <div class="_1e05476f"> Project introduction - What is IXS？ </div>
            <span class="ac20bdee"> 04-01 </span>
        </a>
        <a target="_blank" href="https://support.poloniex.com/hc/en-us/categories/360002700674" class="_41acdb78"> Learn More &gt; </a>
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