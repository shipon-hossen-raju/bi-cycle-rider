"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const cors_1 = __importDefault(require("cors"));
const globalErrorHandler_1 = __importDefault(require("./middlewares/globalErrorHandler"));
const notFound_1 = __importDefault(require("./middlewares/notFound"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({ origin: ["http://localhost:5173"], credentials: true }));
app.use("/api/v1", routes_1.default);
// product routes
// app.use("/api/products", productRoute);
// orders routes
// app.use("/api/orders", orderRoute);
// default route or root route
app.get("/", (req, res) => {
    res.send("Cycle store backend server running");
});
app.use(globalErrorHandler_1.default);
app.use(notFound_1.default);
exports.default = app;
