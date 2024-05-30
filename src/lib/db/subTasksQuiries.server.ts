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
export const createSubTaskArr = (subTasks: string[], ids: number[] ,taskId: number) => {
    let subTasksObj = subTasks.map((subtaskname, index) => ({
        id: ids[index],
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


export const updateSubtaskName = async (subtasks: SubTask[]) => {
    const sqlChunks: SQL[] = [];
    sqlChunks.push(sql`(case`);
    subtasks.forEach((subtask) => {
        sqlChunks.push(sql`when ${subTasksTable.id} = ${subtask.id} then ${subtask.name}`);
    })
    sqlChunks.push(sql`end)`);
    const finalSql: SQL = sql.join(sqlChunks, sql.raw(' '));
    const subIds = subtasks.map((sub) => sub.id)
    return await db
        .update(subTasksTable)
        .set({ name: finalSql })
        .where(inArray(subTasksTable.id, subIds as number[]))
        .returning();
};

export const deleteSubTask = async (ids: number[]) => {
    return await db
        .delete(subTasksTable)
        .where(inArray(subTasksTable.id, ids))
        .returning()
};
