import { dev } from '$app/environment';
import { DrizzlePostgreSQLAdapter } from '@lucia-auth/adapter-drizzle';
import { Lucia } from 'lucia';
import db from '@/db/db.server';
import { usersTable, sessionTable } from '@/db/schema';


const adapter = new DrizzlePostgreSQLAdapter(db, sessionTable, usersTable);

export const lucia = new Lucia(adapter, {
    sessionCookie: {
        attributes: {
            secure: !dev
        }
    },

    getUserAttributes: (attributes) => {
        return {
            username: attributes.username,
            email: attributes.email
        }
    }
});

declare module "lucia" {
	interface Register {
		Lucia: typeof lucia;
        DatabaseUserAttributes: DatabaseUserAttributes;
	}
}

interface DatabaseUserAttributes {
	username: string;
    email: string
}
