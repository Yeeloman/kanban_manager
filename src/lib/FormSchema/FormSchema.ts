import { z } from 'zod';


export const boardAdderSchema = z.object({
    board_name: z.string().min(1, "Board name can't be empty"),
    board_columns: z.array(z.string().min(1, "Task can not be empty"))
});

export const boardEditorSchema = z.object({
    edit_bname: z.string().min(1, "Board name can't be empty"),
    edit_bcolumns: z.array(z.string().min(1, "Task can not be empty")),
    boardId: z.number(),
    categoryIds: z.array(z.number()),
    deleteCatIds: z.array(z.number()),
});

export const taskAdderSchema = z.object({
    task_name: z.string().min(1, "Task name can't be empty"),
    description: z.string().optional(),
    category_id: z.number(),
    subtasks: z.array(z.string().min(1, "Subtask can not be empty")).optional().default([]),
});

export const taskEditorSchema = z.object({
    taskId: z.number(),
    edit_tname: z.string().min(1, "Task name can't be empty"),
    edit_description: z.string().optional(),
    subTaskIds: z.array(z.number()).default([]),
    deletedSubs: z.array(z.number()).default([]),
    edit_subtasks: z.array(z.string()).default([]),
});

export const taskDisplayerSchema = z.object({
    status: z.enum(["TODO", "DOING", "DONE"]).default("TODO"),
    categoryId: z.number(),
    taskId: z.number(),
    subtasks: z.array(z.object({
        id: z.number(),
        done: z.boolean()
    })),
});

export const signInSchema = z.object({
    username: z.string().min(4, "Username must contain at least 4 characters"),
    password: z.string().min(8, "Password must contain at least 8 characters").regex(
        /^.*(\d+).*$/,
        "Password must contain at least one number"
    )
});

// export type signUpType = z.infer<typeof signUpSchema>
export const signUpSchema = z.object({
    username: z.string(),
    email: z.string().email(),
    password: z.string(),
    conf_pwd: z.string(),
}).refine(data => data.password === data.conf_pwd, {
    message: "Passwords do not match",
    path: ["conf_pwd"]
});


export const deleteTaskSchema = z.object({
    id: z.number(),
})
