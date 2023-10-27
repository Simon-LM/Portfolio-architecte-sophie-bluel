console.log("Page JAvaScripte | MODALE")

// // // LOGOUT // // //
const editingBar = document.querySelector("#editing-bar")
const editMode = document.querySelector(".edit-in-out")
const logInOrOut = document.querySelector(".log-in-out")
const token = window.localStorage.getItem("token")

if (token === null) {
    editingBar.style.display = "none"
    editMode.style.visibility = "hidden"
    logInOrOut.textContent = "login"
    logInOrOut.setAttribute("href", "./pages/authentication.html")
    console.log('token :' + token)
}
if (token !== null) {
    editingBar.style.display = "flex"
    editMode.style.visibility = "visible"
    logInOrOut.textContent = "logout"
    logInOrOut.setAttribute("href", "./index.html")
    console.log('token :' + token)
    logInOrOut.addEventListener("click", () => {
        console.log("click on LOGOUT")
        localStorage.clear()
        console.log('token :' + token)
        logInOrOut.textContent = "login"        
    })
}

// // //  MODALE // // //
const titleModale = document.getElementById("title-modale")
const validationButtonModale = document.getElementById("btn-modale--validation")
const galleryModaleVisibility = document.querySelector(".gallery-modale")
const addImageModaleVisibility = document.querySelector(".add-img-modale")
const buttonAddImageModale = document.getElementById("btn-add-img")
const InputImageFiles = document.getElementById("add-image")
const inputCategory = document.getElementById("id-categories-choice")

// // //  HIDE MODALE
const backgroundModale = document.getElementById("background-modale")
backgroundModale.style.display = "none" 
const modale = document.getElementById("modale")
modale.style.display = "none" 
// // // SHOW MODALE
const openModale = document.querySelectorAll(".fa-pen-to-square, .edit")
openModale.forEach(element => {
    element.addEventListener("click", () => {
        backgroundModale.style.display = "block"
        modale.style.display = "block"
        console.log("Click for OPEN the MODALE")
    })
})
// // // CLOSE MODALE
const crossModale = document.querySelectorAll("#modale-close, #background-modale")
function closeModale(){
  backgroundModale.style.display = "none"
  modale.style.display = "none"
  console.log("Click for CLOSE the MODALE")
}
crossModale.forEach(element => {
    element.addEventListener("click", () => {
      closeModale()
    })
})

// // //  ARROW BACK
const arrowBackModale = document.getElementById("modale-arrow-back")
arrowBackModale.addEventListener("click", () => {
  console.log("Click for ARROW BACK on the MODALE")
  arrowBackModale.style.visibility = "hidden"
  validationButtonModale.style.visibility = "visible"
  titleModale.textContent = "Galerie photo"
  validationButtonModale.setAttribute("class", "button")        
  galleryModaleVisibility.style.visibility = "visible"
  galleryModaleVisibility.style.position = "fixed"
  addImageModaleVisibility.style.visibility = "collapse"
  addImageModaleVisibility.style.position = "initial"
})
// // //  BUTTON VALIDATION
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

// // // // // ADD NEW IMAGE // // // // //

// // //  Validation file SIZE & TYPE
// const maxSize = 4000000;
const maxSize = 3002000;
function validFileType(files) {
  const fileTypes = ["image/jpeg", "image/png"];
  let valid = true
  for (let i = 0; i < files.length; i++) {
    if (!fileTypes.includes(files[i].type)) {
      valid = false
    }
  }
  return valid
}
function validFileSize(files) {
  let valid = true
  for (let i = 0; i < files.length; i++) {
    if (files[i].size > maxSize) {
      valid = false
    }
  }
  return valid
}
function returnFileSize(number) {
  if (number < 1024) {
    return number + " octets";
  } else if (number >= 1024 && number < 1048576) {
    return (number / 1024).toFixed(2) + " Ko";
  } else if (number >= 1048576) {
    return (number / 1048576).toFixed(2) + " Mo";
  }
}


// // //  SELECTION CATTEGORIES GALLERY
const datalistAddImage = document.getElementById("id-categories-choice")
fetch(urlCategoriesAPI)
.then(function (response) {
  if (response.ok) {      
    return response.json()
    .then(function (json) {      
        for (let pas = 0; pas < json.length; pas++) {
        let createOption = document.createElement("option")     
        createOption.innerHTML = `<option value="${json[pas].id}" id="option-category_0${json[pas].id}" class="option-category_${json[pas].name.replaceAll(' ', '-').replaceAll('&', '')}">${json[pas].name}</option>`
        datalistAddImage.append(createOption)    
        console.log(response.status)
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

// // // REFRESH FORM for ADD IMAGE
const refreshFormAddImage = document.getElementById("image-form")
refreshFormAddImage.addEventListener("change", () => {
  const seeAddTitleImage = document.getElementById("file-name").value
  const seeAddFileImage = InputImageFiles.value
  const clickForValidation = document.getElementById("btn-add-img")
  if (clickForValidation.addEventListener("click", () => {
    console.log("Click for validation send image")
  })) {
  } else {
    if (seeAddFileImage !== "" && seeAddTitleImage !== "" ) {
      buttonAddImageModale.setAttribute("class", "")
      // buttonAddImageModale.style.background = "#1D6154"
      console.log("Tous les champs sont remplis")
    }
    else {
      buttonAddImageModale.setAttribute("class", "hide-button")
      // buttonAddImageModale.style.background = "#A7A7A7"
      console.log("Tous les champs ne sont pas remplis")
    }
  }
})
refreshFormAddImage.addEventListener("change", () => {  
  var curFiles = InputImageFiles.files
  if (curFiles !== "") {
    console.log(curFiles[0]?.name)
    console.log(curFiles[0]?.size)
    var image = document.createElement("img")
    const framAddImage = document.querySelector(".frame-add-img")
    const showIconAddImage = document.getElementById("icon-add-image")
    const showButtonAddImage = document.getElementById("button-add-image")
    const showFormatAddImage = document.getElementById("format-add-image")
    const showImage = document.getElementById("show-img-download")
    const showSizeImage = document.getElementById("show-size-img-download")
    const inputTitleImage = document.getElementById("file-name")
    buttonAddImageModale.value = "Valider"
    backgroundModale.style.background = "black"
    if (curFiles[0] !== undefined) {
      image.src = window.URL.createObjectURL(curFiles[0])
      console.log(image?.src)
      framAddImage.style.background = "#E8F1F7"
      showImage.src = image?.src
      showImage.style.opacity = "1"
      showSizeImage.textContent = returnFileSize(curFiles[0]?.size)
      showSizeImage.style.color = "black"
      showSizeImage.style.display = "block"
      showIconAddImage.style.display = "none"
      showButtonAddImage.style.display = "none"
      showFormatAddImage.style.display = "none"
      if (curFiles[0]?.size > 3002000) {
        showImage.style.opacity = "0.5"
        backgroundModale.style.background = "#B1663C"
        buttonAddImageModale.value = "Image trop lourd"
        buttonAddImageModale.setAttribute("class", "red-button")
        showSizeImage.style.color = "red"
        showSizeImage.textContent = returnFileSize(curFiles[0]?.size) + ` / 4 Mo`
      }
      if (inputTitleImage.value === "" ) {
        inputTitleImage.value = curFiles[0].name.replace('.png', '').replace('.jpg', '').replaceAll('-', ' ').replaceAll('_', ' ')
      }   
    }
    else {
      showImage.src = ""
      showSizeImage.style.display = "none"
      showSizeImage.textContent = " "
      showIconAddImage.style.display = "block"
      showButtonAddImage.style.display = "flex"
      showFormatAddImage.style.display = "block"
    }
    console.log("image téléchargé")
  }
  else {    
    console.log("Aucune image n'est chargée")
  }
})

// // // REFRESH Input/Select Categories
inputCategory.addEventListener("change", () => {
  inputCategory.style.color= "inherit"
})


// // // SEND NEW IMAGE // // //

// // // fonction add image
function addImage(token) {
  console.log("send Image API")
  const url = "http://localhost:5678/api/works"
  const inputFilesListe = document.getElementById("add-image")
  const inputTitle = document.getElementById("file-name")
  // // // // // // // // // 
  // const inputCategory = document.getElementById("id-categories-choice")
  console.log(inputCategory.value)
  
  const inputCategorySelected = document.querySelector(`.option-category_${inputCategory.value.replaceAll(' ', '-').replaceAll('&', '')}`)  
  
  const inputImageForm = document.getElementById("image-form")
  const onlyformdata = new FormData(inputImageForm);
  console.log("onlyformdata : ")
  console.log(onlyformdata.get("category"))
  onlyformdata.set("category", `${inputCategorySelected.value}`)
  console.log(onlyformdata.get("category"))
  // // // // // // // //
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);
  const formdata = new FormData();
  formdata.append("image", inputFilesListe.files[0]);
  formdata.append("title", inputTitle.value);
  formdata.append("category", inputCategorySelected.value);
  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: onlyformdata,
    redirect: 'follow'
  };
  console.log("formdata : ")
  for (var value of formdata.values()) {
    console.log(value);
  }
  console.log("requestOptions : ")
  console.log(requestOptions)
  fetch(url, requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('Error :' + error));

  // // // // // // // // // 
}

async function CheckForAddImage() {
  console.log(token)
  const addPhotoInput = document.getElementById("add-image")
  const files = addPhotoInput.files
  const imageForm = document.getElementById("image-form")
  if (imageForm.reportValidity() && validFileType(files) && validFileSize(files)) {
    addImage(token)
    closeModale()
    } else {
    console.log("Error CheckForAddImage")
  }
}
const sendNewImage = document.getElementById("btn-add-img")
sendNewImage.addEventListener("click", (e) => {
  console.log("Click for send new image")
  e.preventDefault()
  CheckForAddImage()
    .then(console.log("OK"))
    .catch(error => console.log(error))
})








