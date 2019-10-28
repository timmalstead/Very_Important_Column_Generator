const express = require("express")
const router = express.Router()
const Auth = require("../models/authModel")
const Foreign = require("../models/foreignModel")

const isLoggedIn = (req, res, next) => {
    if(req.session.logged) {
        next()
    } else {
        req.session.message = "Username or password is incorrect"
        res.redirect('/')
    }
}

//index route

router.get("/", isLoggedIn, (req,res) => {
    res.render("articles/articleIndex")
})

//post route

router.post("/show", async (req,res) => {
    const foreignArticle = {}
    foreignArticle.country = req.body.country
    foreignArticle.unitOfTime = [req.body.unitOfTime, req.body.unitOfTime2]
    foreignArticle.nouns = [req.body.noun, req.body.noun2, req.body.noun3, req.body.noun4, req.body.noun5, req.body.noun6, req.body.noun7, req.body.noun8, req.body.noun9]
    foreignArticle.adjectives = [req.body.adjective, req.body.adjective2, req.body.adjective3, req.body.adjective4, req.body.adjective5, req.body.adjective6]
    foreignArticle.verbs = [req.body.verb, req.body.verb2, req.body.verb3, req.body.verb4, req.body.verb5, req.body.verb6, req.body.verb7]
    foreignArticle.importantFigure = req.body.importantFigure
    foreignArticle.abstractConcept = req.body.abstractConcept
    foreignArticle.dayOfTheWeek = req.body.dayOfTheWeek
    foreignArticle.blueCollarOccupation = req.body.blueCollarOccupation
    foreignArticle.quote = req.body.quote
    await Foreign.create(foreignArticle)
    // console.log(createdArticle)
    res.render("articles/articleShow", {
      article : foreignArticle
    })
})

//new route

router.get("/new", (req,res) => {
    res.render("articles/articleNew")
})

module.exports = router