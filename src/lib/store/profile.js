import { writable } from "svelte/store";

let _profile = []
export let profile = writable(_profile)

let _islogin = null
export let isLogin = writable(_islogin)