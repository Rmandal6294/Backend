// import express from 'express';
import express from 'express';

// const app = express();
const app = express();

// Middleware function to log request details
const logger = (req, res, next) => {
    const currentTime = new Date().toISOString();
    console.log(`${currentTime} - ${req.method} ${req.url}`);
    next(); // Call the next middleware or route handler
};

// export the logger middleware
export default logger;
