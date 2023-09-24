console.log("Page JAvaScripte")


const myFirstImage = document.getElementById('img_01')
const myFirstImageSRC_has = myFirstImage.hasAttribute("src")
const myFirstImageSRC = myFirstImage.getAttribute("src")
console.log(myFirstImageSRC_has)
console.log(myFirstImageSRC)



fetch("http://localhost:5678/api/works")
  .then(function (response) {
    if (response.ok) {
      
      return response.json()
        .then(function (json) {

        myFirstImage.setAttribute("src", json[0].imageUrl)
        myFirstImage.setAttribute("alt", json[0].title)
        // myFirstImageTitle.setAttribute("alt", json[0].title)
              
          
          
        console.log(response.status)
        console.log(response.url)
        console.log(response.ok)
        console.log(response)
        console.log(json[0].imageUrl)
        console.log(myFirstImageSRC)
      })

    }
    else {
      console.log("Mauvaise réponse du réseau")
      console.log(response.status)
      console.log(response.url)
      console.log(response.ok)
      console.log(response)

    }
  })
  .catch(function (error) {
    console.log(
      "Il y a eu un problème avec l'opération fetch : " + error.message,)
    console.log(response.status)
    console.log(response.url)
    console.log(response.ok)
  })





