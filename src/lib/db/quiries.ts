import db from '@/db/db';
import sha1 from 'sha1';
// import type { signUpType } from '@/FormSchema/FormSchema';
import { usersTable } from './schema';

type newUser = typeof usersTable.$inferInsert;

export const signUp = async (form: newUser) => {
    try {

        const { password } = form;
        const hashedPwd = await sha1(password as string)
        await db.insert(usersTable).values({
            username: form.username,
            email: form.email,
            password: hashedPwd
        });
    } catch (e) {
        console.log("Error regestring to db: ", e);
    }


}
