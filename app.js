axios.get(`/repos/${username}?page=${page}&perPage=${perPage}`)
$(document).ready(function () {
const username = 'Nethra';
const perPage = 10;

function fetchRepos(page) {
         showLoader();
     
         axios.get(`/repos/${username}?page=${page}&perPage=${perPage}`)
           .then(response => {
             hideLoader();
             displayRepos(response.data);
         })
         .catch(error => {
             hideLoader();
     
             console.error('Error fetching repositories:', error);
         });
}
       
function displayRepos(repos) {
    const repoList = $('#repo-list');
    repoList.empty();

    repos.forEach(repo => {
    const repoItem = document.createElement('div');
    repoItem.classList.add('repo-item');

    const titleElement = document.createElement('div');
    titleElement.classList.add('repo-title');
    titleElement.textContent = repo.repo_name;

    const topicsElement = document.createElement('div');
    topicsElement.classList.add('repo-topics');
    topicsElement.textContent = 'Topics: ' + repo.topics.join(', ');

    const linkElement = document.createElement('a');
    linkElement.href = repo.url;
    linkElement.classList.add('btn', 'btn-primary');
    linkElement.textContent = 'View on GitHub';

    repoItem.appendChild(titleElement);
    repoItem.appendChild(topicsElement);
    repoItem.appendChild(linkElement);

    repoList.append(repoItem);
  });
}
       
function fetchAndDisplayRepos(page) {
         showLoader();
         fetchRepos(page);
}

function showLoader() {
         const loader = `
           <div class="spinner-border text-primary" role="status">
             <span class="sr-only">Loading...</span>
           </div>
         `;
         $('body').append(loader);
}
     
function hideLoader() {
         $('.spinner-border').remove();
}

// Initial fetch and display
fetchAndDisplayRepos(1);
       
// Pagination logic
$('#pagination').on('click', 'a', function () {
         const page = $(this).data('page');
           fetchAndDisplayRepos(page);
         });
});
       