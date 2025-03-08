// Mobile Menu Toggle
document.addEventListener("DOMContentLoaded", function() {
    const menuIcon = document.querySelector(".menu-icon");
    const navList = document.querySelector("nav ul");

    menuIcon.addEventListener("click", function() {
        navList.style.display = (navList.style.display === "flex") ? "none" : "flex";
    });
});
