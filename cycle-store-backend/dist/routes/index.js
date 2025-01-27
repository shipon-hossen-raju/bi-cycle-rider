"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const order_routes_1 = require("../modules/oders/order.routes");
const product_routes_1 = require("../modules/product/product.routes");
const user_route_1 = require("../modules/users/user.route");
const auth_route_1 = require("../modules/auth/auth.route");
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
        path: "/products",
        route: product_routes_1.productRoute,
    },
    {
        path: "/products",
        route: order_routes_1.orderRoute,
    },
];
moduleRoutes.forEach((route) => appRouter.use(route.path, route.route));
exports.default = appRouter;
