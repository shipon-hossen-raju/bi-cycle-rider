"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const status_code_1 = __importDefault(require("../../utils/status.code"));
const auth_service_1 = require("./auth.service");
const loginUser = (0, catchAsync_1.default)(async (req, res) => {
    console.log("req.body ", req.body);
    const result = await auth_service_1.authService.loginUser(req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: status_code_1.default.ok,
        message: "login success",
        data: result,
    });
});
exports.authController = { loginUser };
