"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const attendanceController_1 = require("../controllers/attendanceController");
const validatorAttendance_1 = require("../middleware/validatorAttendance");
const router = express_1.default.Router();
router.get('/attendance', attendanceController_1.getAttendances);
router.post('/attendance', validatorAttendance_1.validateAttendance, attendanceController_1.createAttendance);
router.get('/employees/:id', attendanceController_1.getAttendanceById);
router.put('/employees/:id', validatorAttendance_1.validateAttendance, attendanceController_1.updateAttendanceById);
router.delete('/employees/:id', attendanceController_1.deleteAttendanceById);
exports.default = router;
