import AppError from "./appError.js"

const handleCastErrorDB = (err) => {
    //.path: tên của field mà dữ liệu đầu vào sai định dạng

    const msg = `Invalid ${err.path}: ${err.value}.`
    return new AppError(msg, 400)
}

const handleDuplicateFieldsDB = (err) => {
    const value = err.keyValue.name

    const msg = `Duplicate field value : ${value}. Please use another value!`
    return new AppError(msg, 400)
}

const handleValidationErrorsDB = err => {
    const errors = Object.values(err.errors).map(el => el.message)
    const msg = `Invalid input data . ${errors.join('. ')}`

    return new AppError(msg, 400)
}

const handleJWTError = () => new AppError('Invalid token.Please log in again', 401)

const handleJWTExpiredError = () => new AppError('Your token has expired! Please log in again', 401)

const sendErrorDev = (err, req, res) => {
    // A) API
    if (req.originalUrl.startsWith('/api')) {
        // console.error({
        //     status: err.status,
        //     error: err,
        //     message: err.message,
        //     stack: err.stack
        // });

        return res.status(err.statusCode).json({
            status: err.status,
            error: err,
            message: err.message,
            stack: err.stack
        });
    }

    // B) RENDERED WEBSITE
    console.error('ERROR 💥', err);
    return res.status(err.statusCode).render('error', {
        title: 'Something went wrong!',
        msg: err.message
    });
}

const sendErrorProd = (err, req, res) => {
    // A) API
    if (req.originalUrl.startsWith('/api')) {
        // A) Operational, trusted error: send message to client
        if (err.isOperational) {
            return res.status(err.statusCode).json({
                status: err.status,
                message: err.message
            });
        }
        // B) Programming or other unknown error: don't leak error details
        // 1) Log error
        console.error('ERROR 💥', err);
        // 2) Send generic message
        return res.status(500).json({
            status: 'error',
            message: 'Something went very wrong!'
        });
    }

    // B) RENDERED WEBSITE
    // A) Operational, trusted error: send message to client
    if (err.isOperational) {
        console.log(err);
        return res.status(err.statusCode).render('error', {
            title: 'Something went wrong!',
            msg: err.message
        });
    }
    // B) Programming or other unknown error: don't leak error details
    // 1) Log error
    console.error('ERROR 💥', err);
    // 2) Send generic message
    return res.status(err.statusCode).render('error', {
        title: 'Something went wrong!',
        msg: 'Please try again later.'
    });
}

export const errorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500; //4xx: fail, 500: error
    err.status = err.status || 'error'


    if (process.env.NODE_ENV === 'development') {
        // let error = { ...err }
        // error.message = err.message;

        // //Invaild ID
        // if (error.path === '_id')
        //     error = handleCastErrorDB(error)

        // //Duplicate field
        // if (error.code === 11000)
        //     error = handleDuplicateFieldsDB(error)

        // //Validation error
        // if (error._message?.includes('validation failed'))
        //     error = handleValidationErrorsDB(error)

        // if (error.name === 'JsonWebTokenError')
        //     error = handleJWTError()

        // if (error.name === 'TokenExpiredError')
        //     error = handleJWTExpiredError()

        sendErrorDev(err, req, res)
    }
    else if (process.env.NODE_ENV === 'production') {
        let error = { ...err }
        error.message = err.message;

        //Invaild ID
        if (error.path === '_id')
            error = handleCastErrorDB(error)

        //Duplicate field
        if (error.code === 11000)
            error = handleDuplicateFieldsDB(error)

        //Validation error
        if (error._message?.includes('validation failed'))
            error = handleValidationErrorsDB(error)

        if (error.name === 'JsonWebTokenError')
            error = handleJWTError()

        if (error.name === 'TokenExpiredError')
            error = handleJWTExpiredError()
        sendErrorProd(error, req, res)
    }
}


// const errorHandler = (err, req, res, next) => {
//     let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
//     let message = err.message;

//     // If Mongoose not found error, set to 404 and change message
//     if (err.name === 'CastError' && err.kind === 'ObjectId') {
//         statusCode = 404;
//         message = 'Resource not found';
//     }

//     res.status(statusCode).json({
//         message: message,
//         stack: process.env.NODE_ENV === 'production' ? null : err.stack,
//     });
// };

// export { notFound, errorHandler };