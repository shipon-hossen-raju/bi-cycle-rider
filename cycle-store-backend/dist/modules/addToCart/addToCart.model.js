"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const addToCartSchema = new mongoose_1.Schema({
    userId: { type: String, required: true },
    quantity: { type: Number, required: true },
    productId: { type: String, required: true },
}, {
    timestamps: true,
});
const AddToCart = (0, mongoose_1.model)("addToCart", addToCartSchema);
exports.default = AddToCart;
