"use strict";
// models/runModel.ts
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const runSchema = new mongoose_1.Schema({
    run_name: { type: String, required: true },
    admin_id: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Admin', required: true },
    staff_id: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Employee', required: true }],
    service_user_id: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'ServiceUser', required: true }],
    assigned_date: { type: Date, required: true },
    assigned_starttime: { type: String, required: true },
    assigned_endtime: { type: String, required: true },
    status: { type: String, required: true },
    distance: { type: Number, required: true }
}, { versionKey: false });
const RunModel = mongoose_1.default.model('Run', runSchema);
exports.default = RunModel;
//# sourceMappingURL=runModel.js.map