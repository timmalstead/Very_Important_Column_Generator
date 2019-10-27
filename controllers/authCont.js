const express = require("express")
const router = express.Router()
const Auth = require("../models/authModel")
const bcrypt = require("bcryptjs")

router.post("/register", async (req,res) => {

    //takes info from the form, encrypts password and puts into an object

    const password = req.body.password
    const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10))

    const registeredUser = {}
    registeredUser.username = req.body.username
    registeredUser.password = passwordHash

    //add the user to the db

    await Auth.create(registeredUser)
    res.send("howdy")
})

module.exports = router