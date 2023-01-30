const reponse = await fetch("http://localhost:5678/api/works");
const portfolio = await reponse.json();

const galeriePhoto = document.querySelector('.galerie-photo');

console.log(portfolio)

const afficherGalerie = () => {
    for(let i = 0; i < portfolio.length; i++){
        const work = portfolio[i];
        
        const divImg = document.createElement('div');
        const imgGalerie = document.createElement('img');
        imgGalerie.classList.add("img-galerie");
        imgGalerie.crossOrigin = "anonymous";
        imgGalerie.src = work.imageUrl;
        imgGalerie.alt = work.title;
        
        

        const lienEditer = document.createElement('a');
        lienEditer.href = '#';
        lienEditer.textContent = "éditer";

        divImg.appendChild(imgGalerie);
        divImg.appendChild(lienEditer);

        galeriePhoto.appendChild(divImg);
    }
}

afficherGalerie();