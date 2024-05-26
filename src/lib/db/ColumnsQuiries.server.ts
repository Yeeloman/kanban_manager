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
