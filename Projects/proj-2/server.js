import express from "express"
import cookieParser from "cookie-parser"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import userModel from "./Models/user.js"
import postModel from "./Models/post.js"
import user from "./Models/user.js"

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

app.get("/", (req, res)=>{
    res.send("<h1> Server Running ....... </h1>")
})

app.post("/register", async (req, res)=>{
    const {username, email, name, age, password} = req.body

    const isUser = await userModel.findOne({email});
    if(isUser) return res.status(500).send("User Already Exits!")

    const pass_word = await bcrypt.hash(password, 10)

    const user = await userModel.create({
        username,
        name,
        email,
        age,
        password : pass_word
    })

    const token = jwt.sign({email:email, userId : user._id }, "AmiRanit")
    res.cookie("user", token)
    res.send("User Created!")
})

app.post("/login", async (req, res)=>{
    const {username, password} = req.body

    const findUser = await userModel.findOne({username});
    if(!findUser) return res.status(500).send("User Not Found")

    const result = await bcrypt.compare(password, findUser.password)

    if(!result) return res.status(500).send("Something went wrong ! Try Again !")

    const token = jwt.sign({email:findUser.email, userId : findUser._id}, "AmiRanit")
    res.cookie("login", token)
    res.redirect("/profile")

})

const isLoggedIn =  (req, res, next) => {
    if(!req.cookies.login) return res.status(401).send("LogIn Fast!")
    const data = jwt.verify(req.cookies.login, "AmiRanit")
    req.user = data
    next();
}

app.get("/profile", isLoggedIn, async (req, res) => {
    const user = await userModel.findOne({ email: req.user.email }).populate("post");
    const postsHTML = user.post.reverse().map(post => `
        <div> 
            <h1>${user.username}</h1>
            <h3>${post.content}</h3>
        </div>
    `).join("");
    res.send(postsHTML);
});

app.post("/post", isLoggedIn, async(req, res)=>{
    const {content} = req.body;
    const user = await userModel.findOne({email:req.user.email})

    const CreatedPost = await postModel.create({
        user: user._id,
        content
    })
    user.post.push(CreatedPost._id)
    await user.save()
    res.redirect("/profile");
})

app.post("/like/:id", isLoggedIn, async(req, res)=>{
    const loggedInUser = await userModel.findOne({ email: req.user.email });
        const post = await postModel.findOne({ _id: req.params.id });

        if (!post) return res.status(404).send("Post not found");

        if (post.likes.indexOf(loggedInUser._id) === -1) {
            post.likes.push(loggedInUser._id);
            await post.save();
            res.send("Post Liked");
        } else {
            post.likes.splice(post.likes.indexOf(loggedInUser._id), 1);
            await post.save();
            res.send("Post UnLiked");
        }
})

app.post("/edit/:id", isLoggedIn, async(req, res)=>{
    const {content} = req.body
    const loggedInUser = await userModel.findOne({ email: req.user.email }).populate("post");

    const post = await postModel.findOne({
        _id: req.params.id,
        user: loggedInUser._id
    })

    if(post){
        post.content = content
        await post.save();
        res.redirect("/profile")
    } else{
        res.send("Post Not Found")
    }
})

app.get("/logout", isLoggedIn, (req, res)=>{
    res.clearCookie("login")
    res.clearCookie('user')
    res.send("Logged Out")
})

app.listen(3000)