import express, { Request, Response } from 'express';
import RunModel from '../model/runModel';
import { calculateDistance } from '../utils/distanceCalculator';

const router = express.Router();

// Create Run
router.post('/', async (req: Request, res: Response) => {
  const { run_name, admin_id, staff_id, service_user_id, assigned_date, assigned_starttime, assigned_endtime, status, coordinates } = req.body;

  if (!coordinates || coordinates.staff.length !== coordinates.service_user.length) {
    return res.status(400).json({ message: 'Coordinates for staff and service users must be provided and should be equal in length.' });
  }

  try {
    const distances = coordinates.staff.map((staffCoord: any, index: number) => {
      const serviceUserCoord = coordinates.service_user[index];
      return calculateDistance(staffCoord.lat, staffCoord.lon, serviceUserCoord.lat, serviceUserCoord.lon);
    });

    const totalDistance = distances.reduce((acc: number, distance: number) => acc + distance, 0);

    const newRun = new RunModel({
      run_name,
      admin_id,
      staff_id,
      service_user_id,
      assigned_date,
      assigned_starttime,
      assigned_endtime,
      status,
      distance: totalDistance,
    });

    await newRun.save();
    res.status(201).json(newRun);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Update Run
router.put('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { run_name, admin_id, staff_id, service_user_id, assigned_date, assigned_starttime, assigned_endtime, status, coordinates } = req.body;

  if (!coordinates || coordinates.staff.length !== coordinates.service_user.length) {
    return res.status(400).json({ message: 'Coordinates for staff and service users must be provided and should be equal in length.' });
  }

  try {
    const distances = coordinates.staff.map((staffCoord: any, index: number) => {
      const serviceUserCoord = coordinates.service_user[index];
      return calculateDistance(staffCoord.lat, staffCoord.lon, serviceUserCoord.lat, serviceUserCoord.lon);
    });

    const totalDistance = distances.reduce((acc: number, distance: number) => acc + distance, 0);

    const updatedRun = await RunModel.findByIdAndUpdate(
      id,
      {
        run_name,
        admin_id,
        staff_id,
        service_user_id,
        assigned_date,
        assigned_starttime,
        assigned_endtime,
        status,
        distance: totalDistance,
      },
      { new: true, runValidators: true }
    );

    if (!updatedRun) {
      return res.status(404).json({ message: 'Run not found.' });
    }

    res.status(200).json(updatedRun);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Show All Runs
router.get('/', async (req: Request, res: Response) => {
  try {
    const runs = await RunModel.find();
    res.status(200).json(runs);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

export default router;
