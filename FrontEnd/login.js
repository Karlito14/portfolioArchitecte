const formulaireLogin = document.querySelector(".form-login");

formulaireLogin.addEventListener('submit', async function(event){
    //création de l'objet pour la charge utile
    const utilisateur = {
        email : event.target.querySelector('#email').value,
        password : event.target.querySelector("#password").value
    };
    //conversion de l'objet au format json
    const chargeUtile = JSON.stringify(utilisateur);
    const reponse = await fetch("http://localehost:5678/api/users/login", {
        method : "POST",
        headers : {"Content-Type": "application/json"},
        body : chargeUtile
    });
})