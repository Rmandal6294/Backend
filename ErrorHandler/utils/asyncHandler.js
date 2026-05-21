const asyncHandler = fn => (req, res, next) =>{ // Express actually uses the returned function as middleware.
    Promise.resolve(fn(req, res, next)) // ensures the result is treated as a Promise.
        .catch(next) // If any error occurs, it sends the error to Express error middleware automatically.
}

export default asyncHandler