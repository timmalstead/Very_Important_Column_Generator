const mongoose = require("mongoose")

const authSchema = new mongoose.Schema ({
    // timesLogged : Number,
    username : String,
    password : String
})

module.exports = mongoose.model("Auth", authSchema)