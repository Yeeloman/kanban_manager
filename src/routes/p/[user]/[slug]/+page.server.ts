import { fail, message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { boardAdderSchema, boardEditorSchema, taskAdderSchema, taskDisplayerSchema, taskEditorSchema } from "@/FormSchema/FormSchema";
import type { Actions } from './$types';
import { createDashBoard, editBoardName, getAllBoards, getBoardById, setActiveBoard } from '@/db/dashBoardQuiries.server';
import { createCategory, createCategoryHelper, deleteCategoryById, updateCategoryName } from '@/db/ColumnsQuiries.server';
import { createTask, updateTask, updateTaskNameAndDescription } from '@/db/tasksQuiries.server';
import { createSubTask, createSubTaskArr, createSubTaskHelper, deleteSubTask, updateSubtask, updateSubtaskName } from '@/db/subTasksQuiries.server';
import type { miniBoard, miniCategory } from '@/stores/stateManager';
import type { SubTask, Task } from '@/db/schemaTypes';

interface Changes {
    board: Record<string, any>,
    addedCategories: miniCategory[],
    categories: miniCategory[],
    deletedCategories: number[]
}

interface ChangesEditTask {
    upTask: Task[],
    nwSub: SubTask[],
    upSub: SubTask[],
    dlSubIds: number[]
}
export const load = (async () => {
    const boardAdderForm = await superValidate(zod(boardAdderSchema));
    const boardEditorForm = await superValidate(zod(boardEditorSchema));
    const taskAdderForm = await superValidate(zod(taskAdderSchema));
    const taskEditorForm = await superValidate(zod(taskEditorSchema));
    const taskDisplayerForm = await superValidate(zod(taskDisplayerSchema));

    const allBoards = await getAllBoards();
    return {
        forms: {
            boardAdderForm,
            boardEditorForm,
            taskAdderForm,
            taskEditorForm,
            taskDisplayerForm
        },
        allBoards,
    };
});


export const actions: Actions = {
    add: async ({ request, locals }: { request: Request, locals: any }) => {
        const boardAdderForm = await superValidate(request, zod(boardAdderSchema));

        if (!boardAdderForm.valid) {
            return fail(400, {
                boardAdderForm
            });
        }
        try {
            const { board_name, board_columns } = boardAdderForm.data;

            const newDash = await createDashBoard({
                boardName: board_name,
                userId: locals.user.id,
            });
            if (board_columns) {
                const catArr = await createCategoryHelper(board_columns, newDash[0].id)
                await createCategory(catArr)
            }
            const board = await getBoardById(newDash[0].id)

            return message(boardAdderForm, board)
        } catch (e) {
            console.log('Error in dashboard: ', e);
            return fail(500, { error: 'Internal Server Error' });
        }
    },

    edit: async ({ request }: { request: Request }) => {
        const boardEditorForm = await superValidate(request, zod(boardEditorSchema));

        let changes: Changes = {
            board: {},
            addedCategories: [],
            categories: [],
            deletedCategories: [],
        }
        if (!boardEditorForm.valid) {
            return fail(400, {
                boardEditorForm
            });
        }
        try {
            const {
                edit_bname,
                edit_bcolumns,
                boardId,
                categoryIds,
                deleteCatIds
            } = boardEditorForm.data

            changes.board = await editBoardName(boardId, edit_bname)
            const catArr = createCategoryHelper(edit_bcolumns, boardId, categoryIds)
            const createCatArr = catArr.filter(item => item.id === 0);
            if (createCatArr.length > 0) {
                const obj = createCatArr.map((cat) => ({
                    boardId: cat.boardId,
                    categoryName: cat.categoryName
                }))
                const createdCat = await createCategory(obj)
                changes.addedCategories.push(...createdCat);
            }
            const updateCatArrFiltered = catArr.filter(item => item.id !== undefined) as { id: number; categoryName: string; boardId: number; }[];
            if (updateCatArrFiltered.length > 0) {
                const createdCat = await updateCategoryName(updateCatArrFiltered)
                changes.categories.push(...createdCat);
            }

            if (deleteCatIds.length > 0) {
                await deleteCategoryById(deleteCatIds)
                changes.deletedCategories = deleteCatIds;
            }
            return message(boardEditorForm, changes)
        } catch (e) {
            console.log("Error in edit board: ", e)
            return fail(400, boardEditorForm)
        }
    },

    addTask: async ({ request }: { request: Request }) => {
        const taskAdderForm = await superValidate(request, zod(taskAdderSchema));

        if (!taskAdderForm.valid) {
            return fail(400, {
                taskAdderForm
            });
        }
        try {
            const {
                task_name,
                description,
                category_id,
                subtasks
            } = taskAdderForm.data;

            const task = await createTask({
                name: task_name,
                categoryId: category_id,
                description: description ? description : "",

            })

            let newSub
            if (subtasks) {
                const subArr = createSubTaskHelper(subtasks, task[0].id)
                newSub = await createSubTask(subArr)
            }

            return message(taskAdderForm, {
                task,
                newSub
            })
        } catch (e) {
            console.log('Error adding the task ', e);
            return fail(400, {
                taskAdderForm
            })
        }
    },

    editTask: async ({ request }: { request: Request }) => {
        const taskEditorForm = await superValidate(request, zod(taskEditorSchema));

        let changes: ChangesEditTask = {
            upTask: [],
            upSub: [],
            nwSub: [],
            dlSubIds: [],
        };

        if (!taskEditorForm.valid) {
            return fail(400, {
                taskEditorForm
            });
        }

        try {
            const {
                taskId,
                edit_tname,
                edit_description,
                edit_subtasks,
                subTaskIds,
                deletedSubs
            } = taskEditorForm.data

            const uptasks = await updateTaskNameAndDescription({
                id: taskId,
                name: edit_tname,
                description: edit_description
            })
            changes.upTask.push(...uptasks)

            const subObj = createSubTaskArr(edit_subtasks, subTaskIds, taskId)
            const newSubs = subObj.filter(sub => sub.id === 0)
            if (newSubs.length > 0) {
                const subs = newSubs.map(sub => ({
                    taskId: sub.taskId,
                    name: sub.name
                }))
                const nwsub = await createSubTask(subs)
                changes.nwSub.push(...nwsub)
            }

            const updatedSubs = subObj.filter(sub => sub.id !== 0)

            if (updatedSubs.length > 0) {
                const upsubs = await updateSubtaskName(updatedSubs)
                changes.upSub.push(...upsubs)
            }

            if (deletedSubs.length > 0) {
                await deleteSubTask(deletedSubs)
                changes.dlSubIds = deletedSubs
            }

            return message(taskEditorForm, changes)
        } catch (e) {
            console.log('Error in editing task action: ', e)
        }
    },

    displayTask: async ({ request }: { request: Request }) => {
        const taskDisplayerForm = await superValidate(request, zod(taskDisplayerSchema));

        if (!taskDisplayerForm.valid) {
            return fail(400, {
                taskDisplayerForm
            });
        }
        try {
            const {
                status,
                categoryId,
                taskId,
                subtasks,
            } = taskDisplayerForm.data;

            const updatedTask = await updateTask({
                categoryId: categoryId,
                id: taskId,
                status: status
            })

            if (subtasks.length > 0) {
                await updateSubtask(subtasks);
            }

            return message(taskDisplayerForm, updatedTask)

        } catch (e) {
            console.log('Error in displaaying the task: ', e)
        }
    },

    activateBoard: async ({ request }: { request: Request }) => {
        const data = await request.formData();
        const board = data.get('board')
        const boardData = board ? JSON.parse(String(board)) : null;
        await setActiveBoard(boardData.id);
    },
}
