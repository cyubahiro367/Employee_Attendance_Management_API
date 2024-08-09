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
        res.status(500).json({ message: '"An error occurred while fetching the employees' });
    }
});
exports.getEmployees = getEmployees;
const createEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, position, department, hireDate, salary, contactDetails } = req.body;
        const newEmployee = new Employee_1.Employee({
            name,
            position,
            department,
            hireDate,
            salary,
            contactDetails,
        });
        yield newEmployee.save();
        res.status(201).json({ message: "Employee created successfully" });
    }
    catch (error) {
        res.status(400).json({ message: "An error occurred while creating the employee" });
    }
});
exports.createEmployee = createEmployee;
const getEmployeeById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            res.status(400).json({ message: "Invalid employee ID format" });
            return;
        }
        const updatedEmployee = yield Employee_1.Employee.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!updatedEmployee) {
            res.status(404).json({ message: "Employee not found" });
            return;
        }
        const employee = yield Employee_1.Employee.findById(req.params.id);
        res.status(200).json(employee);
    }
    catch (error) {
        res.status(500).json({ message: "An error occurred while fetching the employee" });
    }
});
exports.getEmployeeById = getEmployeeById;
const updateEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            res.status(400).json({ message: "Invalid employee ID format" });
            return;
        }
        const updatedEmployee = yield Employee_1.Employee.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!updatedEmployee) {
            res.status(404).json({ message: "Employee not found" });
            return;
        }
        res.status(200).json({ message: "Employee updated successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "An error occurred while updating the employee" });
    }
});
exports.updateEmployee = updateEmployee;
const deleteEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            res.status(400).json({ message: "Invalid employee ID format" });
            return;
        }
        const deletedEmployee = yield Employee_1.Employee.findByIdAndDelete(id);
        if (!deletedEmployee) {
            res.status(404).json({ message: 'Employee not found' });
            return;
        }
        res.status(200).json({ message: "Employee deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "An error occurred while deleting the employee" });
    }
});
exports.deleteEmployee = deleteEmployee;
