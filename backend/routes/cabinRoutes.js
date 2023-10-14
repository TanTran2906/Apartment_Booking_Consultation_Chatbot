import express from 'express';
const router = express.Router();

import asyncHandler from '../middleware/asyncHandler.js';
import Cabin from '../models/cabinModel.js';
import { getCabins, getCabinById, deleteCabin, createCabin } from '../controllers/cabinController.js'

router.route('/').get(getCabins).post(createCabin);
router.route('/:id').get(getCabinById).delete(deleteCabin)


export default router;
