import express from 'express';
const router = express.Router();

import { getBooking, getBookings, updateCheckInBooking, updateCheckOutBooking } from '../controllers/bookingController.js';

router.route('/').get(getBookings)
router.route('/:id').get(getBooking)
router.route('/checkin/:id').put(updateCheckInBooking)
router.route('/checkout/:id').put(updateCheckOutBooking)


export default router;

