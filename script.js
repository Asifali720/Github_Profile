const GITHUB_URL = "https://api.github.com/users/"

const searchText = document.getElementById('search-text')
const searchBtn = document.getElementById('search-btn')
const form = document.querySelector('form')
const main = document.getElementById('main')

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const searchTerm = searchText.value
    if (searchTerm) {
        getUserProfile(GITHUB_URL+searchTerm)
    }
    
})


async function getUserProfile(url){
   const resp = await fetch(url)
   const respData = await resp.json()
  getUsers(respData);
  getRepos(respData.repos_url);
}

function getUsers(data){
    main.innerHTML = ''
   
    const {avatar_url, bio, name, public_repos, followers, following} = data

    const card = document.createElement('div')
    card.classList.add('profile-card')

     card.innerHTML = `
    <div class="circle-vector">
       <img src="${avatar_url}"/> 
    </div>
    
    <div class="content">
    <h2>${name}</h2>
    <span>${bio}</span>
    <ul>
        <li><i class="fa fa-eye" aria-hidden="true"></i> ${following}</li>
        <li><i class="fa fa-heart" aria-hidden="true" style="color: deeppink;"></i> ${followers}</li>
        <li><i class="fa fa-folder" aria-hidden="true"></i> ${public_repos}</li>
    </ul>
    <p style='font-size: 24px; font-weight: 600; text-align: left;'>Repos:</p>
    <div class='repos-container'></div>
    </div>
    `
    main.appendChild(card)

} 

async function getRepos(url){
      const resp = await fetch(url);
      const respData = await resp.json();
      respData.forEach(node => {
        return allRepos(node);
      });
}

function allRepos(data){
   const repoCard = document.createElement('a')
   repoCard.classList.add('repo')
   repoCard.href = data.html_url
   repoCard.target= '_blank'
   repoCard.innerHTML = data.name
   const repoContainer = main.querySelector('.repos-container')
   repoContainer.appendChild(repoCard)
}


