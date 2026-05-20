import express from "express"
import registerRules from "../validators/register.js"
import AuthController from "../controllers/registerAuthControllers.js"
import validateRegisterField from "../middlewares/registerValidationError.js"

const route = express.Router()

route.get("/", (req, res)=>{
    res.send("ok")
})
route.post("/register", registerRules, validateRegisterField, AuthController)

export default route