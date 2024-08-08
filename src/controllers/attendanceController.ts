import { Request, Response } from 'express';
import { Attendance } from '../models/Attendance';

const createAttendance = async (req: Request, res: Response) => {
  try {
    const { employeeId, date, clockInTime, clockOutTime } = req.body;
    const attendance = new Attendance({ employeeId, date, clockInTime, clockOutTime });
    await attendance.save();
    res.status(201).send(attendance);
  } catch (error) {
    res.status(400).send(error);
  }
}

export {
  createAttendance
}