document.addEventListener('DOMContentLoaded', function() {
    // Set current timestamp
    const timestampField = document.getElementById('timestamp');
    if (timestampField) {
      const now = new Date();
      timestampField.value = now.toISOString();
    }
  
    // Modal functionality
    const modalButtons = document.querySelectorAll('.info-btn');
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.close');
  
    modalButtons.forEach(button => {
      button.addEventListener('click', () => {
        const modalId = button.getAttribute('data-modal');
        const modal = document.getElementById(modalId);
        if (modal) {
          modal.style.display = 'block';
        }
      });
    });
  
    closeButtons.forEach(button => {
      button.addEventListener('click', () => {
        const modal = button.closest('.modal');
        if (modal) {
          modal.style.display = 'none';
        }
      });
    });
  
    window.addEventListener('click', (event) => {
      if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
      }
    });
  
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