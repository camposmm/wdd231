// events.js - Complete with all functions and proper exports

// DOM Elements
const calendarGrid = document.getElementById('calendar');
const currentMonthEl = document.getElementById('currentMonth');
const prevMonthBtn = document.getElementById('prevMonth');
const nextMonthBtn = document.getElementById('nextMonth');
const eventList = document.getElementById('eventList');
const workshopsContainer = document.getElementById('workshops');

// Current date
let currentDate = new Date();

// Fetch events from JSON
async function fetchEvents() {
    try {
        const response = await fetch('../data/events.json');
        if (!response.ok) throw new Error('Failed to load events');
        const data = await response.json();
        return data.events;
    } catch (error) {
        console.error('Error:', error);
        workshopsContainer.innerHTML = 
            '<div class="error">Failed to load workshops. Please refresh.</div>';
        return [];
    }
}

// Initialize calendar
async function initCalendar() {
    const events = await fetchEvents();
    renderCalendar(currentDate, events);
    displayUpcomingEvents(events);
    displayWorkshops(events);
}

// Render calendar grid
function renderCalendar(date, events) {
    calendarGrid.innerHTML = '';
    currentMonthEl.textContent = date.toLocaleDateString('en-US', { 
        month: 'long', year: 'numeric' 
    });
    
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    const daysInMonth = lastDay.getDate();
    
    // Day headers
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    dayNames.forEach(day => {
        const dayHeader = document.createElement('div');
        dayHeader.className = 'calendar-header';
        dayHeader.textContent = day;
        calendarGrid.appendChild(dayHeader);
    });
    
    // Empty cells before first day
    for (let i = 0; i < firstDay.getDay(); i++) {
        calendarGrid.appendChild(createEmptyDay());
    }
    
    // Days of month
    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = createDayElement(day, date, events);
        calendarGrid.appendChild(dayElement);
    }
}

function createDayElement(day, currentMonth, events) {
    const dayElement = document.createElement('div');
    dayElement.className = 'calendar-day';
    dayElement.textContent = day;
    
    // Check if today
    const today = new Date();
    if (currentMonth.getFullYear() === today.getFullYear() && 
        currentMonth.getMonth() === today.getMonth() && 
        day === today.getDate()) {
        dayElement.classList.add('today');
    }
    
    // Check for events
    const dateStr = formatDateString(currentMonth.getFullYear(), currentMonth.getMonth() + 1, day);
    const dayEvents = events.filter(event => event.date === dateStr);
    
    if (dayEvents.length > 0) {
        dayElement.classList.add('has-event');
        const eventIndicator = document.createElement('div');
        eventIndicator.className = 'calendar-event';
        eventIndicator.textContent = `${dayEvents.length} event(s)`;
        dayElement.appendChild(eventIndicator);
        
        dayElement.addEventListener('click', () => {
            showDayEvents(dateStr, dayEvents);
        });
    }
    
    return dayElement;
}

function createEmptyDay() {
    const emptyDay = document.createElement('div');
    emptyDay.className = 'calendar-day empty';
    return emptyDay;
}

function displayUpcomingEvents(events) {
    const upcoming = events
        .filter(event => new Date(event.date) >= new Date())
        .sort((a, b) => new Date(a.date) - new Date(b.date));
    
    if (upcoming.length === 0) {
        eventList.innerHTML = '<p>No upcoming events scheduled.</p>';
        return;
    }
    
    eventList.innerHTML = upcoming.map(event => `
        <div class="event-card">
            <h3>${event.title}</h3>
            <p><strong>When:</strong> ${formatDisplayDate(event.date)} at ${event.time}</p>
            <p><strong>Where:</strong> ${event.location}</p>
            <p>${event.description}</p>
        </div>
    `).join('');
}

function displayWorkshops(events) {
    const workshops = events
        .filter(event => event.category === 'workshop')
        .sort((a, b) => new Date(a.date) - new Date(b.date));
    
    if (workshops.length === 0) {
        workshopsContainer.innerHTML = '<p>No workshops currently scheduled.</p>';
        return;
    }
    
    workshopsContainer.innerHTML = workshops.map(workshop => `
        <div class="workshop-card">
            <h3>${workshop.title}</h3>
            <p><strong>Date:</strong> ${formatDisplayDate(workshop.date)}</p>
            <p><strong>Time:</strong> ${workshop.time}</p>
            <p>${workshop.description}</p>
        </div>
    `).join('');
}

// Helper functions
function formatDateString(year, month, day) {
    return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
}

function formatDisplayDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
        weekday: 'long', month: 'long', day: 'numeric' 
    });
}

function showDayEvents(dateStr, events) {
    alert(`Events on ${formatDisplayDate(dateStr)}:\n\n${
        events.map(e => `• ${e.title} (${e.time})`).join('\n')
    }`);
}

// Event listeners
prevMonthBtn.addEventListener('click', () => {
    currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
    initCalendar();
});

nextMonthBtn.addEventListener('click', () => {
    currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
    initCalendar();
});

// Initialize
document.addEventListener('DOMContentLoaded', initCalendar);

// Export the functions needed by other modules
export { fetchEvents, initCalendar };