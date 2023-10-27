
// const editingBar = document.querySelector("#editing-bar")
// const editMode = document.querySelector(".edit-in-out")
// const logInOrOut = document.querySelector(".log-in-out")
// const token = window.localStorage.getItem("token")

// if (token === null) {
//     editingBar.style.display = "none"
//     editMode.style.visibility = "hidden"
//     logInOrOut.textContent = "login"
//     logInOrOut.setAttribute("href", "./pages/authentication.html")
//     console.log('token :' + token)
// }
// if (token !== null) {
//     editingBar.style.display = "flex"
//     editMode.style.visibility = "visible"
//     logInOrOut.textContent = "logout"
//     logInOrOut.setAttribute("href", "./index.html")
//     console.log('token :' + token)
//     logInOrOut.addEventListener("click", () => {
//         console.log("click on LOGOUT")
//         localStorage.clear()
//         console.log('token :' + token)
//         logInOrOut.textContent = "login"        
//     })
// }