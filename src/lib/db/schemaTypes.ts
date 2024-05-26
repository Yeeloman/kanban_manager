import {
    categoriesTable,
    dashBoardTable,
    usersTable
} from "./schema";

export type newUser = typeof usersTable.$inferInsert;
export type DashBoard = typeof dashBoardTable.$inferInsert;
export type Category = typeof categoriesTable.$inferInsert;
