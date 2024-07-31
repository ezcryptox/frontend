<script>
	import '../styles/footer.css';
	import { _ } from 'svelte-i18n';
</script>
<div id="uniframe-footer" class="footer-wrapper" data-v-app>
	<footer class="beb6dc28 uniframe-root">
		<div class="e2fff687">
			<section class="ce1f9e13">
				<aside class="fa9ae9d7">
					<div class="eb13f307">
						<h2>{ $_("start-trading") }</h2>
						<div class="bb407533">
							<a href="/signup" class="abc20fb3" aria-label="signup">{ $_("sign-up") }</a>
							<a href="/login" class="abc20fb3" aria-label="login">{ $_("log-in") }</a>
						</div>
						<div class="ca0fb6d9">
							{ $_("institution-investor") }
							<a
								href="/support"
								aria-label="institutional investor"
								rel="noopener noreferrer nofollow"
							>
								{ $_("learn-more") }
							</a>
						</div>
					</div>
					<!---->
				</aside>
				<main class="e5cc3d28">
					<div class="">
						<div class="a1d7703b">{ $_("global-language") }</div>
						<div class="fa317b72">{$_('english')}<svg fill="currentColor" style="width: 24px; height: 24px;">
								<use xlink:href="#uniframe-icon-arrow-down"></use>
							</svg>
						</div>
					</div>
					<div class="d83dcb4c">
						<div class="ba496403">{ $_("about-ezcryptox") }</div>
						<ul>
							<li>
								<a href="fee" aria-label="fees" rel="noopener noreferrer nofollow">{$_('fees')}</a>
							</li>
							<li>
								<a href="leaderboard" aria-label="leaderboard" rel="noopener noreferrer nofollow"
									>{ $_("leaderboard") }</a
								>
							</li>
							<li>
								<a href="referral" aria-label="referral" rel="noopener noreferrer nofollow"
									>{ $_("g-referrals") }</a
								>
							</li>
							<li>
								<a href="learn/defi" aria-label="defi" rel="noopener noreferrer nofollow">{ $_("defi") }</a>
							</li>
						</ul>
					</div>
					<div class="d83dcb4c">
						<div class="ba496403">{ $_("g-futures") }</div>
						<ul>
							<li>
								<a
									href="futures/trade/BTCUSDTPERP"
									aria-label="futures trade"
									rel="noopener noreferrer nofollow">{ $_("g-futures-trade") }</a
								>
							</li>
							<li>
								<a
									href="futures/contract/detail/BTCUSDTPERP"
									aria-label="contract information"
									rel="noopener noreferrer nofollow">{ $_("contract-info") }</a
								>
							</li>
							<li>
								<a href="support" rel="noopener noreferrer nofollow">{ $_("contract-guide") }</a>
							</li>
						</ul>
					</div>
					<div class="d83dcb4c">
						<div class="ba496403">{ $_("footer-support") }</div>
						<ul>
							<li>
								<a href="support" aria-label="contact support" rel="noopener noreferrer nofollow"
									>{ $_("contact-support") }</a
								>
							</li>
							<li>
								<a href="support" aria-label="token listing" rel="noopener noreferrer nofollow"
									>{ $_("token-listing") }</a
								>
							</li>
						</ul>
					</div>
					<div class="d83dcb4c">
						<div class="ba496403">{ $_("social") }</div>
						<ul>
							<li>
								<a href="?twitter" aria-label="twitter" rel="noopener noreferrer nofollow"
									>{ $_("twitter") }</a
								>
							</li>
							<li>
								<a
									href="/twitter.com/PoloSupport"
									aria-label="support twitter"
									rel="noopener noreferrer nofollow">{ $_("support-twitter") }</a
								>
							</li>
							<li>
								<a href="?t.me" aria-label="telegram" rel="noopener noreferrer nofollow">{ $_("telegram") }</a
								>
							</li>
							<li>
								<a href="?weibo" aria-label="weibo" rel="noopener noreferrer nofollow">{$_('weibo')}</a>
							</li>
						</ul>
					</div>
				</main>
			</section>
			<section class="c17a4fd0">
				<div class="f234f27f">
					<img
						src="https://res.cloudinary.com/dxwhz3r81/image/upload/v1715952262/ezcryptox.ioo-04_y1qyp7.png"
						alt=""
					/>
					<span>© Ezcryptox 2024</span>
				</div>
				<nav class="a174fe8c">
					<a href="/support/terms">{ $_("user-agreement") }</a>
					<a href="/support/privacy">{ $_("privacy-policy") }</a>
					<a href="/support/cookie-policy">{ $_("cookie-policy") }</a>
					<a href="/support/e-sign-consent">{ $_("e-sign-consent") }</a>
				</nav>
			</section>
		</div>
	</footer>
</div>
<style>
</style>