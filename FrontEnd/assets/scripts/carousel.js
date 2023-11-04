console.log("CAROUSEL");
// const selectedImage = document.getElementById(`img-carousel`)	


const urlCarouselAPI = "http://localhost:5678/api/works"
fetch(urlCarouselAPI)
	.then(function (response) {
		if (response.ok) {
			return response.json()
			.then(function (json) {
				slides = json
				console.log(slides)
				// Number of images
				// slides.length
				var  numberOfImages  = `${slides.length}` 
				console.log(' numberOfImages  :',  numberOfImages)
				// Number max of images in TABLE 
				var numberOfImagesTable = `${slides.length - 1}` 
				console.log(' numberOfImagesTable  :', numberOfImagesTable)

				// First image selected
				const selectedImage = document.getElementById(`img-carousel`)	
				// Wrote image name on carousel
				const imageNameCarousel = document.getElementById("img-name-carousel")
				// imageNameCarousel.textContent =  slides[imagePosition].title
				// CLICK ON ARROWS //
				let leftArrow = document.querySelector(".arrow_left");
				leftArrow.addEventListener("click", left)
				let rightArrow = document.querySelector(".arrow_right");
				rightArrow.addEventListener("click", right)

				function left() {
					let imagePosition = selectedImage.className.replace('img-carousel-ID_', '')
					console.log('Position actuelle de l\'image DÉBUT :' + imagePosition)
					console.log('Position actuelle de l\'image début :', document.getElementById("img-carousel").className)
					console.log(' numberOfImages  :', numberOfImages)
					console.log(' numberOfImagesTable  :', numberOfImagesTable)
					console.log("Gauche")
					if (imagePosition === '0') {
						imagePosition = numberOfImages - 1

						document.getElementById("img-carousel").src = slides[imagePosition].imageUrl
						document.getElementById("img-carousel").className = `img-carousel-ID_${imagePosition}`
						imageNameCarousel.textContent = slides[imagePosition].title
					}
					else {
						imagePosition = imagePosition - 1

						document.getElementById("img-carousel").src = slides[imagePosition].imageUrl
						document.getElementById("img-carousel").className = `img-carousel-ID_${imagePosition}`
						imageNameCarousel.textContent =  slides[imagePosition].title
					}

					console.log('Position actuelle de l\'image FIN :', imagePosition)
					console.log('Position actuelle de l\'image FIN :', document.getElementById("img-carousel").className)
				}
				function right() {
					let imagePosition = selectedImage.className.replace('img-carousel-ID_', '')
					
					console.log('Position actuelle de l\'image DÉBUT :' + imagePosition)
					console.log('Position actuelle de l\'image début :', document.getElementById("img-carousel").className)
					console.log("Droite")
					if (imagePosition === numberOfImagesTable) {
						imagePosition = '0' 
						document.getElementById("img-carousel").src = slides[imagePosition].imageUrl
						document.getElementById("img-carousel").className = `img-carousel-ID_${imagePosition}`
						imageNameCarousel.textContent =  slides[imagePosition].title
					}
					else {					
						imagePosition = imagePosition - 1 + 2 // bug
						document.getElementById("img-carousel").src = slides[imagePosition].imageUrl
						
						document.getElementById("img-carousel").className = `img-carousel-ID_${imagePosition}`
						imageNameCarousel.textContent =  slides[imagePosition].title
					}

					console.log('Position actuelle de l\'image FIN :', imagePosition)
					console.log('Position actuelle de l\'image FIN :', document.getElementById("img-carousel").className)
				}
})
		} else {
			console.log("error get slide")
		}
})