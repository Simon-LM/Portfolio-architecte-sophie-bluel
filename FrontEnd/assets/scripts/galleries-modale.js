console.log("Page JAvaScripte | GALLERIES MODALE")

// SHOW GALLERY //
const urlGalleryModaleAPI = "http://localhost:5678/api/works"
let filterCategoriesSelectedModale = 0
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
          createFigure.innerHTML = `<button id="btn-trash" class="img_${json[pas].id}"><i class="fa-solid fa-trash-can" alt="Poubelle" title="Supprimer : ${json[pas].title}"></i></button><img src="${json[pas].imageUrl}" alt="${json[pas].title}" title="${json[pas].title}" id="img_000${json[pas].id}">`          
          console.log(`GalleryArray ID : ${pas}`)
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
  let trashs = document.querySelectorAll(`#btn-trash`)
  console.log(`trash :` + trashs.length)
  trashs.forEach(trash => {
    trash.addEventListener("click", () => {     
      console.log("Click on trash")
      // // // Recover the ID of the selected photo
      let trashSelected = trash.getAttribute(`class`)
      console.log(trashSelected)
      let trashPhotoID = trashSelected.split(' ')
      console.log(trashPhotoID[0])
      let trashPhotoOnlyID = trashPhotoID[0].replace('img_','')
      console.log(trashPhotoOnlyID)
      // // // API Fetch for delete image selected 
      const urlDeleteImageAPI = `http://localhost:5678/api/works/${trashPhotoOnlyID}`
      const token = window.localStorage.getItem("token")/* .replace('"','').replace('"','') */
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
            console.log(response.ok)
            console.log(response.status)
          }
          if (!response.ok) { 
            console.log(response.status)
          }
        })
    })
  })
}

