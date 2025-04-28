import path from 'path';
import express from 'express'
import connectDB from './config/db.js'
import dotenv from 'dotenv'
import morgan from 'morgan';
import cors from 'cors'
import axios from 'axios'
// import cookieParser from 'cookie-parser'

import cabinRoutes from './routes/cabinRoutes.js'
import bookingRoutes from './routes/bookingRoutes.js'
import serviceRoutes from './routes/serviceRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import userRoutes from './routes/userRoutes.js'

import AppError from './middleware/appError.js';
import { errorHandler } from './middleware/errorMiddleware.js'
import cookieParser from 'cookie-parser'


dotenv.config()

const port = process.env.PORT || 5000

connectDB() //Connect to MongoDB

const app = express()

// Bật CORS cho tất cả các route --> để có thể deloy
app.use(cors());

//Development logging
if (process.env.NODE_ENV === "development")
    app.use(morgan('dev'))

//Body parser middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Cookie parser middleware
app.use(cookieParser())

app.get('/', (req, res) => {
    res.send('API is running...')
})

//PAYPAL
app.get('/api/config/paypal', (req, res) =>
    res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
);

// Rasa Webhook
app.post('/webhook', async (req, res) => {
    try {
        const { sender, message, metadata } = req.body;  // Lấy thông tin từ request body

        // Tạo đối tượng payload để gửi đến Rasa, có thể thêm metadata nếu cần
        const rasaPayload = {
            sender,
            message,
            metadata,  // Gửi metadata đi để có thể sử dụng trong Rasa
        };

        // Gửi yêu cầu POST đến Rasa server
        const response = await axios.post('http://localhost:5005/webhooks/rest/webhook', rasaPayload);

        // Trả về dữ liệu phản hồi của Rasa cho frontend
        res.json(response.data);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Có lỗi xảy ra khi gửi yêu cầu đến Rasa' });
    }
});

/*============================== ROUTES ================================*/
app.use('/api/cabins', cabinRoutes)
app.use('/api/bookings', bookingRoutes)
app.use('/api/services', serviceRoutes)
app.use('/api/users', userRoutes);


app.use('/api/upload', uploadRoutes);

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));



/*============================== HANDLE ERROR ================================*/

//Handling error route
app.all('*', (req, res, next) => {
    //Truyền đến middleware xử lý lỗi cuối cùng, bỏ qua mọi middleware còn lại
    next(new AppError(`Can't find ${req.originalUrl} on this server`, 404))
})

//Bắt lỗi mã đồng bộ --> khi một ngoại lệ không được xử lý
process.on('uncaughtException', err => {
    console.log('UNHANDLED EXCEPTION 🔥 Shutting down...');
    console.log(err.name, err.message);
    process.exit(1)
})

//Handling all error
app.use(errorHandler)

const server = app.listen(port, () => console.log(`Server running on port ${port}`))
//-	Lỗi thường liên quan đến kết nối DB (ví dụ như mật khẩu DB bị sai hoặc bị thay đổi,….)
process.on('unhandledRejection', err => {
    console.log('UNHANDLED REJECTION 🔥 Shutting down...');
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1)
    })
})

