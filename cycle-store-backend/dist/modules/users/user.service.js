"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const config_1 = __importDefault(require("../../config"));
const auth_utils_1 = require("../auth/auth.utils");
const user_constant_1 = require("./user.constant");
const user_model_1 = require("./user.model");
const createUserIntoDB = async (userData) => {
    const user = await user_model_1.User.create(userData);
    const jwtPayload = {
        _id: user._id,
        email: user.email,
        role: user.role,
    };
    const accessToken = (0, auth_utils_1.createToken)(jwtPayload, config_1.default.jwt_access_secret, { expiresIn: "2m" });
    const refreshToken = (0, auth_utils_1.createToken)(jwtPayload, config_1.default.jwt_refresh_secret, { expiresIn: "30d" });
    return {
        accessToken,
        refreshToken,
    };
};
const getAllUsers = async (query = {}) => {
    const usersQuery = new QueryBuilder_1.default(user_model_1.User.find(), query)
        .search(user_constant_1.userSearchFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const result = await usersQuery.modelQuery;
    const meta = await usersQuery.countTotal();
    return { result, meta };
};
const getSingleUser = async (id) => {
    return await user_model_1.User.findById(id);
};
exports.userService = {
    createUserIntoDB,
    getAllUsers,
    getSingleUser,
};
