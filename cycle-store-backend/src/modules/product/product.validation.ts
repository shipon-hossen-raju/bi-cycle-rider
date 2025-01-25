import { z } from "zod";

export const productZodSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, { message: "Name must be at least 3 characters" }),
  price: z
    .number({
      required_error: "Price is required.",
      invalid_type_error: "Price must be a number",
    })
    .positive("Price must be a positive number."),
  quantity: z
    .number({
      required_error: "Quantity is required.",
      invalid_type_error: "Quantity must be a number",
    })
    .int()
    .nonnegative("Quantity must be a non-negative integer."),
  type: z.enum(["Mountain", "Road", "Hybrid", "BMX", "Electric"], {
    message: "Type must be one of Mountain, Road, Hybrid, BMX, or Electric",
  }),
  inStock: z.boolean(),
  brand: z.string().min(1, { message: "Brand is required" }),
  description: z.string().min(1, { message: "Description is required" }),
});
