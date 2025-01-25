"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const order_routes_1 = require("./modules/oders/order.routes");
const product_routes_1 = require("./modules/product/product.routes");
const app = (0, express_1.default)();
app.use(express_1.default.json());
// product routes
app.use("/api/products", product_routes_1.productRoute);
// orders routes
app.use("/api/orders", order_routes_1.orderRoute);
// default route or root route
app.get("/", (req, res) => {
    res.send("Cycle store backend server running");
});
exports.default = app;
