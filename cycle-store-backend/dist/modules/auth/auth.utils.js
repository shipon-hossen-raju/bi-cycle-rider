"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.createToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// export const createToken = (
//   jwtPayload: { email: string; role: string },
//   secret: string,
//   expiresIn = "1d",
// ): string => {
//   // if (jwtPayload && secret && expiresIn) {
//   return jwt.sign(jwtPayload, secret, {
//     expiresIn: expiresIn,
//   });
//   // }
// };
const createToken = (jwtPayload, secret, expiresIn = {}) => {
    return jsonwebtoken_1.default.sign(jwtPayload, secret, expiresIn);
};
exports.createToken = createToken;
const verifyToken = (token, secret) => {
    return jsonwebtoken_1.default.verify(token, secret);
};
exports.verifyToken = verifyToken;
