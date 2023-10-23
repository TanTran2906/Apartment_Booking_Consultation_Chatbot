import asyncHandler from '../middleware/asyncHandler.js';
import AppError from '../middleware/appError.js';

import Booking from '../models/bookingModel.js';
import Cabin from '../models/cabinModel.js';
import User from '../models/userModel.js'
import Service from '../models/serviceModel.js'


// @desc    Get all bookings
// @route   GET /api/bookings
// @access  Private/Admin

export const getBookings = asyncHandler(async (req, res, next) => {
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

// @desc    Get booking detail with cabin, user, and service data
// @route   GET /api/bookings/:id
// @access  Private/Admin

export const getBooking = asyncHandler(async (req, res, next) => {
    // Lấy ID của booking từ request params
    const { id } = req.params;

    // Sử dụng phương thức `populate` để lấy thông tin về cabin, user và service
    const booking = await Booking.findById(id)
        .populate('cabin')
        .populate('user')
        .populate('services');

    if (booking) {
        res.status(200).json(booking);
    } else {
        return next(new AppError("Booking not found", 404));
    }
});

// @desc    Update status when check-in 
// @route   PUT /api/bookings/:id/checkin
// @access  Private/Admin

export const updateCheckInBooking = asyncHandler(async (req, res, next) => {
    const { id } = req.params; // Sử dụng đúng biến id đã định nghĩa bởi route

    // Kiểm tra xem có bản ghi đặt phòng với ID được cung cấp không
    const booking = await Booking.findById(id);


    if (!booking) {
        return next(new AppError('No booking found with that ID', 404));
    }

    booking.status = 'checked-in';
    booking.isPaid = true;

    // Lưu bản ghi đã cập nhật
    await booking.save();

    res.status(200).json({ message: 'Booking updated successfully' });
});

// @desc    Update status when check-out
// @route   PUT /api/bookings/:id/checkout
// @access  Private/Admin

export const updateCheckOutBooking = asyncHandler(async (req, res, next) => {
    const { id } = req.params; // Sử dụng đúng biến id đã định nghĩa bởi route

    // Kiểm tra xem có bản ghi đặt phòng với ID được cung cấp không
    const booking = await Booking.findById(id);


    if (!booking) {
        return next(new AppError('No booking found with that ID', 404));
    }

    booking.status = 'checked-out';

    // Lưu bản ghi đã cập nhật
    await booking.save();

    res.status(200).json({ message: 'Booking updated successfully' });
});

// // @desc    Delete a booking
// // @route   DELETE /api/bookings/:id
// // @access  Private/Admin
export const deleteBooking = asyncHandler(async (req, res, next) => {
    const booking = await Booking.findById(req.params.id);

    if (booking) {
        await Booking.deleteOne({ _id: booking._id });
        res.status(204).json({
            message: 'Booking removed'
        });
    } else {
        return next(new AppError('No booking found with that ID', 404))
    }
});