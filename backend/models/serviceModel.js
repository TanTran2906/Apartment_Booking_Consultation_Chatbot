import mongoose from 'mongoose';


const serviceSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'A service must be have a name'],
            unique: true,
            trim: true,
            maxlength: [40, 'A service name must have less or equal than 40'],
        },
        image: {
            type: String,
            required: [true, 'A service must be have an image'],
        },
        regularPrice: {
            type: Number,
            required: [true, 'A service must be have a price'],
        },
        discount: {
            type: Number,
            validate: {
                validator: function (val) {
                    return val < this.regularPrice //val: do người dùng chỉ định : 100 < 200
                },
                message: 'Discount price ({VALUE}) should be below regular price'
            }
        },
        description: {
            type: String,
            required: [true, 'A service must be have a description'],
        },
        checked: {
            type: Boolean,
            default: false
        },

    },
    {
        timestamps: true,
        //Để cho Virtual properties có thể hiển thị được trong model (hiển thị chứ ko lưu)
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);

const Service = mongoose.model('Service', serviceSchema);

export default Service;
