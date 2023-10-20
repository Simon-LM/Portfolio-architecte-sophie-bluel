console.log("Page JAvaScripte | MODALE")

const backgroundModale = document.querySelector("#background-modale")
backgroundModale.style.display = "none" 
const modale = document.querySelector("#modale")
modale.style.display = "none" 

const openModale = document.querySelectorAll(".fa-pen-to-square, .edit")
// const validationButtonModale = document.querySelector ("#btn-modale--validation")
openModale.forEach(element => {
    element.addEventListener("click", () => {
        backgroundModale.style.display = "block"
        modale.style.display = "block"
        //
        // validationButtonModale.setAttribute("class", "button hide-button")
        // validationButtonModale.setAttribute("class", "button")  
        // validationButtonModale.textContent = "Ajouter une photo"
        // 
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
const galleryModaleVisibility = document.querySelector(".gallery-modale")
const addImageModaleVisibility = document.querySelector(".add-img-modale")
const buttonAddImageModale = document.querySelector("#btn-add-img")
arrowBackModale.addEventListener("click", () => {
    console.log("Click for ARROW BACK on the MODALE")
  arrowBackModale.style.visibility = "hidden"
  validationButtonModale.style.visibility = "visible"
    // validationButtonModale.textContent = "Ajouter une photo"
    titleModale.textContent = "Galerie photo"
    validationButtonModale.setAttribute("class", "button")        
    galleryModaleVisibility.style.visibility = "visible"
    galleryModaleVisibility.style.position = "fixed"
    addImageModaleVisibility.style.visibility = "collapse"
    addImageModaleVisibility.style.position = "initial"
})

validationButtonModale.addEventListener("click", () => {
    console.log("Click for VALIDATIOM BUTTON on the MODALE")
    let getClass = validationButtonModale.getAttribute("class")
    console.log(getClass)
    if (getClass === "button") {
      buttonAddImageModale.setAttribute("class", "hide-button")
      validationButtonModale.style.visibility = "hidden"
        titleModale.textContent = "Ajout photo"
        arrowBackModale.style.visibility = "visible"
        galleryModaleVisibility.style.visibility = "collapse"
        galleryModaleVisibility.style.position = "initial"
        addImageModaleVisibility.style.visibility = "visible"
        addImageModaleVisibility.style.position = "fixed"
    }    
})

const datalistAddImage = document.querySelector("#id-categories-choice")
fetch(urlCategoriesAPI)
.then(function (response) {
  if (response.ok) {      
    return response.json()
    .then(function (json) {
        console.log(json)
        
        for (let pas = 0; pas < json.length; pas++) {  

        let createOption = document.createElement("option")     
        createOption.innerHTML = `<option value="${json[pas].name}" id="option-filter_0${json[pas].id}">${json[pas].name}</option>`
        datalistAddImage.append(createOption)
                    
        console.log(response.ok)
        console.log(response.status)
        console.log(createOption)
        }        
    })
  }
  else {
    console.log("Mauvaise réponse du réseau")
    console.log(response.status)      
  }
})
.catch(function (error) {
  console.log("Il y a eu un problème avec l'opération fetch pour les catégories pour ajouter des images : " + error.message,)
})

const listenAddTitleImage = document.querySelector(".add-img-modale")
listenAddTitleImage.addEventListener("change", () => {
  const seeAddTitleImage = document.getElementById("file-name").value
  const seeAddFileImage = document.getElementById("add-image").value
  // if (seeAddFileImage !== "" && seeAddTitleImage === "") {
  //   var input = document.querySelector("#add-image")
  //   input.addEventListener("change", updateImageDisplay)
  //   console.log("image téléchargé")
  // }
  if (seeAddFileImage !== "" && seeAddTitleImage !== "") {
    buttonAddImageModale.setAttribute("class", "")
    console.log("Tous les champs sont remplis")
  }
  else {    
    buttonAddImageModale.setAttribute("class", "hide-button")
    console.log("Tous les champs ne sont pas remplis")
  }
})
listenAddTitleImage.addEventListener("change", () => {
  // const seeAddTitleImage = document.getElementById("file-name").value
  const seeAddFileImage = document.getElementById("add-image").files
  if (seeAddFileImage !== "") {
    let imageDownload = document.getElementById("add-image")
    var curFiles = imageDownload.files
    console.log(curFiles)
    console.log(curFiles[0])
    console.log(curFiles[0]?.name)
    console.log(curFiles[0]?.size)
    var image = document.createElement("img")
    const showIconAddImage = document.getElementById("icon-add-image")
    const showButtonAddImage = document.getElementById("button-add-image")
    const showFormatAddImage = document.getElementById("format-add-image")
    const showImage = document.getElementById("show-img-download")
    if (curFiles[0] !== undefined) {
      image.src = window.URL.createObjectURL(curFiles[0])
      console.log(image?.src)
      showImage.src = image?.src
      showIconAddImage.style.display = "none"
      showButtonAddImage.style.display = "none"
      showFormatAddImage.style.display = "none"
    } else {
      showImage.src = ""
      showIconAddImage.style.display = "block"
      showButtonAddImage.style.display = "block"
      showFormatAddImage.style.display = "block"
    }

    console.log("image téléchargé")
  }
  else {    
    console.log("Aucune image n'est chargée")
  }
})




// function returnFileSize(number) {
//   if (number < 1024) {
//     return number + " octets";
//   } else if (number >= 1024 && number < 1048576) {
//     return (number / 1024).toFixed(1) + " Ko";
//   } else if (number >= 1048576) {
//     return (number / 1048576).toFixed(1) + " Mo";
//   }
// }



// // 
// const listenAddImage = document.querySelector("#btn-add-img")
// var request = new XMLHttpRequest()
// request.open("add-image", "id-categorie-choice", "file-name")
// request.send(new FormData(listenAddImage))
// // 