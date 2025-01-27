"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = require("express");
const validationRequest_1 = __importDefault(require("../../utils/validationRequest"));
const user_controller_1 = require("./user.controller");
const user_validation_1 = require("./user.validation");
const router = (0, express_1.Router)();
// user registration
router.post("/registration", (0, validationRequest_1.default)(user_validation_1.createUserValidationSchema), user_controller_1.userController.createUser);
exports.UserRoutes = router;
