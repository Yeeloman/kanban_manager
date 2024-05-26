import db from '@/db/db.server';
import { sessionTable, usersTable } from './schema';
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

export const checkIfNameExist = async (username: string) => {
    const result = await db.select({
        username: usersTable.username
    })
    .from(usersTable)
    .where(eq(usersTable.username, username))

    return result.length > 0
}

export const insertNewUser = async (user: newUser) => {
    return await db
        .insert(usersTable)
        .values(user);
}

export const getUserByName = async (userName: string) => {
    return await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.username, userName))
}

export const getSessionById = async (sessionId: string)  => {
    return await db
        .select()
        .from(sessionTable)
        .where(eq(sessionTable.id, sessionId))
        .execute()
}
