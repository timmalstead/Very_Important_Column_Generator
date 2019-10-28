const express = require("express")
const router = express.Router()
const Auth = require("../models/authModel")
const bcrypt = require("bcryptjs")

router.get("/logout", (req,res) => {
    req.session.destroy()
    res.redirect("/")      
})

router.post("/register", async (req,res) => {

    const password = req.body.password
    const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10))

    const registeredUser = {}
    registeredUser.username = req.body.username
    registeredUser.password = passwordHash
    registeredUser.timesLogged = 1

    await Auth.create(registeredUser)
    req.session.username = registeredUser.username
    req.session.logged = true
    res.redirect("/articles/")
})

router.post("/login", async (req,res) => {
    try{
        const loginUser = await Auth.findOne({username : req.body.username})
        if (loginUser) {
            if (bcrypt.compareSync(req.body.password, loginUser.password)) {
                req.session.username = loginUser.username
                req.session.logged = true
                req.session.message = ""
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

module.exports = router