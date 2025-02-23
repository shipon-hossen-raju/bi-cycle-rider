"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const status_code_1 = __importDefault(require("../../utils/status.code"));
const product_service_1 = require("./product.service");
// product create or store controller
const productCreateDB = (0, catchAsync_1.default)(async (req, res) => {
    const clientData = req.body;
    const newProduct = {
        ...req.body,
    };
    const createdResult = await product_service_1.productService.createProductDB(newProduct);
    // const createdResult = clientData;
    (0, sendResponse_1.default)(res, {
        statusCode: status_code_1.default.ok,
        success: true,
        message: "Bicycle created successfully",
        data: createdResult || {},
    });
});
// get all products
const getAllProducts = (0, catchAsync_1.default)(async (req, res) => {
    const getProducts = await product_service_1.productService.getAllProducts(req.query);
    (0, sendResponse_1.default)(res, {
        message: "Bicycles retrieved successfully",
        statusCode: status_code_1.default.ok,
        data: getProducts.result,
        success: true,
        meta: getProducts.meta,
    });
});
// get all products
const getSpecificProducts = (0, catchAsync_1.default)(async (req, res) => {
    const { productId } = req.params;
    const getProducts = await product_service_1.productService.getSpecificProducts(productId);
    (0, sendResponse_1.default)(res, {
        message: "Bicycle retrieved successfully",
        statusCode: status_code_1.default.ok,
        success: true,
        data: getProducts,
    });
});
// get all products
const getSpecificProductUpdate = (0, catchAsync_1.default)(async (req, res) => {
    const { productId } = req.params;
    const bodyData = { ...req.body, ratings: [], reviews: [] };
    const getProductUpdated = await product_service_1.productService.getSpecificProductUpdate(productId, bodyData);
    //   send data
    (0, sendResponse_1.default)(res, {
        message: "Bicycle updated successfully",
        statusCode: status_code_1.default.ok,
        success: true,
        data: getProductUpdated,
    });
});
// get all products
const specificProductDelete = (0, catchAsync_1.default)(async (req, res) => {
    const { productId } = req.params;
    const productDeleted = await product_service_1.productService.specificProductDelete(productId);
    (0, sendResponse_1.default)(res, {
        message: "Bicycle deleted successfully",
        success: true,
        statusCode: status_code_1.default.ok,
        data: productDeleted && {},
    });
});
exports.productController = {
    productCreateDB,
    getAllProducts,
    getSpecificProducts,
    getSpecificProductUpdate,
    specificProductDelete,
};
