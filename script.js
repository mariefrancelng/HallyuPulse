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
    const li = document.createElement('li');
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

  
  headlineContainer.innerHTML = `<h3>${headline.titre}</h3>
    <p>${headline.description}</p>
    <p><strong>Date :</strong> ${headline.date}</p>
    <p><strong>Theme :</strong> ${headline.theme}</p>
    <img src="${headline.image}" alt="Image for ${headline.titre}">
    <a href="#" class="button secondary">Read the article</a>
  `;
}

function afficherArticles(articles) {
  let otherArticles = document.querySelector('.articlesContainer');
  otherArticles.innerHTML = '';

  articles.forEach((article) => {
    const articleDiv = document.createElement('div');
    articleDiv.classList.add('article');
    articleDiv.innerHTML = `
      <h3>${article.titre}</h3>
      <p><strong>Date :</strong> ${article.date}</p>
      <p><strong>Theme :</strong> ${article.theme}</p>
      <img src="${article.image}" alt="Image for ${article.titre}">
      <a href="#" class="button secondary">Read the article</a>
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
      <h4>${auteur.prenom}</h4>
      <p><strong>Experience :</strong> ${auteur.typeExperience}</p>
      <p>${auteur.presentation}</p>
    `;
    authorsContainer.appendChild(authorDiv);
  })
}

getData();