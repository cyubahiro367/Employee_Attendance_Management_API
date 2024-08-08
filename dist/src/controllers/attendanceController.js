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
exports.createAttendance = void 0;
const Attendance_1 = require("../models/Attendance");
const createAttendance = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { employeeId, date, clockInTime, clockOutTime } = req.body;
        const attendance = new Attendance_1.Attendance({ employeeId, date, clockInTime, clockOutTime });
        yield attendance.save();
        res.status(201).send(attendance);
    }
    catch (error) {
        res.status(400).send(error);
    }
});
exports.createAttendance = createAttendance;
