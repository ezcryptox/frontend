import axios from "axios"
import { ServerURl } from "$lib/backendUrl";
import { isLoadingUN, isLoadingPN } from "$lib/store/notifications";
const URL = ServerURl()
export const fetchUserNotifications = async (auth) => {
  isLoadingUN.set(true)
  let response = null
  await axios.get(`${URL}/api/notifications/user`, {
    headers: {
      "Content-type": "application/json",
      "Authorization": `Bearer ${auth}`
    }
  })
    .then((res) => {
      response = res.data
    }).finally(() => {
      isLoadingUN.set(false)
    })
    .catch((err) => {
    })
  return response
};

export const fetchUnreadCount = async (auth) => {
  let response = null
  await axios.get(`${URL}/api/notifications/unread-count`, {
    headers: {
      "Content-type": "application/json",
      "Authorization": `Bearer ${auth}`
    }
  })
    .then((res) => {
      response = res.data
    })
    .catch((err) => {}).finally(() => {
    })
  return response
};

export const fetchPlatformNotifications = async () => {
  isLoadingPN.set(true)
  let response = null
  await axios.get(`${URL}/api/notifications/platform`, {
    headers: {
      "Content-type": "application/json",
    }
  })
    .then((res) => {
      response = res.data
    })
    .catch((err) => {
    }).finally(() => {
      isLoadingPN.set(false)
    })
  return response
};