"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// models/visitModel.ts
const mongoose_1 = __importStar(require("mongoose"));
const validator_1 = __importDefault(require("validator"));
const visitSchema = new mongoose_1.Schema({
    company_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Company',
        required: [true, "Please provide company ID"]
    },
    admin_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Admin',
        required: [true, "Please provide admin ID"]
    },
    emp_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Employee',
        required: [true, "Please provide employee ID"]
    },
    service_user_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'ServiceUser',
        required: [true, "Please provide service user ID"]
    },
    assigned_date: {
        type: Date,
        required: [true, "Please provide assigned date"],
        validate: {
            validator: (date) => !isNaN(date.getTime()),
            message: "Please provide a valid date"
        }
    },
    assigned_starttime: {
        type: String,
        required: [true, "Please provide assigned start time"],
        validate: {
            validator: (time) => validator_1.default.isISO8601(`1970-01-01T${time}Z`),
            message: "Please provide a valid start time in HH:mm:ss format"
        }
    },
    assigned_endtime: {
        type: String,
        required: [true, "Please provide assigned end time"],
        validate: {
            validator: (time) => validator_1.default.isISO8601(`1970-01-01T${time}Z`),
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
const VisitModel = mongoose_1.default.model("Visit", visitSchema);
exports.default = VisitModel;
//# sourceMappingURL=visitModel.js.map