const mongoose = require("mongoose")

const valuesArticle = new mongoose.Schema({
    isValues : Boolean,
    title : String,
    nouns : [String],//11
    adjectives : [String],//8
    verbs : [String],//8
    importantFigure : [String]//2
})

const Values = mongoose.model("Values", valuesArticle)

module.exports = Values