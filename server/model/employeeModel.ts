// models/employeeModel.ts
import mongoose, { Schema, Document, Model } from "mongoose";
import validator from "validator";

interface IEmployee extends Document {
  name: string;
  email: string;
  phone_number: string;
  admin_id: mongoose.Types.ObjectId;
}

const employeeSchema: Schema<IEmployee> = new Schema({
  name: { type: String, required: [true, "Please provide name"] },
  email: {
    type: String,
    required: [true, "Please provide email"],
    unique: true,
    validate: {
      validator: (email: string) => validator.isEmail(email),
      message: "Please provide a valid email"
    }
  },
  phone_number: {
    type: String,
    required: [true, "Please provide phone number"],
    validate: {
      validator: (phone_number: string) => validator.isMobilePhone(phone_number, "any"),
      message: "Please provide a valid phone number"
    }
  },
  admin_id: {
    type: Schema.Types.ObjectId,
    ref: 'Admin',
    required: [true, "Please provide admin ID"]
  }
}, { versionKey: false });

const EmployeeModel: Model<IEmployee> = mongoose.model<IEmployee>("Employee", employeeSchema);

export default EmployeeModel;
