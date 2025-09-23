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


// ---- LOAD ABSTRACT ----
fetch('public/data/abstract.json')
  .then(response => response.json())
  .then(data => {
    document.getElementById('abstract-title').textContent = data.title;
    document.getElementById('abstract-text').textContent = data.abstract;
  })
  .catch(err => console.error('Error loading abstract.json', err));

// ---- LOAD RESULTS & PLOTS ----
fetch('public/data/results.json')
  .then(response => response.json())
  .then(data => {
    // Tables
    const resultsSection = document.getElementById('results-section');
    data.tables.forEach(tableData => {
      const tableWrapper = document.createElement('div');
      tableWrapper.className = 'table-wrapper';
      let html = `<h2>${tableData.caption}</h2>`;
      html += `<table><thead><tr>`;
      tableData.headers.forEach(header => {
        html += `<th>${header}</th>`;
      });
      html += `</tr></thead><tbody>`;
      tableData.rows.forEach(row => {
        html += `<tr>${row.map(cell => `<td>${cell}</td>`).join('')}</tr>`;
      });
      html += `</tbody></table>`;
      tableWrapper.innerHTML = html;
      resultsSection.appendChild(tableWrapper);
    });

    // Plots
    const plotsSection = document.getElementById('plots-section');
    data.plots.forEach(plot => {
      const plotDiv = document.createElement('div');
      plotDiv.className = 'plot-item';
      plotDiv.innerHTML = `
        <figure>
          <img src="${plot.image}" alt="${plot.caption}">
          <figcaption>${plot.caption}</figcaption>
        </figure>
      `;
      plotsSection.appendChild(plotDiv);
    });
  })
  .catch(err => console.error('Error loading results.json', err));