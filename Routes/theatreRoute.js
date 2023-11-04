const express = require("express");
const theatreRoute = express.Router();
const theatreSchema = require("../modelSchema/theatreSchema");
const mongoose = require('mongoose');

theatreRoute.post("/add-theatre",(req,res)=>{
    theatreSchema.create(req.body, (err,data) => {
        if(err)
            return err;
        else
            res.json(data);
    })
})

theatreRoute.get("/",(req,res)=>{
    theatreSchema.find((err,data)=>{
        if(err)
            return err;
        else
            res.json(data);
    })
})

theatreRoute.get('/:city', (req, res) => {
    theatreSchema.find({city: req.params.city}, (err, data) => {
        if(err) return err;
        else res.json(data)
    })
})

theatreRoute.route("/update-theatre/:id")
.get((req,res)=>{
    theatreSchema.findById(mongoose.Types.ObjectId(req.params.id),(err,data)=>{
        if(err)
            return err;
        else
            res.json(data);
    })
}).put((req,res)=>{
    theatreSchema.findByIdAndUpdate(mongoose.Types.ObjectId(req.params.id),
    {$set: req.body},
    (err,data)=>{
        if(err)
            return err;
        else
            res.json(data);
    })
})

theatreRoute.delete("/delete-theatre/:id",(req,res)=>{
    theatreSchema.findByIdAndRemove(mongoose.Types.ObjectId(req.params.id),
    (err,data)=>{
        if(err)
            return err;
        else
            res.json(data);
    })
})

module.exports = theatreRoute;