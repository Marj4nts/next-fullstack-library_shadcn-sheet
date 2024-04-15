import { z } from "zod";

export const userCreationSchema = z.object({
  name: z.string().optional(),
  email: z.string().email(),
  address: z.string(),
  username: z.string(),
  password: z.string(),
  role: z.enum(["user", "admin", "operator"]).default("user"),
});
