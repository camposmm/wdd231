// Fetch member data and display
async function fetchMembers() {
  const response = await fetch('data/members.json');
  const members = await response.json();
  displayMembers(members);
}

// Display members in grid or list view
function displayMembers(members) {
  const container = document.getElementById('member-container');
  container.innerHTML = ''; // Clear previous content

  members.forEach(member => {
    const card = document.createElement('div');
    card.className = container.classList.contains('grid-view') ? 'card' : 'list-item';

    card.innerHTML = `
      <img src="images/${member.image}" alt="${member.name}">
      <h3>${member.name}</h3>
      <p>${member.address}</p>
      <p>${member.phone}</p>
      <a href="${member.website}" target="_blank">Website</a>
      <p>Membership Level: ${member.membershipLevel}</p>
    `;

    container.appendChild(card);
  });
}

// Toggle between grid and list views
document.getElementById('grid-view-btn').addEventListener('click', () => {
  const container = document.getElementById('member-container');
  container.classList.remove('list-view');
  container.classList.add('grid-view');
  fetchMembers();
});

document.getElementById('list-view-btn').addEventListener('click', () => {
  const container = document.getElementById('member-container');
  container.classList.remove('grid-view');
  container.classList.add('list-view');
  fetchMembers();
});

// Footer dynamic content
document.getElementById('copyright-year').textContent = new Date().getFullYear();
document.getElementById('last-modified').textContent = document.lastModified;

// Initial load
fetchMembers();