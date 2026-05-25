import dotenv from "dotenv";
dotenv.config();

import express from 'express';
import cookieParser from "cookie-parser";
import v1Routes from './src/routes/v1.js';     
import v2Routes from './src/routes/v2.js';      
import helmet from "helmet";
import expressRateLimit from "express-rate-limit";     
import errorHandler from './src/middleware/errorHandler.js';

const app = express();
app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const limiter = expressRateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: "Too many requests from this IP, please try again after 15 minutes"
});
app.use(limiter);

app.get('/', (req, res) => {
    res.send("Welcome to the API");
});
app.use('/api/v1', v1Routes);
app.use('/api/v2', v2Routes);

app.use(errorHandler);  

export default app;