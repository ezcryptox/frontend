import axios from "axios"
import { ServerURl } from "../../lib/backendUrl"

export const handleSignUpEmailAuth = (async(data)=>{
    let response = null
    let error = null
    let loading = true
    await axios.post(`${ServerURl()}/auth/sign-up`,{
        auth: data
    })
    .then((res)=>{
        response = res.data
        loading = false
    })
    .catch((err)=>{
        error = err.response?.data
        loading = false
    })
    return {response, error, loading}
})


export const handleCreateUser = (async(data)=>{
    let response = null
    let error = null
    let loading = true
    await axios.post(`${ServerURl()}/auth/create-user`,{
        auth: data
    })
    .then((res)=>{
        response = res.data
        loading = false
    })
    .catch((err)=>{
        error = err.response?.data
        loading = false
    })
    return {response, error, loading}
})