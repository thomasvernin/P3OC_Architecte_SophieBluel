// Récupération des œuvres existantes depuis l'API
fetch("http://localhost:5678/api/works") 
.then(function(response) {
    // Vérifier si la réponse est OK
    if(response.ok) {
        // Convertir la réponse en JSON
        return response.json();
    }
})
.then(function(data) {
    // Récupérer les données des œuvres
    let works = data;
    console.log(works);
    // Boucle sur chaque œuvre
    works.forEach((work, index) => {
        // Création <figure>
        let myFigure = document.createElement('figure');
        // Définir les attributs de la figure
        myFigure.setAttribute('class', `work-item category-id-0 category-id-${work.categoryId}`);
        myFigure.setAttribute('id', `work-item-${work.id}`);
        // Créer une nouvelle image
        let myImg = document.createElement('img');
        // Définir les attributs de l'image
        myImg.setAttribute('src', work.imageUrl);
        myImg.setAttribute('alt', work.title);
        // Ajouter l'image à la figure
        myFigure.appendChild(myImg);
        // Création <figcaption>
        let myFigCaption = document.createElement('figcaption');
        myFigCaption.textContent = work.title;
        myFigure.appendChild(myFigCaption);
        // Ajout de la nouvelle <figure> dans la div existante avec la classe "gallery"
        document.querySelector("div.gallery").appendChild(myFigure);
    });
})
.catch(function(err) {
    // Gérer les erreurs
    console.log(err);
});









// Fonction pour récupérer les catégories depuis l'API
function fetchCategories() {
    // Effectue une requête pour récupérer les catégories depuis l'API
    return fetch("http://localhost:5678/api/categories")
        // Vérifie si la réponse est OK et convertit-la en JSON
        .then(response => response.ok ? response.json() : Promise.reject("Erreur lors de la récupération des catégories"));
}

// Fonction pour ajouter la catégorie "Tous" et afficher les boutons de filtre
function displayCategories(categories) {
    // Ajoute la catégorie "Tous" au début de la liste des catégories
    categories.unshift({id: 0, name: 'Tous'});
    // Affiche les catégories dans la console
    console.log(categories);
    // Crée un bouton pour chaque catégorie
    categories.forEach(category => {
        const myButton = document.createElement('button');
        // Ajoute les classes CSS au bouton en fonction de la catégorie
        myButton.className = `work-filter filters-design${category.id === 0 ? ' filter-active' : ''}`;
        // Définit le texte du bouton avec le nom de la catégorie
        myButton.textContent = category.name;
        // Définit l'attribut de données pour stocker l'identifiant de la catégorie
        myButton.setAttribute('data-filter', category.id);
        // Ajoute le bouton à la section des filtres
        document.querySelector("div.filters").appendChild(myButton);
        // Ajoute un gestionnaire d'événement de clic pour filtrer les œuvres par catégorie
        myButton.addEventListener('click', filterWorks);
    });
}

// Fonction pour filtrer les œuvres par catégorie lorsqu'un bouton est cliqué
function filterWorks(event) {
    // Empêche le comportement par défaut du bouton
    event.preventDefault();
    // Désélectionne tous les autres boutons de filtre et sélectionne le bouton cliqué
    document.querySelectorAll('.work-filter').forEach(workFilter => workFilter.classList.remove('filter-active'));
    event.target.classList.add('filter-active');
    // Récupère l'identifiant de la catégorie associée au bouton cliqué
    const categoryId = event.target.getAttribute('data-filter');
    // Cache toutes les œuvres
    document.querySelectorAll('.work-item').forEach(workItem => workItem.style.display = 'none');
    // Affiche seulement les œuvres de la catégorie sélectionnée
    document.querySelectorAll(`.work-item.category-id-${categoryId}`).forEach(workItem => workItem.style.display = 'block');
}

// Appel de la fonction fetchCategories pour récupérer les catégories depuis l'API
fetchCategories()
    // Une fois les catégories récupérées avec succès, appelle displayCategories pour les afficher
    .then(displayCategories)
    // Gère les erreurs lors de la récupération des catégories
    .catch(err => console.log(err));










  














  

































