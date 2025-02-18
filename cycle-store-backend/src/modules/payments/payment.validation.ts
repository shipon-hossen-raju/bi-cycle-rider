import { z } from "zod";

export const paymentValidation = z.object({
  body: z.object({
    userId: z.string(),
    productId: z.string(),
    paymentSystem: z.enum(["online", "cashOnDelivery"]),
    name: z.string(),
    phone: z.string(),
    address: z.string(),
  }),
});
