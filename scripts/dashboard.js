let allIssues;
let openIssues;
let closedIssues;
setTimeout(() => {
  fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues')
    .then(res => res.json())
    .then(data => {
      allIssues = data.data;
      openIssues = allIssues.filter(issue => issue.status === 'open');
      closedIssues = allIssues.filter(issue => issue.status === 'closed');
      renderCard(allIssues);
    })
}, 2000)
const tabContainer = document.querySelector('.tab-container');
const allTab = tabContainer.children[0];
const openTab = tabContainer.children[1];
const closedTab = tabContainer.children[2];
const cardContainer = document.querySelector('.card-container');

function manageLoading(container, status) {
  if (status) {
    container.innerHTML = `<span class="loading loading-spinner loading-xl mx-auto"></span>`
  }
}


function renderCard(data) {
  cardContainer.innerHTML = '';
  if (!data) {
    manageLoading(cardContainer, true);
  } else {
    data.forEach(issue => {
      cardContainer.innerHTML += `
      <div class="card ${issue.status === "open" ? 'green-border' : 'red-border'}">
        <div class="card-head">
          <div class="status-icon">
            <img src="./assets/${issue.status === "open" ? 'Open-Status' : 'Closed-Status'}.png" alt="">
          </div>
          <p class="priority ${issue.priority === 'high' ? 'priority-high' : issue.priority === 'medium' ? 'priority-medium' : 'priority-low'}">${issue.priority}</p>
        </div>
        <h3 class="card-title">${issue.title}</h3>
        <p class="card-description">${issue.description}</p>
        <div class="card-labels-container">
          ${issue.labels.map(label => `<p class ="card-label ${label === 'enhancement' ? 'green-label' : label === 'bug' ? 'red-label' : label === 'help wanted' ? 'yellow-label' : 'gray-label'}">${label}</p>`).join('')}
        </div >
      <div class="card-footer">
        <p class="card-author">#<span>${issue.id} </span> by ${issue.author}</p>
        <p class="card-created-date">${showDate(issue.createdAt)
        }</p>
      </div>
    </div>
  `
    });
  }
}
function showDate(inp) {
  const date = new Date(inp);
  return date.toLocaleDateString('en-US');
}


allTab.addEventListener('click', () => {
  allTab.classList.add('active-tab');
  openTab.classList.remove('active-tab');
  closedTab.classList.remove('active-tab');
  renderCard(allIssues)
})

openTab.addEventListener('click', () => {
  openTab.classList.add('active-tab');
  allTab.classList.remove('active-tab');
  closedTab.classList.remove('active-tab');
  renderCard(openIssues);
})

closedTab.addEventListener('click', () => {
  closedTab.classList.add('active-tab');
  allTab.classList.remove('active-tab');
  openTab.classList.remove('active-tab');
  renderCard(closedIssues);
})

renderCard(allIssues)


// all function 



