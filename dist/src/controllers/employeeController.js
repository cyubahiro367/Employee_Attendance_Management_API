"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEmployee = exports.updateEmployee = exports.getEmployeeById = exports.createEmployee = exports.getEmployees = void 0;
const Employee_1 = require("../models/Employee");
const getEmployees = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const employees = yield Employee_1.Employee.find();
        res.status(200).json(employees);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.getEmployees = getEmployees;
const createEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const employee = new Employee_1.Employee(req.body);
        yield employee.save();
        res.status(201).json({ message: 'Employee created successfully' });
    }
    catch (error) {
        res.status(400).json(error);
    }
});
exports.createEmployee = createEmployee;
const getEmployeeById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const employee = yield Employee_1.Employee.findById(req.params.id);
        res.status(200).json(employee);
    }
    catch (error) {
        res.status(500).json({ message: "Employee not found" });
    }
});
exports.getEmployeeById = getEmployeeById;
const updateEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Employee_1.Employee.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        res.status(200).json({ message: "Employee updated successfully" });
    }
    catch (error) {
        res.status(400).json({ message: "Employee not found" });
    }
});
exports.updateEmployee = updateEmployee;
const deleteEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Employee_1.Employee.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Employee deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Employee not found" });
    }
});
exports.deleteEmployee = deleteEmployee;
