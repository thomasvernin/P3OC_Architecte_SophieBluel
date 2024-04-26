// SELECTION DES ELEMENTS DU DOM ( une représentation hiérarchique et structurée des éléments d'une page web)

// Obtenir les projets dans la gallerie
const gallery = document.querySelector(".gallery");
// Obtenir les filtres 
const navFilters = document.querySelector(".filters-nav");














// Fonction pour créer un projet dans la galerie

// Creer un élément <figure> pour le projet
const createProject = (project) => {
const figureProject = document.createElement("figure");
// Définit l'attribut "data-tag" avec la catégorie du projet
figureProject.setAttribute("data-tag", project.category.name);
// Définit l'attribut "data-id" avec l'identifiant du projet
figureProject.setAttribute("data-id", project.id);
// Crée un élément <img> pour l'image du projet   
const imageProject = document.createElement("img");
// Définit l'URL de la source de l'image avec l'URL du projet
imageProject.src = project.imageUrl;
// Définit le texte alternatif de l'image avec le titre du projet
imageProject.alt = project.title;
// Crée un élément <figcaption> pour le titre du projet   
const figcaptionProject = document.createElement("figcaption");
// Définit le texte de la légende avec le titre du projet
figcaptionProject.innerText = project.title;
// Ajoute l'image du projet à l'élément <figure>   
figureProject.appendChild(imageProject);
// Ajoute la légende du projet à l'élément <figure>
figureProject.appendChild(figcaptionProject);
// Ajoute l'élément <figure> au conteneur de la galerie
gallery.appendChild(figureProject);
}; 







// FONCTION POUR CREER LES BOUTONS DES FILTRES

const createButton = (category) => {
// Crée un nouvel élément <button> pour le filtre
const buttonFilters = document.createElement("button");
// Définit l'attribut "data-tag" avec le nom de la catégorie
buttonFilters.setAttribute("data-tag", category.name);
// Définit l'attribut "data-id" avec l'identifiant de la catégorie
buttonFilters.setAttribute("data-id", category.id);
// Définit le texte du bouton avec le nom de la catégorie
buttonFilters.innerText = category.name;
// Ajoute le bouton à la barre de navigation des filtres
navFilters.appendChild(buttonFilters);
};
  






// FONCTION POUR CREER UNE OPTION DANS LE FORMULAIRE DE SELECTION
const createOption = (category) => {
  // Crée un nouvel élément <option> pour la catégorie
  const optionForm = document.createElement("option");
  // Définit la valeur de l'option avec l'identifiant de la catégorie
  optionForm.setAttribute("value", category.id);
  // Définit le texte de l'option avec le nom de la catégorie
  optionForm.innerText = category.name;
  // Ajoute l'option au formulaire de sélection
  selectForm.appendChild(optionForm);
  };
  





// Fonction utilisée pour vider le conteneur de la galerie (parent_element) avant de charger de nouvelles photos.
const dropElement = (parent_element) => {
// Vide le contenu de l'élément parent en définissant son innerHTML à une chaîne vide
parent_element.innerHTML = "";
};









// FONCTION QUI RECUPERES LES TRAVAUX DE L'API
// Si le paramètre catégorie Id est renseigné,
// On affiche que les works correspondant à cette caégorie
// Sinon on affiche tout
const getWorks = async (categoryId) => {
    // On appelle l'API works
    await fetch("http://localhost:5678/api/works")
        // Si le fetch fonctionne on récupère les données en .json; Sinon on affiche une erreur
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                console.log("Erreur dans la récupération des données de l'API");
            }
        })
        // On récupère chaque projet
        // Auxquels on applique la fonction createProject
        .then((project) => {
            // On efface tous les travaux pour avoir une page blanche
            dropElement(gallery); // Sur la gallery
            dropElement(modalGallery); // Dans la modale

            project.forEach((project) => {
                //si categoryId est vide, on affiche tout
                //si categoryId est renseigné, On filtre les works sur la catégorie,
                if (categoryId == project.category.id || categoryId == null) {
                    createProject(project); // Créé la galerie section portfolio
                    createModalProject(project); // Créé la galerie dans la modale
                }
            });
        })
        .catch((error) => {
            console.log(error);
        });
};






// Fonction qui récupère les categories de filtres de l'API
const getCategories = async (category) => {
    await fetch("http://localhost:5678/api/categories")
        // Si le fetch fonctionne on récupère les données en .json; Sinon on affiche une erreur
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                console.log("Erreur dans la récupération des donnés de l'API");
            }
        })
        //On récupère chaque categorie
        .then((category) => {
            //Auxquelles on applique la fonction createButton
            category.forEach((category) => {
                createButton(category);
                createOption(category);
            });
        })
        .then((filtre) => {
            //on récupère les boutons
            const buttons = document.querySelectorAll(".filters-nav button");
            buttons.forEach((button) => {
                //Pour chaque bouton, au clic
                button.addEventListener("click", function () {
                    // Get (et Affiche le data-tag)
                    // let buttonTag = button.dataset.tag;
                    // console.log(buttonTag);

                    //Get catégorie id
                    let categorieId = button.getAttribute("data-id");
                    console.log(categorieId);

                    //on enlève, pour chaque bouton la classe is-active
                    buttons.forEach((button) => button.classList.remove("is-active"));
                    //puis on ajoute la classe active au bouton cliqué
                    this.classList.add("is-active");
                    // On récupère les works de l'API en fonction des categories
                    getWorks(categorieId);
                });
            });
        })
        .catch((error) => {
            console.log(error);
        });
};







// Fonction qui affiche le getWorks + on affiche toutes les catégories
const main = async () => {
    await getWorks();
    await getCategories();
  };


//A l'ouverture de la page, on execute la fonction main (getWorks et getCategories)
main();



















// LES FONCTIONS DU MODE ADMINISTRATEUR SOPHIE BLUEL //

// Get le body
const body = document.querySelector("body");
// Get l'image de Sophie
const imgSophie = document.querySelector("#introduction img");
// Get le titre de la gallerie
const galleryTitle = document.querySelector("#portfolio h2");
// On récupère le token
const token = window.sessionStorage.getItem("token");


// Fonction pour la déconnection admin
const logOut = () => {
// Suppression du token de sessionStorage
sessionStorage.removeItem("token");
// Console.log(token);
// Redirection vers la page de connexion
window.location.href = "./index.html";
};










// FONCTION POUR CREER LES ELEMENTS DU MODE ADMINISTRATEUR 
const adminPage = () => {

// Ajout de la barre du mode édition
body.insertAdjacentHTML(
    "afterbegin",
    `<div class="edit-bar">
        <span class="edit">
          <img src="assets/icons/pen-to-.svg" 
          alt="icone édition" class="edit-icon" style="width: 20px; 
          height: 10px; fill: white;" />
          Mode édition
        </span>
    </div>`
);
  

// Ajout du bouton modifier au titre de la gallerie
galleryTitle.insertAdjacentHTML(
    "afterend",
    `<a id="open-modal" href="#modal" class="edit-link">
      <i class="fa-regular fa-pen-to-square"></i>modifier
    </a>`
 );



  
// On enlève les filtres
document.querySelector(".filters-nav").style.display = "none";
document.querySelector(".portfolio-title").style.paddingBottom = "60px";
















// Gestion bouton login / logout 
// Récupération du bouton "login/logout"
const logButton = document.querySelector("#logButton");
// On remplace login par logout
logButton.innerHTML = `<a href="./index.html">logout</a>`;
// Au clic sur le bouton on execute la fonction logout
logButton.addEventListener("click", logOut);



















// GESTION BOUTON "MODIFIER" + OUVERTURE MODALE

// Onrécupère le bouton modifier qui ouvre la modale
const modalLink = document.querySelector("#open-modal");
// Au click on exécute la fonction openModal !
modalLink.addEventListener("click", openModal);
};












  

















// SI LE TOKEN EST STOCKÉ, ON APPELLE LA FONCTION ADMINPAGE ET ON AFFICHE LES ÉLÉMENTS ADMIN
if (token !== null) {
    // Si le token est présent, cela signifie que l'utilisateur est connecté en tant qu'administrateur
    // On appelle alors la fonction adminPage pour afficher les éléments de la page d'administration
    adminPage();
}
