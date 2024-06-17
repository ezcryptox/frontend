<script>
  export let onClick = null;

  let activeCoin = "USDT"; // Initial active coin

  function handleClick(value) {
    if (onClick) {
      onClick(value);
    }
  }

  function handleCoinFocus(event) {
    activeCoin = event.target.textContent;
  }
</script>

<section class="_SideNav_1iwpl_9">
  <div class="_sideBox_1iwpl_28">
    <button
      class="_active_1iwpl_71 _up_1iwpl_75"
      on:click={() => handleClick("buy")}
    >
      Buy
    </button>
    <button class="_down_1iwpl_83" on:click={() => handleClick("sell")}>
      Sell
    </button>
  </div>
  <em></em>
  <div class="_coinBox_1iwpl_91">
    <span
      class={activeCoin === "USDT" ? "_active_1iwpl_71" : ""}
      on:click={handleCoinFocus}
      role="button"
      tabindex={0}
      on:keypress={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          activeCoin = event.target.textContent;
        }
      }}
    >
      USDT
    </span>
    <span
      class={activeCoin === "BTC" ? "_active_1iwpl_71" : ""}
      on:click={handleCoinFocus}
      role="button"
      tabindex={0}
      on:keypress={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          activeCoin = event.target.textContent;
        }
      }}
    >
      BTC
    </span>
  </div>
</section>
