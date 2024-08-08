// routes/employeeRoutes.ts
import express, { Request, Response } from 'express';
import EmployeeModel from '../model/employeeModel';
import AdminModel from '../model/adminModel';

const router = express.Router();

// Create Employee Profile
router.post('/', async (req: Request, res: Response) => {
  const { name, email, phone_number, admin_id } = req.body;

  if (!name || !email || !phone_number || !admin_id) {
    return res.status(400).json({ message: 'Name, email, phone number, and admin id are required.' });
  }

  try {
    const adminExists = await AdminModel.findById(admin_id);
    if (!adminExists) {
      return res.status(404).json({ message: 'Admin not found.' });
    }
    
    const newEmployee = new EmployeeModel({ name, email, phone_number, admin_id });
    await newEmployee.save();
    
    // Populate admin details
    const employeeWithAdmin = await EmployeeModel.findById(newEmployee._id).populate('admin_id');
    res.status(201).json(employeeWithAdmin);
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

// Update Employee Profile
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

    const updatedEmployee = await EmployeeModel.findByIdAndUpdate(
      id,
      { name, email, phone_number, admin_id },
      { new: true, runValidators: true }
    );

    if (!updatedEmployee) {
      return res.status(404).json({ message: 'Employee not found.' });
    }

    // Populate admin details
    const employeeWithAdmin = await EmployeeModel.findById(updatedEmployee._id).populate('admin_id');
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

// List Employee Profiles under specific admin
router.get('/', async (req: Request, res: Response) => {
  const { admin_id } = req.query;

  if (!admin_id) {
    return res.status(400).json({ message: 'Admin ID is required.' });
  }

  try {
    const employees = await EmployeeModel.find({ admin_id }).populate('admin_id', 'name');
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
})

export default router;
