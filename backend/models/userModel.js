import mongoose from 'mongoose';

const userSchema = mongoose.Schema(
    {
        fullName: {
            type: String,
            required: [true, 'Please tell us your name']
        },
        email: {
            type: String,
            required: [true, 'Please provide your email'],
            unique: true,
            lowercase: true, //tự chuyển đổi tất cả thành chữ thường
            validate: [validator.isEmail, 'Please provide a valid email'] //validator.isEmail: kiểm tra xem một chuỗi có đúng định dạng email hay không
        },
        photo: {
            type: String,
            default: '/users/default.jpg',
        },
        nationalID: {
            type: String,
            required: [true, 'Please tell us your nationalID']
        },
        nationality: {
            type: String,
            required: [true, 'Please tell us your nationality']
        },
        countryFlag: {
            type: String,
            required: [true, 'Please tell us your countryFlag']
        },
        isAdmin: {
            type: Boolean,
            required: true,
            default: false,
        },
        password: {
            type: String,
            required: [true, 'Please provide a password'],
            minlength: 8,
            // select: false //ẩn ở đầu ra
        },
        passwordConfirm: {
            type: String,
            // required: [true, 'Please confirm your password'],
            //Chỉ hoạt động khi create hoặc save , not update!!!!!!!!!!!!!!!!!!!!
            validate: {
                validator: function (el) {
                    return el === this.password
                },
                message: 'Passwords are not the same!'
            }
        },
        passwordChangedAt: {
            type: Date
        },
        passwordResetToken: String,
        passwordResetExpires: Date, //Mốc thời gian giới hạn việc đặt lại mật khẩu (Vd: Sau 10p)
        active: {
            type: Boolean,
            default: true, //Tài khoản còn hoạt động
            // select: false
        }
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model('User', userSchema);

export default User;
