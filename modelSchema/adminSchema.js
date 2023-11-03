const mongoose = require('mongoose')
const adminSchema = new mongoose.Schema({
    "name": {type:String},
    "email": {type: String},
    "password": {type: String}
}, {
    "collection": "admin"
})

module.exports = mongoose.model("adminSchema", adminSchema)