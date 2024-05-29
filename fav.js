// Function to redirect to the home page
function returnHome() {
    window.location.href = "index.html"; // Redirect to home page
}

// Function to render favorite superheroes
function renderFavorites() {
    const favoritesContainer = document.getElementById('favorites-container'); // Get the container for favorites
    favoritesContainer.innerHTML = ''; // Clear the container

    // Retrieve the favorites from localStorage, or initialize to an empty array if not found
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    // Iterate over each favorite hero and create HTML elements for display
    favorites.forEach(hero => {
        const heroElement = document.createElement('div'); // Create a div for each hero
        heroElement.innerHTML = `
            <div class="favorite-item">
                <img src="${hero.image}" alt="${hero.name}"> <!-- Display hero image -->
                <div>
                    <span>${hero.name}</span> <!-- Display hero name -->
                    <p>${hero.description}</p> <!-- Display hero description -->
                </div>
                <button class="remove-button">Remove</button> <!-- Button to remove hero from favorites -->
            </div>
        `;

        // Add event listener to the remove button to handle removal from favorites
        const removeButton = heroElement.querySelector('.remove-button');
        removeButton.addEventListener('click', () => {
            removeFromFavorites(hero); // Call function to remove the hero
        });

        favoritesContainer.appendChild(heroElement); // Append the hero element to the container
    });
}

// Function to remove a hero from the favorites list
function removeFromFavorites(hero) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || []; // Retrieve the favorites from localStorage
    favorites = favorites.filter(favorite => favorite.id !== hero.id); // Filter out the hero to be removed
    localStorage.setItem('favorites', JSON.stringify(favorites)); // Save the updated favorites list back to localStorage
    renderFavorites(); // Re-render the favorites list
}

// Ensure rendering of favorites when the page loads
window.onload = () => {
    renderFavorites(); // Call function to render favorites on page load

    // Attach event listener to the "Return to Home" button
    const returnButton = document.getElementById('return-button');
    if (returnButton) {
        returnButton.addEventListener('click', returnHome); // Add click event listener to redirect to home page
    }
};
