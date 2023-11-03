const express = require("express");
const showSchema = require("../modelSchema/showSchema");
const showRoute = express.Router();
const mongoose = require("mongoose");

const createShowForDateAndTime = async (showName, date, time) => {
    try {
      const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
      const seats = [];
  
      for (let row of rows) {
        for (let i = 1; i <= 8; i++) {
          seats.push({
            seatId: `${row}${i}`,
            isOccupied: false,
            userDetails: null
          });
        }
      }
  
      const show = new showSchema({ showName, date, time, seats });
      await show.save();
  
      console.log(`Show ${showName} on ${date} at ${time} created with seats.`);
    } catch (error) {
      console.error(error);
    }
};

const removeOldShows = async () => {
    try {
      const currentDate = new Date();
      await showSchema.deleteMany({ date: { $lt: currentDate } });
      console.log(`Removed old shows.`);
    } catch (error) {
      console.error(error);
    } 
  };

showRoute.get("/createshow",(req,res)=>{
    removeOldShows();
    const today=new Date();
    const time="11:00";
    const showname="jjk";
    createShowForDateAndTime(showname,today,time);
})

showRoute.post("/updateshow",(req,res)=>{
    showSchema.create(req.body, (err,data) => {
        if(err)
            return err;
        else
            res.json(data);
    })
})

showRoute.get("/",(req,res)=>{
    showSchema.find((err,data)=>{
        if(err)
            return err;
        else
            res.json(data);
    })
})

showRoute.route("/profile/:id")
.get((req,res)=>{
    showSchema.findById(mongoose.Types.ObjectId(req.params.id),(err,data)=>{
        if(err)
            return err;
        else
            res.json(data);
    })
}).put((req,res)=>{
    showSchema.findByIdAndUpdate(mongoose.Types.ObjectId(req.params.id),
    {$set: req.body},
    (err,data)=>{
        if(err)
            return err;
        else
            res.json(data);
    })
})

showRoute.delete("/deleteshow/:id",(req,res)=>{
    showSchema.findByIdAndRemove(mongoose.Types.ObjectId(req.params.id),
    (err,data)=>{
        if(err)
            return err;
        else
            res.json(data);
    })
})

module.exports = showRoute;