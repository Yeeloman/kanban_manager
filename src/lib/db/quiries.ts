import db from '@/db/db';
// import type { signUpType } from '@/FormSchema/FormSchema';
import { users } from './schema';

type newUser = typeof users.$inferInsert;

export const signUp = async (form: newUser) => {
    console.log('posting the data')
    await db.insert(users).values(form);
}
