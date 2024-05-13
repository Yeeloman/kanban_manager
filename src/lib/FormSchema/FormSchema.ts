import { z } from 'zod';

export const boardAdderSchema = z.object({
    board_name: z.string().min(1, "Board name can't be empty"),
    board_columns: z.array(z.string().min(1, "Task can not be empty"))
});

export const boardEditorSchema = z.object({
    edit_bname: z.string().min(1, "Board name can't be empty"),
    edit_bcolumns: z.array(z.string().min(1, "Task can not be empty"))
});
