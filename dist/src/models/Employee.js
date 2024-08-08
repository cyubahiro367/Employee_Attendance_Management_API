"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Employee = void 0;
const mongoose_1 = require("mongoose");
const employeeSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    position: {
        type: String,
        required: true,
    },
    department: {
        type: String,
        required: true,
    },
    hireDate: {
        type: Date,
        required: true,
    },
    salary: {
        type: Number,
        required: true,
    },
    contactDetails: {
        type: String,
        required: true,
    },
}, { timestamps: true });
const Employee = (0, mongoose_1.model)('Employee', employeeSchema);
exports.Employee = Employee;
