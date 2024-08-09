"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerSpec = void 0;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app_url = process.env.APP_URL || '';
const app_port = parseInt(process.env.APP_PORT || '3000', 10);
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Employee Attendance Management API',
            version: '1.0.0',
            description: 'API documentation for the Employee Attendance Management system',
        },
        servers: [
            {
                url: `${app_url}:${app_port}`,
            },
        ],
    },
    apis: ['./src/controllers/*.ts'],
};
const swaggerSpec = (0, swagger_jsdoc_1.default)(options);
exports.swaggerSpec = swaggerSpec;
