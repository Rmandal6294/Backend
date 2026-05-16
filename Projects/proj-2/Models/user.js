import mongoose from "mongoose"

mongoose.connect("mongodb://localhost:27017/miniApp")

const userSchema = mongoose.Schema({
    username : String,
    name : String,
    email: String,
    password : String,
    age: Number,
    post : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref : "post"
        }
    ]
})

export default mongoose.model("user", userSchema)