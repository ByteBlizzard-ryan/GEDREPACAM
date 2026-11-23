/**
 * Adresse du serveur Laravel (variable VITE_API_URL dans frontend/.env,
 * et dans les « Environment Variables » de Vercel pour le site en ligne).
 */
export const API_BASE = (import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000').replace(/\/$/, '');

let dejaReveille = false;

/**
 * Le serveur gratuit (Render) se met en veille après 15 minutes sans visite et
 * met jusqu'à environ une minute à redémarrer. On le réveille dès qu'un
 * visiteur ouvre la page Inscription : il est ainsi prêt au moment du paiement.
 * Un seul appel par visite, sans attendre la réponse ni afficher d'erreur.
 */
export function reveillerServeur() {
  if (dejaReveille) return;
  dejaReveille = true;
  fetch(`${API_BASE}/up`, { mode: 'no-cors', cache: 'no-store' }).catch(() => {
    // Pas grave : le paiement réessaiera de joindre le serveur
    dejaReveille = false;
  });
}
