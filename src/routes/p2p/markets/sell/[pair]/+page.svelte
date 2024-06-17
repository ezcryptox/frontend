<script>
  import Footer from "$lib/footer.svelte";
  import Filter from "../../../../../lib/p2p/filter.svelte";
  import "../../../../../styles/p2p.css";
  import Spot from "$lib/market/market-content/spot/spot.market.svelte";
  import { screen } from "$lib/store/screen";

  import { onMount } from "svelte";
  import { handleExchanegerate } from "$lib/home-page/hook";
  import Loader from "$lib/loader.svelte";
  import SellTable from "../../../../../lib/p2p/sellTable.svelte";
  import SellTab from "../../../../../lib/p2p/tabs/sellTab.svelte";

  $: tab = 1;
  let respons = [];
  $: loading = false;

  onMount(async () => {
    loading = true;
    let { is_loading, response } = await handleExchanegerate();
    loading = is_loading;
    if (response) {
      respons = response;
    }
  });
</script>

<main id="app" class="app-container" data-v-app="">
  <section class="_layout_cw6mx_9">
    <div class="_header_piyeq_16">
      <div class="_inner_piyeq_21">
        <div class="_navBox_piyeq_26">
          <a href="/p2p/markets" class="_active_piyeq_44">P2P Trading</a>
        </div>
      </div>
    </div>
    <div class="_inner_cw6mx_14">
      <SellTab />

      <Filter />
      <SellTable />
    </div>
  </section>
  <!---->
</main>

<Footer />

<style>
</style>
