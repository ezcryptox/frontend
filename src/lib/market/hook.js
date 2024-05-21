import axios from "axios"
import { error_message } from "$lib/store/error-message"
export const handleExchanegerate = (async()=>{
    let is_loading = true
    let error = ""
    let response = ""
    await axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd")
    .then((res)=>{
        response = res.data
        is_loading = false
    })
    .catch((err)=>{
        error = err.message
        error_message.set(error)
        setTimeout(()=>{
            error_message.set(null)
        },3000)
        is_loading = false
    })
    return { is_loading, response}
})