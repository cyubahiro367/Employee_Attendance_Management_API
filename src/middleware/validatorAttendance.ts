import { check, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

// Validation rules
export const validateAttendance = [
  check('employeeId')
    .isString().withMessage('Employee ID must be a string')
    .notEmpty().withMessage('Employee ID is required'),
  check('date')
    .isISO8601().withMessage('Date must be in ISO 8601 format')
    .notEmpty().withMessage('Date is required'),
  check('clockInTime')
    .isISO8601().withMessage('Clock-in time must be in ISO 8601 format')
    .notEmpty().withMessage('Clock-in time is required'),
  check('clockOutTime')
    .isISO8601().withMessage('Clock-out time must be in ISO 8601 format')
    .notEmpty().withMessage('Clock-out time is required'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    next();
  }
];
