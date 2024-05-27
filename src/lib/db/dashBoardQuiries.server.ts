import db from '@/db/db.server';
import {
    dashBoardTable,
} from './schema';
import type {
    DashBoard,
} from './schemaTypes';
import { asc, eq, ne } from 'drizzle-orm';


export const createDashBoard = async (dashboard: DashBoard) => {
    return await db
        .insert(dashBoardTable)
        .values(dashboard)
        .returning();
}

export const getAllBoards = async () => {
    return await db
        .query
        .dashBoardTable
        .findMany({
            orderBy: [asc(dashBoardTable.id)],
            with: {
                category: {
                    with: {
                        tasks: {
                            with: {
                                subtasks: true
                            }
                        }
                    }
                }
            }
        })
};

export const getActiveBoard = async () => {
    return await db
        .query
        .dashBoardTable
        .findFirst({
            where: (dashBoardTable, { eq }) => eq(dashBoardTable.active, true),
            with: {
                category: {
                    with: {
                        tasks: {
                            with: {
                                subtasks: true
                            }
                        }
                    }
                }
            }
        })
};

export const getBoardById = async (boardId: number) => {
    return await db
        .query
        .dashBoardTable
        .findFirst({
            where: (dashBoardTable, { eq }) => eq(dashBoardTable.id, boardId),
            with: {
                category: {
                    with: {
                        tasks: {
                            with: {
                                subtasks: true
                            }
                        }
                    }
                }
            }
        })
}

export const setActiveBoard = async (boardId: number) => {
    await db
        .update(dashBoardTable)
        .set({ active: false })
        .where(ne(dashBoardTable.id, boardId))
    return await db
        .update(dashBoardTable)
        .set({ active: true })
        .where(eq(dashBoardTable.id, boardId))
        .returning()
};

export const editBoardName = async (boardId: number, name: string) => {
    return await db
        .update(dashBoardTable)
        .set({
            boardName: name
        })
        .where(eq(dashBoardTable.id, boardId))
        .returning()
}
