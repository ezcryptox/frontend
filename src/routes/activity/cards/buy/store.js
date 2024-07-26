import { writable} from "svelte/store"
import {
  getLocalTimeZone,
  today
} from '@internationalized/date';
let _selectedFilter = {
  fiat: 'All',
  crypto: 'All',
  status: 'All',
  time: {
    start: today(getLocalTimeZone()).toDate(getLocalTimeZone()).getTime(),
    end: today(getLocalTimeZone()).toDate(getLocalTimeZone()).getTime()
  }
}
export let selectedFilter = writable(_selectedFilter)

let _orders = [];

export let orders = writable(_orders);
