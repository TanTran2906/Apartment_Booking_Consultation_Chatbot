import mongoose from 'mongoose';

const invoiceSchema = new mongoose.Schema({
    createdDate: {
        type: Date,
        default: Date.now,
    },
    booking: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Booking',
        required: [true, 'Invoice must belong to a Booking!']
    },
},
    {
        timestamps: true,
        //Để cho Virtual properties có thể hiển thị được trong model (hiển thị chứ ko lưu)
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);

const Invoice = mongoose.model('Invoice', invoiceSchema);

export default Invoice;