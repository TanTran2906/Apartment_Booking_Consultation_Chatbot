import asyncHandler from '../middleware/asyncHandler.js';
import AppError from '../middleware/appError.js';

import Booking from '../models/bookingModel.js';
import Cabin from '../models/cabinModel.js';
import User from '../models/userModel.js'
import Service from '../models/serviceModel.js'


// @desc    Get all bookings
// @route   GET /api/bookings
// @access  Private/Admin

export const getBookings = asyncHandler(async (req, res) => {
    // Sử dụng .find() để lấy toàn bộ dữ liệu booking
    const bookings = await Booking.find()
        .populate({
            path: 'cabin',
            select: 'name', // Chỉ lấy trường 'name' của cabin
        })
        .populate({
            path: 'user',
            select: 'fullName email', // Chỉ lấy trường 'fullName' và 'email' của user
        })
        .populate({
            path: 'services',
            select: 'name regularPrice discount', // Chỉ lấy trường 'fullName' và 'email' của user

        });
    if (bookings) {
        res.status(200).json(bookings);
    }
    else {
        return next(new AppError("Bookings could not be loaded", 500))
    }
});