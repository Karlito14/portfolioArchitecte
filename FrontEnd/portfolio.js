const reponse = await fetch("http://localhost:5678/api/works");
const portfolio = await reponse.json();
const gallery = document.querySelector('.gallery');

// Affichage du portfolio
function genererPortfolio(portfolio){
    for(let i = 0; i < portfolio.length; i++){
        const work = portfolio[i];
        const figure = document.createElement('figure');
    
        // Récupération de l'image du portfolio
        const imageElement = document.createElement('img');
        imageElement.src = work.imageUrl;
        // Récupérer une image sur un autre serveur en anonyme (cors)
        imageElement.crossOrigin = "anonymous";
        imageElement.alt = work.title;
    
        // Récupération du titre de l'image
        const titleElement = document.createElement('figcaption');
        titleElement.innerText = work.title;
    
        // Rattachement au DOM
        gallery.appendChild(figure);
        figure.appendChild(imageElement);
        figure.appendChild(titleElement);
    }
}
genererPortfolio(portfolio);


// Filtres du portfolio selon la catégorie
const buttonObjets = document.querySelector('.objets');
const buttonAppartements = document.querySelector('.appartements');
const buttonHotels = document.querySelector('.hotels');
const buttonTous = document.querySelector('.tous');

buttonTous.addEventListener('click', function(event){
    // annulation du comportement par défaut du lien
    event.preventDefault();
    // effacement et regénération de la page filtrée
    gallery.innerHTML = "";
    genererPortfolio(portfolio);
})

function filtrerCategorie(button, category){
    button.addEventListener('click', function(event){
        // annulation du comportement par défaut du lien
        event.preventDefault();
        // trie du portfolio
        const portfolioFiltres = portfolio.filter(oeuvre => oeuvre.category.name === category);
        // effacement et regénération de la page filtrée
        gallery.innerHTML = "";
        genererPortfolio(portfolioFiltres);
    })
}

filtrerCategorie(buttonObjets, "Objets");
filtrerCategorie(buttonAppartements, "Appartements");
filtrerCategorie(buttonHotels, "Hotels & restaurants");





