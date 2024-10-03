<script>
  import { app } from '$lib/store/config.store.js';
  import "../styles/home.css"
  import Footer from "$lib/footer.svelte";
  const banner = new URL('$lib/images/into-banner 1.png', import.meta.url).href
  const tv = new URL('$lib/images/guidedDownload.png', import.meta.url).href
  const Safeguard = new URL('$lib/images/Screenshot 2024-09-26 160652.png', import.meta.url).href
  const Safeguard_dark = new URL('$lib/images/safe-guade.png', import.meta.url).href
  const googleImg = new URL('$lib/images/fa7d7931679b6c250489e847177ba1be.png', import.meta.url).href
  $: marketTab = 0
  
  let d = [1,2,3,4,5,6, 7]
  let c = [1,2,3,4]
  </script>
  
  <div class="app-homepage _686bf1d6 w1200">
      <div class="_9640f16f _86eb487d">
          <div class="content">
              <h1 class="d33f49de">Welcome to the world of crypto</h1>
              <div class="controllers">
                  <button class="g-started button light">Get started</button>
                  <div class="or-container">
                      <div class="line"></div>
                      <span>or</span>
                      <div class="line"></div>
                  </div>
                  <div class="google-container button">
                      <img src="{googleImg}" style="width: 20px; height: 20px" alt="">
                      Google
                  </div>
              </div>
          </div>
          <div class="_24b300b3 _41fe8b9f font-ss3">
              <img src="{banner}" alt="">
          </div>
      </div>
      <!-- News section -->
       <div class="news-section">
          <div class="announce">
              <svg fill="currentColor" style="width: 20px; height: 20px;">
                  <use xlink:href="#uniframe-icon-announcement"></use>
              </svg>
          </div>
          <div class="content">
              <!-- svelte-ignore a11y-distracting-elements -->
              <marquee behavior="" direction="">
                  <span class="details">Demystifying MetaTrader 5: Tune in to Share 250,000 DOGS</span>
                  <span class="details">Fortune Circles: Win iPhone 16 Pro Max and Share Up to 100,000 USDT</span>
                  <span class="details">Complete the Puzzle and Win Big: 600,000 CATI Up for Grabs!</span>
              </marquee>
          </div>
          <div class="open-more">
              <svg fill="currentColor" style="width: 20px; height: 20px;">
                  <use xlink:href="#uniframe-icon-direction"></use>
              </svg>
          </div>
   
       </div>
  
  
       <!-- Next trading opporturnity -->
       <div class="JsklSmkl">
          <h1 class="sectiion-title">Catch Your Next Trading Opportunity</h1>
          <button class="search-more button">
              <span>
                  Search More 
              </span>
              <svg fill="currentColor" style="width: 20px; height: 20px;">
                  <use xlink:href="#uniframe-icon-direction"></use>
              </svg>
          </button>
          <div class="market-containers">
              <div class="card-1">
                  <div class="card-1-tabs">
                      <!-- svelte-ignore a11y-click-events-have-key-events -->
                      <!-- svelte-ignore a11y-no-static-element-interactions -->
                      <div on:click={()=> marketTab = 0} class="tab {marketTab ? "" : "active"}">Hot Derivatives</div>
                      <!-- svelte-ignore a11y-click-events-have-key-events -->
                      <!-- svelte-ignore a11y-no-static-element-interactions -->
                      <div on:click={()=> marketTab = 1} class="tab {!marketTab ? "" : "active"}">Hot Coins</div>
                  </div>
                  <div class="data-table">
                      <table>
                          <thead>
                              <tr class="header-tr">
                                  <th>Trading pairs</th>
                                  <th>Last Trading Price</th>
                                  <th>24hr Change</th>
                                  <th>Charts</th>
                                  <th>Trade</th>
                              </tr>
                          </thead>
                          <tbody>
                              {#each d as w}
                              <tr class="assets-container">
                                  <td>
                                   <div class="assets">
                                       <div class="assets-icons">
                                           <img src="https://www.datocms-assets.com/51952/1635193869-btc.png" alt="">
                                       </div>
                                       <div class="assets-pairs">
                                           <p>BTC/USDT</p>
                                       </div>
                                   </div>
                                  </td> 
                                  <td>
                                   <div class="asset-price">
                                       63,234.90
                                   </div>
                                  </td>
                                  <td>
                                       <div class="price-change">
                                           -2.23%
                                       </div>
                                  </td>
                                  <td>
                                   <div class="chart">
                                       ---
                                   </div>
                              </td>
                              <td>
                                   <button class="snjbeSNje button">trade</button>
                              </td>
                               </tr>
                              {/each}
                          </tbody>
                      </table>
                  </div>
              </div>
  
  
              <div class="card-2">
                  <div class="card-2-title"> Top Gainers</div>
                  <div class="card-2-container">
                      {#each c as f}
                      <div class="card-2-display">
                          <div class="assets">
                              <div class="assets-icons">
                                  <img src="https://www.datocms-assets.com/51952/1635193869-btc.png" alt="">
                              </div>
                              <div class="assets-pairs">
                                  <p>BTC/USDT</p>
                              </div>
                          </div>
                          <div class="asset-price">
                              <p> 63,234.90</p>
                            
                          </div>
                          <div class="price-change">
                              
                              <p>-2.23%</p>
                          </div>
                      </div>
                      {/each}
                    
                  </div>
  
  
                  <div class="card-2-title"> Top Gainers</div>
                  <div class="card-2-container">
                      {#each c as f}
                      <div class="card-2-display">
                          <div class="assets">
                              <div class="assets-icons">
                                  <img src="https://www.datocms-assets.com/51952/1635193869-btc.png" alt="">
                              </div>
                              <div class="assets-pairs">
                                  <p>BTC/USDT</p>
                              </div>
                          </div>
                          <div class="asset-price">
                              <p> 63,234.90</p>
                            
                          </div>
                          <div class="price-change">
                              
                              <p>-2.23%</p>
                          </div>
                      </div>
                      {/each}
                    
                  </div>
                
              </div>
  
          </div>
       </div>
  
       <div class="JsklSmkl _394bd770 fae21543">
          <h1 class="sectiion-title">Your one-stop shop for crypto trading</h1>
          <div class="f6472c3e font-ss3">
              <a href="/trade" class="_2f588215">
                  <div class="_989d578a _3c4b34ca"></div>
                  <div class="b0673997">Trade all the trending assets</div>
                  <div class="_580e1c84">Discover over 400 cryptocurrencies including all the trending new listings.</div>
                  <div class="_12d43166 _8d9f59a3">
                      <b>400+</b> 
                      cryptocurrencies
                  </div>    
                  <div class="b62fad60">Trade Now &gt;</div>
              </a>
                  <a href="/futures/trade" class="_2f588215"><!----><div class="b0673997">Hedge with Poloniex Futures</div>
                      <div class="_580e1c84">Trade Bitcoin, Ethereum, and other perpetual swap contracts with up to 100x leverage on Poloniex Futures.</div>
                      <div class="_989d578a _0ab34971"></div>
                      <div class="_12d43166 _8d9f59a3"><b>100x</b> Max leverage</div>
                      <div class="b62fad60">Trade Now &gt;</div>
                  </a>
                  <a href="/trade" class="_2f588215">
                      <div class="_989d578a cc033262"></div>
                      <div class="b0673997">Cross Margin Trading</div>
                      <div class="_580e1c84">Brand-new cross margin trading with 3x leverage. Auto borrow and repay funds in your portfolio account.</div>
                      <div class="_12d43166">As low as <b>1%</b> interest rate</div>
                      <div class="b62fad60">Trade Now &gt;</div>
                  </a>
              </div>
       </div>
  
        <div class="cks-tv-mobile-viw">
          <div class="_swiopsn">
              <div class="text">
                  <div class="_skeOes234l">
                      Trade Anytime, Anywhere.
                  </div>
                  <div class="jsh-small">
                      Open new positions instantly, whether it's on ezcryptox App or Web.
                  </div>
              </div>
              <div class="uskjs img">
                  <img src="{tv}" alt="">
              </div>
          </div>
        </div>
  
        <div class="safe-guard">
              <div class="safe-guard-container">
                  <div class="img-container">
                      <img src="{$app.theme ? Safeguard_dark: Safeguard}" alt="">
                  </div>
                  <div class="text-container">
                      <div class="text-header">Safeguard Your Assets</div>
                      <div class="text-content">24/7 system monitoring, 100% PoR, and multiple levels of security.</div>
                      <div class="text-footer">
                          <div class="_swkwjksw">
                              Proof of Reserves 
                              <svg fill="currentColor" style="width: 20px; height: 20px;">
                                  <use xlink:href="#uniframe-icon-direction"></use>
                              </svg>
                          </div>
                          <div class="_swkwjksw">
                              Multilevel Account Security
                              <svg fill="currentColor" >
                                  <use xlink:href="#uniframe-icon-direction"></use>
                              </svg>
                          </div>
                      </div>
                  </div>
              </div>
        </div>
  
      <div class="d4ced24e">
          <div class="_0afb5503">
              <h3 class="_0b275020">The Most Trusted Exchange as Always</h3>
              <div class="ce33e2f7 font-ss3">
                  <div class="bfdc8ba7">
                      <div class="_04640162 _26537c60"></div>
                      <div class="_15c0afd9">
                          <div class="_5eaa08ba">Secure and Stable</div>
                          <div class="c40d812e"> We provide a trusted and intuitive platform for users, of all experience levels, to trade how they want. </div>
                      </div>
                  </div>
                  <div class="bfdc8ba7">
                      <div class="_04640162 _59617368"></div>
                      <div class="_15c0afd9">
                          <div class="_5eaa08ba">24 / 7 Support</div>
                          <div class="c40d812e"> Reach out to our support team with any issues and we'll help you resolve them as quickly as possible. </div>
                      </div>
                  </div>
                  <div class="bfdc8ba7">
                      <div class="_04640162 _0498cef7"></div>
                      <div class="_15c0afd9">
                          <div class="_5eaa08ba">VIP Service</div>
                          <div class="c40d812e"> Poloniex offers high rate limit, and low latency API for you with good overall liquidity; friendly for institutional traders. </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  
      <div class="_4aaab2bd">
          <div class="fdf11cf7">
              <div class="_960fdf24">
                  <h3 class="_986dc130">Start Your Crypto Journey Now</h3>
                  <div class="_10b939b9 font-ss3"> Connecting you to the power of crypto </div>
              </div>
              <div class="_73a8d391 font-ss3">
                  <input type="email" placeholder="Enter your email">
                  <button type="button" class="polo-btn polo-btn-button polo-btn-primary polo-btn-large">
                      <!---->
                      <div class="btn-sp"> Sign Up </div>
                  </button>
              </div>
          </div>
      </div>
  
  </div>
  
  <Footer />