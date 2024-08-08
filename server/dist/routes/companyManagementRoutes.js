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
// routes/companyRoutes.ts
const express_1 = __importDefault(require("express"));
const companyModel_1 = __importDefault(require("../model/companyModel"));
const router = express_1.default.Router();
// Create Company Profile
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { company_name, website } = req.body;
    if (!company_name || !website) {
        return res.status(400).json({ message: 'Company name and website are required.' });
    }
    try {
        const existingCompanyByName = yield companyModel_1.default.findOne({ company_name });
        const existingCompanyByWebsite = yield companyModel_1.default.findOne({ website });
        if (existingCompanyByName && existingCompanyByWebsite) {
            return res.status(400).json({ message: 'Company has already been created.' });
        }
        else if (existingCompanyByName) {
            return res.status(400).json({ message: 'Company name is already taken.' });
        }
        else if (existingCompanyByWebsite) {
            return res.status(400).json({ message: 'Website is already taken.' });
        }
        const newCompany = new companyModel_1.default({ company_name, website });
        yield newCompany.save();
        res.status(201).json(newCompany);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}));
// Update Company Profile
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { company_name, website } = req.body;
    try {
        const existingCompanyByName = company_name ? yield companyModel_1.default.findOne({ company_name }) : null;
        const existingCompanyByWebsite = website ? yield companyModel_1.default.findOne({ website }) : null;
        if (existingCompanyByName && existingCompanyByName.id !== id) {
            return res.status(400).json({ message: 'Company name is already taken.' });
        }
        else if (existingCompanyByWebsite && existingCompanyByWebsite.id !== id) {
            return res.status(400).json({ message: 'Website is already taken.' });
        }
        const updatedCompany = yield companyModel_1.default.findByIdAndUpdate(id, { company_name, website }, { new: true, runValidators: true });
        if (!updatedCompany) {
            return res.status(404).json({ message: 'Company not found.' });
        }
        res.status(200).json(updatedCompany);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}));
// List Company Profiles
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const companies = yield companyModel_1.default.find();
        res.status(200).json(companies);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}));
exports.default = router;
//# sourceMappingURL=companyManagementRoutes.js.map