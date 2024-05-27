import db from "./db.server";
import { tasksTable } from "./schema";
import type { Task } from "./schemaTypes";

export const createTask = async (task: Task) => {
    console.log("🚀 ~ createTask ~ task:", task)
    return await db
        .insert(tasksTable)
        .values(task)
        .returning()
};
