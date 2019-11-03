const register = document.querySelector("#registerfield")
const getRegisterField = document.querySelector("#getregisterfield")
const registerInput = document.querySelector("#registerInput")

getRegisterField.addEventListener("click", function() {
    register.classList.toggle("show")
    registerInput.focus()
})

const login = document.querySelector("#loginfield")
const loginButton = document.querySelector("#loginbutton")
const loginField = document.querySelector("#loginInput")

loginButton.addEventListener("click", function() {
    const classNumber = document.getElementsByClassName("show")
    if (classNumber.length < 2) {
        login.classList.toggle("show")
        if (loginButton.innerText === "LOG IN") {
            loginButton.innerText = "X"
        } else {
            loginButton.innerText = "LOG IN"
        }
    } else {
        for (let i=0; i < classNumber.length; i++) {
            classNumber[i].classList.remove("show")
        }
    }
    loginField.focus()
})

const hamburger = document.querySelector(".hamburgermenu")
const sideMenu = document.querySelector(".sidemenu")

hamburger.addEventListener("click", function() {
    const classNumber = document.getElementsByClassName("show")

    if (classNumber.length <= 1){
        sideMenu.classList.toggle("show")
    } else {
        for (let i=0; i <= classNumber.length; i++) {
            classNumber[i].classList.remove("show")
        }
    }
})

const sideLogin = document.querySelector("#sideloginbutton")

sideLogin.addEventListener("click", function() {
    login.classList.toggle("show")
    loginField.focus()
})

const lightDark = document.querySelectorAll(".lightdarktoggle")
const tom = document.querySelector(".tom")
const buttons = document.querySelectorAll("button")

function assignLightDark() {
    document.documentElement.classList.toggle("inverted")
    document.body.classList.toggle("dark")
    if (tom) {
        tom.classList.toggle("inverted")
    }
    if (document.documentElement.classList.value === "inverted") {
        window.localStorage.setItem("mode", "dark")
    } else {
        window.localStorage.setItem("mode", "light")
    }
}

lightDark.forEach(btn => {
    btn.addEventListener("click", function() {
        assignLightDark()
    })
})

window.addEventListener("load", () => {
    if (window.localStorage.mode === "dark") {
        assignLightDark()
    }
})

const countryInput = document.querySelector("#countryId")
const changeNameInput = document.querySelector("#changeName")
const firstNounInput = document.querySelector("#firstNoun")

window.addEventListener("load", function() {
    if (countryInput) {
        countryInput.focus()
    } else if (changeNameInput) {
        changeNameInput.focus()
    } else if (firstNounInput) {
        firstNounInput.focus()
    }
})