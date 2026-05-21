import asyncHandler from "../utils/asyncHandler.js"
import AppError from "../utils/AppError.js"
import User from "../models/user.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

const register = asyncHandler(async(req, res)=>{
    const {name, email, password} = req.body

    const isExits = await User.findOne({email})
    if(isExits) throw new AppError("user already exits", 409)

    const hashPass = await bcrypt.hash(password, parseInt(process.env.SALT_ROUND) || 12)
    const C_user = await User.create({
        name,
        email,
        password: hashPass
    })
    const token = jwt.sign({userId:C_user._id}, process.env.SALT_ROUND)

    res.cookie("token", token)

    return res.status(201).json({
        success: true,
        message: "User Registered",
        user: {
            id: C_user._id,
            name: C_user.name
        }
    })
})

export default register
