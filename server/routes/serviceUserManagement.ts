// routes/serviceUserRoutes.ts
import express, { Request, Response } from 'express';
import ServiceUserModel from '../model/serviceUserModel';
import AdminModel from '../model/adminModel';

const router = express.Router();

// Create Service User Profile
router.post('/', async (req: Request, res: Response) => {
  const { name, email, phone_number, admin_id } = req.body;

  if (!name || !email || !phone_number || !admin_id) {
    return res.status(400).json({ message: 'Name, email, phone number, and admin ID are required.' });
  }

  try {
    const adminExists = await AdminModel.findById(admin_id);
    if (!adminExists) {
      return res.status(404).json({ message: 'Admin not found.' });
    }

    const newServiceUser = new ServiceUserModel({ name, email, phone_number, admin_id });
    await newServiceUser.save();

    const serviceUserWithAdmin = await ServiceUserModel.findById(newServiceUser._id).populate('admin_id');
    res.status(201).json(serviceUserWithAdmin);
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

// Update Service User Profile
router.put('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email, phone_number, admin_id } = req.body;

  try {
    if (admin_id) {
      const adminExists = await AdminModel.findById(admin_id);
      if (!adminExists) {
        return res.status(404).json({ message: 'Admin not found.' });
      }
    }

    const updatedServiceUser = await ServiceUserModel.findByIdAndUpdate(
      id,
      { name, email, phone_number, admin_id },
      { new: true, runValidators: true }
    );

    if (!updatedServiceUser) {
      return res.status(404).json({ message: 'Service User not found.' });
    }

     // Populate admin details
    const employeeWithAdmin = await ServiceUserModel.findById(updatedServiceUser._id).populate('admin_id');
    res.status(200).json(employeeWithAdmin);
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

// List Service User Profiles under specific admin
router.get('/', async (req: Request, res: Response) => {
  const { admin_id } = req.query;

  if (!admin_id) {
    return res.status(400).json({ message: 'Admin ID is required.' });
  }

  try {
    const serviceUsers = await ServiceUserModel.find({ admin_id }).populate('admin_id', 'name');
    res.status(200).json(serviceUsers);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

export default router;
