const express = require("express")
const router = express.Router()
const Auth = require("../models/authModel")
const Foreign = require("../models/foreignModel")
const Domestic = require("../models/domesticModel")
const Values = require("../models/valuesModel")


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
    const foreignArticles = await Auth.findOne({_id : req.session.userId}).populate("foreignArticles")
    const domesticArticles = await Auth.findOne({_id : req.session.userId}).populate("domesticArticles")
    const valuesArticles = await Auth.findOne({_id : req.session.userId}).populate("valuesArticles")
    req.session.totalArticles = []
    for (let i = 0; i < foreignArticles.foreignArticles.length; i++) {
        req.session.totalArticles.push(foreignArticles.foreignArticles[i])
    }
    for (let i = 0; i < domesticArticles.domesticArticles.length; i++) {
        req.session.totalArticles.push(domesticArticles.domesticArticles[i])
    }
    for (let i = 0; i < valuesArticles.valuesArticles.length; i++) {
        req.session.totalArticles.push(valuesArticles.valuesArticles[i])
    }
    const user = req.session
    res.render("articles/articleIndex", {
       user
    })
})

//post routes

router.post("/foreignarticle", async (req,res) => {
    req.session.isFirstDraft = true
    user = req.session
    const foreignArticle = {}
    foreignArticle.isForeign = true
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
    domesticArticle.isDomestic = true
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

router.post("/valuesarticle", async (req,res) => {
    req.session.isFirstDraft = true
    user = req.session
    const valuesArticle = {}
    valuesArticle.isValues = true
    valuesArticle.nouns = [req.body.noun, req.body.noun2, req.body.noun3, req.body.noun4, req.body.noun5, req.body.noun6, req.body.noun7, req.body.noun8, req.body.noun9, req.body.noun10, req.body.noun11]
    valuesArticle.adjectives = [req.body.adjective, req.body.adjective2, req.body.adjective3, req.body.adjective4,req.body.adjective5, req.body.adjective6, req.body.adjective7, req.body.adjective8]
    valuesArticle.verbs = [req.body.verb, req.body.verb2, req.body.verb3, req.body.verb4, req.body.verb5, req.body.verb6, req.body.verb7, req.body.verb8]
    valuesArticle.importantFigure = [req.body.importantFigure, req.body.importantFigure2]
    valuesArticle.title = req.body.title
    const newArticle = await Values.create(valuesArticle)
    const foundUser = await Auth.findById(req.session.userId)
    foundUser.valuesArticles.push(newArticle._id)
    foundUser.save()
    res.render("articles/valuesArticleShow", {
      article : valuesArticle,
      user
    })
})

//new route

router.get("/new", (req,res) => {
    const randomArticle = Math.floor(Math.random() * 3)
    if (randomArticle === 0) {
        res.render("articles/foreignArticleNew")
    } else if (randomArticle === 1) {
        res.render("articles/domesticArticleNew")
    } else {
        res.render("articles/valuesArticleNew")
    }
})

//show routes

router.get("/foreign/:id", async (req,res) => {
    const findUser = await Auth.findOne({"foreignArticles" : req.params.id}).populate({path: "foreignArticles", match : {_id: req.params.id}})
    const article = findUser.foreignArticles[0]
    req.session.isFirstDraft = false
    user = req.session
    res.render("articles/foreignArticleShow", {
        article,
        user
      })
})

router.get("/domestic/:id", async (req,res) => {
    const findUser = await Auth.findOne({"domesticArticles" : req.params.id}).populate({path: "domesticArticles", match : {_id: req.params.id}})
    const article = findUser.domesticArticles[0]
    req.session.isFirstDraft = false
    user = req.session
    res.render("articles/domesticArticleShow", {
        article,
        user
      })
})

router.get("/values/:id", async (req,res) => {
    const findUser = await Auth.findOne({"valuesArticles" : req.params.id}).populate({path: "valuesArticles", match : {_id: req.params.id}})
    const article = findUser.valuesArticles[0]
    req.session.isFirstDraft = false
    user = req.session
    res.render("articles/valuesArticleShow", {
        article,
        user
      })
})

//edit routes

router.get("/foreign/:id/edit", async (req,res) => {
    const article = await Foreign.findById(req.params.id)
    req.session.articleType = "foreign"
    res.render("articles/foreignArticleEdit", {
        article
    })
})

router.get("/domestic/:id/edit", async (req,res) => {
    const article = await Domestic.findById(req.params.id)
    req.session.articleType = "domestic"
    res.render("articles/domesticArticleEdit", {
        article
    })
})

router.get("/values/:id/edit", async (req,res) => {
    const article = await Values.findById(req.params.id)
    req.session.articleType = "values"
    res.render("articles/valuesArticleEdit", {
        article
    })
})

//put edit route

//values article show route is the last one to do. construct new pug file and triple check all the other parts.

router.put("/:id", async (req,res) => {
    const updatedArticle = await Foreign.findByIdAndUpdate(req.params.id, req.body) || await Domestic.findByIdAndUpdate(req.params.id, req.body)
    res.redirect("/articles")
})

//delete route

router.delete("/:id", async (req,res) => {
    const removeArticles = await Foreign.findByIdAndRemove(req.params.id) || await Domestic.findByIdAndRemove(req.params.id) || await Values.findByIdAndRemove(req.params.id)
    const removeFromUserArray = await Auth.findOne({"foreignArticles" : req.params.id}) || await Auth.findOne({"domesticArticles" : req.params.id}) || await Auth.findOne({"valuesArticles" : req.params.id})
    await removeFromUserArray.foreignArticles.remove(req.params.id)
    await removeFromUserArray.domesticArticles.remove(req.params.id)
    await removeFromUserArray.valuesArticles.remove(req.params.id)
    const saveUpdatedAuthArray = await removeFromUserArray.save()
    res.redirect("/articles")
})

module.exports = router