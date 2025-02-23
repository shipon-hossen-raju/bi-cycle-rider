"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addToCartService = void 0;
const product_service_1 = require("../product/product.service");
const addToCart_model_1 = __importDefault(require("./addToCart.model"));
const addToCart = async (data) => {
    const findProduct = await product_service_1.productService.getSpecificProducts(data.productId);
    if (!findProduct) {
        throw new Error('Product not found');
    }
    const existingCartItem = await addToCart_model_1.default.findOne({ userId: data.userId, productId: data.productId }).exec();
    if (existingCartItem) {
        existingCartItem.quantity += data.quantity;
        return await existingCartItem.save();
    }
    else {
        const cartItem = new addToCart_model_1.default(data);
        return await cartItem.save();
    }
};
const getCartItems = async (userId) => {
    return await addToCart_model_1.default.find({ userId }).exec();
};
const updateCartItem = async (cartItemId, quantity) => {
    return await addToCart_model_1.default.findByIdAndUpdate(cartItemId, { quantity }, { new: true }).exec();
};
const removeCartItem = async (cartItemId) => {
    return await addToCart_model_1.default.findByIdAndDelete(cartItemId).exec();
};
exports.addToCartService = {
    addToCart,
    getCartItems,
    updateCartItem,
    removeCartItem,
};
