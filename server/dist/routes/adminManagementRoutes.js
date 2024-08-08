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
// routes/adminRoutes.ts
const express_1 = __importDefault(require("express"));
const adminModel_1 = __importDefault(require("../model/adminModel"));
const companyModel_1 = __importDefault(require("../model/companyModel"));
const router = express_1.default.Router();
// Create Admin Profile
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, phone_number, company_id } = req.body;
    if (!name || !email || !phone_number || !company_id) {
        return res.status(400).json({ message: 'Name, email, phone number, and company ID are required.' });
    }
    try {
        const companyExists = yield companyModel_1.default.findById(company_id);
        if (!companyExists) {
            return res.status(404).json({ message: 'Company not found.' });
        }
        const newAdmin = new adminModel_1.default({ name, email, phone_number, company_id });
        yield newAdmin.save();
        // Populate company details
        const adminWithCompany = yield adminModel_1.default.findById(newAdmin._id).populate('company_id');
        res.status(201).json(adminWithCompany);
    }
    catch (error) {
        if (error.code === 11000) {
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
// Update Admin Profile
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, email, phone_number, company_id } = req.body;
    try {
        if (company_id) {
            const companyExists = yield companyModel_1.default.findById(company_id);
            if (!companyExists) {
                return res.status(404).json({ message: 'Company not found.' });
            }
        }
        const updatedAdmin = yield adminModel_1.default.findByIdAndUpdate(id, { name, email, phone_number, company_id }, { new: true, runValidators: true });
        if (!updatedAdmin) {
            return res.status(404).json({ message: 'Admin not found.' });
        }
        // Populate company details
        const adminWithCompany = yield adminModel_1.default.findById(updatedAdmin._id).populate('company_id');
        res.status(200).json(adminWithCompany);
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
// List Admin Profiles
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const admins = yield adminModel_1.default.find().populate('company_id', 'company_name');
        res.status(200).json(admins);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}));
exports.default = router;
//# sourceMappingURL=adminManagementRoutes.js.map