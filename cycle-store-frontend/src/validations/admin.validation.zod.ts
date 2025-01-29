import { z } from "zod";

export const addProductFormSchema = z.object({
  productName: z.string().nonempty({
    message: "Product name is required.",
  }),
  productTitle: z
    .string()
    .min(2, {
      message: "Product title must be at least 2 characters.",
    })
    .nonempty({
      message: "Product title is required.",
    }),
  description: z
    .string()
    .min(10, {
      message: "Description must be at least 10 characters.",
    })
    .nonempty({
      message: "Description is required.",
    }),
  pricesRegular: z.number().min(0, {
    message: "Regular price must be a positive number.",
  }),
  pricesSale: z
    .number()
    .min(0, {
      message: "Sale price must be a positive number.",
    })
    .positive("Sale price must be positive"),
  tags: z.string().nonempty({
    message: "Tags are required.",
  }),
  brandName: z.string().nonempty({
    message: "Tags are required.",
  }),
  quantity: z
    .number()
    .min(0, {
      message: "quantity must be a positive number.",
    })
    .positive("quantity must be positive"),
});
