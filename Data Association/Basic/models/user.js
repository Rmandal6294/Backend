// acquire mongoose
import mongoose from "mongoose"

// connect to mongodb
mongoose.connect("mongodb://localhost:27017/DataAssociation")

// create user schema
const userSchema = mongoose.Schema({
    username : String,
    email: String,
    age: Number,

    post : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "post"
        }
    ]
})

// export the user model
export default mongoose.model("user", userSchema)