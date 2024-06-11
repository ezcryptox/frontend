import { writable } from "svelte/store";

let _profile = []
export let profile = writable(_profile)