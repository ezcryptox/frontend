<script>
	import { _ } from 'svelte-i18n';
	import '../../../styles/login.css';
	const google = new URL('./google.svg', import.meta.url).href;
	import { handleLoginUser } from '$lib/auth/index';
	import { loading, error } from '$lib/store/error-message';
	import { handleAuthToken } from '$lib/store/routes';
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { isLogin, user } from '$lib/store/profile';

	let email = '';
	let password = '';

	$: track = $loading || !email || !password;

	const handleSubmit = async () => {
		const response = await handleLoginUser({ email, password });
		if (response) {
			handleAuthToken.set(response?.token);
			browser && sessionStorage.setItem('user', JSON.stringify(response));
			user.set(response);
			isLogin.set(true);
			browser && goto('/');
		}
	};
</script>
<svelte:head>
	<title>{$_('ezcryptox-login')}</title>
	<meta name="description" content="Login to Ezcryptox exchange " />
</svelte:head>

<div class="wc-login">
	<div class="_2b9df342 _1293a69e">
		<div class="bc498c42">
			<p class="a7ae4372">{$_('welcome-back')}</p>
			<div data-v-39752d79="" class="order-form">
				<div data-key="email" class="form-item" data-v-39752d79="">
					<div class="item-label-title">{$_('email-phone-number')}</div>
					<div class="form-item-content">
						<div class="_634393df">
							<div class="polo-input left polo-input-large polo-input-button" width="100%">
								<!---->
								<input
									type="text"
									bind:value={email}
									placeholder="Email address or phone number"
									width="100%"
								/>
								<!---->
							</div>
						</div>
						{#if $error}
							<div class="msg-box">
								{$error}
							</div>
						{/if}
					</div>
				</div>

				<div data-key="password" class="form-item" data-v-39752d79="">
					<div class="item-label-title">{$_('password')}</div>
					<div class="form-item-content">
						<div class="_634393df">
							<div class="polo-input left polo-input-large polo-input-button" width="100%">
								<!---->
								<input
									type="password"
									bind:value={password}
									placeholder="Enter password"
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
						on:click={handleSubmit}
						disabled={track}
						type="button"
						class="polo-btn polo-btn-button polo-btn-primary polo-btn-large _3fe348c3"
						data-v-39752d79=""
						style="width: 100%;"
					>
						<!---->
						<div class="btn-sp">{$loading ? 'Loading...' : 'Next'}</div>
					</button>
					<p data-v-39752d79="" class="_81d1884f">{$_('dont-have-an-account')}<a href="/signup">{$_('sign-up-1')}</a>
					</p>
				</div>
			</div>
			<div class="_8f585bdf">
				<!-- <div class="dec00f0a">
					<span>{$_('or')}</span>
				</div> -->
				<div class="cc314366">
					<!-- <button
						type="button"
						class="polo-btn polo-btn-button polo-btn-secondary polo-btn-medium _37ed289d"
					>
			
						<div class="btn-sp">
							<img
								src={google}
								class="svgicon"
								style="width: 40px;height: 40px;min-width: 40px;"
								alt=""
							/>
						</div>
					</button> -->
				</div>
			</div>
		</div>
	</div>
</div>
<style>
</style>