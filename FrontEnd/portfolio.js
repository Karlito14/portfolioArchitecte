const reponse = await fetch("http://localhost:5678/api/works");
const portfolio = await reponse.json();

const reponse2 = await fetch('http://localhost:5678/api/categories');
const categories = await reponse2.json();

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

// Affichage de la liste <li> pour les filtres
const listeFiltres = document.querySelector(".liste-filtres");
for(let i = 0; i < categories.length; i++){
    // Création des éléments pour notre liste
    const liste = document.createElement('li');
    const lienListe = document.createElement('a');
    // Attribution à ces liste d'un href, un id, et du texte
    lienListe.href = ("#");
    lienListe.setAttribute('id', categories[i].id);
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
            genererPortfolio(portfolio);
        } else {
            // sinon on filtre le portfolio avec la catégorie qui possède le ID similaire au ID du button sélectionné
            const portfolioFiltres = portfolio.filter(oeuvre => oeuvre.category.id === Number(elementButton[i].id));
            // Effacement de la page
            gallery.innerHTML ="";
            // Regénération de la page filtrée
            genererPortfolio(portfolioFiltres);
        }   
    })
}

// récupération de la valeur du token
const token = window.localStorage.getItem('token');

if(token){
    const body = document.querySelector('body');
    const edition = document.createElement('div');
    edition.classList.add('div-edition');
    body.prepend(edition);

    const iconEdition = document.createElement('i');
    iconEdition.classList.add("fa-regular", "fa-pen-to-square");
    edition.appendChild(iconEdition);

    const paragrapheEdition = document.createElement('p');
    paragrapheEdition.classList.add('paragraphe-edition');
    paragrapheEdition.textContent = "Mode edition";
    edition.appendChild(paragrapheEdition);

    const lienEdition = document.createElement('a');
    lienEdition.href = '#';
    lienEdition.classList.add('lien-edition');
    lienEdition.textContent = "publier les changements";
    edition.appendChild(lienEdition);

    const intro = document.querySelector("#introduction");
    intro.style.alignItems = 'start';

    const figureIntro = document.querySelector('.figure-intro');
    const copieIcon = iconEdition.cloneNode();
    copieIcon.classList.add('icon-image')
    figureIntro.appendChild(copieIcon);

    const lienModifier = document.createElement('a');
    lienModifier.href = '#';
    lienModifier.textContent = "modifier";
    figureIntro.appendChild(lienModifier);

    const articleIntro = document.querySelector('.article-intro');
    const copieIcon2 = copieIcon.cloneNode();
    copieIcon2.classList.add('icon-article')
    const copieLienModifier = lienModifier.cloneNode(true);
    articleIntro.prepend(copieLienModifier);
    articleIntro.prepend(copieIcon2);

    const h2Portofolio = document.querySelector('#portfolio h2');
    const copieIcon3 = copieIcon.cloneNode();
    copieIcon3.classList.add('icon-portfolio');
    const copieLienModifier2 = lienModifier.cloneNode(true);
    h2Portofolio.after(copieLienModifier2);
    h2Portofolio.after(copieIcon3);
}



