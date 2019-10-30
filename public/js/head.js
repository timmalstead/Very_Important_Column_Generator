const register = document.querySelector("#registerfield")
const getRegisterField = document.querySelector("#getregisterfield")

getRegisterField.addEventListener("click", function() {
    register.classList.toggle("show")
})

const login = document.querySelector("#loginfield")
const loginButton = document.querySelector("#loginbutton")

// const showClass = document.getElementsByClassName('.show').length >= 2

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

lightDark.forEach(btn => {
    btn.addEventListener("click", function() {
        document.documentElement.classList.toggle("inverted")
        document.body.classList.toggle("dark")
        tom.classList.toggle("inverted")
    })
})

//the above is an example of using a for each loop to iterate over the node list (like an array) returned from queryselectorall. With this, it attaches it to each button with the .lightdarktoggle class

// lightDark.addEventListener("click", function() {
//     document.documentElement.classList.toggle("inverted")
//     document.body.classList.toggle("dark")
//     tom.classList.toggle("inverted")
// })