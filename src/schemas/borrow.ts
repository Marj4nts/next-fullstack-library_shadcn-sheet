import { z } from "zod";

export const borrowCreationSchema = z.object({
  userId: z.number(),
  bookId: z.number(),
  returnAt: z.string(),
});
