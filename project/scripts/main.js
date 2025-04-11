// main.js - Complete with all functions and proper imports

import { fetchVendors } from './vendors.js';
import { fetchEvents } from './events.js';
import { handleForm } from './form.js';

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
        menuToggle.setAttribute('aria-expanded', nav.classList.contains('active'));
    });
    
    // Load featured vendors on homepage
    if (document.querySelector('#featured-vendors')) {
        loadFeaturedVendors();
    }
    
    // Load featured events on homepage
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

async function loadFeaturedVendors() {
    try {
        const vendors = await fetchVendors();
        const featuredVendors = vendors.filter(vendor => vendor.featured).slice(0, 3);
        const container = document.querySelector('#featured-vendors');
        
        container.innerHTML = featuredVendors.map(vendor => `
            <div class="vendor-card">
                <img src="images/vendors/${vendor.image}" alt="${vendor.name}" loading="lazy">
                <div class="vendor-info">
                    <span class="vendor-category">${vendor.category}</span>
                    <h3>${vendor.name}</h3>
                    <p>${vendor.description.substring(0, 100)}...</p>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error loading featured vendors:', error);
        document.querySelector('#featured-vendors').innerHTML = 
            '<p>Unable to load vendor information. Please try again later.</p>';
    }
}

async function loadFeaturedEvents() {
    try {
        const events = await fetchEvents();
        const upcomingEvents = events
            .filter(event => new Date(event.date) >= new Date())
            .sort((a, b) => new Date(a.date) - new Date(b.date))
            .slice(0, 3);
        
        const container = document.querySelector('#featured-events');
        container.innerHTML = upcomingEvents.map(event => `
            <div class="event-card">
                <h3>${event.title}</h3>
                <p><strong>${new Date(event.date).toLocaleDateString('en-US', { 
                    weekday: 'short', month: 'short', day: 'numeric' 
                })}</strong></p>
                <p>${event.description.substring(0, 100)}...</p>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error loading featured events:', error);
        document.querySelector('#featured-events').innerHTML = 
            '<p>Unable to load event information. Please try again later.</p>';
    }
}

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
    
    highlights.textContent = seasonalProduce[month];
    localStorage.setItem('seasonalHighlights', seasonalProduce[month]);
}