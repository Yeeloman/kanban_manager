import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { boardAdderSchema } from "@/FormSchema/FormSchema";

export const load = (async () => {
    const boardAdderForm = await superValidate(zod(boardAdderSchema));

    return { boardAdderForm };
});
