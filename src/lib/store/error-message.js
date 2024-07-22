import { writable } from "svelte/store";

let errorEL = null
export let error_message = writable(errorEL)

let _error = null
export let error = writable(_error)

let _loading = false
export let loading = writable(_loading)
