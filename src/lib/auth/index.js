import axios from "axios"
import { ServerURl } from "$lib/backendUrl"
import { loading } from "$lib/store/error-message";
import { handleError } from "$lib/index"


export const handleSignUpEmailAuth = (async (data) => {
    let response = null
    let error = null
    let loading = true
    await axios.post(`${ServerURl()}/auth/sign-up`, {
        auth: data
    })
        .then((res) => {
            response = res.data
            loading = false
        })
        .catch((err) => {
            error = err.response?.data
            loading = false
        })
    return { response, error, loading }
})


export const handleCreateUser = (async (data) => {
    let response = null
    let error = null
    let loading = true
    await axios.post(`${ServerURl()}/auth/create-user`, {
        auth: data
    })
        .then((res) => {
            response = res.data
            loading = false
        })
        .catch((err) => {
            error = err.response?.data
            loading = false
        })
    return { response, error, loading }
})

export const handleLoginUser = (async (data) => {
    let response = null
    loading.set(true)
    await axios.post(`${ServerURl()}/auth/login-user`, {
        auth: data
    })
        .then((res) => {
            response = res.data
            loading.set(false)
        })
        .catch((err) => {
            handleError(err.response?.data)
            loading.set(false)
        })
    return response
})