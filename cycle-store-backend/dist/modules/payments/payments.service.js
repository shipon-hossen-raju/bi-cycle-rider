"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentService = void 0;
// eslint-disable-next-line @typescript-eslint/no-var-requires
const sslcommerz_lts_1 = __importDefault(require("sslcommerz-lts"));
const config_1 = __importDefault(require("../../config"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const status_code_1 = __importDefault(require("../../utils/status.code"));
const product_service_1 = require("../product/product.service");
const user_service_1 = require("../users/user.service");
const payment_model_1 = require("./payment.model");
// single product payment
const makePayment = async (data) => {
    const { userId, productId } = data;
    // find user details find by userId
    const user = await user_service_1.userService.getSingleUser(userId);
    if (!user)
        throw new AppError_1.default(status_code_1.default.notFound, "User Not Found!");
    // find user details find by userId
    const productData = await product_service_1.productService.getSpecificProducts(productId);
    if (!productData)
        throw new AppError_1.default(status_code_1.default.notFound, "Product not found!");
    // generate unique tran_id
    const tranId = `${new Date().getTime().toString()}`;
    const totalAmount = Number(productData?.prices.sale);
    const dataPayment = {
        total_amount: totalAmount,
        currency: "BDT",
        tran_id: tranId, // use unique tran_id for each api call
        success_url: `${config_1.default.paymentRedirectUrl}/success/${tranId}`,
        fail_url: `${config_1.default.paymentRedirectUrl}/fail/${tranId}`,
        cancel_url: `${config_1.default.paymentRedirectUrl}/cancel/${tranId}`,
        ipn_url: `${config_1.default.paymentRedirectUrl}/ipn/${tranId}`,
        shipping_method: "Courier",
        product_name: "Computer.",
        product_category: "Electronic",
        product_profile: "general",
        cus_name: user.name,
        cus_email: user.email,
        cus_add1: user.address,
        cus_add2: "Dhaka",
        cus_city: "Dhaka",
        cus_state: "Dhaka",
        cus_postcode: "1000",
        cus_country: "Bangladesh",
        cus_phone: user.phone,
        cus_fax: "01711111111",
        ship_name: data.name,
        ship_add1: data.address,
        ship_add2: "Dhaka",
        ship_city: "Dhaka",
        ship_state: "Dhaka",
        ship_postcode: 1000,
        ship_country: "Bangladesh",
    };
    try {
        const sslcz = new sslcommerz_lts_1.default(config_1.default.paymentStoreId, config_1.default.paymentStorePassword, config_1.default.paymentIsLive);
        // Await the initialization of the payment
        const apiResponse = await sslcz.init(dataPayment);
        // Redirect the user to payment gateway
        let GatewayPageURL = apiResponse.GatewayPageURL;
        // Return the data
        return {
            GatewayPageURL,
            user,
            productData,
            tranId,
        };
    }
    catch (error) {
        console.error("Payment initialization failed:", error.message);
        throw new AppError_1.default(status_code_1.default.internalServerError, "Payment initialization failed");
    }
};
// payment success paymentStatus update
const paymentSuccess = async (tranId) => {
    const paymentData = await payment_model_1.paymentOrder.findOne({ tranId }, { paymentStatus: 1 });
    if (!paymentData)
        throw new AppError_1.default(status_code_1.default.notFound, "Payment not found!");
    if (paymentData.paymentStatus === "pending") {
        const payment = await payment_model_1.paymentOrder.findOneAndUpdate({ tranId }, { paymentStatus: "successful" }, { new: true });
        return payment;
    }
    else {
        throw new AppError_1.default(status_code_1.default.badRequest, "Payment already successful");
    }
};
// payment failed paymentStatus update
const paymentFailed = async (tranId) => {
    const paymentData = await payment_model_1.paymentOrder.findOne({ tranId }, { paymentStatus: 1 });
    if (!paymentData)
        throw new AppError_1.default(status_code_1.default.notFound, "Payment not found!");
    if (paymentData.paymentStatus === "pending") {
        const payment = await payment_model_1.paymentOrder.findOneAndUpdate({ tranId }, { paymentStatus: "failed" }, { new: true });
        return payment;
    }
    else {
        throw new AppError_1.default(status_code_1.default.badRequest, "Payment already successful"); // write right ans
    }
};
// payment cancel paymentStatus update
const paymentCancel = async (tranId) => {
    const paymentData = await payment_model_1.paymentOrder.findOne({ tranId }, { paymentStatus: 1 });
    if (!paymentData)
        throw new AppError_1.default(status_code_1.default.notFound, "Payment not found!");
    if (paymentData.paymentStatus === "pending") {
        const payment = await payment_model_1.paymentOrder.findOneAndUpdate({ tranId }, { paymentStatus: "cancel" }, { new: true });
        return payment;
    }
    throw new AppError_1.default(status_code_1.default.badRequest, "Payment already successful");
};
const orderStore = async (data) => {
    const product = new payment_model_1.paymentOrder(data);
    return await product.save();
};
const findPaymentData = async (data) => {
    return await payment_model_1.paymentOrder.findOne(data);
};
exports.paymentService = {
    makePayment,
    orderStore,
    findPaymentData,
    paymentSuccess,
    paymentFailed,
    paymentCancel,
};
