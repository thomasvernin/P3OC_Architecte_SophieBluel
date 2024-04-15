 // Récupération des œuvres existantes depuis l'API
 fetch("http://localhost:5678/api/works") 
 .then(function(response) {
     if(response.ok) {
         return response.json();
     }
 })
 .then(function(data) {
     let works = data;
     console.log(works);
     // Boucle sur chaque œuvre
     works.forEach((work, index) => {
         // Création <figure>
         let myFigure = document.createElement('figure');
         myFigure.setAttribute('class', `work-item category-id-0 category-id-${work.categoryId}`);
         myFigure.setAttribute('id', `work-item-${work.id}`);
         // Création <img>
         let myImg = document.createElement('img');
         myImg.setAttribute('src', work.imageUrl);
         myImg.setAttribute('alt', work.title);
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
     console.log(err);
 });





// Ajout des filtres de catégories pour filtrer les œuvres dans la galerie
// Récupération des catégories existantes depuis l'API
fetch("http://localhost:5678/api/categories")
.then(function(response) {
    if(response.ok) {
        return response.json();
    }
})
.then(function(data) {
    let categories = data;
    categories.unshift({id: 0, name: 'Tous'}); // Ajout de la catégorie "Tous"
    console.log(categories);
    // Boucle sur chaque catégorie
    categories.forEach((category, index) => {
        // Création <button> pour filtrer
        let myButton = document.createElement('button');
        myButton.classList.add('work-filter');
        myButton.classList.add('filters-design');
        if(category.id === 0) myButton.classList.add('filter-active', 'filter-all'); // Ajout de classes pour la catégorie "Tous"
        myButton.setAttribute('data-filter', category.id);
        myButton.textContent = category.name;
        // Ajout du nouveau <button> dans la div existante avec la classe "filters"
        document.querySelector("div.filters").appendChild(myButton);
        // Gestion de l'événement de clic sur le <button> pour filtrer
        myButton.addEventListener('click', function(event) {
            event.preventDefault();
            // Gestion des filtres
            document.querySelectorAll('.work-filter').forEach((workFilter) => {
                workFilter.classList.remove('filter-active');
            });
            event.target.classList.add('filter-active');
            // Gestion des œuvres
            let categoryId = myButton.getAttribute('data-filter');
            document.querySelectorAll('.work-item').forEach(workItem => {
                workItem.style.display = 'none';
            });
            document.querySelectorAll(`.work-item.category-id-${categoryId}`).forEach(workItem => {
                workItem.style.display = 'block';
            });
        });
    });
})
.catch(function(err) {
    console.log(err);
});

