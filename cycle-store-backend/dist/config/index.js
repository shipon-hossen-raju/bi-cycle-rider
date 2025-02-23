"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const nodeEnv = process.env.NODE_ENV || "development";
exports.default = {
    port: process.env.PORT,
    node_env: nodeEnv,
    db_url: process.env.DB_URL,
    bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
    jwt_access_secret: process.env.JWT_ACCESS_SECRET,
    jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
    jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN,
    jwt_refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,
    super_name: process.env.SUPER_NAME,
    super_email: process.env.SUPER_EMAIL,
    super_password: process.env.SUPER_PASSWORD,
    super_role: process.env.SUPER_ROLE,
    super_address: process.env.SUPER_ADDRESS,
    super_phone: process.env.SUPER_PHONE,
    paymentStoreId: process.env.STORE_ID || "bicyc67af5cf798849",
    paymentStorePassword: process.env.STORE_PASSWORD || "bicyc67af5cf798849@ssl",
    paymentIsLive: process.env.IS_LIVE || false,
    paymentRedirectUrl: nodeEnv === "production"
        ? process.env.PAYMENT_REDIRECT_URL
        : process.env.PAYMENT_REDIRECT_URL_PORD,
    frontendUrl: nodeEnv === "production"
        ? process.env.FRONTEND_URL_PORD
        : process.env.FRONTEND_URL,
};
