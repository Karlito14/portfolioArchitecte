const reponse = await fetch("http://localhost:5678/api/works");
const portfolio = await reponse.json();

const modalGaleriePhoto = document.querySelector('#modal-galerie-photo');
const lienOuvrirModal = document.querySelector('.js-modal');
const croixFermetureModal = document.querySelectorAll('.fermeture-modal');
const modalWrapper = document.querySelector('.modal-wrapper');
console.log(croixFermetureModal)
const focusableSelector = "button, a, input, textarea, select";
let focusables = [];

const ouvertureModal = (modal) => {
    focusables = Array.from(modal.querySelectorAll(focusableSelector));
    modal.style.display = 'flex';
    modal.removeAttribute('aria-hidden');
    modal.setAttribute('aria-modal', 'true');
}

const fermetureModal = (modal) => {
    modal.style.display = 'none';
    modal.removeAttribute('aria-modal');
    modal.setAttribute('aria-hidden', 'true');
}

const focusInModal = (event, modal) => {
    event.preventDefault();
    let index = focusables.findIndex(f => f === modal.querySelector(':focus'));
    if (event.shiftKey === true) {
        index--;
    } else {
        index++;
    }
    if (index >= focusables.length) {
        index = 0;
    }
    if (index < 0) {
        index = focusables.length - 1;
    }
    focusables[index].focus();
}

lienOuvrirModal.addEventListener('click', (event) => {
    event.preventDefault();
    ouvertureModal(modalGaleriePhoto);
});
for(let i = 0; i < croixFermetureModal.length; i++){
    croixFermetureModal[i].addEventListener("click", (event) => {
        event.preventDefault();
        if(modalGaleriePhoto.style.display === 'flex'){
            fermetureModal(modalGaleriePhoto);
        }
        if(modalAjoutPhoto.style.display === 'flex'){
            fermetureModal(modalAjoutPhoto);
        }
    });
}
modalGaleriePhoto.addEventListener("click", (event) => {
    event.preventDefault();
    fermetureModal(modalGaleriePhoto);
});
modalWrapper.addEventListener('click', (event) => event.stopPropagation());

// fermeture de la modale avec la touche echap
window.addEventListener('keydown', (event) => {
    if ((event.key === "Escape" || event.key === 'Esc') && modalGaleriePhoto.style.display === 'flex') {
        fermetureModal(modalGaleriePhoto);
    }

    if ((event.key === "Escape" || event.key === 'Esc') && modalAjoutPhoto.style.display === 'flex') {
        fermetureModal(modalAjoutPhoto);
    }

    if (event.key === "Tab" && modalGaleriePhoto.style.display === 'flex') {
        focusInModal(event, modalGaleriePhoto);
    }

    if (event.key === "Tab" && modalAjoutPhoto.style.display === 'flex') {
        focusInModal(event, modalAjoutPhoto);
    }
})


// Afficher les travaux dans la modal
const afficherGalerieModale = () => {
    for (let i = 0; i < portfolio.length; i++) {
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
        const titreSansEspaces = work.title.replaceAll(' ', '-');
        lienCorbeille.classList.add(titreSansEspaces.toLowerCase());
        lienCorbeille.href = '#';
        lienCorbeille.classList.add('lien-corbeille');
        const iconCorbeille = document.createElement('i');
        iconCorbeille.classList.add('fa-solid', 'fa-trash');
        lienCorbeille.appendChild(iconCorbeille);

        // Création du lien avec l'icone agrandir
        const lienAgrandir = document.createElement('a');
        lienAgrandir.classList.add('lien-agrandir');
        lienAgrandir.href = work.imageUrl;
        lienAgrandir.target = "_blank";
        const iconAgrandir = document.createElement('i');
        iconAgrandir.classList.add('fa-solid', 'fa-maximize');
        lienAgrandir.appendChild(iconAgrandir);

        // Création du lien éditer sous l'image
        const texteEditer = document.createElement('p');
        texteEditer.textContent = "éditer";

        // Rattachement au DOM
        divImg.appendChild(imgGalerie);
        divImg.appendChild(lienCorbeille);
        divImg.appendChild(lienAgrandir);
        divImg.appendChild(texteEditer);

        const galeriePhoto = document.querySelector('.galerie-photo');
        galeriePhoto.appendChild(divImg);
    }
}

afficherGalerieModale();


// Passer à la modal ajout photo
const boutonAjouterPhoto = document.querySelector(".ajout-photo");
const modalAjoutPhoto = document.querySelector("#modal-ajout-photo");

boutonAjouterPhoto.addEventListener('click', (event) =>{
    event.preventDefault();
    fermetureModal(modalGaleriePhoto);
    ouvertureModal(modalAjoutPhoto);
})

// retour en arrière à la modal galerie photo
const flecheRetourArriere = document.querySelector('.retour-arriere');
flecheRetourArriere.addEventListener('click', (event) => {
    event.preventDefault();
    fermetureModal(modalAjoutPhoto);
    ouvertureModal(modalGaleriePhoto);
})

// fermeture de la modal ajout photo en cliquant à l'extérieur du cadre blanc
modalAjoutPhoto.addEventListener('click', (event) => {
    event.preventDefault;
    fermetureModal(modalAjoutPhoto);
})

const wrapperAjoutPhoto = document.querySelector('.modal-wrapper-ajout-photo');
wrapperAjoutPhoto.addEventListener('click', event => event.stopPropagation());
