<?php

namespace App\Http\Controllers;

use Illuminate\Http\Client\ConnectionException;
use Illuminate\Http\Client\PendingRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rule;

/**
 * Paiements Mobile Money via Fapshi.
 *
 * Les clés Fapshi (FAPSHI_API_USER / FAPSHI_API_KEY) restent sur le serveur,
 * dans backend/backend/.env : elles ne sont plus jamais envoyées au navigateur.
 *
 *  POST /api/paiements/initier            → lance la demande de paiement sur le téléphone
 *  GET  /api/paiements/{transId}/statut   → indique où en est le paiement
 */
class PaiementController extends Controller
{
    /**
     * Lance un paiement « direct pay » Fapshi.
     * Le montant est calculé ici à partir de la catégorie (config/congres.php).
     */
    public function initier(Request $request): JsonResponse
    {
        $tarifs = config('congres.tarifs', []);

        $donnees = $request->validate([
            'profession' => ['required', 'string', Rule::in(array_keys($tarifs))],
            'telephone' => ['required', 'string', 'max:30'],
            'email' => ['required', 'email', 'max:190'],
        ]);

        // Même nettoyage qu'auparavant : on retire les espaces et l'indicatif +237
        $telephone = preg_replace('/\s+/', '', $donnees['telephone']);
        $telephone = preg_replace('/^(\+237|237)/', '', $telephone);

        if (! preg_match('/^6\d{8}$/', $telephone)) {
            return response()->json([
                'message' => 'Numéro de téléphone invalide. Utilisez un numéro Mobile Money camerounais à 9 chiffres (ex. 6XX XX XX XX).',
            ], 422);
        }

        $client = $this->fapshi();
        if ($client === null) {
            return $this->nonConfigure();
        }

        $montant = (int) $tarifs[$donnees['profession']];

        try {
            $reponse = $client->post('/direct-pay', [
                'amount' => $montant,
                'phone' => $telephone,
                'externalId' => 'GEDREPACAM_'.now()->getTimestampMs(),
                'userId' => 'USER_'.now()->getTimestampMs(),
                'message' => 'Inscription GEDREPACAM - '.$donnees['email'],
            ]);
        } catch (ConnectionException $e) {
            Log::error('Fapshi injoignable (direct-pay)', ['erreur' => $e->getMessage()]);

            return response()->json(['message' => 'Le service de paiement est momentanément injoignable.'], 502);
        }

        if ($reponse->failed() || ! $reponse->json('transId')) {
            Log::warning('Fapshi direct-pay refusé', ['status' => $reponse->status(), 'body' => $reponse->json()]);

            return response()->json([
                'message' => $reponse->json('message') ?: "Échec de l'initialisation du paiement direct.",
            ], 502);
        }

        return response()->json([
            'transId' => $reponse->json('transId'),
            'montant' => $montant,
        ]);
    }

    /**
     * Statut d'un paiement : CREATED, PENDING, SUCCESSFUL, FAILED ou EXPIRED.
     */
    public function statut(string $transId): JsonResponse
    {
        if (! preg_match('/^[A-Za-z0-9_-]{4,64}$/', $transId)) {
            return response()->json(['message' => 'Référence de transaction invalide.'], 422);
        }

        $client = $this->fapshi();
        if ($client === null) {
            return $this->nonConfigure();
        }

        try {
            $reponse = $client->get('/payment-status/'.$transId);
        } catch (ConnectionException $e) {
            Log::error('Fapshi injoignable (payment-status)', ['erreur' => $e->getMessage()]);

            return response()->json(['message' => 'Le service de paiement est momentanément injoignable.'], 502);
        }

        if ($reponse->failed()) {
            return response()->json([
                'message' => $reponse->json('message') ?: 'Impossible de vérifier le paiement.',
            ], 502);
        }

        // On ne renvoie au navigateur que ce dont il a besoin
        return response()->json([
            'transId' => $transId,
            'status' => $reponse->json('status'),
            'montant' => $reponse->json('amount'),
        ]);
    }

    /**
     * Client HTTP préconfiguré pour Fapshi, ou null si les clés sont absentes.
     */
    private function fapshi(): ?PendingRequest
    {
        $url = config('services.fapshi.base_url');
        $user = config('services.fapshi.api_user');
        $key = config('services.fapshi.api_key');

        if (! $url || ! $user || ! $key) {
            return null;
        }

        return Http::baseUrl(rtrim($url, '/'))
            ->withHeaders(['apiuser' => $user, 'apikey' => $key])
            ->acceptJson()
            ->asJson()
            ->timeout(30);
    }

    private function nonConfigure(): JsonResponse
    {
        Log::error('Paiement : FAPSHI_API_URL, FAPSHI_API_USER ou FAPSHI_API_KEY manquant dans .env');

        return response()->json(['message' => "Le paiement n'est pas configuré sur le serveur."], 500);
    }
}
