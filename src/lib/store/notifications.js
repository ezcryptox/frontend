import { writable } from "svelte/store";

let _loadingUN = true
export let isLoadingUN = writable(_loadingUN)
let _loadingPN = true
export let isLoadingPN = writable(_loadingPN)