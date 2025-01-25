"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productZodSchema = void 0;
const zod_1 = require("zod");
exports.productZodSchema = zod_1.z.object({
    name: zod_1.z
        .string()
        .trim()
        .min(3, { message: "Name must be at least 3 characters" }),
    price: zod_1.z
        .number({
        required_error: "Price is required.",
        invalid_type_error: "Price must be a number",
    })
        .positive("Price must be a positive number."),
    quantity: zod_1.z
        .number({
        required_error: "Quantity is required.",
        invalid_type_error: "Quantity must be a number",
    })
        .int()
        .nonnegative("Quantity must be a non-negative integer."),
    type: zod_1.z.enum(["Mountain", "Road", "Hybrid", "BMX", "Electric"], {
        message: "Type must be one of Mountain, Road, Hybrid, BMX, or Electric",
    }),
    inStock: zod_1.z.boolean(),
    brand: zod_1.z.string().min(1, { message: "Brand is required" }),
    description: zod_1.z.string().min(1, { message: "Description is required" }),
});
