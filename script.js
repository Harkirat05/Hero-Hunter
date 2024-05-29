import { ts, publicKey, hashVal } from './api.js';

let input = document.getElementById("input-box");
let button = document.getElementById("submit-button");
let showContainer = document.getElementById("show-container");
let listContainer = document.querySelector(".list");
let selectedHeroData = null;

function displayWords(value) {
    input.value = value;
    removeElements();
}

function removeElements() {
    listContainer.innerHTML = "";
}

input.addEventListener("input", async () => {
    removeElements();
    const searchTerm = input.value.trim();
    if (searchTerm.length < 1) {
        return false;
    }

    const url = `https://gateway.marvel.com:443/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hashVal}&nameStartsWith=${searchTerm}`;

    try {
        const response = await fetch(url);
        const jsonData = await response.json();

        const filteredResults = jsonData.data.results.filter(element => element.description && element.thumbnail.path && element.thumbnail.extension);

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

button.addEventListener("click", async () => {
    const searchTerm = input.value.trim();
    if (searchTerm.length < 1) {
        alert("Input cannot be blank");
        return;
    }

    showContainer.innerHTML = "";
    const url = `https://gateway.marvel.com:443/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hashVal}&name=${searchTerm}`;

    try {
        const response = await fetch(url);
        const jsonData = await response.json();

        const filteredResults = jsonData.data.results.filter(element => element.description && element.thumbnail.path && element.thumbnail.extension);

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

            const addToFavoritesButton = showContainer.querySelector('.add-favorite:last-child');
            addToFavoritesButton.addEventListener('click', () => {
                addToFavorites(element);
            });

            const moreInfoButton = showContainer.querySelector('.more-info-button:last-child');
            moreInfoButton.addEventListener('click', () => {
                handleHeroSelection(element);
                window.location.href = "superhero_page.html"; // Navigate to the superhero page in the same tab
            });
        });

    } catch (error) {
        console.error("Error fetching data:", error);
    }
});

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


function renderFavorites() {
    // You can add logic here if you want to render the favorites list in the current context
    console.log("Favorites list updated");
}

function addToFavorites(hero) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const isDuplicate = favorites.some(favorite => favorite.id === hero.id);
    if (!isDuplicate) {
        favorites.push({
            id: hero.id,
            name: hero.name,
            image: `${hero.thumbnail.path}.${hero.thumbnail.extension}`,
            description: hero.description // Include description here
        });
        localStorage.setItem('favorites', JSON.stringify(favorites));
        renderFavorites(); // Update the favorites list
        alert(`${hero.name} has been added to your favorites!`);
    } else {
        alert("This hero is already in your favorites.");
    }
}
