// src/routes/attendanceRoutes.ts
import express from 'express';
import { createAttendance, getAttendances, getAttendanceById, updateAttendanceById, deleteAttendanceById } from '../controllers/attendanceController';
import { validateAttendance } from '../middleware/validatorAttendance';

const router = express.Router();

router.get('/attendance', getAttendances);
router.post('/attendance', validateAttendance, createAttendance);
router.get('/employees/:id', getAttendanceById);
router.put('/employees/:id', validateAttendance, updateAttendanceById);
router.delete('/employees/:id', deleteAttendanceById);

export default router;