// acquire mongoose
import mongoose from "mongoose"

// create post schema
const postSchema = mongoose.Schema({
    postdata : String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref : "user"
    },
    date: {
        type : "date",
        default : Date.now
    }
})

//export post model
export default mongoose.model("post", postSchema)