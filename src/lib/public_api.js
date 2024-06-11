import axios from "axios"
import { ServerURl } from "$lib/backendUrl"
const baseURL = ServerURl()

export const handleGiveAway = (async()=>{
    let error_message = null
    let response = null
    await axios.get(`${baseURL}/api/give-away`)
    .then((res)=>{
        response = res.data
    })
    .catch((error)=>{
        error_message = error.response?.data
    })
    return { response, error_message }
})