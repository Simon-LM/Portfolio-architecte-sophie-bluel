console.log("Page JAvaScripte | GALLERIES MODALE")

// SHOW GALLERY
const urlGalleryModaleAPI = "http://localhost:5678/api/works"
let filterCategoriesSelectedModale= 0
const galleryLocationModale = document.querySelector('.gallery-modale')
function galleryModale(filterCategoriesSelectedModale) {
  fetch(urlGalleryModaleAPI)
  .then(function (response) {
    if (response.ok) {
      return response.json()
      .then(function (json) {
        console.log("json :") 
        for (let pas = 0; pas < json.length; pas++) {
          let createFigure = document.createElement("figure")
          console.log(`GalleryArray ID : ${pas}`)
          createFigure.innerHTML = `<i class="img_0${json[pas].id} fa-solid fa-trash-can" alt="Poubelle" title="Supprimer : ${json[pas].title}"></i><img src="${json[pas].imageUrl}" alt="${json[pas].title}" title="${json[pas].title}" id="img_000${json[pas].id}">`
          
          let categoryId = json[pas].categoryId
          if (categoryId !== filterCategoriesSelectedModale & filterCategoriesSelectedModale !== 0) {
            console.log(`categories not selected : ${filterCategoriesSelectedModale}`)
          }
          else {
            galleryLocationModale.append(createFigure)
            console.log(`categories selected : ${filterCategoriesSelectedModale}`)
          }
          console.log(response.ok)
          console.log(response.status)
          console.log(createFigure)
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
  let trashs = document.querySelectorAll(`.fa-trash-can`)
  console.log(`trash :` + trashs.length)
  trashs.forEach(trash => {
    trash.addEventListener("click", () => {     
      console.log("Click on trash")
      // Recover the ID of the selected photo
      let trashSelected = trash.getAttribute(`class`)
      let trashPhotoID = trashSelected.split(' ')
      console.log(trashPhotoID[0])
    })
  })
}