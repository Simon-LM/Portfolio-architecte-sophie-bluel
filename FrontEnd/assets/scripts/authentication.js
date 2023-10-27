console.log("Page JAvaScripte | AUTHENTICATION")

// Password visibility ON/OFF //
const eyes = document.getElementById("eyes")
const eyeOn = document.getElementById("eye-on")
const eyeOff = document.getElementById("eye-off")
const passwordField = document.querySelector("input[type=password]")
const showErrorIdentifier = document.getElementById("title-identifier")
const showErrorPassword = document.getElementById("title-password")
eyes.addEventListener("click", () => {
    if (passwordField.type !== "text") {
        eyeOff.style.display = "none"
        eyeOn.style.display = "block"
        passwordField.type = "text"
        console.log("Click to make the password visible") 
    } else {
        eyeOn.style.display = "none"
        eyeOff.style.display = "block"
        passwordField.type = "password"
        console.log("Click for hidden the password")
    }
})
// Log IN or OUT // 
const token = window.localStorage.getItem("token")
    // // // AUTHENTICATION | Log IN
    let submit = document.querySelector("#authentication")
    submit.addEventListener("submit", function (event) {
        console.log("click on submit")
        event.preventDefault()
        const login = {
            email: document.getElementById("email-id").value,
            password: document.getElementById("password-id").value,
        }
        const toLogin = JSON.stringify(login)
        console.log(toLogin)
        fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: toLogin,
        })
            .then((responseAPI) => {
                if (!responseAPI.ok) {
                    if (responseAPI.status === 404) {
                        showErrorIdentifier.textContent = "Adresse email ou identifiant incorrect"
                        showErrorIdentifier.style.color = "red"
                        console.log(responseAPI.status)
                        console.log("Adresse email ou identifiant incorrect")
                        if (responseAPI.status !== 401) {
                            showErrorPassword.style.color = "black"
                        }
                        return
                    }
                    if (responseAPI.status === 401) {
                        showErrorPassword.textContent = "Mot de passe incorrect"
                        showErrorPassword.style.color = "red"
                        console.log(responseAPI.status)
                        console.log("Mot de passe incorrect")
                        if (responseAPI.status !== 404) {
                            showErrorIdentifier.style.color = "black"
                        }
                        return
                    }
                }
                else {
                    return responseAPI.json()
                        .then((jsonResponseAPI) => {
                            if (!jsonResponseAPI.token) {
                                console.log("A token is missing")
                                console.log(responseAPI.status)
                            }
                            if (jsonResponseAPI.token) {
                                const token = jsonResponseAPI.token
                                console.log(responseAPI.status)
                                console.log(token)
                                window.localStorage.setItem("token", token)
                                const logInOrOut = document.querySelector(".log-in-out")
                                logInOrOut.textContent = "logout"
                                window.location = "../index.html"
                            }
                        })
                }
            })
    })
