import { z } from 'zod';


export const boardAdderSchema = z.object({
    board_name: z.string().min(1, "Board name can't be empty"),
    board_columns: z.array(z.string().min(1, "Task can not be empty"))
});

export const boardEditorSchema = z.object({
    edit_bname: z.string().min(1, "Board name can't be empty"),
    edit_bcolumns: z.array(z.string().min(1, "Task can not be empty"))
});

export const taskAdderSchema = z.object({
    task_name: z.string().min(1, "Task name can't be empty"),
    description: z.string().optional(),
    subtasks: z.array(z.string().min(1, "Subtask can not be empty")).optional().default([]),
});

export const taskEditorSchema = z.object({
    edit_tname: z.string().min(1, "Task name can't be empty"),
    edit_description: z.string().optional(),
    edit_subtasks: z.array(z.string().min(1, "Subtask can not be empty")).optional().default([]),
});

export const taskDisplayerSchema = z.object({
    subtasks: z.array(z.boolean()),
    crnt_status: z.string()
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
    username: z.string().min(4, "Username must contain at least 4 characters"),
    email: z.string().email(),
    password: z.string().min(8, "Password must contain at least 8 characters").regex(
        /^.*(\d+).*$/,
        "Password must contain at least one number"
    ),
    conf_pwd: z.string(),
}).refine(data => data.password === data.conf_pwd, {
    message: "Passwords do not match",
    path: ["conf_pwd"]
});
