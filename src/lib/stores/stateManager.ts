import { writable, type Writable } from "svelte/store";

export interface Subtask {
    id: number;
    name: string;
    done: boolean;
    taskId: number;
}

export interface Task {
    id: number;
    status: 'TODO' | 'DOING' | 'DONE' | null;
    name: string;
    description: string | null;
    categoryId: number;
    subtasks: Subtask[];
}

export interface Category {
    id: number;
    categoryName: string;
    boardId: number;
    tasks: Task[];
}


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
                name: string,
                done: boolean;
                taskId: number;
            }[];
        }[];
    }[];
};

interface StateManager extends Writable<Board[]> {
    addBoard: (board: Board) => void;
    updateActiveStatus: (id: number) => void;
    addTask: (newTask: Task) => void;
    addSubTask: (newSub: Subtask) => void;
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


    const addTask = (newTask: Task) => {
        update(boards => {
            return boards.map(board => {
                return {
                    ...board,
                    category: board.category.map(cat => {
                        if (cat.id === newTask.categoryId) {
                            return {
                                ...cat,
                                tasks: [...cat.tasks, newTask]
                            };
                        }
                        return cat;
                    })
                };
            });
        });
    };

    const addSubTask = (newSub: Subtask) => {
        update(boards => {
            return boards.map(board => {
                return {
                    ...board,
                    category: board.category.map(cat => {
                        return {
                            ...cat,
                            tasks: cat.tasks.map(task => {
                                if (task.id === newSub.taskId) {
                                    return {
                                        ...task,
                                        subtasks: [...(task.subtasks || []), newSub]
                                    };
                                }
                                return task;
                            })
                        };
                    })
                };
            });
        });
    };

    return {
        subscribe,
        update,
        set,
        addBoard,
        updateActiveStatus,
        addTask,
        addSubTask
    };
};

const stateManager: StateManager = createManager();

export default stateManager;
