import User from "../models/user.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import cookieParser from "cookie-parser"

const register = async (req, res) => {
    try {
        const {name, age, email, password} = req.body;

        const existUser = await User.findOne({email})
        if(existUser) return res.status(409).json({message: "User Already Exits"})

        const encryptPassword = await bcrypt.hash(password, 12)

        const createdUser = await User.create({
            name,
            age,
            email,
            password : encryptPassword
        })

        const token = jwt.sign({userId: createdUser._id}, "AllOk")
        res.cookie("singIn", token)

        res.status(200).json({
            message: "User Registered Successfully",
            singInToken: token,
            user: {
                id : createdUser._id,
                name : createdUser.name
            }
        })
    }catch(err){
        res.status(500).json({message: err.message})
    }
}

export default register