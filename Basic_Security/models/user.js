import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()

mongoose.connect(process.env.MONGO_URL)
    .then(()=>{
        console.log("Database Connected")
    }).catch(err => {
        console.log("Database Not Connected")
        process.exit(1)
    })

const userSchema = mongoose.Schema({
    name : {
        type: String,
        required : true
    }
})

export default mongoose.model("name", userSchema)