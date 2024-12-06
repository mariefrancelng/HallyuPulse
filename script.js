function getData() {
   fetch('data.json')
     .then((response) => {
       if (!response.ok) {
         throw new Error('Network response was not ok');
       }
       return response.json();
     })
     .then((data) => {
       // Traitez les données comme vous le souhaitez
       console.log('Données récupérées du fichier JSON :', data);
       /// ON ECRIT LE CODE ICI ! 
      let journal = data.journal;
      let navThemes = data.journal.navigation;
      let headline = data.journal.articlePrincipal;
      let articles = data.journal.articles;
      let themes = data.journal.themes;
      let auteurs = data.journal.auteurs;
      
      afficherNavigation (navThemes);
      afficherHeader(journal);
      afficherHeadline(headline);
      afficherArticles(articles);
      afficherThemes(themes);
      afficherAuteurs(auteurs);
       /// FIN DU CODE
     })
     .catch((error) => console.error('Erreur lors de la lecture des données :', error));
 }
 
getData();

///ON écrit les fonctions ici

function afficherNavigation(navigation) {
  const navThemes = document.querySelector('.navThemes');
  navThemes.innerHTML = '';

  navigation.forEach((item) => {
    let li = document.createElement('li');
    li.innerHTML = `<a href="${item.lien}">${item.nom}</a>`;
    navThemes.appendChild(li);
  });
}

function afficherHeader(journal) {
  document.querySelector('.journalName').textContent = journal.nomJournal;
  document.querySelector('.catchPhrase').textContent = journal.phraseAccroche;

  let themesList = document.querySelector('.themesList');
  themesList.innerHTML = '';
  journal.themes.forEach(theme => {
    let li = document.createElement('li');
    li.textContent = theme.nom;
    themesList.appendChild(li);
  });
  
}

function afficherThemes(themes) {
  let themesList = document.querySelector('.themesList');
  themesList.innerHTML = '';

  themes.forEach((theme) => {
    let li = document.createElement('li');
    li.innerHTML = `<h4>${theme.nom}</h4>
      <p>${theme.description}</p>
    `;
    themesList.appendChild(li);
  })
}

function afficherHeadline(headline) {
  let headlineContainer = document.querySelector('.latestArticle');

  
  headlineContainer.innerHTML = `<div class="imageContainer">
      <img src="${headline.image}" alt="Image for ${headline.titre}"></div>
      <div class="content">
      <h3>${headline.titre}</h3>
      <div class="date"><p>
        <strong>${headline.theme}</strong></p>
        <p>${headline.date}</p>
      </div>
      <p>${headline.description}</p>
      <a href="${headline.link}" target="_blank" class="button secondary">Read the article</a>
      </div>
    `;
}

function afficherArticles(articles) {
  let otherArticles = document.querySelector('.articlesContainer');
  otherArticles.innerHTML = '';

  articles.forEach((article) => {
    const articleDiv = document.createElement('div');
    articleDiv.classList.add('article');
    articleDiv.innerHTML = `
      <img src="${article.image}" alt="Image for ${article.titre}">
      <div class=“articleContent“>
      <h3>${article.titre}</h3>
      <div class="date"><p>
        <p><strong>${article.theme}</strong></p>
        <p>${article.date}</p>
      </div>
      <a href="${article.link}" target="_blank" class="button secondary">Read the article</a>
      </div>
    `;
    otherArticles.appendChild(articleDiv);
  });
}

function afficherAuteurs(auteurs) {
  let authorsContainer = document.querySelector('.authorsContainer');
  authorsContainer.innerHTML ='';

  auteurs.forEach((auteur) => {
    let authorDiv = document.createElement('div');
    authorDiv.classList.add('article');
    authorDiv.innerHTML = `
      <div class="auteur">
        <a href="${auteur.linkedin}" target="_blank">
        <img src="${auteur.image}" alt="Image de ${auteur.prenom}" class="authorImage">
      </a>
      <a href="${auteur.github}" target="_blank" class="authorName">${auteur.prenom}</a>
      <p>${auteur.presentation}</p>
      </div>
    `;
    authorsContainer.appendChild(authorDiv);
  })
}

getData();