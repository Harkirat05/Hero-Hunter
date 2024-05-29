// Function to display superhero details
function displaySuperheroDetails() {
    const container = document.getElementById("superhero-details-container"); // Get the container element for superhero details
    const selectedHeroData = JSON.parse(localStorage.getItem('selectedHeroData')); // Retrieve the selected hero data from localStorage

    if (selectedHeroData) {
        // If hero data is found, create and insert HTML content to display the details
        container.innerHTML = `
            <div class="superhero-details">
                <img src="${selectedHeroData.image}" alt="${selectedHeroData.name}"> <!-- Display hero image -->
                <h2>${selectedHeroData.name}</h2> <!-- Display hero name -->
                <p>${selectedHeroData.description}</p> <!-- Display hero description -->
                <h3>Comics:</h3>
                <ul>${selectedHeroData.comics.map(comic => `<li>${comic}</li>`).join('')}</ul> <!-- Display list of comics -->
                <h3>Series:</h3>
                <ul>${selectedHeroData.series.map(series => `<li>${series}</li>`).join('')}</ul> <!-- Display list of series -->
                <h3>Events:</h3>
                <ul>${selectedHeroData.events.map(event => `<li>${event}</li>`).join('')}</ul> <!-- Display list of events -->
                <h3>Stories:</h3>
                <ul>${selectedHeroData.stories.map(story => `<li>${story}</li>`).join('')}</ul> <!-- Display list of stories -->
            </div>`;
    } else {
        // If no hero data is found, display a message indicating that
        container.innerHTML = "<p>No superhero data found.</p>";
    }
}

// Function to redirect to the home page
function returnHome() {
    window.location.href = "index.html"; // Redirect to home page
}

// Call the function to display superhero details when the page loads
window.onload = displaySuperheroDetails; // Ensure superhero details are displayed on page load
