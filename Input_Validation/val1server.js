import express from 'express';
import cookieParser from 'cookie-parser';
import authRoutes from "./routes/register.js"

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

app.use(authRoutes)

app.use((req, res)=>{
    res.status(404).send("Page Not Found!")
})

// global error handle
app.use((err, req, res, next)=>{
    res.status(err.status || 500).json({
        message: err.message || "Something went wrong"
    })
})

app.listen(3000, ()=>{
    console.log("Server Running in http://localhost:3000")
})