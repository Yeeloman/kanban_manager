import db from '@/db/db.server';
import { usersTable } from './schema';
import type { newUser } from './schemaTypes';
import { eq } from 'drizzle-orm';


export const checkIfEmailExist = async (email: string) => {
    const result = await db.select({
        email: usersTable.email
    })
    .from(usersTable)
    .where(eq(usersTable.email, email))

    return result.length > 0
}

export const insertNewUser = async (user: newUser) => {
    return await db.insert(usersTable).values(user);
}
