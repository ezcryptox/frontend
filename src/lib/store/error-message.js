import { writable } from "svelte/store";

let error = 0
export let error_message = writable(error)
