// src/models/Employee.ts
import { Schema, model, Document } from "mongoose";

interface Employee extends Document {
  name: string;
  position: string;
  department: string;
  hireDate: Date;
  salary: number;
  contactDetails: string;
}

const employeeSchema = new Schema<Employee>({
  name: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  hireDate: {
    type: Date,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
  contactDetails: {
    type: String,
    required: true,
  },
}, { timestamps: true});

const Employee = model<Employee>('Employee', employeeSchema);

export { Employee };
