document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.getElementById('menuToggle');
    const primaryNav = document.getElementById('primaryNav');
  
    if (menuToggle && primaryNav) {
        menuToggle.addEventListener('click', function() {
            primaryNav.classList.toggle('open');
            menuToggle.textContent = primaryNav.classList.contains('open') ? 'Close' : 'Menu';
        });
    }

    // Set Current Year in Footer
    const currentYearElement = document.getElementById('copyright-year');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }

    // Set Last Modified Date in Footer
    const lastModifiedElement = document.getElementById('last-modified');
    if (lastModifiedElement) {
        lastModifiedElement.textContent = document.lastModified;
    }

    // Load attractions from JSON
    loadAttractions();

    // Display visitor message
    displayVisitMessage();
});

async function loadAttractions() {
    try {
        const response = await fetch('data/discover.json');
        const data = await response.json();
        displayAttractions(data.attractions);
    } catch (error) {
        console.error('Error loading attractions:', error);
    }
}

function displayAttractions(attractions) {
    const grid = document.getElementById('discoverGrid');
    if (!grid) return;

    grid.innerHTML = '';

    attractions.forEach(attraction => {
        const card = document.createElement('article');
        card.className = 'discover-card';
        
        card.innerHTML = `
            <h2>${attraction.name}</h2>
            <figure>
                <img src="${attraction.image}" alt="${attraction.name}" loading="lazy">
            </figure>
            <address>${attraction.address}</address>
            <p>${attraction.description}</p>
            <a href="#" class="btn">Learn More</a>
        `;

        grid.appendChild(card);
    });
}

function displayVisitMessage() {
    const visitMessage = document.getElementById('visit-message');
    if (!visitMessage) return;

    const lastVisit = localStorage.getItem('lastVisit');
    const currentDate = Date.now();

    if (!lastVisit) {
        visitMessage.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        const lastVisitDate = parseInt(lastVisit);
        const daysBetween = Math.floor((currentDate - lastVisitDate) / (1000 * 60 * 60 * 24));

        if (daysBetween === 0) {
            visitMessage.textContent = "Back so soon! Awesome!";
        } else {
            const dayText = daysBetween === 1 ? "day" : "days";
            visitMessage.textContent = `You last visited ${daysBetween} ${dayText} ago.`;
        }
    }

    localStorage.setItem('lastVisit', currentDate.toString());
}