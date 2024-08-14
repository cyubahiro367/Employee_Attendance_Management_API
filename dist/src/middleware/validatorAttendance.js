"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateAttendance = void 0;
const express_validator_1 = require("express-validator");
exports.validateAttendance = [
    (0, express_validator_1.check)('employeeId')
        .isString().withMessage('Employee ID must be a string')
        .notEmpty().withMessage('Employee ID is required'),
    (0, express_validator_1.check)('date')
        .isISO8601().withMessage('Date must be in ISO 8601 format')
        .notEmpty().withMessage('Date is required'),
    (0, express_validator_1.check)('clockInTime')
        .isISO8601().withMessage('Clock-in time must be in ISO 8601 format')
        .notEmpty().withMessage('Clock-in time is required'),
    (0, express_validator_1.check)('clockOutTime')
        .isISO8601().withMessage('Clock-out time must be in ISO 8601 format')
        .notEmpty().withMessage('Clock-out time is required'),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return;
        }
        next();
    }
];
