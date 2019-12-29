const mongoose = require("mongoose")

const authSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: String,
  foreignArticles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Foreign"
    }
  ],
  domesticArticles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Domestic"
    }
  ],
  valuesArticles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Values"
    }
  ]
})

const Auth = mongoose.model("Auth", authSchema)

module.exports = Auth
