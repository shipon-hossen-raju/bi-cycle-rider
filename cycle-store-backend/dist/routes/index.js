"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_routes_1 = require("../modules/product/product.routes");
const user_route_1 = require("../modules/users/user.route");
const auth_route_1 = require("../modules/auth/auth.route");
const payments_route_1 = require("../modules/payments/payments.route");
const addToCart_route_1 = require("../modules/addToCart/addToCart.route");
const appRouter = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: "/auth",
        route: auth_route_1.authRoute,
    },
    {
        path: "/users",
        route: user_route_1.UserRoutes,
    },
    {
        path: "/admin/products",
        route: product_routes_1.productRoute,
    },
    {
        path: "/payments",
        route: payments_route_1.paymentRoute,
    },
    {
        path: "/add-to-cart",
        route: addToCart_route_1.addToCartRoute,
    },
];
moduleRoutes.forEach((route) => appRouter.use(route.path, route.route));
exports.default = appRouter;
