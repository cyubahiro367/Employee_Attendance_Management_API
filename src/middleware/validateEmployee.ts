import { Request, Response, NextFunction } from 'express';
import { check, validationResult } from 'express-validator';

// Validation middleware for creating/updating an employee
export const validateEmployee = [
  check('name').notEmpty().withMessage('Name is required'),
  check('position').notEmpty().withMessage('Position is required'),
  check('department').notEmpty().withMessage('Department is required'),
  check('hireDate').isISO8601().withMessage('Hire date must be a valid date'),
  check('salary').isNumeric().withMessage('Salary must be a number'),
  check('contactDetails').isEmail().withMessage('Contact details must be a valid email'),
  (req: Request, res: Response, next: NextFunction): void => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }
    next();
  }
];