import type { STATUS } from "@/db/schemaTypes";
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
    deleteBoard: (id: number) => void;

    addCategory: (addedCategory: miniCategory[]) => void;
    editCategory: (editCategories: miniCategory[]) => void;
    deleteCategory: (deletedCategories: number[]) => void;

    updateActiveStatus: (id: number) => void;
    getActiveBoard: () => Board | undefined;

    addTask: (newTask: Task) => void;
    updateTask: (id: number, categoryId: number, status: STATUS) => void;
    updateTaskNameAndDesc: (upTask: Task) => void;
    deleteTask: (id: number) => void;

    addSubTask: (newSub: Subtask) => void;
    updateSubTask: (subtasks: Subtask) => void;
    deleteSubTask: (subTaskIds: number[]) => void;
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

    const deleteBoard = (id: number) => {
        update(boards => boards.filter(board => board.id !== id))
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

    const deleteCategory = (deletedCategory: number[]) => {
        update(boards => {
            return boards.map(board => {
                return {
                    ...board,
                    category: board.category.filter(cat => !deletedCategory.includes(cat.id))
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

    const updateTask = (id: number, categoryId: number, status: STATUS) => {
        //@ts-ignore
        update(boards => {
            return boards.map(board => {
                let taskToMove: Task | undefined;

                const updatedCat = board.category.map(cat => {
                    const filteredTasks = cat.tasks.filter(task => {
                        if (task.id === id) {
                            taskToMove = task
                            return false
                        }
                        return true
                    })
                    return {
                        ...cat,
                        tasks: filteredTasks
                    }
                })

                if (taskToMove) {
                    taskToMove.categoryId = categoryId
                    taskToMove.status = status
                    const newCategories = updatedCat.map(cat => {
                        if (cat.id === categoryId) {
                            return {
                                ...cat,
                                tasks: [...cat.tasks, taskToMove]
                            };
                        }
                        return cat;
                    });
                    return {
                        ...board,
                        category: newCategories
                    }
                }
                return board
            })
        })
    }

    const updateTaskNameAndDesc = (upTask: Task) => {
        update(boards => {
            return boards.map(board => {
                return {
                    ...board,
                    category: board.category.map(cat => {
                        if (cat.id === upTask.categoryId) {
                            return {
                                ...cat,
                                tasks: cat.tasks.map(task => {
                                    if (task.id === upTask.id) {
                                        task.name = upTask.name
                                        task.description = upTask.description
                                    }
                                    return task
                                })
                            }
                        }
                        return cat
                    })
                }
            })
        })
    }

    const deleteTask = (id: number) => {
        update(boards => {
            return boards.map(board => {
                return {
                    ...board,
                    category: board.category.map(cat => {
                        return {
                            ...cat,
                            tasks: cat.tasks.filter(task => task.id !== id)
                        }
                    })
                }
            })
        })
    }

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

    const updateSubTask = (subtask: Subtask) => {
        update(boards => {
            return boards.map(board => {
                return {
                    ...board,
                    category: board.category.map(cat => {
                        return {
                            ...cat,
                            tasks: cat.tasks.map(task => {
                                return {
                                    ...task,
                                    subtasks: task.subtasks.map(sub => {
                                        if (sub.id === subtask.id) {
                                            sub.name = subtask.name
                                            sub.done = false
                                        }
                                        return sub
                                    })
                                }
                            })
                        }
                    })
                }
            })
        })
    }

    const deleteSubTask = (subTaskIds: number[]) => {
        update(boards => {
            return boards.map(board => {
                return {
                    ...board,
                    category: board.category.map(cat => {
                        return {
                            ...cat,
                            tasks: cat.tasks.map(task => {
                                return {
                                    ...task,
                                    subtasks: task.subtasks.filter(sub => !subTaskIds.includes(sub.id))
                                }
                            })
                        }
                    })
                }
            })
        })
    }

    return {
        subscribe,
        update,
        set,
        addBoard,
        editBoard,
        deleteBoard,
        addCategory,
        editCategory,
        deleteCategory,
        updateActiveStatus,
        getActiveBoard,
        addTask,
        updateTask,
        updateTaskNameAndDesc,
        deleteTask,
        addSubTask,
        updateSubTask,
        deleteSubTask,
    };
};

const stateManager: StateManager = createManager();

export default stateManager;
