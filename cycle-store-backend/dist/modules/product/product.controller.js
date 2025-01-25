"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productController = void 0;
const product_service_1 = require("./product.service");
const product_validation_1 = require("./product.validation");
// product create or store controller
const productCreateDB = async (req, res) => {
    try {
        const clientData = req.body;
        const zodParseData = product_validation_1.productZodSchema.parse(clientData);
        const createdResult = await product_service_1.productService.createProductDB(zodParseData);
        //   send data
        res.status(200).json({
            success: true,
            message: "Bicycle created successfully",
            data: createdResult,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: "Validation failed",
            error: error,
        });
    }
};
// get all products
const getAllProducts = async (req, res) => {
    try {
        const { searchTerm } = req.query;
        const getProducts = await product_service_1.productService.getAllProducts(searchTerm);
        //   send data
        res.status(200).json({
            message: "Bicycles retrieved successfully",
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
