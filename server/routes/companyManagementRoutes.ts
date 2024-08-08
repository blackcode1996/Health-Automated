// routes/companyRoutes.ts
import express, { Request, Response } from 'express';
import CompanyModel from '../model/companyModel';

const router = express.Router();

// Create Company Profile
router.post('/', async (req: Request, res: Response) => {
  const { company_name, website } = req.body;

  if (!company_name || !website) {
    return res.status(400).json({ message: 'Company name and website are required.' });
  }

  try {
    const existingCompanyByName = await CompanyModel.findOne({ company_name });
    const existingCompanyByWebsite = await CompanyModel.findOne({ website });

    if (existingCompanyByName && existingCompanyByWebsite) {
      return res.status(400).json({ message: 'Company has already been created.' });
    } else if (existingCompanyByName) {
      return res.status(400).json({ message: 'Company name is already taken.' });
    } else if (existingCompanyByWebsite) {
      return res.status(400).json({ message: 'Website is already taken.' });
    }

    const newCompany = new CompanyModel({ company_name, website });
    await newCompany.save();
    res.status(201).json(newCompany);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Update Company Profile
router.put('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { company_name, website } = req.body;

  try {
    const existingCompanyByName = company_name ? await CompanyModel.findOne({ company_name }) : null;
    const existingCompanyByWebsite = website ? await CompanyModel.findOne({ website }) : null;

    if (existingCompanyByName && existingCompanyByName.id !== id) {
      return res.status(400).json({ message: 'Company name is already taken.' });
    } else if (existingCompanyByWebsite && existingCompanyByWebsite.id !== id) {
      return res.status(400).json({ message: 'Website is already taken.' });
    }

    const updatedCompany = await CompanyModel.findByIdAndUpdate(
      id,
      { company_name, website },
      { new: true, runValidators: true }
    );

    if (!updatedCompany) {
      return res.status(404).json({ message: 'Company not found.' });
    }

    res.status(200).json(updatedCompany);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// List Company Profiles
router.get('/', async (req: Request, res: Response) => {
  try {
    const companies = await CompanyModel.find();
    res.status(200).json(companies);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

export default router;
