const express = require("express")
const router = express.Router()
const Auth = require("../models/authModel")
const Foreign = require("../models/foreignModel")
const Domestic = require("../models/domesticModel")


const isLoggedIn = (req, res, next) => {
    if(req.session.logged) {
        next()
    } else {
        req.session.message = "Username or password is incorrect"
        res.redirect('/')
    }
}

//index route

router.get("/", isLoggedIn, async (req,res) => {
    const user = await Auth.findOne({_id : req.session.userId}).populate("foreignArticles")
    res.render("articles/articleIndex", {
       user
    })
})

//post routes

router.post("/foreignarticle", async (req,res) => {
    req.session.isFirstDraft = true
    user = req.session
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
    foreignArticle.title = req.body.title
    const newArticle = await Foreign.create(foreignArticle)
    const foundUser = await Auth.findById(req.session.userId)
    foundUser.foreignArticles.push(newArticle._id)
    foundUser.save()
    res.render("articles/foreignArticleShow", {
      article : foreignArticle,
      user
    })
})

router.post("/domesticarticle", async (req,res) => {
    req.session.isFirstDraft = true
    user = req.session
    const domesticArticle = {}
    domesticArticle.nouns = [req.body.noun, req.body.noun2, req.body.noun3, req.body.noun4, req.body.noun5, req.body.noun6, req.body.noun7, req.body.noun8, req.body.noun9, req.body.noun10, req.body.noun11, req.body.noun12, req.body.noun13, req.body.noun14]
    domesticArticle.adjectives = [req.body.adjective, req.body.adjective2, req.body.adjective3, req.body.adjective4, req.body.adjective5]
    domesticArticle.verbs = [req.body.verb, req.body.verb2, req.body.verb3, req.body.verb4, req.body.verb5, req.body.verb6]
    domesticArticle.importantFigure = [req.body.importantFigure, req.body.importantFigure2]
    domesticArticle.politicalParty = [req.body.politicalParty, req.body.politicalParty2]
    domesticArticle.title = req.body.title
    const newArticle = await Domestic.create(domesticArticle)
    const foundUser = await Auth.findById(req.session.userId)
    foundUser.domesticArticles.push(newArticle._id)
    foundUser.save()
    res.render("articles/domesticArticleShow", {
      article : domesticArticle,
      user
    })
})

//new route

router.get("/new", (req,res) => {
    const randomArticle = Math.floor(Math.random() * 2)
    if (randomArticle === 0) {
        res.render("articles/foreignArticleNew")
    } else {
        res.render("articles/domesticArticleNew")
    }
})

//show route

router.get("/:id", async (req,res) => {
    const findUser = await Auth.findOne({"foreignArticles" : req.params.id}).populate({path: "foreignArticles", match : {_id: req.params.id}})
    const article = findUser.foreignArticles[0]
    req.session.isFirstDraft = false
    user = req.session
    res.render("articles/foreignArticleShow", {
        article,
        user
      })
})

//edit route

router.get("/:id/edit", async (req,res) => {
    const article = await Foreign.findById(req.params.id)
    res.render("articles/foreignArticleEdit", {
        article
    })
})

//put edit

router.put("/:id", async (req,res) => {
    const updatedArticle = await Foreign.findByIdAndUpdate(req.params.id, req.body)
    res.redirect("/articles")
})

//delete route

router.delete("/:id", async (req,res) => {
    const removePhoto = await Foreign.findByIdAndRemove(req.params.id)
    const removeFromUserArray = await Auth.findOne({"foreignArticles" : req.params.id})
    const removePicFromArray = await removeFromUserArray.foreignArticles.remove(req.params.id)
    const saveUpdatedAuthArray = await removeFromUserArray.save()
    res.redirect("/articles")
})

module.exports = router