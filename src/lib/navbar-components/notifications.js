/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios"
import { ServerURl } from "$lib/backendUrl";
import { isLoadingUN, isLoadingPN } from "$lib/store/notifications";
const URL = ServerURl()
export const fetchUserNotifications = async (auth) => {
  isLoadingUN.set(true)
  let response = null
  try {
    response = (await axios.get(`${URL}/api/notifications/user`, {
      headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${auth}`
      }
    })).data
  } catch (_) { /* empty */ } finally {
    isLoadingUN.set(false)
  }
  return response
};

export const fetchUnreadCount = async (auth) => {
  let response = null
  try {
    response = (await axios.get(`${URL}/api/notifications/unread-count`, {
      headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${auth}`
      }
    })).data
  } catch (_) { /* empty */ } finally { /* empty */ }
  return response
};

export const fetchPlatformNotifications = async () => {
  isLoadingPN.set(true)
  let response = null
  try {
    response = (await axios.get(`${URL}/api/notifications/platform`, {
      headers: {
        "Content-type": "application/json",
      }
    })).data
  } catch (_) { /* empty */ } finally {
    isLoadingPN.set(false)
  }
  return response
};