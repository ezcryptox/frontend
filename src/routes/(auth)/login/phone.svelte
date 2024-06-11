<script>
import { createEventDispatcher } from "svelte";
import { onMount } from "svelte";
const dispatch = createEventDispatcher()
export let countries;
$: newCountryList = []

onMount(()=>{
    newCountryList = [...countries]
})

const handleCountryFiltring = ((value)=>{
    newCountryList = countries.filter(i => i.Name.toLowerCase().includes(value.toLowerCase()));
})

</script>

<div id="modals-container">
    <div class="vm--container">
        <div data-modal="dynamic_modal_4" aria-expanded="true" class="vm--overlay">
            <div class="vm--top-right-slot"></div>
        </div> 
        <div role="dialog" aria-modal="true" class="vm--modal" style="top: 254px; left: 276px; width: 360px; height: 434px;">
            <div class="ba07351b">
                <div class="_2eb77cb4">
                    <p class="_9b8db05d">Please select area code</p>
                    <button on:click={()=> dispatch("close")} class="_65ad97c4"></button>
                </div>
                <div class="_9c5bacd2 a0d68ba2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none" class="b2223728">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M13.7803 12.7197L9.0261 7.96544C9.63821 7.13578 10 6.11014 10 5C10 2.23858 7.76142 0 5 0C2.23858 0 0 2.23858 0 5C0 7.76142 2.23858 10 5 10C6.11014 10 7.13578 9.63821 7.96544 9.0261L12.7197 13.7803C13.0126 14.0732 13.4874 14.0732 13.7803 13.7803C14.0732 13.4874 14.0732 13.0126 13.7803 12.7197ZM8.5 5C8.5 6.933 6.933 8.5 5 8.5C3.067 8.5 1.5 6.933 1.5 5C1.5 3.067 3.067 1.5 5 1.5C6.933 1.5 8.5 3.067 8.5 5Z" fill="#AFAFB0"></path>
                    </svg>
                    <input type="text" placeholder="Search" on:keyup={(e)=> handleCountryFiltring(e.target.value)} class="_2d963734">
                    <!---->
                </div>
                <div class="bbdee8c5">
                    {#each newCountryList as country}
                        <button on:click={()=> dispatch("country", country)} class="c32537fd">
                            <div class="_0fcda234">
                                <span class="_41d66b9c">
                                    <span alt="" style="display: inline-block;border-radius: 100%;width: 24px;height: 24px;background-size: 24px 24px;background-position: center center;background-repeat: no-repeat;
                                    /* background-image: url(&quot;https://static.poloniex.com/country/flag/AX.png&quot;); */">
                                </span>
                                </span>
                                <span class="_60c1b28c"> {country?.Name} </span></div>
                                <div>{country?.MobileCode}</div>
                        </button>
                    {/each}
                    <div class="a432cd41" style="display: none;">
                        <span class="_107b55a2"></span>
                        <p class="_2a96bcb4">No results found</p>
                    </div>
                </div>
            </div>
                <div>
                    <div class="vue-modal-top"></div>
                    <div class="vue-modal-bottom"></div>
                    <div class="vue-modal-left"></div>
                    <div class="vue-modal-right"></div>
                    <div class="vue-modal-topRight"></div>
                    <div class="vue-modal-topLeft"></div>
                    <div id="vue-modal-triangle" class="vue-modal-bottomRight"></div>
                    <div class="vue-modal-bottomLeft"></div>
                </div>
            </div>
        </div>
    </div>