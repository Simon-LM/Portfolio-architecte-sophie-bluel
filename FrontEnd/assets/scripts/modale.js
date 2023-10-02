console.log("Page JAvaScripte | MODALE")

const backgroundModale = document.querySelector("#background-modale")
backgroundModale.style.display = "none" 
const modale = document.querySelector("#modale")
modale.style.display = "none" 

const openModale = document.querySelectorAll(".fa-pen-to-square, .edit")
openModale.forEach(element => {
    element.addEventListener("click", () => {
        backgroundModale.style.display = "block"
        modale.style.display = "block"
        console.log("Click for OPEN the MODALE")
    })
})

const closeModale = document.querySelectorAll("#modale-close, #background-modale")
closeModale.forEach(element => {
    element.addEventListener("click", () => {
        backgroundModale.style.display = "none"
        modale.style.display = "none"
        console.log("Click for CLOSE the MODALE")
    })
})

const arrowBackModale = document.querySelector("#modale-arrow-back")
const validationButtonModale = document.querySelector ("#btn-modale--validation")
const titleModale = document.querySelector("#title-modale")
// arrowBackModale.forEach(element => {
    arrowBackModale.addEventListener("click", () => {
        console.log("Click for ARROW BACK on the MODALE")
        arrowBackModale.style.visibility = "hidden"
        validationButtonModale.textContent = "Ajouter une photo"
        titleModale.textContent = "Galerie photo"
        validationButtonModale.setAttribute("class", "button")        
    })
// })

validationButtonModale.addEventListener("click", () => {
    console.log("Click for VALIDATIOM BUTTON on the MODALE")
    let getClass = validationButtonModale.getAttribute("class")
    console.log(getClass)
    if (getClass === "button") {
        validationButtonModale.setAttribute("class", "button hide-button")
        validationButtonModale.textContent = "Valider"
        titleModale.textContent = "Ajout photo"
        arrowBackModale.style.visibility = "visible"
    }    
})

// const trashModale = document.querySelectorAll(".fa-trash-can, .trash")
// trashModale.forEach(trash => {
//     trash.addEventListener("click", () => {
//         // console.log(trash)
//         // let getTrashID = trash.getAttribute("title")
//         console.log("Click on TRASH")
//         // console.log(getTrashID)
        
//     })
// })



// id="img_0${json[pas].Id}