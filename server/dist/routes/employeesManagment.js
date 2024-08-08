"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// routes/employeeRoutes.ts
const express_1 = __importDefault(require("express"));
const employeeModel_1 = __importDefault(require("../model/employeeModel"));
const adminModel_1 = __importDefault(require("../model/adminModel"));
const router = express_1.default.Router();
// Create Employee Profile
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, phone_number, admin_id } = req.body;
    if (!name || !email || !phone_number || !admin_id) {
        return res.status(400).json({ message: 'Name, email, phone number, and admin id are required.' });
    }
    try {
        const adminExists = yield adminModel_1.default.findById(admin_id);
        if (!adminExists) {
            return res.status(404).json({ message: 'Admin not found.' });
        }
        const newEmployee = new employeeModel_1.default({ name, email, phone_number, admin_id });
        yield newEmployee.save();
        // Populate admin details
        const employeeWithAdmin = yield employeeModel_1.default.findById(newEmployee._id).populate('admin_id');
        res.status(201).json(employeeWithAdmin);
    }
    catch (error) {
        if (error.code === 11000) { // Duplicate key error
            if (error.keyPattern.email) {
                res.status(400).json({ message: 'Email is already taken.' });
            }
            else if (error.keyPattern.phone_number) {
                res.status(400).json({ message: 'Phone number is already taken.' });
            }
        }
        else {
            res.status(500).json({ message: 'Server error', error });
        }
    }
}));
// Update Employee Profile
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, email, phone_number, admin_id } = req.body;
    try {
        if (admin_id) {
            const adminExists = yield adminModel_1.default.findById(admin_id);
            if (!adminExists) {
                return res.status(404).json({ message: 'Admin not found.' });
            }
        }
        const updatedEmployee = yield employeeModel_1.default.findByIdAndUpdate(id, { name, email, phone_number, admin_id }, { new: true, runValidators: true });
        if (!updatedEmployee) {
            return res.status(404).json({ message: 'Employee not found.' });
        }
        // Populate admin details
        const employeeWithAdmin = yield employeeModel_1.default.findById(updatedEmployee._id).populate('admin_id');
        res.status(200).json(employeeWithAdmin);
    }
    catch (error) {
        if (error.code === 11000) { // Duplicate key error
            if (error.keyPattern.email) {
                res.status(400).json({ message: 'Email is already taken.' });
            }
            else if (error.keyPattern.phone_number) {
                res.status(400).json({ message: 'Phone number is already taken.' });
            }
        }
        else {
            res.status(500).json({ message: 'Server error', error });
        }
    }
}));
// List Employee Profiles under specific admin
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { admin_id } = req.query;
    if (!admin_id) {
        return res.status(400).json({ message: 'Admin ID is required.' });
    }
    try {
        const employees = yield employeeModel_1.default.find({ admin_id }).populate('admin_id', 'name');
        res.status(200).json(employees);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}));
exports.default = router;
//# sourceMappingURL=employeesManagment.js.map