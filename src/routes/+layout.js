import { browser } from '$app/environment'
import { otp} from "$lib/store/otp"
import { handleUserProfile } from "$lib/index";
import { handleAuthToken, routes} from "$lib/store/routes";



/** @type {import('./$types').PageLoad} */

export async function load({ route }) {
  let fach = browser && JSON.parse(sessionStorage.getItem('token'));
  let auth = browser && JSON.parse(sessionStorage.getItem('user'));
  if(auth){
      handleAuthToken.set(auth)
     await handleUserProfile(auth)
  }
  otp.set(fach)
  routes.set(route.id)
}