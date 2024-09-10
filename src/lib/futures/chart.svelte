<script >
  import { widget } from "$lib/charting_library";
  import { UDFCompatibleDatafeed } from "$lib/datafeeds/udf/src/udf-compatible-datafeed";
  import { onMount } from "svelte";
  import Datafeed from "$lib/datafeeds/datafeed";

  function getLanguageFromURL() {
    const regex = new RegExp("[\\?&]lang=([^&#]*)");
    const results = regex.exec(window.location.search);
    return results === null
      ? null
      : decodeURIComponent(results[1].replace(/\+/g, " "));
  }

  onMount(() => {
    const widgetOptions = {
      symbol: "BTCUSDT",
      // BEWARE: no trailing slash is expected in feed URL
      datafeed: Datafeed,
      interval: "1D",
      container: "tv-chart-container",
      library_path: "/charting_library/",

      locale: getLanguageFromURL() || "en",
      disabled_features: ["use_localstorage_for_settings"],
      enabled_features: ["study_templates"],
      charts_storage_url: "https://saveload.tradingview.com",
      charts_storage_api_version: "1.1",
      client_id: "tradingview.com",
      user_id: "public_user_id",
      fullscreen: false,
      autosize: true,
      debug: true,
    };

    const tvWidget = new widget(widgetOptions);
  });

</script>

<div class="d09e8c81 flex-column">
    <div class="c1ffc6e0">
        <div class="bfd5c32f" style="height: 520px;" id="tv-chart-container"></div>
    </div>
</div>

<style>
    #tv-chart-container {
      height: calc(100vh - 41px);
    }
  </style>