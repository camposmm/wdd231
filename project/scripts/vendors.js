// DOM Elements
const vendorContainer = document.getElementById('vendor-container');
const loadingElement = document.getElementById('loading');
const searchInput = document.getElementById('search');
const categorySelect = document.getElementById('category');

// Fetch vendors data

// In vendors.js

async function getVendors() {
    try {
        loadingElement.style.display = 'block';
        vendorContainer.innerHTML = '';
        
        const response = await fetch('data/vendors.json');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return data.vendors || [];
        
    } catch (error) {
        console.error('Error loading vendors:', error);
        vendorContainer.innerHTML = `
            <div class="error">
                <p>Failed to load vendors. Please try again later.</p>
                <button onclick="window.location.reload()">Retry</button>
            </div>
        `;
        return [];
    } finally {
        loadingElement.style.display = 'none';
    }
}

// Display vendors
function showVendors(vendors) {
    if (vendors.length === 0) {
        vendorContainer.innerHTML = '<p class="no-results">No vendors found matching your criteria.</p>';
        return;
    }

    vendorContainer.innerHTML = vendors.map(vendor => `
        <article class="vendor-card" data-category="${vendor.category}">
            <div class="vendor-image">
                <img src="images/vendors/${vendor.image || 'default.jpg'}" 
                     alt="${vendor.name}" 
                     loading="lazy"
                     onerror="this.src='images/vendors/default.jpg'">
            </div>
            <div class="vendor-details">
                <span class="category-tag">${formatCategory(vendor.category)}</span>
                <h2>${vendor.name}</h2>
                <p class="description">${vendor.description}</p>
                ${vendor.website ? `<a href="${vendor.website}" target="_blank" class="website">Visit Website</a>` : ''}
            </div>
        </article>
    `).join('');
}

// Format category for display
function formatCategory(category) {
    return category.split('-').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
}

// Filter vendors
function filterVendors(vendors, searchTerm, category) {
    return vendors.filter(vendor => {
        const matchesSearch = vendor.name.toLowerCase().includes(searchTerm) || 
                            vendor.description.toLowerCase().includes(searchTerm);
        const matchesCategory = category === 'all' || vendor.category === category;
        return matchesSearch && matchesCategory;
    });
}

// Initialize page
async function init() {
    const vendors = await getVendors();
    
    // Initial display
    showVendors(vendors);
    
    // Set up event listeners
    searchInput.addEventListener('input', () => {
        const filtered = filterVendors(
            vendors,
            searchInput.value.toLowerCase(),
            categorySelect.value
        );
        showVendors(filtered);
    });
    
    categorySelect.addEventListener('change', () => {
        const filtered = filterVendors(
            vendors,
            searchInput.value.toLowerCase(),
            categorySelect.value
        );
        showVendors(filtered);
    });
}

// Start the page
document.addEventListener('DOMContentLoaded', init);
