import { ts, publicKey, hashVal } from './api.js';

// Get references to HTML elements
let input = document.getElementById("input-box");
let button = document.getElementById("submit-button");
let showContainer = document.getElementById("show-container");
let listContainer = document.querySelector(".list");
let selectedHeroData = null;

// Function to display the clicked suggestion in the input box
function displayWords(value) {
    input.value = value;
    removeElements();
}

// Function to clear the suggestion list
function removeElements() {
    listContainer.innerHTML = "";
}

// Event listener for the input field to fetch and display suggestions
input.addEventListener("input", async () => {
    removeElements(); // Clear previous suggestions
    const searchTerm = input.value.trim();
    if (searchTerm.length < 1) {
        return false;
    }

    // API URL to fetch characters based on input
    const url = `https://gateway.marvel.com:443/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hashVal}&nameStartsWith=${searchTerm}`;

    try {
        const response = await fetch(url);
        const jsonData = await response.json();

        // Filter results to ensure each character has a description and a valid image
        const filteredResults = jsonData.data.results.filter(element => element.description && element.thumbnail.path && element.thumbnail.extension);

        // Create and display suggestion list
        filteredResults.forEach((result) => {
            let name = result.name;
            let div = document.createElement("div");
            div.style.cursor = "pointer";
            div.classList.add("autocomplete-items");
            div.textContent = name;
            div.addEventListener("click", () => {
                input.value = name;
                removeElements();
            });
            listContainer.appendChild(div);
        });
    } catch (error) {
        console.error("Error fetching data:", error);
    }
});

// Event listener for the submit button to fetch and display character details
button.addEventListener("click", async () => {
    const searchTerm = input.value.trim();
    if (searchTerm.length < 1) {
        alert("Input cannot be blank");
        return;
    }

    showContainer.innerHTML = ""; // Clear previous results
    const url = `https://gateway.marvel.com:443/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hashVal}&name=${searchTerm}`;

    try {
        const response = await fetch(url);
        const jsonData = await response.json();

        // Filter results to ensure each character has a description and a valid image
        const filteredResults = jsonData.data.results.filter(element => element.description && element.thumbnail.path && element.thumbnail.extension);

        // Create and display character details
        filteredResults.forEach((element) => {
            const characterHTML = `
                <div class="card-container">
                    <div class="container-character-image">
                        <img src="${element.thumbnail.path}.${element.thumbnail.extension}" alt="${element.name}">
                        <button class="add-favorite">&#9825;</button>
                    </div>
                    <div class="character-name">${element.name}</div>
                    <div class="character-description">${element.description}</div>
                    <button class="more-info-button">More Info</button>
                </div>`;

            showContainer.innerHTML += characterHTML;

            // Add event listener to the favorite button
            const addToFavoritesButton = showContainer.querySelector('.add-favorite:last-child');
            addToFavoritesButton.addEventListener('click', () => {
                addToFavorites(element);
            });

            // Add event listener to the more info button
            const moreInfoButton = showContainer.querySelector('.more-info-button:last-child');
            moreInfoButton.addEventListener('click', () => {
                handleHeroSelection(element);
                window.location.href = "superhero_page.html"; // Navigate to the superhero page
            });
        });

    } catch (error) {
        console.error("Error fetching data:", error);
    }
});

// Function to handle selection of a hero and store data in localStorage
function handleHeroSelection(hero) {
    selectedHeroData = {
        id: hero.id,
        name: hero.name,
        image: `${hero.thumbnail.path}.${hero.thumbnail.extension}`,
        description: hero.description,
        comics: hero.comics.items.map(comic => comic.name),
        series: hero.series.items.map(series => series.name),
        events: hero.events.items.map(event => event.name),
        stories: hero.stories.items.map(story => story.name),
        urls: hero.urls.map(url => ({ type: url.type, url: url.url }))
    };
    localStorage.setItem('selectedHeroData', JSON.stringify(selectedHeroData));
}

// Function to render the list of favorite heroes
function renderFavorites() {
    // Code to render favorite heroes from localStorage can be added here
    console.log("Favorites list updated");
}

// Function to add a hero to the list of favorites
function addToFavorites(hero) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const isDuplicate = favorites.some(favorite => favorite.id === hero.id);
    if (!isDuplicate) {
        favorites.push({
            id: hero.id,
            name: hero.name,
            image: `${hero.thumbnail.path}.${hero.thumbnail.extension}`,
            description: hero.description 
        });
        localStorage.setItem('favorites', JSON.stringify(favorites));
        renderFavorites();
        alert(`${hero.name} has been added to your favorites!`);
    } else {
        alert("This hero is already in your favorites.");
    }
}
