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
} else {
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

// GALLERY & FILTERS // 
const urlGalleryAPI = "http://localhost:5678/api/works"
const urlCategoriesAPI = "http://localhost:5678/api/categories"
let filterCategoriesSelected = 0
// // // DISPALY GALLERY
const galleryLocationHTML = document.querySelector('.gallery')
function displayMainGallery(filterCategoriesSelected) {
  fetch(urlGalleryAPI)
  .then(function (response) {
    if (response.ok) {
      return response.json()
        .then(function (json) {
          for (let pas = 0; pas < json.length; pas++) {
            let createFigure = document.createElement("figure")
            createFigure.innerHTML = `<img src="${json[pas].imageUrl}" id="img-carousel-ID_${pas}" class="img_${json[pas].id}" alt="${json[pas].title}"><figcaption>${json[pas].title}</figcaption>`
            let categoryId = json[pas].categoryId
            if (categoryId !== filterCategoriesSelected & filterCategoriesSelected !== 0) {
              // // // // // // // //  CLEAN 
            }
            else {
              galleryLocationHTML.append(createFigure)
            }
            console.log(response.status)
          }
          // // // CAROUSEL
          for (let pas = 0; pas < json.length; pas++) {
            let selectedImage = document.querySelector(`#img-carousel-ID_${pas}`)
            let carouselVisible = document.getElementById("carousel")
            let imageCarousel = document.getElementById("img-carousel")
            carouselVisible.style.display = "none"
            const imageNameCarousel = document.getElementById("img-name-carousel")
            const closeCarousel = document.getElementById("carousel-close")
            // // // CLICK ON IMAGE
            var image = document.createElement("img")
            selectedImage.addEventListener("click", function () {
              image.src = `${json[pas].imageUrl}`
              image.id = "img-carousel"
              imageCarousel.replaceChildren(image)
              imageCarousel.className = `img-carousel-ID_${pas}`
              carouselVisible.style.display = "flex"
              backgroundModale.style.display = "block"
              imageCarousel.alt = `${json[pas].title}`
				      imageNameCarousel.textContent =  json[pas].title
            }) 
            function clickToCloseTheCarousel() {              
              backgroundModale.style.display = "none"
              carouselVisible.style.display = "none"
              carouselVisible.src = ''
              carouselVisible.alt = '' 
            }
            backgroundModale.addEventListener("click", function () {
              clickToCloseTheCarousel()             
            })
            closeCarousel.addEventListener("click", function () {
              clickToCloseTheCarousel()         
            })
          }         
      })
    }
    else {
      console.log("Mauvaise réponse du réseau")
      console.log(response.status)
    }
  })
  .catch(function (error) {
    console.log("Il y a eu un problème avec l'opération fetch : " + error.message)
  })
}
displayMainGallery(filterCategoriesSelected)

// // // BUTTONS FILTRES
const filtersLocationHTML = document.getElementById('filters')
fetch(urlCategoriesAPI)
.then(function (response) {
  if (response.ok) {      
    return response.json()
    .then(function (json) {
      for (let pas = 0; pas < json.length; pas++) {   
        let createdDiv = document.createElement("div")
        createdDiv.innerHTML = `<button id="filter_0${json[pas].id}" class="button">${json[pas].name}</button>`
        filtersLocationHTML.append(createdDiv)
        console.log(response.status)
      }
      // // // LISTEN FILTERS BUTTONS          
      for (let pas = 0; pas < json.length + 1; pas++) {
        let selectedButtonsFilter = document.getElementById(`filter_0${pas}`)
      // // // CLICK ON BUTTON
        selectedButtonsFilter.addEventListener("click", function () {
          console.log(`click on filter_0${pas}`)
          // // // WRITE SELECTED FILTER ON HTML
          if (`filter_0${pas}` !== `filter_00`) {
            galleryLocationHTML.replaceChildren()
            displayMainGallery(pas)
            console.log(`filterCategoriesSelected : ${pas}`)
          }
          else {
            let filterCategoriesSelected = 0
            galleryLocationHTML.replaceChildren()
            displayMainGallery(filterCategoriesSelected)
            console.log(`filter_0${pas}`)
          }        
        })
      }   
    })
  }
  else {
    console.log("Mauvaise réponse du réseau")
    console.log(response.status)      
  }
})
.catch(function (error) {
  console.log("Il y a eu un problème avec l'opération fetch : " + error.message,)
})

// // //  GALLERY MODALE // // //
let filterCategoriesSelectedModale = 0
const galleryOnModale = document.querySelector('.gallery-modale')
function galleryModale(filterCategoriesSelectedModale) {
  fetch(urlGalleryAPI)
  .then(function (response) {
    if (response.ok) {
      return response.json()
      .then(function (json) {
        for (let pas = 0; pas < json.length; pas++) {   
          let createFigure = document.createElement("figure")
          createFigure.innerHTML = `<button id="btn-trash" class="img_${json[pas].id}"><i class="fa-solid fa-trash-can" alt="Poubelle" title="Supprimer : ${json[pas].title}"></i></button><img src="${json[pas].imageUrl}" alt="${json[pas].title}" title="${json[pas].title}" id="img_00${json[pas].id}">`          
          console.log(`GalleryArray ID : ${pas}`)
          let categoryId = json[pas].categoryId
          if (categoryId !== filterCategoriesSelectedModale & filterCategoriesSelectedModale !== 0) {
          console.log(`categories not selected : ${filterCategoriesSelectedModale}`)
          }
          else {
            galleryOnModale.append(createFigure) 
            console.log(`categories selected : ${filterCategoriesSelectedModale}`)
          }
          console.log(response.status)        
        }  
        trashListener()
      })      
    }
    else {
      console.log("Mauvaise réponse du réseau")
      console.log(response.status)
    }
  })
  .catch(function (error) {
    console.log("Il y a eu un problème avec l'opération fetch : " + error.message,)
  })
}
// galleryModale(0)
function trashListener() { 
  let trashs = document.querySelectorAll(`#btn-trash`)
  console.log(`trash :` + trashs.length)
  trashs.forEach(trash => {
    trash.addEventListener("click", () => {  
      console.log("Click on trash")
      // // // Recover the ID of the selected photo
      let trashSelected = trash.getAttribute(`class`)
      let trashPhotoID = trashSelected.split(' ')
      console.log(trashPhotoID[0])
      let trashPhotoOnlyID = trashPhotoID[0].replace('img_', '')
      // // // Hide Image send on trash
      var hideImageOnTrash = document.getElementById(`img_00${trashPhotoOnlyID}`)
      var hideTrashSelected = document.querySelector(`.${trashSelected}`)
      hideImageOnTrash.style.visibility = "collapse"
      hideTrashSelected.style.visibility = "collapse"
      // // // API Fetch for delete image selected 
      const urlDeleteImageAPI = `http://localhost:5678/api/works/${trashPhotoOnlyID}`
      const token = window.localStorage.getItem("token")
      console.log(token)
      const requestDeleteImageAPI = {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      console.log(requestDeleteImageAPI)
      fetch(urlDeleteImageAPI, requestDeleteImageAPI)
        .then(function (response) { 
          if (response.ok) {
            console.log(response.status)
            refreshMainGallery()
          }
          if (!response.ok) { 
            console.log(response.status)
          }
        })
    })
  })
}
function refreshMainGallery() {
  galleryLocationHTML.replaceChildren()
  displayMainGallery(0)
}
// // //  MODALE // // //
const titleModale = document.getElementById("title-modale")
const validationButtonModale = document.getElementById("btn-modale--validation")
const galleryModaleVisibility = document.querySelector(".gallery-modale")
const addImageModaleVisibility = document.querySelector(".add-img-modale")
const buttonAddImage = document.getElementById("btn-add-img")
const clickFrameAddImage = document.getElementById("click-frame-add-img")
const formAddImage = document.getElementById("image-form")
const inputImageFiles = document.getElementById("add-image")
const currentFiles = inputImageFiles.files
const inputImageName = document.getElementById("file-name")
const inputCategory = document.getElementById("id-categories-choice")
const showIconAddImage = document.getElementById("icon-add-image")
const showButtonAddImage = document.getElementById("button-add-image")
const showFormatAddImage = document.getElementById("format-add-image")
const showImage = document.getElementById("show-img-download")
const showSizeImage = document.getElementById("show-size-img-download")

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
    galleryModaleVisibility.replaceChildren()
    galleryModale(0)
  })
  // galleryModale(0)
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
// // //  BUTTON ADD IMAGE
validationButtonModale.addEventListener("click", () => {
  console.log("Click for VALIDATIOM BUTTON on the MODALE")
  let getClass = validationButtonModale.getAttribute("class")
  if (getClass === "button") {
    buttonAddImage.setAttribute("class", "hide-button")
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
const maxSize = 4000000;
// const maxSize = 3002000;
function validFileType(currentFiles) {
  const fileTypes = ["image/jpeg", "image/png"];
  let valid = true
  for (let i = 0; i < currentFiles.length; i++) {
    if (!fileTypes.includes(currentFiles[i].type)) {
      valid = false
    }
  }
  return valid
}
function validFileSize(currentFiles) {
  let valid = true
  for (let i = 0; i < currentFiles.length; i++) {
    if (currentFiles[i].size > maxSize) {
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
formAddImage.addEventListener("change", () => {
  const seeAddTitleImage = inputImageName.value
  const seeAddFileImage = inputImageFiles.value
  if (buttonAddImage.addEventListener("click", () => {
    console.log("Click for validation send image")
  })) {
  } else {
    if (seeAddFileImage !== "" && seeAddTitleImage !== "" ) {
      buttonAddImage.setAttribute("class", "")
      console.log("Tous les champs sont remplis")
    }
    else {
      buttonAddImage.setAttribute("class", "hide-button")
      console.log("Tous les champs ne sont pas remplis")
    }
  }
})
formAddImage.addEventListener("change", () => {  
  var curFiles = inputImageFiles.files
  if (curFiles !== "") {
    console.log(curFiles[0]?.name)
    console.log(curFiles[0]?.size)
    var image = document.createElement("img")
    const frameAddImage = document.querySelector(".frame-add-img")
    buttonAddImage.value = "Valider"
    backgroundModale.style.background = "black"
    if (curFiles[0] !== undefined) {
      image.src = window.URL.createObjectURL(curFiles[0])
      image.id = "show-img-download"
      showImage.replaceChildren(image)
      console.log(image?.src)
      frameAddImage.style.background = "#E8F1F7"
      showImage.alt = `${curFiles[0]?.name}`
      showImage.style.opacity = "1"
      showSizeImage.textContent = returnFileSize(curFiles[0]?.size)
      showSizeImage.style.color = "black"
      showSizeImage.style.display = "block"
      showIconAddImage.style.display = "none"
      showButtonAddImage.style.display = "none"
      showFormatAddImage.style.display = "none"
      if (curFiles[0]?.size > maxSize) {
        showImage.style.opacity = "0.5"
        backgroundModale.style.background = "#B1663C"
        buttonAddImage.value = "Image trop lourd"
        buttonAddImage.setAttribute("class", "red-button")
        showSizeImage.style.color = "red"
        showSizeImage.textContent = returnFileSize(curFiles[0]?.size) + ` / 4 Mo`
      }
      if (curFiles[0]?.size < maxSize && inputCategory.value === "") {
        buttonAddImage.setAttribute("class", "hide-button")
      }
      if (inputImageName.value === "" ) {
        inputImageName.value = curFiles[0].name.replace('.png', '').replace('.jpg', '').replaceAll('-', ' ').replaceAll('_', ' ')
      }   
    }
    else {
      showImage.src = ""
      showImage.alt = ""
      showSizeImage.style.display = "none"
      showSizeImage.textContent = " "
      showIconAddImage.style.display = "block"
      showButtonAddImage.style.display = "flex"
      showFormatAddImage.style.display = "block"
      buttonAddImage.setAttribute("class", "hide-button")
    }
  }
  else if (inputImageFiles.value === '') {
    inputImageName.value = ''
  }
  else {    
    console.log("Aucune image n'est chargée")
    buttonAddImage.setAttribute("class", "hide-button")
  }
})
// // // REFRESH Input/Select Categories
inputCategory.addEventListener("change", () => {
  inputCategory.style.color= "inherit"
})
// // // SEND NEW IMAGE // // //
buttonAddImage.addEventListener("click", (e) => {
  var cFiles = inputImageFiles.files
  if (cFiles[0]?.size > maxSize && inputCategory.value !== "") {
    console.log("Click not possible, image too heavy")
    inputImageName.value = ''
    e.preventDefault()
  } else {
    console.log("Click for send new image")
    e.preventDefault()
    CheckForAddImage()
      .then(console.log("Check for AddImage : OK"))
      .catch(error => console.log(error))
    // refreshMainGallery()
  }
})
async function CheckForAddImage() {
  if (formAddImage.reportValidity() && validFileType(currentFiles) && validFileSize(currentFiles)) {
    addImage(token)
    closeModale()
    refreshMainGallery()
    window.location = "../index.html"
    } else {
    console.log("Error Check for AddImage")
  }
}
// // // Send image to API
function addImage(token) {
  console.log("send Image API")
  console.log(inputCategory.value)  
  const urlGetImageAPI = "http://localhost:5678/api/works" 
  const myHeaders = new Headers()
  myHeaders.append("Authorization", `Bearer ${token}`)
  const inputCategorySelected = document.querySelector(`.option-category_${inputCategory.value.replaceAll(' ', '-').replaceAll('&', '')}`)
  const formdata = new FormData(formAddImage)
  // // Set the number of category selected
  console.log("formdata category : ")
  console.log(formdata.get("category"))
  formdata.set("category", `${inputCategorySelected.value}`)
  console.log(formdata.get("category"))
  // //  
  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: formdata,
    redirect: 'follow'
  }
  console.log("formdata all input : ")
  for (var value of formdata.values()) {
    console.log(value);
  }
  fetch(urlGetImageAPI, requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('Error :' + error))
    
  inputImageFiles.value = ""
  inputImageName.value = ""
  inputCategory.value = ""
  showImage.src = ""
  showSizeImage.style.display = "none"
  showIconAddImage.style.display = "block"
  showButtonAddImage.style.display = "block"
  showFormatAddImage.style.display = "block"
}