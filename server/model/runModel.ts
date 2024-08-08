// models/runModel.ts

import mongoose, { Schema, Document, Model } from 'mongoose';

interface IRun extends Document {
  run_name: string;
  admin_id: mongoose.Types.ObjectId;
  staff_id: mongoose.Types.ObjectId[];
  service_user_id: mongoose.Types.ObjectId[];
  assigned_date: Date;
  assigned_starttime: string;
  assigned_endtime: string;
  status: string;
  distance: number;
}

const runSchema: Schema<IRun> = new Schema({
  run_name: { type: String, required: true },
  admin_id: { type: Schema.Types.ObjectId, ref: 'Admin', required: true },
  staff_id: [{ type: Schema.Types.ObjectId, ref: 'Employee', required: true }],
  service_user_id: [{ type: Schema.Types.ObjectId, ref: 'ServiceUser', required: true }],
  assigned_date: { type: Date, required: true },
  assigned_starttime: { type: String, required: true },
  assigned_endtime: { type: String, required: true },
  status: { type: String, required: true },
  distance: { type: Number, required: true }
}, { versionKey: false });

const RunModel: Model<IRun> = mongoose.model<IRun>('Run', runSchema);

export default RunModel;
