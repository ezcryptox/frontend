<script>
  const currencyOptions = [
    {
      code: "USD",
      image: "https://www.datocms-assets.com/51952/1665712815-eth-1.png",
    },
    {
      code: "SGD",
      image: "https://www.datocms-assets.com/51952/1680057413-sgd.png",
    },
    {
      code: "INR",
      image: "https://www.datocms-assets.com/51952/1678352873-inr.png",
    },
    {
      code: "VND",
      image: "https://www.datocms-assets.com/51952/1678699221-vnd.png",
    },
    {
      code: "CAD",
      image: "https://www.datocms-assets.com/51952/1678696472-cad.png",
    },
    {
      code: "AUD",
      image: "https://www.datocms-assets.com/51952/1678696622-aud.png",
    },
    {
      code: "TWD",
      image: "https://www.datocms-assets.com/51952/1678441536-twd.png",
    },
    {
      code: "RUB",
      image: "https://www.datocms-assets.com/51952/1678441485-rub.png",
    },
    {
      code: "GBP",
      image: "https://www.datocms-assets.com/51952/1678699269-gbp.png",
    },
    {
      code: "HKD",
      image: "https://www.datocms-assets.com/51952/1678699172-hkd.png",
    },
    {
      code: "EUR",
      image: "https://www.datocms-assets.com/51952/1678255416-eur.png",
    },
    {
      code: "NGN",
      image: "https://www.datocms-assets.com/51952/1678441266-ngn.png",
    },
    {
      code: "IDR",
      image: "https://www.datocms-assets.com/51952/1678696767-idr.png",
    },
    {
      code: "PHP",
      image: "https://www.datocms-assets.com/51952/1678441360-php.png",
    },
    {
      code: "KHR",
      image: "https://www.datocms-assets.com/51952/1679999614-khr.png",
    },
    {
      code: "BRL",
      image: "https://www.datocms-assets.com/51952/1678358220-brl.png",
    },
    {
      code: "AED",
      image: "https://www.datocms-assets.com/51952/1678696426-aed.png",
    },
    {
      code: "MYR",
      image: "https://www.datocms-assets.com/51952/1680056429-myr.png",
    },
    {
      code: "TRY",
      image: "https://www.datocms-assets.com/51952/1678696052-try.png",
    },
    {
      code: "THB",
      image: "https://www.datocms-assets.com/51952/1678695923-thb.png",
    },
    {
      code: "UAH",
      image: "https://www.datocms-assets.com/51952/1678441441-uah.png",
    },
    {
      code: "GEL",
      image: "https://www.datocms-assets.com/51952/1679998384-gel.png",
    },
    {
      code: "KZT",
      image: "https://www.datocms-assets.com/51952/1678442008-kzt.png",
    },
    {
      code: "PKR",
      image: "https://www.datocms-assets.com/51952/1678695962-pkr.png",
    },
    {
      code: "MOP",
      image: "https://www.datocms-assets.com/51952/1680056179-mop.png",
    },
  ];

  let activeCurrency = currencyOptions[0]; // Set the initial active currency
</script>

<div
  class="el-popper is-pure is-light el-dropdown__popper e-dropdown"
  tabindex="-1"
  aria-hidden="false"
  role="menu"
  id="el-id-9233-1"
  data-popper-reference-hidden="false"
  data-popper-escaped="false"
  data-popper-placement="bottom"
  style="z-index: 1020018; position: absolute; inset: 50px auto auto 105.5px;"
>
  <div class="el-scrollbar">
    <div class="el-scrollbar__wrap el-scrollbar__wrap--hidden-default">
      <div class="el-scrollbar__view el-dropdown__list" style="">
        <div class="_coinBox_1wcwv_109">
          <ul class="_coinList_1wcwv_115">
            {#each currencyOptions as option}
              <li class={option === activeCurrency ? "_active_1wcwv_44" : ""}>
                <div class="_imgBox_1wcwv_138">
                  <img alt="" loading="lazy" src={option.image} />
                </div>
                {option.code}
              </li>
            {/each}
          </ul>
        </div>
      </div>
    </div>
    <!-- Scrollbar markup remains the same -->
  </div>
  <span
    class="el-popper__arrow"
    data-popper-arrow=""
    style="position: absolute; left: 75px;"
  ></span>
</div>
<!-- ///////////////////////
    first select options end
     //////////////////////// -->
