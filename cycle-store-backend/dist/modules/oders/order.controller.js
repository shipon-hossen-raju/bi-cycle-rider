"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderController = void 0;
const order_validation_1 = require("./order.validation");
const orders_service_1 = require("./orders.service");
// product create or store controller
const createOrder = async (req, res) => {
    try {
        const clientData = req.body;
        const orderParseData = order_validation_1.orderZodSchema.parse(clientData);
        //   product update
        const productUpdate = await orders_service_1.orderService.productQuantityUpdate(orderParseData);
        let createdResult;
        if (productUpdate?.status) {
            createdResult = await orders_service_1.orderService.orderCreateDB(clientData);
        }
        //
        // send data
        res.status(200).json(productUpdate.status
            ? {
                success: true,
                message: "Order created successfully",
                data: createdResult,
            }
            : productUpdate);
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error instanceof Error ? error?.message : "Something went wrong!",
            error: error,
        });
    }
};
// revenueFindDB
const revenueFind = async (req, res) => {
    try {
        //   product update
        const revenued = await orders_service_1.orderService.revenueFindDB();
        // send data
        res.status(200).json({
            success: true,
            message: "Revenue calculated successfully",
            data: revenued,
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
exports.orderController = { createOrder, revenueFind };
