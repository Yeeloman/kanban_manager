import { fail, message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { boardAdderSchema, boardEditorSchema } from "@/FormSchema/FormSchema";

export const load = (async () => {
    const boardAdderForm = await superValidate(zod(boardAdderSchema));
    const boardEditorForm = await superValidate(zod(boardEditorSchema));
    return {
        forms: {
            boardAdderForm,
            boardEditorForm
        }
    };
});

export const actions = {
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
        console.log(boardEditorForm)
        return message(boardEditorForm, boardEditorForm.data.edit_bname)
    }
}
