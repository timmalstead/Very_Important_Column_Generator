const express = require("express")
const router = express.Router()

//new route

router.get("/", (req,res) => {
    res.render("article")
})

module.exports = router