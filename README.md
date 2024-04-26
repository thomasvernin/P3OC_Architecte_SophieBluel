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
Vous retrouverez mes étapes ci-dessous 
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



Etape 2 : CODAGE DE LA PAGE DE CONNEXION

Étape 2.1 : Intégration du design de la page de formulaire

Étape 2.2 : Authentification de l’utilisateur

- Le formulaire de connexion est fonctionnel avec une redirection vers la page d’accueil quand la connexion est confirmée.
- Un message d’erreur quand les informations utilisateur / mot de passe ne sont pas correctes.




Étape 3 : AJOUT DE LA MODALE

Étape 3.1 : Ajout de la fenêtre modale - Création de la fenêtre modale et gestion de son apparition et disparition.

- La fenêtre modale est fonctionnelle pour ajouter des médias dans la galerie.
  La modale se déclencher au clic sur le bouton Modifier, et se refermer au clic sur la croix ou en dehors de la modale.

  

Étape 3.2 : Suppression de travaux existants

- J'ai la possibilité de supprimer un des travaux de l’architecte.
- Nous avons pas besoin de recharger la page pour voir que le projet a été supprimé.
  
  

Étape 3.3 : Envoi d’un nouveau projet au back-end via le formulaire de la modale

- J'ai message d’erreur si le formulaire n’est pas correctement rempli. 
- Une réponse de l’API si le formulaire est correctement envoyé.
- Si je recharge la page, le nouveau projet qui doit s’afficher dans la galerie.

  

Étape 3.4 : Traitement de la réponse de l’API pour afficher dynamiquement la nouvelle image de la modale.

- J'ai l'ajout dynamique du projet dans la galerie après l’envoi du formulaire.
- J'ai analysé où et comment actualiser le DOM, afin d’afficher les nouveaux projets sans recharger la page.
- J'ai ajouté la nouvelle image, non seulement dans le portfolio, mais également dans la liste des images se trouvant dans la modale.



Étape 4 : Vérification de l'enssemble du projet
- Le projet est testé et validé prêt pour la soutenance.
- J'ai testé mon code en me posant les questions suivantes : 
          Comment se comportent mes formulaires si j’entre des données erronées ? 
          Est-ce que le visuel correspond aux attentes de la maquette ? Le visuel correspond a 100% a la maquette.
          Comment la mise à jour de l’interface est-elle gérée quand je dois ajouter ou supprimer des éléments du DOM ?


______________

Codes pour se loger au site : 

" Email : sophie.bluel@test.tld
Mot de passe : S0phie "

Back end développé avec Express JS et la base de donnée MySQL

______________










  





