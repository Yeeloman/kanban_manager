import type { Cookies } from '@sveltejs/kit';
import type { Lucia } from 'lucia';
import db from '@/db/db.server'
import { sessionTable } from '@/db/schema';
import { eq } from 'drizzle-orm';

export const createAndSetSession = async (lucia: Lucia, userId: string, cookies: Cookies) => {
	const session = await lucia.createSession(userId, {});
	const sessionCookie = lucia.createSessionCookie(session.id);

	cookies.set(sessionCookie.name, sessionCookie.value, {
		path: '/',
		...sessionCookie.attributes
	});
};

export const getSessionByUserId = async (lucia: Lucia, userId: string, cookies: Cookies) => {
	const session = await db
		.select({
			id: sessionTable.id
		})
		.from(sessionTable)
		.where(eq(sessionTable.userId, userId))
		.execute();

		if (session) {
			const sessionCookie = lucia.createSessionCookie(session[0].id);

			cookies.set(sessionCookie.name, sessionCookie.value, {
				path: '/',
				...sessionCookie.attributes
			});
		} else {
            await createAndSetSession(lucia, userId, cookies);
		}
};

export const deleteSessionCookie = async (lucia: Lucia, cookies: Cookies) => {
	const sessionCookie = lucia.createBlankSessionCookie();

	cookies.set(sessionCookie.name, sessionCookie.value, {
		path: '/',
		...sessionCookie.attributes
	});
};
