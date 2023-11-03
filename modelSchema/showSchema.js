const mongoose = require('mongoose');

const seatSchema = new mongoose.Schema({
  seatId: String, // Change type to String for alphanumeric identifiers
  isOccupied: {
    type: Boolean,
    default: false
  },
  userDetails: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
  },{
    collection:"showdb"
  }
);

const showSchema = new mongoose.Schema({
  showName: String,
  date: Date,
  time: String,
  seats: [seatSchema]
});

module.exports=mongoose.model('showdb',showSchema);