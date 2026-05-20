import dotenv from "dotenv"
dotenv.config()

import express from 'express'
const app = express()

import helmet from 'helmet'
import cors from 'cors'
import rateLimit from 'express-rate-limit'
import cookieParser from 'cookie-parser'
import User from "./models/user.js"
import jwt from "jsonwebtoken"

//! -------------- security ---------------------

app.use(helmet()) // stops clickjacking ,  prevents MIME sniffing attacks, 
// Controls what URL info is sent when user clicks a link from your site, attackers can't target known Express vulnerabilities

app.use(cors({
    origin: process.env.CLIENT_URL,// only http://localhost:5173 can call this API  every other website gets blocked
    credential: true// allows cookies to be sent with requests needed because you use res.cookie() for your token
}))

//! ---------------- Rate limiting ------------------------
const userRequestLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes in milliseconds 15 × 60 = 900 seconds × 1000 = 900,000 ms
    max: 100, // max 100 requests from one IP in that 15 minutes
    statusCode: 429, // return code when user reached the limit
    message: "Too many request, please try again later." // return message when user reached the limit
})

//! --------------- Parsing ----------
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))
app.use(cookieParser())

//! ------- Route ------
app.get("/", (req, res)=>{
    res.send("conncted")
})

app.post("/", userRequestLimiter, async (req, res) => {
    const { name } = req.body;

    const existUser = await User.findOne({name})
    if(existUser) return res.status(409).json({message: "User Already Exits"})

    try {
        const addName = await User.create({
            name,
        })
        const token = jwt.sign({userId: addName._id}, process.env.JWT_SECRET)
        res.cookie("name", token)
        res.status(200).json({
            name : addName.name,
            id: addName._id
        })
    } catch(err) {
        res.status(401).json({message: ""})
    }

})

//! Global error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ message: err.message })
})

//! server running
app.listen(process.env.PORT, ()=>{
    console.log(`Server on port http://localhost:${process.env.PORT}`)
})