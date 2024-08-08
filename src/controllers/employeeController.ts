import { Request, Response } from 'express';
import { Employee } from '../models/Employee';

// Get all employees
const getEmployees = async (req: Request, res: Response): Promise<void> => {
  try {
      const employees = await Employee.find();
      res.status(200).send(employees);
  } catch (error) {
    console.log("erros here", error);
    
      res.status(500).send(error);
  }
};

// Create a new employee
const createEmployee = async (req: Request, res: Response): Promise<void> => {
  try {
      const employee = new Employee(req.body);
      await employee.save();
      res.status(201).send(employee);
  } catch (error) {
      res.status(400).send(error);
  }
};

export {
  getEmployees,
  createEmployee
}