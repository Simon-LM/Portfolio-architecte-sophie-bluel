console.log("Page JAvaScripte")

const gallery = document.querySelector('.gallery')

fetch("http://localhost:5678/api/works")
  .then(function (response) {
    if (response.ok) {      
      return response.json()
        .then(function (json) {
        
        let jsonLength = json.length
        for (let pas = 0; pas < jsonLength; pas++) {
          const galleryArray = [json[pas]]
          
          galleryArray.forEach((element) => {
            console.log(`GalleryArray ID : ${pas}`)

            let create_figure = document.createElement("figure")
            create_figure.innerHTML = `<img src="${[element.imageUrl]}" alt="${[element.title]}"><figcaption>${[element.title]}</figcaption>`
            gallery.append(create_figure)
                  
            console.log(response.ok)

            console.log(response.status)

            console.log(create_figure)
            console.log(element)
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
