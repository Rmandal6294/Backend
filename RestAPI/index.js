import dotenv from "dotenv"
dotenv.config()

import express from "express"
const app = express();
app.use(express.json())       
app.use(express.urlencoded({ extended: true }))

import cookieParser from "cookie-parser";
app.use(cookieParser())

import postRoutes from "./routes/posts.js"
app.use("/api/v1/posts", postRoutes)

import AppError from "./utils/AppError.js";
app.use((req, res, next) => {
  next(new AppError(`Route ${req.originalUrl} not found`, 404))
})

// at last - global handler
import errorHandler from "./middlewares/errorHandler.js"
app.use(errorHandler)

app.listen(3000, ()=>{
    console.log("Running")
})