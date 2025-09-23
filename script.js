// Tab switching
document.querySelectorAll('.tab-link').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const tab = e.target.getAttribute('data-tab');

    // Activate clicked tab
    document.querySelectorAll('.tab-link').forEach(l => l.classList.remove('active'));
    e.target.classList.add('active');

    // Show corresponding content
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    document.getElementById(tab).classList.add('active');
  });
});

// Load authors.json and populate About tab
fetch('public/data/authors.json')
  .then(response => response.json())
  .then(authors => {
    const container = document.getElementById('authors-container');
    authors.forEach(author => {
      const card = document.createElement('div');
      card.className = 'author-card';
      card.innerHTML = `
        <img src="${author.image}" alt="${author.name}">
        <h3>${author.name}</h3>
        <p><strong>City:</strong> ${author.city}</p>
        <p><strong>Affiliation:</strong> ${author.affiliation}</p>
        <a href="${author.googleScholar}" target="_blank">Google Scholar</a>
        <a href="${author.orcid}" target="_blank">ORCID</a>
        <a href="${author.github}" target="_blank">GitHub</a>
        <p><a href="mailto:${author.email}">${author.email}</a></p>
      `;
      container.appendChild(card);
    });
  })
  .catch(err => console.error('Error loading authors.json', err));
