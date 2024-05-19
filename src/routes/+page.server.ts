import { fail, message, superValidate } from "sveltekit-superforms";
import type { PageServerLoad, Actions } from "./$types";
import { signInSchema, signUpSchema } from "@/FormSchema/FormSchema";
import { zod } from "sveltekit-superforms/adapters";
import { signUp } from "@/db/quiries";

export const load: PageServerLoad = (async () => {
    const signInForm = await superValidate(zod(signInSchema));
    const signUpForm = await superValidate(zod(signUpSchema));

    return {
        form: {
            signInForm,
            signUpForm
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
    },

    signUp: async({request}: { request: Request }) => {
        const signUpForm = await superValidate(request, zod(signUpSchema));
        console.log("🚀 ~ signUp:async ~ signUpForm:", signUpForm)

        if (!signUpForm.valid) {
            return fail(400, {
                signUpForm
            });
        }
        signUp(signUpForm.data)
        return message(signUpForm, "OK");
    }
}
