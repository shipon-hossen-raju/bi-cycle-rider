import { z } from "zod";

export const createUserValidationSchema = z.object({
  body: z.object({
    name: z.string().max(30).min(1),
    email: z.string().email(),
    password: z.string(),
    phone: z.string(),
    address: z.string(),
  }),
});
