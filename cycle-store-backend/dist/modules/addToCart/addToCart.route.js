"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addToCartRoute = void 0;
const express_1 = require("express");
const addToCart_controller_1 = require("./addToCart.controller");
const route = (0, express_1.Router)();
route.post("/", addToCart_controller_1.addToCartController.addToCart);
exports.addToCartRoute = route;
