import { Schema, model, Document, Types } from "mongoose";
import { IEmployee } from "./Employee";

interface IAttendance extends Document {
  employeeId: Types.ObjectId | IEmployee;
  date: Date;
  clockInTime: Date;
  clockOutTime: Date;
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
    type: Date,
    required: true,
  },
  clockOutTime: {
    type: Date,
    required: true,
  },
}, { timestamps: true});

const Attendance = model<IAttendance>("Attendance", attendanceSchema);

export { Attendance, IAttendance };
