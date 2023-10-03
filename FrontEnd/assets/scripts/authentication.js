console.log("Page JAvaScripte | AUTHENTICATION")

// const logInOrOut = document.querySelector(".log-in-out")
// Password visibility ON/OFF //
const eye = document.querySelector(".icon-eye");
const eyeoff = document.querySelector(".icon-eye-off");
const passwordField = document.querySelector("input[type=password]");
eyeoff.addEventListener("click", () => {
    eyeoff.style.display = "none";
    eye.style.display = "block";
    passwordField.type = "text";
    console.log("Click to make the password visible")
});
eye.addEventListener("click", () => {
    eye.style.display = "none";
    eyeoff.style.display = "block";
    passwordField.type = "password";
    console.log("Click for hidden the password")
});

// Log IN or OUT // 
const token = window.localStorage.getItem("token")
    // AUTHENTICATION | Log IN
    let submit = document.querySelector("#authentication")
    submit.addEventListener("submit", function (event) {
        console.log("click on submit")
        event.preventDefault()  // Désactivation du comportement par défaut du navigateur
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
                        alert("Adresse email ou identifiant incorrect")
                        console.log(responseAPI.status)
                        console.log("Adresse email ou identifiant incorrect")
                        return
                    }
                    if (responseAPI.status === 401) {
                        alert("Mot de passe incorrect")
                        console.log(responseAPI.status)
                        console.log("Mot de passe incorrect")
                        return
                    }
                    else {
                        alert("Adresse email ou mot de passe non valide")
                        console.log(responseAPI.status)
                        console.log("Adresse email ou mot de passe non valide")
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
                                const token = JSON.stringify(jsonResponseAPI.token)
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
