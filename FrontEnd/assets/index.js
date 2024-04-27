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






// OBTENIR LA MODALE DANS LA BALISE ASIDE
// Utilisation de <aside> pour représenter du contenu supplémentaire indirectement lié au contenu principal de la page.) 
const asideModal = document.querySelector("#modal");
// Obtenir la boîte modale de la galerie de photos = Modale 1
const galerieModal = document.querySelector(".modal-box-galerie-photo");
// Obtenir la galerie de la modale 1
const modalGallery = document.querySelector(".modal-gallery");
// Obtenir la boîte modale d'ajout de photo = Modale 2
const ajoutModal = document.querySelector(".modal-box-ajout-photo");
// Obtenir le sélecteur du formulaire d'ajout de photo
const selectForm = document.querySelector("#category");












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












  



// FONCTION POUR CREER UN PROJET DANS LA MODALE 
const createModalProject = (project) => {
    // Crée un élément <figure> pour le projet
    const figureModalProject = document.createElement("figure");
    figureModalProject.setAttribute("data-id", project.id);

    // Crée un élément <img> pour afficher l'image du projet
    const imageModalProject = document.createElement("img");
    imageModalProject.src = project.imageUrl;
    imageModalProject.alt = project.title;
    imageModalProject.classList.add("modal-project-img");

    // Crée une icône "trash" pour supprimer le projet
    const trashIcon = document.createElement("img");
    trashIcon.src = "assets/icons/trash-icon.svg";
    trashIcon.classList.add("trash-icon");
    trashIcon.setAttribute("data-id", project.id);
    let trashIconID = trashIcon.getAttribute("data-id");

    // Ajoute un écouteur d'événements pour le clic sur l'icône "trash"
    trashIcon.addEventListener("click", function (event) {
        event.preventDefault();
        // Demande confirmation avant de supprimer le projet
        if (confirm("Êtes-vous sûr de vouloir supprimer ce projet ?") == true) {
            deleteWork(trashIconID);
        }
    });


    // Crée un élément <figcaption> pour afficher le titre du projet
    const figcaptionModalProject = document.createElement("figcaption");
  
    // Ajoute les éléments créés au <figure> du projet
    figureModalProject.appendChild(imageModalProject);
    figureModalProject.appendChild(trashIcon);
    
    figureModalProject.appendChild(figcaptionModalProject);
    // Ajoute le <figure> du projet à la galerie modale
    modalGallery.appendChild(figureModalProject);
};







// FORMULAIRE AJOUT PROJET 
// Sélection des éléments du formulaire
const formAddWork = document.querySelector("#ajout-box");
const inputElement = document.querySelector("#title");
const selectElement = document.querySelector("#category");
const fileInputElement = document.querySelector("#image");
const submitButton = document.querySelector("#valider-button");
const inputFile = document.querySelector("#image");

// Fonction pour afficher la prévisualisation de l'image à télécharger
const showFile = (e) => {
  e.preventDefault();

  // Fonction apparition image 
  const reader = new FileReader();
  // Lecture de l'image
  reader.readAsDataURL(inputFile.files[0]);
  // Renvoie la src dans la balise preview
  reader.addEventListener("load", function () {
    previewImage.src = reader.result;
  });
  // A l'upload, on fait apparaitre la preview de l'image
  const previewBox = document.querySelector(".upload-photo-box");
  const previewImage = document.createElement("img");
  previewImage.setAttribute("id", "preview-image");
  // On masque les éléments en dessous
  const photoUploadButton = document.querySelector(".photo-upload-button");
  photoUploadButton.style.display = "none";
  const pictureIcon = document.querySelector(".picture-icon");
  pictureIcon.style.display = "none";
  const typeFiles = document.querySelector(".type-files");
  typeFiles.style.display = "none";

  previewBox.appendChild(previewImage);
};







// Fonction de vérification des champs et "activer" le bouton de validation
const checkForm = () => {
    // Vérifie si les champs input, select et file sont remplis
    if (inputElement.value !== "" && selectElement.value !== "" && fileInputElement.value !== "") {
      // Si tous les champs sont remplis, active le bouton de soumission en changeant son style
      submitButton.style.backgroundColor = "#1D6154";
      submitButton.style.color = "#ffffff";
    } else {
      // Si un ou plusieurs champs sont vides, affiche un message dans la console
      return console.log("Formulaire incomplet");
    }
};
  






// Listener des actions des éléments du formulaire
inputFile.addEventListener("change", showFile); // pour détecter les changements dans le champ de fichier et exécuter la fonction showFile
inputElement.addEventListener("input", checkForm); // pour détecter les saisies dans le champ de texte et exécuter la fonction checkForm
selectElement.addEventListener("input", checkForm); // pour détecter les sélections dans le champ de sélection et exécuter la fonction checkForm
fileInputElement.addEventListener("change", checkForm); // pour détecter les changements dans le champ de fichier et exécuter la fonction checkForm








// AJOUTER UN NOUVEAU PROJET 
const addWork = async () => {

// Récupération des éléments du formuaire à envoyer à l'API
let getPhoto = document.getElementById("image").files[0];
let getTitle = document.getElementById("title").value;
let getCategory = document.getElementById("category").value;



/*Construction du formData à envoyer. C'est une interface JavaScript permettant de créer et de manipuler
facilement des données de formulaire pour les envoyer via des requêtes HTTP */
let formData = new FormData();
formData.append("image", getPhoto);
formData.append("title", getTitle);
formData.append("category", getCategory);







// APPEL DE L'API
  await fetch("http://localhost:5678/api/works", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
      Accept: "application/json",
    },
    body: formData,
  })
    .then((response) => {
      if (response.ok) {
        getWorks(); // On actualise les galeries portfolio + modale
        closeModal(); // On ferme la modale
        console.log("Votre projet a bien été ajouté !");
        return response.json();
      } else {
        console.log("Erreur dans la récupération des donnés de l'API");
      }
    })
    .catch((error) => {
      console.log(error);
    });
};








//FONCTION POUR VERIFIER SI TOUS LES ELEMENTS REQUIS ONT UNE VALEUR
const validateForm = (e) => {
  e.preventDefault();

  // Get messages
  const errMessImg = document.querySelector("#error-img");
  const errMessTitle = document.querySelector("#error-title");
  const errMessCat = document.querySelector("#error-category");

  // Si tous les champs sont remplis, on exécute le addWork
  // La fonction addWork() est appelée pour effectuer l'action d'ajouter la photo
  if (inputElement.value !== "" && selectElement.value !== "" && fileInputElement.value !== "") {
    addWork();
  }

  // Si champs non rempli, affichage des messages d'erreur conrrespondants
  if (inputFile.value == "") {
    errMessImg.innerHTML = "Image obligatoire";
  } else {
    errMessImg.innerHTML = "";
  }
  if (inputElement.value == "") {
    errMessTitle.innerHTML = "Titre obligatoire";
  } else {
    errMessTitle.innerHTML = "";
  }
  if (selectElement.value == "") {
    errMessCat.innerHTML = "Catégorie obligatoire";
  } else {
    errMessCat.innerHTML = "";
  }
};









// OUVERTURE DE LA MODALE + ACTION DES DIFFERENTS BOUTON 
const openModal = () => {
    // Active aside
    asideModal.classList.remove("modal-non-active");
    asideModal.setAttribute("aria-hidden", "false");
    // Active modal 1
    galerieModal.classList.remove("modal-non-active");
  
    // Au click sur "Ajouter une photo" > active modale 2
    const addButton1 = document.querySelector("#add-photo-button1");
    addButton1.addEventListener("click", (event) => {
      // Ajout modal-non-active sur galerie box (modale 1)
      galerieModal.classList.add("modal-non-active");
      // Remove modal-non-active sur ajout box (modale 2)
      ajoutModal.classList.remove("modal-non-active");
      // Fermeture de la modale sur croix de modale  2
      const closeIcon2 = document.querySelector(".close-icon-2");
      closeIcon2.addEventListener("click", closeModal);
      // Bouton back, reviens sur modale 1
      const backIcon = document.querySelector(".back-icon");
      backIcon.addEventListener("click", (event) => {
      //ajout modal-non-active sur galerie box
      galerieModal.classList.remove("modal-non-active");
      //remove modal-non-active sur ajout box
      ajoutModal.classList.add("modal-non-active");
      });
    });

     //Au click sur bouton "Valider" (modale 2),
     //on verifie le form (validateForm ; qui exectue ou non le addWork)
     //document.querySelector("#valider-button").addEventListener("click", validateForm);
     formAddWork.addEventListener("submit", validateForm);

     // FERMETURE DE LA MODALER SUR LA CROIX
     const closeIcon = document.querySelector(".close-icon");
     closeIcon.addEventListener("click", closeModal);

     // FERMETURE DE LA MODALE SUR ASIDE
     document.getElementById("modal").addEventListener("click", (event) => {
     if (event.target === document.getElementById("modal")) {
      closeModal();
     }
     });

    // RECUPERATION ET AFFICHE DES PROJETS A L'OUVERTURE DE LA MODALE
    getWorks();
};








// FERMETURE DE LA MODALE
const closeModal = () => {
    asideModal.classList.add("modal-non-active");
    galerieModal.classList.add("modal-non-active");
    ajoutModal.classList.add("modal-non-active");

    /*--- On reset le formulaire ---*/
    document.querySelector("#ajout-box").reset();
    // On enlève l'image de prévisualisation
    const previewBox = document.querySelector(".upload-photo-box");
    const previewImage = document.querySelector("#preview-image");
    if (previewImage !== null) {
        previewBox.removeChild(previewImage);
    }

    // on réaffiche les éléments de pictureBox
    const photoUploadButton = document.querySelector(".photo-upload-button");
    photoUploadButton.style.display = "";
    const pictureIcon = document.querySelector(".picture-icon");
    pictureIcon.style.display = "";
    const typeFiles = document.querySelector(".type-files");
    typeFiles.style.display = "";

    // on reinitialise le bouton valider
    submitButton.style.backgroundColor = "#a7a7a7";
};






// FONCTION POUR SUPPRIMER UN PROJET DE LA MODALE
const deleteWork = async (workID) => {
    await fetch("http://localhost:5678/api/works/" + workID, {
        // Appel de l'API pour supprimer le projet avec l'ID spécifié
        method: "DELETE", // Utilisation de la méthode DELETE pour supprimer le projet
        headers: {
            "Content-Type": "application/json", // Spécification du type de contenu comme JSON dans les entêtes de la requête
            Authorization: "Bearer " + token, // Inclusion du jeton d'authentification dans les entêtes de la requête
        },
    }).catch((error) => {
        // Gestion des erreurs en cas d'échec de la requête
        console.log(error); // Affichage de l'erreur dans la console
    });

    // Actualisation de l'affichage des projets après la suppression
    getWorks();
};







// SI LE TOKEN EST STOCKÉ, ON APPELLE LA FONCTION ADMINPAGE ET ON AFFICHE LES ÉLÉMENTS ADMIN
if (token !== null) {
    // Si le token est présent, cela signifie que l'utilisateur est connecté en tant qu'administrateur
    // On appelle alors la fonction adminPage pour afficher les éléments de la page d'administration
    adminPage();
}