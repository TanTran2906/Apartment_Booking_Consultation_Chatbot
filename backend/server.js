import path from 'path';
import express from 'express'
import connectDB from './config/db.js'
import dotenv from 'dotenv'
import morgan from 'morgan';
// import cookieParser from 'cookie-parser'

import cabinRoutes from './routes/cabinRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'

import AppError from './middleware/appError.js';
import { errorHandler } from './middleware/errorMiddleware.js'



dotenv.config()

const port = process.env.PORT || 5000

connectDB() //Connect to MongoDB

const app = express()

//Development logging
if (process.env.NODE_ENV === "development")
    app.use(morgan('dev'))

//Body parser middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Cookie parser middleware
// app.use(cookieParser())

app.get('/', (req, res) => {
    res.send('API is running...')
})

/*============================== ROUTES ================================*/
app.use('/api/cabins', cabinRoutes)

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


// import path from 'path';
// import express from 'express'
// import products from './data/products.js'
// import dotenv from 'dotenv'
// dotenv.config()
// import connectDB from './config/db.js'

// import productRoutes from './routes/productRoutes.js'
// import userRoutes from './routes/userRoutes.js';
// import orderRoutes from './routes/orderRoutes.js';
// import uploadRoutes from './routes/uploadRoutes.js'

// import { notFound, errorHandler } from './middleware/errorMiddleware.js'
// import cookieParser from 'cookie-parser'

// const port = process.env.PORT || 5000

// connectDB() //Connect to MongoDB

// const app = express()

// //Body parser middleware
// app.use(express.json())
// app.use(express.urlencoded({ extended: true }))

// //Cookie parser middleware
// app.use(cookieParser())



// app.use('/api/products', productRoutes)
// app.use('/api/users', userRoutes);
// app.use('/api/orders', orderRoutes);
// app.use('/api/upload', uploadRoutes);

// app.get('/api/config/paypal', (req, res) =>
//     res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
// );

// const __dirname = path.resolve();
// app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// if (process.env.NODE_ENV === 'production') {
//     //set static folder
//     app.use(express.static(path.join(__dirname, '/frontend/build')));

//     //any route that is not api will be redirected to index.html
//     app.get('*', (req, res) =>
//         res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
//     )

// } else {
//     app.get('/', (req, res) => {
//         res.send('API is running...')
//     })
// }

// app.use(notFound)
// app.use(errorHandler)

// app.listen(port, () => console.log(`Server running on port ${port}`))