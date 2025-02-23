"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentController = void 0;
const config_1 = __importDefault(require("../../config"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const status_code_1 = __importDefault(require("../../utils/status.code"));
const payments_service_1 = require("./payments.service");
const productOder = (0, catchAsync_1.default)(async (req, res) => {
    const bodyData = req.body;
    let payment;
    if (bodyData.paymentSystem === "online") {
        payment = await payments_service_1.paymentService.makePayment(bodyData);
        if (!payment) {
            throw new AppError_1.default(status_code_1.default.badGateway, "Payment Failed!");
        }
    }
    let orderStoreData = {
        paymentStatus: "pending",
        orderStatus: "processing",
        productId: bodyData.productId,
        userId: bodyData.userId,
        tranId: payment ? payment.tranId : null,
        paymentSystem: bodyData.paymentSystem,
        address: bodyData.name,
        name: bodyData.name,
        phone: bodyData.phone,
    };
    const orderStore = await payments_service_1.paymentService.orderStore(orderStoreData);
    if (!orderStore)
        throw new AppError_1.default(status_code_1.default.badGateway, "payment store failed");
    const orderStoreDoc = orderStore?._doc;
    const fData = { ...orderStoreDoc, gatewayPageURL: payment.GatewayPageURL };
    console.log(" fData ", fData);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: status_code_1.default.created,
        message: "Order completed",
        data: fData,
    });
});
const paymentSuccess = (0, catchAsync_1.default)(async (req, res) => {
    const { tranId } = req.params;
    if (tranId) {
        const paymentDetails = await payments_service_1.paymentService.paymentSuccess(tranId);
        if (!paymentDetails)
            throw new AppError_1.default(status_code_1.default.badGateway, "Payment not found!");
        // redirect to success page
        res.redirect(`${config_1.default.frontendUrl}/payment/success/${tranId}`);
    }
    else {
        throw new AppError_1.default(status_code_1.default.badRequest, "TranId required");
    }
});
const paymentFailed = (0, catchAsync_1.default)(async (req, res) => {
    const { tranId } = req.params;
    if (tranId) {
        const paymentDetails = await payments_service_1.paymentService.paymentFailed(tranId);
        if (!paymentDetails)
            throw new AppError_1.default(status_code_1.default.badGateway, "Payment not found!");
        // redirect to failed page
        res.redirect(`${config_1.default.frontendUrl}/payment/failed/${tranId}`);
    }
    else {
        throw new AppError_1.default(status_code_1.default.badRequest, "TranId required");
    }
});
const paymentCancel = (0, catchAsync_1.default)(async (req, res) => {
    const { tranId } = req.params;
    if (tranId) {
        const paymentDetails = await payments_service_1.paymentService.paymentCancel(tranId);
        if (!paymentDetails)
            throw new AppError_1.default(status_code_1.default.badGateway, "Payment not found!");
        // redirect to cancel page
        res.redirect(`${config_1.default.frontendUrl}/payment/cancel/${tranId}`);
    }
    else {
        throw new AppError_1.default(status_code_1.default.badRequest, "TranId required");
    }
});
exports.paymentController = {
    productOder,
    paymentSuccess,
    paymentFailed,
    paymentCancel,
};
