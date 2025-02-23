"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productService = void 0;
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const product_constant_1 = require("./product.constant");
const product_model_1 = __importDefault(require("./product.model"));
// create product
const createProductDB = async (productData) => {
    const product = new product_model_1.default(productData);
    return await product.save();
};
// get all product
const getAllProducts = async (query = {}) => {
    const productsQuery = new QueryBuilder_1.default(product_model_1.default.find(), query)
        .search(product_constant_1.ProductSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const result = await productsQuery.modelQuery;
    const meta = await productsQuery.countTotal();
    return { result, meta };
};
// get specific product
const getSpecificProducts = async (id) => {
    return await product_model_1.default.findOne({ _id: id });
};
// get specific product update
const getSpecificProductUpdate = async (id, bodyData) => {
    const updatedProduct = await product_model_1.default.findByIdAndUpdate(id, bodyData, {
        new: true,
        runValidators: true,
    });
    return updatedProduct;
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
