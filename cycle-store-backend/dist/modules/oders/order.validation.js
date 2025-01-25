"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderZodSchema = void 0;
const mongoose_1 = require("mongoose");
const zod_1 = require("zod");
exports.orderZodSchema = zod_1.z.object({
    email: zod_1.z
        .string()
        .email({ message: "Invalid email address format" })
        .trim()
        .toLowerCase(),
    product: zod_1.z.custom((val) => mongoose_1.Types.ObjectId.isValid(val), {
        message: "Invalid ObjectId",
    }),
    quantity: zod_1.z
        .number({
        required_error: "Quantity is required",
        invalid_type_error: "Quantity must be a number",
    })
        .min(1, { message: "Quantity must be at least 1" }),
    totalPrice: zod_1.z
        .number({
        required_error: "Total price is required",
        invalid_type_error: "Total price must be a number",
    })
        .nonnegative("Total price must be 0 or greater"),
});
