// where you should define the tables for drizzle
import { relations } from "drizzle-orm";
import {
    pgTable,
    text,
    varchar,
    timestamp,
    serial,
    integer,
    boolean,
    pgEnum
} from "drizzle-orm/pg-core";


export const usersTable = pgTable('users', {
    id: text('id').primaryKey().notNull(),

    username: varchar('username', { length: 255 }).notNull().unique(),

    email: varchar('email', { length: 255 }).unique().notNull(),

    password: varchar('password', { length: 255 }).notNull(),
});

export const sessionTable = pgTable('sessions', {
	id: text('id').primaryKey().notNull(),

	userId: text('user_id')
		.notNull()
		.references(() => usersTable.id),

	expiresAt: timestamp('expires_at').notNull()
});

//? it work like this const var_name = relations(which_table_these_relations_belongs_to,...)
export const userRelations = relations(usersTable, ({ many })=>({
    dashbords: many(dashBoardTable)
}))

export const dashBoardTable = pgTable('dashboard', {
    id: serial('id').primaryKey().notNull(),

    boardName: varchar('board_name', { length: 255 })
        .notNull()
        .unique(),

    active: boolean('active')
        .default(false),

    userId: text('user_id')
        .notNull()
        .references(() => usersTable.id, {onDelete: 'cascade'}),
})

export const dashBoardRelations = relations(dashBoardTable, ({ one, many }) => ({

    user: one(usersTable, {
        fields: [dashBoardTable.userId],
        references: [usersTable.id]
    }),

    category: many(categoriesTable)
}));

export const categoriesTable = pgTable('category', {
    id: serial('id')
        .primaryKey()
        .notNull(),

    categoryName: text('category_name')
        .notNull(),

    boardId: integer('board_id')
        .notNull()
        .references(() => dashBoardTable.id, { onDelete: 'cascade'}),
});

export const categoriesRelations = relations(categoriesTable, ({ one, many }) => ({
    dashbord: one(dashBoardTable, {
        fields: [categoriesTable.boardId],
        references: [dashBoardTable.id]
    }),

    tasks: many(tasksTable)
}));

export const statusEnum = pgEnum('status', ['TODO', "DOING", "DONE"]);

export const tasksTable = pgTable('task', {
    id: serial('id')
        .notNull()
        .primaryKey(),

    name: text('name')
        .notNull(),

    description: text('description')
        .default(""),

    status: statusEnum('status')
        .default("TODO"),

    categoryId: integer('category_id')
        .notNull()
        .references(()=>categoriesTable.id, { onDelete: 'cascade'})
});

export const tasksRelations = relations(tasksTable, ({ one, many})=>({
    category: one(categoriesTable, {
        fields: [tasksTable.categoryId],
        references: [categoriesTable.id]
    }),

    subtasks: many(subTasksTable),
}));

export const subTasksTable = pgTable('subtask', {
    id: serial('id')
        .primaryKey()
        .notNull(),

    done: boolean('done')
        .default(false),

    taskId: integer('task_id')
        .notNull()
        .references(()=>tasksTable.id),
});

export const subTasksRelations = relations(subTasksTable, ({ one })=>({
    task: one(tasksTable, {
        fields: [subTasksTable.taskId],
        references: [tasksTable.id]
    })
}));
