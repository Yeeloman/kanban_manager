import { writable, type Writable } from "svelte/store";

export interface Board {
    id: number;
    active: boolean | null;
    userId: string;
    boardName: string;
    category: {
        id: number;
        categoryName: string;
        boardId: number;
        tasks: {
            id: number;
            status: "TODO" | "DOING" | "DONE" | null;
            name: string;
            description: string | null;
            categoryId: number;
            subtasks: {
                id: number;
                done: boolean;
                taskId: number;
            }[];
        }[];
    }[];
};

interface StateManager extends Writable<Board[]> {
    addBoard: (board: Board) => void;
    updateActiveStatus: (id: number) => void;
}

const createManager = (): StateManager => {
    const { subscribe, update, set } = writable<Board[]>([]);

    const addBoard = (board: Board) => {
        update(boards => [...boards, board]);

    };

    const updateActiveStatus = (id: number) => {
        update(boards =>
            boards.map(board =>
                board.id === id ? { ...board, active: true } : { ...board, active: false }
            )
        );
    };


    return {
        subscribe,
        update,
        set,
        addBoard,
        updateActiveStatus,
    };
};

const stateManager: StateManager = createManager();

export default stateManager;
