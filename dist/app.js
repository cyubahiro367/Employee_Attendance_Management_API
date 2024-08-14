"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const attendanceRoutes_1 = __importDefault(require("./src/routes/attendanceRoutes"));
const employeeRoutes_1 = __importDefault(require("./src/routes/employeeRoutes"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_1 = require("./swagger");
const errorHandler_1 = require("./src/middleware/errorHandler");
const body_parser_1 = __importDefault(require("body-parser"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const app_url = process.env.APP_URL || '';
const app_port = parseInt(process.env.APP_PORT || '3000', 10);
const databaseUrl = process.env.DATABASE_URL || '';
mongoose_1.default.connect(databaseUrl).then(() => {
    console.log(`App running at ${app_url}:${app_port}`);
    app.listen(app_port);
}).catch(() => {
    console.log("we found some errors");
});
app.use(body_parser_1.default.json());
app.use(errorHandler_1.errorHandler);
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.swaggerSpec));
app.use('/api', employeeRoutes_1.default);
app.use('/api', attendanceRoutes_1.default);
app.use('*', (req, res) => {
    res.status(404).json({ message: 'Route not found' });
});
