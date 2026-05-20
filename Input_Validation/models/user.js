import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/validation")
    .then(()=>{
        console.log("Mongodb Connected")
    }).catch((err)=>{
        console.error("Mongodb Connection Failed: ", err.message)
        process.exit(1)
    })

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    }
})

export default mongoose.model("user", userSchema)