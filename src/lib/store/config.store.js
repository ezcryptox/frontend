import { writable } from "svelte/store";

let _config = {}
export let app = writable(_config)