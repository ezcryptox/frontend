import { writable } from "svelte/store";

let _profile = []
export let profile = writable(_profile)

let _islogin = false
export let isLogin = writable(_islogin)

let _user = []
export let user = writable(_user)