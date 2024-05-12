import { z } from 'zod';

export const boardAdderSchema = z.object({
    board_name: z.string().min(5),
    board_columns: z.array(z.string())
});
