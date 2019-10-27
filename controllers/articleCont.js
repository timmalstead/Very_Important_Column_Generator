const express = require("express")
const router = express.Router()

router.get("/", (req,res) => {
    res.render("article")
})

module.exports = router