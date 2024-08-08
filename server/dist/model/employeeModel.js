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
// models/employeeModel.ts
const mongoose_1 = __importStar(require("mongoose"));
const validator_1 = __importDefault(require("validator"));
const employeeSchema = new mongoose_1.Schema({
    name: { type: String, required: [true, "Please provide name"] },
    email: {
        type: String,
        required: [true, "Please provide email"],
        unique: true,
        validate: {
            validator: (email) => validator_1.default.isEmail(email),
            message: "Please provide a valid email"
        }
    },
    phone_number: {
        type: String,
        required: [true, "Please provide phone number"],
        validate: {
            validator: (phone_number) => validator_1.default.isMobilePhone(phone_number, "any"),
            message: "Please provide a valid phone number"
        }
    },
    admin_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Admin',
        required: [true, "Please provide admin ID"]
    }
}, { versionKey: false });
const EmployeeModel = mongoose_1.default.model("Employee", employeeSchema);
exports.default = EmployeeModel;
//# sourceMappingURL=employeeModel.js.map