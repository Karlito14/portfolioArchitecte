const formulaireLogin = document.querySelector(".form-login");

formulaireLogin.addEventListener('submit', async function(event){
    const errorEmail = document.querySelector('.error-email');
    const errorPassword = document.querySelector('.error-password');
    errorEmail.style.display = 'none';
    errorPassword.style.display = 'none';
    //création de l'objet pour la charge utile
    const utilisateur = {
        email : event.target.querySelector('#email').value,
        password : event.target.querySelector("#password").value
    };

    if(utilisateur.email === '' && utilisateur.password === ''){ 
        event.preventDefault();
        errorEmail.style.display = 'inline-block';
        errorPassword.style.display = 'inline-block';
    } else if(utilisateur.password === '' || utilisateur.email === ''){
        event.preventDefault();
        if(utilisateur.password === ''){
            errorPassword.style.display = 'inline-block';
        } else if(utilisateur.email === ''){
            errorEmail.style.display = 'inline-block';
        }
    } else {
        //conversion de l'objet au format json
        const chargeUtile = JSON.stringify(utilisateur);
        const reponse = await fetch("http://localhost:5678/api/users/login", {
            method : "POST",
            headers : {"Content-Type": "application/json"},
            body : chargeUtile
        });
    }  
})