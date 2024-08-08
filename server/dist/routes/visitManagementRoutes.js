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
const express_1 = __importDefault(require("express"));
const visitModel_1 = __importDefault(require("../model/visitModel"));
const companyModel_1 = __importDefault(require("../model/companyModel"));
const adminModel_1 = __importDefault(require("../model/adminModel"));
const employeeModel_1 = __importDefault(require("../model/employeeModel"));
const serviceUserModel_1 = __importDefault(require("../model/serviceUserModel"));
const router = express_1.default.Router();
// Create Visit
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { company_id, admin_id, emp_id, service_user_id, assigned_date, assigned_starttime, assigned_endtime, status, distance } = req.body;
    if (!company_id || !admin_id || !emp_id || !service_user_id || !assigned_date || !assigned_starttime || !assigned_endtime || !status || !distance) {
        return res.status(400).json({ message: 'All fields are required.' });
    }
    try {
        // Check if the company exists
        const company = yield companyModel_1.default.findById(company_id);
        if (!company) {
            return res.status(400).json({ message: 'Invalid company ID.' });
        }
        // Check if the admin is related to the company
        const admin = yield adminModel_1.default.findOne({ _id: admin_id, company_id });
        if (!admin) {
            return res.status(400).json({ message: 'Admin is not related to the given company.' });
        }
        // Check if the employee is related to the admin
        const employee = yield employeeModel_1.default.findOne({ _id: emp_id, admin_id });
        if (!employee) {
            return res.status(400).json({ message: 'Employee is not related to the given admin.' });
        }
        // Check if the service user is related to the admin
        const serviceUser = yield serviceUserModel_1.default.findOne({ _id: service_user_id, admin_id });
        if (!serviceUser) {
            return res.status(400).json({ message: 'Service user is not related to the given admin.' });
        }
        // Check if a visit with the same combination already exists
        const existingVisit = yield visitModel_1.default.findOne({ company_id, admin_id, emp_id, service_user_id });
        if (existingVisit) {
            return res.status(400).json({ message: 'A visit with the same company, admin, employee, and service user already exists.' });
        }
        // Create the visit
        const newVisit = new visitModel_1.default({
            company_id,
            admin_id,
            emp_id,
            service_user_id,
            assigned_date,
            assigned_starttime,
            assigned_endtime,
            status,
            distance
        });
        yield newVisit.save();
        res.status(201).json(newVisit);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}));
// Update Visit
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { company_id, admin_id, emp_id, service_user_id, assigned_date, assigned_starttime, assigned_endtime, status, distance } = req.body;
    try {
        // Validate existence and relationships
        if (company_id) {
            const company = yield companyModel_1.default.findById(company_id);
            if (!company) {
                return res.status(400).json({ message: 'Invalid company ID.' });
            }
        }
        if (admin_id) {
            const admin = yield adminModel_1.default.findOne({ _id: admin_id, company_id });
            if (!admin) {
                return res.status(400).json({ message: 'Admin is not related to the given company.' });
            }
        }
        if (emp_id) {
            const employee = yield employeeModel_1.default.findOne({ _id: emp_id, admin_id });
            if (!employee) {
                return res.status(400).json({ message: 'Employee is not related to the given admin.' });
            }
        }
        if (service_user_id) {
            const serviceUser = yield serviceUserModel_1.default.findOne({ _id: service_user_id, admin_id });
            if (!serviceUser) {
                return res.status(400).json({ message: 'Service user is not related to the given admin.' });
            }
        }
        const updatedVisit = yield visitModel_1.default.findByIdAndUpdate(id, { company_id, admin_id, emp_id, service_user_id, assigned_date, assigned_starttime, assigned_endtime, status, distance }, { new: true, runValidators: true });
        if (!updatedVisit) {
            return res.status(404).json({ message: 'Visit not found.' });
        }
        res.status(200).json(updatedVisit);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}));
// List Visits
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const visits = yield visitModel_1.default.find()
            .populate('company_id', 'name')
            .populate('admin_id', 'name')
            .populate('emp_id', 'name')
            .populate('service_user_id', 'name');
        res.status(200).json(visits);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}));
exports.default = router;
//# sourceMappingURL=visitManagementRoutes.js.map