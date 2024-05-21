import { fail, message, superValidate, setError } from "sveltekit-superforms";
import type { PageServerLoad, Actions } from "./$types";
import { signInSchema, signUpSchema } from "@/FormSchema/FormSchema";
import { zod } from "sveltekit-superforms/adapters";
import { checkIfEmailExist, insertNewUser } from "@/db/quiries.server";
import { redirect, type Cookies } from "@sveltejs/kit";
import { generateId } from "lucia";
// import { Argon2id } from 'oslo/password';
import sha1 from 'sha1';
import { createAndSetSession } from "@/server/sessionManager.server";
import { lucia } from "@/server/auth.server";

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

    signUp: async ({ request, cookies }: { request: Request, cookies: Cookies }) => {
        const signUpForm = await superValidate(request, zod(signUpSchema));

        if (!signUpForm.valid) {
            return fail(400, {
                signUpForm
            });
        }

        try {
            const emailExist = await checkIfEmailExist(signUpForm.data.email);
            if (emailExist === true) {
                return setError(signUpForm, 'email', 'Email already registered');
            }

            const userId = generateId(15);
            const hashedPassword = await sha1(signUpForm.data.password);

            await insertNewUser({
                id: userId,
                username: signUpForm.data.username,
                email: signUpForm.data.email,
                password: hashedPassword
            });

            await createAndSetSession(lucia, userId, cookies);

        } catch (e) {
            console.log('Error:', e);
        }

        throw redirect(303, `/p/${signUpForm.data.username}`)
        // return message(signUpForm, "OK");
    }
}
