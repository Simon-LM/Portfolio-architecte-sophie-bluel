console.log("Page JAvaScripte | GALLERIES & FILTERS")

// GALLERY & FILTERS // 
const urlGalleryAPI = "http://localhost:5678/api/works"
const urlCategoriesAPI = "http://localhost:5678/api/categories"
let filterCategoriesSelected = 0
// // // SHOW GALLERY
const galleryLocationHTML = document.querySelector('.gallery')
function galleryMain(filterCategoriesSelected) {
  fetch(urlGalleryAPI)
  .then(function (response) {
    if (response.ok) {
      return response.json()
        .then(function (json) {
        for (let pas = 0; pas < json.length; pas++) {
          let createFigure = document.createElement("figure")
          createFigure.innerHTML = `<img src="${json[pas].imageUrl}" class="img_${json[pas].id}" alt="${json[pas].title}"><figcaption>${json[pas].title}</figcaption>`
          let categoryId = json[pas].categoryId
          if (categoryId !== filterCategoriesSelected & filterCategoriesSelected !== 0) {
          }
          else {
            galleryLocationHTML.append(createFigure)
          }
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
    console.log("Il y a eu un problème avec l'opération fetch : " + error.message)
  })
}
galleryMain(filterCategoriesSelected)

// // // BUTTONS FILTRES
const filtersLocationHTML = document.getElementById('filters')
fetch(urlCategoriesAPI)
.then(function (response) {
  if (response.ok) {      
    return response.json()
    .then(function (json) {
      for (let pas = 0; pas < json.length; pas++) {   
        let createDiv = document.createElement("div")
        createDiv.innerHTML = `<button id="filter_0${json[pas].id}" class="button">${json[pas].name}</button>`
        filtersLocationHTML.append(createDiv)
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
            galleryMain(pas)
            console.log(`filterCategoriesSelected : ${pas}`)
          }
          else {
            let filterCategoriesSelected = 0
            galleryLocationHTML.replaceChildren()
            galleryMain(filterCategoriesSelected)
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

// SHOW GALLERY ON MODALE//
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
          createFigure.innerHTML = `<button id="btn-trash" class="img_${json[pas].id}"><i class="fa-solid fa-trash-can" alt="Poubelle" title="Supprimer : ${json[pas].title}"></i></button><img src="${json[pas].imageUrl}" alt="${json[pas].title}" title="${json[pas].title}" id="img_000${json[pas].id}">`          
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
galleryModale(0)

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
      let trashPhotoOnlyID = trashPhotoID[0].replace('img_','')
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
          }
          if (!response.ok) { 
            console.log(response.status)
          }
        })
    })
  })
}