<script>
	import { _ } from 'svelte-i18n';
	import { slideFade } from "$lib/transitions";

  
</script>
<div class="a773e3aa" transition:slideFade={{ duration: 200 }}>
    <ul>
    <!-- <li>
        <a class="d3f3d2f7" target="_self" href="/topic/airdrop-token?utm_source=navbar">
            <div class="d667695c">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M10.2982 3.13247C10.1204 3.02225 9.87957 3.02225 9.70176 3.13247L9.10597 3.50176L8.72679 2.89004L9.10596 3.50177C6.99414 4.81075 5.75 6.99622 5.75 9.31102V13.245H14.25V9.31102C14.25 6.99622 13.0059 4.81075 10.894 3.50177L11.2883 2.86564L10.894 3.50176L10.2982 3.13247ZM11.0885 1.85752L10.6934 2.495L11.0885 1.85752L11.6843 2.22682C14.2091 3.79181 15.75 6.44466 15.75 9.31102V13.995C15.75 14.4092 15.4142 14.745 15 14.745H5C4.58579 14.745 4.25 14.4092 4.25 13.995V9.31102C4.25 6.44466 5.79086 3.79181 8.3157 2.22682C8.3157 2.22682 8.3157 2.22682 8.3157 2.22682L8.91149 1.85752L9.30662 2.495L8.91149 1.85752C9.57343 1.44723 10.4266 1.44723 11.0885 1.85752Z"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M8.75 8C8.75 7.30964 9.30964 6.75 10 6.75C10.6904 6.75 11.25 7.30964 11.25 8C11.25 8.69036 10.6904 9.25 10 9.25C9.30964 9.25 8.75 8.69036 8.75 8ZM10 5.25C8.48122 5.25 7.25 6.48122 7.25 8C7.25 9.51878 8.48122 10.75 10 10.75C11.5188 10.75 12.75 9.51878 12.75 8C12.75 6.48122 11.5188 5.25 10 5.25ZM5.46852 10.0857C5.79197 9.82692 5.84441 9.35495 5.58565 9.03151C5.32689 8.70806 4.85493 8.65562 4.53148 8.91438L1.75 11.1396V14.75H18.25V11.1206L15.4443 9.05753C15.1106 8.81215 14.6411 8.88376 14.3958 9.21747C14.1504 9.55118 14.222 10.0206 14.5557 10.266L16.75 11.8795V13.25H3.25V11.8605L5.46852 10.0857Z"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M7.41602 15.8496V17.8496H5.91602V15.8496H7.41602ZM10.7495 15.8496V17.8496H9.24951V15.8496H10.7495ZM14.083 17.8496V15.8496H12.583V17.8496H14.083Z"></path>
                </svg>
               
            </div>
            <div class="d4ef16dd">
                <span>{$_('airdrop-token-title')}</span>
              
            </div>
            <div class="ddfb18d1">{$_('grab-rewards')}</div>
        </a>
    </li> -->
    <li>
        <a class="d3f3d2f7" target="_self" href="/referral">
            <div class="d667695c"><!----><svg fill="currentColor">
                <use xlink:href="#uniframe-icon-referrals"></use>
            </svg>
            </div>
            <div class="d4ef16dd">
                <span>{$_('g-referrals')}</span>
                <!----><!---->
            </div>
            <div class="ddfb18d1">{$_('referrals-subtitle')}</div>
        </a>
    </li>
    <li>
        <a class="d3f3d2f7" target="_self" href="/reward-center">
            <div class="d667695c">
                <!---->
                <svg fill="currentColor">
                    <use xlink:href="#uniframe-icon-reward-center"></use>
                </svg>
            </div>
            <div class="d4ef16dd">
                <span>{$_('rewardcenter')}</span>
                <i class="c69ddc99"></i>
                <!---->
            </div>
            <div class="ddfb18d1">{$_('rewardcenter-subtitle')}</div>
        </a>
    </li>
    <!-- <li>
        <a class="d3f3d2f7" target="_self" href="/leaderboard">
            <div class="d667695c">
                <svg fill="currentColor">
                    <use xlink:href="#uniframe-icon-leaderboard"></use>
                </svg>
            </div>
            <div class="d4ef16dd">
                <span>{$_('leaderboard')}</span>
            </div>
            <div class="ddfb18d1">{$_('leaderboard-subtitle')}</div>
        </a>
    </li> -->
    <!-- <li>
        <a class="d3f3d2f7" target="_self" href="/launchbase">
            <div class="d667695c">
                
                <svg fill="currentColor">
                    <use xlink:href="#uniframe-icon-launchbase"></use>
                </svg>
            </div>
            <div class="d4ef16dd">
                <span>{$_('launchbase')}</span>
                
            </div>
            <div class="ddfb18d1">{$_('launchbase-subtitle')}</div>
        </a>
    </li> -->
    <!-- <li>
        <a class="d3f3d2f7" target="_self" href="/feed/news/1">
            <div class="d667695c">
             
                <svg fill="currentColor">
                    <use xlink:href="#uniframe-icon-feed"></use>
                </svg>
            </div>
            <div class="d4ef16dd">
                <span>{$_('g-feed')}</span>
              
            </div>
            <div class="ddfb18d1">{$_('feed-subtitle')}</div>
        </a>
    </li> -->
    <!-- <li>
        <a class="d3f3d2f7" target="_self" href="/blog">
            <div class="d667695c">
                
                <svg fill="currentColor">
                    <use xlink:href="#uniframe-icon-blog"></use>
                </svg>
            </div>
            <div class="d4ef16dd">
                <span>{$_('g-blog')}</span>
            </div>
            <div class="ddfb18d1">{$_('blog-subtitle')}</div>
        </a>
    </li> -->
    <!-- <li>
        <a class="d3f3d2f7" target="_blank" href="https://sunswap.com">
            <div class="d667695c">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M3.5 10C3.5 13.5899 6.41015 16.5 10 16.5C13.5899 16.5 16.5 13.5899 16.5 10C16.5 6.41015 13.5899 3.5 10 3.5C6.41015 3.5 3.5 6.41015 3.5 10ZM10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2Z"></path>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M6.02002 7.5905L9.25016 4.89872L9.25016 11.5L7.75016 11.5L7.75016 8.10128L6.9803 8.74283L6.02002 7.5905Z"></path>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M13.98 12.4095L10.7498 15.1013L10.7498 8.5L12.2498 8.5L12.2498 11.8987L13.0197 11.2572L13.98 12.4095Z"></path>
                </svg>
              
            </div>
            <div class="d4ef16dd">
                <span>{$_('justswap')}</span>
               
            </div>
            <div class="ddfb18d1">{$_('justswap-subtitle')}</div>
        </a>
    </li> -->
</ul>
</div>
<style>
   
</style>