const mongoose=require("mongoose");
const theatreSchema = new mongoose.Schema({
    "name": {type:String},
    "city": {type: String}
}, {
    "collection": "theatres"
})

module.exports = mongoose.model("theatreSchema", theatreSchema);