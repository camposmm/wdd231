// Get the current year
const currentYear = new Date().getFullYear();
document.getElementById('currentyear').textContent = currentYear;

// Get the last modified date
document.getElementById('lastModified').textContent = document.lastModified;

// Mobile Menu Toggle
document.addEventListener("DOMContentLoaded", function() {
    const menuButton = document.getElementById("menu-button");
    const navMenu = document.getElementById("nav-menu");

    menuButton.addEventListener("click", function() {
        navMenu.style.display = (navMenu.style.display === "flex") ? "none" : "flex";
    });
});

// Course Data
const courses = [
    { code: "CSE 110", name: "Programming Building Blocks", credits: 2, completed: true }, // Completed
    { code: "WDD 130", name: "Web Fundamentals", credits: 2, completed: true }, // Completed
    { code: "CSE 111", name: "Programming with Functions", credits: 2, completed: true }, // Completed
    { code: "CSE 210", name: "Programming with Classes", credits: 2, completed: false },
    { code: "WDD 131", name: "Dynamic Web Fundamentals", credits: 2, completed: false },
    { code: "WDD 231", name: "Frontend Web Development", credits: 2, completed: false },
];

const courseList = document.getElementById("course-list");

// Function to display courses
function displayCourses(filter = "all") {
    courseList.innerHTML = "";
    const filteredCourses = filter === "all" ? courses : courses.filter(course => course.code.startsWith(filter.toUpperCase()));
    filteredCourses.forEach(course => {
        const card = document.createElement("li");
        card.classList.add("course-card");
        if (course.completed) card.classList.add("completed"); // Add 'completed' class if the course is completed
        card.innerHTML = `
            <h3>${course.code}</h3>
            <p>${course.name}</p>
            <p>Credits: ${course.credits}</p>
        `;
        courseList.appendChild(card);
    });
    updateTotalCredits(filteredCourses);
}

// Function to update total credits
function updateTotalCredits(courses) {
    const totalCredits = courses.reduce((sum, course) => sum + course.credits, 0);
    document.getElementById('total-credits').textContent = totalCredits;
}

// Event listener for filter buttons
document.getElementById("course-filters").addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
        displayCourses(e.target.textContent);
    }
});

// Initial display of all courses
displayCourses();