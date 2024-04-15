import { z } from "zod";

export const bookCreationSchema = z.object({
  title: z.string(),
  author: z.string(),
  publisher: z.string(),
  published: z.string(),
  description: z.string(),
  pdf: z.string(),
  cover: z.string(),
});
