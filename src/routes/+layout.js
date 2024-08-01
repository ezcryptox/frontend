import { browser } from '$app/environment'
import { otp } from "$lib/store/otp"
import { handleUserProfile } from "$lib/index";
import { handleAuthToken, routes } from "$lib/store/routes";
import { locale, waitLocale } from 'svelte-i18n'
import { getCookie, setCookie } from "$lib/store/cookies";
import '$lib/i18n'



/** @type {import('./$types').PageLoad} */

export async function load({ route }) {
  if (browser) {
    const savedLocale = getCookie("locale");
    locale.set(savedLocale || window.navigator.language)
    locale.subscribe(lang => {
      setCookie("locale", lang)
      document.documentElement.setAttribute("lang", lang || 'en');
      document.documentElement.setAttribute("data-uniframe-locale", lang || 'en');
    })
  }

  await waitLocale()
  let fach = browser && JSON.parse(sessionStorage.getItem('token'));
  let auth = browser && JSON.parse(sessionStorage.getItem('user'));
  if (auth) {
    handleAuthToken.set(auth.token)
    await handleUserProfile(auth.token)
  }
  otp.set(fach)
  routes.set(route.id)
}