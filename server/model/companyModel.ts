// models/companyModel.ts
import mongoose, { Schema, Document, Model } from "mongoose";
import { isValidWebsite } from "../utils/websiteValidator";

interface ICompany extends Document {
  company_name: string;
  website: string;
}

const companySchema: Schema<ICompany> = new Schema({
  company_name: { type: String, required: [true, "Please provide name"], unique: true },
  website: {
    type: String,
    required: [true, "Please provide website"],
    unique: true,
    validate: {
      validator: isValidWebsite,
      message: "Please provide a valid website"
    }
  }
}, { versionKey: false });

const CompanyModel: Model<ICompany> = mongoose.model<ICompany>("Company", companySchema);

export default CompanyModel;
