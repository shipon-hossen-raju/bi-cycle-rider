"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentRoute = void 0;
const express_1 = require("express");
const payments_controller_1 = require("./payments.controller");
const validationRequest_1 = __importDefault(require("../../utils/validationRequest"));
const payment_validation_1 = require("./payment.validation");
const route = (0, express_1.Router)();
// product order payment
route.post("/order", (0, validationRequest_1.default)(payment_validation_1.paymentValidation), payments_controller_1.paymentController.productOder);
route.post("/success/:tranId", payments_controller_1.paymentController.paymentSuccess);
route.post("/fail/:tranId", payments_controller_1.paymentController.paymentFailed);
route.post("/cancel/:tranId", payments_controller_1.paymentController.paymentCancel);
exports.paymentRoute = route;
