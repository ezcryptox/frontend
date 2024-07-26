import { writable } from "svelte/store";

let _searchQuery = ""
export let searchQuery = writable(_searchQuery)