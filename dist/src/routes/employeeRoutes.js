"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const employeeController_1 = require("../controllers/employeeController");
const router = express_1.default.Router();
router.post('/employees', employeeController_1.createEmployee);
router.get('/employees', employeeController_1.getEmployees);
router.get('/employees/:id', employeeController_1.getEmployeeById);
router.put('/employees/:id', employeeController_1.updateEmployee);
router.delete('/employees/:id', employeeController_1.deleteEmployee);
exports.default = router;
