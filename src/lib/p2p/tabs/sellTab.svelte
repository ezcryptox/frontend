<script>
  export let onClick = null;

  function handleClick(value) {
    if (onClick) {
      onClick(value);
    }
  }
</script>

<section class="_SideNav_1iwpl_9">
  <div class="_sideBox_1iwpl_28">
    <button class="_up_1iwpl_75" on:click={() => handleClick("buy")}>Buy</button
    ><button
      class="_active_1iwpl_71 _down_1iwpl_83"
      on:click={() => handleClick("sell")}>Sell</button
    >
  </div>
  <em></em>
  <div class="_coinBox_1iwpl_91">
    <span class="">USDT</span><span class="_active_1iwpl_71">BTC</span>
  </div>
</section>
