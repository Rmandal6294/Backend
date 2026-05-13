import express from "express"
import bcrypt from "bcrypt"
import cookieParser from "cookie-parser"

const app = express()

app.use(express.json())
app.use(cookieParser())


const saltRounds = 10;
let myPlaintextPassword = "Ranit@2005"

app.get("/", async (req, res) => {
    try {
        const hash = await bcrypt.hash(
            myPlaintextPassword,
            saltRounds
        )

        res.cookie("Password", hash)
        res.send("<h1>Password Encrypted and Set On Cookie</h1>")

    } catch (error) {
        res.status(500).send(error.message)
    }
})

app.get("/decrypt", async (req, res)=>{
    try{
        const hash = req.cookies.Password
        const result = await bcrypt.compare(myPlaintextPassword, hash)
        if(result) {
            res.send("<h1> ✅ Password Matched! </h1>")
        } else {
            res.send("<h1> ❌ Password Not Matched! </h1>")
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
})

app.listen(3000, () => {
    console.log("Server Running on - http://localhost:3000")
})