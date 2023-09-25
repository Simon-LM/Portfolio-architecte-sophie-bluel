console.log("Page JAvaScripte")

//  FILTRES [ Tous Objets Appartements Hôtels & restaurants ]
const urlGallery = "http://localhost:5678/api/works"
const urlCategories = "http://localhost:5678/api/categories"
let filter_nbr = 0   
// SHOW GALLERY
const gallery = document.querySelector('.gallery')
function galleryAll(filter_nbr) {
  fetch(urlGallery)
    .then(function (response) {
      if (response.ok) {
        return response.json()
          .then(function (json) {
          console.log("json :")
          // console.log(json[1].categoryId)
            // categoryId: 1
          for (let pas = 0; pas < json.length; pas++) {
            // let categoryId = json[pas].categoryId
            // console.log(json[pas].categoryId)
            // if (categoryId !== 2) {
              
            // }

            let create_figure = document.createElement("figure")
            console.log(`GalleryArray ID : ${pas}`)
            create_figure.innerHTML = `<img src="${json[pas].imageUrl}" alt="${json[pas].title}"><figcaption>${json[pas].title}</figcaption>`

            let categoryId = json[pas].categoryId
            console.log(json[pas].categoryId)
            if (categoryId !== filter_nbr & filter_nbr !== 0) {
              create_figure.innerHTML = `<img src="" alt=""><figcaption></figcaption>`
            }
            /* if (categoryId === 0 & filter_nbr === 0) {
              // create_figure.innerHTML = `<img src="${json[pas].imageUrl}" alt="${json[pas].title}"><figcaption>${json[pas].title}</figcaption>`
              gallery.append(create_figure)
            } */
            else {
              // create_figure.innerHTML = `<img src="${json[pas].imageUrl}" alt="${json[pas].title}"><figcaption>${json[pas].title}</figcaption>`
              gallery.append(create_figure)
            }


            console.log(response.ok)
            console.log(response.status)
            console.log(create_figure)
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
galleryAll(filter_nbr)

// BUTTONS FILTRES
const filters = document.getElementById('filters')
fetch(urlCategories)
  .then(function (response) {
    if (response.ok) {      
      return response.json()
      .then(function (json) {
        console.log(json)
        for (let pas = 0; pas < json.length; pas++) {   
          let create_div = document.createElement("div")
          create_div.innerHTML = `<div id="filter_0${json[pas].id}" class="">${json[pas].name}</div>`
          filters.append(create_div)
          console.log(response.ok)
          console.log(response.status)
          console.log(create_div)
        }
        // LISTEN FILTERS BUTTONS          
        for (let pas = 0; pas < json.length + 1; pas++) {
          let selectedButtonsFilter = document.querySelector(`#filter_0${pas}`)
        // CLICK ON BUTTON
          selectedButtonsFilter.addEventListener("click", function (events) {
          console.log(`click on filter_0${pas}`)
          // WRITE SELECTED FILTER ON HTML
            if (`filter_0${pas}` !== `filter_00`) {
              gallery.replaceChildren()
              galleryAll(pas)
              console.log(`filter_nbr : ${pas}`)
            }
            else {
              let filter_nbr = 0
              gallery.replaceChildren()
              galleryAll(filter_nbr)
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
  }
)