<script>
import { screen } from "$lib/store/screen"
import CurTags from "./tags/curTags.svelte";
import { currencyOptions } from "../../lib/p2p/tags/hook"
import { onMount } from "svelte";
import { seaser } from "$lib/store/routes";
import { goto } from "$app/navigation";
import NTags from "./tags/NTags.svelte";
import SearchTags from "./tags/searchTags.svelte";
    import RefreshTags from "./tags/refreshTags.svelte";
    import BuyTable from "./buyTable.svelte";

$: tab = 0
$: activeCurrency = ''
let ads = "All Advertisers"

const handleAds = ((event)=>{
   ads = event
   tab = 0
})

onMount(()=>{
    currencyOptions.forEach(element => {
        if(element?.code.toLocaleLowerCase() === $seaser[2]){
            activeCurrency = element
        }
    });
})

function handleCurrencySelect(currency) {
    activeCurrency =  currency.detail
    goto(`/p2p/markets?tab=${$seaser[0]}&cur=${$seaser[1]}&local=${activeCurrency.code?.toLocaleLowerCase()}`)
    tab = 0
}



</script>

<section class="_FilterNav_1wcwv_9">
    <div class="_inner_1wcwv_23">
       <div>
          <div class="el-input el-input--default el-input--suffix _coinInput_1wcwv_40">
          <!-- input --><!-- prepend slot --><!--v-if-->
           <div class="el-input__wrapper">
             <!-- prefix slot --><!--v-if-->
              <input class="el-input__inner" modelmodifiers="[object Object]" type="text" autocomplete="off" tabindex="0" placeholder="Enter amount" id="el-id-7084-6">
              <!-- suffix slot -->
               <span class="el-input__suffix">
                <span class="el-input__suffix-inner">
                   <button on:click={()=>  tab === 0 ? tab = 1 : tab = 0 } class="el-dropdown">
                      <span class="_activeCoin_1wcwv_44 _trigon_1wcwv_15 el-tooltip__trigger el-tooltip__trigger" id="el-id-7084-0" role="button" tabindex="0" aria-controls="el-id-7084-1" aria-expanded="false" aria-haspopup="menu">
                         <img src={activeCurrency.image} alt="">
                         <span class="_name_1wcwv_64">{activeCurrency.code}</span>
                         <svg data-v-c936a896="" width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" class="svg-icon">
                            <path d="M12.0738 4.8438H3.92625C3.07156 4.8438 2.61077 5.84659 3.16745 6.49512L7.24121 11.241C7.64026 11.7059 8.35975 11.7059 8.7588 11.241L12.8326 6.49512C13.3892 5.84659 12.9284 4.8438 12.0738 4.8438Z"></path>
                         </svg>
                      </span>
                      <!--v-if-->
                   </button>
                   <!--v-if--><!--v-if--><!--v-if--><!--v-if--><!--v-if-->
                </span>
             </span>
          </div>
          {#if tab === 1}
            <CurTags activeCurrency={activeCurrency} on:close={handleCurrencySelect} />
          {/if}
          <!-- append slot --><!--v-if-->
          </div>
       </div>
       {#if $screen > 380}
        <div class="_payWraper_1wcwv_28">
            <div class="el-dropdown">
                <div class="el-input el-input--default el-input--suffix _trigon_1wcwv_15 el-tooltip__trigger el-tooltip__trigger" aria-controls="el-id-7084-3" aria-haspopup="menu" aria-expanded="false">
                    <!-- input --><!-- prepend slot --><!--v-if-->
                    <button on:click={()=>  tab === 0 ? tab = 2 : tab = 0 } class="el-input__wrapper">
                    <!-- prefix slot --><!--v-if-->
                        <input class="el-input__inner" role="button" aria-controls="el-id-7084-3" aria-expanded="false" aria-haspopup="menu" type="text" readonly="" autocomplete="off" tabindex="0" placeholder="Select a maximum of 3 methods" id="el-id-7084-2">
                        <!-- suffix slot -->
                        <span class="el-input__suffix">
                        <span class="el-input__suffix-inner">
                            <i class="el-icon el-input__icon">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12.0738 4.8438H3.92625C3.07156 4.8438 2.61077 5.84659 3.16745 6.49512L7.24121 11.241C7.64026 11.7059 8.35975 11.7059 8.7588 11.241L12.8326 6.49512C13.3892 5.84659 12.9284 4.8438 12.0738 4.8438Z"></path>
                                </svg>
                            </i>
                            
                            <!--v-if--><!--v-if--><!--v-if--><!--v-if-->
                        </span>
                        
                    </span>
            </button>
          
            <!-- append slot --><!--v-if-->
        </div>
         <!--v-if-->
           
         </div>
         {#if tab === 2}
            <SearchTags />
         {/if}
        </div>
        {/if}
        {#if $screen > 520}
            <div class="_item_1wcwv_182">
                <div class="el-select el-select--default">
                    <div class="select-trigger el-tooltip__trigger el-tooltip__trigger">
                    <!--v-if--><!-- fix: https://github.com/element-plus/element-plus/issues/11415 --><!--v-if-->
                    <div class="el-input el-input--default el-input--suffix">
                        <!-- input --><!-- prepend slot --><!--v-if-->
                        <button on:click={()=>  tab === 0 ? tab = 3 : tab = 0 } class="el-input__wrapper">
                            <!-- prefix slot --><!--v-if-->
                            <input class="el-input__inner" type="text" bind:value={ads} readonly="" autocomplete="off" tabindex="0" placeholder="All Advertisers" id="el-id-7084-8">
                            <!-- suffix slot -->
                            <span class="el-input__suffix">
                                <span class="el-input__suffix-inner">
                                <i class="el-icon el-select__caret el-select__icon">
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12.0738 4.8438H3.92625C3.07156 4.8438 2.61077 5.84659 3.16745 6.49512L7.24121 11.241C7.64026 11.7059 8.35975 11.7059 8.7588 11.241L12.8326 6.49512C13.3892 5.84659 12.9284 4.8438 12.0738 4.8438Z"></path>
                                    </svg>
                                </i>                                
                                <!--v-if--><!--v-if--><!--v-if--><!--v-if--><!--v-if--><!--v-if-->
                                </span>
                            </span>
                        </button>                
                        <!-- append slot --><!--v-if-->
                        </div>
                    </div>
                </div>
                {#if tab === 3}
                  <NTags selectedOption={ads} on:close={(e)=> handleAds(e.detail)}/>
                {/if}
            </div>
        {/if}
        {#if $screen > 760}
        <div class="_item_1wcwv_182">
            <div class="el-select el-select--default">
               <div class="select-trigger el-tooltip__trigger el-tooltip__trigger">
                  <!--v-if--><!-- fix: https://github.com/element-plus/element-plus/issues/11415 --><!--v-if-->
                  <div class="el-input el-input--default el-input--prefix el-input--suffix -focus">
                     <!-- input --><!-- prepend slot --><!--v-if-->
                      <button on:click={()=>  tab === 0 ? tab = 4 : tab = 0 }  class="el-input__wrapper is-focus" >
                        <!-- prefix slot -->
                         <span class="el-input__prefix">
                           <span class="el-input__prefix-inner">
                              <div style="height: 100%; display: flex; justify-content: center; align-items: center;">
                                 <svg data-v-c936a896="" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" class="svg-icon">
                                    <g clip-path="url(#clip0_216_59173)">
                                       <path d="M13.9023 14.6755C12.5413 15.8547 10.8003 16.5028 8.99951 16.5002C4.85726 16.5002 1.49951 13.1425 1.49951 9.00024C1.49951 4.85799 4.85726 1.50024 8.99951 1.50024C13.1418 1.50024 16.4995 4.85799 16.4995 9.00024C16.4995 10.6022 15.997 12.0872 15.142 13.3052L12.7495 9.00024H14.9995C14.9994 7.6174 14.5216 6.27704 13.647 5.20591C12.7724 4.13478 11.5547 3.39864 10.1998 3.12201C8.84487 2.84539 7.43601 3.04526 6.21152 3.68782C4.98703 4.33038 4.02208 5.37618 3.4799 6.6483C2.93773 7.92043 2.85162 9.34079 3.23613 10.6691C3.62064 11.9974 4.45218 13.1521 5.59007 13.9379C6.72796 14.7237 8.10235 15.0923 9.48074 14.9814C10.8591 14.8705 12.1569 14.2869 13.1545 13.3292L13.9023 14.6755Z"></path>
                                    </g>
                                    <defs>
                                       <clipPath id="clip0_216_59173">
                                          <rect width="18" height="18" fill="white"></rect>
                                       </clipPath>
                                    </defs>
                                 </svg>
                              </div>
                              <!--v-if-->
                           </span>
                        </span>
                        <input class="el-input__inner" type="text" readonly="" autocomplete="off" tabindex="0" placeholder="Auto Refresh" id="el-id-7084-9">
                        <!-- suffix slot -->
                         <span class="el-input__suffix">
                           <span class="el-input__suffix-inner">
                              <i class="el-icon el-select__caret el-select__icon">
                                 <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12.0738 4.8438H3.92625C3.07156 4.8438 2.61077 5.84659 3.16745 6.49512L7.24121 11.241C7.64026 11.7059 8.35975 11.7059 8.7588 11.241L12.8326 6.49512C13.3892 5.84659 12.9284 4.8438 12.0738 4.8438Z"></path>
                                 </svg>
                              </i>
                              <!--v-if--><!--v-if--><!--v-if--><!--v-if--><!--v-if--><!--v-if-->
                           </span>
                        </span>
                     </button>

                     <!-- append slot --><!--v-if-->
                  </div>
                  </div>
               </div>
         {#if tab === 4}
         <RefreshTags />
         {/if}
    </div>
        {/if}
        
    </div>
          <!---->
 </section>

 <BuyTable />

<style>
   
</style>