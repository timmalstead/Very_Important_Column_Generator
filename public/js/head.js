const register = document.querySelector("#registerfield")
const getRegisterField = document.querySelector("#getregisterfield")

getRegisterField.addEventListener("click", function() {
    register.classList.toggle("show")
})

const login = document.querySelector("#loginfield")
const loginButton = document.querySelector("#loginbutton")

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
})

const lightDark = document.querySelectorAll(".lightdarktoggle")
const tom = document.querySelector(".tom")

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