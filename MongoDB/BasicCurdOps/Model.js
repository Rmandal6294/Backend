import mongoose from "mongoose"

mongoose.connect("mongodb://localhost:27017/MongoCurdOps")

const useScheme = mongoose.Schema({
    name: String,
    userName: String,
    email: String,
    password: Number
})

export default mongoose.model("User", useScheme)