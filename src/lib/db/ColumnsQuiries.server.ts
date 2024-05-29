import { SQL, inArray, sql, eq } from 'drizzle-orm';
import db from '@/db/db.server';
import type { Category } from './schemaTypes';
import { categoriesTable } from './schema';
import type { miniCategory } from '@/stores/stateManager';

export const createCategory = async (category: Category[]) => {
    return await db
        .insert((categoriesTable))
        .values(category)
        .returning()
}

export const createCategoryHelper = (categories: string[], boardId: number, categoriesId?: number[]) => {
    let categoriesObj = categories.map((categoryName, index) => ({
        id: categoriesId?.[index] ?? undefined,
        categoryName: categoryName,
        boardId: boardId
    }));
    return categoriesObj;
}

export const updateCategory = async (cat: {id:number, name:string}) => {
    return await db
        .update(categoriesTable)
        .set({categoryName: cat.name})
        .where(eq(categoriesTable.id, cat.id))
}

export const updateCategoryName = async (categories: {
    id: number,
    categoryName: string,
    boardId: number
}[]) => {
    const sqlChunks: SQL[] = [];
    sqlChunks.push(sql`(case`);
    categories.forEach((category) => {
        sqlChunks.push(sql`when ${categoriesTable.id} = ${category.id} then ${category.categoryName}`);
    })
    sqlChunks.push(sql`end)`);
    const finalSql: SQL = sql.join(sqlChunks, sql.raw(' '));
    const categoryIds = categories.map((category) => {
        return category.id
    })
    return await db
        .update(categoriesTable)
        .set({ categoryName: finalSql })
        .where(inArray(categoriesTable.id, categoryIds))
        .returning();
}


export const deleteCategoryById = async (categoryIds: number[]) => {
    return await db
        .delete(categoriesTable)
        .where(inArray(categoriesTable.id, categoryIds))
        .returning()
}
