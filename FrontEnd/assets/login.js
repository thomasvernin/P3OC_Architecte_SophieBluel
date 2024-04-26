// Récupération du form
const form = document.getElementById("form");
// Récupération du input 'email'
const email = document.getElementById("email");
// Récupération du input 'password'
const password = document.getElementById("password");
// Récupération du span error-message
const error = document.querySelector(".error-message");
error.innerText = "";





// Fonction redirection
function goHome() {
  document.location.href = "./index.html";
}




// On execute la fonction lorsque le form est soumis
form.addEventListener("submit", function (event) {
  event.preventDefault();

  //on créer un objet qui récupère les données du form
  let user = {
    email: email.value,
    password: password.value,
  };

  //on appele l'API login a laquelle on POST nos données rentrées
  fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user), //on POST les données de user dans le JSON
  })
    //on récupère la réponse
    .then((response) => {
      //si status 200 on stocke les donnees dans le json
      if (response.ok) {
        return response.json();
        //si les deux champs ne matchent pas
      } else if (response.status === 401) {
        console.log("Unauthorized");
        error.innerText = "Erreur dans l'identifiant et/ou le mot de passe";
        //si utilisateur inconnu dans la base
      } else if (response.status === 404) {
        console.log("User not found");
        error.innerText = "Utilisateur inconnu";
      }
    })
    //on recupere le token dans les donnees du json, on le stock puis on le redirige
    .then((data) => {
      sessionStorage.setItem("token", data.token);
      goHome();
    })
    .catch((error) => {
      console.log(error);
    });
});















































