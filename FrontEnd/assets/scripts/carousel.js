console.log("CAROUSEL");

const urlCarouselAPI = "http://localhost:5678/api/works"
fetch(urlCarouselAPI)
	.then(function (response) {
		if (response.ok) {
			return response.json()
			.then(function (json) {
				slides = json
				console.log(slides)
				// Number of images
				var  numberOfImages  = `${slides.length}` 
				console.log(' numberOfImages  :',  numberOfImages)
				// Number max of images in TABLE 
				var numberOfImagesTable = `${slides.length - 1}` 
				console.log(' numberOfImagesTable  :', numberOfImagesTable)

				// First image selected
				const selectedImage = document.getElementById(`img-carousel`)
				// Wrote image name on carousel
				const imageNameCarousel = document.getElementById("img-name-carousel")
				// CLICK ON ARROWS //
				let leftArrow = document.querySelector(".arrow_left");
				leftArrow.addEventListener("click", left)
				let rightArrow = document.querySelector(".arrow_right");
				rightArrow.addEventListener("click", right)
				var image = document.createElement("img")

				function left() {
					let imagePosition = selectedImage.className.replace('img-carousel-ID_', '')
					// console.log('Position actuelle de l\'image DÉBUT :' + imagePosition)
					console.log("Left arrow Carousel")
					if (imagePosition === '0') {
						imagePosition = numberOfImages - 1

						image.src = slides[imagePosition].imageUrl
              			image.id = "img-carousel"
						selectedImage.replaceChildren(image)

						document.getElementById("img-carousel").className = `img-carousel-ID_${imagePosition}`
						imageNameCarousel.textContent = slides[imagePosition].title
					}
					else {
						imagePosition = imagePosition - 1

						image.src = slides[imagePosition].imageUrl
              			image.id = "img-carousel"
						selectedImage.replaceChildren(image)

						document.getElementById("img-carousel").className = `img-carousel-ID_${imagePosition}`
						imageNameCarousel.textContent =  slides[imagePosition].title
					}

					console.log('Position actuelle de l\'image FIN :', imagePosition)
				}
				function right() {
					let imagePosition = selectedImage.className.replace('img-carousel-ID_', '')
					
					console.log('Position actuelle de l\'image DÉBUT :' + imagePosition)
					console.log("Right arrow Carousel")
					if (imagePosition === numberOfImagesTable) {
						imagePosition = '0' 

						image.src = slides[imagePosition].imageUrl
              			image.id = "img-carousel"
						selectedImage.replaceChildren(image)

						document.getElementById("img-carousel").className = `img-carousel-ID_${imagePosition}`
						imageNameCarousel.textContent =  slides[imagePosition].title
					}
					else {					
						imagePosition = imagePosition - 1 + 2 // bug

						image.src = slides[imagePosition].imageUrl
              			image.id = "img-carousel"
						selectedImage.replaceChildren(image)

						document.getElementById("img-carousel").className = `img-carousel-ID_${imagePosition}`
						imageNameCarousel.textContent =  slides[imagePosition].title
					}
					console.log('Position actuelle de l\'image FIN :', imagePosition)
				}
})
		} else {
			console.log("error get slide")
		}
})