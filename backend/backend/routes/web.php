<?php

use Illuminate\Support\Facades\Route;


Route::get('/web/test-db', function () {
    return response()->json([
        'message' => 'Connexion réussie avec le Backend Laravel !',
        'status' => 'Succès'
    ]);
});