# Stage Echecs Plus

Durée du stage → 50 jours ouvrés

# Organisation

**Objectifs** **→** 

Réaliser un site web, responsive design, permettant de s'entraîner aux échecs.

L'utilisateur pourra apprendre et réviser les ouvertures de son choix ainsi que les finales théoriques.

Un cours sera divisé en chapitres qui fonctionneront comme suit :

- Un échiquier est disposé avec à côté un chapitre du cours comprenant la liste des coups à jouer et les explications.
- A chaque coup l'utilisateur doit répéter sur l'échiquier le coup qui vient d'être joué automatiquement, lire les explications puis passer au coup suivant.
- A la fin du chapitre l'utilisateur doit répéter l'ensemble des coups, en cas d'erreur il devra répéter les coups où il s'est trompé ( le mode révision fonctionnera sur ce même principe).

**Veille** **→** 

[chessable.com](http://chessable.com/) →  

Les plus : 

- Site professionnel leader dans ce domaine
- Catalogue très complet, cours vidéos
- Suivi des révisions géré par l’I.A. (distance et pertinence des répétitions)

Les moins : 

- Zone de texte difficile à lire en mode révision
- Interface mobile peu ergonomique
- Bandeau menu trop envahissant

[chessopenings.co.uk](http://chessopenings.co.uk/)  →

- Trop de couleurs dans les différents états de l’échiquier
- La zone de texte ne se met pas au niveau du coup en cours
- Affichage PGN peu lisible
- Interface utilisateur difficile à prendre en main
- Mode révision peu utile

[listudy.org](http://listudy.org/) →

- Flèches sur l’échiquier mal réalisées
- Mode apprentissage plutôt bien réalisé malgré un texte écrit trop petit et la flèche du coup à jouer qui reste affichée ce qui ne pousse pas à la concentration
- Mode répétition trop difficile
- Nombreux cours ne fonctionnant pas

**Planification →** 

Reformulation, définition des principales users stories, veille concurrentielle, mise en place Git/GitHub et Kanban Trello → 1 jour

Création de la charte graphique, architecture et maquette du site web → 3 jours

Conception de l’échiquier avec ReactJS → 16 jours

Tests de validations (perft) → 1 jour

Conception du lecteur PGN (lien cours ↔ échiquier)→ 5 jours

Conception et mise en place de la bdd → 1 jour

Conception du site web avec Symfony → 15 jours

Tests et révisions → 4 jours 

Mise en production → 4 jours

Total : 50 jours

- **User Stories →**

**En tant qu'administrateur :**

- je souhaite pouvoir ajouter facilement les cours **afin de** proposer du contenu régulièrement
- je souhaite pouvoir gérer les utilisateurs et leurs données personnelles ****************afin de**************** respecter les règles de confidentialité et de sécurité

**En tant qu'utilisateur :** 

- je souhaite pouvoir créer un compte utilisateur **********afin de********** bénéficier d’un suivi de mon évolution
- je souhaite pouvoir sélectionner des cours ****************afin d’****************apprendre à mon rythme les sujets qui m’intéressent
- je souhaite pouvoir accéder à des cours d'échecs interactifs ****************afin d’****************apprendre les techniques de bases dans les finales et les ouvertures
- je souhaite pouvoir réviser les leçons que j’ai apprises ****************afin de**************** bien les mémoriser

**Kanban Trello** → [https://trello.com/b/Q4BsFQhV/echecsplus](https://trello.com/b/Q4BsFQhV/echecsplus)

********************Charte graphique et maquette Figma →******************** [https://www.figma.com/file/h9zEvNbRDQZIwlfMCBbC4t/EchecsPlus?node-id=0%3A1&t=j950EQca6QDr3t5i-0](https://www.figma.com/file/h9zEvNbRDQZIwlfMCBbC4t/EchecsPlus?node-id=0%3A1&t=j950EQca6QDr3t5i-0)

**Carte mentale Mindmeister :** [https://www.mindmeister.com/map/2611103876](https://www.mindmeister.com/map/2611103876)

********************Notes →******************** [https://www.notion.so/869a77fbda9b4139bcc8d1a3dead6de0?v=0a5f66218ef04f5b8105d7e31a38eabc&p=aa4168c7230646fe9098198a41d51bc7&pm=s](https://www.notion.so/Design-page-d-accueil-aa4168c7230646fe9098198a41d51bc7)

**GitHub →** https://github.com/Akrom4/chesstraining/ (react components) && https://github.com/Akrom4/trainingApp (symfony ux react)

********Réalisations :******** 

1. Création de la charte graphique, architecture et maquette du site web. ********************Fin le 21/02/2023********************
- 2. Conception de l’échiquier (**************************************début le 22/02**************************************) :
    1. Installation de ReactJS
    2. Recherche des images, initiation à ReactJS
    3. Affichage de l’échiquier (**********23/02**********)
    4. Affichage de la position de départ
    5. Drag & Drop + coordonnées des cases+ Accrochage des pièces au milieu des cases  (**********************24/02)**********************
    6. Correctifs listing des pièces 7
    7. Fonction d’arbitrage
        
        ![Untitled](Stage%20Echecs%20Plus%2027869a9ca35e49cdade8e608d675e6fd/Untitled.png)
        
    8. Mouvement des Pions (**********27/02**********)
    9. Organisation des fichiers
    10. Refactorisation (fonction samePosition)
    11. Mouvement des Cavaliers 
    12. Mouvement des Fous 
    13. Refactorisation (fonction diagonale occupée) 
    14. Mouvements Tour Dame Roi ( or coups spéciaux) (**********28/02**********)
    15. refactorisation (fonction chemin occupé dans tous les sens)
    16. promotion
        
        ![Untitled](Stage%20Echecs%20Plus%2027869a9ca35e49cdade8e608d675e6fd/Untitled%201.png)
        
    17. Move preview, pion (pas en passant)  (**********01/03**********)
        
        ![Untitled](Stage%20Echecs%20Plus%2027869a9ca35e49cdade8e608d675e6fd/Untitled%202.png)
        
    18. test sur hébergeur
    19. Drag & drop mobile 
    20. media query 
    21. mise à disposition du serveur de test sur le réseau local pour pouvoir tester sur différents supports (navigateur, mobile, tablette)                                           
    22. Move preview, pion prise en passant
    23. Move preview  (pas d’échecs ni de roque) (**********02/03**********)
    24. séparation logique/ui, #bugsenpagailles
        1. prise en passant possible sur des pions de la même couleur
        2. après avoir relancé le serveur de test les pièces n’apparaissent plus
        3. les pièces de même couleurs peuvent se capturer
        4. preview fou/tour/dame cassé
        5. certaines pièces capturées ne sont plus enlevées de la liste des pièces
    25. correctifs pour la prise en passant,  
    26. Correctifs  sur l’affichage des pièces ainsi que sur l’update du tableau des pièces (**********03/03**********)
    27. update css pour la preview des pièces en prises*
        
        ![Untitled](Stage%20Echecs%20Plus%2027869a9ca35e49cdade8e608d675e6fd/Untitled%203.png)
        
    28. poo refactorisation → Piece → Position (**********20/03**********)
    29. poo refactorisation → Echiquier (**********21/03**********)
    30. Correctifs  promotion (**********24/03**********)
    31. Gestion de l’échec → classe Roi
    32. Retourner l’échiquier (**********25/03**********)
    33. Implémentation et debug du roque → classe Tour (**********26/03**********)
        
        ![Untitled](Stage%20Echecs%20Plus%2027869a9ca35e49cdade8e608d675e6fd/Untitled%204.png)
        
    34. Gestion du roque complète (**********27/03**********)
    35. Tentative de déplacement point & click (**********28/03**********)
    36. Création et configuration de l’environnement Symfony UX React
    37. Importation et configuration de l’échiquier ReactJS dans Symfony UX React (**********29/03**********)
    38. Implémentation du tour par tour
    39. Refactorisation isValidMove 
    40. Chargement d’une position via la notation FEN (règles du roque et de la prise en passant non implémentés) (**********30/03**********)
    41. Test du lecteur FEN avec les règles du roque
        
        ![Untitled](Stage%20Echecs%20Plus%2027869a9ca35e49cdade8e608d675e6fd/Untitled%205.png)
        
    42. Lecteur FEN → prise en passant (**********31/03**********) 
    
    [https://www.notion.so](https://www.notion.so)
    
- 3. Lecteur Pgn (**début le 17/04**)
    1. Ébauche du css (**************17/04**************)
        
        ![Untitled](Stage%20Echecs%20Plus%2027869a9ca35e49cdade8e608d675e6fd/Untitled%206.png)
        
    2. Etude du format PGN et réflexion sur la suite du développement
    3. Ajout d’une méthode getFEN au composant chessboard (**********18/04**********)
    4. Décomposition du PGN en un tableau de coups et un tableau de commentaires
        
        ![Untitled](Stage%20Echecs%20Plus%2027869a9ca35e49cdade8e608d675e6fd/Untitled%207.png)
        
    5. Création d’une classe pour les cours 
        
        ![Untitled](Stage%20Echecs%20Plus%2027869a9ca35e49cdade8e608d675e6fd/Untitled%208.png)
        
    6. Traduction de la notation PGN pour que l’échiquier puisse jouer les coups
    7. Ajout du FEN de la position résultante pour  chaque coup (**********19/04**********)
        
        ![Untitled](Stage%20Echecs%20Plus%2027869a9ca35e49cdade8e608d675e6fd/Untitled%209.png)
        
    8. Correctif du compteur de coups 
    9. Tentative d’ajout de la lecture des variantes dans le PGN
    10. Ajout d’une méthode pour reprendre la position au dernier coup
    11. Correctifs sur la gestion du tour de jeu
    12. Debug en cours pour les variantes du PGN (****20/04****)
    13. Correction de la fonction undoMove
    14. Gestion des variantes dans les variantes dans les variantes (bugué et trop complexe →  à revoir) 
        
        ![Untitled](Stage%20Echecs%20Plus%2027869a9ca35e49cdade8e608d675e6fd/Untitled%2010.png)
        
    15. Gestion des variantes multiples 
    16. Refactorisation de parseData et parseVariation (**********21/04**********)
    17. Refonte de la logique du lecteur de pgn  (**********24/04**********)
    
- 4. Base de données début le (**********25/04**********)
    1. Liaison bdd ↔ Symfony
    2. Premier jet de la structure de la bdd : le (**********25/04**********)
        
        Users( id , username, email , password , role , created_at , updated_at )
        
        Courses( id , title , description , image , pgn_data , created_at , updated_at )
        
        UserCourses( id , #Users.id , #Courses.id ,  currentCourse  )
        
        CourseProgress( id , #UserCourses.id , chaptersCompleted )
        
- 5. Symfony ux React
    1. Création de l’entitée User (************25/04)************
    2. Création de fausses données utilisateur
    3. Création du contrôleur et du template d’utilisateurs
    4. Modification du template de base, correctifs du template react  
    5. Formulaire de connexion 
    6. Formulaire de modification des utilisateurs, ajout, suppression
    7. Gestion des mots de passe (**********26/04**********)
    8. Entitée cours → crud 
    9. Création cours → ajout d’un composant react pour la conversion du pgn (abandonné)
    10. Installation d’api platform (**********27/04**********)
    11. Apprentissage d’api platform
    12. Mise en place des annotations et des filtres de recherche api platform 
    13.  Fomulaire création cours géré par un composant react qui renvoie le résultat via API platform   
        
        ![Untitled](Stage%20Echecs%20Plus%2027869a9ca35e49cdade8e608d675e6fd/Untitled%2011.png)
        
    14.  Liaison base de donnée → composant lecteur pgn via controller et props (**********28/04**********)
        
        ![Untitled](Stage%20Echecs%20Plus%2027869a9ca35e49cdade8e608d675e6fd/Untitled%2012.png)
        
    15. erz