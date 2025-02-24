"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRoute = void 0;
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("./product.controller");
const validationRequest_1 = __importDefault(require("../../utils/validationRequest"));
const product_validation_1 = require("./product.validation");
const route = express_1.default.Router();
// product create or store route
route.post("/", (0, validationRequest_1.default)(product_validation_1.productZodSchema), product_controller_1.productController.productCreateDB);
// get all data
route.get("/", product_controller_1.productController.getAllProducts);
// get specific product data
route.get("/:productId", product_controller_1.productController.getSpecificProducts);
//  specific product data update
route.put("/:productId", (0, validationRequest_1.default)(product_validation_1.productZodSchemaUpdate), product_controller_1.productController.getSpecificProductUpdate);
//  specific product data delete
route.delete("/:productId", product_controller_1.productController.specificProductDelete);
exports.productRoute = route;
