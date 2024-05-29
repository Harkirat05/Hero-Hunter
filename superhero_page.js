// Function to display superhero details
function displaySuperheroDetails() {
    const container = document.getElementById("superhero-details-container");
    const selectedHeroData = JSON.parse(localStorage.getItem('selectedHeroData'));
    if (selectedHeroData) {
        container.innerHTML = `
            <div class="superhero-details">
                <img src="${selectedHeroData.image}" alt="${selectedHeroData.name}">
                <h2>${selectedHeroData.name}</h2>
                <p>${selectedHeroData.description}</p>
                <h3>Comics:</h3>
                <ul>${selectedHeroData.comics.map(comic => `<li>${comic}</li>`).join('')}</ul>
                <h3>Series:</h3>
                <ul>${selectedHeroData.series.map(series => `<li>${series}</li>`).join('')}</ul>
                <h3>Events:</h3>
                <ul>${selectedHeroData.events.map(event => `<li>${event}</li>`).join('')}</ul>
                <h3>Stories:</h3>
                <ul>${selectedHeroData.stories.map(story => `<li>${story}</li>`).join('')}</ul>
                
            </div>`;
    } else {
        container.innerHTML = "<p>No superhero data found.</p>";
    }
}

function returnHome() {
    window.location.href = "index.html"; // Redirect to home page
}

// Call the function to display superhero details when the page loads
window.onload = displaySuperheroDetails;
