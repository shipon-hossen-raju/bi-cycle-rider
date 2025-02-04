import { z } from "zod";

export const productZodSchema = z.object({
  body: z.object({
    productName: z.string().min(1, "Product name cannot be empty"),
    brandName: z.string().min(1, "brand name cannot be empty"),
    productTitle: z.string().min(1, "Product title cannot be empty"),
    description: z.string().min(1, "Description cannot be empty"),
    tags: z.string().min(1, "Description cannot be empty").optional(),
    productType: z.object({
      type: z.string().min(1, "Type cannot be empty"),
      subType: z.string().nullable().optional(),
    }),
    prices: z.object({
      regular: z
        .number({
          required_error: "Quantity is required.",
        })
        .int()
        .nonnegative("Quantity must be a non-negative integer."),
      sale: z
        .number({
          required_error: "Quantity is required.",
        })
        .int()
        .nonnegative("Quantity must be a non-negative integer."),
    }),
    thumbnail: z.string().url("Thumbnail must be a valid URL"),
    extraImages: z
      .array(z.string().url("Each extra image must be a valid URL"))
      .min(1, "At least one extra image is required"),
    quantity: z
      .number({
        required_error: "Quantity is required.",
      })
      .int()
      .nonnegative("Quantity must be a non-negative integer."),
    productStatus: z.enum(["active", "inActive"]),
  }),
});

export const productZodSchemaUpdate = z.object({
  body: z.object({
    productName: z.string().min(1, "Product name cannot be empty").optional(),
    brandName: z.string().min(1, "brand name cannot be empty").optional(),
    productTitle: z.string().min(1, "Product title cannot be empty").optional(),
    description: z.string().min(1, "Description cannot be empty").optional(),
    tags: z.string().min(1, "Description cannot be empty").optional(),
    productType: z
      .object({
        type: z.string().min(1, "Type cannot be empty").optional(),
        subType: z.string().nullable().optional().optional(),
      })
      .optional(),
    prices: z
      .object({
        regular: z
          .number({
            required_error: "Quantity is required.",
          })
          .int()
          .nonnegative("Quantity must be a non-negative integer.")
          .optional(),
        sale: z
          .number({
            required_error: "Quantity is required.",
          })
          .int()
          .nonnegative("Quantity must be a non-negative integer.")
          .optional(),
      })
      .optional(),
    thumbnail: z.string().url("Thumbnail must be a valid URL").optional(),
    extraImages: z
      .array(z.string().url("Each extra image must be a valid URL"))
      .min(1, "At least one extra image is required")
      .optional(),
    quantity: z
      .number({
        required_error: "Quantity is required.",
      })
      .int()
      .nonnegative("Quantity must be a non-negative integer.")
      .optional(),
    productStatus: z.enum(["active", "inActive"]).optional(),
  }),
});
