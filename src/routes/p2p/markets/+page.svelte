<script>
   import Controllers from "$lib/p2p/controllers.svelte";
   import "../../../styles/p2p.css"
   import { seaser } from "$lib/store/routes";
   import { goto } from "$app/navigation";

   $: currencyTab = $seaser[1] === "btc" ? 2 : 1
   $: marketTab = $seaser[0] === "sell" ? 2 : 1

   const handleMarketTab = ((tab)=>{
      marketTab = tab
      goto(`/p2p/markets?tab=${marketTab === 1 ? "buy" : "sell"}&cur=${currencyTab === 2 ? "btc" : "usdt"}&local=usd`)
   })

   const handleCurrentTab = ((tab)=>{
      currencyTab = tab
      goto(`/p2p/markets?tab=${marketTab === 1 ? "buy" : "sell"}&cur=${currencyTab === 2 ? "btc" : "usdt"}&local=usd`)
   })
   
</script>

<main id="app" class="app-container">
   <div class="_layout_cw6mx_9">
      <div class="_header_piyeq_16">
         <div class="_inner_piyeq_21">
               <div class="_navBox_piyeq_26">
                  <a href="/p2p/markets" class="_active_piyeq_44">P2P Trading</a>
               </div>
               <div class="_actionGroup_piyeq_55">
            </div>
         </div>
      </div>
      <div class="_inner_cw6mx_14">
         <section class="_SideNav_1iwpl_9">
            <div class="_sideBox_1iwpl_28">
               <button on:click={()=> handleMarketTab(1)} class="{marketTab === 1 ? "_active_1iwpl_71" : ""} _up_1iwpl_75">Buy</button>
               <button on:click={()=> handleMarketTab(2)} class=" {marketTab === 2 ? "_active_1iwpl_71" : ""} _down_1iwpl_83">Sell</button>
            </div>
            <em></em>
            <div class="_coinBox_1iwpl_91">
               <button on:click={()=> handleCurrentTab(1)} class=" {currencyTab === 1 ? "_active_1iwpl_71" : ""} ">USDT</button>
               <button on:click={()=> handleCurrentTab(2)} class=" {currencyTab === 2 ? "_active_1iwpl_71" : ""} ">BTC</button>
            </div>
         </section>
         <Controllers />
      </div>
   </div>
</main>

   