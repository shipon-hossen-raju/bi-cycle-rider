"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productZodSchema = void 0;
const zod_1 = require("zod");
exports.productZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        productName: zod_1.z.string().min(1, "Product name cannot be empty"),
        brandName: zod_1.z.string().min(1, "brand name cannot be empty"),
        productTitle: zod_1.z.string().min(1, "Product title cannot be empty"),
        description: zod_1.z.string().min(1, "Description cannot be empty"),
        productType: zod_1.z.object({
            type: zod_1.z.string().min(1, "Type cannot be empty"),
            subType: zod_1.z.string().nullable().optional(),
        }),
        prices: zod_1.z.object({
            regular: zod_1.z
                .number({
                required_error: "Quantity is required.",
            })
                .int()
                .nonnegative("Quantity must be a non-negative integer."),
            sale: zod_1.z
                .number({
                required_error: "Quantity is required.",
            })
                .int()
                .nonnegative("Quantity must be a non-negative integer."),
        }),
        thumbnail: zod_1.z.string().url("Thumbnail must be a valid URL"),
        extraImages: zod_1.z
            .array(zod_1.z.string().url("Each extra image must be a valid URL"))
            .min(1, "At least one extra image is required"),
        quantity: zod_1.z
            .number({
            required_error: "Quantity is required.",
        })
            .int()
            .nonnegative("Quantity must be a non-negative integer."),
        productStatus: zod_1.z.enum(["active", "inActive"]),
    }),
});
