// where you should define the tables for drizzle

import { pgTable, serial, varchar } from "drizzle-orm/pg-core";


export const usersTable = pgTable('users', {
    id: serial("id").primaryKey(),
    username: varchar('username', { length: 255 }),
    email: varchar('email', { length: 255 }),
    password: varchar('password', { length: 255 }),
});