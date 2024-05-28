import { writable, type Writable } from "svelte/store";
import type { Board } from "./stateManager";

interface CrntBoard extends Writable<Board | undefined> {

}

const createBoard = (): CrntBoard => {
    const {
        set,
        subscribe,
        update
    } = writable<Board>()


    return {
        set,
        subscribe,
        update,
    }
}


export const crntBoard = createBoard()
// export let crntBoard: Writable<Board | undefined> = writable() ;
