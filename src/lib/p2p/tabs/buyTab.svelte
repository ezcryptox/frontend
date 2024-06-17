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
    <span class="_active_1iwpl_71 _up_1iwpl_75" on:click={() => handleClick('buy')}>Buy</span>
    <span class="_down_1iwpl_83" on:click={() => handleClick('sell')}>Sell</span>
  </div>
  <em></em>
  <div class="_coinBox_1iwpl_91">
    <span class="_active_1iwpl_71">USDT</span>
    <span class="">BTC</span>
  </div>
</section>