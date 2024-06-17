<script>
  import "../../../styles/login.css";
  const google = new URL("./google.svg", import.meta.url).href;
</script>

<svelte:head>
  <title>Ezcryptox Login</title>
  <meta name="description" content="Login to Ezcryptox exchange " />
</svelte:head>

<div class="wc-login">
  <div class="_2b9df342 _1293a69e">
    <div class="bc498c42">
      <p class="a7ae4372">Welcome back</p>
      <div data-v-39752d79="" class="order-form">
        <div data-key="email" class="form-item" data-v-39752d79="">
          <div class="item-label-title">Email / Phone Number</div>
          <div class="form-item-content">
            <div class="_634393df">
              <div
                class="polo-input left polo-input-large polo-input-button"
                width="100%"
              >
                <!---->
                <input
                  type="text"
                  placeholder="Email address or phone number"
                  width="100%"
                />
                <!---->
              </div>
            </div>
            <div class="msg-box" style="display: none;">
              <!---->
            </div>
          </div>
        </div>
        <!----><!---->
        <div data-v-39752d79="" class="_17e6dddf">
          <button
            type="button"
            class="polo-btn polo-btn-button polo-btn-primary polo-btn-large _3fe348c3"
            data-v-39752d79=""
            style="width: 100%;"
          >
            <!---->
            <div class="btn-sp">Next</div>
          </button>
          <p data-v-39752d79="" class="_81d1884f">
            Don't have an account? <a href="/signup">Sign up</a>
          </p>
        </div>
      </div>
      <div class="_8f585bdf">
        <div class="dec00f0a">
          <span>Or </span>
        </div>
        <div class="cc314366">
          <button
            type="button"
            class="polo-btn polo-btn-button polo-btn-secondary polo-btn-medium _37ed289d"
          >
            <!---->
            <div class="btn-sp">
              <img
                src={google}
                class="svgicon"
                style="width: 40px;height: 40px;min-width: 40px;"
                alt=""
              />
            </div>
          </button>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
</style>
