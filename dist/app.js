"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const employeeRoutes_1 = __importDefault(require("./src/routes/employeeRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = parseInt(process.env.PORT || '3000', 10);
const databaseUrl = process.env.DATABASE_URL || '';
mongoose_1.default.connect(databaseUrl).then(() => {
    console.log(`App running at http://localhost:${port}`);
    app.listen(port);
}).catch(() => {
    console.log("we found some errors");
});
app.use(express_1.default.json());
app.use('/api', employeeRoutes_1.default);
