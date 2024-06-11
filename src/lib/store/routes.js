import { writable} from "svelte/store"

let route = ""
export let routes = writable(route)

let authToken = null
export let handleAuthToken = writable(authToken)

let _url = null
export let url = writable(_url)

let _tab = null
export let tab = writable(_tab)

let _seaser = []
export let seaser = writable(_seaser)