// models/adminModel.ts
import mongoose, { Schema, Document, Model } from "mongoose";
import validator from "validator";

interface IAdmin extends Document {
  name: string;
  email: string;
  phone_number: string;
  company_id: mongoose.Types.ObjectId;
}

const adminSchema: Schema<IAdmin> = new Schema({
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
    unique: true,
    required: [true, "Please provide phone number"],
    validate: {
      validator: (phone_number: string) => validator.isMobilePhone(phone_number, "any"),
      message: "Please provide a valid phone number"
    }
  },
  company_id: {
    type: Schema.Types.ObjectId,
    ref: 'Company',
    required: [true, "Please provide company ID"]
  }
}, { versionKey: false });

const AdminModel: Model<IAdmin> = mongoose.model<IAdmin>("Admin", adminSchema);

export default AdminModel;
