// récupération de la valeur du token
const token = window.localStorage.getItem('token');
// Afichage des liens "modifier" dans le mode édition
if(token){
    //  Ajout de la div edition noire en haut de page
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

    //lien modifier sous l'image
    const figureIntro = document.querySelector('.figure-intro');
    const copieIcon = iconEdition.cloneNode();
    copieIcon.classList.add('icon-image')
    figureIntro.appendChild(copieIcon);

    const lienModifier = document.createElement('a');
    lienModifier.href = '#';
    lienModifier.textContent = "modifier";
    figureIntro.appendChild(lienModifier);

    // lien modifier au-dessus de la presentation
    const articleIntro = document.querySelector('.article-intro');
    const copieIcon2 = iconEdition.cloneNode(false);
    copieIcon2.classList.add('icon-article')
    const copieLienModifier = lienModifier.cloneNode(true);
    articleIntro.prepend(copieLienModifier);
    articleIntro.prepend(copieIcon2);

    // lien modifier du portfolio
    const h2Portofolio = document.querySelector('#portfolio h2');
    const copieIcon3 = iconEdition.cloneNode();
    copieIcon3.classList.add('icon-portfolio');
    const lienModifierH2 = lienModifier.cloneNode(true);
    lienModifierH2.href = '#modal';
    h2Portofolio.after(lienModifierH2);
    h2Portofolio.after(copieIcon3);
}