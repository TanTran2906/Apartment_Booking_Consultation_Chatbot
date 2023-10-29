import mongoose from 'mongoose';
// import { getToday } from '../utils/getToday';

const bookingSchema = new mongoose.Schema({
    cabin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cabin',
        required: [true, 'Booking must belong to a Cabin!']
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Booking must belong to a User!']
    },
    services: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Service',
        },
    ],
    bookingDate: {
        type: Date,
        default: Date.now,
    },
    startDate: {
        type: Date,
        require: [true, 'Booking must have a startDate.']
    },
    endDate: {
        type: Date,
        require: [true, 'Booking must have a endDate.']
    },
    numNights: {
        type: Number,
        require: [true, 'Booking must have a numNights.']
    },
    numGuests: {
        type: Number,
        require: [true, 'Booking must have a numGuests.']
    },
    totalPrice: {
        type: Number,
        require: [true, 'Booking must have a price.']
    },
    status: {
        type: String,
        require: [true, 'Booking must have a status.']
    },
    isPaid: {
        type: Boolean,
        require: [true, 'Booking must have a isPaid.'],
        default: false
    },
    paidAt: {
        type: Date,
    },
    paymentMethod: {
        type: String,
    },
    paymentResult: {
        id: { type: String },
        status: { type: String },
        update_time: { type: String },
        email_address: { type: String },
    },
    observations: {
        type: String,
        require: [true, 'Booking must have a observations.']
    }
},
    {
        timestamps: true,
        //Để cho Virtual properties có thể hiển thị được trong model (hiển thị chứ ko lưu)
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    });




// bookingSchema.pre(/^find/, function(next) {
//   this.populate('user').populate({
//     path: 'tour',
//     select: 'name'
//   });
//   next();
// });

// const getToday = function (options = {}) {
//     const today = new Date();

//     // This is necessary to compare with created_at from Supabase, because it it not at 0.0.0.0, so we need to set the date to be END of the day when we compare it with earlier dates
//     if (options?.end)
//         // Set to the last second of the day
//         today.setUTCHours(23, 59, 59, 999);
//     else today.setUTCHours(0, 0, 0, 0);
//     return today.toISOString();
// };

// bookingSchema.virtual('bookingsAfterDate').get(function () {
//     // Use a regular function (not an arrow function) to access 'this'
//     return async function (date) {
//         const endDate = getToday({ end: true });
//         const bookings = await this.constructor.find({
//             bookingDate: {
//                 $gte: date,
//                 $lte: endDate,
//             },
//         });
//         return bookings;
//     };
// });

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;