import express from 'express';
const router = express.Router();

import { protect, admin } from '../middleware/authMiddleware.js';
import { getBooking, getBookings, updateCheckInBooking, updateCheckOutBooking, deleteBooking, getBookingsAfterDate, getStaysAfterDate, getTodayActivities, addBooking } from '../controllers/bookingController.js';

router.route('/').get(protect, getBookings).post(protect, addBooking)
router.route('/:id').get(protect, admin, getBooking).delete(protect, admin, deleteBooking)
router.route('/checkin/:id').put(protect, admin, updateCheckInBooking)
router.route('/checkout/:id').put(protect, admin, updateCheckOutBooking)

//Statistics
router.route('/todayActivities/:date').get(getTodayActivities)
router.route('/getBookingsAfterDate/:date').get(getBookingsAfterDate)
router.route('/getStaysAfterDate/:date').get(getStaysAfterDate)


export default router;

