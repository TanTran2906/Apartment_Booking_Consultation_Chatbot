import path from 'path';
import express from 'express'
import connectDB from './config/db.js'
import dotenv from 'dotenv'
// import cookieParser from 'cookie-parser'

import cabinRoutes from './routes/cabinRoutes.js'

import { notFound, errorHandler } from './middleware/errorMiddleware.js'
dotenv.config()

const port = process.env.PORT || 5000

connectDB() //Connect to MongoDB

const app = express()

//Body parser middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Cookie parser middleware
// app.use(cookieParser())

app.get('/', (req, res) => {
    res.send('API is running...')
})

app.use('/api/cabins', cabinRoutes)

//Handling error route
app.all('*', (req, res, next) => {

    const err = new Error(`Can't find ${req.originalUrl} on this server`)
    err.statusCode = 404
    err.status = 'fail'

    //Truyền đến middleware xử lý lỗi cuối cùng, bỏ qua mọi middleware còn lại
    // next(new AppError(`Can't find ${req.originalUrl} on this server`, 404))
})
app.use(errorHandler)


app.listen(port, () => console.log(`Server running on port ${port}`))




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