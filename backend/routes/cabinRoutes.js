import express from 'express';
const router = express.Router();

import { getCabins, getCabinById, deleteCabin, createCabin, updateCabin } from '../controllers/cabinController.js'

router.route('/').get(getCabins).post(createCabin);
router.route('/:id').get(getCabinById).delete(deleteCabin).put(updateCabin)


export default router;
