import { z } from 'zod';

export const boardAdderSchema = z.object({
    board_name: z.string().min(1, "Board name can't be empty"),
    board_columns: z.array(z.string().min(1, "Task can not be empty"))
});

export const boardEditorSchema = z.object({
    board_name: z.string().min(5),
    board_columns: z.array(z.string().min(10))
});
