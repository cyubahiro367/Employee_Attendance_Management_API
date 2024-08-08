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
exports.createEmployee = exports.getEmployees = void 0;
const Employee_1 = require("../models/Employee");
const getEmployees = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const employees = yield Employee_1.Employee.find();
        res.status(200).send(employees);
    }
    catch (error) {
        console.log("erros here", error);
        res.status(500).send(error);
    }
});
exports.getEmployees = getEmployees;
const createEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const employee = new Employee_1.Employee(req.body);
        yield employee.save();
        res.status(201).send(employee);
    }
    catch (error) {
        res.status(400).send(error);
    }
});
exports.createEmployee = createEmployee;
