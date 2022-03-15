const express = require('express')
const app = express()
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const authRoute = require('./routes/auth')
const usersRoute = require('./routes/users')
const postsRoute = require('./routes/posts')
const categoryRoute = require('./routes/categories')
const multer = require("multer")

dotenv.config()
app.use(express.json())

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true

}).then(console.log("Connect to mongodb")).catch(err => console.log(err));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images")
    }, filename: (req, file, cb) => {
        cb(null, req.body.name)
    }
})

const upload = multer({ storage: storage })
app.post("/api/upload", upload.single("file"), (req, res) => {
    res.status(200).json("File has been uploaded")
})

app.use("/api/auth", authRoute)
app.use("/api/users", usersRoute)
app.use("/api/posts", postsRoute)
app.use("/api/categories", categoryRoute)

app.listen("5000", () => {
    console.log("Backend is running.")
})