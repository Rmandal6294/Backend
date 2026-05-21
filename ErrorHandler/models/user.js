import dotenv from "dotenv"
dotenv.config()

import mongoose from "mongoose"
import AppError from "../utils/AppError.js"

mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("DataBase Conncted")
}).catch(err=>{
    throw new AppError("Database not Connected", 503)
    process.exit(1)
})

const userScheme = mongoose.Schema({
    name : {
        type : String,
        required: true
    },

    email : {
        type : String,
        unique: true,
        lowercase: true,
        required: true
    },

    password : {
        type : String,
        required: true
    }
})

export default mongoose.model("user", userScheme)