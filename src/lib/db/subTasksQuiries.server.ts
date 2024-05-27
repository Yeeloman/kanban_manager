import db from "./db.server";
import { subTasksTable } from "./schema";
import type { SubTask } from "./schemaTypes";

export const createSubTask = async (subtasks: SubTask[])=> {
    return db
        .insert(subTasksTable)
        .values(subtasks)
        .returning()

};

export const createSubTaskHelper = (subTasks: string[], taskId: number) => {
    let subTasksObj = subTasks.map((subtaskname) => ({
        name: subtaskname,
        taskId: taskId
    }));
    return subTasksObj;
}
