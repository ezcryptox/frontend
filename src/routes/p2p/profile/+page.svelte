<script>
  import Setup from "../../../lib/p2p/modals/setup.svelte";
  import { screen } from "$lib/store/screen";
  import "../../../styles/p2p_profile.css";

  $: setUpModalIsOPen = false;

  function OpenSetupModal() {
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
  <div class="userCenterWraper">
    <img
      src="https://v3.polo-static.com/otc-web/static/png/topbj-0ec54305.png"
      class="bj left"
    /><img
      src="https://v3.polo-static.com/otc-web/static/png/topbj-0ec54305.png"
      class="bj right"
    />
    <dl class="topWraper">
      <dt>
        <dl class="userInfo">
          <dt><div class="headerPicture greenBj"></div></dt>
          <dd>
            <h3>
              <button
                class="el-button el-button--primary is-link"
                aria-disabled="false"
                type="button"
                ><!--v-if--><span class=""
                  >Set your nickname <svg
                    data-v-c936a896=""
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    class="svg-icon"
                    ><path
                      d="M14.2266 2.87013L13.1377 1.78125L6.19379 8.72515L7.28267 9.81403L14.2266 2.87013Z"
                    ></path><path
                      d="M2.21875 2.2207H9.46875V3.7207H3.71875V12.2832H12.2812V7.00195H13.7812V13.7832H2.21875V2.2207Z"
                    ></path></svg
                  ></span
                ></button
              >
            </h3>
            <p>
              Total trades: <i>0</i> ( <span class="green">Buy 0</span><span
                class="line"
              ></span><span class="red">Sell 0</span> )
              <span class="line"></span>
              Trades(30d): <i>0</i><span class="line"></span> Fill rate(30d):
              <i>0%</i>
            </p>
            <p style="margin-top: 2px;">
              ( <span class="green">Buy 100%</span> ) <span class="line"></span>
              Avg. cancelation time(30d): <i>0.00min</i><span class="line"
              ></span>
              Avg. release time(30d): <i>min</i>
            </p>
          </dd>
        </dl>
      </dt>
      <dd></dd>
    </dl>
    <div class="mainWraper">
      <div class="mainContain">
        <dl class="_title_2pao0_9 {$screen < 500? 'flex_column' : ''}">
            <dt>
              <h3 class="mainTitle">Payment Method {$screen}px</h3>
              For security reasons, please use accounts verified with your own identity.
              You can enable a maximum of 3 payment methods, and all enabled methods
              will be visible to your buyers.
            </dt>
            <dd>
              <button class="el-button el-button--success is-plain _elbutton_2pao0_62"
                      aria-disabled="false"
                      type="button"
                      on:click={OpenSetupModal}>
                <span><!--v-if--><svg
                  data-v-c936a896=""
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  class="svg-icon">
                  <path fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M7.25 8.75V13H8.75V8.75H13V7.25H8.75V3H7.25V7.25H3V8.75H7.25Z"></path>
                </svg> Add a payment method</span>
              </button>
            </dd>
          </dl>
          
          
        <section class="_tableEmpty_102ze_9 _frameWraper_2pao0_107">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="80"
            height="80"
            fill="none"
            ><path
              fill="#f2f2f2"
              d="M10.91 20.002c0-1.004.813-1.818 1.817-1.818H44.44c.584 0 1.131.28 1.473.752l6.715 9.28c.2.276.318.602.34.942l2.354 34.356a1.818 1.818 0 0 1-1.814 1.942h-40.78a1.818 1.818 0 0 1-1.819-1.818z"
            ></path><rect
              width="58.182"
              height="45.455"
              x="10.909"
              y="23.637"
              fill="#e3e3e3"
              rx="1.818"
            ></rect><rect
              width="18.182"
              height="18.182"
              x="54.546"
              y="37.273"
              fill="#b8b8b8"
              rx="1.818"
            ></rect><circle cx="63.636" cy="46.367" r="3.636" fill="#e3e3e3"
            ></circle><circle cx="18.182" cy="21.819" r="10.909" fill="#b8b8b8"
            ></circle><g fill="#f2f2f2"
              ><path
                d="M19.084 25.175h-1.806a.775.775 0 0 0-.775.775v1.807c0 .428.347.775.775.775h1.806a.775.775 0 0 0 .776-.775V25.95a.775.775 0 0 0-.776-.775zM19.084 15.105h-1.806a.775.775 0 0 0-.775.776v6.84c0 .429.347.776.775.776h1.806a.775.775 0 0 0 .776-.775V15.88a.775.775 0 0 0-.776-.776z"
              ></path></g
            ></svg
          >
          <p class="_info_102ze_17">No payment methods added</p>
        </section>
      </div>
    </div>
  </div>
  <!---->
</main>
