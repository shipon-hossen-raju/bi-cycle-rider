"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productService = void 0;
const product_model_1 = __importDefault(require("./product.model"));
// create product
const createProductDB = async (productData) => {
    const product = new product_model_1.default(productData);
    return await product.save();
};
// get all product
const getAllProducts = async (searchTerm) => {
    return await product_model_1.default.find(searchTerm
        ? {
            $or: [
                { name: { $regex: searchTerm, $options: "i" } },
                {
                    brand: { $regex: searchTerm, $options: "i" },
                },
                {
                    type: { $regex: searchTerm, $options: "i" },
                },
            ],
        }
        : {});
};
// get specific product
const getSpecificProducts = async (id) => {
    return await product_model_1.default.findOne({ _id: id });
};
const getSpecificProductUpdate = async (id, bodyData) => {
    const updateData = {};
    if (bodyData.price) {
        updateData.price = bodyData.price;
    }
    if (bodyData.quantity) {
        updateData.quantity = bodyData.quantity;
    }
    // specific product update
    const updated = await product_model_1.default.findOneAndUpdate({ _id: id }, updateData, {
        new: true,
    });
    return updated;
};
// get specific product update
const specificProductDelete = async (id) => {
    // specific product update
    const deleted = await product_model_1.default.deleteOne({ _id: id });
    return deleted;
};
exports.productService = {
    createProductDB,
    getAllProducts,
    getSpecificProducts,
    getSpecificProductUpdate,
    specificProductDelete,
};
