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
slides.length
const  numberOfImages  = slides.length 
console.log(' numberOfImages  :',  numberOfImages )

// Number max of images in TABLE 
const numberOfImagesTable= slides.length - 1 
console.log(' numberOfImagesTable  :', numberOfImagesTable)

// Initial position of img
let initialImagePosition = 0
console.log('Position initial de l\'image :', initialImagePosition)
let imagePosition = initialImagePosition
console.log('Position actuelle de l\'image :', imagePosition)

// Nbr dots selectors = Nbr imgs
let numberOfDots =  numberOfImages  + 1
let placeOfDots = document.getElementById("dots")
for (let pas = 1; pas < numberOfDots ; pas++) {	
	console.log("<a class=\"dot_link\"><div id=\"dot_0" + pas + "\" class=\"dot\"></div></a>")
	let create_a =  document.createElement("a")
	create_a.innerHTML = `<div id=\"dot_0` + pas + `\" class=\"dot\"></div>`
	placeOfDots.append(create_a)
}

// Initial position of dot
let initialPlaceOfDots = document.getElementById(`dot_01`)		
initialPlaceOfDots.setAttribute("class", "dot dot_selected");
console.log(placeOfDots)

// || SELECTION DOT POSITION ||
for (let pas = 1; pas < numberOfDots; pas++) {
	let selectedPoints = document.querySelector(`#dot_0${pas}`)

	// CLICK ON DOT //
	selectedPoints.addEventListener("click", function () {
		console.log(`click on dot_0${pas}`)

		// Change image & text
		document.getElementById("img-carousel").src = slides[pas + 1].imageUrl
		// let newHeavyTagLine = document.getElementById("tag_line_heavy")		
		// newHeavyTagLine.replaceChildren(slides[pas-1].tagLine_heavy)
		// let newThinTagLine = document.getElementById("tag_line_thin")		
		// newThinTagLine.replaceChildren(slides[pas - 1].tagLine_thin)
		
		// Make all dots empty
		let selectAllDots = document.querySelectorAll("div.dot");
		for (var i = 0; i < selectAllDots.length; ++i) {
			var item = selectAllDots[i]
			item.setAttribute("class", "dot")
		}
		// Make Selection dot full
		let clickedDot = document.getElementById(`dot_0${pas}`)		
		clickedDot.setAttribute("class", "dot dot_selected");
		a
		// Reset new dot positon
		imagePosition = pas - 1

		console.log(selectedPoints)
		console.log('Position actuelle de l\'image :', imagePosition)
	})
}

// CLICK ON ARROWS //
let leftArrow = document.querySelector(".arrow_left");
leftArrow.addEventListener("click", left)  
let rightArrow = document.querySelector(".arrow_right");
rightArrow.addEventListener("click", right)

function left() {
	console.log("Gauche")
	if (imagePosition == 0) {
		imagePosition =  numberOfImages  - 1
	}
	else {
		imagePosition = imagePosition - 1
	}

	// Change image & text
	// document.getElementById("img_position_slide").src = slides[pas].imageUrl
	document.getElementById("img-carousel").src = slides[imagePosition].imageUrl
	// let newHeavyTagLine = document.getElementById("tag_line_heavy")		
	// newHeavyTagLine.replaceChildren(slides[imagePosition].tagLine_heavy)
	// let newThinTagLine = document.getElementById("tag_line_thin")		
	// newThinTagLine.replaceChildren(slides[imagePosition].tagLine_thin)
	
	// DOT POSITION // 
	if (imagePosition == numberOfImagesTable) {
		// Make all dots empty
		let selectAllDots = document.querySelectorAll("div.dot");
		for (var i = 0; i < selectAllDots.length; ++i) {
			var item = selectAllDots[i]
			item.setAttribute("class", "dot")
		}
		// Make Selection dot full
		let currentDot  = document.getElementById(`dot_0${imagePosition + 1}`)		
		currentDot.setAttribute("class", "dot dot_selected");
	}
	else {
		// Make all dots empty
		let selectAllDots = document.querySelectorAll("div.dot");
		for (var i = 0; i < selectAllDots.length; ++i) {
			var item = selectAllDots[i]
			item.setAttribute("class", "dot")
		}
		// Make Selection dot full
		let currentDot = document.getElementById(`dot_0${imagePosition + 1}`)		
		currentDot.setAttribute("class", "dot dot_selected");
	}
	console.log('Position actuelle de l\'image :', imagePosition)
}
function right() {
	console.log("Droite")
	if (imagePosition == numberOfImagesTable) {
		imagePosition = 0 
	}
	else {
		imagePosition = imagePosition + 1
	}

	// Change image & text
	// document.getElementById("img_position_slide").src = slides[pas].imageUrl
	document.getElementById("img-carousel").src = slides[imagePosition].imageUrl
	// let newHeavyTagLine = document.getElementById("tag_line_heavy")		
	// newHeavyTagLine.replaceChildren(slides[imagePosition].tagLine_heavy)
	// let newThinTagLine = document.getElementById("tag_line_thin")		
	// newThinTagLine.replaceChildren(slides[imagePosition].tagLine_thin)

	// DOT POSITION //
	if (imagePosition == 0) {
		// Make all dots empty
		let selectAllDots = document.querySelectorAll("div.dot");
		for (var i = 0; i < selectAllDots.length; ++i) {
			var item = selectAllDots[i]
			item.setAttribute("class", "dot")
		}
		// Make Selection dot full
		let currentDot = document.getElementById(`dot_0${imagePosition + 1}`)		
		currentDot.setAttribute("class", "dot dot_selected");
	}
	else {
		// Make all dots empty
		let selectAllDots = document.querySelectorAll("div.dot");
		for (var i = 0; i < selectAllDots.length; ++i) {
			var item = selectAllDots[i]
			item.setAttribute("class", "dot")
		}
		// Make Selection dot full
		let currentDot = document.getElementById(`dot_0${imagePosition + 1}`)		
		currentDot.setAttribute("class", "dot dot_selected");
	}	
	console.log('Position actuelle de l\'image :', imagePosition)
}


})
		} else {
			console.log("error get slide")
		}
})