import express from 'express'
import useModel from "./Model.js"

const app = express();

app.use((req, res, next) => {
    console.log(`User Requested For ${req.method} ${req.url}`);
    next();
})

app.get("/", (req, res) => {
    res.send("<h1> MongoDB CURD operation </h1><ul><li>For create: - /create</li> <li>For read: - /read</li> <li>For Update: - /update</li> <li>For delete: - /delete</li></ul>")
})

app.get("/create", async (req, res) => {
    let createUser = await useModel.create({
        name: "Ranit Mandal",
        userName: "Ranit6294",
        email: "ranit@gmail.com",
        password: 2803
    })
    res.send(`<h1> ✅User Created Successfully </h1> <p>Created user details: - ${createUser} </p>`)
})

app.get("/read", async (req, res) => {
    let allUsers = await useModel.find()
    res.send(`<h1>🧑‍🦰 Users Collections</h1> ${allUsers}`)
})

app.get("/update", async (req, res) => {
    await useModel.updateOne(
        { name: 'Priya Mondal' },
        { $set: { name: 'Priya Mandal', userName: 'priya4512', email : "priya11@gmail.com", password: 2403 } },
        { upsert: true }
    )
    res.send(`<h1> ☑️ User Updated Successfully </h1>`)
})

app.get("/delete", async (req, res)=>{
    await useModel.deleteOne({name: 'Priya Mandal'})
    res.send(`<h1> 🗑️ User Deleted Successfully </h1>`)

})


app.listen(3000, () => {
    console.log("Server Running on:- http:/localhost:3000")
})