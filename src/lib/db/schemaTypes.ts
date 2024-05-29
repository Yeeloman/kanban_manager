import {
    categoriesTable,
    dashBoardTable,
    usersTable,
    tasksTable,
    subTasksTable
} from "./schema";

export type newUser = typeof usersTable.$inferInsert;
export type DashBoard = typeof dashBoardTable.$inferInsert;
export type Category = typeof categoriesTable.$inferInsert;
export type Task = typeof tasksTable.$inferInsert;
export type SubTask = typeof subTasksTable.$inferInsert;

export type STATUS = "TODO" | "DOING" | "DONE" | null;
