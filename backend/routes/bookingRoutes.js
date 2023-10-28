import express from 'express';
const router = express.Router();

import { getBooking, getBookings, updateCheckInBooking, updateCheckOutBooking, deleteBooking, getBookingsAfterDate, getStaysAfterDate } from '../controllers/bookingController.js';

router.route('/').get(getBookings)
router.route('/:id').get(getBooking).delete(deleteBooking)
router.route('/checkin/:id').put(updateCheckInBooking)
router.route('/checkout/:id').put(updateCheckOutBooking)

//Statistics
router.route('/getBookingsAfterDate/:date').get(getBookingsAfterDate)
router.route('/getStaysAfterDate/:date').get(getStaysAfterDate)



export default router;

