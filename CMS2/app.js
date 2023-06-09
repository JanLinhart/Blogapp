const express = require("express");
const mongoose = require("mongoose")
const bodyParser = require('body-parser');
const cors = require("cors");
const fileupload = require("express-fileupload");
require("dotenv/config")

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(fileupload());
app.use(express.static("files"));
app.use(bodyParser({limit: '50mb'}));


const usersRoute = require("./routes/users")
const postsRoute = require("./routes/posts")
const searchRoute = require("./routes/search")

app.use("/posts", postsRoute)
app.use("/users", usersRoute)
app.use("/search", searchRoute)

app.get('/', (req, res) =>{
    res.send('We are home')
})

mongoose.connect(process.env.DB_CONNECT, () =>{
    console.log("connected to db")
})

const PORT = process.env.PORT || 8080;

app.listen(PORT, console.log(`Server started on port ${PORT}`));


