const errorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500
    err.message = err.message || "something wrong !"

    if(err.name === 'CastError') {
        err.statusCode = 400
        err.message = `Invalid ${err.path}`
    }

    if(err.code === 11000) {
        err.statusCode = 409
        err.message = `${Object.keys(err.keyValue)[0]} already exits`
    }

    if(err.name === "ValidationError") {
        err.statusCode = 400
        err.message = Object.values(err.errors).map(e=>e.message).join(",")
    }

    if (err.name === "JsonWebTokenError") {
        err.statusCode = 401
        err.message = `Invalid Token`
    }

    if(err.name === 'TokenExpiredError') {
        err.statusCode = 401
        err.message = "Token Expired"
    }

    if(!err.isOperational) console.error("UNEXPECTED ERROR: ", err)

    res.status(err.statusCode).json({
        success: false,
        message: err.message
    })
}

export default errorHandler