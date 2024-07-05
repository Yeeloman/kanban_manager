import { fail, superValidate, setError } from "sveltekit-superforms";
import type { PageServerLoad, Actions } from "./$types";
import { signInSchema, signUpSchema } from "@/FormSchema/FormSchema";
import { zod } from "sveltekit-superforms/adapters";
import { checkIfEmailExist, checkIfNameExist, getUserByName, insertNewUser } from "@/db/quiries.server";
import { redirect, type Cookies } from "@sveltejs/kit";
import { generateId } from "lucia";
import { createAndSetSession, getSessionByUserId } from "@/server/sessionManager.server";
import { lucia } from "@/server/auth.server";
import { Scrypt } from "lucia";

const scrypt = new Scrypt();

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
  signIn: async ({ request, cookies }: { request: Request, cookies: Cookies }) => {
    const signInForm = await superValidate(request, zod(signInSchema));

    if (!signInForm.valid) {
      return fail(400, {
        signInForm
      });
    }

    const username = signInForm.data.username;
    const password = signInForm.data.password;

    try {
      const userExist = await checkIfNameExist(username);
      if (userExist === false) {
        return setError(signInForm, 'username', 'Username does not exist');
      }


      const user = await getUserByName(username);

      const hash = user[0].password;

      const validPassword = await scrypt.verify(hash, password);
      if (validPassword) {
        return setError(signInForm, 'password', 'Incorrect password');
      }

      await getSessionByUserId(lucia, user[0].id, cookies);

    } catch (e) {
      console.log('Error:', e);
    }

    throw redirect(303, `/p/${username}`)

  },

  signUp: async ({ request, cookies }: { request: Request, cookies: Cookies }) => {
    const signUpForm = await superValidate(request, zod(signUpSchema));
    console.log("🚀 ~ signUp: ~ signUpForm:", signUpForm)

    if (!signUpForm.valid) {
      return fail(400, {
        signUpForm
      });
    }

    try {
      console.log('here?')
      const emailExist = await checkIfEmailExist(signUpForm.data.email);
      if (emailExist === true) {
        return setError(signUpForm, 'email', 'Email already registered');
      }

      const userId = generateId(15);
      const hash = await scrypt.hash(signUpForm.data.password);

      await insertNewUser({
        id: userId,
        username: signUpForm.data.username,
        email: signUpForm.data.email,
        password: hash
      });

      await createAndSetSession(lucia, userId, cookies);

    } catch (e) {
      console.log('Error sign up:', e);
    }

    throw redirect(303, `/p/${signUpForm.data.username}`)
    // return message(signUpForm, "OK");
  }
}
