const express = require("express")
const router = express.Router()
const Auth = require("../models/authModel")
const Foreign = require("../models/foreignModel")
const Domestic = require("../models/domesticModel")
const Values = require("../models/valuesModel")
const bcrypt = require("bcryptjs")

//logout route

router.get("/logout", (req,res) => {
    req.session.destroy()
    res.redirect("/")      
})

//register new user route

router.post("/register", async (req,res) => {

    if (req.body.username && req.body.password) {
        const password = req.body.password
        const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10))

        const registeredUser = {}
        registeredUser.username = req.body.username
        registeredUser.password = passwordHash
        registeredUser.timesLogged = 1
        await Auth.create(registeredUser)
        req.session.username = registeredUser.username
        req.session.logged = true
        const user = await Auth.findOne({username : registeredUser.username})
        req.session.userId = user
        res.redirect("/articles/")
    } else {
        req.session.logged = false
        req.session.message = "Username and Password are required."
        res.redirect("/")
    }
})

//login route

router.post("/login", async (req,res) => {
    try{
        const loginUser = await Auth.findOne({username : req.body.username})
        if (loginUser) {
            if (bcrypt.compareSync(req.body.password, loginUser.password)) {
                req.session.username = loginUser.username
                req.session.logged = true
                req.session.message = ""
                req.session.userId = loginUser._id
                res.redirect("/articles/")
            } else {
                req.session.logged = false
                req.session.message = "Username or password is incorrect"
                res.redirect("/")
            }
        } else {
            req.session.logged = false
            req.session.message = "Username or password is incorrect"
            res.redirect("/")
        }
    } catch(err){
        console.log(err)
    }
})

//edit user route

router.get("/edituser", (req,res) =>{
    res.render("auth/authEdit", {
        foundUser : req.session
    })
})

//user put route

router.put("/put", async (req,res) => {
    const updatedUser = await Auth.findById(req.session.userId)
    if (bcrypt.compareSync(req.body.oldPassword, updatedUser.password) && req.body.username && req.body.newPassword) {
        
        const password = req.body.newPassword
        const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10))

        updatedUser.username = req.body.username
        req.session.username = updatedUser.username
        updatedUser.password = passwordHash
        updatedUser.save()
        res.redirect("/articles/")
    } else {
        req.session.message = "Fields are empty or passwords is incorrect."
        res.redirect("/auth/edituser")
    }
})

//delete user route

router.delete("/delete", async (req,res) => {
    const userToBeDeleted = await Auth.findById(req.session.userId)
    const deletedForeignArticles = await Foreign.deleteMany({_id : {$in : userToBeDeleted.foreignArticles}})
    const deletedDomesticArticles = await Domestic.deleteMany({_id : {$in : userToBeDeleted.domesticArticles}})
    const deletedValuesArticles = await Values.deleteMany({_id : {$in : userToBeDeleted.valuesArticles}})
    const deletedUser = await Auth.findByIdAndRemove(req.session.userId)
    req.session.destroy()
    res.redirect("/")
})

module.exports = router