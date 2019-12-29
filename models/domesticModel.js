const mongoose = require("mongoose")

const domesticArticle = new mongoose.Schema({
  isDomestic: Boolean,
  title: String,
  nouns: [String], //14
  adjectives: [String], //5
  verbs: [String], //6
  importantFigure: [String], //2
  politicalParty: [String] //2
})

const Domestic = mongoose.model("Domestic", domesticArticle)

module.exports = Domestic
