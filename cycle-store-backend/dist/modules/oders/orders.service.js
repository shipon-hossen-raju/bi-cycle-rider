"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderService = void 0;
const product_model_1 = __importDefault(require("../product/product.model"));
const order_model_1 = __importDefault(require("./order.model"));
const orderCreateDB = async (orderData) => {
    const order = new order_model_1.default(orderData);
    return await order.save();
};
const productQuantityUpdate = async (clientData) => {
    const productFind = await product_model_1.default.findById(clientData?.product);
    if (!productFind) {
        throw new Error("Product not found!");
    }
    // price checking
    const storeProductCalculate = productFind?.price * clientData.quantity;
    if (clientData.totalPrice < storeProductCalculate) {
        throw new Error(`Your price is low. Your price: ${clientData.totalPrice} but Our Product price: ${storeProductCalculate}`);
    }
    // product quantity checking
    if (productFind?.quantity < clientData.quantity) {
        throw new Error(`insufficient stock! `);
    }
    let productQuantityUpdated;
    if (productFind?.quantity >= 0) {
        productQuantityUpdated = await product_model_1.default.findOneAndUpdate({ _id: clientData.product }, {
            quantity: productFind?.quantity - clientData.quantity,
        }, { new: true });
    }
    else {
        productQuantityUpdated = await product_model_1.default.findOneAndUpdate({ _id: clientData.product }, {
            inStock: false,
        }, { new: true });
    }
    return {
        message: "product updated!",
        status: true,
        data: productQuantityUpdated,
    };
};
const revenueFindDB = async () => {
    const getTotalAmon = await order_model_1.default.aggregate([
        {
            $group: {
                _id: null,
                totalRevenue: { $sum: "$totalPrice" },
            },
        },
    ]);
    const totalRevenue = getTotalAmon.length > 0 ? getTotalAmon[0].totalRevenue : 0;
    return { totalRevenue };
};
exports.orderService = {
    orderCreateDB,
    productQuantityUpdate,
    revenueFindDB,
};
