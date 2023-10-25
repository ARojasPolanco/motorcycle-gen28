import { envs } from "../config/env/envitoments.js";
import { AppError } from "./appError.js";
import Error from "./error.model.js";

const handleCastError22001 = () => {
    return new AppError('value too long for type on attribute in database', 400)
}

const handleCastError23505 = () => {
    new AppError('Ducplicate field value: please use another value', 400)
}

const sendErrorDev = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
        stack: err.stack,
        error: err
    })
}

const sendErrorProd = async (err, res) => {
    await Error.create({
        status: err.status,
        message: err.message,
        stack: err.stack
    })

    if (err.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        })
    } else {
        console.log('Error', err)
        res.status(500).json({
            status: 'fail',
            message: 'Something went very wrong'
        })
    }
}


export const goblarErrorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'fail'

    if (envs.NODE_ENV === 'development') {
        sendErrorDev(err, res)
    }

    if (envs.NODE_ENV === 'production') {
        let error = err;

        if (err.parent?.code === 22001) error = handleCastError22001()
        if (err.parent?.code === 23505) error = handleCastError23505()

        sendErrorProd(error, res)
    }

}