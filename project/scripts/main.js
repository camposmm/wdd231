// Import all required functions from modules
import { fetchVendors } from './vendors.js';
import { fetchEvents } from './events.js';
import { handleForm } from './form.js';

// Mobile Menu Toggle
const setupMobileMenu = () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('active');
            const isExpanded = nav.classList.contains('active');
            menuToggle.setAttribute('aria-expanded', isExpanded);
        });
    }
};

// Featured Vendors Loader
const loadFeaturedVendors = async () => {
    try {
        const vendors = await fetchVendors();
        const featuredVendors = vendors
            .filter(vendor => vendor.featured)
            .slice(0, 3);
        
        const container = document.querySelector('#featured-vendors');
        if (container) {
            container.innerHTML = featuredVendors.map(vendor => `
                <div class="featured-vendor-card">
                    <img src="./images/vendors/${vendor.image || 'default.jpg'}" 
                         alt="${vendor.name}"
                         loading="lazy"
                         onerror="this.src='./images/vendors/default.jpg'">
                    <div class="vendor-info">
                        <h3>${vendor.name}</h3>
                        <p>${vendor.description.substring(0, 100)}...</p>
                        <a href="#" class="view-btn">View Details</a>
                    </div>
                </div>
            `).join('');
        }
    } catch (error) {
        console.error('Failed to load featured vendors:', error);
        const container = document.querySelector('#featured-vendors');
        if (container) {
            container.innerHTML = '<p class="error">Currently unavailable. Please check back later.</p>';
        }
    }
};

// Featured Events Loader
const loadFeaturedEvents = async () => {
    try {
        const events = await fetchEvents();
        const upcomingEvents = events
            .filter(event => new Date(event.date) >= new Date())
            .sort((a, b) => new Date(a.date) - new Date(b.date))
            .slice(0, 3);
        
        const container = document.querySelector('#featured-events');
        if (container) {
            container.innerHTML = upcomingEvents.map(event => `
                <div class="event-card">
                    <h3>${event.title}</h3>
                    <p class="event-date">
                        ${new Date(event.date).toLocaleDateString('en-US', { 
                            weekday: 'short', 
                            month: 'short', 
                            day: 'numeric' 
                        })}
                    </p>
                    <p>${event.description.substring(0, 100)}...</p>
                    <a href="#" class="event-link">More Info</a>
                </div>
            `).join('');
        }
    } catch (error) {
        console.error('Failed to load events:', error);
        const container = document.querySelector('#featured-events');
        if (container) {
            container.innerHTML = '<p class="error">Event information currently unavailable.</p>';
        }
    }
};

// Seasonal Highlights Updater
const updateSeasonalHighlights = () => {
    const month = new Date().getMonth();
    const highlightsContainer = document.querySelector('#seasonal-highlights');
    
    const seasonalProduce = {
        0: 'Winter squash, kale, and root vegetables',
        1: 'Citrus fruits, leeks, and storage apples',
        2: 'Early greens, radishes, and spring onions',
        3: 'Asparagus, peas, and strawberries',
        4: 'Cherries, lettuce, and new potatoes',
        5: 'Berries, tomatoes, and zucchini',
        6: 'Corn, peaches, and peppers',
        7: 'Melons, plums, and green beans',
        8: 'Apples, pears, and pumpkins',
        9: 'Winter squash, Brussels sprouts, and grapes',
        10: 'Sweet potatoes, cranberries, and kale',
        11: 'Storage crops and greenhouse greens'
    };
    
    if (highlightsContainer) {
        highlightsContainer.textContent = seasonalProduce[month] || 'Fresh local produce available year-round';
    }
};

// Initialize the application
const initApp = () => {
    setupMobileMenu();
    
    // Load components conditionally
    if (document.querySelector('#featured-vendors')) {
        loadFeaturedVendors();
    }
    
    if (document.querySelector('#featured-events')) {
        loadFeaturedEvents();
    }
    
    if (document.querySelector('#seasonal-highlights')) {
        updateSeasonalHighlights();
    }
    
    if (document.querySelector('#marketForm')) {
        handleForm();
    }
};

// Start the application when DOM is ready
document.addEventListener('DOMContentLoaded', initApp);