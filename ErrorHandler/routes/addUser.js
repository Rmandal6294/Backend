import express from "express"
const route = express.Router()
import userRule from "../validator/userRules.js"
import userValidate from "../middleware/uservalidation.js"
import UserAuth from "../controllers/userAuth.js"

route.get("/", (req, res)=>{
    res.send("Running")
})

route.post("/user", userRule, userValidate, UserAuth)


export default route
