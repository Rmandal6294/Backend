import express from "express"
const route = express.Router()

import postValidation from "../middlewares/postValidation.js";
import postRules from "../validator/postRules.js";

import { getAllPost, createPost } from "../controllers/postController.js";

route.get("/", getAllPost)

route.post("/", postRules, postValidation, createPost)

export default route

