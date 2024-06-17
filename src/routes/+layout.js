import { browser } from '$app/environment'
import { otp } from "$lib/store/otp"
const id = browser && JSON.parse(localStorage.getItem('user'))

/** @type {import('./$types').PageLoad} */

export async function load({ route }) {
  let fach = browser && JSON.parse(sessionStorage.getItem('token'));
  otp.set(fach)
  return {route : route.id, token: id }
}