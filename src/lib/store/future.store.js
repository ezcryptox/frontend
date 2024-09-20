import { writable } from "svelte/store";

let _currentPair = {}
export let futuresCurrentPair = writable(_currentPair)

let _futuresTradePairs = {}
export let futuresTradePairs = writable(_futuresTradePairs)
