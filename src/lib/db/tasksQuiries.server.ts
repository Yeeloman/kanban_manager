import { eq } from "drizzle-orm";
import db from "./db.server";
import { tasksTable } from "./schema";
import type { Task, STATUS } from "./schemaTypes";


export const createTask = async (task: Task) => {
    return await db
        .insert(tasksTable)
        .values(task)
        .returning()
};

export const updateTask = async (task: {status: STATUS, categoryId: number, id: number}) => {
    return await db
        .update(tasksTable)
        .set({
            status: task.status,
            categoryId: task.categoryId
        })
        .where(eq(tasksTable.id, task.id))
        .returning()
};

export const updateTaskNameAndDescription = async (task: {
    id: number,
    name: string,
    description?: string
}) => {
    return await db
        .update(tasksTable)
        .set(task)
        .where(eq(tasksTable.id, task.id))
        .returning()
};

export const deleteTask = async (id: number) => {
    return await db
        .delete(tasksTable)
        .where(eq(tasksTable.id, id))
        .returning()
};
