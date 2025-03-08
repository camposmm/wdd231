const courses = [
    { code: "CSE 110", name: "Programming Building Blocks", credits: 2, completed: true },
    { code: "WDD 130", name: "Web Fundamentals", credits: 2, completed: true },
    { code: "CSE 111", name: "Programming with Functions", credits: 2, completed: false },
    { code: "CSE 210", name: "Programming with Classes", credits: 2, completed: false },
    { code: "WDD 131", name: "Dynamic Web Fundamentals", credits: 2, completed: false },
    { code: "WDD 231", name: "Frontend Web Development", credits: 2, completed: false },
];

const courseList = document.getElementById("course-list");
const filterButtons = document.getElementById("course-filters");

function displayCourses(filter = "all") {
    courseList.innerHTML = "";
    const filteredCourses = filter === "all" ? courses : courses.filter(course => course.code.startsWith(filter.toUpperCase()));
    filteredCourses.forEach(course => {
        const card = document.createElement("div");
        card.classList.add("course-card");
        if (course.completed) card.classList.add("completed");
        card.innerHTML = `
            <h3>${course.code}</h3>
            <p>${course.name}</p>
            <p>Credits: ${course.credits}</p>
        `;
        courseList.appendChild(card);
    });
}

filterButtons.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
        displayCourses(e.target.id);
    }
});

// Initial display of all courses
displayCourses();