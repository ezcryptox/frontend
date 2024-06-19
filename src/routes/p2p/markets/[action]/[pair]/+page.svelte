<script>
  import Footer from "$lib/footer.svelte";
  import Filter from "../../../../../lib/p2p/filter.svelte";
  import BuyTable from "../../../../../lib/p2p/buyTable.svelte";
  import "../../../../../styles/p2p.css";

  import { screen } from "$lib/store/screen";
  import { onMount } from "svelte";
  import { handleExchanegerate } from "$lib/home-page/hook";
  import BuyTab from "../../../../../lib/p2p/tabs/buyTab.svelte";
  import { page } from "$app/stores";
  import SellTab from "../../../../../lib/p2p/tabs/sellTab.svelte";
  import SellTable from "../../../../../lib/p2p/sellTable.svelte";
  import Orders from "../../../../../lib/p2p/orders.svelte";
  import Setup from "../../../../../lib/p2p/modals/setup.svelte";
  import OrdersSettings from "../../../../../lib/p2p/OrdersSettings.svelte";

  $: tab = 1;
  let respons = [];
  $: loading = false;

  $: selectedTab = action === "buy" ? "buy" : "buy";
  $: selectedCoin = "btc-usdt";
  $: fromCurr = "usdt";
  $: toCurr = "btc";
  $: setUpModalIsOPen = false;

  let action;

  onMount(async () => {
    const unsubscribe = page.subscribe(($page) => {
      const { action, pair } = $page.params;

      let fromTo = pair.toLowerCase().split("-");

      if (action !== "buy" && action !== "sell") {
        window.location.href = "/";
      }
      selectedTab = action;

      fromCurr = fromTo[0];
      toCurr = fromTo[1];
    });

    loading = true;
    let { is_loading, response } = await handleExchanegerate();
    loading = is_loading;
    if (response) {
      respons = response;
    }
  });

  function switchAction(value) {
    selectedTab = value || "buy";
    const baseUrl = `/p2p/markets/${selectedTab}/${selectedCoin}`;
    window.history.pushState({ tab: selectedTab }, "", baseUrl);
  }

  function switchPairFrom(from) {
    fromCurr = from;
    const baseUrl = `/p2p/markets/${selectedTab}/${from}-${toCurr}`;
    selectedCoin = `${from}-${toCurr}`;
    window.history.pushState({ tab: selectedTab }, "", baseUrl);
  }
  function switchPairTo(to) {
    toCurr = to;
    const baseUrl = `/p2p/markets/${selectedTab}/${fromCurr}-${to}`;
    selectedCoin = `${fromCurr}-${to}`;
    window.history.pushState({ tab: selectedTab }, "", baseUrl);
  }

  function openSetupModal() {
    setUpModalIsOPen = true;
  }
  function closeSetupModal() {
    setUpModalIsOPen = false;
  }
</script>

{#if setUpModalIsOPen}
  <Setup {closeSetupModal} />
{/if}

<main id="app" class="app-container" data-v-app="">
  <!-- //// login 
   ///////header -->
  <section class="_layout_cw6mx_9">
    <div class="_header_piyeq_16">
      <div class="_inner_piyeq_21">
        <div class="_navBox_piyeq_26">
          <a href="/p2p/markets" class="_active_piyeq_44"
            >P2P Trading {$screen}px</a
          >
        </div>

        <OrdersSettings />
      </div>
    </div>
    <div class="_inner_cw6mx_14">
      {#if selectedTab === "buy"}
        <BuyTab onClick={switchAction} {switchPairFrom} />
      {:else if selectedTab === "sell"}
        <SellTab onClick={switchAction} {switchPairFrom} />
      {/if}

      <Filter onUpdate={switchPairTo} />
      {#if selectedTab === "buy"}
        <BuyTable {openSetupModal} />
      {:else if selectedTab === "sell"}
        <SellTable {openSetupModal} />
      {/if}
    </div>
  </section>
  <!---->
</main>

<Footer />

<style>
</style>
