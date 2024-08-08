// routes/adminRoutes.ts
import express, { Request, Response } from 'express';
import AdminModel from '../model/adminModel';
import CompanyModel from '../model/companyModel';

const router = express.Router();

// Create Admin Profile
router.post('/', async (req: Request, res: Response) => {
  const { name, email, phone_number, company_id } = req.body;

  if (!name || !email || !phone_number || !company_id) {
    return res.status(400).json({ message: 'Name, email, phone number, and company ID are required.' });
  }

  try {
    const companyExists = await CompanyModel.findById(company_id);
    if (!companyExists) {
      return res.status(404).json({ message: 'Company not found.' });
    }

    const newAdmin = new AdminModel({ name, email, phone_number, company_id });
    await newAdmin.save();
    
    // Populate company details
    const adminWithCompany = await AdminModel.findById(newAdmin._id).populate('company_id');
    res.status(201).json(adminWithCompany);
  } catch (error) {
    if (error.code === 11000) { 
      if (error.keyPattern.email) {
        res.status(400).json({ message: 'Email is already taken.' });
      } else if (error.keyPattern.phone_number) {
        res.status(400).json({ message: 'Phone number is already taken.' });
      }
    } else {
      res.status(500).json({ message: 'Server error', error });
    }
  }
});

// Update Admin Profile
router.put('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email, phone_number, company_id } = req.body;

  try {
    if (company_id) {
      const companyExists = await CompanyModel.findById(company_id);
      if (!companyExists) {
        return res.status(404).json({ message: 'Company not found.' });
      }
    }

    const updatedAdmin = await AdminModel.findByIdAndUpdate(
      id,
      { name, email, phone_number, company_id },
      { new: true, runValidators: true }
    );

    if (!updatedAdmin) {
      return res.status(404).json({ message: 'Admin not found.' });
    }

    // Populate company details
    const adminWithCompany = await AdminModel.findById(updatedAdmin._id).populate('company_id');
    res.status(200).json(adminWithCompany);
  } catch (error) {
    if (error.code === 11000) { // Duplicate key error
      if (error.keyPattern.email) {
        res.status(400).json({ message: 'Email is already taken.' });
      } else if (error.keyPattern.phone_number) {
        res.status(400).json({ message: 'Phone number is already taken.' });
      }
    } else {
      res.status(500).json({ message: 'Server error', error });
    }
  }
});

// List Admin Profiles
router.get('/', async (req: Request, res: Response) => {
  try {
    const admins = await AdminModel.find().populate('company_id', 'company_name');
    res.status(200).json(admins);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

export default router;
