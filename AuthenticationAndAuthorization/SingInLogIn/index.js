import express from "express"
import UserModel from "./models/UserModel.js"
import bcrypt from "bcrypt"
import cookieParser from "cookie-parser"
import jwt from "jsonwebtoken"

const app = express()
app.set("view engine", "ejs")
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.get("/", (req, res) => {
    res.render("index")
})

app.get("/login", (req, res) => {
    res.render("login")
})

app.post("/create", async (req, res) => {
    const { username, email, password } = req.body

    if (!username || !email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const hash = await bcrypt.hash(password, 10);
        const createdUser = await UserModel.create({
            username,
            email,
            password: hash,
        })
        res.send("Done User Created Successfully")
    } catch (err) {
        res.send(err)
    }

})

app.post("/login", async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const user = await UserModel.findOne({ email });
        if (!user) return res.send("No user Found")

        const result = await bcrypt.compare(password, user.password);
        if (result) {
            const data = {
                username : user.username,
                email: user.email
            }

            const accessToken = await jwt.sign(data, "secreteString")
            res.cookie("accessToken", accessToken)
            res.render("profile")
        } else {
            res.send("Something WRONG!")
        }

    } catch (err) {
        res.send(err)
    }
})

app.get("/logout", (req, res)=>{
    res.clearCookie("accessToken")
    res.redirect("/")
})

app.listen(3000)