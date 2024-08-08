import express, { Request, Response } from 'express';
import VisitModel from '../model/visitModel';
import CompanyModel from '../model/companyModel';
import AdminModel from '../model/adminModel';
import EmployeeModel from '../model/employeeModel';
import ServiceUserModel from '../model/serviceUserModel';

const router = express.Router();

// Create Visit
router.post('/', async (req: Request, res: Response) => {
    const { company_id, admin_id, emp_id, service_user_id, assigned_date, assigned_starttime, assigned_endtime, status, distance } = req.body;
  
    if (!company_id || !admin_id || !emp_id || !service_user_id || !assigned_date || !assigned_starttime || !assigned_endtime || !status || !distance) {
      return res.status(400).json({ message: 'All fields are required.' });
    }
  
    try {
      // Check if the company exists
      const company = await CompanyModel.findById(company_id);
      if (!company) {
        return res.status(400).json({ message: 'Invalid company ID.' });
      }
  
      // Check if the admin is related to the company
      const admin = await AdminModel.findOne({ _id: admin_id, company_id });
      if (!admin) {
        return res.status(400).json({ message: 'Admin is not related to the given company.' });
      }
  
      // Check if the employee is related to the admin
      const employee = await EmployeeModel.findOne({ _id: emp_id, admin_id });
      if (!employee) {
        return res.status(400).json({ message: 'Employee is not related to the given admin.' });
      }
  
      // Check if the service user is related to the admin
      const serviceUser = await ServiceUserModel.findOne({ _id: service_user_id, admin_id });
      if (!serviceUser) {
        return res.status(400).json({ message: 'Service user is not related to the given admin.' });
      }
  
      // Check if a visit with the same combination already exists
      const existingVisit = await VisitModel.findOne({ company_id, admin_id, emp_id, service_user_id });
      if (existingVisit) {
        return res.status(400).json({ message: 'A visit with the same company, admin, employee, and service user already exists.' });
      }
  
      // Create the visit
      const newVisit = new VisitModel({
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
  
      await newVisit.save();
      res.status(201).json(newVisit);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
});

// Update Visit
router.put('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { company_id, admin_id, emp_id, service_user_id, assigned_date, assigned_starttime, assigned_endtime, status, distance } = req.body;

  try {
    // Validate existence and relationships
    if (company_id) {
      const company = await CompanyModel.findById(company_id);
      if (!company) {
        return res.status(400).json({ message: 'Invalid company ID.' });
      }
    }

    if (admin_id) {
      const admin = await AdminModel.findOne({ _id: admin_id, company_id });
      if (!admin) {
        return res.status(400).json({ message: 'Admin is not related to the given company.' });
      }
    }

    if (emp_id) {
      const employee = await EmployeeModel.findOne({ _id: emp_id, admin_id });
      if (!employee) {
        return res.status(400).json({ message: 'Employee is not related to the given admin.' });
      }
    }

    if (service_user_id) {
      const serviceUser = await ServiceUserModel.findOne({ _id: service_user_id, admin_id });
      if (!serviceUser) {
        return res.status(400).json({ message: 'Service user is not related to the given admin.' });
      }
    }

    const updatedVisit = await VisitModel.findByIdAndUpdate(
      id,
      { company_id, admin_id, emp_id, service_user_id, assigned_date, assigned_starttime, assigned_endtime, status, distance },
      { new: true, runValidators: true }
    );

    if (!updatedVisit) {
      return res.status(404).json({ message: 'Visit not found.' });
    }

    res.status(200).json(updatedVisit);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// List Visits
router.get('/', async (req: Request, res: Response) => {
  try {
    const visits = await VisitModel.find()
      .populate('company_id', 'name')
      .populate('admin_id', 'name')
      .populate('emp_id', 'name')
      .populate('service_user_id', 'name');
    res.status(200).json(visits);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

export default router;
