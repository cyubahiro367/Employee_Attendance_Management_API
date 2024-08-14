// src/routes/employeeRoutes.ts
import express from 'express';
import { createEmployee, getEmployees, getEmployeeById, updateEmployee, deleteEmployee } from '../controllers/employeeController';
import { validateEmployee } from '../middleware/validateEmployee';

const router = express.Router();

router.get('/employees', getEmployees);
router.post('/employees', validateEmployee, createEmployee);
router.get('/employees/:id', getEmployeeById);
router.put('/employees/:id', validateEmployee, updateEmployee);
router.delete('/employees/:id', deleteEmployee);

export default router;
