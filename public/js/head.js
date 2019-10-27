const register = document.querySelector("#registerfield")
const getRegisterField = document.querySelector("#getregisterfield")

getRegisterField.addEventListener("click", function() {
    register.classList.toggle("show")
})

const login = document.querySelector("#loginfield")
const loginButton = document.querySelector("#loginbutton")

loginButton.addEventListener("click", function() {
    login.classList.toggle("show")
    if (loginButton.innerText === "LOG IN") {
        loginButton.innerText = "X"
    } else {
        loginButton.innerText = "LOG IN"
    }
})