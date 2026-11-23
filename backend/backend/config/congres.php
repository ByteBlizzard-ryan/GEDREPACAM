<?php

/*
|--------------------------------------------------------------------------
| Congrès GEDREPACAM 2027
|--------------------------------------------------------------------------
|
| Grille tarifaire officielle (en FCFA). C'est le serveur qui fixe le montant
| à payer : le site ne fait qu'envoyer la catégorie choisie, ce qui empêche
| quelqu'un de modifier le prix depuis son navigateur.
|
| IMPORTANT : les noms des catégories doivent être exactement les mêmes que
| le champ « titre » de CATEGORIES_TARIFS dans frontend/src/Inscription.jsx.
|
*/

return [

    'tarifs' => [
        'Universitaires (Enseignants / Chercheurs)' => 35000,
        'Médecins spécialistes / Biologistes' => 30000,
        'Médecins généralistes / Résidents / Ingénieurs médico-sanitaires' => 25000,
        'Ingénieurs techniques, Infirmiers, Techniciens médico-sanitaires' => 20000,
        'Étudiants' => 10000,
        'Associations de patients' => 5000,
    ],

];
