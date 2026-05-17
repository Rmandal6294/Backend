import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/profilePic")

const userSchema = mongoose.Schema({
    name: String,
    profilePic : {
        type : String,
        default : "ami.png"
    }
})

export default mongoose.model("user", userSchema)