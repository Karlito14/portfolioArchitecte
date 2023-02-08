const reponse = await fetch("http://localhost:5678/api/works");
const portfolio = await reponse.json();

const reponse2 = await fetch('http://localhost:5678/api/categories');
const categories = await reponse2.json();

const gallery = document.querySelector('.gallery');

// Affichage du portfolio
export function genererPortfolio(portfolio){
    gallery.innerHTML = "";
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

// Affichage de la liste <li> pour les filtres
const listeFiltres = document.querySelector(".liste-filtres");
for(let i = 0; i < categories.length; i++){
    // Création des éléments pour notre liste
    const liste = document.createElement('li');
    const lienListe = document.createElement('a');
    // Attribution à ces liste d'un href, un id, et du texte
    lienListe.href = ("#");
    // remplacement des espaces du titre pour l'ajouter en "class" au lien
    const titreSansEspaces = categories[i].name.replaceAll(' ','-');
    lienListe.setAttribute('id', titreSansEspaces);
    lienListe.innerText = categories[i].name;
    //Rattachement au DOM
    listeFiltres.appendChild(liste);
    liste.appendChild(lienListe);
}

// Filtres du portfolio selon la catégorie
const elementButton = document.querySelectorAll('.liste-filtres a');

for(let i = 0; i < elementButton.length; i++){
    elementButton[i].addEventListener('click', function(event){
        // suppresion du comportement par défaut des liens
        event.preventDefault();
        // Si on selectionne le bouton avec #tous alors on genère le portfolio complet
        if(elementButton[i].id === "tous"){
            gallery.innerHTML = "";
            genererPortfolio(portfolio);
        } else {
            // sinon on filtre le portfolio avec la catégorie qui possède le ID similaire au ID du button sélectionné 
            const portfolioFiltres = portfolio.filter(oeuvre =>
                oeuvre.category.name.replaceAll(' ', '-') === elementButton[i].id) 
            // Effacement de la page
            gallery.innerHTML ="";
            // Regénération de la page filtrée
            genererPortfolio(portfolioFiltres);
        }   
    })
}




