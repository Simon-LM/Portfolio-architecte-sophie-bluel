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
        createOption.innerHTML = `<option value="${json[pas].id}" id="option-category_0${json[pas].id}" class="option-category_${json[pas].name.replaceAll(' ', '-').replaceAll('&', '')}">${json[pas].name}</option>`
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


// const listenAddTitleImage = document.querySelector(".add-img-modale")
const listenAddTitleImage = document.getElementById("image-form")
listenAddTitleImage.addEventListener("change", () => {
  const seeAddTitleImage = document.getElementById("file-name").value
  const seeAddFileImage = document.getElementById("add-image").value
  const clickForValidation = document.getElementById("btn-add-img")
  if (clickForValidation.addEventListener("click", () => {
    console.log("Click for validation send image 1")
  })) {
    // console.log("Click for validation send photo 2")
  } else {
    if (seeAddFileImage !== "" && seeAddTitleImage !== "") {
      buttonAddImageModale.setAttribute("class", "")
      console.log("Tous les champs sont remplis")
    }
    else {
      buttonAddImageModale.setAttribute("class", "hide-button")
      console.log("Tous les champs ne sont pas remplis")
    }
  }
})
listenAddTitleImage.addEventListener("change", () => {  
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
    const inputTitleImage = document.getElementById("file-name")
    if (curFiles[0] !== undefined) {
      image.src = window.URL.createObjectURL(curFiles[0])
      console.log(image?.src)
      showImage.src = image?.src
      showIconAddImage.style.display = "none"
      showButtonAddImage.style.display = "none"
      showFormatAddImage.style.display = "none"
      if (inputTitleImage.value === "" ) {
        inputTitleImage.value = curFiles[0].name.replace('.png', '').replace('.jpg', '').replaceAll('-', ' ').replaceAll('_', ' ')
      }
    }
    else {
      showImage.src = ""
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

const listenSelectCategorie = document.getElementById("id-categories-choice")
listenSelectCategorie.addEventListener("change", () => {
  listenSelectCategorie.style.color= "inherit"
})

// Validation file size //
const maxSize = 4000000;
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

function addImage(token) {
  console.log("send Image API")
  const url = "http://localhost:5678/api/works"
  const inputFilesListe = document.getElementById("add-image")
  const inputTitle = document.getElementById("file-name")

  // // // // // // // // // 
  const inputCategory = document.getElementById("id-categories-choice")
  console.log(inputCategory.value)
  
  const inputCategorySelected = document.querySelector(`.option-category_${inputCategory.value.replaceAll(' ', '-').replaceAll('&', '')}`)
  // console.log(inputCategorySelected.id)
  // console.log(inputCategorySelected.id.replace('option-category_', ''))
  // console.log(inputCategorySelected.value)
  
  
  const inputImageForm = document.getElementById("image-form")
  const onlyformdata = new FormData(inputImageForm);
  console.log("onlyformdata : ")
  // console.log(onlyformdata)
  console.log(onlyformdata.get("category"))
  onlyformdata.set("category", `${inputCategorySelected.value}`)
  console.log(onlyformdata.get("category"))
  // for (var value of onlyformdata.values()) {
  //   console.log(value);
  // }
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
  // console.log(formdata)
  // console.log(formdata.get("category"))
  // for (var key of formdata.keys()) {
    // console.log(key);
  // }
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

// fonction add image //
async function addPhoto() {
  console.log("executing add image")
  const token = window.localStorage.getItem("token")
  console.log(token)
  const addPhotoInput = document.getElementById("add-image")
  const titleInput = document.getElementById("file-name")
  const categoryInput = document.getElementById("id-categories-choice")
  const files = addPhotoInput.files
  console.log(files)
  const imageForm = document.getElementById("image-form")
  validFileSize(files)
  validFileType(files)
  if (imageForm.reportValidity() && validFileType(files) && validFileSize(files)) {
    addImage(token)
    closeModale()
    } else {
    if (files.length === 0) {
        console.log("No file")
        alert("Absence de fichier!")
    } else if (!validFileType(files)) {
        console.log("File format is not ok")
        alert("Erreur: format de l'image non valide.")
    } else if (!validFileSize(files)) {
        console.log("File size too big")
        alert("Erreur: la taille de l'image est trop grande.")
    } else if (!titleInput.validity.valid) {
        console.log("not title")
        alert("Erreur: Le titre doit être renseigné.")
    } else if (!categoryInput.validity.valid) {
        console.log("not catégories")
        alert("Erreur: La catégorie doit être renseignée.")
      return
    }
  }
}
const sendNewImage = document.getElementById("btn-add-img")
sendNewImage.addEventListener("click", (e) => {
  console.log("Click for send new image")
  e.preventDefault()
  addPhoto()
    .then(console.log("OK"))
    .catch(error => console.log(error))
})


// // // // // // // // // 

// function returnFileSize(number) {
//   if (number < 1024) {
//     return number + " octets";
//   } else if (number >= 1024 && number < 1048576) {
//     return (number / 1024).toFixed(1) + " Ko";
//   } else if (number >= 1048576) {
//     return (number / 1048576).toFixed(1) + " Mo";
//   }
// }






