"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateEmployee = void 0;
const express_validator_1 = require("express-validator");
exports.validateEmployee = [
    (0, express_validator_1.check)('name').notEmpty().withMessage('Name is required'),
    (0, express_validator_1.check)('position').notEmpty().withMessage('Position is required'),
    (0, express_validator_1.check)('department').notEmpty().withMessage('Department is required'),
    (0, express_validator_1.check)('hireDate').isISO8601().withMessage('Hire date must be a valid date'),
    (0, express_validator_1.check)('salary').isNumeric().withMessage('Salary must be a number'),
    (0, express_validator_1.check)('contactDetails').isEmail().withMessage('Contact details must be a valid email'),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return;
        }
        next();
    }
];
