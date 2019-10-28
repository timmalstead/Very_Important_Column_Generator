const mongoose = require("mongoose")

const foreignArticle = new mongoose.Schema({
    country : String,
    unitOfTime : [String],//2
    nouns : [String],//9
    adjectives : [String],//6
    verbs : [String],//7
    importantFigure : String,
    abstractConcept : String,
    dayOfTheWeek : String,
    blueCollarOccupation : String,
    quote : String
})

const Foreign = mongoose.model("Foreign", foreignArticle)

module.exports = Foreign