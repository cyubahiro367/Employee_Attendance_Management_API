import { Schema, model, Document, Types } from "mongoose";
import { Employee } from "./Employee";

interface IAttendance extends Document {
  employeeId: Types.ObjectId | Employee;
  date: Date;
  clockInTime: number;
  clockOutTime: number;
}

const attendanceSchema = new Schema<IAttendance>({
  employeeId: {
    type: Schema.Types.ObjectId,
    ref: 'Employee',
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  clockInTime: {
    type: Number,
    required: true,
  },
  clockOutTime: {
    type: Number,
    required: true,
  },
}, { timestamps: true});

const Attendance = model<IAttendance>("Attendance", attendanceSchema);

export { Attendance, IAttendance };
