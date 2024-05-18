import { fail, message, superValidate } from "sveltekit-superforms";
import type { PageServerLoad, Actions } from "./$types";
import { signInSchema } from "@/FormSchema/FormSchema";
import { zod } from "sveltekit-superforms/adapters";

export const load: PageServerLoad = (async () => {
    const signInForm = await superValidate(zod(signInSchema));

    return {
        form: {
            signInForm
        }
    };
});

export const actions: Actions = {
    signIn: async({request}: { request: Request }) => {
        const signInForm = await superValidate(request, zod(signInSchema));
        console.log("🚀 ~ signIn:async ~ signInForm:", signInForm)

        if (!signInForm.valid) {
            return fail(400, {
                signInForm
            });
        }

        return message(signInForm, "OK");
    }
}
