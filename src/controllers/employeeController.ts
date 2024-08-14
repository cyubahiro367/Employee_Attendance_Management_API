import { Request, Response } from "express";
import { Employee, IEmployee } from "../models/Employee";
import { Attendance } from "../models/Attendance";

/**
 * @swagger
 * components:
 *   schemas:
 *     Employee:
 *       type: object
 *       required:
 *         - name
 *         - position
 *         - department
 *         - hireDate
 *         - salary
 *         - contactDetails
 *       properties:
 *         name:
 *           type: string
 *           description: Employee's name
 *         position:
 *           type: string
 *           description: Employee's position
 *         department:
 *           type: string
 *           description: Employee's department
 *         hireDate:
 *           type: string
 *           format: date
 *           description: Date when the employee was hired
 *         salary:
 *           type: number
 *           description: Employee's salary
 *         contactDetails:
 *           type: string
 *           description: Employee's contact details
 *       example:
 *         name: John Doe
 *         position: Software Developer
 *         department: IT
 *         hireDate: 2021-05-10
 *         salary: 60000
 *         contactDetails: johndoe@example.com
 */

/**
 * @swagger
 * tags:
 *   name: Employees
 *   description: The employees managing API
 */

// Get all employees

/**
 * @swagger
 * /api/employees:
 *   get:
 *     summary: Returns the list of all the employees
 *     tags: [Employees]
 *     responses:
 *       200:
 *         description: The list of the employees
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Employee'
 *       500:
 *         description: An error occurred while fetching the employee
 */
const getEmployees = async (req: Request, res: Response): Promise<void> => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: '"An error occurred while fetching the employees' });
  }
};

// Create a new employee

/**
 * @swagger
 * /api/employees:
 *   post:
 *     summary: Create a new employee
 *     tags: [Employees]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Employee'
 *     responses:
 *       201:
 *         description: The employee was successfully created
 *       500:
 *         description: Some server error
 */
const createEmployee = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, position, department, hireDate, salary, contactDetails } =
      req.body;
    const newEmployee: IEmployee = new Employee({
      name,
      position,
      department,
      hireDate,
      salary,
      contactDetails,
    });
    await newEmployee.save();
    res.status(201).json({ message: "Employee created successfully" });
  } catch (error) {
    res.status(500).json({ message: "An error occurred while creating the employee" });
  }
};

// Get a single employee by ID
/**
 * @swagger
 * /api/employees/{id}:
 *   get:
 *     summary: Get the employee by id
 *     tags: [Employees]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The employee id
 *     responses:
 *       200:
 *         description: The employee description by id
 *         contents:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Employee'
 *       400:
 *         description: Invalid employee ID format
 *       404:
 *         description: The employee was not found
 *       500:
 *         description: An error occurred while fetching the employee
 */
const getEmployeeById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      res.status(400).json({ message: "Invalid employee ID format" });
      return;
    }

    const updatedEmployee = await Employee.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedEmployee) {
      res.status(404).json({ message: "Employee not found" });
      return;
    }

    const employee = await Employee.findById(req.params.id);

    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ message: "An error occurred while fetching the employee" });
  }
};

// Update an employee by ID

/**
 * @swagger
 * /api/employees/{id}:
 *   put:
 *     summary: Update the employee by the id
 *     tags: [Employees]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The employee id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Employee'
 *     responses:
 *       200:
 *         description: The employee was updated
 *       400:
 *         description: Invalid employee ID format
 *       404:
 *         description: The employee was not found
 *       500:
 *         description: An error occurred while updating the employee
 */
const updateEmployee = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      res.status(400).json({ message: "Invalid employee ID format" });
      return;
    }

    const updatedEmployee = await Employee.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedEmployee) {
      res.status(404).json({ message: "Employee not found" });
      return;
    }

    res.status(200).json({ message: "Employee updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "An error occurred while updating the employee" });
  }
};

// Delete an employee by ID
/**
 * @swagger
 * /api/employees/{id}:
 *   delete:
 *     summary: Delete the employee
 *     tags: [Employees]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The employee id
 *     responses:
 *       200:
 *         description: The employee was deleted
 *       400:
 *         description: Invalid employee ID format
 *       404:
 *         description: The employee was not found
 *       500:
 *         description: An error occurred while deleting the employee
 */
const deleteEmployee = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      res.status(400).json({ message: "Invalid employee ID format" });
      return;
    }

    const attendances = await Attendance.find({ employeeId: id }).populate('employeeId');
    
    if (attendances.length > 0) {
      res.status(403).json({ message: 'Employee have attendance you can not delete' });
      return;
    }

    const deletedEmployee = await Employee.findByIdAndDelete(id);

    if (!deletedEmployee) {
      res.status(404).json({ message: 'Employee not found' });
      return;
    }

    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "An error occurred while deleting the employee" });
  }
};

export {
  getEmployees,
  createEmployee,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
};
