import { writable } from "svelte/store";

let errorEL = 0
export let error_message = writable(errorEL)

let _error = 0
export let error = writable(_error)

let _loading = 0
export let loading = writable(_loading)
