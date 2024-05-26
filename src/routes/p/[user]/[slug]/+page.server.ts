import { fail, message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { boardAdderSchema, boardEditorSchema, taskAdderSchema, taskDisplayerSchema, taskEditorSchema } from "@/FormSchema/FormSchema";
import type { Actions } from './$types';
import { createDashBoard, getActiveBoard, getAllBoards, getBoardById, setActiveBoard } from '@/db/dashBoardQuiries.server';
import { createCategory, createCategoryHelper } from '@/db/ColumnsQuiries.server';


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

        if (!boardEditorForm.valid) {
            return fail(400, {
                boardEditorForm
            });
        }
        return message(boardEditorForm, boardEditorForm.data.edit_bname)
    },

    addTask: async ({ request }: { request: Request }) => {
        const taskAdderForm = await superValidate(request, zod(taskAdderSchema));

        if (!taskAdderForm.valid) {
            return fail(400, {
                taskAdderForm
            });
        }
        return message(taskAdderForm, "task added")
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
