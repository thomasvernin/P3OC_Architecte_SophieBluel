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




// Ajout des filtres de catégories pour filtrer les œuvres dans la galerie
// Récupération des catégories existantes depuis l'API
fetch("http://localhost:5678/api/categories")
// Si la requête réussit, convertit la réponse en JSON
.then(function(response) {
    // Vérification de la réponse
    if(response.ok) {
        // Conversion de la réponse en JSON
        return response.json();
    }
})
// Traitement des données des catégories
.then(function(data) {
    // Récupération des données des catégories
    let categories = data;
    // Ajout de la catégorie "Tous" au début de la liste des catégories
    categories.unshift({id: 0, name: 'Tous'});
    // Affichage des catégories dans la console
    console.log(categories);
    // Boucle sur chaque catégorie
    categories.forEach((category, index) => {
        // Création d'un bouton pour filtrer les œuvres par catégorie
        let myButton = document.createElement('button');
        // Ajout de classes CSS au bouton
        myButton.classList.add('work-filter');
        myButton.classList.add('filters-design');
        // Si la catégorie est "Tous", ajoute des classes supplémentaires
        if(category.id === 0) myButton.classList.add('filter-active', 'filter-all');
        // Attribution de l'identifiant de la catégorie au bouton en tant qu'attribut de données
        myButton.setAttribute('data-filter', category.id);
        // Définition du texte du bouton avec le nom de la catégorie
        myButton.textContent = category.name;
        // Ajout du bouton à la section existante des filtres
        document.querySelector("div.filters").appendChild(myButton);
        // Gestion de l'événement de clic sur le bouton pour filtrer les œuvres
        myButton.addEventListener('click', function(event) {
            event.preventDefault();
            // Désélectionne tous les autres boutons de filtre
            document.querySelectorAll('.work-filter').forEach((workFilter) => {
                workFilter.classList.remove('filter-active');
            });
            // Sélectionne le bouton de filtre cliqué
            event.target.classList.add('filter-active');
            // Récupération de l'identifiant de la catégorie associée au bouton
            let categoryId = myButton.getAttribute('data-filter');
            // Cache toutes les œuvres
            document.querySelectorAll('.work-item').forEach(workItem => {
                workItem.style.display = 'none';
            });
            // Affiche seulement les œuvres de la catégorie sélectionnée
            document.querySelectorAll(`.work-item.category-id-${categoryId}`).forEach(workItem => {
                workItem.style.display = 'block';
            });
        });
    });
})
// Gestion des erreurs lors de la récupération des catégories
.catch(function(err) {
    console.log(err);
});






