import { writable } from "svelte/store";

let _otp = []
export let otp = writable(_otp)