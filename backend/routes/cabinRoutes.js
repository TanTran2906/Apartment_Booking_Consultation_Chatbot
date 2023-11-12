import express from 'express';
const router = express.Router();

import { getCabins, getCabinById, deleteCabin, createCabin, updateCabin, getTopCabins, searchCabins } from '../controllers/cabinController.js'

//GET Top 3 cabins have rating highest
router.route('/top').get(getTopCabins)

router.route('/search/:name').get(searchCabins);

router.route('/').get(getCabins).post(createCabin);
router.route('/:id').get(getCabinById).delete(deleteCabin).put(updateCabin)




export default router;
