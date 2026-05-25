import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";

const isLoggedIn =  (req, res, next) => {
    if(!req.cookies.token) return res.status(401).send("LogIn Fast!")
    const data = jwt.verify(req.cookies.token, process.env.SECRET_KEY)
    req.user = data
    next();
}

export default isLoggedIn;