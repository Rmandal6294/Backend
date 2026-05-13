import express from "express"
import cookieParser from "cookie-parser"

const app = express()

app.use(express.json())
app.use(cookieParser())

//! -------- Set Cookie --------------
app.get("/", (req, res)=>{
    res.cookie("name", "Ranit Mandal")
    res.send(" <h1> 🍪 Cookie Set/Read ......... </h1>")
})

//! ---------- read cookie ---------
app.get("/read", (req, res)=>{
    const cookie = req.cookies
    console.log(cookie)
    res.send(`<h2> The Cookie is : -> ${req.cookies.name}</h2>`)
})

//! -------- delete cookie ---------
app.get("/delete", (req, res)=>{
    res.clearCookie("name");
    res.send("<h1> Cookie Clear </h1>")
})

//! --------- Setting Cookie securely ----------
app.get("/setCookie", (req, res)=>{
    res.cookie("username", "Ranit_Mandal", {
        maxAge: 1 * 24 * 60 * 60 * 1000, // cookie expire in 1 day
        httpOnly: true, // Block Access By Js
        // secure: true, // Only sent over HTTPS
        sameSite: "strict" // Controls cross-site sending — prevents CSRF
    })

    res.send("<h1> Secure Cookie </h1>")
})


app.listen(3000, ()=>{
    console.log("Server Running on - http://localhost:3000")
})