import { writable } from "svelte/store";

const _quotes: object | null = null
export const cryptoQuotes = writable(_quotes)
type SR = (name: string, data: unknown ) => void;
const _socketRequest: SR  | null = null;
export const socketRequest = writable(_socketRequest)