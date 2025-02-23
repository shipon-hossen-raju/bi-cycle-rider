"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentValidation = void 0;
const zod_1 = require("zod");
exports.paymentValidation = zod_1.z.object({
    body: zod_1.z.object({
        userId: zod_1.z.string(),
        productId: zod_1.z.string(),
        paymentSystem: zod_1.z.enum(["online", "cashOnDelivery"]),
        name: zod_1.z.string(),
        phone: zod_1.z.string(),
        address: zod_1.z.string(),
    }),
});
