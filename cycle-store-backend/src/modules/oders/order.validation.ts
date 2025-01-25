import { Types } from "mongoose";
import { z } from "zod";

export const orderZodSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email address format" })
    .trim()
    .toLowerCase(),
  product: z.custom<Types.ObjectId>((val) => Types.ObjectId.isValid(val), {
    message: "Invalid ObjectId",
  }),
  quantity: z
    .number({
      required_error: "Quantity is required",
      invalid_type_error: "Quantity must be a number",
    })
    .min(1, { message: "Quantity must be at least 1" }),
  totalPrice: z
    .number({
      required_error: "Total price is required",
      invalid_type_error: "Total price must be a number",
    })
    .nonnegative("Total price must be 0 or greater"),
});
