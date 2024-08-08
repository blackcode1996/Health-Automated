// models/visitModel.ts
import mongoose, { Schema, Document, Model } from "mongoose";
import validator from "validator";

interface IVisit extends Document {
  company_id: mongoose.Types.ObjectId;
  admin_id: mongoose.Types.ObjectId;
  emp_id: mongoose.Types.ObjectId;
  service_user_id: mongoose.Types.ObjectId;
  assigned_date: Date;
  assigned_starttime: string;
  assigned_endtime: string;
  status: string;
  distance: number;
}

const visitSchema: Schema<IVisit> = new Schema({
  company_id: {
    type: Schema.Types.ObjectId,
    ref: 'Company',
    required: [true, "Please provide company ID"]
  },
  admin_id: {
    type: Schema.Types.ObjectId,
    ref: 'Admin',
    required: [true, "Please provide admin ID"]
  },
  emp_id: {
    type: Schema.Types.ObjectId,
    ref: 'Employee',
    required: [true, "Please provide employee ID"]
  },
  service_user_id: {
    type: Schema.Types.ObjectId,
    ref: 'ServiceUser',
    required: [true, "Please provide service user ID"]
  },
  assigned_date: {
    type: Date,
    required: [true, "Please provide assigned date"],
    validate: {
      validator: (date: Date) => !isNaN(date.getTime()),
      message: "Please provide a valid date"
    }
  },
  assigned_starttime: {
    type: String,
    required: [true, "Please provide assigned start time"],
    validate: {
      validator: (time: string) => validator.isISO8601(`1970-01-01T${time}Z`),
      message: "Please provide a valid start time in HH:mm:ss format"
    }
  },
  assigned_endtime: {
    type: String,
    required: [true, "Please provide assigned end time"],
    validate: {
      validator: (time: string) => validator.isISO8601(`1970-01-01T${time}Z`),
      message: "Please provide a valid end time in HH:mm:ss format"
    }
  },
  status: {
    type: String,
    required: [true, "Please provide status"],
    enum: ["scheduled", "completed", "cancelled"]
  },
  distance: {
    type: Number,
    required: [true, "Please provide distance"],
    min: [0, "Distance must be a positive number"]
  }
}, { versionKey: false });

const VisitModel: Model<IVisit> = mongoose.model<IVisit>("Visit", visitSchema);

export default VisitModel;
