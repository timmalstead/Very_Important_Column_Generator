const express = require("express")
const app = express()
const methodOverride = require("method-override")
// const session = require("express-session")

require("./db/db")

//this is where you will set up session

//this is where you will set a view engine, probably pug
app.use(express.urlencoded({extended:false}))
app.use(methodOverride("_method"))
app.use(express.static("public"))
app.use(express.json())

//this is where you will set up your controllers

app.get("/", (req,res) => {
    res.send("howdy")
})

const port = 3000

app.listen(port, () => {
    console.log(`Server up and running on ${port}`)
})