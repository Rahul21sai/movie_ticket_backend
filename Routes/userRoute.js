const express = require("express");
const userSchema = require("../modelSchema/userSchema");
const userRoute = express.Router();
const mongoose = require("mongoose");

// userRoute.post("/register", (req, res) => {
//   userSchema.create(req.body, (err, data) => {
//     if (err) return err;
//     else res.json.data;
//   });
// });
userRoute.post("/register", (req, res) => {
  userSchema.create(req.body, (err, data) => {
    if (err)
      return res
        .status(500)
        .json({ error: err.message }); // Return an error response
    else res.json(data); // Return the created data
  });
});

userRoute.get("/", (req, res) => {
  userSchema.find((err, data) => {
    if (err) return err;
    else res.json(data);
  });
});

userRoute.get("/get-password/:email", (req, res) => {
  userSchema.findOne({ email: req.params.email }, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.json(data);
    }
  });
});

userRoute
  .route("/profile/:id")
  .get((req, res) => {
    userSchema.findById(mongoose.Types.ObjectId(req.params.id), (err, data) => {
      if (err) return err;
      else res.json(data);
    });
  })
  .put((req, res) => {
    userSchema.findByIdAndUpdate(
      mongoose.Types.ObjectId(req.params.id),
      { $set: req.body },
      (err, data) => {
        if (err) return err;
        else res.json(data);
      }
    );
  });

userRoute.delete("/deleteAccount/:id", (req, res) => {
  userSchema.findByIdAndRemove(
    mongoose.Types.ObjectId(req.params.id),
    (err, data) => {
      if (err) return err;
      else res.json(data);
    }
  );
});

module.exports = userRoute;
