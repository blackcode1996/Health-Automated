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
const runModel_1 = __importDefault(require("../model/runModel"));
const distanceCalculator_1 = require("../utils/distanceCalculator");
const router = express_1.default.Router();
// Create Run
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { run_name, admin_id, staff_id, service_user_id, assigned_date, assigned_starttime, assigned_endtime, status, coordinates } = req.body;
    if (!coordinates || coordinates.staff.length !== coordinates.service_user.length) {
        return res.status(400).json({ message: 'Coordinates for staff and service users must be provided and should be equal in length.' });
    }
    try {
        const distances = coordinates.staff.map((staffCoord, index) => {
            const serviceUserCoord = coordinates.service_user[index];
            return (0, distanceCalculator_1.calculateDistance)(staffCoord.lat, staffCoord.lon, serviceUserCoord.lat, serviceUserCoord.lon);
        });
        const totalDistance = distances.reduce((acc, distance) => acc + distance, 0);
        const newRun = new runModel_1.default({
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
        yield newRun.save();
        res.status(201).json(newRun);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}));
// Update Run
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { run_name, admin_id, staff_id, service_user_id, assigned_date, assigned_starttime, assigned_endtime, status, coordinates } = req.body;
    if (!coordinates || coordinates.staff.length !== coordinates.service_user.length) {
        return res.status(400).json({ message: 'Coordinates for staff and service users must be provided and should be equal in length.' });
    }
    try {
        const distances = coordinates.staff.map((staffCoord, index) => {
            const serviceUserCoord = coordinates.service_user[index];
            return (0, distanceCalculator_1.calculateDistance)(staffCoord.lat, staffCoord.lon, serviceUserCoord.lat, serviceUserCoord.lon);
        });
        const totalDistance = distances.reduce((acc, distance) => acc + distance, 0);
        const updatedRun = yield runModel_1.default.findByIdAndUpdate(id, {
            run_name,
            admin_id,
            staff_id,
            service_user_id,
            assigned_date,
            assigned_starttime,
            assigned_endtime,
            status,
            distance: totalDistance,
        }, { new: true, runValidators: true });
        if (!updatedRun) {
            return res.status(404).json({ message: 'Run not found.' });
        }
        res.status(200).json(updatedRun);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}));
// Show All Runs
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const runs = yield runModel_1.default.find();
        res.status(200).json(runs);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}));
exports.default = router;
//# sourceMappingURL=runManagemnetRoutes.js.map