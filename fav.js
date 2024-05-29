// Function to redirect to the home page
function returnHome() {
    window.location.href = "index.html"; // Redirect to home page
}

// Function to render favorite superheroes
function renderFavorites() {
    const favoritesContainer = document.getElementById('favorites-container');
    favoritesContainer.innerHTML = '';
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites.forEach(hero => {
        const heroElement = document.createElement('div');
        heroElement.innerHTML = `
            <div class="favorite-item">
                <img src="${hero.image}" alt="${hero.name}">
                <div>
                    <span>${hero.name}</span>
                    <p>${hero.description}</p>
                </div>
                <button class="remove-button">Remove</button>
            </div>
        `;
        const removeButton = heroElement.querySelector('.remove-button');
        removeButton.addEventListener('click', () => {
            removeFromFavorites(hero);
        });
        favoritesContainer.appendChild(heroElement);
    });
}

function removeFromFavorites(hero) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites = favorites.filter(favorite => favorite.id !== hero.id);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    renderFavorites();
}

// Ensure rendering of favorites when the page loads
window.onload = () => {
    renderFavorites();
    
    // Attach event listener to the "Return to Home" button
    const returnButton = document.getElementById('return-button');
    if (returnButton) {
        returnButton.addEventListener('click', returnHome);
    }
};
