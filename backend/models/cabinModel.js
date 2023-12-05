import mongoose from 'mongoose';

const reviewSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        rating: { type: Number, required: true },
        comment: { type: String, required: true },
        avatar: { type: String },
        nationality: { type: String },
        createAt: {
            type: Date,
            default: Date.now,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
    },
    {
        timestamps: true,
    }
);

const cabinSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'A cabin must be have a name'],
            trim: true,
            maxlength: [40, 'A cabin name must have less or equal than 40'],
        },
        image: {
            type: String,
            // required: [true, 'A cabin must be have an image'],
        },
        maxCapacity: {
            type: Number,
            required: [true, 'A cabin must be have a capacity size'],
        },
        regularPrice: {
            type: Number,
            required: [true, 'A cabin must be have a price'],
        },
        discount: {
            type: Number,
            validate: {
                validator: function (val) {
                    return val <= this.regularPrice //val: do người dùng chỉ định : 100 < 200
                },
                message: 'Discount price ({VALUE}) should be below regular price'
            }
        },
        description: {
            type: String,
            required: [true, 'A cabin must be have a description'],
        },
        ratingsAverage: {
            type: Number,
            default: 4.6
        },
        ratingQuantity: {
            type: Number,
            default: 1
        },
        reviews: [reviewSchema],

    },
    {
        timestamps: true,
        //Để cho Virtual properties có thể hiển thị được trong model (hiển thị chứ ko lưu)
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);

const Cabin = mongoose.model('Cabin', cabinSchema);

export default Cabin;
