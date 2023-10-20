import express from 'express';
const router = express.Router();

import { getBookings } from '../controllers/bookingController.js';

router.route('/').get(getBookings)

export default router;

