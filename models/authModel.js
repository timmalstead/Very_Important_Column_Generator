const mongoose = require("mongoose")

const authSchema = new mongoose.Schema ({
    // timesLogged : Number,
    username : String,
    password : String,
    articles : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Foreign"
    }]
})

const Auth = mongoose.model("Auth", authSchema)

module.exports = Auth