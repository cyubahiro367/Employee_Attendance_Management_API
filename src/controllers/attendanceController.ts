import { Request, Response } from "express";
import { Attendance } from "../models/Attendance";
import { Employee } from "../models/Employee";

/**
 * @swagger
 * components:
 *   schemas:
 *     Attendance:
 *       type: object
 *       required:
 *         - employeeId
 *         - date
 *         - clockInTime
 *         - clockOutTime
 *       properties:
 *         employeeId:
 *           type: string
 *           description: The ID of the employee who is clocking in and out
 *         date:
 *           type: string
 *           format: date
 *           description: The date of the attendance record
 *         clockInTime:
 *           type: string
 *           format: date-time
 *           description: The time when the employee clocked in
 *         clockOutTime:
 *           type: string
 *           format: date-time
 *           description: The time when the employee clocked out
 *       example:
 *         employeeId: "66bc7d86f7845b726b1955e0"
 *         date: "2024-08-14"
 *         clockInTime: "2024-08-14T09:00:00Z"
 *         clockOutTime: "2024-08-14T17:00:00Z"
 */

/**
 * @swagger
 * tags:
 *   name: Attendance
 *   description: The Attendance managing API
 */

/**
 * @swagger
 * /api/attendance:
 *   get:
 *     summary: Returns the list of all the attendance
 *     tags: [Attendance]
 *     responses:
 *       200:
 *         description: The list of the attendance
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Employee'
 *       500:
 *         description: An error occurred while fetching the attendance
 */
const getAttendances = async (req: Request, res: Response): Promise<void> => {
  try {
    const employees = await Attendance.find();
    res.status(200).json(employees);
  } catch (error) {
    res
      .status(500)
      .json({ message: '"An error occurred while fetching the employees' });
  }
};

/**
 * @swagger
 * /api/attendance:
 *   post:
 *     summary: Create a new attendance record
 *     description: Endpoint to create a new attendance record for an employee.
 *     tags: [Attendance]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Attendance'
 *     responses:
 *       201:
 *         description: Attendance record created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Attendance'
 *       400:
 *         description: Invalid employee ID format
 *       404:
 *         description: The employee was not found
 *       500:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
const createAttendance = async (req: Request, res: Response) => {
  try {
    const { employeeId, date, clockInTime, clockOutTime } = req.body;

    if (!employeeId.match(/^[0-9a-fA-F]{24}$/)) {
      res.status(400).json({ message: "Invalid employee ID format" });
      return;
    }

    const employee = await Employee.findById(employeeId);

    if (!employee) {
      res.status(404).json({ message: 'Employee not found' });
      return;
    }

    const attendance = new Attendance({
      employeeId,
      date,
      clockInTime,
      clockOutTime,
    });

    await attendance.save();

    res.status(201).json({ message: "Attendance recorded successfully" });
  } catch (error) {
    console.log(error);
    
    res
      .status(500)
      .json({ message: "An error occurred while recording attendance" });
  }
};

/**
 * @swagger
 * /attendance/{id}:
 *   get:
 *     summary: Get an attendance record by ID
 *     description: Retrieve an attendance record using its ID.
 *     tags:
 *       - Attendance
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the attendance record
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Attendance record found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Attendance'
 *       404:
 *         description: Attendance record not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
const getAttendanceById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      res.status(400).json({ message: "Invalid attendance ID format" });
      return;
    }

    const attendance = await Attendance.findById(id).populate('employeeId');
    if (!attendance) {
      res.status(404).json({ message: 'Attendance record not found' });
      return;
    }
    res.status(200).json(attendance);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while fetching attendance'});
  }
};

/**
 * @swagger
 * /attendance/{id}:
 *   put:
 *     summary: Update an attendance record by ID
 *     description: Update an existing attendance record using its ID.
 *     tags:
 *       - Attendance
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the attendance record
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Attendance'
 *     responses:
 *       200:
 *         description: Attendance record updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Attendance'
 *       404:
 *         description: Attendance record not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
const updateAttendanceById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      res.status(400).json({ message: "Invalid attendance ID format" });
      return;
    }

    const updatedAttendance = await Attendance.findByIdAndUpdate(id, req.body, { new: true }).populate('employeeId');
    if (!updatedAttendance) {
      res.status(404).json({ message: 'Attendance record not found' });
      return;
    }
    res.status(200).json(updatedAttendance);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while updating attendance' });
  }
};

/**
 * @swagger
 * /attendance/{id}:
 *   delete:
 *     summary: Delete an attendance record by ID
 *     description: Delete an attendance record using its ID.
 *     tags:
 *       - Attendance
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the attendance record
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Attendance record deleted successfully
 *       404:
 *         description: Attendance record not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
const deleteAttendanceById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      res.status(400).json({ message: "Invalid attendance ID format" });
      return;
    }

    const deletedAttendance = await Attendance.findByIdAndDelete(id);
    if (!deletedAttendance) {
      res.status(404).json({ message: 'Attendance record not found' });
      return;
    }
    res.status(200).json({ message: 'Attendance record deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Bad request'});
  }
};

export { getAttendances, createAttendance, getAttendanceById, updateAttendanceById, deleteAttendanceById };
