document.addEventListener('DOMContentLoaded', function() {
    // Get URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    
    // Display submitted information
    if (urlParams.has('firstName') && urlParams.has('lastName')) {
      document.getElementById('display-name').textContent = 
        `${urlParams.get('firstName')} ${urlParams.get('lastName')}`;
    }
    
    if (urlParams.has('email')) {
      document.getElementById('display-email').textContent = urlParams.get('email');
    }
    
    if (urlParams.has('phone')) {
      document.getElementById('display-phone').textContent = urlParams.get('phone');
    }
    
    if (urlParams.has('business')) {
      document.getElementById('display-business').textContent = urlParams.get('business');
    }
    
    if (urlParams.has('membership')) {
      const membership = urlParams.get('membership');
      let membershipText = '';
      
      switch(membership) {
        case 'np':
          membershipText = 'NP Membership (Non-Profit)';
          break;
        case 'bronze':
          membershipText = 'Bronze Membership';
          break;
        case 'silver':
          membershipText = 'Silver Membership';
          break;
        case 'gold':
          membershipText = 'Gold Membership';
          break;
        default:
          membershipText = membership;
      }
      
      document.getElementById('display-membership').textContent = membershipText;
    }
    
    if (urlParams.has('timestamp')) {
      const timestamp = new Date(urlParams.get('timestamp'));
      document.getElementById('display-date').textContent = timestamp.toLocaleString();
    }
  
    // Mobile menu toggle
    const menuToggle = document.getElementById('menuToggle');
    const primaryNav = document.getElementById('primaryNav');
  
    if (menuToggle && primaryNav) {
      menuToggle.addEventListener('click', function() {
        primaryNav.classList.toggle('open');
        menuToggle.textContent = primaryNav.classList.contains('open') ? 'Close' : 'Menu';
      });
    }
  
    // Set current year in footer
    const currentYearElement = document.getElementById('copyright-year');
    if (currentYearElement) {
      currentYearElement.textContent = new Date().getFullYear();
    }
  
    // Set last modified date in footer
    const lastModifiedElement = document.getElementById('last-modified');
    if (lastModifiedElement) {
      lastModifiedElement.textContent = document.lastModified;
    }
  });