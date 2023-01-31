const reponse = await fetch("http://localhost:5678/api/works");
const portfolio = await reponse.json();

const modal = document.querySelector('#modal');
const lienOuvrirModal = document.querySelector('.js-modal');
const croixFermetureModal = document.querySelector('.fermeture-modal');
const modalWrapper = document.querySelector('.modal-wrapper');


const ouvertureModal = (event) => {
    event.preventDefault();
    modal.style.display = 'flex';
    modal.removeAttribute('aria-hidden');
    modal.setAttribute('aria-modal', 'true');
    modal.addEventListener("click", fermetureModal);   
}

const fermetureModal = (event) =>{
    event.preventDefault();
    modal.style.display = 'none';
    modal.removeAttribute('aria-modal');
    modal.setAttribute('aria-hidden', 'true');
    modal.removeEventListener('click', fermetureModal);
    croixFermetureModal.removeEventListener('click', fermetureModal);
}

croixFermetureModal.addEventListener("click", fermetureModal);
modalWrapper.addEventListener('click', (event) => event.stopPropagation());
lienOuvrirModal.addEventListener('click', ouvertureModal);


// Afficher les travaux dans la modal
const afficherGalerieModale = () => {
    for(let i = 0; i < portfolio.length; i++){
        const work = portfolio[i];
        
        const divImg = document.createElement('div');

        // Création de l'image avec la source
        const imgGalerie = document.createElement('img');
        imgGalerie.classList.add("img-galerie");
        imgGalerie.crossOrigin = "anonymous";
        imgGalerie.src = work.imageUrl;
        imgGalerie.alt = work.title;
        
        // Création du lien avec l'icone corbeille
        const lienCorbeille = document.createElement('a');
        const titreSansEspaces = work.title.replaceAll(' ','-');
        lienCorbeille.classList.add(titreSansEspaces);
        lienCorbeille.href ='#';
        lienCorbeille.classList.add('lien-corbeille');
        const iconCorbeille = document.createElement('i');
        iconCorbeille.classList.add('fa-solid', 'fa-trash');
        lienCorbeille.appendChild(iconCorbeille);

        // Création du lien avec l'icone agrandir
        const lienAgrandir = document.createElement('a');
        lienAgrandir.classList.add('lien-agrandir');
        lienAgrandir.crossOrigin = "anonymous";
        lienAgrandir.href = work.imageUrl;
        const iconAgrandir = document.createElement('i');
        iconAgrandir.classList.add('fa-solid', 'fa-maximize');
        lienAgrandir.appendChild(iconAgrandir);

        // Création du lien éditer sous l'image
        const lienEditer = document.createElement('a');
        lienEditer.href = '#';
        lienEditer.textContent = "éditer";

        // Rattachement au DOM
        divImg.appendChild(imgGalerie);
        divImg.appendChild(lienCorbeille);
        divImg.appendChild(lienAgrandir);
        divImg.appendChild(lienEditer);
        
        const galeriePhoto = document.querySelector('.galerie-photo');
        galeriePhoto.appendChild(divImg);
    }
}

afficherGalerieModale();

