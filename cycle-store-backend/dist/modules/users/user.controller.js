"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const status_code_1 = __importDefault(require("../../utils/status.code"));
const user_service_1 = require("./user.service");
const createUser = (0, catchAsync_1.default)(async (req, res) => {
    const userData = req.body;
    const result = await user_service_1.userService.createUserIntoDB(userData);
    (0, sendResponse_1.default)(res, {
        statusCode: status_code_1.default.ok,
        message: "user is created successfully",
        success: true,
        data: result,
    });
});
const findAllUsers = (0, catchAsync_1.default)(async (req, res) => {
    const getUsers = await user_service_1.userService.getAllUsers(req.query);
    (0, sendResponse_1.default)(res, {
        message: "User retrieved successfully",
        statusCode: status_code_1.default.ok,
        success: true,
        data: getUsers.result,
        meta: getUsers.meta
    });
});
const findUser = (0, catchAsync_1.default)(async (req, res) => {
    const { userId } = req.params;
    const getUser = await user_service_1.userService.getSingleUser(userId);
    (0, sendResponse_1.default)(res, {
        message: "User retrieved successfully",
        statusCode: status_code_1.default.ok,
        success: true,
        data: getUser,
    });
});
exports.userController = {
    createUser,
    findAllUsers,
    findUser,
};
