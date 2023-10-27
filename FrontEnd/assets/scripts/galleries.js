console.log("Page JAvaScripte | GALLERIES & FILTERS")

//  FILTRES [ Tous Objets Appartements Hôtels & restaurants ]
const urlGalleryAPI = "http://localhost:5678/api/works"
const urlCategoriesAPI = "http://localhost:5678/api/categories"
let filterCategoriesSelected = 0
// SHOW GALLERY
const galleryLocationHTML = document.querySelector('.gallery')
function galleryAll(filterCategoriesSelected) {
  fetch(urlGalleryAPI)
  .then(function (response) {
    if (response.ok) {
      return response.json()
        .then(function (json) {
        console.log("json :") 
        for (let pas = 0; pas < json.length; pas++) {
          let createFigure = document.createElement("figure")
          console.log(`GalleryArray ID : ${pas}`)
          createFigure.innerHTML = `<img src="${json[pas].imageUrl}" class="img_${json[pas].id}" alt="${json[pas].title}"><figcaption>${json[pas].title}</figcaption>`
          let categoryId = json[pas].categoryId
          if (categoryId !== filterCategoriesSelected & filterCategoriesSelected !== 0) {
            console.log(`categories not selected : ${filterCategoriesSelected}`)
          }
          else {
            galleryLocationHTML.append(createFigure)
            console.log(`categories selected : ${filterCategoriesSelected}`)
          }
          console.log(response.ok)
          console.log(response.status)
          console.log(createFigure)
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
}
galleryAll(filterCategoriesSelected)

// BUTTONS FILTRES
const filtersLocationHTML = document.getElementById('filters')
fetch(urlCategoriesAPI)
.then(function (response) {
  if (response.ok) {      
    return response.json()
    .then(function (json) {
      console.log(json)
      for (let pas = 0; pas < json.length; pas++) {   
        let createDiv = document.createElement("div")
        createDiv.innerHTML = `<button id="filter_0${json[pas].id}" class="button">${json[pas].name}</button>`
        filtersLocationHTML.append(createDiv)
        console.log(response.ok)
        console.log(response.status)
        console.log(createDiv)
      }
      // LISTEN FILTERS BUTTONS          
      for (let pas = 0; pas < json.length + 1; pas++) {
        let selectedButtonsFilter = document.querySelector(`#filter_0${pas}`)
      // CLICK ON BUTTON
        selectedButtonsFilter.addEventListener("click", function () {
        console.log(`click on filter_0${pas}`)
        // WRITE SELECTED FILTER ON HTML
          if (`filter_0${pas}` !== `filter_00`) {
            galleryLocationHTML.replaceChildren()
            galleryAll(pas)
            console.log(`filterCategoriesSelected : ${pas}`)
          }
          else {
            let filterCategoriesSelected = 0
            galleryLocationHTML.replaceChildren()
            galleryAll(filterCategoriesSelected)
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


