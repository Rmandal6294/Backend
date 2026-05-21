class AppError extends Error { // AppError is a child of JavaScript's built-in Error class

    constructor(message, statusCode) { // the constructor runs. "new AppError("User not found", 404)"

        super(message) // This calls the parent Error constructor.
        this.statusCode = statusCode // Stores the HTTP status code.
        this.isOperational = true // This is a custom flag. Used to identify:Expected application errors
        Error.captureStackTrace(this, this.constructor) // This creates a clean stack trace. Without it, constructor details may appear in the stack.This line removes unnecessary constructor noise. Cleaner debugging.
    }
}

export default AppError