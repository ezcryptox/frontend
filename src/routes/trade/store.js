import { writable } from "svelte/store";

let _quotes = null
export let cryptoQuotes = writable(_quotes)