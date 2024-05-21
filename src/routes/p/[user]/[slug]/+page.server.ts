import { fail, message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { boardAdderSchema, boardEditorSchema, taskAdderSchema, taskDisplayerSchema, taskEditorSchema } from "@/FormSchema/FormSchema";
import type { Actions } from './$types';

export const load = (async () => {
    const boardAdderForm = await superValidate(zod(boardAdderSchema));
    const boardEditorForm = await superValidate(zod(boardEditorSchema));
    const taskAdderForm = await superValidate(zod(taskAdderSchema));
    const taskEditorForm = await superValidate(zod(taskEditorSchema));
    const taskDisplayerForm = await superValidate(zod(taskDisplayerSchema));

    return {
        forms: {
            boardAdderForm,
            boardEditorForm,
            taskAdderForm,
            taskEditorForm,
            taskDisplayerForm
        }
    };
});

export const actions: Actions = {
    add: async ({ request }: { request: Request }) => {
        const boardAdderForm = await superValidate(request, zod(boardAdderSchema));

        if (!boardAdderForm.valid) {
            return fail(400, {
                boardAdderForm
            });
        }

        return message(boardAdderForm, boardAdderForm.data.board_name)
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
}
