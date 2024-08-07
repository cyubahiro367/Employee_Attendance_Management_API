"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = parseInt(process.env.PORT || '3000', 10);
const databaseUrl = process.env.DATABASE_URL || '';
mongoose_1.default.connect(databaseUrl).then(() => {
    console.log(`App running at http://localhost:${port}`);
    app.listen(port);
}).catch((error) => {
    console.log(error);
});
app.use(express_1.default.json());
app.get('/', (res) => {
    res.send('Hello World! again');
});
