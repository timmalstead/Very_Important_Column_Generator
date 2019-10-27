const express = require("express")
const app = express()
const methodOverride = require("method-override")
const session = require("express-session")

require("./db/db")

app.use(session({
    secret : "it's a secret!",
    resave : false,
    saveUninitialized : false
}))

app.set("view engine", "pug")
app.use(express.urlencoded({extended:false}))//set this to true to resave?
app.use(methodOverride("_method"))
app.use(express.static("public"))
app.use(express.json())

const articleController = require("./controllers/articleCont")
app.use("/articles", articleController)

const authController = require("./controllers/authCont")
app.use("/auth", authController)

app.get("/", (req,res) => {
    res.render("index", {
        message : req.session.message
    })
})

const port = 3000

app.listen(port, () => {
    console.log(`Server up and running on ${port}`)
})