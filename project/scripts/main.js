import { fetchVendors, initVendors } from './vendors.js';

// Either use specific functions
const vendors = await fetchVendors();

// Or initialize the whole system
initVendors();

document.addEventListener('DOMContentLoaded', async () => {
  const vendors = await fetchVendors();
  console.log('Loaded vendors:', vendors);
    
    // Mobile menu toggle
    setupMobileMenu();
    
    // Load featured vendors if on homepage
    if (document.querySelector('#featured-vendors')) {
        loadFeaturedVendors();
    }
    
    // Load featured events if on homepage
    if (document.querySelector('#featured-events')) {
        loadFeaturedEvents();
    }
    
    // Seasonal highlights
    if (document.querySelector('#seasonal-highlights')) {
        updateSeasonalHighlights();
    }
    
    // Form handling
    if (document.querySelector('#marketForm')) {
        handleForm();
    }
});

// Mobile menu setup
function setupMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('active');
            menuToggle.setAttribute('aria-expanded', nav.classList.contains('active'));
        });
    }
}

// Load and display featured vendors
async function loadFeaturedVendors() {
    console.log('[main.js] Loading featured vendors...');
    
    try {
        const vendors = await fetchVendors();
        const featuredVendors = vendors
            .filter(vendor => vendor.featured)
            .slice(0, 3);
        
        const container = document.querySelector('#featured-vendors');
        if (container) {
            container.innerHTML = featuredVendors.map(vendor => `
                <div class="featured-vendor">
                    <img src="../images/vendors/${vendor.image || 'default.jpg'}" 
                         alt="${vendor.name}"
                         loading="lazy"
                         onerror="this.src='../images/vendors/default.jpg'">
                    <div class="featured-vendor-info">
                        <h3>${vendor.name}</h3>
                        <p>${vendor.description.substring(0, 100)}...</p>
                        <a href="/vendors#${vendor.id}" class="btn">View Details</a>
                    </div>
                </div>
            `).join('');
        }
    } catch (error) {
        console.error('[main.js] Error loading featured vendors:', error);
        const container = document.querySelector('#featured-vendors');
        if (container) {
            container.innerHTML = '<p class="error">Featured vendors unavailable. Check back later.</p>';
        }
    }
}

// Load and display featured events
async function loadFeaturedEvents() {
    console.log('[main.js] Loading featured events...');
    
    try {
        const events = await fetchEvents();
        const featuredEvents = events
            .filter(event => new Date(event.date) >= new Date())
            .sort((a, b) => new Date(a.date) - new Date(b.date))
            .slice(0, 3);
        
        const container = document.querySelector('#featured-events');
        if (container) {
            container.innerHTML = featuredEvents.map(event => `
                <div class="featured-event">
                    <h3>${event.title}</h3>
                    <p class="event-date">
                        ${new Date(event.date).toLocaleDateString('en-US', { 
                            weekday: 'short', 
                            month: 'short', 
                            day: 'numeric' 
                        })}
                    </p>
                    <p>${event.description.substring(0, 100)}...</p>
                    <a href="/events#${event.id}" class="btn">Event Details</a>
                </div>
            `).join('');
        }
    } catch (error) {
        console.error('[main.js] Error loading featured events:', error);
        const container = document.querySelector('#featured-events');
        if (container) {
            container.innerHTML = '<p class="error">Event information currently unavailable.</p>';
        }
    }
}

// Update seasonal highlights
function updateSeasonalHighlights() {
    const month = new Date().getMonth();
    const highlights = document.querySelector('#seasonal-highlights');
    
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
    
    if (highlights) {
        highlights.textContent = seasonalProduce[month] || 'Fresh local produce available year-round';
    }
}