import { writable, type Writable } from "svelte/store";
import type { Board } from "./stateManager";

export let crntBoard: Writable<Board> = writable();
export let prevBoard: Writable<Board> = writable();
