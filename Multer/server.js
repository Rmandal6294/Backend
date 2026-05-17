import { ok } from "assert";
import express from "express"
import multer from "multer"
import path from "path"
import { fileURLToPath } from "url";
import usermodel from "./models/usermodel.js"

const app = express()

const __dirname = path.dirname(fileURLToPath(import.meta.url))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        const filename = Date.now() + '-' + Math.round(Math.random() * 1E9) + "_" + path.extname(file.originalname)
        cb(null, filename)
    }
})
const upload = multer({ storage: storage })


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"))
})

//singe file upload
app.post('/profile', upload.single('image'), function (req, res) {
    console.log(req.file)
    res.status(200).send("ok")
})

// multiple file upload
app.post('/multiple', upload.array('photos', 12), function (req, res) {
    console.log(req.files)
    res.status(200).send("done")
})

app.post("/fields", upload.fields([{ name: "images", maxCount: 2 }, { name: "files", maxCount: 5 }]), (req, res) => {
    console.log(req.files)
    res.status(200).send("All done")
})

app.post("/profilePic", upload.single('pic'), async (req, res) => {
    const { name } = req.body;
    const check = await usermodel.findOne({ name: name });
    if (!check) {
        await usermodel.create({
            name,
            profilePic: req.file.filename
        })
        res.redirect("/")
    }
    res.send("Already Exits")

})

app.get("/img", async (req, res) => {
    const { name } = req.query;
    const check = await usermodel.findOne({ name: name });

    if (!check) return res.status(401).send("Not Found")
    res.send(check.profilePic)
})

app.listen(3000)