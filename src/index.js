console.log('%c HI', 'color: firebrick')

// Create array
let breeds = [];

// On page loads, fetch the images

document.addEventListener("DOMContentLoaded", function () {
    getImages();
    getDogBreeds();
});

// Challenge 1
function getImages() {
    fetch("https://dog.ceo/api/breeds/image/random/4")
    .then(function(response) {
        return response.json()
    })
    .then(function(response) {
        response.message.forEach(image => addImage(image))
    });
};

function addImage(dogPicUrl) {
    let containter = document.querySelector("#dog-image-container");
    let newImageEl = document.createElement("img");
    newImageEl.src = dogPicUrl;
    containter.appendChild(newImageEl);
};

// Challenge 2
function getDogBreeds() {
    fetch("https://dog.ceo/api/breeds/list/all")
    .then(function(response) {
        return response.json()
    })
    .then(function(results) {
        breeds = Object.keys(results.message);
        updateBreedList(breeds);
        addBreedSelectListener();
    })
};

function updateBreedList(breeds) {
    let ul = document.querySelector("#dog-breeds");
    removeChildren(ul);
    breeds.forEach(breed => addBreed(breed));
};

function removeChildren(element) {
    let child = element.lastElementChild;
    while (child) {
        element.removeChild(child);
        child = element.lastElementChild;
    }
};

// Challenge 3
function addBreed(breed) {
    let ul = document.querySelector("#dog-breeds");
    let li = document.createElement("li");
    li.innerText = breed;
    li.style.cursor = "pointer";
    ul.appendChild(li);
    li.addEventListener("click", updateColor);
};

function updateColor(e) {
    e.target.style.color = "red";
};

// Challenge 4
function selectBreedsStartingWith(letter) {
    updateBreedList(breeds.filter(breed => breed.startsWith(letter)))
};

function addBreedSelectListener() {
    let breedDropdown = document.querySelector("#breed-dropdown");
    breedDropdown.addEventListener("change", function(e) {
        selectBreedsStartingWith(e.target.value)
    })
};