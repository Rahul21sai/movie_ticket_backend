var express = require('express');
var app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const movieRouter = require('./Routes/movieRoute')
const userRouter = require('./Routes/userRoute')
const showRoute = require('./Routes/showRoute')
var mongoose =require("mongoose");
mongoose.set("strictQuery",true)


mongoose.connect("mongodb+srv://pardhu:lRRtVuJD4pDqBNJJ@initialcluster.tc8xupd.mongodb.net/test",{ useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;
db.on("open",()=>console.log("Connected to DB"));
db.on("error",()=>console.log("Error occurred"));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());

app.use("/movies", movieRouter)
app.use("/users", userRouter)
app.use('/shows',showRoute)

app.listen(4000,()=>{
    console.log("Server started at 4000");
})
