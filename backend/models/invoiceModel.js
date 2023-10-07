import mongoose from 'mongoose';

const invoiceSchema = new mongoose.Schema({
    createdAt: {
        type: Date,
        default: Date.now,
    },
    booking: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Booking',
        required: [true, 'Invoice must belong to a Booking!']
    },
});

const Invoice = mongoose.model('Invoice', invoiceSchema);

export default Invoice;