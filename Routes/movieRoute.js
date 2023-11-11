const express = require("express");
const movieRoute = express.Router();
const movieSchema = require("../modelSchema/movieSchema");
const mongoose = require('mongoose');

movieRoute.post("/add-movie",(req,res)=>{
    movieSchema.create(req.body, (err,data) => {
        if(err)
            return err;
        else
            res.json(data);
    })
})

movieRoute.get("/",(req,res)=>{
    movieSchema.find((err,data)=>{
        if(err)
            return err;
        else
            res.json(data);
    })
})
movieRoute.get("/get-details/:id",(req,res)=>{
    movieSchema.findById(mongoose.Types.ObjectId(req.params.id),(err,data)=>{
        if(err)
            return err;
        else
            res.json(data);
    })
})
movieRoute.route("/update-movie/:id")
.get((req,res)=>{
    movieSchema.findById(mongoose.Types.ObjectId(req.params.id),(err,data)=>{
        if(err)
            return err;
        else
            res.json(data);
    })
}).put((req,res)=>{
    movieSchema.findByIdAndUpdate(mongoose.Types.ObjectId(req.params.id),
    {$set: req.body},
    (err,data)=>{
        if(err)
            return err;
        else
            res.json(data);
    })
})

movieRoute.delete("/delete-movie/:id",(req,res)=>{
    movieSchema.findByIdAndRemove(mongoose.Types.ObjectId(req.params.id),
    (err,data)=>{
        if(err)
            return err;
        else
            res.json(data);
    })
})

module.exports = movieRoute;