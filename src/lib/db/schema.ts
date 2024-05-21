// where you should define the tables for drizzle
import {
    pgTable,
    text,
    varchar,
    timestamp
} from "drizzle-orm/pg-core";


export const usersTable = pgTable('users', {
    id: text('id').primaryKey().notNull(),

    username: varchar('username', { length: 255 }).notNull().unique(),

    email: varchar('email', { length: 255 }).unique().notNull(),

    password: varchar('password', { length: 255 }).notNull(),
});

export const sessionTable = pgTable('sessions', {
	id: text('id').primaryKey().notNull(),

	userId: text('user_id')
		.notNull()
		.references(() => usersTable.id),

	expiresAt: timestamp('expires_at').notNull()
});
