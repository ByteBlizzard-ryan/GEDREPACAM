<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Cross-Origin Resource Sharing (CORS) Configuration
    |--------------------------------------------------------------------------
    |
    | Here you may configure your settings for cross-origin resource sharing
    | or "CORS". This determines what cross-origin operations may execute
    | in web browsers. You are free to adjust these settings as needed.
    |
    | To learn more: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
    |
    */


    'paths' => ['api/*', 'web/*', 'sanctum/csrf-cookie'],

    'allowed_methods' => ['*'],

    // Le site en local + l'adresse du site en ligne (FRONTEND_URL dans .env,
    // ex. https://votre-site.vercel.app). Plusieurs adresses : séparez-les par des virgules.
    'allowed_origins' => array_values(array_filter(array_unique(array_merge(
        ['http://localhost:5173'],
        array_map('trim', explode(',', (string) env('FRONTEND_URL', '')))
    )))),

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => false,

];
