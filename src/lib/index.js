import axios from "axios"
import { ServerURl } from "$lib/backendUrl"
const URL = ServerURl()

export const handleUserProfile = async (auth) => {
  let is_loading = true
  let error = null
  let response = null
  await axios.get(`${URL}/api/profile`,{
    headers: {
      "Content-type": "application/json",
      "Authorization": `Bearer ${auth}`
      }
  })
  .then((res)=>{
      response = res.data
      is_loading = false
  })
  .catch((err)=>{
      error = err.message
      is_loading = false
  })
  return { is_loading, error, response }
};

export const handleProfileSecurity = async (auth) => {
  let is_loading = true
  let error = null
  let response = null
  await axios.get(`${URL}/api/profile/security`,{
    headers: {
      "Content-type": "application/json",
      "Authorization": `Bearer ${auth}`
      }
  })
  .then((res)=>{
      response = res.data
      is_loading = false
  })
  .catch((err)=>{
      error = err.message
      is_loading = false
  })
  return { is_loading, error, response }
};

