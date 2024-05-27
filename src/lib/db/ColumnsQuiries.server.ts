import { SQL, inArray, sql } from 'drizzle-orm';
import db from '@/db/db.server';
import type { Category } from './schemaTypes';
import { categoriesTable } from './schema';

export const createCategory = async (category: Category[]) => {
    return await db
        .insert((categoriesTable))
        .values(category)
        .returning()
}

export const createCategoryHelper = (categories: string[], boardId: number) => {
    let categoriesObj = categories.map((categoryName) => ({
        categoryName: categoryName,
        boardId: boardId
    }));
    return categoriesObj;
}

export const updateCategoryName = async (categoryIds: number[], categoryNames: string[]) => {
    const sqlChunks: SQL[] = [];
    sqlChunks.push(sql`(case`);
    categoryIds.forEach((categoryId, index) => {
        sqlChunks.push(sql`when ${categoriesTable.id} = ${categoryId} then ${categoryNames[index]}`);
    })
    sqlChunks.push(sql`end)`);
    const finalSql: SQL = sql.join(sqlChunks, sql.raw(' '));
    return await db
        .update(categoriesTable)
        .set({ categoryName: finalSql })
        .where(inArray(categoriesTable.id, categoryIds))
        .returning();
}
