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
exports.deleteAttendanceById = exports.updateAttendanceById = exports.getAttendanceById = exports.createAttendance = exports.getAttendances = void 0;
const Attendance_1 = require("../models/Attendance");
const Employee_1 = require("../models/Employee");
const getAttendances = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const employees = yield Attendance_1.Attendance.find();
        res.status(200).json(employees);
    }
    catch (error) {
        res
            .status(500)
            .json({ message: '"An error occurred while fetching the employees' });
    }
});
exports.getAttendances = getAttendances;
const createAttendance = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { employeeId, date, clockInTime, clockOutTime } = req.body;
        if (!employeeId.match(/^[0-9a-fA-F]{24}$/)) {
            res.status(400).json({ message: "Invalid employee ID format" });
            return;
        }
        const employee = yield Employee_1.Employee.findById(employeeId);
        if (!employee) {
            res.status(404).json({ message: 'Employee not found' });
            return;
        }
        const attendance = new Attendance_1.Attendance({
            employeeId,
            date,
            clockInTime,
            clockOutTime,
        });
        yield attendance.save();
        res.status(201).json({ message: "Attendance recorded successfully" });
    }
    catch (error) {
        console.log(error);
        res
            .status(500)
            .json({ message: "An error occurred while recording attendance" });
    }
});
exports.createAttendance = createAttendance;
const getAttendanceById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            res.status(400).json({ message: "Invalid attendance ID format" });
            return;
        }
        const attendance = yield Attendance_1.Attendance.findById(id).populate('employeeId');
        if (!attendance) {
            res.status(404).json({ message: 'Attendance record not found' });
            return;
        }
        res.status(200).json(attendance);
    }
    catch (error) {
        res.status(500).json({ message: 'An error occurred while fetching attendance' });
    }
});
exports.getAttendanceById = getAttendanceById;
const updateAttendanceById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            res.status(400).json({ message: "Invalid attendance ID format" });
            return;
        }
        const updatedAttendance = yield Attendance_1.Attendance.findByIdAndUpdate(id, req.body, { new: true }).populate('employeeId');
        if (!updatedAttendance) {
            res.status(404).json({ message: 'Attendance record not found' });
            return;
        }
        res.status(200).json(updatedAttendance);
    }
    catch (error) {
        res.status(500).json({ message: 'An error occurred while updating attendance' });
    }
});
exports.updateAttendanceById = updateAttendanceById;
const deleteAttendanceById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            res.status(400).json({ message: "Invalid attendance ID format" });
            return;
        }
        const deletedAttendance = yield Attendance_1.Attendance.findByIdAndDelete(id);
        if (!deletedAttendance) {
            res.status(404).json({ message: 'Attendance record not found' });
            return;
        }
        res.status(200).json({ message: 'Attendance record deleted successfully' });
    }
    catch (error) {
        res.status(400).json({ message: 'Bad request' });
    }
});
exports.deleteAttendanceById = deleteAttendanceById;
