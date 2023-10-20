console.log("Page JAvaScripte | GALLERIES MODALE")

// SHOW GALLERY
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
          createFigure.innerHTML = `<i class="img_${json[pas].id} fa-solid fa-trash-can" alt="Poubelle" title="Supprimer : ${json[pas].title}"></i><img src="${json[pas].imageUrl}" alt="${json[pas].title}" title="${json[pas].title}" id="img_000${json[pas].id}">`

          // const creatGalleryModale() {

            // let createFigure = document.createElement("figure")
          
            // createFigure.innerHTML = `<i class="img_${json[pas].id} fa-solid fa-trash-can" alt="Poubelle" title="Supprimer : ${json[pas].title}"></i><img src="${json[pas].imageUrl}" alt="${json[pas].title}" title="${json[pas].title}" id="img_000${json[pas].id}">`
          
            // galleryLocationModale.append(createFigure)







            // const galleryLocationModale = document.querySelector('.gallery-modale')
            // let createFigure = document.createElement("figure")
              
            // galleryLocationModale.append(createFigure.setAttribute("class", `fig_${json[pas].id}`))
            // let figureLocation = document.querySelector(`.fig_${json[pas].id}`)  
            
            // let createI = document.createElement("i")
            // let createIMG = document.createElement("img")
          
            // figureLocation.append(createI.setAttribute("class", `img_${json[pas].id} fa-solid fa-trash-can`))
            // let iLocation = document.querySelector(`.img_${json[pas].id}`)
            // iLocation.setAttribute("alt", "Poubelle")
            // iLocation.setAttribute("title", `Supprimer : ${json[pas].title}`)
          
            // figureLocation.appendChild(createIMG.setAttribute("id", `img_0${json[pas].id}`))
            // let imgLocation = document.querySelector(`.img_0${json[pas].id}`)
            // imgLocation.setAttribute("src",`${json[pas].imageUrl}`)
            // imgLocation.setAttribute("alt", `${json[pas].title}"`)
            // imgLocation.setAttribute("title", `${json[pas].title}`)
          // }




          
          console.log(`GalleryArray ID : ${pas}`)
          let categoryId = json[pas].categoryId
          if (categoryId !== filterCategoriesSelectedModale & filterCategoriesSelectedModale !== 0) {
            console.log(`categories not selected : ${filterCategoriesSelectedModale}`)
          }
          else {
            galleryLocationModale.append(createFigure)
            // creatGalleryModale(pas) 

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
      console.log(trashSelected)
      let trashPhotoID = trashSelected.split(' ')
      console.log(trashPhotoID[0])
      let trashPhotoOnlyID = trashPhotoID[0].replace('img_','')
      console.log(trashPhotoOnlyID)
      // API Fetch for delete image selected
      const urlDeleteImageAPI = `http://localhost:5678/api/works/${trashPhotoOnlyID}`
      const token = window.localStorage.getItem("token").replace('"','').replace('"','')
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

