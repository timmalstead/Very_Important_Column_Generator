const express = require("express")
const app = express()
const methodOverride = require("method-override")
const session = require("express-session")

require("dotenv").config()

const PORT = process.env.PORT

require("./db/db")

app.use(session({
    secret : "q$Kr!E50$2C7",
    resave : false,
    saveUninitialized : false
}))

app.set("view engine", "pug")
app.use(express.urlencoded({extended:false}))
app.use(methodOverride("_method"))
app.use(express.static("public"))
app.use(express.json())

const articleController = require("./controllers/articleCont")
app.use("/articles", articleController)

const authController = require("./controllers/authCont")
app.use("/auth", authController)

app.get("/", (req,res) => {
    res.render("index", {
        session : req.session
    })
})

// const port = 3000

app.listen(PORT, () => {
    console.log(`Server up and running on ${PORT}`)
})