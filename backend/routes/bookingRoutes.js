import express from 'express';
const router = express.Router();

import { getBooking, getBookings } from '../controllers/bookingController.js';

router.route('/').get(getBookings)
router.route('/:id').get(getBooking)


export default router;

