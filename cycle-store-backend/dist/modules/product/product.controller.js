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
const getSpecificProducts = async (req, res) => {
    try {
        const { productId } = req.params;
        const getProducts = await product_service_1.productService.getSpecificProducts(productId);
        //   send data
        res.status(200).json({
            message: "Bicycle retrieved successfully",
            status: true,
            data: getProducts,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: "Something went wrong!",
            error: error,
        });
    }
};
// get all products
const getSpecificProductUpdate = async (req, res) => {
    try {
        const { productId } = req.params;
        const bodyData = req.body;
        const getProductUpdated = await product_service_1.productService.getSpecificProductUpdate(productId, bodyData);
        //   send data
        res.status(200).json({
            message: "Bicycle updated successfully",
            status: true,
            data: getProductUpdated,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: "Something went wrong!",
            error: error,
        });
    }
};
// get all products
const specificProductDelete = async (req, res) => {
    try {
        const { productId } = req.params;
        const productDeleted = await product_service_1.productService.specificProductDelete(productId);
        //   send data
        res.status(200).json({
            message: "Bicycle deleted successfully",
            status: true,
            data: productDeleted.deletedCount && {},
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: "Something went wrong!",
            error: error,
        });
    }
};
exports.productController = {
    productCreateDB,
    getAllProducts,
    getSpecificProducts,
    getSpecificProductUpdate,
    specificProductDelete,
};
