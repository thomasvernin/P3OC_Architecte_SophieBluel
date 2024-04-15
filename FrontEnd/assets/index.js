// Ajout dynamique des œuvres dans la galerie portfolio de la page
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
