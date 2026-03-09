let allIssues = [];
let openIssues = [];
let closedIssues = [];
const issueCountEl = document.querySelector('#issue-count');


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
    container.innerHTML = `<span class="loading loading-spinner loading-xl "></span>`
  }
}


function renderCard(data) {
  cardContainer.innerHTML = '';
  if (!data) {
    manageLoading(cardContainer, true);
  } else {
    data.forEach(issue => {
      cardContainer.innerHTML += `
      <div onclick="modalData(${issue.id})" class="card ${issue.status === "open" ? 'green-border' : 'red-border'}">
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
  issueCountEl.innerText = data.length;
}



allTab.addEventListener('click', () => {
  allTab.classList.add('active-tab');
  openTab.classList.remove('active-tab');
  closedTab.classList.remove('active-tab');
  renderCard(allIssues);
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

function showDate(inp) {
  const date = new Date(inp);
  return date.toLocaleDateString('en-US');
}

function modalData(id) {
  fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`)
    .then(res => res.json())
    .then(data => showModal(data.data));
}
function showModal(data) {
  const modalBox = document.querySelector('.modal-box');
  // modalBox.innerHTML = '';
  if (!data) {
    manageLoading(modalBox, true);
  } else {
    modalBox.innerHTML = `
    <h3 id="modal-heading">${data.title}</h3>
        <div class="modal-meta-data">
          <p class="issue-status ${data.status === 'closed' ? 'issue-status-closed' : 'issue-status-open'}">${data.status}</p>
          <p>&bull;</p>
          <p><span>${data.status}</span> by <span>${data.author}</span></p>
          <p>&bull;</p>
          <p>${showDate(data.createdAt)}</p>
        </div>
        <div class="issue-badge">
          ${data.labels.map(label => `<p class="${label === 'enhancement' ? 'green-label' : label === 'bug' ? 'red-label' : label === 'help wanted' ? 'yellow-label' : 'gray-label'} ">${label}</p>`).join('')}
        </div>
        <p class="issue-description">${data.description}</p>
        <div class="modal-footer">
          <div class="assignee-name">
            <p>Assignee:</p>
            <p class="assignee">${data.assignee ? data.assignee : 'none'}</p>
          </div>
          <div class="modal-priority">
            <p>Priority:</p>
            <p class="priority-badge ${data.priority === 'high' ? 'modal-priority-high' : data.priority === 'medium' ? 'modal-priority-medium' : 'modal-priority-low'} ">${data.priority}</p>
          </div>
        </div>
        <div class="modal-action">
          <form method="dialog">
            <!-- if there is a button in form, it will close the modal -->
            <button class="modal-btn">Close</button>
          </form>
        </div>
    `
  }
  my_modal_1.showModal();

}