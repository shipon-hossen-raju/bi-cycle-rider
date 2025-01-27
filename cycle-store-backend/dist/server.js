"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// terminal clear
console.clear();
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
const config_1 = __importDefault(require("./config"));
const DB_1 = __importDefault(require("./DB"));
async function main() {
    try {
        await mongoose_1.default.connect(config_1.default.db_url);
        (0, DB_1.default)();
        app_1.default.listen(config_1.default.port, () => {
            console.log(`Example app listening on port ${config_1.default.port}`);
        });
    }
    catch (err) {
        console.log(err);
    }
}
main();
