import db from '@/db/db';
import { hash } from 'bcrypt';
// import type { signUpType } from '@/FormSchema/FormSchema';
import { usersTable } from './schema';

type newUser = typeof usersTable.$inferInsert;

export const signUp = async (form: newUser) => {
    console.log('adding the data to the db')


    await db.insert(usersTable).values(form);


}
