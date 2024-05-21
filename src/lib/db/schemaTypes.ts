import { usersTable } from "./schema";

export type newUser = typeof usersTable.$inferInsert;
