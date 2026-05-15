// acquire express 
import express from 'express'

// create express app
const app = express()

// import userModel & postModel
import userModel from "./models/user.js"
import postModel from "./models/post.js"

// create / route
app.get("/", (req, res)=>{
    res.send("<h1>🌐 Server Running ............ </h1>")
})

// create a user create route
app.get("/create", async (req, res)=>{
    const createdUser = await userModel.create({
        username : "Ranit Mandal",
        email : "Ranit@email.com",
        age : 21
    })

    res.send(createdUser)
})

app.get("/post/create", async(req, res)=>{
    const createdPost = await postModel.create({
        postdata: "Hii My Name Is Ranit Mandal. I am a MERN Stack Dev. I'm Learning Data Association",
        user : "6a0449e84ce3d8224a9ffaa0"
    })

    const user = await userModel.findOne({_id : "6a0449e84ce3d8224a9ffaa0"})
    user.post.push(createdPost._id)
    await user.save()
    res.send({createdPost, user})
})

// listing the server
app.listen(3000, ()=>{
    console.log("Starting server at - http://localhost:3000")
})