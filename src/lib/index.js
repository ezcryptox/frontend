import axios from "axios"
import { ServerURl } from "$lib/backendUrl";
import { isLogin } from "$lib/store/profile";
import { error , loading} from "$lib/store/error-message"
const URL = ServerURl()

export const handleError = ((err)=>{
  error.set(err)
  setTimeout(()=>{
    error.set(null)
  },4000)
})


export const handleUserProfile = async (auth) => {
  loading.set(true)
  let response = null
  await axios.get(`${URL}/api/profile`,{
    headers: {
      "Content-type": "application/json",
      "Authorization": `Bearer ${auth}`
      }
  })
  .then((res)=>{
     isLogin.set(true)
      response = res.data
       loading.set(false)
  })
  .catch((err)=>{
    handleError(err.response?.data)
    loading.set(false)
  })
  return response 
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

