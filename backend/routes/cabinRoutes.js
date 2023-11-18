import express from 'express';
const router = express.Router();
import { protect, admin } from '../middleware/authMiddleware.js';


import { getCabins, getCabinById, deleteCabin, createCabin, updateCabin, getTopCabins, searchCabins, createCabinReview } from '../controllers/cabinController.js'

//GET Top 3 cabins have rating highest
router.route('/top').get(getTopCabins)

router.route('/search/:name').get(searchCabins);

router.route('/:id/reviews').post(protect, createCabinReview)
router.route('/').get(getCabins).post(protect, admin, createCabin);
router.route('/:id').get(getCabinById).delete(protect, admin, deleteCabin).put(protect, admin, updateCabin)




export default router;
