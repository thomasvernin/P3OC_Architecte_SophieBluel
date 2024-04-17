P3 OC ; Créez une page web dynamique avec JavaScript
[Réalisation Thomas Vernin]

Scénario du projet :

" Je travaille comme développeur front-end pour l’agence ArchiWebos qui comprend 50 salariés. 
Ayant terminé votre dernier projet avec un peu d'avance, je suis envoyé en renfort comme développeur front-end d’une équipe qui travaille sur la conception du site portfolio d’une architecte d’intérieur, on m'a mit en pièces jointes tout ce dont on a parlé pendant la réunion : le Figma du design qui te servira à créer les nouvelles fonctionnalités ;
le code back-end qui te permettra de faire persister les données et de tester les fonctionnalités ;
le code front-end d’origine avec la version statique de la page de l’architecte ;
le Kanban pour la mission, pour que tu puisses voir les tâches qui te sont attribuées."

___________

Après la réunion et le mail de Charlotte, je liste mes 3 missions principales.
Je dois développer :

- la page de présentation des travaux de l'architecte (à partir du HTML fourni) ;
- la page de connexion de l'administrateur du site (le client) (code à créer de zéro) ;
- la modale permettant d'uploader de nouveaux médias (code à créer from scratch).


J'ai réalisé un commit -m  à chaque étape." :) 
Bonne lecture ! 

___________

Etape 0 : Installez mon environnement de développement 

- J'ai installé Node.js.
- J'ai cloné le repo GitHub.
- J'ai lancé le front-end et le back-end du projet dans deux fenetre VScodes et découvrez la documentation Swagger de l’API.
  (Afin de pouvoir faire fonctionner le back-end, dans le terminal j'ai saisis le npm install puis le npm start, lien du serveur : http://localhost:5678/api-docs/ )
- J'ai fais un test de la route de récupération des travaux de l’architecte, via Swagger, afin de connaître des données existantes en base de données.



 
Etape 1 : Créer la page de présentation des travaux depuis le back-end

1.1 Récupération des travaux depuis le back-end : 

- J'ai utilisé fetch et récupéré les données provenant du back-end, la galerie est fonctionnelle affichée avec la liste des travaux provenant du back-end.
- J'ai fais appel à l’API avec fetch afin de récupérer dynamiquement les projets de l’architecte. 
- J'ai utilisé JavaScript pour ajouter à la galerie les travaux de l’architecte que vous avez récupéré. 
- J'ai supprimé du HTML les travaux qui étaient présents. Il ne rester que le contenu que vous avez ajouté dynamiquement grâce à JavaScript.

1.2  Réalisation du filtre des travaux : Ajout des filtres pour afficher les travaux par catégorie :

- J'ai créer la possibilité de filtrer la galerie par catégorie de projet, à l’aide d’un “menu de catégories” qui aura été généré dynamiquement.
- Il est important de garder une option de menu permettant d’afficher tous les travaux, comme par défaut.




  





