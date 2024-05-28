import { fail, message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { boardAdderSchema, boardEditorSchema, taskAdderSchema, taskDisplayerSchema, taskEditorSchema } from "@/FormSchema/FormSchema";
import type { Actions } from './$types';
import { createDashBoard, editBoardName, getActiveBoard, getAllBoards, getBoardById, setActiveBoard } from '@/db/dashBoardQuiries.server';
import { createCategory, createCategoryHelper, updateCategoryName } from '@/db/ColumnsQuiries.server';
import { createTask } from '@/db/tasksQuiries.server';
import { createSubTask, createSubTaskHelper } from '@/db/subTasksQuiries.server';
import type { miniBoard, miniCategory } from '@/stores/stateManager';

interface Changes {
    board: Record<string, any>,
    categories: miniCategory[],
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
            categories: []
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
            } = boardEditorForm.data

            changes.board = await editBoardName(boardId, edit_bname)
            const catArr = await createCategoryHelper(edit_bcolumns, boardId, categoryIds)
            const createCatArr = catArr.filter(item => item.id === 0);
            if (createCatArr.length > 0) {
                const obj = createCatArr.map((cat) => ({
                    boardId: cat.boardId,
                    categoryName: cat.categoryName
                }))
                const createdCat = await createCategory(obj)
                changes.categories.push(...createdCat);
            }
            const updateCatArrFiltered = catArr.filter(item => item.id !== undefined) as { id: number; categoryName: string; boardId: number; }[];
            if (updateCatArrFiltered.length > 0) {
                const createdCat = await updateCategoryName(updateCatArrFiltered)
                changes.categories.push(...createdCat);
            }

            console.log("🚀 ~ edit: ~ changes:", changes)
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

        console.log(taskEditorForm)
        if (!taskEditorForm.valid) {
            return fail(400, {
                taskEditorForm
            });
        }
        return message(taskEditorForm, "task added")
    },

    displayTask: async ({ request }: { request: Request }) => {
        const taskDisplayerForm = await superValidate(request, zod(taskDisplayerSchema));
        console.log("🚀 ~ displayTask: ~ taskDisplayerForm:", taskDisplayerForm)

        if (!taskDisplayerForm.valid) {
            return fail(400, {
                taskDisplayerForm
            });
        }
        return message(taskDisplayerForm, "task added")
    },

    activateBoard: async ({ request }: { request: Request }) => {
        const data = await request.formData();
        const board = data.get('board')
        const boardData = board ? JSON.parse(String(board)) : null;
        await setActiveBoard(boardData.id);
    },
}
