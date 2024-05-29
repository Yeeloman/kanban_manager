import db from "./db.server";
import { subTasksTable } from "./schema";
import type { SubTask } from "./schemaTypes";
import { SQL, inArray, sql, eq } from 'drizzle-orm';

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

export const updateSubtask = async (subtasks: {id:number, done:boolean}[]) => {
    const sqlChunks: SQL[] = [];
    sqlChunks.push(sql`(case`);
    subtasks.forEach((subtask) => {
        sqlChunks.push(sql`when ${subTasksTable.id} = ${subtask.id} then ${subtask.done}`);
    })
    sqlChunks.push(sql`end)`);
    const finalSql: SQL = sql.join(sqlChunks, sql.raw(' '));
    const categoryIds = subtasks.map((category) => {
        return category.id
    })
    return await db
        .update(subTasksTable)
        .set({ done: finalSql })
        .where(inArray(subTasksTable.id, categoryIds))
        .returning();
};
