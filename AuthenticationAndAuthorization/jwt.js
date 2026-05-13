import express from "express"
import jwt from "jsonwebtoken"
import cookieParser from "cookie-parser"


const app = express()

app.use(express.json())
app.use(cookieParser())

const data = {
    name: "Ranit Mandal",
    email: "ranit@example.com",
    phone : +916534789856,
}

const secreteString = "SecretePassword"

//! --------- create token through jwt and set in cookie ----------------
app.get("/", (req, res) => {
    const token = jwt.sign(data, secreteString, {expiresIn: "1d"}) // expire in one day
    res.cookie("token", token)
    res.send("<h1> ✅ Done </h1>")
})

//! ---------- Get data from Cookie ----------------
app.get("/data", (req, res)=>{
    const token = req.cookies.token
    const data = jwt.verify(token, secreteString)
    console.log(data)
    res.send(`📖 Data:- /n${JSON.stringify(data)}`)
})

app.listen(3000, () => {
    console.log("Server Running on - http://localhost:3000")
})