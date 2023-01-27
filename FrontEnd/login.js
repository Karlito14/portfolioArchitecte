const formulaireLogin = document.querySelector(".form-login");
let token;

formulaireLogin.addEventListener('submit', async function (event) {
    const errorEmail = document.querySelector('.error-email');
    const errorPassword = document.querySelector('.error-password');
    const errorLogin = document.querySelector('.error-login');
    errorEmail.style.display = 'none';
    errorPassword.style.display = 'none';
    errorLogin.style.display = 'none';
    //création de l'objet pour la charge utile
    const utilisateur = {
        email: event.target.querySelector('#email').value,
        password: event.target.querySelector("#password").value
    };

    if (utilisateur.email === '' && utilisateur.password === '') {
        event.preventDefault();
        errorEmail.style.display = 'inline-block';
        errorPassword.style.display = 'inline-block';
    } else if (utilisateur.password === '' || utilisateur.email === '') {
        event.preventDefault();
        if (utilisateur.password === '') {
            errorPassword.style.display = 'inline-block';
        } else if (utilisateur.email === '') {
            errorEmail.style.display = 'inline-block';
        }
    } else {
        event.preventDefault();
        //conversion de l'objet au format json
        const chargeUtile = JSON.stringify(utilisateur);
        const reponse = await fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: chargeUtile
        });
        if (reponse.ok) {
            const result = await reponse.json();
            token = result.token;
            // stockage du token dans le local storage
            window.localStorage.setItem('token', token);
            window.location.replace('./index.html');
        } else {
            errorLogin.style.display = 'inline-block';
        }
    }
})


