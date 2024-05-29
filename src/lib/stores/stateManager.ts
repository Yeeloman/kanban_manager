import { writable, type Writable } from "svelte/store";
import { get as getStoreValue } from "svelte/store";

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
export interface miniCategory {
    id: number;
    categoryName: string;
    boardId: number;
}

export interface miniBoard {
    id: number,
    boardName: string,
    active: boolean,
    userId: string,
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
    editBoard: (editBoard: miniBoard) => void;

    addCategory: (addedCategory: miniCategory[]) => void;
    editCategory: (editCategories: miniCategory[]) => void;

    updateActiveStatus: (id: number) => void;
    getActiveBoard: () => Board | undefined;

    addTask: (newTask: Task) => void;
    addSubTask: (newSub: Subtask) => void;
}

const createManager = (): StateManager => {
    const { subscribe, update, set } = writable<Board[]>([]);

    const addBoard = (board: Board) => {
        update(boards => [...boards, board]);
    };

    const editBoard = (editBoard: miniBoard) => {
        update(boards => {
            return boards.map(board => {
                if (board.id === editBoard.id) {
                    board.boardName = editBoard.boardName
                }
                return board
            })
        })
    }

    const updateActiveStatus = (id: number) => {
        update(boards =>
            boards.map(board =>
                board.id === id ? { ...board, active: true } : { ...board, active: false }
            )
        );
    };

    const getActiveBoard = (): Board | undefined => {
        const boards = getStoreValue(stateManager);
        return boards.find(board => board.active === true);
    }

    const addCategory = (addedCategory: miniCategory[]) => {
        update(boards => {
            return boards.map(board => {
                const newCategories = addedCategory
                    .filter(cat => cat.boardId === board.id)
                    .map(cat => ({ ...cat, tasks: [] }));
                return {
                    ...board,
                    category: [...board.category, ...newCategories]
                }
            })
        })
    }

    const editCategory = (categories: miniCategory[]) => {
        update(boards => {
            return boards.map(board => {
                return {
                    ...board,
                    category: board.category.map(cat => {
                        const editCat = categories.find(editCat => editCat.id === cat.id);
                        if (editCat) {
                            return {
                                ...cat,
                                categoryName: editCat.categoryName
                            };
                        }
                        return cat;
                    })
                };
            });
        });
    }

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
        editBoard,
        addCategory,
        editCategory,
        updateActiveStatus,
        getActiveBoard,
        addTask,
        addSubTask,
    };
};

const stateManager: StateManager = createManager();

export default stateManager;
