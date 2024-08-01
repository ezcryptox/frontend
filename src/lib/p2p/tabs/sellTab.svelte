<script>
	import { _ } from 'svelte-i18n';
  export let onClick = null;
  export let switchPairFrom = null;

  let activeCoin = "USDT";

  function handleClick(value) {
    if (onClick) {
      onClick(value);
    }
  }

  function handleSwitchPair(from) {
    if (switchPairFrom) switchPairFrom(from);
  }

  function handleCoinFocus(event, coin) {
    activeCoin = event.target.textContent;
    handleSwitchPair(coin === "btc" ? "usdt" : "btc");
  }
</script>
<section class="_SideNav_1iwpl_9">
  <div class="_sideBox_1iwpl_28">
    <button class="_up_1iwpl_75" on:click={() => handleClick("buy")}>{$_('g-buy')}</button
    ><button
      class="_active_1iwpl_71 _down_1iwpl_83"
      on:click={() => handleClick("sell")}>{$_('g-sell')}</button
    >
  </div>
  <em></em>
  <div class="_coinBox_1iwpl_91">
    <span
      class={activeCoin === "USDT" ? "_active_1iwpl_71" : ""}
      on:click={() => handleCoinFocus(event, "btc")}
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
      on:click={() => handleCoinFocus(event, "usdt")}
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
