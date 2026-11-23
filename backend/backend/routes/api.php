<?php

use App\Http\Controllers\PaiementController;
use Illuminate\Support\Facades\Route;

/*
| Routes appelées par le site (frontend). Elles commencent toutes par /api.
| « throttle » limite le nombre d'appels par minute et par visiteur, pour
| éviter qu'on envoie des demandes de paiement en boucle sur un téléphone.
*/

Route::post('/paiements/initier', [PaiementController::class, 'initier'])
    ->middleware('throttle:5,1');

Route::get('/paiements/{transId}/statut', [PaiementController::class, 'statut'])
    ->middleware('throttle:60,1');
